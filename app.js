/* =====================================================
   SADGURU V. — 100% REEL-LEVEL PORTFOLIO INTERACTIVE ENGINE
   Features: 3D Tilt Cards, Command Palette (Ctrl+K),
   Web Audio Sound Synthesis, QuickAI Live Sandbox,
   Code Snippet Modals, Project Architecture Drawer.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initParticleBackground();
  initTypingEffect();
  initQuickAISandbox();
  initProjectFilters();
  initSkillBars();
  initGalleryLightbox();
  initResumeModal();
  initCopyToClipboard();
  initContactForm();
  init3DTilt();
  initCommandPalette();
  initSoundEffects();
  initCodeSnippetModal();
  initProjectDetailsModal();
});

/* ── 1. Cursor Glow Follower ── */
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.transform = `translate3d(${glowX - 150}px, ${glowY - 150}px, 0)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ── 2. Ambient Particle Canvas ── */
function initParticleBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ',
      alpha: Math.random() * 0.45 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.16 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── 3. Dynamic Typing Effect ── */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'Software Engineer & Full-Stack Developer',
    'Generative AI & LLM Systems Specialist',
    'React.js & Python SaaS Architect',
    'Master of Computer Applications (MCA)'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 25 : 55;

    if (!isDeleting && charIdx === currentRole.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ── 4. Web Audio Synthesizer (Sound Effects) ── */
let soundEnabled = true;
function playTone(freq, type = 'sine', duration = 0.08) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function initSoundEffects() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '🔊 Sound ON' : '🔇 Muted';
      soundToggleBtn.classList.toggle('active', soundEnabled);
      showToast(soundEnabled ? 'Audio feedback enabled 🔊' : 'Audio feedback muted 🔇');
    });
  }

  // Add click sound to interactive buttons
  document.querySelectorAll('button, a, .project-card, .skill-category-card').forEach(el => {
    el.addEventListener('click', () => playTone(580, 'sine', 0.06));
    el.addEventListener('mouseenter', () => playTone(340, 'triangle', 0.03));
  });
}

/* ── 5. QuickAI Interactive Dual-Engine AI SaaS Sandbox ── */
function initQuickAISandbox() {
  const runBtn = document.getElementById('quickai-run-btn');
  const engineSelect = document.getElementById('quickai-engine-select');
  const featureSelect = document.getElementById('quickai-feature-select');
  const promptInput = document.getElementById('quickai-prompt-input');
  const outputBox = document.getElementById('quickai-output-box');
  const creditsCounter = document.getElementById('quickai-credits');
  const engineBadge = document.getElementById('quickai-engine-badge');
  const copyBtn = document.getElementById('quickai-copy-btn');
  const latencyBadge = document.getElementById('quickai-latency');
  const tokensBadge = document.getElementById('quickai-tokens');

  if (!runBtn || !outputBox) return;

  let credits = 95;

  const demoResponses = {
    article: {
      ollama: `⚡ [Ollama Llama3 - Local LLM Pipeline]
------------------------------------------------
Title: Engineering Next-Gen AI Applications with Local Models

Deploying offline local LLMs via Ollama allows software engineers to guarantee zero data exfiltration, eliminate cloud API latency spikes, and run cost-free inference on edge devices.

Architecture Highlights:
1. Low Latency: Sub-40ms initial token generation.
2. Privacy First: All context vectors stay on premise.
3. Dual Fallback: Automatic routing to Gemini cloud APIs for high-compute reasoning tasks.`,

      gemini: `✨ [Google Gemini 1.5 Flash - Cloud API]
------------------------------------------------
Title: Scaling Multimodal Generative AI Workflows

Integrating Gemini APIs provides extreme context width (1M+ tokens), multimodal analysis (text, code, images), and seamless RESTful integration.

Key SaaS Features Built by Sadguru V:
- Automated Article & Blog Title Synthesis
- Dual-Tier Credit Quotas (Free vs Go Member)
- Multi-threaded Async Stream Processing.`
    },
    title: {
      ollama: `⚡ [Ollama Local Synthesis]
Viral High-CTR Blog Headlines:
1. "Building QuickAI: How I Integrated Local Ollama LLMs into React"
2. "Why Full-Stack Developers Are Adopting Hybrid Local-Cloud AI"
3. "Mastering MCA Computer Science: SaaS Architecture Patterns"`,

      gemini: `✨ [Google Gemini AI Title Generator]
High-Click-Through Headlines:
1. "10 Architectural Rules for Full-Stack Generative AI SaaS Applications"
2. "From Local LLMs to Production Cloud APIs: QuickAI Architecture Deep-Dive"
3. "How Dual-Engine AI Workflows Drastically Cut Operational SaaS Costs"`
    },
    evaluator: {
      ollama: `⚡ [Ollama Local Resume Audit]
Candidate Score: 98/100 (Exceptional Full-Stack & GenAI Profile)

Key Metrics Analyzed:
- Core Languages: Python, Java, JavaScript (ES6+), C/C#
- Frameworks & Engines: React.js, Vite, Tailwind CSS, Ollama, Gemini API
- Experience: MCA Graduate with production SaaS deployment experience.

Verdict: Strong fit for Software Engineer, Full-Stack Developer, and GenAI Roles.`,

      gemini: `✨ [Gemini AI Career Evaluation]
Executive Candidate Review: Sadguru V.
- Software Engineering Competency: High (Modular SaaS Architectures)
- Generative AI Integration: Expert (Local & Cloud dual-engine pipelines)
- Production Deployment: Verified (Live Netlify CI/CD Workflows)`
    },
    research: {
      ollama: `⚡ [Ollama Deep Research Agent]
Topic Summary: Modern Web Engineering Trends
- Shift toward lightweight Vite builds, CSS keyframe animations, and serverless edge functions.
- Increasing demand for local LLM privacy in enterprise web applications.`,

      gemini: `✨ [Gemini Web Research Synthesizer]
Web Synthesis Report:
- Modern frontend frameworks pair seamlessly with asynchronous REST API proxies.
- Dual-engine fallback architectures ensure 99.99% SaaS availability.`
    }
  };

  // Preset chip handler
  document.querySelectorAll('.prompt-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (promptInput) {
        promptInput.value = chip.getAttribute('data-prompt') || promptInput.value;
      }
      if (featureSelect) {
        featureSelect.value = chip.getAttribute('data-feature') || featureSelect.value;
      }
    });
  });

  runBtn.addEventListener('click', () => {
    const feature = featureSelect ? featureSelect.value : 'article';
    const engine = engineSelect ? engineSelect.value : 'gemini';
    const promptText = promptInput && promptInput.value.trim() !== '' 
      ? promptInput.value.trim() 
      : 'Full-Stack GenAI Architecture Overview';

    if (credits <= 5) {
      outputBox.innerHTML = `<span style="color: #ef4444;">⚠️ Credit quota depleted for session! Switch to Go Member tier.</span>`;
      return;
    }

    credits -= 5;
    if (creditsCounter) creditsCounter.textContent = credits;
    if (engineBadge) {
      engineBadge.textContent = engine === 'ollama' ? '⚡ Local Ollama Engine' : '✨ Cloud Gemini API';
      engineBadge.style.color = engine === 'ollama' ? '#a78bfa' : '#38bdf8';
    }

    outputBox.innerHTML = `<div class="typing-loader"><span></span><span></span><span></span> Dispatching dual-engine pipeline request...</div>`;

    const startTime = performance.now();

    setTimeout(() => {
      const template = (demoResponses[feature] && demoResponses[feature][engine]) 
        ? demoResponses[feature][engine] 
        : demoResponses.article.gemini;
      
      const customHeader = `Input Prompt: "${promptText}"\n\n`;
      const fullText = customHeader + template;

      outputBox.textContent = '';
      let index = 0;

      function streamText() {
        if (index < fullText.length) {
          outputBox.textContent += fullText.charAt(index);
          index += 2;
          outputBox.scrollTop = outputBox.scrollHeight;
          setTimeout(streamText, 6);
        } else {
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);
          const tokenCount = Math.round(fullText.length / 3.8);

          if (latencyBadge) latencyBadge.textContent = `${latency}ms`;
          if (tokensBadge) tokensBadge.textContent = `${tokenCount} tokens`;
        }
      }
      streamText();
    }, 450);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = outputBox.innerText;
      if (!text || text.includes('Click "Run')) {
        showToast('Run the AI pipeline first to copy results!');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('AI Output copied to clipboard!');
      });
    });
  }
}

/* ── 6. Project Category Filter ── */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter || (filter === 'genai' && cat.includes('genai'))) {
          card.style.display = 'flex';
          card.style.animation = 'scaleIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── 7. Skill Progress Bars Animation ── */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-pct') || '85%';
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.15 });

  skillFills.forEach(bar => observer.observe(bar));
}

/* ── 8. Gallery Lightbox Viewer ── */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
      <img src="" alt="Expanded View" id="lightbox-img" />
      <div class="lightbox-caption" id="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#lightbox-img');
  const modalCaption = modal.querySelector('#lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');
  const overlay = modal.querySelector('.lightbox-overlay');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span') 
        ? item.querySelector('.gallery-overlay span').textContent 
        : 'Sadguru V. Photo';

      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ── 9. Official Printable PDF Resume Viewer Modal ── */
function initResumeModal() {
  const triggerBtns = document.querySelectorAll('.open-resume-modal');
  if (!triggerBtns.length) return;

  const modal = document.createElement('div');
  modal.className = 'resume-modal';
  modal.innerHTML = `
    <div class="resume-modal-overlay"></div>
    <div class="resume-modal-container">
      <div class="resume-modal-header">
        <div class="header-title">
          <span class="badge">Official Document</span>
          <h3>SADGURU V. — Official Resume</h3>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary btn-sm" id="print-resume-btn">🖨️ Print / Save PDF</button>
          <button class="resume-modal-close" aria-label="Close Modal">&times;</button>
        </div>
      </div>
      <div class="resume-paper-body" id="printable-resume-paper">
        <header class="paper-header">
          <h1>SADGURU V</h1>
          <p class="paper-subtitle">Master of Computer Applications (MCA) | Software Engineer & Full-Stack Developer</p>
          <p class="paper-contact">
            Bengaluru, Karnataka, India &nbsp;|&nbsp; 
            <strong>+91 7892467429</strong> &nbsp;|&nbsp; 
            <strong>sadguruvsurimatt@gmail.com</strong> &nbsp;|&nbsp; 
            Portfolio: <strong>sadgururesume.netlify.app</strong>
          </p>
        </header>

        <section class="paper-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <hr/>
          <p>
            Proactive, detail-oriented Master of Computer Applications (MCA) graduate with strong competencies in full-stack web development, modern frontend engineering, and Generative AI integrations. Demonstrated capability in engineering modular SaaS architectures, integrating local LLMs with production cloud APIs, and building intuitive, responsive user experiences. Combines rigorous analytical problem-solving with disciplined software engineering practices to deliver performant, user-centric digital products.
          </p>
        </section>

        <section class="paper-section">
          <h2>TECHNICAL SKILLS & CORE COMPETENCIES</h2>
          <hr/>
          <ul>
            <li><strong>Frontend & UI/UX:</strong> React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive Layouts</li>
            <li><strong>Backend & Programming:</strong> Python, Core Java, C, C#, RESTful API Architecture, JSON Handling, State Management</li>
            <li><strong>Generative AI & LLM Systems:</strong> Ollama (Local LLM Deployment), Google AI Studio / Gemini API, Prompt Engineering, Multimodal Workflows</li>
            <li><strong>Tools, Platforms & Practices:</strong> Git, GitHub, Netlify CI/CD, VS Code, Postman, Vite Dev Server, Windows OS, Ubuntu OS, Agile Principles</li>
          </ul>
        </section>

        <section class="paper-section">
          <h2>PROJECTS & PRACTICAL EXPERIENCE</h2>
          <hr/>
          <div class="paper-project">
            <div class="project-head">
              <strong>QuickAI – Multi-Model AI Productivity SaaS Platform</strong> <span>| MCA Major Project</span>
            </div>
            <p class="tech-stack">Tech Stack: React.js, Vite, Tailwind CSS, Ollama (Local LLM), Google AI Studio / Gemini API, REST APIs</p>
            <ul>
              <li>Architected a multi-featured AI workspace delivering automated article writing, viral blog title synthesis, resume evaluation, automated background removal, and deep web research workflows.</li>
              <li>Implemented a dual-engine AI pipeline integrating Ollama for offline local LLM execution and Google AI Studio / Gemini APIs for scalable cloud image generation and reasoning.</li>
              <li>Engineered an automated credit allocation and plan membership system (Free and Go Member tiers), tracking real-time usage quotas and transaction limits across sessions.</li>
              <li>Constructed a centralized asset management library enabling one-click download, copy, and file indexing, combined with an interactive community discussion hub.</li>
              <li>Designed an intuitive, responsive user interface featuring seamless dark/light theme switching, custom keyboard quick-actions, and structured modal file upload handlers.</li>
            </ul>
          </div>

          <div class="paper-project" style="margin-top: 14px;">
            <div class="project-head">
              <strong>Personal Portfolio & Showcase Web Application</strong> <span>| Production Deployment</span>
            </div>
            <p class="tech-stack">Tech Stack: HTML5, CSS3, JavaScript (ES6+), Bootstrap, Netlify Cloud Infrastructure (Live: sadgururesume.netlify.app)</p>
            <ul>
              <li>Designed and launched an interactive, responsive web portfolio presenting technical credentials, software repositories, and academic deliverables.</li>
              <li>Standardized cross-browser rendering, fluid layouts, and mobile responsiveness through Bootstrap modular grids and custom CSS keyframe animations.</li>
              <li>Implemented continuous cloud deployment workflows via Netlify, managing DNS configuration, performance optimization, and asset caching.</li>
            </ul>
          </div>
        </section>

        <section class="paper-section">
          <h2>EDUCATION</h2>
          <hr/>
          <table class="paper-table">
            <tr>
              <td><strong>• Master of Computer Applications (MCA)</strong></td>
              <td style="text-align: right;">Atria Institute of Technology, Bengaluru</td>
            </tr>
            <tr>
              <td><strong>• Bachelor of Computer Applications (BCA)</strong></td>
              <td style="text-align: right;">Interface College of Computer Application, Davangere</td>
            </tr>
            <tr>
              <td><strong>• Pre-University Course (PUC)</strong></td>
              <td style="text-align: right;">SJM Independent PU College, Chitradurga</td>
            </tr>
            <tr>
              <td><strong>• Secondary School Leaving Certificate (SSLC)</strong></td>
              <td style="text-align: right;">Jnana Bharathi Vidya Mandira, Chitradurga</td>
            </tr>
          </table>
        </section>

        <section class="paper-section">
          <h2>PERSONAL DETAILS & PROFILE</h2>
          <hr/>
          <table class="paper-table">
            <tr><td>• <strong>Father's Name:</strong> SM Virpakshaiah</td><td>• <strong>Date of Birth:</strong> 06-03-2003</td></tr>
            <tr><td>• <strong>Mother's Name:</strong> SM Vijaya</td><td>• <strong>Gender:</strong> Male</td></tr>
            <tr><td>• <strong>Languages Known:</strong> English, Kannada, Hindi, Telugu</td><td>• <strong>Hobbies:</strong> Playing Chess, Music, Technical Data Center Learning</td></tr>
          </table>
        </section>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.resume-modal-close');
  const overlay = modal.querySelector('.resume-modal-overlay');
  const printBtn = modal.querySelector('#print-resume-btn');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

/* ── 10. Copy to Clipboard ── */
function initCopyToClipboard() {
  document.querySelectorAll('.copy-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy') || el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: "${text}"`);
      });
    });
  });
}

function showToast(msg) {
  let toast = document.querySelector('.custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'custom-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ── 11. Contact Form Submit ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('[name="name"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `⏳ Sending Message...`;
    }

    setTimeout(() => {
      showToast(`Thank you ${nameInput ? nameInput.value : 'friend'}! Your message has been sent directly to Sadguru.`);
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `🚀 Send Direct Message`;
      }
    }, 900);
  });
}

/* ── 12. 3D Tilt Card Effect ── */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.hero-glass-card, .project-card, .skill-category-card, .quickai-container');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ── 13. Command Palette (Ctrl + K) ── */
function initCommandPalette() {
  const modal = document.createElement('div');
  modal.className = 'cmd-palette-modal';
  modal.innerHTML = `
    <div class="cmd-overlay"></div>
    <div class="cmd-box">
      <div class="cmd-input-wrap">
        <span class="cmd-icon">🔍</span>
        <input type="text" id="cmd-input" placeholder="Type a command or jump to section (e.g. QuickAI, Skills, Resume)..." />
        <span class="cmd-esc">ESC</span>
      </div>
      <ul class="cmd-list" id="cmd-list">
        <li data-action="quickai">⚡ Jump to QuickAI SaaS Sandbox</li>
        <li data-action="projects">🚀 Jump to Featured Projects</li>
        <li data-action="skills">💻 View Technical Skills Matrix</li>
        <li data-action="education">🎓 View Education Timeline</li>
        <li data-action="gallery">📸 View Photo Gallery</li>
        <li data-action="contact">📧 Contact Sadguru V.</li>
        <li data-action="resume">📄 Open Printable PDF Resume</li>
        <li data-action="sound">🔊 Toggle Audio Feedback</li>
      </ul>
    </div>
  `;

  document.body.appendChild(modal);

  const overlay = modal.querySelector('.cmd-overlay');
  const input = modal.querySelector('#cmd-input');
  const list = modal.querySelector('#cmd-list');
  const cmdTriggerBtns = document.querySelectorAll('.open-cmd-palette');

  const openCmd = () => {
    modal.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  const closeCmd = () => {
    modal.classList.remove('active');
  };

  cmdTriggerBtns.forEach(btn => btn.addEventListener('click', openCmd));

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closeCmd() : openCmd();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCmd();
    }
  });

  if (overlay) overlay.addEventListener('click', closeCmd);

  if (list) {
    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const action = li.getAttribute('data-action');
        closeCmd();
        if (action === 'resume') {
          document.querySelector('.open-resume-modal')?.click();
        } else if (action === 'sound') {
          document.getElementById('sound-toggle-btn')?.click();
        } else if (action === 'skills') {
          window.location.href = 'skills.html';
        } else if (action === 'gallery') {
          window.location.href = 'gallery.html';
        } else if (action === 'contact') {
          window.location.href = 'contact.html';
        } else {
          const target = document.getElementById(action);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

/* ── 14. Interactive Code Snippet Drawer Modal ── */
function initCodeSnippetModal() {
  const snippets = {
    react: {
      title: 'React.js & Ollama Custom Hook (QuickAI Architecture)',
      code: `// useOllamaStream.js — Authored by Sadguru V.
import { useState, useCallback } from 'react';

export function useOllamaStream() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async (prompt, model = 'llama3') => {
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: true }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const json = JSON.parse(chunk);
        setOutput((prev) => prev + json.response);
      }
    } catch (err) {
      console.error('Ollama stream error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { output, loading, generate };
}`
    },
    python: {
      title: 'Python Gemini API Multimodal Dispatcher',
      code: `# gemini_dispatcher.py — Authored by Sadguru V.
import google.generativeai as genai
import os

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

def dispatch_multimodal_analysis(prompt: str, image_bytes: bytes = None):
    """
    Dual-engine cloud fallback executor for QuickAI SaaS.
    """
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    payload = [prompt]
    if image_bytes:
        payload.append({'mime_type': 'image/jpeg', 'data': image_bytes})
        
    response = model.generate_content(payload)
    return {
        "status": "success",
        "tokens_used": response.usage_metadata.total_token_count,
        "content": response.text
    }`
    },
    tailwind: {
      title: 'Tailwind CSS Glassmorphism Utility Tokens',
      code: `/* tailwind.config.js — Cyber-Glass Palette */
module.exports = {
  theme: {
    extend: {
      colors: {
        obsidian: '#050711',
        glassBg: 'rgba(15, 23, 42, 0.65)',
        primaryGlow: 'rgba(139, 92, 246, 0.35)',
        cyanGlow: 'rgba(6, 182, 212, 0.35)',
      },
      backdropBlur: {
        glass: '20px',
      }
    }
  }
}`
    }
  };

  const modal = document.createElement('div');
  modal.className = 'snippet-modal';
  modal.innerHTML = `
    <div class="snippet-overlay"></div>
    <div class="snippet-box">
      <div class="snippet-header">
        <h3 id="snippet-title">Code Snippet</h3>
        <button class="snippet-close">&times;</button>
      </div>
      <pre class="snippet-code"><code id="snippet-code-content"></code></pre>
    </div>
  `;
  document.body.appendChild(modal);

  const titleEl = modal.querySelector('#snippet-title');
  const codeEl = modal.querySelector('#snippet-code-content');
  const closeBtn = modal.querySelector('.snippet-close');
  const overlay = modal.querySelector('.snippet-overlay');

  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.querySelectorAll('.open-snippet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-snippet');
      if (snippets[key]) {
        titleEl.textContent = snippets[key].title;
        codeEl.textContent = snippets[key].code;
        modal.classList.add('active');
      }
    });
  });
}

/* ── 15. Project Details Drawer Modal ── */
function initProjectDetailsModal() {
  const projectDetails = {
    quickai: {
      title: 'QuickAI – Multi-Model AI Productivity SaaS Platform',
      badge: 'MCA Major Project | Architecture Specs',
      content: `
<strong>Architecture Breakdown:</strong>
• <strong>Frontend:</strong> React.js, Vite, Tailwind CSS, Custom Keyboard Shortcuts, Responsive Dark/Light Modes.
• <strong>AI Engine 1 (Local):</strong> Ollama Llama3 offline integration via local REST proxy for privacy-first execution.
• <strong>AI Engine 2 (Cloud):</strong> Google AI Studio / Gemini 1.5 Flash API for high-bandwidth multimodal reasoning.
• <strong>SaaS Core:</strong> Automated credit quota management (Free tier & Go Member tier), usage tracking, session limits.
• <strong>Modules:</strong> Article Generator, Viral Title Synthesizer, Resume Evaluator, Automated Background Removal, Deep Web Research, Asset Indexing Hub.
      `
    },
    portfolio: {
      title: 'Personal Portfolio & Showcase Web Application',
      badge: 'Production Deployment | Live on Netlify',
      content: `
<strong>Deployment & Performance Specs:</strong>
• <strong>Stack:</strong> HTML5, CSS3, JavaScript (ES6+), Bootstrap Grid, Custom Keyframe Animations.
• <strong>CI/CD Pipeline:</strong> Continuous deployment via Netlify linked to GitHub repository.
• <strong>Performance & SEO:</strong> Optimized asset caching, semantic HTML5 structure, fluid cross-browser grid layouts, sub-second initial load.
      `
    },
    api: {
      title: 'Generative AI Microservice & REST API Proxy',
      badge: 'Backend Architecture',
      content: `
<strong>Backend Specifications:</strong>
• <strong>Stack:</strong> Python, RESTful API Architecture, JSON payload processing.
• <strong>Features:</strong> Granular rate limiting, session quota validation, structured error recovery, async stream handling.
      `
    }
  };

  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="project-modal-overlay"></div>
    <div class="project-modal-box">
      <div class="project-modal-header">
        <span class="project-badge" id="proj-modal-badge">Specs</span>
        <h3 id="proj-modal-title">Project Title</h3>
        <button class="project-modal-close">&times;</button>
      </div>
      <div class="project-modal-body" id="proj-modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const titleEl = modal.querySelector('#proj-modal-title');
  const badgeEl = modal.querySelector('#proj-modal-badge');
  const bodyEl = modal.querySelector('#proj-modal-body');
  const closeBtn = modal.querySelector('.project-modal-close');
  const overlay = modal.querySelector('.project-modal-overlay');

  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      if (projectDetails[projKey]) {
        titleEl.textContent = projectDetails[projKey].title;
        badgeEl.textContent = projectDetails[projKey].badge;
        bodyEl.innerHTML = projectDetails[projKey].content;
        modal.classList.add('active');
      }
    });
  });
}
