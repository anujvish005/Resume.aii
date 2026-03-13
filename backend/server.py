from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import tempfile
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from openai import AsyncOpenAI

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# OpenAI client
openai_client = AsyncOpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ─── Models ────────────────────────────────────────────────────────
class ContactInfo(BaseModel):
    full_name: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    linkedin: str = ""
    website: str = ""

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str = ""
    position: str = ""
    start_date: str = ""
    end_date: str = ""
    current: bool = False
    description: str = ""

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    institution: str = ""
    degree: str = ""
    field_of_study: str = ""
    start_date: str = ""
    end_date: str = ""
    gpa: str = ""

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    description: str = ""
    technologies: str = ""
    link: str = ""

class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    issuer: str = ""
    date: str = ""

class ResumeData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    contact: ContactInfo = Field(default_factory=ContactInfo)
    summary: str = ""
    experience: List[Experience] = Field(default_factory=list)
    education: List[Education] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    projects: List[Project] = Field(default_factory=list)
    certifications: List[Certification] = Field(default_factory=list)
    languages: List[str] = Field(default_factory=list)
    template: str = "classic"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EnhanceRequest(BaseModel):
    text: str
    context: str = "professional resume"

# ─── Helper: Extract text from uploaded file ──────────────────────
def extract_text_from_pdf(file_path: str) -> str:
    from PyPDF2 import PdfReader
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_path: str) -> str:
    from docx import Document
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

# ─── Helper: Parse resume text with AI ────────────────────────────
async def parse_resume_with_ai(text: str) -> dict:
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are a resume parser. Extract structured data from the resume text provided.
Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "contact": {"full_name": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": ""},
  "summary": "",
  "experience": [{"company": "", "position": "", "start_date": "", "end_date": "", "current": false, "description": ""}],
  "education": [{"institution": "", "degree": "", "field_of_study": "", "start_date": "", "end_date": "", "gpa": ""}],
  "skills": [],
  "projects": [{"name": "", "description": "", "technologies": "", "link": ""}],
  "certifications": [{"name": "", "issuer": "", "date": ""}],
  "languages": []
}
Fill in all fields you can find. Use empty strings for missing fields. For dates use format like "Jan 2023" or "2023"."""
            },
            {
                "role": "user",
                "content": f"Parse this resume:\n\n{text}"
            }
        ],
        temperature=0.1,
    )

    cleaned = response.choices[0].message.content.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    if cleaned.startswith("json"):
        cleaned = cleaned[4:]
    cleaned = cleaned.strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        logger.error(f"Failed to parse AI response: {cleaned[:200]}")
        raise HTTPException(status_code=500, detail="Failed to parse resume data from AI response")

# ─── Routes ───────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "ATS Resume Builder API"}

@api_router.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    ext = file.filename.lower().split(".")[-1]
    if ext not in ("pdf", "docx"):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        if ext == "pdf":
            text = extract_text_from_pdf(tmp_path)
        else:
            text = extract_text_from_docx(tmp_path)

        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the file. The file may be scanned/image-based.")

        parsed = await parse_resume_with_ai(text)
        return {"success": True, "data": parsed}
    finally:
        os.unlink(tmp_path)

@api_router.post("/resume/save")
async def save_resume(resume: ResumeData):
    doc = resume.model_dump()
    await db.resumes.insert_one(doc)
    doc.pop("_id", None)
    return {"success": True, "id": doc["id"], "data": doc}

@api_router.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    doc = await db.resumes.find_one({"id": resume_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Resume not found")
    return doc

@api_router.post("/resume/enhance")
async def enhance_text(req: EnhanceRequest):
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are an expert resume writer. Enhance the given text to be more impactful,
professional, and ATS-friendly. Use strong action verbs, quantify achievements where possible,
and keep it concise. Return ONLY the enhanced text, no explanations or extra formatting."""
            },
            {
                "role": "user",
                "content": f"Context: {req.context}\n\nEnhance this resume text:\n{req.text}"
            }
        ],
        temperature=0.7,
    )

    enhanced = response.choices[0].message.content.strip()
    return {"success": True, "enhanced": enhanced}

# Include router and middleware
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
