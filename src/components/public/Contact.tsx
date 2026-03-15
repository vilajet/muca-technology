import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone, FiClock } from 'react-icons/fi'

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
            Dëshironi të instaloni kamera sigurie, sisteme alarmi, apo keni nevojë
            për instalime elektrike ose internet? Na shkruani në WhatsApp për një
            konsultim pa pagesë.
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
              <FiPhone className="icon" />
              <a href="tel:+355693667770">+355 69 366 7770</a>
            </div>
            <div className="contact-info-item">
              <FiMail className="icon" />
              <a href="mailto:mucatechnology@gmail.com">mucatechnology@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <FaInstagram className="icon" />
              <a
                href="https://www.instagram.com/kamera_sigurie_muca"
                target="_blank"
                rel="noopener noreferrer"
              >
                @kamera_sigurie_muca
              </a>
            </div>
            <div className="contact-info-item">
              <FiMapPin className="icon" />
              <span>Divjakë, Lushnjë, Fier</span>
            </div>
            <div className="contact-info-item">
              <FiClock className="icon" />
              <div className="schedule">
                <span>E Hënë - E Premte: 07:00 - 21:00</span>
                <span>E Shtunë: 07:00 - 20:00</span>
                <span>E Diel: Pushim</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
