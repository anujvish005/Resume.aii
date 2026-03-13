import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { enhanceText } from "@/lib/api";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Sparkles,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Globe,
  Loader2,
  X,
} from "lucide-react";

function FieldGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, onAdd, addLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#4F46E5]" />
        <h3
          className="text-sm font-semibold text-[#0F172A] tracking-tight"
          style={{ fontFamily: "Instrument Sans, sans-serif" }}
        >
          {title}
        </h3>
      </div>
      {onAdd && (
        <Button
          data-testid={`add-${title.toLowerCase().replace(/\s/g, "-")}-btn`}
          variant="ghost"
          size="sm"
          onClick={onAdd}
          className="text-[#4F46E5] hover:text-[#4338CA] hover:bg-[#E0E7FF] text-xs h-7 px-2"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          {addLabel || "Add"}
        </Button>
      )}
    </div>
  );
}

export default function ResumeForm({ data, onChange }) {
  const [enhancing, setEnhancing] = useState(null);

  const updateContact = useCallback(
    (field, value) => {
      onChange({ contact: { ...data.contact, [field]: value } });
    },
    [data.contact, onChange]
  );

  const addExperience = () => {
    onChange({
      experience: [
        ...data.experience,
        {
          id: `exp-${Date.now()}`,
          company: "",
          position: "",
          start_date: "",
          end_date: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ experience: updated });
  };

  const removeExperience = (index) => {
    onChange({ experience: data.experience.filter((_, i) => i !== index) });
  };

  const addEducation = () => {
    onChange({
      education: [
        ...data.education,
        {
          id: `edu-${Date.now()}`,
          institution: "",
          degree: "",
          field_of_study: "",
          start_date: "",
          end_date: "",
          gpa: "",
        },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ education: updated });
  };

  const removeEducation = (index) => {
    onChange({ education: data.education.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    onChange({
      projects: [
        ...data.projects,
        {
          id: `proj-${Date.now()}`,
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ projects: updated });
  };

  const removeProject = (index) => {
    onChange({ projects: data.projects.filter((_, i) => i !== index) });
  };

  const addCertification = () => {
    onChange({
      certifications: [
        ...data.certifications,
        { id: `cert-${Date.now()}`, name: "", issuer: "", date: "" },
      ],
    });
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ certifications: updated });
  };

  const removeCertification = (index) => {
    onChange({
      certifications: data.certifications.filter((_, i) => i !== index),
    });
  };

  // Skills management
  const [skillInput, setSkillInput] = useState("");
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      onChange({ skills: [...data.skills, trimmed] });
      setSkillInput("");
    }
  };
  const removeSkill = (skill) => {
    onChange({ skills: data.skills.filter((s) => s !== skill) });
  };

  // Languages management
  const [langInput, setLangInput] = useState("");
  const addLanguage = () => {
    const trimmed = langInput.trim();
    if (trimmed && !data.languages.includes(trimmed)) {
      onChange({ languages: [...data.languages, trimmed] });
      setLangInput("");
    }
  };
  const removeLanguage = (lang) => {
    onChange({ languages: data.languages.filter((l) => l !== lang) });
  };

  // AI enhance
  const handleEnhance = async (text, context, callback) => {
    if (!text.trim()) {
      toast.error("Nothing to enhance. Add some text first.");
      return;
    }
    setEnhancing(context);
    try {
      const res = await enhanceText(text, context);
      if (res.success) {
        callback(res.enhanced);
        toast.success("Text enhanced with AI!");
      }
    } catch {
      toast.error("Enhancement failed. Please try again.");
    } finally {
      setEnhancing(null);
    }
  };

  const inputClass =
    "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-md h-10 px-3 transition-all text-sm";
  const textareaClass =
    "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-md px-3 py-2 transition-all text-sm min-h-[80px]";

  return (
    <div data-testid="resume-form">
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-slate-50 p-1 rounded-lg mb-4">
          <TabsTrigger value="contact" className="text-xs flex-1 min-w-0" data-testid="tab-contact">
            <User className="w-3 h-3 mr-1" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs flex-1 min-w-0" data-testid="tab-summary">
            <FileText className="w-3 h-3 mr-1" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs flex-1 min-w-0" data-testid="tab-experience">
            <Briefcase className="w-3 h-3 mr-1" />
            Work
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs flex-1 min-w-0" data-testid="tab-education">
            <GraduationCap className="w-3 h-3 mr-1" />
            Edu
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs flex-1 min-w-0" data-testid="tab-skills">
            <Wrench className="w-3 h-3 mr-1" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="extras" className="text-xs flex-1 min-w-0" data-testid="tab-extras">
            <FolderOpen className="w-3 h-3 mr-1" />
            More
          </TabsTrigger>
        </TabsList>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <SectionHeader icon={User} title="Contact Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldGroup label="Full Name">
              <Input
                data-testid="contact-full-name"
                className={inputClass}
                placeholder="John Doe"
                value={data.contact.full_name}
                onChange={(e) => updateContact("full_name", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Email">
              <Input
                data-testid="contact-email"
                className={inputClass}
                type="email"
                placeholder="john@example.com"
                value={data.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Phone">
              <Input
                data-testid="contact-phone"
                className={inputClass}
                placeholder="+1 (555) 000-0000"
                value={data.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Location">
              <Input
                data-testid="contact-location"
                className={inputClass}
                placeholder="San Francisco, CA"
                value={data.contact.location}
                onChange={(e) => updateContact("location", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="LinkedIn">
              <Input
                data-testid="contact-linkedin"
                className={inputClass}
                placeholder="linkedin.com/in/johndoe"
                value={data.contact.linkedin}
                onChange={(e) => updateContact("linkedin", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Website">
              <Input
                data-testid="contact-website"
                className={inputClass}
                placeholder="johndoe.com"
                value={data.contact.website}
                onChange={(e) => updateContact("website", e.target.value)}
              />
            </FieldGroup>
          </div>
        </TabsContent>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <SectionHeader icon={FileText} title="Professional Summary" />
          <FieldGroup label="Summary">
            <Textarea
              data-testid="summary-text"
              className={textareaClass}
              placeholder="Experienced software engineer with 5+ years..."
              value={data.summary}
              onChange={(e) => onChange({ summary: e.target.value })}
              rows={5}
            />
          </FieldGroup>
          <Button
            data-testid="enhance-summary-btn"
            variant="outline"
            size="sm"
            disabled={enhancing === "summary"}
            onClick={() =>
              handleEnhance(data.summary, "summary", (v) =>
                onChange({ summary: v })
              )
            }
            className="text-xs border-[#E0E7FF] text-[#4F46E5] hover:bg-[#E0E7FF]"
          >
            {enhancing === "summary" ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 mr-1" />
            )}
            Enhance with AI
          </Button>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4">
          <SectionHeader
            icon={Briefcase}
            title="Work Experience"
            onAdd={addExperience}
            addLabel="Add Position"
          />
          {data.experience.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">
              No work experience added yet. Click "Add Position" to begin.
            </p>
          )}
          {data.experience.map((exp, i) => (
            <div
              key={exp.id}
              data-testid={`experience-item-${i}`}
              className="border border-slate-100 rounded-lg p-4 space-y-3 bg-slate-50/50"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-500">
                  Position {i + 1}
                </span>
                <Button
                  data-testid={`remove-experience-${i}-btn`}
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(i)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldGroup label="Company">
                  <Input
                    data-testid={`exp-company-${i}`}
                    className={inputClass}
                    placeholder="Google"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(i, "company", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Position">
                  <Input
                    data-testid={`exp-position-${i}`}
                    className={inputClass}
                    placeholder="Software Engineer"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(i, "position", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Start Date">
                  <Input
                    data-testid={`exp-start-date-${i}`}
                    className={inputClass}
                    placeholder="Jan 2022"
                    value={exp.start_date}
                    onChange={(e) =>
                      updateExperience(i, "start_date", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="End Date">
                  <Input
                    data-testid={`exp-end-date-${i}`}
                    className={inputClass}
                    placeholder="Present"
                    value={exp.end_date}
                    onChange={(e) =>
                      updateExperience(i, "end_date", e.target.value)
                    }
                    disabled={exp.current}
                  />
                </FieldGroup>
              </div>
              <FieldGroup label="Description">
                <Textarea
                  data-testid={`exp-description-${i}`}
                  className={textareaClass}
                  placeholder="Describe your key achievements and responsibilities..."
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(i, "description", e.target.value)
                  }
                  rows={3}
                />
              </FieldGroup>
              <Button
                data-testid={`enhance-exp-${i}-btn`}
                variant="outline"
                size="sm"
                disabled={enhancing === `exp-${i}`}
                onClick={() =>
                  handleEnhance(
                    exp.description,
                    `work experience at ${exp.company} as ${exp.position}`,
                    (v) => updateExperience(i, "description", v)
                  )
                }
                className="text-xs border-[#E0E7FF] text-[#4F46E5] hover:bg-[#E0E7FF]"
              >
                {enhancing === `exp-${i}` ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                )}
                Enhance
              </Button>
            </div>
          ))}
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <SectionHeader
            icon={GraduationCap}
            title="Education"
            onAdd={addEducation}
            addLabel="Add Education"
          />
          {data.education.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">
              No education added yet. Click "Add Education" to begin.
            </p>
          )}
          {data.education.map((edu, i) => (
            <div
              key={edu.id}
              data-testid={`education-item-${i}`}
              className="border border-slate-100 rounded-lg p-4 space-y-3 bg-slate-50/50"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-500">
                  Education {i + 1}
                </span>
                <Button
                  data-testid={`remove-education-${i}-btn`}
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(i)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldGroup label="Institution">
                  <Input
                    data-testid={`edu-institution-${i}`}
                    className={inputClass}
                    placeholder="MIT"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(i, "institution", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Degree">
                  <Input
                    data-testid={`edu-degree-${i}`}
                    className={inputClass}
                    placeholder="B.S."
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(i, "degree", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Field of Study">
                  <Input
                    data-testid={`edu-field-${i}`}
                    className={inputClass}
                    placeholder="Computer Science"
                    value={edu.field_of_study}
                    onChange={(e) =>
                      updateEducation(i, "field_of_study", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="GPA">
                  <Input
                    data-testid={`edu-gpa-${i}`}
                    className={inputClass}
                    placeholder="3.8/4.0"
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(i, "gpa", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Start Date">
                  <Input
                    data-testid={`edu-start-date-${i}`}
                    className={inputClass}
                    placeholder="Sep 2018"
                    value={edu.start_date}
                    onChange={(e) =>
                      updateEducation(i, "start_date", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="End Date">
                  <Input
                    data-testid={`edu-end-date-${i}`}
                    className={inputClass}
                    placeholder="Jun 2022"
                    value={edu.end_date}
                    onChange={(e) =>
                      updateEducation(i, "end_date", e.target.value)
                    }
                  />
                </FieldGroup>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div>
            <SectionHeader icon={Wrench} title="Skills" />
            <div className="flex gap-2 mb-3">
              <Input
                data-testid="skill-input"
                className={`${inputClass} flex-1`}
                placeholder="e.g., JavaScript, Python, AWS"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button
                data-testid="add-skill-btn"
                size="sm"
                onClick={addSkill}
                className="bg-[#4F46E5] text-white hover:bg-[#4338CA] h-10 px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-[#E0E7FF] text-[#4F46E5] border-0 px-3 py-1 text-xs font-medium flex items-center gap-1"
                >
                  {skill}
                  <button
                    data-testid={`remove-skill-${skill}`}
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader icon={Globe} title="Languages" />
            <div className="flex gap-2 mb-3">
              <Input
                data-testid="language-input"
                className={`${inputClass} flex-1`}
                placeholder="e.g., English, Spanish"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addLanguage())
                }
              />
              <Button
                data-testid="add-language-btn"
                size="sm"
                onClick={addLanguage}
                className="bg-[#4F46E5] text-white hover:bg-[#4338CA] h-10 px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="bg-slate-100 text-slate-700 border-0 px-3 py-1 text-xs font-medium flex items-center gap-1"
                >
                  {lang}
                  <button
                    data-testid={`remove-lang-${lang}`}
                    onClick={() => removeLanguage(lang)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Extras Tab */}
        <TabsContent value="extras" className="space-y-6">
          {/* Projects */}
          <div>
            <SectionHeader
              icon={FolderOpen}
              title="Projects"
              onAdd={addProject}
              addLabel="Add Project"
            />
            {data.projects.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">
                No projects added yet.
              </p>
            )}
            {data.projects.map((proj, i) => (
              <div
                key={proj.id}
                data-testid={`project-item-${i}`}
                className="border border-slate-100 rounded-lg p-4 space-y-3 bg-slate-50/50 mb-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-500">
                    Project {i + 1}
                  </span>
                  <Button
                    data-testid={`remove-project-${i}-btn`}
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(i)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FieldGroup label="Project Name">
                    <Input
                      data-testid={`proj-name-${i}`}
                      className={inputClass}
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(i, "name", e.target.value)
                      }
                    />
                  </FieldGroup>
                  <FieldGroup label="Technologies">
                    <Input
                      data-testid={`proj-tech-${i}`}
                      className={inputClass}
                      placeholder="React, Node.js"
                      value={proj.technologies}
                      onChange={(e) =>
                        updateProject(i, "technologies", e.target.value)
                      }
                    />
                  </FieldGroup>
                </div>
                <FieldGroup label="Description">
                  <Textarea
                    data-testid={`proj-desc-${i}`}
                    className={textareaClass}
                    placeholder="Describe the project..."
                    value={proj.description}
                    onChange={(e) =>
                      updateProject(i, "description", e.target.value)
                    }
                    rows={2}
                  />
                </FieldGroup>
                <FieldGroup label="Link">
                  <Input
                    data-testid={`proj-link-${i}`}
                    className={inputClass}
                    placeholder="https://github.com/..."
                    value={proj.link}
                    onChange={(e) =>
                      updateProject(i, "link", e.target.value)
                    }
                  />
                </FieldGroup>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <SectionHeader
              icon={Award}
              title="Certifications"
              onAdd={addCertification}
              addLabel="Add Cert"
            />
            {data.certifications.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">
                No certifications added yet.
              </p>
            )}
            {data.certifications.map((cert, i) => (
              <div
                key={cert.id}
                data-testid={`certification-item-${i}`}
                className="border border-slate-100 rounded-lg p-4 space-y-3 bg-slate-50/50 mb-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-500">
                    Certification {i + 1}
                  </span>
                  <Button
                    data-testid={`remove-cert-${i}-btn`}
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(i)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FieldGroup label="Name">
                    <Input
                      data-testid={`cert-name-${i}`}
                      className={inputClass}
                      placeholder="AWS Solutions Architect"
                      value={cert.name}
                      onChange={(e) =>
                        updateCertification(i, "name", e.target.value)
                      }
                    />
                  </FieldGroup>
                  <FieldGroup label="Issuer">
                    <Input
                      data-testid={`cert-issuer-${i}`}
                      className={inputClass}
                      placeholder="Amazon"
                      value={cert.issuer}
                      onChange={(e) =>
                        updateCertification(i, "issuer", e.target.value)
                      }
                    />
                  </FieldGroup>
                  <FieldGroup label="Date">
                    <Input
                      data-testid={`cert-date-${i}`}
                      className={inputClass}
                      placeholder="Mar 2023"
                      value={cert.date}
                      onChange={(e) =>
                        updateCertification(i, "date", e.target.value)
                      }
                    />
                  </FieldGroup>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
