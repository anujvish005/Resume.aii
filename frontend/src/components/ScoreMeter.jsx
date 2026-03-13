import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ScoreMeter({ data }) {
  const { score, tips } = useMemo(() => {
    let s = 0;
    const t = [];

    // Contact info (max 20)
    if (data.contact?.full_name) s += 5;
    else t.push("Add your full name");
    if (data.contact?.email) s += 5;
    else t.push("Add your email");
    if (data.contact?.phone) s += 5;
    else t.push("Add your phone number");
    if (data.contact?.location) s += 5;
    else t.push("Add your location");

    // Summary (max 15)
    if (data.summary) {
      s += 10;
      if (data.summary.length >= 100) s += 5;
      else t.push("Expand your summary (aim for 100+ chars)");
    } else {
      t.push("Add a professional summary");
    }

    // Experience (max 25)
    if (data.experience?.length > 0) {
      s += 15;
      if (data.experience.length >= 2) s += 5;
      const hasDescriptions = data.experience.some(
        (e) => e.description && e.description.length > 20
      );
      if (hasDescriptions) s += 5;
      else t.push("Add descriptions to your experience");
    } else {
      t.push("Add work experience");
    }

    // Education (max 15)
    if (data.education?.length > 0) {
      s += 10;
      if (data.education[0]?.degree) s += 5;
    } else {
      t.push("Add education details");
    }

    // Skills (max 15)
    if (data.skills?.length > 0) {
      s += 8;
      if (data.skills.length >= 5) s += 7;
      else t.push("Add more skills (aim for 5+)");
    } else {
      t.push("Add your skills");
    }

    // Projects / Certifications / Languages (max 10)
    if (data.projects?.length > 0) s += 4;
    if (data.certifications?.length > 0) s += 3;
    if (data.languages?.length > 0) s += 3;

    return { score: Math.min(s, 100), tips: t.slice(0, 3) };
  }, [data]);

  const color =
    score >= 80
      ? "text-emerald-600"
      : score >= 50
      ? "text-amber-500"
      : "text-red-500";
  const barColor =
    score >= 80
      ? "bg-emerald-500"
      : score >= 50
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div data-testid="ats-score-meter" className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-semibold uppercase tracking-widest text-slate-500"
        >
          ATS Score
        </span>
        <span
          className={`text-lg font-semibold tracking-tight ${color}`}
          style={{ fontFamily: "Instrument Sans, sans-serif" }}
        >
          {score}%
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {tips.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {tips.map((tip) => (
            <div
              key={tip}
              className="flex items-start gap-2 text-xs text-slate-500"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
      {score >= 80 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
          <CheckCircle className="w-3.5 h-3.5" />
          <span className="font-medium">Your resume looks ATS-ready!</span>
        </div>
      )}
    </div>
  );
}
