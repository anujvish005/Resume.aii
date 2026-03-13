import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "Instrument Sans, sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#4F46E5",
        marginTop: "14px",
        marginBottom: "6px",
        paddingBottom: "3px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {children}
    </h2>
  );
}

export default function ModernTemplate({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, languages } = data;
  const hasContent = (arr) => arr && arr.length > 0;

  return (
    <div style={{ fontSize: "11px", lineHeight: "1.5" }}>
      {/* Header with accent bar */}
      <div style={{ marginBottom: "14px" }}>
        {contact.full_name && (
          <h1
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              marginBottom: "2px",
            }}
          >
            {contact.full_name}
          </h1>
        )}
        <div
          style={{
            width: "40px",
            height: "3px",
            background: "#4F46E5",
            borderRadius: "2px",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "10px",
            color: "#475569",
          }}
        >
          {contact.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Mail style={{ width: 10, height: 10, color: "#4F46E5" }} />
              {contact.email}
            </span>
          )}
          {contact.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Phone style={{ width: 10, height: 10, color: "#4F46E5" }} />
              {contact.phone}
            </span>
          )}
          {contact.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <MapPin style={{ width: 10, height: 10, color: "#4F46E5" }} />
              {contact.location}
            </span>
          )}
          {contact.linkedin && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Linkedin style={{ width: 10, height: 10, color: "#4F46E5" }} />
              {contact.linkedin}
            </span>
          )}
          {contact.website && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Globe style={{ width: 10, height: 10, color: "#4F46E5" }} />
              {contact.website}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <>
          <SectionTitle>Profile</SectionTitle>
          <p style={{ color: "#334155" }}>{summary}</p>
        </>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600, fontSize: "12px", color: "#0F172A" }}>
                  {exp.position}
                </span>
                <span style={{ fontSize: "10px", color: "#64748B", whiteSpace: "nowrap" }}>
                  {exp.start_date}
                  {(exp.end_date || exp.current) && ` — ${exp.current ? "Present" : exp.end_date}`}
                </span>
              </div>
              {exp.company && (
                <span style={{ fontSize: "10px", color: "#4F46E5", fontWeight: 500 }}>
                  {exp.company}
                </span>
              )}
              {exp.description && (
                <div style={{ color: "#334155", marginTop: "3px", whiteSpace: "pre-line" }}>
                  {exp.description.split("\n").map((line, j) => (
                    <div key={j}>
                      {line.trim().startsWith("-") || line.trim().startsWith("•") ? (
                        <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                          <span style={{ color: "#4F46E5" }}>•</span>
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
                <span style={{ fontWeight: 600, color: "#0F172A" }}>
                  {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                </span>
                <span style={{ fontSize: "10px", color: "#64748B", whiteSpace: "nowrap" }}>
                  {edu.start_date}{edu.end_date && ` — ${edu.end_date}`}
                </span>
              </div>
              <span style={{ fontSize: "10px", color: "#4F46E5", fontWeight: 500 }}>
                {edu.institution}
              </span>
              {edu.gpa && (
                <span style={{ fontSize: "10px", color: "#64748B", marginLeft: "8px" }}>
                  GPA: {edu.gpa}
                </span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Two-column: Skills + Languages */}
      <div style={{ display: "flex", gap: "20px" }}>
        {hasContent(skills) && (
          <div style={{ flex: 1 }}>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {skills.map((s) => (
                <span
                  key={s}
                  style={{
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "3px",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {hasContent(languages) && (
          <div style={{ minWidth: "120px" }}>
            <SectionTitle>Languages</SectionTitle>
            <p style={{ color: "#334155" }}>{languages.join(" • ")}</p>
          </div>
        )}
      </div>

      {/* Projects */}
      {hasContent(projects) && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={proj.id || i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600, color: "#0F172A" }}>{proj.name}</span>
                {proj.technologies && (
                  <span style={{ fontSize: "10px", color: "#4F46E5" }}>{proj.technologies}</span>
                )}
              </div>
              {proj.description && <p style={{ color: "#334155", marginTop: "1px" }}>{proj.description}</p>}
              {proj.link && <span style={{ fontSize: "10px", color: "#4F46E5" }}>{proj.link}</span>}
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
    </div>
  );
}
