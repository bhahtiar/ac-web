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
    tag: 'Renovasi',
    title: 'Renovasi Rumah & Ruko',
    desc: 'Perbaikan ruang, fasad, lantai, plafon, kamar mandi, dapur, dan pembaruan layout agar bangunan lebih nyaman dipakai.',
  },
  {
    tag: 'Bangun Baru',
    title: 'Pembangunan Sipil',
    desc: 'Pekerjaan struktur, dinding, atap, finishing, dan koordinasi lapangan untuk hunian, toko, kantor kecil, dan gudang.',
  },
  {
    tag: 'MEP',
    title: 'Listrik, Plumbing & AC',
    desc: 'Instalasi utilitas bangunan, service AC, cuci AC, perbaikan unit, tambah freon, serta jalur pipa dan drainase AC.',
  },
  {
    tag: 'Maintenance',
    title: 'Perawatan Gedung',
    desc: 'Pengecekan berkala, perbaikan ringan, pengecatan, kebocoran, waterproofing, dan pekerjaan darurat untuk properti aktif.',
  },
  {
    tag: 'Interior',
    title: 'Fit Out Interior',
    desc: 'Pekerjaan partisi, plafon, lighting, kabinet, meja kerja, dan finishing interior untuk rumah, kantor, klinik, atau retail.',
  },
  {
    tag: 'Estimasi',
    title: 'Survey & RAB',
    desc: 'Survey lokasi, rekomendasi teknis, estimasi biaya, dan tahapan kerja yang jelas sebelum proyek dimulai.',
  },
];

const process = [
  'Survey lokasi dan cek kebutuhan',
  'RAB, jadwal kerja, dan scope pekerjaan',
  'Eksekusi lapangan dengan update progres',
  'Serah terima, garansi, dan maintenance',
];

const projectHighlights = [
  { value: '8+', label: 'tahun pengalaman' },
  { value: '240+', label: 'proyek selesai' },
  { value: '35+', label: 'tim & mitra teknis' },
  { value: '24/7', label: 'support darurat' },
];

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
    const text = `Halo Arctic Contractor, saya ${formData.name}. Saya butuh ${formData.service}. No HP: ${formData.phone}. Detail: ${formData.message}`;
    window.open(`https://wa.me/6281944800541?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <a href="https://wa.me/6281944800541" target="_blank" className="whatsapp-float" aria-label="WhatsApp">
        WA
      </a>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Arctic Contractor home">
            <span className="brand-mark">AC</span>
            <span className="brand-name">Arctic<span>Contractor</span></span>
          </button>

          <div className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
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
          <button key={item.id} className="mobile-nav-link" onClick={() => scrollTo(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <main>
        <section id="home" className="hero-section">
          <Image
            className="hero-image"
            src="/contractor-hero.png"
            alt="Tim kontraktor mengerjakan renovasi rumah dan layanan AC"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow reveal">General Contractor & AC Service</p>
            <h1 className="hero-title reveal reveal-delay-1">
              Bangun, renovasi, dan rawat properti dengan satu tim.
            </h1>
            <p className="hero-subtitle reveal reveal-delay-2">
              Kami menangani renovasi bangunan, pekerjaan sipil, interior, listrik, plumbing, hingga service AC untuk rumah, ruko, kantor, dan properti komersial.
            </p>
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
            <strong>Renovasi, bangun baru, dan AC</strong>
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
            <h2 className="section-title">Kontraktor praktis untuk pekerjaan yang harus rapi dari awal.</h2>
          </div>
          <div className="about-copy reveal reveal-delay-1">
            <p>
              Arctic Contractor membantu pemilik rumah dan bisnis menyelesaikan pekerjaan bangunan tanpa harus mengatur banyak vendor terpisah. Tim kami menggabungkan pekerjaan sipil, finishing, utilitas, dan AC dalam satu alur kerja yang lebih mudah dipantau.
            </p>
            <p>
              Setiap pekerjaan dimulai dari survey, scope yang jelas, estimasi biaya, lalu update progres selama pengerjaan. Hasilnya: bangunan siap dipakai, utilitas berfungsi, dan detail finishing tidak tertinggal.
            </p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="section-eyebrow">Layanan Kami</p>
            <h2 className="section-title">Dari renovasi bangunan sampai service AC.</h2>
            <p className="section-body">
              Pilih layanan sesuai kebutuhan, atau minta survey untuk paket pekerjaan gabungan.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className={`service-card reveal reveal-delay-${(index % 3) + 1}`}>
                <span className="service-tag">{service.tag}</span>
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
            {process.map((step, index) => (
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
            <h2 className="section-title">Siap untuk hunian, usaha, dan gedung operasional.</h2>
          </div>
          <div className="project-grid">
            {[
              ['Rumah Tinggal', 'Renovasi ruang keluarga, dapur, kamar mandi, plafon, cat, dan perbaikan AC.'],
              ['Ruko & Retail', 'Fit out toko, fasad, instalasi listrik, plumbing, AC, dan perawatan berkala.'],
              ['Kantor & Klinik', 'Partisi, interior, jaringan utilitas, pencahayaan, dan maintenance gedung.'],
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
                <input type="tel" placeholder="0819 4480 0541" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </label>
              <label>
                Layanan
                <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                  <option value="">Pilih layanan</option>
                  <option>Renovasi Rumah / Ruko</option>
                  <option>Bangun Baru</option>
                  <option>Service AC / Instalasi AC</option>
                  <option>Listrik, Plumbing, dan MEP</option>
                  <option>Interior / Fit Out</option>
                  <option>Maintenance Gedung</option>
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
              <p><span>WhatsApp</span>0819-4480-0541</p>
              <p><span>Email</span>halo@arcticcontractor.id</p>
              <p><span>Workshop</span>Tangerang Selatan, Banten</p>
              <p><span>Area</span>Jakarta, Tangerang, Depok, Bogor, Bekasi</p>
              <div className="panel-note">
                Survey dapat dijadwalkan untuk pekerjaan renovasi, bangun baru, service AC, dan perawatan properti.
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Arctic Contractor home">
          <span className="brand-mark">AC</span>
          <span className="brand-name">Arctic<span>Contractor</span></span>
        </button>
        <p>{new Date().getFullYear()} Arctic Contractor. General contractor, renovation, building maintenance, and AC service.</p>
      </footer>
    </>
  );
}
