import { forwardRef } from "react";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";

const ResumePreview = forwardRef(({ data }, ref) => {
  const TemplateComponent =
    data.template === "modern"
      ? ModernTemplate
      : data.template === "minimal"
      ? MinimalTemplate
      : ClassicTemplate;

  return (
    <div
      ref={ref}
      data-testid="resume-preview"
      className="resume-preview bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 w-full mx-auto"
      style={{
        aspectRatio: "1/1.414",
        maxWidth: "800px",
        padding: "40px",
        fontSize: "11px",
        lineHeight: "1.5",
        fontFamily: "Inter, sans-serif",
        color: "#111111",
      }}
    >
      <TemplateComponent data={data} />
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
