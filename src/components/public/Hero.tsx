import { FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Hero() {
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || ''

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-logo">M</div>
        <h1>Muca Technology</h1>
        <p className="tagline">
          Instalim profesional i kamerave të sigurisë, sistemeve të alarmit,
          instalimeve elektrike, internetit dhe TV-së për shtëpinë dhe biznesin tuaj.
        </p>
        <div className="hero-buttons">
          <a href="#sherbimet" className="btn btn-primary">
            Shërbimet Tona <FiArrowRight />
          </a>
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FaWhatsapp /> Na Kontaktoni
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
