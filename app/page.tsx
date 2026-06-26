'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'services', label: 'Layanan' },
  { id: 'projects', label: 'Proyek' },
  { id: 'contact', label: 'Kontak' },
];

const services = [
  {
    tag: 'Contractor',
    title: 'Renovasi Bangunan',
    desc: 'Renovasi rumah, ruko, kantor, fasad, plafon, lantai, kamar mandi, dapur, dan pembaruan ruang agar properti siap dipakai.',
  },
  {
    tag: 'AC Service',
    title: 'Service & Cuci AC',
    desc: 'Cuci AC, perbaikan unit, tambah freon, pengecekan kebocoran, dan perawatan AC untuk hunian maupun properti komersial.',
  },
  {
    tag: 'Instalasi',
    title: 'Instalasi AC & Utilitas',
    desc: 'Pemasangan AC baru, jalur pipa, drainase, listrik pendukung, dan koordinasi utilitas saat pekerjaan renovasi berjalan.',
  },
  {
    tag: 'Property Care',
    title: 'Perawatan Gedung',
    desc: 'Maintenance berkala, perbaikan ringan, pengecatan, waterproofing, kebocoran, dan pekerjaan darurat untuk properti aktif.',
  },
  {
    tag: 'Fit Out',
    title: 'Interior & Finishing',
    desc: 'Partisi, plafon, lighting, kabinet, meja kerja, dan finishing interior untuk rumah, kantor, klinik, retail, dan ruko.',
  },
  {
    tag: 'Survey',
    title: 'Survey & RAB',
    desc: 'Survey lokasi, rekomendasi teknis, estimasi biaya, dan tahapan pengerjaan yang jelas sebelum proyek dimulai.',
  },
];

const workSteps = [
  'Survey lokasi dan cek kebutuhan',
  'RAB, jadwal kerja, dan scope pekerjaan',
  'Eksekusi lapangan dengan update progres',
  'Serah terima, garansi, dan maintenance',
];

const projectHighlights = [
  { value: '8+', label: 'tahun pengalaman' },
  { value: '240+', label: 'pekerjaan selesai' },
  { value: '2-in-1', label: 'renovasi & AC' },
  { value: '24/7', label: 'support properti' },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xeinaservice.web.id';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'Xeina Property',
  url: siteUrl,
  image: `${siteUrl}/contractor-hero.png`,
  description: 'Xeina Property melayani renovasi bangunan, maintenance properti, interior, instalasi AC, dan service AC untuk hunian serta bisnis.',
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
    const text = `Halo Xeina Property, saya ${formData.name}. Saya butuh ${formData.service}. No HP: ${formData.phone}. Detail: ${formData.message}`;
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
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Xeina Property home">
            <span className="brand-mark" aria-hidden="true">
              <span className="tower tower-left" />
              <span className="tower tower-center" />
              <span className="tower tower-right" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Xeina Property</span>
              <span className="brand-subtitle">General Contractor</span>
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
              Minta Estimasi
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
            src="/contractor-hero.png"
            alt="Tim kontraktor mengerjakan renovasi bangunan dan layanan AC"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow reveal">Xeina Property General Contractor</p>
            <h1 className="hero-title reveal reveal-delay-1">
              Renovasi bangunan dan service AC dalam satu tim properti.
            </h1>
            <p className="hero-subtitle reveal reveal-delay-2">
              Kami menangani renovasi rumah, ruko, kantor, pekerjaan finishing, maintenance properti, instalasi AC, dan service AC untuk kebutuhan hunian maupun bisnis.
            </p>
            <div className="hero-chips reveal reveal-delay-3" aria-label="Layanan utama">
              <span>Renovasi</span>
              <span>Service AC</span>
              <span>Maintenance</span>
            </div>
            <div className="hero-actions reveal reveal-delay-3">
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Konsultasi Proyek
              </button>
              <button className="btn-ghost" onClick={() => scrollTo('services')}>
                Lihat Layanan
              </button>
            </div>
          </div>
          <div className="hero-status reveal reveal-delay-4">
            <span>Survey cepat Jabodetabek</span>
            <strong>Renovasi bangunan, maintenance, dan AC</strong>
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
            <h2 className="section-title">Kontraktor properti dengan rasa kerja yang rapi dan terukur.</h2>
          </div>
          <div className="about-copy reveal reveal-delay-1">
            <p>
              Xeina Property membantu pemilik rumah dan bisnis menyelesaikan pekerjaan bangunan tanpa harus mengatur banyak vendor terpisah. Tim kami menggabungkan renovasi, finishing, maintenance, utilitas, dan AC dalam satu alur kerja yang lebih mudah dipantau.
            </p>
            <p>
              Setiap pekerjaan dimulai dari survey, scope yang jelas, estimasi biaya, lalu update progres selama pengerjaan. Hasilnya: bangunan siap dipakai, utilitas berfungsi, dan detail finishing tidak tertinggal.
            </p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Layanan Kami</p>
            <h2 className="section-title">Renovasi bangunan, maintenance, dan service AC.</h2>
            <p className="section-body">
              Pilih layanan sesuai kebutuhan properti, atau minta survey untuk paket pekerjaan gabungan.
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
            <h2 className="section-title">Alur proyek dibuat jelas sebelum eksekusi.</h2>
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
            <h2 className="section-title">Siap untuk hunian, usaha, dan properti operasional.</h2>
          </div>
          <div className="project-grid">
            {[
              ['Rumah Tinggal', 'Renovasi ruang keluarga, dapur, kamar mandi, plafon, cat, instalasi AC, dan perbaikan AC.'],
              ['Ruko & Retail', 'Fit out toko, fasad, instalasi listrik pendukung, AC, dan perawatan berkala.'],
              ['Kantor & Klinik', 'Partisi, interior, utilitas, pencahayaan, service AC, dan maintenance gedung.'],
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
            <h2 className="section-title">Ceritakan kebutuhan bangunan Anda.</h2>
            <p className="section-body">Isi form singkat, lalu kami arahkan ke WhatsApp untuk jadwal survey atau estimasi awal.</p>
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
                  <option>Renovasi Rumah / Ruko</option>
                  <option>Service AC / Instalasi AC</option>
                  <option>Maintenance Gedung</option>
                  <option>Interior / Fit Out</option>
                  <option>Survey & RAB</option>
                </select>
              </label>
              <label>
                Detail Kebutuhan
                <textarea rows={4} placeholder="Lokasi, ukuran area, keluhan, target waktu, atau foto kondisi bisa dikirim via WhatsApp." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
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
                Survey dapat dijadwalkan untuk pekerjaan renovasi bangunan, service AC, instalasi AC, dan perawatan properti.
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Xeina Property home">
          <span className="brand-mark" aria-hidden="true">
            <span className="tower tower-left" />
            <span className="tower tower-center" />
            <span className="tower tower-right" />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Xeina Property</span>
            <span className="brand-subtitle">General Contractor</span>
          </span>
        </button>
        <p>{new Date().getFullYear()} Xeina Property. General contractor, renovation building, maintenance, and AC service.</p>
      </footer>
    </>
  );
}
