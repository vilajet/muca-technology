import { FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin } from 'react-icons/fi'

export default function Contact() {
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || ''

  return (
    <section className="section" id="kontakt">
      <div className="container">
        <div className="section-header">
          <div className="accent-line" />
          <h2>Na Kontaktoni</h2>
          <p>Jemi gjithmonë të gatshëm t&apos;ju ndihmojmë</p>
        </div>

        <div className="contact-content">
          <p>
            Keni pyetje apo dëshironi të diskutoni një projekt? Na shkruani në
            WhatsApp dhe do t&apos;ju përgjigjemi sa më shpejt.
          </p>
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp size={24} /> Shkruani në WhatsApp
            </a>
          )}

          <div className="contact-info">
            <div className="contact-info-item">
              <FiMail className="icon" />
              <span>info@mucatechnology.com</span>
            </div>
            <div className="contact-info-item">
              <FiMapPin className="icon" />
              <span>Shqipëri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
