/**
 * ==============================================================================
 * 🎮 RETRO PORTFOLIO CONFIGURATION - EASY TO EDIT! 🎮
 * ==============================================================================
 * All the text, levels (projects), power-ups (skills), and links on this website
 * can be edited right here in this file.
 * 
 * Just replace the text inside the quotes "..." with your own information.
 * Save the file and refresh your browser to see your changes immediately!
 * ==============================================================================
 */

const PORTFOLIO_DATA = {
  // ----------------------------------------------------------------------------
  // 👤 HERO & PLAYER IDENTITY
  // ----------------------------------------------------------------------------
  player: {
    name: "Rishabh",
    title: "Full-Stack Developer & Software Craftsman",
    class: "Level 99 Code Wizard",
    location: "Earth / Remote",
    status: "OPEN FOR QUESTS & COLLABORATION",
    bio: "Passionate developer crafting boss-tier digital experiences, high-performance web applications, and resilient software architectures. Turning complex bugs into clean, scalable features one commit at a time.",
    stats: {
      hp: "9999/9999",
      mp: "999/999",
      lvl: "99",
      exp: "945,210 XP",
      coins: 99,
      score: 999990
    },
    avatar: {
      tag: "[PLAYER 1 READY]",
      speechBubble: "Press Start to inspect my journey or select a Stage to preview my work!"
    }
  },

  // ----------------------------------------------------------------------------
  // 🔗 SOCIAL FREQUENCIES & CONTACT
  // ----------------------------------------------------------------------------
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "rishabh.developer@example.com",
    resumeUrl: "#contact" // Link to resume PDF or contact section
  },

  // ----------------------------------------------------------------------------
  // 🏰 PROJECTS AS LEVELS (THE STAGE SELECTOR)
  // ----------------------------------------------------------------------------
  // Add, remove, or modify stages here. Each stage represents a key project.
  stages: [
    {
      id: 1,
      levelNumber: "STAGE 01",
      world: "WORLD 1-1",
      title: "Neon Nexus: AI Platform",
      category: "Full Stack / AI",
      difficulty: "★★★★☆",
      status: "CLEARED [S-RANK]",
      badge: "MAIN QUEST",
      description: "An intelligent autonomous workflow platform leveraging modern LLMs and agentic pipelines. Features real-time streaming, generative UI components, and sub-100ms vector search.",
      techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Tailwind CSS"],
      highlights: [
        "Architected multi-agent execution pipeline handling 10k+ daily prompts",
        "Achieved 99.98% uptime with resilient fallback & retry circuits",
        "Streamlined user workflow time by 45% via custom keyboard shortcuts"
      ],
      metrics: {
        stars: "1.2k ⭐",
        speed: "99/100 Lighthouse",
        users: "15,000+ Active"
      },
      liveUrl: "https://example.com/demo-neon",
      sourceUrl: "https://github.com/example/neon-nexus"
    },
    {
      id: 2,
      levelNumber: "STAGE 02",
      world: "WORLD 1-2",
      title: "HyperVault: Crypto & Asset Engine",
      category: "FinTech & Real-Time",
      difficulty: "★★★★★",
      status: "CLEARED [S-RANK]",
      badge: "SECURITY DUNGEON",
      description: "Ultra-low-latency financial telemetry dashboard tracking decentralized assets, real-time order books, and automated algorithmic trigger alerts with WebSocket feeds.",
      techStack: ["React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
      highlights: [
        "Engineered real-time canvas chart renderer streaming 60fps market ticks",
        "Implemented end-to-end cryptographic verification & signed payloads",
        "Zero memory leaks under continuous 48-hour endurance test harness"
      ],
      metrics: {
        stars: "840 ⭐",
        speed: "Sub-15ms Latency",
        users: "$4.5M Volume"
      },
      liveUrl: "https://example.com/demo-hypervault",
      sourceUrl: "https://github.com/example/hypervault"
    },
    {
      id: 3,
      levelNumber: "STAGE 03",
      world: "WORLD 2-1",
      title: "PulseSync: Collaborative Whiteboard",
      category: "Web Engineering",
      difficulty: "★★★★☆",
      status: "CLEARED [S-RANK]",
      badge: "CO-OP ARENA",
      description: "Infinite collaborative canvas for distributed engineering teams. Features Conflict-Free Replicated Data Types (CRDTs), live cursor tracking, and instant audio rooms.",
      techStack: ["TypeScript", "HTML5 Canvas", "WebRTC", "Node.js", "Docker"],
      highlights: [
        "Peer-to-peer data sync supporting 50 simultaneous contributors per canvas",
        "Custom spatial audio integration with spatial positioning",
        "Offline-first architecture with instant conflict-free state merging"
      ],
      metrics: {
        stars: "2.1k ⭐",
        speed: "60 FPS Canvas",
        users: "30k+ Sessions"
      },
      liveUrl: "https://example.com/demo-pulsesync",
      sourceUrl: "https://github.com/example/pulsesync"
    },
    {
      id: 4,
      levelNumber: "STAGE 04",
      world: "WORLD 2-2",
      title: "PixelForge: Retro Game Engine",
      category: "Creative Dev",
      difficulty: "★★★☆☆",
      status: "CLEARED [A-RANK]",
      badge: "SECRET LEVEL",
      description: "Lightweight, zero-dependency browser game engine written from scratch. Includes 8-bit Web Audio synthesizer, tilemap collision detection, and custom sprite pipeline.",
      techStack: ["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS Grid"],
      highlights: [
        "Only 14KB uncompressed bundle with zero third-party dependencies",
        "Integrated Web Audio synth generator with real-time waveform modulation",
        "Export games directly to playable web bundles or desktop executables"
      ],
      metrics: {
        stars: "950 ⭐",
        speed: "14KB Footprint",
        users: "Open Source"
      },
      liveUrl: "https://example.com/demo-pixelforge",
      sourceUrl: "https://github.com/example/pixelforge"
    },
    {
      id: 5,
      levelNumber: "STAGE 05",
      world: "WORLD 3-BOSS",
      title: "AegisGrid: Distributed Cloud Mesh",
      category: "DevOps & Systems",
      difficulty: "★★★★★",
      status: "CLEARED [S-RANK]",
      badge: "FINAL BOSS DUNGEON",
      description: "High-resilience container orchestration daemon with self-healing service mesh, zero-trust traffic tunnels, and dynamic edge load balancing.",
      techStack: ["Go", "Kubernetes", "gRPC", "Prometheus", "Linux"],
      highlights: [
        "Reduced cluster failover recovery time from 4 minutes down to 1.8 seconds",
        "Automated rolling canary deployments with telemetry anomaly triggers",
        "Designed declarative YAML CLI with full syntax validation"
      ],
      metrics: {
        stars: "3.4k ⭐",
        speed: "99.999% SLA",
        users: "Enterprise Core"
      },
      liveUrl: "https://example.com/demo-aegisgrid",
      sourceUrl: "https://github.com/example/aegisgrid"
    }
  ],

  // ----------------------------------------------------------------------------
  // ⚡ SKILLS AS POWER-UPS (THE INVENTORY)
  // ----------------------------------------------------------------------------
  // Skills styled as classic RPG power-up items with stats and funny lore!
  powerUps: [
    {
      id: "powerup-1",
      name: "Super Mushroom",
      skill: "React & Next.js",
      category: "Frontend Mastery",
      icon: "🍄",
      level: "MAX LEVEL",
      stats: { pwr: 96, spd: 92, mana: 88 },
      flavor: "Doubles UI scale and renders interactive DOM trees without dropped frames. Grants component reusability aura."
    },
    {
      id: "powerup-2",
      name: "Fire Flower",
      skill: "TypeScript & JavaScript",
      category: "Core Magic",
      icon: "🔥",
      level: "MAX LEVEL",
      stats: { pwr: 98, spd: 95, mana: 94 },
      flavor: "Hurls compile-time type checks that vaporize runtime exceptions before they can reach production servers."
    },
    {
      id: "powerup-3",
      name: "Star Power",
      skill: "Node.js & Backend Architecture",
      category: "Server Sorcery",
      icon: "⭐",
      level: "LVL 95",
      stats: { pwr: 94, spd: 96, mana: 90 },
      flavor: "Grants 60 seconds of complete invulnerability against sudden black-friday traffic spikes and DDOS waves."
    },
    {
      id: "powerup-4",
      name: "Lightning Bolt",
      skill: "Performance & Web Vitals",
      category: "Optimization",
      icon: "⚡",
      level: "MAX LEVEL",
      stats: { pwr: 95, spd: 99, mana: 85 },
      flavor: "Slashes TTFB and bundle sizes by 70%. Keeps Google Core Web Vitals glowing a crisp, untouchable 100."
    },
    {
      id: "powerup-5",
      name: "Mana Potion",
      skill: "Python & AI Agent Engineering",
      category: "Intelligence",
      icon: "🧪",
      level: "LVL 92",
      stats: { pwr: 92, spd: 88, mana: 99 },
      flavor: "Replenishes reasoning tokens. Enables multi-step autonomous tool chaining and deep semantic embeddings."
    },
    {
      id: "powerup-6",
      name: "Shield of Aegis",
      skill: "Docker, Kubernetes & CI/CD",
      category: "DevOps Citadel",
      icon: "🛡️",
      level: "LVL 90",
      stats: { pwr: 91, spd: 90, mana: 93 },
      flavor: "Encapsulates application state in unbreakable container shields. Deploys seamlessly across planetary nodes."
    },
    {
      id: "powerup-7",
      name: "Laser Blaster",
      skill: "PostgreSQL, Redis & Prisma",
      category: "Data Forge",
      icon: "🔫",
      level: "LVL 93",
      stats: { pwr: 94, spd: 95, mana: 87 },
      flavor: "Pierces through billions of records with indexed laser precision and ultra-fast microsecond cache hits."
    },
    {
      id: "powerup-8",
      name: "Warp Whistle",
      skill: "REST, GraphQL & WebSockets",
      category: "Networking",
      icon: "🛸",
      level: "MAX LEVEL",
      stats: { pwr: 93, spd: 98, mana: 91 },
      flavor: "Instantly teleports state packets between client and server realms with zero latency or dropped frames."
    }
  ],

  // ----------------------------------------------------------------------------
  // 🏆 ACHIEVEMENTS / UNLOCKED BADGES
  // ----------------------------------------------------------------------------
  achievements: [
    {
      title: "Bug Exterminator",
      icon: "👾",
      date: "UNLOCKED",
      desc: "Squashed 1,000+ critical edge-case bugs before they hit staging."
    },
    {
      title: "100% Lighthouse God",
      icon: "🏅",
      date: "UNLOCKED",
      desc: "Delivered flawless green audit scores across Performance, SEO & A11y."
    },
    {
      title: "Night Owl Coder",
      icon: "🌙",
      date: "UNLOCKED",
      desc: "Fuelled by dark roast coffee and 8-bit lofi beats at 2:00 AM."
    },
    {
      title: "Clean Code Paladin",
      icon: "⚔️",
      date: "UNLOCKED",
      desc: "Wrote documentation and automated tests that teammates actually enjoy reading."
    }
  ],

  // ----------------------------------------------------------------------------
  // 🗺️ QUEST LOG // CAREER & EXP JOURNEY
  // ----------------------------------------------------------------------------
  questLog: [
    {
      era: "WORLD 3: 2024 - PRESENT",
      role: "Lead Adventurer / Senior Full Stack Engineer",
      guild: "Tech Innovators Corp",
      badge: "ACTIVE GUILD",
      missions: [
        "Spearheading development of modern web applications used by 500k+ global adventurers.",
        "Mentoring apprentice junior developers and establishing team-wide test-driven protocols.",
        "Optimized frontend build pipelines, slashing compile cycles by 62%."
      ]
    },
    {
      era: "WORLD 2: 2022 - 2024",
      role: "Full Stack Engineer & Core Contributor",
      guild: "Digital Frontier Labs",
      badge: "QUEST CLEARED",
      missions: [
        "Crafted responsive, high-traffic SaaS interfaces using React, TypeScript, and Tailwind.",
        "Designed resilient GraphQL and REST APIs backed by scalable PostgreSQL databases.",
        "Pioneered end-to-end design systems that boosted product delivery velocity by 40%."
      ]
    },
    {
      era: "WORLD 1: 2020 - 2022",
      role: "Apprentice Developer / Tutorial Island",
      guild: "Foundational Academy",
      badge: "GRADUATED",
      missions: [
        "Mastered the fundamentals of algorithmic problem solving, data structures, and computer science.",
        "Built 20+ responsive web projects, retro games, and open-source utility tools.",
        "Awarded First Prize in National Collegiate Hackathon for best accessibility application."
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // 👾 BOSS FIGHT BATTLE BOX DIALOGUE (CONTACT SECTION)
  // ----------------------------------------------------------------------------
  bossFight: {
    enemyName: "CHALLENGE BOSS: NEW PROJECT / HIRE ME",
    enemyHp: "10,000 / 10,000 HP",
    promptText: "A wild Opportunity appeared! What will Rishabh do?",
    actions: {
      attack: "Rishabh attacks with a polished prototype! It's super effective! 💥",
      magic: "Rishabh casts 'Full-Stack Transmutation'! Concept turned into reality! ✨",
      item: "Rishabh hands over his Resume Scroll! +1000 Alliance Trust! 📜",
      run: "Can't run from an awesome project! Rishabh stands his ground! 🛡️"
    },
    terminalPrompt: "> SENDER_TERMINAL // INITIATE TRANSMISSION",
    successMessage: "MESSAGE TRANSMITTED! Packets securely received by Rishabh. Expect a reply within 24 hours!"
  }
};

// Export to window so it is accessible universally
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
