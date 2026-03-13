import { useState, useCallback } from "react";
import { uploadResume } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Loader2 } from "lucide-react";

export default function ResumeUpload({ onComplete, onClose }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;

      const ext = file.name.toLowerCase().split(".").pop();
      if (!["pdf", "docx"].includes(ext)) {
        setError("Only PDF and DOCX files are supported.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB.");
        return;
      }

      setError("");
      setUploading(true);

      try {
        const result = await uploadResume(file);
        if (result.success && result.data) {
          onComplete(result.data);
        } else {
          setError("Failed to parse resume. Please try again.");
        }
      } catch (err) {
        const msg =
          err?.response?.data?.detail ||
          "Failed to upload and parse resume. Please try again.";
        setError(msg);
      } finally {
        setUploading(false);
      }
    },
    [onComplete]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative">
        <button
          data-testid="close-upload-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          className="text-xl font-semibold text-[#0F172A] mb-1 tracking-tight"
          style={{ fontFamily: "Instrument Sans, sans-serif" }}
        >
          Upload Your Resume
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          We'll extract your details and auto-fill the form.
        </p>

        <div
          data-testid="upload-drop-zone"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`upload-zone border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
            dragging
              ? "border-[#4F46E5] bg-[#EEF2FF]"
              : "border-slate-200 bg-slate-50 hover:border-slate-300"
          }`}
          onClick={() => document.getElementById("resume-file-input").click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-[#4F46E5] animate-spin" />
              <p className="text-sm font-medium text-[#0F172A]">
                Parsing your resume with AI...
              </p>
              <p className="text-xs text-slate-400">
                This may take a few seconds
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  Drop your resume here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF or DOCX, up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          id="resume-file-input"
          data-testid="resume-file-input"
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {error && (
          <div
            data-testid="upload-error-message"
            className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <FileText className="w-3.5 h-3.5" />
          <span>Supported formats: PDF, DOCX</span>
        </div>
      </div>
    </div>
  );
}
