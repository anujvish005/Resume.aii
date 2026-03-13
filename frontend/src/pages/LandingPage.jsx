import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Sparkles,
  Download,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  LayoutTemplate,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

const features = [
  {
    icon: Upload,
    title: "Upload & Auto-Fill",
    desc: "Drop your existing resume and watch it auto-populate every field instantly.",
    span: "col-span-1",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    desc: "Transform weak bullet points into impactful achievements with one click.",
    span: "col-span-1",
  },
  {
    icon: Shield,
    title: "ATS Optimized",
    desc: "Every template passes Applicant Tracking Systems. No graphics, no gimmicks.",
    span: "col-span-1",
  },
  {
    icon: LayoutTemplate,
    title: "3 Pro Templates",
    desc: "Classic, Modern, and Minimal — each battle-tested with real recruiters.",
    span: "col-span-1",
  },
  {
    icon: Zap,
    title: "Live Preview",
    desc: "See changes in real-time as you type. What you see is what recruiters get.",
    span: "col-span-1",
  },
  {
    icon: Download,
    title: "PDF Download",
    desc: "Export a pixel-perfect PDF ready to submit to any job portal.",
    span: "col-span-1",
  },
];

const stats = [
  { value: "98%", label: "ATS Pass Rate" },
  { value: "3", label: "Pro Templates" },
  { value: "30s", label: "Upload & Parse" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4F46E5]" />
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Resume.aii
            </span>
          </div>
          <Button
            data-testid="nav-build-resume-btn"
            onClick={() => navigate("/builder")}
            className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-md px-6 h-10 font-medium transition-all active:scale-95"
          >
            Build Resume
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="secondary"
                className="mb-6 bg-[#E0E7FF] text-[#4F46E5] border-0 px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              >
                ATS-Optimized Resumes
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] text-[#0F172A]"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Build resumes that
              <br />
              <span className="text-[#4F46E5]">pass every screen.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-base md:text-lg text-slate-500 max-w-xl leading-relaxed"
            >
              Upload your existing resume or start from scratch. Our AI-powered
              builder creates ATS-friendly resumes that get you past automated
              screening and into interviews.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                data-testid="hero-build-resume-btn"
                onClick={() => navigate("/builder")}
                className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-md px-8 py-3 h-12 text-base font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
              >
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                data-testid="hero-upload-resume-btn"
                variant="outline"
                onClick={() => navigate("/builder?upload=true")}
                className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md px-8 py-3 h-12 text-base font-medium"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Existing Resume
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 flex gap-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <div
                    className="text-2xl font-semibold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "Instrument Sans, sans-serif" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Everything you need
            </p>
            <h2
              className="text-2xl font-medium tracking-tight text-[#0F172A]"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Built for the modern job market
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`bg-white border border-slate-100 rounded-lg p-8 hover:border-indigo-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${f.span}`}
              >
                <div className="w-10 h-10 rounded-md bg-[#E0E7FF] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <h3
                  className="text-base font-semibold text-[#0F172A] mb-2"
                  style={{ fontFamily: "Instrument Sans, sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              How it works
            </p>
            <h2
              className="text-2xl font-medium tracking-tight text-[#0F172A]"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Three steps to your next interview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload or Enter",
                desc: "Drop your existing resume to auto-fill, or start typing your details from scratch.",
              },
              {
                step: "02",
                title: "Customize & Enhance",
                desc: "Pick a template, tweak your content, and let AI polish your bullet points.",
              },
              {
                step: "03",
                title: "Download & Apply",
                desc: "Export a clean PDF and start applying with confidence. ATS-ready, every time.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="relative"
              >
                <div
                  className="text-6xl font-bold text-slate-100 mb-4"
                  style={{ fontFamily: "Instrument Sans, sans-serif" }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-base font-semibold text-[#0F172A] mb-2"
                  style={{ fontFamily: "Instrument Sans, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4"
            style={{ fontFamily: "Instrument Sans, sans-serif" }}
          >
            Ready to land your next role?
          </h2>
          <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto">
            Join thousands of professionals who've upgraded their resume game.
            No sign-up required.
          </p>
          <Button
            data-testid="cta-build-resume-btn"
            onClick={() => navigate("/builder")}
            className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-md px-8 py-3 h-12 text-base font-medium transition-all active:scale-95"
          >
            Build Your Resume Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              No sign-up
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              ATS-ready
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Resume.aii</span>
          </div>
          <span>Built with precision.</span>
        </div>
      </footer>
    </div>
  );
}
