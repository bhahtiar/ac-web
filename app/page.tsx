'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section tracking
      const sections = ['home', 'about', 'services', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle frost effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; drift: number; phase: number;
    }> = [];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        drift: Math.random() * Math.PI * 2,
        phase: Math.random() * 0.01 + 0.005,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.drift += p.phase;
        p.x += p.vx + Math.sin(p.drift) * 0.3;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 245, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ArcticAir! Saya ${formData.name} ingin booking ${formData.service}. No HP: ${formData.phone}. Pesan: ${formData.message}`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(text)}`, '_blank');
  };

  const services = [
    { icon: '❄️', title: 'Instalasi AC Baru', desc: 'Pemasangan AC baru semua merek dan kapasitas. Termasuk pipa, bracket, dan kabel listrik. Garansi instalasi 1 tahun.', price: 'Mulai Rp 350.000' },
    { icon: '🔧', title: 'Servis & Perbaikan', desc: 'Diagnosa akurat, penggantian spare part original, freon top-up. Teknisi bersertifikat dengan pengalaman 5+ tahun.', price: 'Mulai Rp 150.000' },
    { icon: '🧹', title: 'Cuci AC', desc: 'Pembersihan indoor & outdoor unit dengan alat profesional. Meningkatkan efisiensi pendinginan dan kualitas udara.', price: 'Mulai Rp 120.000' },
    { icon: '🏢', title: 'AC Komersial', desc: 'Solusi AC untuk kantor, ruko, gudang, dan restoran. Multi-split, ducted, VRV/VRF system.', price: 'Hubungi Kami' },
    { icon: '🔄', title: 'Perawatan Berkala', desc: 'Paket maintenance bulanan & tahunan. Prioritas jadwal, diskon spare part 15%, laporan kondisi unit.', price: 'Mulai Rp 80.000/bln' },
    { icon: '🚨', title: 'Emergency 24/7', desc: 'Layanan darurat hari libur dan malam hari. Response time <2 jam untuk area coverage kami.', price: 'Call Now' },
  ];

  const whyUs = [
    { icon: '🏅', title: 'Teknisi Bersertifikat', desc: 'Semua teknisi kami telah tersertifikasi dan berpengalaman minimal 3 tahun.' },
    { icon: '⚡', title: 'Respon Cepat', desc: 'Booking hari ini, teknisi datang hari ini. Tidak ada waktu menunggu yang lama.' },
    { icon: '💯', title: 'Garansi Pekerjaan', desc: 'Setiap pekerjaan kami bergaransi. Tidak puas? Kami kerjakan ulang tanpa biaya tambahan.' },
    { icon: '💰', title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi. Estimasi biaya diberikan sebelum pekerjaan dimulai.' },
  ];

  return (
    <>
      <canvas ref={canvasRef} id="particles" />

      {/* WhatsApp Float */}
      <a href="https://wa.me/628123456789" target="_blank" className="whatsapp-float" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => scrollTo('home')}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2C5F8A, #C8E6F5)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>❄</div>
            <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem', color: 'var(--arctic)', letterSpacing: '0.05em' }}>ARCTIC<span style={{ color: 'var(--accent)' }}>AIR</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {['home', 'about', 'services', 'contact'].map(id => (
              <span key={id} className={`nav-link ${activeSection === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>
                {id === 'home' ? 'Home' : id === 'about' ? 'About Us' : id === 'services' ? 'Services' : 'Contact Us'}
              </span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}>
              Book Sekarang
            </button>
          </div>

          {/* Hamburger */}
          <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {['home', 'about', 'services', 'contact'].map(id => (
          <span key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>
            {id === 'home' ? 'Home' : id === 'about' ? 'About Us' : id === 'services' ? 'Services' : 'Contact Us'}
          </span>
        ))}
      </div>

      {/* ── SECTION: HOME ── */}
      <section id="home" className="hero-section" style={{ padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        {/* Background gradient orb */}
        <div style={{ position: 'absolute', top: '15%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(44,95,138,0.18) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(44,95,138,0.1) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <p className="hero-eyebrow reveal">— Spesialis AC Terpercaya</p>
              <h1 className="hero-title reveal reveal-delay-1">
                Dingin Sempurna,<br />
                <span className="highlight">Setiap Saat.</span>
              </h1>
              <p className="hero-subtitle reveal reveal-delay-2">
                Instalasi, servis, dan perawatan AC profesional untuk rumah dan bisnis Anda. Teknisi bersertifikat, respon cepat, garansi pekerjaan.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }} className="reveal reveal-delay-3">
                <button className="btn-primary" onClick={() => scrollTo('contact')}>
                  <span>Book Servis</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="btn-ghost" onClick={() => scrollTo('services')}>
                  Lihat Layanan
                </button>
              </div>
            </div>

            {/* Right — visual card */}
            <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '380px', background: 'rgba(200,230,245,0.04)', border: '1px solid rgba(200,230,245,0.1)', borderRadius: '16px', padding: '2rem', backdropFilter: 'blur(8px)' }} className="frost-glow">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #2C5F8A, #C8E6F522)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>❄️</div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', color: 'var(--arctic)', fontWeight: 600 }}>Status: AKTIF</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Teknisi tersedia hari ini</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px rgba(74,222,128,0.6)', flexShrink: 0 }} />
                </div>

                {[
                  { label: 'Temperatur Target', val: '16–24°C' },
                  { label: 'Response Time', val: '< 2 Jam' },
                  { label: 'Area Coverage', val: 'Jabodetabek' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(200,230,245,0.06)' }}>
                    <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', color: 'var(--ice)', fontWeight: 600 }}>{item.val}</span>
                  </div>
                ))}

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>PROMO BULAN INI</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--arctic)', marginTop: '0.3rem' }}>Cuci AC + Freon Check <strong>Rp 150.000</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '4rem', padding: '2rem', background: 'rgba(200,230,245,0.03)', border: '1px solid rgba(200,230,245,0.07)', borderRadius: '12px' }} className="reveal reveal-delay-4">
            {[
              { num: '2.500+', label: 'Unit Dikerjakan' },
              { num: '98%', label: 'Kepuasan Pelanggan' },
              { num: '8 Thn', label: 'Pengalaman' },
              { num: '24/7', label: 'Layanan Darurat' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: ABOUT ── */}
      <section id="about" className="about-section" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <p className="section-eyebrow reveal">Tentang Kami</p>
              <h2 className="section-title reveal reveal-delay-1">Dipercaya Ribuan Pelanggan Sejak 2016</h2>
              <div className="section-divider reveal reveal-delay-1" />
              <p className="section-body reveal reveal-delay-2">
                ArcticAir berdiri dari semangat memberikan solusi pendingin yang andal dan terjangkau. Kami memulai dari workshop kecil di Tangerang, kini melayani ribuan pelanggan di seluruh Jabodetabek dengan tim teknisi terlatih dan armada lengkap.
              </p>
              <p className="section-body reveal reveal-delay-3" style={{ marginTop: '1rem' }}>
                Kami percaya AC yang terawat bukan kemewahan — ini kebutuhan. Makanya kami hadir dengan harga yang fair, transparansi penuh, dan komitmen kualitas di setiap kunjungan.
              </p>
              <button className="btn-primary reveal reveal-delay-4" style={{ marginTop: '2rem' }} onClick={() => scrollTo('contact')}>
                Hubungi Kami
              </button>
            </div>

            {/* Right — cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {whyUs.map((item, i) => (
                <div key={item.title} className={`about-card reveal reveal-delay-${i + 1}`}>
                  <div className="about-icon" style={{ fontSize: '1.2rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', fontWeight: 600, color: 'var(--arctic)', marginBottom: '0.5rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: SERVICES ── */}
      <section id="services" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
            <p className="section-eyebrow reveal">Layanan Kami</p>
            <h2 className="section-title reveal reveal-delay-1">Semua Kebutuhan AC Anda</h2>
            <div className="section-divider reveal reveal-delay-1" style={{ margin: '1rem auto 1.5rem' }} />
            <p className="section-body reveal reveal-delay-2">Dari instalasi baru hingga darurat tengah malam — kami siap.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {services.map((s, i) => (
              <div key={s.title} className={`service-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="service-icon-wrap">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-price">{s.price}</div>
              </div>
            ))}
          </div>

          {/* CTA band */}
          <div className="reveal" style={{ marginTop: '3rem', padding: '2.5rem', background: 'linear-gradient(135deg, rgba(44,95,138,0.2), rgba(10,22,40,0.4))', border: '1px solid rgba(200,230,245,0.1)', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.1rem', fontWeight: 700, color: 'var(--arctic)' }}>Butuh estimasi biaya?</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Chat langsung dengan tim kami — gratis, tanpa komitmen.</div>
            </div>
            <a href="https://wa.me/628123456789" target="_blank" className="btn-primary">
              WhatsApp Sekarang
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION: CONTACT ── */}
      <section id="contact" className="contact-section" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 3.5rem' }}>
            <p className="section-eyebrow reveal">Kontak Kami</p>
            <h2 className="section-title reveal reveal-delay-1">Book Servis Sekarang</h2>
            <div className="section-divider reveal reveal-delay-1" style={{ margin: '1rem auto 1.5rem' }} />
            <p className="section-body reveal reveal-delay-2">Isi form di bawah dan kami akan menghubungi Anda dalam 30 menit.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Form */}
            <div className="contact-form-wrap reveal">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="form-label">Nama Lengkap</label>
                  <input className="form-input" type="text" placeholder="Budi Santoso" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Nomor HP / WhatsApp</label>
                  <input className="form-input" type="tel" placeholder="0812 3456 7890" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Layanan yang Dibutuhkan</label>
                  <select className="form-input form-select" required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                    <option value="">— Pilih layanan —</option>
                    <option>Instalasi AC Baru</option>
                    <option>Servis & Perbaikan</option>
                    <option>Cuci AC</option>
                    <option>AC Komersial</option>
                    <option>Perawatan Berkala</option>
                    <option>Emergency 24/7</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Keterangan (Opsional)</label>
                  <textarea className="form-input" rows={3} placeholder="Merk AC, keluhan, atau info tambahan..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ resize: 'vertical', minHeight: '80px' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                  Kirim via WhatsApp
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="reveal reveal-delay-2">
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 600, color: 'var(--arctic)', marginBottom: '2rem' }}>Informasi Kontak</h3>

              {[
                { icon: '📞', label: 'Telepon / WA', val: '0812-3456-7890', sub: 'Senin–Minggu, 07.00–21.00' },
                { icon: '📧', label: 'Email', val: 'halo@arcticair.id', sub: 'Balasan dalam 1 jam kerja' },
                { icon: '📍', label: 'Workshop', val: 'Jl. Raya Serpong No. 88', sub: 'Tangerang Selatan, Banten 15310' },
                { icon: '🕐', label: 'Jam Operasional', val: 'Senin – Sabtu: 07.00 – 21.00', sub: 'Minggu & Hari Libur: 08.00 – 18.00' },
              ].map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--arctic)', fontWeight: 500 }}>{item.val}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{item.sub}</div>
                  </div>
                </div>
              ))}

              {/* Coverage area */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(200,230,245,0.03)', border: '1px solid rgba(200,230,245,0.08)', borderRadius: '10px' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: 'var(--ice)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>AREA COVERAGE</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Jakarta Selatan', 'Jakarta Barat', 'Tangerang', 'Tangerang Selatan', 'Depok', 'Bogor'].map(area => (
                    <span key={area} style={{ fontSize: '0.78rem', background: 'rgba(44,95,138,0.25)', border: '1px solid rgba(200,230,245,0.1)', borderRadius: '4px', padding: '0.25rem 0.65rem', color: 'var(--ice)' }}>{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ padding: '2.5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #2C5F8A, #C8E6F5)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>❄</div>
            <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.95rem', color: 'var(--arctic)' }}>ARCTIC<span style={{ color: 'var(--accent)' }}>AIR</span></span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            © {new Date().getFullYear()} ArcticAir. Semua hak dilindungi.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['home', 'about', 'services', 'contact'].map(id => (
              <span key={id} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--ice)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-muted)'} onClick={() => scrollTo(id)}>
                {id === 'home' ? 'Home' : id === 'about' ? 'About' : id === 'services' ? 'Services' : 'Contact'}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
