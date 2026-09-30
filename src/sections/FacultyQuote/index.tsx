"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";
import { mainFaculty } from "@/data/faculty";

export default function FacultyQuote() {
  return (
    <section style={{ backgroundColor: "var(--ink)", width: "100%" }}>
      <SectionReveal>
        <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          
          {/* LEFT Half (Text) */}
          <div style={{ 
            flex: "1 1 500px", 
            minWidth: 0, 
            width: "100%",
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            padding: "clamp(2.5rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem)"
          }}>
            <span className="font-serif" style={{ 
              fontSize: "clamp(3.5rem, 8vw, 6rem)", 
              color: "rgba(206, 175, 114, 0.3)",
              lineHeight: 0.8,
              marginBottom: "0.5rem",
              display: "block"
            }}>
              "
            </span>
            
            <blockquote className="font-serif" style={{ 
              fontSize: "clamp(1.35rem, 2.5vw, 2.3rem)", 
              fontWeight: 300, 
              fontStyle: "italic", 
              color: "var(--off-white)", 
              lineHeight: 1.35,
              margin: "0 0 1.75rem 0"
            }}>
              {mainFaculty.quote}
            </blockquote>
            
            <div style={{ width: "48px", height: "1px", backgroundColor: "var(--gold)", marginBottom: "1.25rem" }}></div>
            
            <p className="font-sans" style={{ color: "var(--stone-light)", fontSize: "0.82rem", letterSpacing: "0.02em", margin: 0 }}>
              — {mainFaculty.name}, {mainFaculty.title}
            </p>
          </div>

          {/* RIGHT Half (Brand Icon Placeholder) */}
          <div style={{ 
            flex: "1 1 450px", 
            minWidth: 0, 
            width: "100%",
            position: "relative", 
            minHeight: "320px",
            aspectRatio: "16/10"
          }}>
            <BrandIconPlaceholder label={mainFaculty.name} aspectRatio="16/10" />
          </div>

        </div>
      </SectionReveal>
    </section>
  );
}
