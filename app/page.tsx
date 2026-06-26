'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'services', label: 'Layanan' },
  { id: 'projects', label: 'Area' },
  { id: 'contact', label: 'Kontak' },
];

const services = [
  {
    tag: 'AC Cleaning',
    title: 'Cuci AC',
    desc: 'Pembersihan indoor dan outdoor AC dengan alat profesional agar hembusan lebih dingin, aliran udara lancar, dan unit lebih higienis.',
  },
  {
    tag: 'AC Service',
    title: 'Service AC',
    desc: 'Pengecekan keluhan AC tidak dingin, bocor, berisik, mati total, tambah freon, dan perbaikan teknis untuk rumah maupun kantor.',
  },
  {
    tag: 'Jual AC',
    title: 'Jual AC',
    desc: 'Rekomendasi dan penjualan unit AC sesuai ukuran ruangan, kebutuhan pemakaian, efisiensi listrik, dan budget pelanggan.',
  },
  {
    tag: 'Pasang AC',
    title: 'Pasang AC',
    desc: 'Instalasi AC baru, jalur pipa, bracket, drainase, vacuum instalasi, dan pengecekan fungsi setelah pemasangan.',
  },
  {
    tag: 'Vacuum Tungau',
    title: 'Cuci Vacuum Tungau Sofa',
    desc: 'Pembersihan sofa dengan vacuum extractor untuk membantu mengangkat debu halus, tungau, kotoran, dan alergen dari permukaan kain.',
  },
  {
    tag: 'Hygiene Care',
    title: 'Cuci Vacuum Tungau Kasur',
    desc: 'Vacuum tungau kasur, spring bed, dan bed cover agar area tidur terasa lebih bersih, segar, dan nyaman digunakan.',
  },
];

const workSteps = [
  'Pilih layanan dan jadwal kunjungan',
  'Teknisi cek unit atau material sofa/kasur',
  'Pengerjaan dengan alat service dan vacuum profesional',
  'Finishing, pengecekan hasil, dan saran perawatan',
];

const projectHighlights = [
  { value: '8+', label: 'tahun pengalaman' },
  { value: '1.500+', label: 'unit & sofa/kasur dikerjakan' },
  { value: '2-in-1', label: 'AC & vacuum tungau' },
  { value: '24/7', label: 'booking via WhatsApp' },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xeinaservice.web.id';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'Xeina Service',
  url: siteUrl,
  image: `${siteUrl}/xeina-service-hero.png`,
  description: 'Xeina Service melayani jasa cuci AC, service AC, jual AC, pasang AC, dan cuci vacuum tungau untuk sofa serta kasur.',
  telephone: '+6285121040541',
  email: 'servicexeina@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'CC GF 14, Jl. Boulevard Bukit Gading Raya No.6 15, RT.6/RW.14, Klp. Gading Bar.',
    addressLocality: 'Jakarta Utara',
    addressRegion: 'Daerah Khusus Ibukota Jakarta',
    postalCode: '14240',
    addressCountry: 'ID',
  },
  areaServed: ['Jakarta', 'Tangerang', 'Depok', 'Bogor', 'Bekasi'],
  priceRange: '$$',
  knowsAbout: services.map((service) => service.title),
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.desc,
      areaServed: 'Jabodetabek',
    },
  })),
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);

      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Xeina Service, saya ${formData.name}. Saya butuh ${formData.service}. No HP: ${formData.phone}. Detail: ${formData.message}`;
    window.open(`https://wa.me/6285121040541?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a href="https://wa.me/6285121040541" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        WA
      </a>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Xeina Service home">
            <span className="brand-mark" aria-hidden="true">
              <span className="tower tower-left" />
              <span className="tower tower-center" />
              <span className="tower tower-right" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Xeina Service</span>
              <span className="brand-subtitle">AC & Hygiene Care</span>
            </span>
          </button>

          <div className="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            <button className="btn-primary nav-cta" onClick={() => scrollTo('contact')}>
              Booking Layanan
            </button>
          </div>

          <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <main>
        <section id="home" className="hero-section">
          <Image
            className="hero-image"
            src="/xeina-service-hero.png"
            alt="Teknisi Xeina Service membersihkan AC, sofa, dan kasur dengan vacuum tungau"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow reveal">Xeina Service AC & Vacuum Tungau</p>
            <h1 className="hero-title reveal reveal-delay-1">
              Jasa cuci service jual pasang AC dan vacuum tungau.
            </h1>
            <p className="hero-subtitle reveal reveal-delay-2">
              Layanan rumah dan kantor untuk cuci AC, service AC, jual AC, pasang AC, serta cuci vacuum tungau sofa dan kasur dengan teknisi profesional.
            </p>
            <div className="hero-chips reveal reveal-delay-3" aria-label="Layanan utama">
              <span>Service AC</span>
              <span>Jual & Pasang AC</span>
              <span>Vacuum Tungau</span>
            </div>
            <div className="hero-actions reveal reveal-delay-3">
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Booking Sekarang
              </button>
              <button className="btn-ghost" onClick={() => scrollTo('services')}>
                Lihat Layanan
              </button>
            </div>
          </div>
          <div className="hero-status reveal reveal-delay-4">
            <span>Booking cepat Jabodetabek</span>
            <strong>AC bersih, sofa nyaman, kasur lebih higienis</strong>
          </div>
        </section>

        <section className="stats-band" aria-label="Ringkasan pengalaman">
          {projectHighlights.map((item) => (
            <div key={item.label} className="stat-item reveal">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="section split-section">
          <div className="section-copy reveal">
            <p className="section-eyebrow">Tentang Kami</p>
            <h2 className="section-title">Teknisi layanan AC dan kebersihan tungau untuk rumah sehat.</h2>
          </div>
          <div className="about-copy reveal reveal-delay-1">
            <p>
              Xeina Service membantu pemilik rumah, apartemen, kantor, dan tempat usaha menjaga kenyamanan ruangan lewat perawatan AC serta pembersihan sofa dan kasur dari debu halus dan tungau.
            </p>
            <p>
              Kami mengutamakan jadwal yang jelas, teknisi rapi, alat kerja higienis, dan komunikasi cepat via WhatsApp agar pelanggan mudah booking layanan rutin maupun pekerjaan darurat.
            </p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Layanan Kami</p>
            <h2 className="section-title">Cuci AC, service AC, jual pasang AC, dan vacuum tungau.</h2>
            <p className="section-body">
              Pilih layanan sesuai kebutuhan rumah atau kantor, dari AC yang kurang dingin sampai kasur dan sofa yang butuh dibersihkan.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className={`service-card reveal reveal-delay-${(index % 3) + 1}`}>
                <div className="service-card-top">
                  <span className="service-tag">{service.tag}</span>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Cara Kerja</p>
            <h2 className="section-title">Booking mudah, pengerjaan rapi, hasil langsung terasa.</h2>
          </div>
          <div className="process-grid">
            {workSteps.map((step, index) => (
              <div key={step} className={`process-item reveal reveal-delay-${index + 1}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Area Pekerjaan</p>
            <h2 className="section-title">Siap untuk rumah, apartemen, kantor, dan tempat usaha.</h2>
          </div>
          <div className="project-grid">
            {[
              ['Rumah & Apartemen', 'Cuci AC, service AC, pasang AC, vacuum tungau kasur, sofa, dan area tidur keluarga.'],
              ['Kantor & Ruko', 'Perawatan AC kantor, pengecekan unit, dan pembersihan sofa ruang tunggu atau area kerja.'],
              ['Kos, Klinik & Usaha', 'Layanan berkala untuk AC, kasur, sofa, dan area pelanggan agar ruangan tetap nyaman.'],
            ].map(([title, desc]) => (
              <article key={title} className="project-card reveal">
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Kontak</p>
            <h2 className="section-title">Booking layanan Xeina Service.</h2>
            <p className="section-body">Isi form singkat, lalu kami arahkan ke WhatsApp untuk jadwal teknisi dan estimasi awal.</p>
          </div>

          <div className="contact-grid">
            <form className="contact-form-wrap reveal" onSubmit={handleSubmit}>
              <label>
                Nama Lengkap
                <input type="text" placeholder="Budi Santoso" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </label>
              <label>
                Nomor WhatsApp
                <input type="tel" placeholder="0851 2104 0541" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </label>
              <label>
                Layanan
                <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                  <option value="">Pilih layanan</option>
                  <option>Cuci AC</option>
                  <option>Service AC</option>
                  <option>Jual AC</option>
                  <option>Pasang AC</option>
                  <option>Cuci Vacuum Tungau Sofa</option>
                  <option>Cuci Vacuum Tungau Kasur</option>
                  <option>Paket AC + Vacuum Tungau</option>
                </select>
              </label>
              <label>
                Detail Kebutuhan
                <textarea rows={4} placeholder="Lokasi, jumlah unit AC, keluhan AC, jumlah sofa/kasur, atau jadwal yang diinginkan." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </label>
              <button className="btn-primary" type="submit">Kirim via WhatsApp</button>
            </form>

            <aside className="contact-panel reveal reveal-delay-2">
              <h3>Informasi Kontak</h3>
              <p><span>WhatsApp</span>0851-2104-0541</p>
              <p><span>Email</span>servicexeina@gmail.com</p>
              <p><span>Alamat</span>CC GF 14, Jl. Boulevard Bukit Gading Raya No.6 15, RT.6/RW.14, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240</p>
              <p><span>Area</span>Jakarta, Tangerang, Depok, Bogor, Bekasi</p>
              <div className="panel-note">
                Booking dapat dijadwalkan untuk cuci AC, service AC, jual pasang AC, dan cuci vacuum tungau sofa atau kasur.
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Xeina Service home">
          <span className="brand-mark" aria-hidden="true">
            <span className="tower tower-left" />
            <span className="tower tower-center" />
            <span className="tower tower-right" />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Xeina Service</span>
            <span className="brand-subtitle">AC & Hygiene Care</span>
          </span>
        </button>
        <p>{new Date().getFullYear()} Xeina Service. Jasa cuci service jual pasang AC dan cuci vacuum tungau sofa kasur.</p>
      </footer>
    </>
  );
}
