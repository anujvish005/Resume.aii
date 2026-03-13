function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "Instrument Sans, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "#94A3B8",
        marginTop: "16px",
        marginBottom: "8px",
      }}
    >
      {children}
    </h2>
  );
}

export default function MinimalTemplate({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, languages } = data;
  const hasContent = (arr) => arr && arr.length > 0;

  return (
    <div style={{ fontSize: "11px", lineHeight: "1.6", color: "#334155" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        {contact.full_name && (
          <h1
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: "26px",
              fontWeight: 400,
              color: "#0F172A",
              letterSpacing: "-0.03em",
              marginBottom: "6px",
            }}
          >
            {contact.full_name}
          </h1>
        )}
        <div style={{ fontSize: "10px", color: "#64748B", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>·  {contact.phone}</span>}
          {contact.location && <span>·  {contact.location}</span>}
          {contact.linkedin && <span>·  {contact.linkedin}</span>}
          {contact.website && <span>·  {contact.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <>
          <SectionTitle>About</SectionTitle>
          <p>{summary}</p>
        </>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>{exp.position}</span>
                  {exp.company && <span style={{ color: "#64748B" }}>, {exp.company}</span>}
                </div>
                <span style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap" }}>
                  {exp.start_date}{(exp.end_date || exp.current) && ` – ${exp.current ? "Present" : exp.end_date}`}
                </span>
              </div>
              {exp.description && (
                <div style={{ marginTop: "3px", whiteSpace: "pre-line" }}>
                  {exp.description.split("\n").map((line, j) => (
                    <div key={j}>
                      {line.trim().startsWith("-") || line.trim().startsWith("•") ? (
                        <div style={{ display: "flex", gap: "6px", marginLeft: "4px" }}>
                          <span style={{ color: "#94A3B8" }}>–</span>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>
                    {edu.degree}{edu.field_of_study && `, ${edu.field_of_study}`}
                  </span>
                  {edu.institution && <span style={{ color: "#64748B" }}> — {edu.institution}</span>}
                </div>
                <span style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap" }}>
                  {edu.start_date}{edu.end_date && ` – ${edu.end_date}`}
                </span>
              </div>
              {edu.gpa && <span style={{ fontSize: "10px", color: "#94A3B8" }}>GPA: {edu.gpa}</span>}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p>{skills.join("  ·  ")}</p>
        </>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={proj.id || i} style={{ marginBottom: "6px" }}>
              <span style={{ fontWeight: 600, color: "#0F172A" }}>{proj.name}</span>
              {proj.technologies && (
                <span style={{ fontSize: "10px", color: "#94A3B8", marginLeft: "6px" }}>
                  ({proj.technologies})
                </span>
              )}
              {proj.description && <p style={{ marginTop: "1px" }}>{proj.description}</p>}
              {proj.link && <span style={{ fontSize: "10px", color: "#64748B" }}>{proj.link}</span>}
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <div key={cert.id || i} style={{ marginBottom: "3px" }}>
              <span style={{ fontWeight: 600, color: "#0F172A" }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: "#64748B" }}> — {cert.issuer}</span>}
              {cert.date && <span style={{ fontSize: "10px", color: "#94A3B8", marginLeft: "6px" }}>{cert.date}</span>}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {hasContent(languages) && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p>{languages.join("  ·  ")}</p>
        </>
      )}
    </div>
  );
}
