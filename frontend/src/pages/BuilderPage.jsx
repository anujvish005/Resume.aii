import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import TemplateSelector from "@/components/TemplateSelector";
import ResumeUpload from "@/components/ResumeUpload";
import ScoreMeter from "@/components/ScoreMeter";
import { saveResume } from "@/lib/api";
import { useReactToPrint } from "react-to-print";
import {
  FileText,
  Download,
  Save,
  ArrowLeft,
  Eye,
  PenLine,
  Upload,
} from "lucide-react";

const emptyResume = {
  contact: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  template: "classic",
};

export default function BuilderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resumeData, setResumeData] = useState(emptyResume);
  const [showUpload, setShowUpload] = useState(
    searchParams.get("upload") === "true"
  );
  const [mobileView, setMobileView] = useState("form"); // 'form' | 'preview'
  const [saving, setSaving] = useState(false);
  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${resumeData.contact.full_name || "Resume"}_ATS_Resume`,
  });

  const updateResume = useCallback((updates) => {
    setResumeData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleUploadComplete = useCallback(
    (data) => {
      // Merge parsed data into resume
      const merged = { ...emptyResume };
      if (data.contact) merged.contact = { ...emptyResume.contact, ...data.contact };
      if (data.summary) merged.summary = data.summary;
      if (data.experience)
        merged.experience = data.experience.map((e, i) => ({
          ...e,
          id: `exp-${i}-${Date.now()}`,
        }));
      if (data.education)
        merged.education = data.education.map((e, i) => ({
          ...e,
          id: `edu-${i}-${Date.now()}`,
        }));
      if (data.skills) merged.skills = data.skills;
      if (data.projects)
        merged.projects = data.projects.map((p, i) => ({
          ...p,
          id: `proj-${i}-${Date.now()}`,
        }));
      if (data.certifications)
        merged.certifications = data.certifications.map((c, i) => ({
          ...c,
          id: `cert-${i}-${Date.now()}`,
        }));
      if (data.languages) merged.languages = data.languages;

      setResumeData(merged);
      setShowUpload(false);
      toast.success("Resume parsed successfully! Review and edit your details.");
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveResume(resumeData);
      toast.success("Resume saved successfully!");
    } catch {
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 md:px-6 justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Button
            data-testid="back-to-home-btn"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Home
          </Button>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4F46E5]" />
            <span
              className="text-sm font-semibold tracking-tight text-[#0F172A]"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Resume.aii
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile view toggle */}
          <div className="flex md:hidden border border-slate-200 rounded-md overflow-hidden">
            <button
              data-testid="mobile-form-view-btn"
              onClick={() => setMobileView("form")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                mobileView === "form"
                  ? "bg-[#4F46E5] text-white"
                  : "bg-white text-slate-500"
              }`}
            >
              <PenLine className="w-3.5 h-3.5" />
            </button>
            <button
              data-testid="mobile-preview-view-btn"
              onClick={() => setMobileView("preview")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                mobileView === "preview"
                  ? "bg-[#4F46E5] text-white"
                  : "bg-white text-slate-500"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            data-testid="upload-resume-btn"
            variant="outline"
            size="sm"
            onClick={() => setShowUpload(true)}
            className="border-slate-200 text-slate-600 text-xs"
          >
            <Upload className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Upload</span>
          </Button>

          <Button
            data-testid="save-resume-btn"
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="border-slate-200 text-slate-600 text-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">{saving ? "Saving..." : "Save"}</span>
          </Button>

          <Button
            data-testid="download-pdf-btn"
            size="sm"
            onClick={handlePrint}
            className="bg-[#4F46E5] text-white hover:bg-[#4338CA] text-xs active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </header>

      {/* Upload Modal */}
      {showUpload && (
        <ResumeUpload
          onComplete={handleUploadComplete}
          onClose={() => setShowUpload(false)}
        />
      )}

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form */}
        <div
          className={`w-full md:w-[42%] lg:w-[38%] border-r border-slate-200 bg-white overflow-y-auto custom-scroll ${
            mobileView === "preview" ? "hidden md:block" : ""
          }`}
        >
          <div className="p-5">
            <ScoreMeter data={resumeData} />
            <TemplateSelector
              selected={resumeData.template}
              onSelect={(t) => updateResume({ template: t })}
            />
            <ResumeForm data={resumeData} onChange={updateResume} />
          </div>
        </div>

        {/* Right: Preview */}
        <div
          className={`flex-1 bg-[#F1F5F9] overflow-y-auto custom-scroll p-6 flex justify-center ${
            mobileView === "form" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="w-full max-w-[800px]">
            <ResumePreview ref={previewRef} data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
