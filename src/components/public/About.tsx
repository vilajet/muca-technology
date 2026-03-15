export default function About() {
  return (
    <section className="section" id="rreth-nesh" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="accent-line" />
          <h2>Rreth Nesh</h2>
          <p>Partneri juaj i besueshëm për siguri dhe teknologji</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Muca Technology është e specializuar në instalimin e kamerave të sigurisë
              për shtëpi dhe biznese, sistemeve të alarmit, instalimeve elektrike,
              si dhe konfigurimeve të internetit dhe TV-së. Cilësia dhe besueshmëria
              janë në themel të çdo pune që bëjmë.
            </p>
            <p>
              Me vite eksperiencë në fushën e sigurisë dhe teknologjisë, ne ofrojmë
              zgjidhje profesionale dhe të personalizuara për çdo klient. Nga konsultimi
              fillestar deri te instalimi dhe mirëmbajtja — jemi gjithmonë pranë jush.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card animate-in">
              <span className="number">50+</span>
              <span className="label">Instalime të përfunduara</span>
            </div>
            <div className="stat-card animate-in">
              <span className="number">30+</span>
              <span className="label">Klientë të kënaqur</span>
            </div>
            <div className="stat-card animate-in">
              <span className="number">5+</span>
              <span className="label">Vite eksperiencë</span>
            </div>
            <div className="stat-card animate-in">
              <span className="number">24/7</span>
              <span className="label">Mbështetje teknike</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
