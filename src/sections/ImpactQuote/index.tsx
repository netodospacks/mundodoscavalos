import { SectionReveal } from '@/components/ui/SectionReveal';

export default function ImpactQuote() {
  return (
    <section className="section-gap" style={{ backgroundColor: 'var(--ink-soft)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ height: '1px', width: '48px', backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <span className="text-label font-sans" style={{ color: 'var(--gold)', textTransform: 'uppercase' }}>FUNDAMENTO</span>
            </div>
            
            <div className="font-serif" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'clamp(1.6rem, 4.2vw, 3.5rem)', lineHeight: 1.25, color: 'var(--off-white)' }}>
              <span>O conhecimento transforma o manejo.</span>
              <span style={{ paddingLeft: 'clamp(0px, 4vw, 2.5rem)' }}>O manejo transforma a relação.</span>
              <span style={{ paddingLeft: 'clamp(0px, 8vw, 5rem)', fontStyle: 'italic', fontWeight: 'bold', color: 'var(--gold-light)' }}>E o respeito transforma tudo.</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

