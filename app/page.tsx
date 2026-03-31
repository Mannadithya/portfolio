"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [


   {
    title: "Financial Clause Extractor",
    desc: "Offline NLP pipeline using spaCy & EasyOCR to extract, classify and explain high-risk clauses in financial documents with a Streamlit dashboard.",
    tag: "NLP · spaCy · EasyOCR",
  },

  {
    title: "Skin Cancer Detection",
    desc: "EfficientNetB0 transfer learning model classifying 9 ISIC skin lesion types with macro AUC ~0.92",
    tag: "PyTorch · Computer Vision",
  },

  {
    title: "ESC-Net: SAR Image Colorization",
    desc: "C-GAN based deep learning framework with U-Net generators and attention modules for automatic colorization of grayscale SAR images.",
    tag: "Deep Learning · C-GAN",
  },

  {
    title: "RAG Chatbot",
    desc: "FastAPI + LangChain + FAISS retrieval-augmented chatbot powered by local Llama3 via Ollama",
    tag: "LangChain · NLP",
  },
  {
    title: "Invoice Intelligence Pipeline",
    desc: "7-stage OpenCV preprocessing pipeline with PaddleOCR, Neo4j knowledge graph and MS SQL for real-time invoice tracking at L&T Constructions.",
    tag: "OCR · Neo4j · OpenCV",
  },
  {
    title: "Neural Portfolio",
    desc: "This very site — built with Next.js, Tailwind, and a sprinkle of obsession",
    tag: "Next.js · Design",
  },
];

const SKILLS = ["Python", "PyTorch", "TensorFlow", "OpenCV", "spaCy", "EasyOCR", "PaddleOCR", "Neo4j", "Streamlit", "NumPy", "Pandas", "Git"];
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [typedText, setTypedText] = useState("");
  const fullText = "AI / ML Engineer";

  // ── Typewriter ──────────────────────────────────────────────
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // ── FIX 1: Navbar scroll effect ─────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav?.classList.add("scrolled");
      } else {
        nav?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── FIX 3: Particle canvas with responsive count ─────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fewer particles on mobile/low-end devices
    const particleCount = window.innerWidth < 768 ? 60 : 120;

    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 180, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 255, 180, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── Mouse glow (desktop only) ────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // ── Active section tracker ───────────────────────────────────
  useEffect(() => {
    const sections = ["hero", "about", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');

        /* ── FIX 2: cursor:none only on real pointer devices ── */
        body {
  cursor: auto;
}

        @media (hover: hover) and (pointer: fine) {
          body {
          cursor: none;
        }
}

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --green:     #00ffb4;
          --green-dim: #00ffb422;
          --green-mid: #00ffb466;
          --bg:        #050a07;
          --surface:   #0a110c;
          --border:    #1a2e20;
          --text:      #e8f5ec;
          --muted:     #5a7a62;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          overflow-x: hidden;
        }

        /* Custom cursor — only on desktop */
        @media (hover: hover) and (pointer: fine) {
          .cursor { display: block; }
        }
        .cursor {
          display: block;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
        }
        .cursor-dot {
          width: 8px; height: 8px;
          background: var(--green);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .cursor-ring {
          width: 40px; height: 40px;
          border: 1px solid var(--green);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem;
          border-bottom: 1px solid transparent;
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, background 0.3s;
        }
        nav.scrolled {
          border-color: var(--border);
          background: rgba(5,10,7,0.85);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--green);
          letter-spacing: 0.05em;
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links button {
          background: none; border: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.2s;
          padding: 0.25rem 0;
          position: relative;
        }
        .nav-links button::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--green);
          transition: width 0.3s;
        }
        .nav-links button:hover,
        .nav-links button.active { color: var(--green); }
        .nav-links button:hover::after,
        .nav-links button.active::after { width: 100%; }

        /* HERO */
        #hero {
          height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 0 3rem;
          position: relative;
          overflow: hidden;
        }
        .hero-tag {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: var(--green);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.6s 0.3s forwards;
        }
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--text);
          opacity: 0;
          animation: fadeUp 0.8s 0.5s forwards;
        }
        .hero-name span { color: var(--green); }
        .hero-role {
          margin-top: 1.5rem;
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: var(--muted);
          letter-spacing: 0.05em;
          opacity: 0;
          animation: fadeUp 0.8s 0.9s forwards;
          min-height: 2rem;
        }
        .cursor-blink {
          display: inline-block;
          width: 2px; height: 1.1em;
          background: var(--green);
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: blink 1s infinite;
        }
        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          opacity: 0;
          animation: fadeUp 0.8s 1.5s forwards;
        }
        .hero-scroll span {
          font-size: 0.6rem; letter-spacing: 0.3em;
          color: var(--muted); text-transform: uppercase;
        }
        .scroll-line {
          width: 1px; height: 50px;
          background: linear-gradient(to bottom, var(--green), transparent);
          animation: scrollPulse 2s infinite;
        }

        /* ABOUT */
        #about {
          min-height: 100vh;
          display: flex; align-items: center;
          padding: 8rem 3rem;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          width: 100%; max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          #hero, #about, #projects, #contact { padding-left: 1.5rem; padding-right: 1.5rem; }
          nav { padding: 1.2rem 1.5rem; }
          .nav-links { gap: 1rem; }
        }
        .section-label {
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: var(--green);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .about-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
        }
        .about-text {
          color: var(--muted);
          line-height: 1.9;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
        .skill-tag {
          padding: 0.35rem 0.9rem;
          border: 1px solid var(--border);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .skill-tag::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--green-dim);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s;
        }
        .skill-tag:hover { color: var(--green); border-color: var(--green-mid); }
        .skill-tag:hover::before { transform: scaleX(1); }

        .stat-block { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
        .stat {
          padding: 1.5rem;
          border: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .stat::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--green);
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 2.5rem; font-weight: 800;
          color: var(--green); line-height: 1;
        }
        .stat-label {
          font-size: 0.7rem; letter-spacing: 0.15em;
          color: var(--muted); text-transform: uppercase; margin-top: 0.4rem;
        }

        /* PROJECTS */
        #projects { min-height: 100vh; padding: 8rem 3rem; }
        .projects-header {
          max-width: 1200px; margin: 0 auto 5rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .projects-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800; line-height: 1.1;
        }
        .project-list { max-width: 1200px; margin: 0 auto; }
        .project-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: center;
          gap: 2rem;
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        @media (max-width: 768px) {
          .project-item { grid-template-columns: 1fr; gap: 0.75rem; }
          .project-tag { align-self: flex-start; }
        }
        .project-item::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--green-dim);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s; z-index: 0;
        }
        .project-item:hover::before { transform: scaleX(1); }
        .project-item:hover .project-title { color: var(--green); }
        .project-item > * { position: relative; z-index: 1; }
        .project-item:last-child { border-bottom: 1px solid var(--border); }
        .project-year { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.1em; }
        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          font-weight: 700; transition: color 0.3s;
        }
        .project-desc { color: var(--muted); font-size: 0.8rem; margin-top: 0.4rem; line-height: 1.6; }
        .project-tag {
          font-size: 0.65rem; letter-spacing: 0.15em;
          color: var(--green); text-transform: uppercase;
          white-space: nowrap; padding: 0.4rem 1rem;
          border: 1px solid var(--green-mid);
        }

        /* CONTACT */
        #contact {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 8rem 3rem; text-align: center;
        }
        .contact-inner { max-width: 700px; }
        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 800; line-height: 1; margin-bottom: 2rem;
        }
        .contact-heading span { color: var(--green); }
        .contact-sub { color: var(--muted); font-size: 0.9rem; line-height: 1.8; margin-bottom: 3rem; }
        .contact-btn {
          display: inline-block;
          padding: 1rem 3rem;
          border: 1px solid var(--green);
          color: var(--green);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem; letter-spacing: 0.2em;
          text-transform: uppercase; text-decoration: none;
          position: relative; overflow: hidden;
          transition: color 0.3s; background: none;
        }
        .contact-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--green);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.35s; z-index: -1;
        }
        .contact-btn:hover { color: var(--bg); }
        .contact-btn:hover::before { transform: scaleY(1); }
        .contact-links {
          display: flex; gap: 2rem; justify-content: center;
          flex-wrap: wrap; margin-top: 3rem;
        }
        .contact-link {
          font-size: 0.7rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--muted);
          text-decoration: none; transition: color 0.2s;
        }
        .contact-link:hover { color: var(--green); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
        }

        .mouse-glow {
          position: fixed; pointer-events: none; z-index: 1;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,180,0.04) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: left 0.1s, top 0.1s;
          display: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .mouse-glow { display: block; }
        }

        .diagonal-line {
          position: absolute; top: 0; right: 15%;
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent, var(--border), transparent);
          pointer-events: none;
        }
      `}</style>

      {/* Custom cursor — desktop only */}
      <div className="cursor cursor-dot" style={{ position: "fixed", left: mousePos.x, top: mousePos.y }} />
      <div className="cursor cursor-ring" style={{ position: "fixed", left: mousePos.x, top: mousePos.y }} />

      {/* Mouse glow — desktop only */}
      <div className="mouse-glow" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* NAV */}
      <nav>
        <div className="nav-logo">M_</div>
        <ul className="nav-links">
          {["hero", "about", "projects", "contact"].map((s) => (
            <li key={s}>
              <button
                className={activeSection === s ? "active" : ""}
                onClick={() => scrollTo(s)}
              >
                {s === "hero" ? "home" : s}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main style={{ position: "relative", zIndex: 2, background: "transparent" }}>

        {/* HERO */}
        <section id="hero">
          <div className="diagonal-line" />
          <p className="hero-tag">// Portfolio</p>
          <h1 className="hero-name">
            Mannadithya
          </h1>
          <p className="hero-role">
            {typedText}<span className="cursor-blink" />
          </p>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>scroll</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="about-grid">
            <div>
              <p className="section-label">// About</p>
              <h2 className="about-heading">
                Building machines<br />that <span style={{ color: "var(--green)" }}>think.</span>
              </h2>
              <p className="about-text">
                I'm an AI/ML Engineer obsessed with turning raw data into intelligent systems. From training deep learning models on medical imagery to building RAG pipelines with local LLMs — I build things that matter.
              </p>
              <p className="about-text">
                Currently exploring the intersection of computer vision and NLP, shipping production-grade models and APIs that solve real-world problems.
              </p>
              <div className="skills-grid">
                {SKILLS.map((s) => (
                  <span className="skill-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="stat-block">
                {[
                  { num: "9",    label: "Classes classified" },
                  { num: "0.92", label: "Best AUC score" },
                  { num: "2k+",  label: "Images trained on" },
                  { num: "∞",    label: "Lines of curiosity" },
                ].map((s) => (
                  <div className="stat" key={s.label}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="projects-header">
            <div>
              <p className="section-label">// Projects</p>
              <h2 className="projects-heading">
                Selected<br /><span style={{ color: "var(--green)" }}>work.</span>
              </h2>
            </div>
          </div>
          <div className="project-list">
            {PROJECTS.map((p) => (
              <div className="project-item" key={p.title}>
                <span className="project-year">{}</span>
                <div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                </div>
                <span className="project-tag">{p.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact-inner">
            <p className="section-label">// Contact</p>
            <h2 className="contact-heading">
              Let's build<br />something <span>great.</span>
            </h2>
            <p className="contact-sub">
              Open to collaborations, research opportunities, and interesting problems.<br />
              Drop a message — I respond to everything.
            </p>
            <a href="mailto:mannadithya@gmail.com" className="contact-btn">
              Get in touch →
            </a>
            <div className="contact-links">
              <a href="https://github.com/Mannadithya" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://www.linkedin.com/in/mannadithya-a-7a88321bb/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="/RESUME.pdf" target="_blank" rel="noopener noreferrer" className="contact-link">Resume</a>
              <a href="tel:+917550050016" target="_blank" rel="noopener noreferrer" className="contact-link">Phone</a>
              <a href="mailto:mannadithya@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-link">Gmail</a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}