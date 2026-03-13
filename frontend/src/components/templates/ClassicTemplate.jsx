import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

function SectionTitle({ children }) {
  return (
    <div className="mb-2 mt-4 first:mt-0">
      <h2
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0F172A",
          borderBottom: "1.5px solid #0F172A",
          paddingBottom: "3px",
          marginBottom: "6px",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

export default function ClassicTemplate({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, languages } = data;
  const hasContent = (arr) => arr && arr.length > 0;

  return (
    <div style={{ fontSize: "11px", lineHeight: "1.5" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        {contact.full_name && (
          <h1
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "4px",
              letterSpacing: "-0.02em",
            }}
          >
            {contact.full_name}
          </h1>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            fontSize: "10px",
            color: "#475569",
          }}
        >
          {contact.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Mail style={{ width: 10, height: 10 }} />
              {contact.email}
            </span>
          )}
          {contact.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Phone style={{ width: 10, height: 10 }} />
              {contact.phone}
            </span>
          )}
          {contact.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <MapPin style={{ width: 10, height: 10 }} />
              {contact.location}
            </span>
          )}
          {contact.linkedin && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Linkedin style={{ width: 10, height: 10 }} />
              {contact.linkedin}
            </span>
          )}
          {contact.website && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Globe style={{ width: 10, height: 10 }} />
              {contact.website}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ color: "#334155", fontSize: "11px" }}>{summary}</p>
        </>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <>
          <SectionTitle>Work Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>{exp.position}</span>
                  {exp.company && (
                    <span style={{ color: "#475569" }}> — {exp.company}</span>
                  )}
                </div>
                <span style={{ fontSize: "10px", color: "#64748B", whiteSpace: "nowrap" }}>
                  {exp.start_date}
                  {(exp.end_date || exp.current) && ` — ${exp.current ? "Present" : exp.end_date}`}
                </span>
              </div>
              {exp.description && (
                <div style={{ color: "#334155", marginTop: "2px", whiteSpace: "pre-line" }}>
                  {exp.description.split("\n").map((line, j) => (
                    <div key={j} style={{ paddingLeft: line.trim().startsWith("-") || line.trim().startsWith("•") ? "0" : "0" }}>
                      {line.trim().startsWith("-") || line.trim().startsWith("•") ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                          <span>•</span>
                          <span>{line.replace(/^[-•]\s*/, "")}</span>
                        </div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {hasContent(education) && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={edu.id || i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>
                    {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                  </span>
                  {edu.institution && (
                    <span style={{ color: "#475569" }}> — {edu.institution}</span>
                  )}
                </div>
                <span style={{ fontSize: "10px", color: "#64748B", whiteSpace: "nowrap" }}>
                  {edu.start_date}
                  {edu.end_date && ` — ${edu.end_date}`}
                </span>
              </div>
              {edu.gpa && (
                <span style={{ fontSize: "10px", color: "#64748B" }}>GPA: {edu.gpa}</span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p style={{ color: "#334155" }}>{skills.join(" • ")}</p>
        </>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={proj.id || i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600, color: "#0F172A" }}>{proj.name}</span>
                {proj.technologies && (
                  <span style={{ fontSize: "10px", color: "#64748B" }}>{proj.technologies}</span>
                )}
              </div>
              {proj.description && (
                <p style={{ color: "#334155", marginTop: "1px" }}>{proj.description}</p>
              )}
              {proj.link && (
                <span style={{ fontSize: "10px", color: "#4F46E5" }}>{proj.link}</span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <div key={cert.id || i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
              <span>
                <span style={{ fontWeight: 600, color: "#0F172A" }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: "#475569" }}> — {cert.issuer}</span>}
              </span>
              {cert.date && <span style={{ fontSize: "10px", color: "#64748B" }}>{cert.date}</span>}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {hasContent(languages) && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p style={{ color: "#334155" }}>{languages.join(" • ")}</p>
        </>
      )}
    </div>
  );
}
