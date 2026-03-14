export default function About() {
  return (
    <section className="section" id="rreth-nesh" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="accent-line" />
          <h2>Rreth Nesh</h2>
          <p>Partneri juaj i besueshëm teknologjik</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Muca Technology është një kompani e dedikuar ndaj ofrimit të zgjidhjeve
              teknologjike moderne dhe të personalizuara. Ne besojmë se teknologjia
              duhet të jetë e thjeshtë, e aksesueshme dhe e fuqishme.
            </p>
            <p>
              Ekipi ynë i profesionistëve punon çdo ditë për të sjellë inovacion
              dhe cilësi në çdo projekt. Qëllimi ynë është të ndihmojmë bizneset
              të rriten dhe të arrijnë suksesin përmes teknologjisë.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card animate-in">
              <span className="number">50+</span>
              <span className="label">Projekte të përfunduara</span>
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
