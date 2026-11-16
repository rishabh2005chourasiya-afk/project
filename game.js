/**
 * ==============================================================================
 * 👾 RISHABH'S RETRO PIXEL RUNNER (Playable Mini-Game)
 * ==============================================================================
 * A fast, responsive 8-bit black & white endless runner.
 * Works with Keyboard (Space/Up) and Mobile Touch controls!
 * ==============================================================================
 */

class RetroGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    // Virtual resolution (retro 400x200 scaled up)
    this.width = 480;
    this.height = 240;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isRunning = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("rishabh_runner_hi") || "0", 10);
    this.coinsCollected = 0;
    this.speed = 4;
    this.groundY = 200;
    this.frame = 0;

    // Player character
    this.player = {
      x: 50,
      y: 160,
      w: 24,
      h: 32,
      vy: 0,
      gravity: 0.85,
      jumpForce: -12,
      isGrounded: true,
      canDoubleJump: true,
      ducking: false
    };

    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.stars = [];

    // Initialize starry background
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.groundY - 30),
        size: Math.random() > 0.8 ? 2 : 1,
        speed: 0.5 + Math.random() * 1.5
      });
    }

    this.initEvents();
    this.drawStartScreen();
  }

  initEvents() {
    // Keyboard jump
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (!this.isRunning) {
          this.start();
        } else {
          this.jump();
        }
        // Prevent page scroll when focusing on game
        if (document.activeElement === this.canvas || this.isHovered) {
          e.preventDefault();
        }
      }
    });

    // Canvas click / tap
    this.canvas.addEventListener("click", () => {
      if (!this.isRunning) {
        this.start();
      } else {
        this.jump();
      }
    });

    // Touch support for mobile
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (!this.isRunning) {
        this.start();
      } else {
        this.jump();
      }
    }, { passive: false });

    // Track mouse hover to avoid hijacking arrow keys when reading text
    this.canvas.addEventListener("mouseenter", () => { this.isHovered = true; });
    this.canvas.addEventListener("mouseleave", () => { this.isHovered = false; });

    // Mobile external jump button
    const jumpBtn = document.getElementById("mobile-game-jump-btn");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!this.isRunning) {
          this.start();
        } else {
          this.jump();
        }
      });
    }
  }

  jump() {
    if (this.player.isGrounded) {
      this.player.vy = this.player.jumpForce;
      this.player.isGrounded = false;
      this.player.canDoubleJump = true;
      this.spawnDust(this.player.x + 12, this.player.y + 32);
      if (window.retroAudio) window.retroAudio.playJump();
    } else if (this.player.canDoubleJump) {
      this.player.vy = this.player.jumpForce * 0.9;
      this.player.canDoubleJump = false;
      this.spawnDust(this.player.x + 12, this.player.y + 32);
      if (window.retroAudio) window.retroAudio.playJump();
    }
  }

  start() {
    this.isRunning = true;
    this.score = 0;
    this.speed = 4.2;
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.player.y = this.groundY - this.player.h;
    this.player.vy = 0;
    this.player.isGrounded = true;

    if (window.retroAudio) window.retroAudio.playCoin();

    // Hide overlay message if any
    const overlay = document.getElementById("game-overlay-msg");
    if (overlay) overlay.style.display = "none";

    cancelAnimationFrame(this.animId);
    this.loop();
  }

  gameOver() {
    this.isRunning = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("rishabh_runner_hi", this.highScore.toString());
      if (window.retroAudio) window.retroAudio.playVictory();
    } else {
      if (window.retroAudio) window.retroAudio.playExplosion();
    }

    // Update main HUD score if higher
    const hudScore = document.getElementById("hud-score-val");
    if (hudScore) {
      const currentVal = parseInt(hudScore.textContent.replace(/,/g, "") || "0", 10);
      hudScore.textContent = Math.max(currentVal, this.score + 999000).toLocaleString();
    }

    this.drawGameOverScreen();
  }

  spawnDust(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 2,
        life: 15,
        maxLife: 15,
        color: "#ffffff"
      });
    }
  }

  spawnSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 20,
        maxLife: 20,
        color: "#ffffff"
      });
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  update() {
    this.frame++;
    this.score += 1;

    // Gradual difficulty scale
    if (this.frame % 300 === 0 && this.speed < 8.5) {
      this.speed += 0.35;
    }

    // Player physics
    this.player.vy += this.player.gravity;
    this.player.y += this.player.vy;

    if (this.player.y >= this.groundY - this.player.h) {
      this.player.y = this.groundY - this.player.h;
      this.player.vy = 0;
      this.player.isGrounded = true;
    }

    // Starfield scroll
    this.stars.forEach((s) => {
      s.x -= s.speed;
      if (s.x < 0) s.x = this.width;
    });

    // Spawn Obstacles (Bugs / Glitches)
    if (this.frame % Math.floor(100 - Math.min(this.speed * 4, 45)) === 0) {
      const isFlying = Math.random() > 0.65;
      const obsHeight = isFlying ? 18 : (Math.random() > 0.5 ? 26 : 38);
      const obsWidth = 20;
      const obsY = isFlying ? this.groundY - 55 : this.groundY - obsHeight;

      this.obstacles.push({
        x: this.width + 10,
        y: obsY,
        w: obsWidth,
        h: obsHeight,
        type: isFlying ? "bug" : "glitch"
      });
    }

    // Spawn Collectibles (Coins / Power-ups)
    if (this.frame % 90 === 0) {
      const isHigh = Math.random() > 0.5;
      this.collectibles.push({
        x: this.width + 10,
        y: isHigh ? this.groundY - 55 : this.groundY - 25,
        w: 14,
        h: 14,
        type: Math.random() > 0.8 ? "powerup" : "coin",
        bobOffset: Math.random() * Math.PI
      });
    }

    // Move & collide obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.x -= this.speed;

      // Hitbox check
      if (
        this.player.x + 4 < obs.x + obs.w &&
        this.player.x + this.player.w - 4 > obs.x &&
        this.player.y + 4 < obs.y + obs.h &&
        this.player.y + this.player.h > obs.y
      ) {
        this.gameOver();
        return;
      }

      if (obs.x + obs.w < -20) {
        this.obstacles.splice(i, 1);
      }
    }

    // Move & collect items
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const col = this.collectibles[i];
      col.x -= this.speed;

      // Collision with player
      if (
        this.player.x < col.x + col.w &&
        this.player.x + this.player.w > col.x &&
        this.player.y < col.y + col.h &&
        this.player.y + this.player.h > col.y
      ) {
        this.spawnSparkles(col.x, col.y);
        if (col.type === "coin") {
          this.score += 50;
          this.coinsCollected++;
          if (window.retroAudio) window.retroAudio.playCoin();
        } else {
          this.score += 150;
          if (window.retroAudio) window.retroAudio.playPowerUp();
        }
        this.collectibles.splice(i, 1);
        continue;
      }

      if (col.x + col.w < -20) {
        this.collectibles.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    const ctx = this.ctx;

    // Void Black Screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);

    // Stars
    ctx.fillStyle = "#ffffff";
    this.stars.forEach((s) => {
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
    });

    // Ground Line with retro hash pattern
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY);
    ctx.lineTo(this.width, this.groundY);
    ctx.stroke();

    // Ground hashes
    ctx.fillStyle = "#444444";
    const offset = (this.frame * this.speed) % 16;
    for (let x = -offset; x < this.width; x += 16) {
      ctx.fillRect(x, this.groundY + 4, 8, 2);
      ctx.fillRect(x + 4, this.groundY + 12, 6, 2);
    }

    // Draw Player (Rishabh pixel hero)
    this.drawPlayer(ctx, this.player.x, this.player.y);

    // Draw Obstacles
    this.obstacles.forEach((obs) => {
      if (obs.type === "bug") {
        // Flying Bug / Glitch Drone
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(obs.x + 4, obs.y, 12, 10);
        ctx.fillRect(obs.x, obs.y + 4, 20, 4);
        // Flapping wings
        const wingY = (this.frame % 10 < 5) ? obs.y - 4 : obs.y + 6;
        ctx.fillRect(obs.x + 2, wingY, 6, 2);
        ctx.fillRect(obs.x + 12, wingY, 6, 2);
      } else {
        // Ground Spiky Bug / Cactus
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(obs.x + 4, obs.y, obs.w - 8, obs.h);
        ctx.fillRect(obs.x, obs.y + 6, obs.w, 4);
        ctx.fillRect(obs.x + 2, obs.y + 14, obs.w - 4, 4);
        // Pixel eyes
        ctx.fillStyle = "#000000";
        ctx.fillRect(obs.x + 6, obs.y + 8, 2, 2);
        ctx.fillRect(obs.x + 12, obs.y + 8, 2, 2);
      }
    });

    // Draw Collectibles
    this.collectibles.forEach((col) => {
      const bob = Math.sin(this.frame * 0.1 + col.bobOffset) * 3;
      const cy = col.y + bob;

      if (col.type === "coin") {
        // Pixel Coin
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(col.x + 3, cy, 8, 14);
        ctx.fillRect(col.x, cy + 3, 14, 8);
        ctx.fillStyle = "#000000";
        ctx.fillRect(col.x + 5, cy + 4, 4, 6);
      } else {
        // Mushroom / Power-up Star
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(col.x + 2, cy, 10, 8);
        ctx.fillRect(col.x, cy + 3, 14, 6);
        ctx.fillRect(col.x + 4, cy + 8, 6, 6);
      }
    });

    // Draw Particles
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillRect(p.x, p.y, 2, 2);
    });
    ctx.globalAlpha = 1.0;

    // Game HUD (Score & High Score)
    ctx.fillStyle = "#ffffff";
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText(`SCORE: ${this.score.toString().padStart(5, "0")}`, 15, 25);
    ctx.fillText(`HI: ${this.highScore.toString().padStart(5, "0")}`, this.width - 140, 25);
  }

  drawPlayer(ctx, x, y) {
    // 8-bit Rishabh sprite: Head, Glasses/Eyes, Cap/Hair, Torso, Legs
    const animLeg = Math.floor(this.frame / 6) % 2;

    ctx.fillStyle = "#ffffff";
    // Head / Cap
    ctx.fillRect(x + 6, y, 12, 10);
    // Cap visor
    ctx.fillRect(x + 14, y + 4, 8, 3);
    // Face skin
    ctx.fillStyle = "#000000";
    ctx.fillRect(x + 8, y + 5, 2, 2); // Eye / Glasses
    ctx.fillRect(x + 13, y + 5, 2, 2);

    // Torso / Jacket
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 4, y + 10, 16, 12);
    // Inner tie / shirt detail
    ctx.fillStyle = "#000000";
    ctx.fillRect(x + 11, y + 11, 2, 8);

    // Legs / Running animation
    ctx.fillStyle = "#ffffff";
    if (this.player.isGrounded) {
      if (animLeg === 0) {
        ctx.fillRect(x + 4, y + 22, 6, 10);
        ctx.fillRect(x + 14, y + 22, 6, 8);
      } else {
        ctx.fillRect(x + 6, y + 22, 6, 8);
        ctx.fillRect(x + 14, y + 22, 6, 10);
      }
    } else {
      // In-air jump pose
      ctx.fillRect(x + 2, y + 20, 8, 6);
      ctx.fillRect(x + 14, y + 22, 8, 6);
    }
  }

  drawStartScreen() {
    const ctx = this.ctx;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);

    // Ground
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY);
    ctx.lineTo(this.width, this.groundY);
    ctx.stroke();

    // Player standing
    this.drawPlayer(ctx, 60, this.groundY - 32);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillText("RISHABH'S RETRO RUNNER", this.width / 2, 70);

    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillText("PRESS [SPACE] OR TAP SCREEN", this.width / 2, 115);
    ctx.fillText("TO JUMP OVER BUGS & GRAB COINS", this.width / 2, 135);

    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillStyle = "#888888";
    ctx.fillText(`HI-SCORE: ${this.highScore.toString().padStart(5, "0")}`, this.width / 2, 170);

    ctx.textAlign = "left";
  }

  drawGameOverScreen() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillText("GAME OVER", this.width / 2, 75);

    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText(`SCORE: ${this.score}`, this.width / 2, 110);
    ctx.fillText(`HI-SCORE: ${this.highScore}`, this.width / 2, 135);

    ctx.fillStyle = "#ffffff";
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText("TAP OR PRESS SPACE TO RETRY", this.width / 2, 175);

    ctx.textAlign = "left";
  }
}

window.RetroGame = RetroGame;
