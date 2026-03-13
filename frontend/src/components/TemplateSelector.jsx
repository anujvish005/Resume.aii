import { LayoutTemplate } from "lucide-react";

const templates = [
  {
    id: "classic",
    name: "Classic",
    desc: "Traditional single-column layout",
  },
  {
    id: "modern",
    name: "Modern",
    desc: "Clean with subtle accents",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Ultra-clean, maximum whitespace",
  },
];

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div data-testid="template-selector" className="mb-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-3">
        Template
      </span>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            data-testid={`template-${t.id}-btn`}
            onClick={() => onSelect(t.id)}
            className={`template-card text-left p-3 rounded-lg border transition-all ${
              selected === t.id
                ? "border-[#4F46E5] bg-[#EEF2FF] shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <LayoutTemplate
                className={`w-3.5 h-3.5 ${
                  selected === t.id ? "text-[#4F46E5]" : "text-slate-400"
                }`}
              />
              <span
                className={`text-xs font-semibold ${
                  selected === t.id ? "text-[#4F46E5]" : "text-slate-700"
                }`}
              >
                {t.name}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
