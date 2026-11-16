/**
 * ==============================================================================
 * 🕹️ RETRO PORTFOLIO MAIN APPLICATION CONTROLLER
 * ==============================================================================
 * Renders data from config.js, manages scroll animations, sound effects,
 * interactive RPG mechanics, and mobile responsiveness.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Check data availability
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA not found in config.js");
    return;
  }

  // 2. Render all dynamic content from config.js
  renderHeaderAndHero(data);
  renderStages(data.stages);
  renderPowerUps(data.powerUps);
  renderAchievements(data.achievements);
  renderQuestLog(data.questLog);
  renderBossFight(data.bossFight);
  renderFooter(data);

  // 3. Initialize Interactive Features
  initSoundToggle();
  initCrtToggle();
  initMobileMenu();
  initScrollAnimations();
  initScrollProgress();
  initAudioHoverTriggers();
  initKonamiCode();
  initContactTerminal(data.bossFight);
  initEasterEggs();

  // 4. Initialize Mini-Game
  if (window.RetroGame) {
    window.arcadeGame = new window.RetroGame("arcade-canvas");
  }
});

// ------------------------------------------------------------------------------
// RENDER: Header & Hero Section
// ------------------------------------------------------------------------------
function renderHeaderAndHero(data) {
  // Update Header Player Name
  const headerName = document.getElementById("hud-player-name");
  if (headerName) headerName.textContent = data.player.name.toUpperCase();

  // Update Hero Titles & Bio
  const heroName = document.getElementById("hero-player-name");
  if (heroName) heroName.textContent = data.player.name.toUpperCase();

  const heroTagline = document.getElementById("hero-tagline");
  if (heroTagline) heroTagline.textContent = data.player.title;

  const heroClass = document.getElementById("hero-player-class");
  if (heroClass) heroClass.textContent = data.player.class;

  const heroBio = document.getElementById("hero-player-bio");
  if (heroBio) heroBio.textContent = data.player.bio;

  const heroSpeech = document.getElementById("hero-speech-bubble");
  if (heroSpeech) heroSpeech.textContent = data.player.avatar.speechBubble;

  // Stats
  const statLvl = document.getElementById("hud-stat-lvl");
  if (statLvl) statLvl.textContent = data.player.stats.lvl;

  const drawerStatLvl = document.getElementById("drawer-stat-lvl");
  if (drawerStatLvl) drawerStatLvl.textContent = data.player.stats.lvl;

  const statExp = document.getElementById("hud-stat-exp");
  if (statExp) statExp.textContent = data.player.stats.exp;

  const statCoins = document.getElementById("hud-stat-coins");
  if (statCoins) statCoins.textContent = data.player.stats.coins;

  const statScore = document.getElementById("hud-score-val");
  if (statScore) statScore.textContent = data.player.stats.score.toLocaleString();
}

// ------------------------------------------------------------------------------
// RENDER: Stages as Projects (Levels 1 to 5)
// ------------------------------------------------------------------------------
function renderStages(stages) {
  const container = document.getElementById("stages-grid-container");
  if (!container) return;

  container.innerHTML = stages.map((stage, idx) => `
    <article class="stage-card retro-box scroll-reveal" data-stage-id="${stage.id}" style="--reveal-delay: ${idx * 0.1}s">
      <!-- Stage Header Bar -->
      <div class="stage-card-header">
        <div class="stage-badge-group">
          <span class="pixel-pill pill-white">${stage.levelNumber}</span>
          <span class="pixel-pill pill-outline">${stage.world}</span>
        </div>
        <div class="stage-status-badge">
          <span class="status-cleared">${stage.status}</span>
        </div>
      </div>

      <!-- Stage Title & Category -->
      <div class="stage-card-body">
        <div class="stage-meta-row">
          <span class="stage-category">${stage.category}</span>
          <span class="stage-difficulty" title="Difficulty: ${stage.difficulty}">DIFF: ${stage.difficulty}</span>
        </div>

        <h3 class="stage-title">${stage.title}</h3>
        <p class="stage-desc">${stage.description}</p>

        <!-- Quest Objective / Highlights -->
        <div class="stage-objectives">
          <div class="objectives-title"><span>▶ QUEST LOG HIGHLIGHTS:</span></div>
          <ul class="objectives-list">
            ${stage.highlights.map(hl => `<li><span class="bullet">◆</span> ${hl}</li>`).join("")}
          </ul>
        </div>

        <!-- Loot Drops / Tech Stack -->
        <div class="stage-loot-section">
          <span class="loot-label">LOOT DROPS (TECH):</span>
          <div class="loot-tags">
            ${stage.techStack.map(tech => `<span class="loot-tag">[ ${tech} ]</span>`).join("")}
          </div>
        </div>

        <!-- Stage Metrics -->
        <div class="stage-metrics-row">
          <div class="metric-item">
            <span class="metric-key">STARS</span>
            <span class="metric-val">${stage.metrics.stars}</span>
          </div>
          <div class="metric-item">
            <span class="metric-key">BENCHMARK</span>
            <span class="metric-val">${stage.metrics.speed}</span>
          </div>
          <div class="metric-item">
            <span class="metric-key">IMPACT</span>
            <span class="metric-val">${stage.metrics.users}</span>
          </div>
        </div>
      </div>

      <!-- Stage Action Controller -->
      <div class="stage-card-footer">
        <a href="${stage.liveUrl}" target="_blank" rel="noopener noreferrer" class="retro-btn btn-primary sound-btn">
          <span>▶ PLAY DEMO</span>
        </a>
        <a href="${stage.sourceUrl}" target="_blank" rel="noopener noreferrer" class="retro-btn btn-secondary sound-btn">
          <span>&lt;/&gt; SOURCE</span>
        </a>
      </div>
    </article>
  `).join("");
}

// ------------------------------------------------------------------------------
// RENDER: Skills as Power-Ups (Inventory)
// ------------------------------------------------------------------------------
function renderPowerUps(powerUps) {
  const container = document.getElementById("powerups-grid-container");
  if (!container) return;

  container.innerHTML = powerUps.map((item, idx) => `
    <div class="powerup-card retro-box scroll-reveal" style="--reveal-delay: ${idx * 0.08}s">
      <div class="powerup-icon-wrap">
        <span class="powerup-emoji" role="img" aria-label="${item.name}">${item.icon}</span>
        <span class="powerup-level-badge">${item.level}</span>
      </div>

      <div class="powerup-info">
        <div class="powerup-category">${item.category.toUpperCase()}</div>
        <h4 class="powerup-name">${item.name}</h4>
        <div class="powerup-skill-title">${item.skill}</div>
        <p class="powerup-flavor">"${item.flavor}"</p>

        <!-- RPG Stats Gauges -->
        <div class="powerup-stats-group">
          <div class="stat-gauge-row">
            <span class="stat-name">PWR</span>
            <div class="stat-track">
              <div class="stat-fill" style="width: ${item.stats.pwr}%"></div>
            </div>
            <span class="stat-num">${item.stats.pwr}</span>
          </div>

          <div class="stat-gauge-row">
            <span class="stat-name">SPD</span>
            <div class="stat-track">
              <div class="stat-fill" style="width: ${item.stats.spd}%"></div>
            </div>
            <span class="stat-num">${item.stats.spd}</span>
          </div>

          <div class="stat-gauge-row">
            <span class="stat-name">MNA</span>
            <div class="stat-track">
              <div class="stat-fill" style="width: ${item.stats.mana}%"></div>
            </div>
            <span class="stat-num">${item.stats.mana}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ------------------------------------------------------------------------------
// RENDER: Achievements / Trophy Room
// ------------------------------------------------------------------------------
function renderAchievements(achievements) {
  const container = document.getElementById("achievements-grid-container");
  if (!container) return;

  container.innerHTML = achievements.map((ach, idx) => `
    <div class="achievement-card retro-box scroll-reveal" style="--reveal-delay: ${idx * 0.1}s">
      <div class="ach-icon">${ach.icon}</div>
      <div class="ach-content">
        <div class="ach-top">
          <h4 class="ach-title">${ach.title}</h4>
          <span class="ach-status pixel-pill pill-white">${ach.date}</span>
        </div>
        <p class="ach-desc">${ach.desc}</p>
      </div>
    </div>
  `).join("");
}

// ------------------------------------------------------------------------------
// RENDER: Quest Log / Experience Journey
// ------------------------------------------------------------------------------
function renderQuestLog(quests) {
  const container = document.getElementById("quest-timeline-container");
  if (!container) return;

  container.innerHTML = quests.map((q, idx) => `
    <div class="quest-log-item scroll-reveal" style="--reveal-delay: ${idx * 0.15}s">
      <div class="quest-node">
        <div class="quest-node-box"></div>
        <div class="quest-node-line"></div>
      </div>
      <div class="quest-card retro-box">
        <div class="quest-card-header">
          <span class="quest-era pixel-pill pill-white">${q.era}</span>
          <span class="quest-badge pixel-pill pill-outline">${q.badge}</span>
        </div>
        <h4 class="quest-role">${q.role}</h4>
        <div class="quest-guild"><span class="guild-icon">⚔️</span> ${q.guild}</div>
        <ul class="quest-missions">
          ${q.missions.map(m => `<li><span class="bullet">▶</span> ${m}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

// ------------------------------------------------------------------------------
// RENDER: Boss Fight / Dialogue
// ------------------------------------------------------------------------------
function renderBossFight(bossData) {
  const nameEl = document.getElementById("boss-enemy-name");
  if (nameEl) nameEl.textContent = bossData.enemyName;

  const hpEl = document.getElementById("boss-enemy-hp-text");
  if (hpEl) hpEl.textContent = bossData.enemyHp;

  const dialogText = document.getElementById("boss-dialog-text");
  if (dialogText) dialogText.textContent = bossData.promptText;

  // Battle Action Buttons
  const buttons = document.querySelectorAll(".battle-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      if (window.retroAudio) {
        if (action === "attack") window.retroAudio.playExplosion();
        else if (action === "magic") window.retroAudio.playPowerUp();
        else if (action === "item") window.retroAudio.playCoin();
        else window.retroAudio.playJump();
      }

      if (dialogText && bossData.actions[action]) {
        dialogText.textContent = bossData.actions[action];
        dialogText.classList.remove("text-flash");
        void dialogText.offsetWidth; // Reflow for animation
        dialogText.classList.add("text-flash");
      }

      // If ATTACK or MAGIC was clicked, shake boss and decrease health bar slightly!
      if (action === "attack" || action === "magic") {
        const enemyBox = document.getElementById("boss-enemy-box");
        const hpBar = document.getElementById("boss-enemy-hp-bar");
        if (enemyBox) {
          enemyBox.classList.add("boss-damaged");
          setTimeout(() => enemyBox.classList.remove("boss-damaged"), 500);
        }
        if (hpBar) {
          hpBar.style.width = action === "attack" ? "42%" : "25%";
        }
      }
    });
  });
}

// ------------------------------------------------------------------------------
// RENDER: Footer Social Links & Copyright
// ------------------------------------------------------------------------------
function renderFooter(data) {
  const gh = document.getElementById("footer-link-github");
  if (gh) gh.href = data.socials.github;

  const li = document.getElementById("footer-link-linkedin");
  if (li) li.href = data.socials.linkedin;

  const tw = document.getElementById("footer-link-twitter");
  if (tw) tw.href = data.socials.twitter;

  const em = document.getElementById("footer-link-email");
  if (em) em.href = `mailto:${data.socials.email}`;

  const copyName = document.getElementById("footer-player-name");
  if (copyName) copyName.textContent = data.player.name;
}

// ------------------------------------------------------------------------------
// FEATURE: Sound Toggle & Web Audio
// ------------------------------------------------------------------------------
function initSoundToggle() {
  const toggleBtn = document.getElementById("hud-sound-toggle");
  const mobileToggleBtn = document.getElementById("mobile-menu-sound-toggle");

  function updateButtonState(isEnabled) {
    const label = isEnabled ? "SFX: ON [🔊]" : "SFX: OFF [🔇]";
    if (toggleBtn) {
      toggleBtn.textContent = label;
      toggleBtn.classList.toggle("btn-active", isEnabled);
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.textContent = label;
      mobileToggleBtn.classList.toggle("btn-active", isEnabled);
    }
  }

  // Initial state check
  if (window.retroAudio) {
    updateButtonState(window.retroAudio.enabled);
  }

  const handleToggle = () => {
    if (window.retroAudio) {
      const state = window.retroAudio.toggle();
      updateButtonState(state);
    }
  };

  if (toggleBtn) toggleBtn.addEventListener("click", handleToggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener("click", handleToggle);
}

// ------------------------------------------------------------------------------
// FEATURE: CRT Scanline Mode Toggle
// ------------------------------------------------------------------------------
function initCrtToggle() {
  const crtBtn = document.getElementById("hud-crt-toggle");
  const mobileCrtBtn = document.getElementById("mobile-menu-crt-toggle");
  const crtOverlay = document.getElementById("crt-screen-overlay");

  const storageKey = "rishabh_crt_mode";
  let crtActive = localStorage.getItem(storageKey) !== "false"; // Default ON for retro feel!

  function updateCrt(active) {
    crtActive = active;
    localStorage.setItem(storageKey, active ? "true" : "false");
    if (crtOverlay) {
      crtOverlay.classList.toggle("crt-enabled", active);
    }
    const label = active ? "CRT: ON [📺]" : "CRT: OFF [⬛]";
    if (crtBtn) {
      crtBtn.textContent = label;
      crtBtn.classList.toggle("btn-active", active);
    }
    if (mobileCrtBtn) {
      mobileCrtBtn.textContent = label;
      mobileCrtBtn.classList.toggle("btn-active", active);
    }
  }

  updateCrt(crtActive);

  const toggle = () => {
    if (window.retroAudio) window.retroAudio.playBlip();
    updateCrt(!crtActive);
  };

  if (crtBtn) crtBtn.addEventListener("click", toggle);
  if (mobileCrtBtn) mobileCrtBtn.addEventListener("click", toggle);
}

// ------------------------------------------------------------------------------
// FEATURE: Mobile Drawer & Pause Menu
// ------------------------------------------------------------------------------
function initMobileMenu() {
  const pauseBtn = document.getElementById("hud-mobile-pause-btn");
  const drawer = document.getElementById("mobile-pause-drawer");
  const closeBtn = document.getElementById("mobile-drawer-close-btn");
  const links = document.querySelectorAll(".mobile-nav-link");

  function openMenu() {
    if (drawer) drawer.classList.add("drawer-open");
    document.body.classList.add("pause-lock");
    if (window.retroAudio) window.retroAudio.playBlip();
  }

  function closeMenu() {
    if (drawer) drawer.classList.remove("drawer-open");
    document.body.classList.remove("pause-lock");
    if (window.retroAudio) window.retroAudio.playBlip();
  }

  if (pauseBtn) pauseBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  links.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// ------------------------------------------------------------------------------
// FEATURE: Scroll Progress Gauge (XP Meter in HUD)
// ------------------------------------------------------------------------------
function initScrollProgress() {
  const xpProgressBar = document.getElementById("hud-xp-fill");
  const xpPercentageText = document.getElementById("hud-xp-percent");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
    const percent = Math.floor(progress * 100);

    if (xpProgressBar) {
      xpProgressBar.style.width = `${percent}%`;
    }
    if (xpPercentageText) {
      xpPercentageText.textContent = `${percent}%`;
    }
  }, { passive: true });
}

// ------------------------------------------------------------------------------
// FEATURE: Smooth Scroll-In Animations
// ------------------------------------------------------------------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// ------------------------------------------------------------------------------
// FEATURE: Audio Triggers on Hover & Click
// ------------------------------------------------------------------------------
function initAudioHoverTriggers() {
  // Blip on buttons & links
  const interactives = document.querySelectorAll(".sound-btn, .retro-btn, .pixel-pill, .hud-btn");

  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (window.retroAudio && window.retroAudio.enabled) {
        window.retroAudio.playBlip();
      }
    });
    el.addEventListener("click", () => {
      if (window.retroAudio && window.retroAudio.enabled) {
        window.retroAudio.playCoin();
      }
    });
  });

  // Power-up card hover sound
  const powerupCards = document.querySelectorAll(".powerup-card");
  powerupCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      if (window.retroAudio && window.retroAudio.enabled) {
        window.retroAudio.playPowerUp();
      }
    });
  });
}

// ------------------------------------------------------------------------------
// FEATURE: Contact Arcade Terminal Form
// ------------------------------------------------------------------------------
function initContactTerminal(bossData) {
  const form = document.getElementById("contact-terminal-form");
  const statusLog = document.getElementById("terminal-status-log");
  const copyEmailBtn = document.getElementById("copy-email-btn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("term-sender-name")?.value || "Adventurer";
      const email = document.getElementById("term-sender-email")?.value || "anon@quest.com";
      const message = document.getElementById("term-sender-msg")?.value || "";

      if (statusLog) {
        statusLog.textContent = "> TRANSMITTING PACKETS... ENCRYPTING... [██████████] 100%";
        statusLog.classList.add("transmitting");
      }

      if (window.retroAudio) window.retroAudio.playLaser();

      setTimeout(() => {
        if (statusLog) {
          statusLog.textContent = `> TRANSMISSION SUCCESSFUL! Rishabh received signal from ${name} (${email}). Expect response shortly!`;
          statusLog.classList.remove("transmitting");
          statusLog.classList.add("transmission-done");
        }
        if (window.retroAudio) window.retroAudio.playVictory();
        form.reset();
      }, 1200);
    });
  }

  // Copy Email Button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = window.PORTFOLIO_DATA?.socials?.email || "rishabh.developer@example.com";
      navigator.clipboard.writeText(email).then(() => {
        const orig = copyEmailBtn.textContent;
        copyEmailBtn.textContent = "[ COPIED TO INVENTORY! 📋 ]";
        if (window.retroAudio) window.retroAudio.playCoin();
        setTimeout(() => {
          copyEmailBtn.textContent = orig;
        }, 2200);
      });
    });
  }
}

// ------------------------------------------------------------------------------
// FEATURE: Secret Konami Code Easter Egg
// ------------------------------------------------------------------------------
function initKonamiCode() {
  const code = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
  ];
  let position = 0;

  window.addEventListener("keydown", (e) => {
    if (e.code === code[position]) {
      position++;
      if (window.retroAudio) window.retroAudio.playBlip();
      if (position === code.length) {
        triggerGodMode();
        position = 0;
      }
    } else {
      position = 0;
    }
  });

  function triggerGodMode() {
    if (window.retroAudio) window.retroAudio.playVictory();

    // Trigger visual confetti / celebration banner
    const banner = document.createElement("div");
    banner.className = "god-mode-banner";
    banner.innerHTML = `
      <div class="god-mode-content retro-box">
        <h2>⚡ GOD MODE UNLOCKED! ⚡</h2>
        <p>KONAMI CODE ACCEPTED! 30 LIVES ADDED + 999,990 XP GRANTED!</p>
        <button class="retro-btn btn-primary" onclick="this.parentElement.parentElement.remove()">CONTINUE</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Boost score & lives
    const hudScore = document.getElementById("hud-score-val");
    if (hudScore) hudScore.textContent = "9,999,990";

    const hudCoins = document.getElementById("hud-stat-coins");
    if (hudCoins) hudCoins.textContent = "999";

    // Playful screen flash
    document.body.classList.add("god-mode-flash");
    setTimeout(() => document.body.classList.remove("god-mode-flash"), 1500);
  }
}

// ------------------------------------------------------------------------------
// FEATURE: Avatar Speech Bubble Interaction
// ------------------------------------------------------------------------------
function initEasterEggs() {
  const avatar = document.getElementById("interactive-hero-avatar");
  const bubble = document.getElementById("hero-speech-bubble");

  const dialogs = [
    "Hey! Click me again for more retro wisdom!",
    "It's dangerous to code alone! Take this Clean Code mantra: 🗡️",
    "Did you know? There's a secret Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
    "Stage 05 has the final boss, but the contact form is where the real quests begin!",
    "Tip: Toggle CRT scanlines in the header for that sweet 90s TV arcade feel!",
    "My code: Zero warnings, zero console errors, 100% test coverage!"
  ];
  let dialogIndex = 0;

  if (avatar && bubble) {
    avatar.addEventListener("click", () => {
      dialogIndex = (dialogIndex + 1) % dialogs.length;
      bubble.textContent = dialogs[dialogIndex];
      bubble.classList.remove("bubble-bounce");
      void bubble.offsetWidth;
      bubble.classList.add("bubble-bounce");
      if (window.retroAudio) window.retroAudio.playJump();
    });
  }
}
