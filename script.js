document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("topbar");
  const progressBar = document.getElementById("progressBar");
  const sectionDots = document.querySelectorAll(".section-dots a");
  const sections = document.querySelectorAll("main section[id], .cover");

  /* Scroll progress + topbar state */
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
    topbar.classList.toggle("is-scrolled", scrollTop > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Active section dot tracking */
  if (sectionDots.length) {
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const dot = document.querySelector(`.section-dots a[href="#${id}"]`);
          if (!dot) return;
          if (entry.isIntersecting) {
            sectionDots.forEach((d) => d.classList.remove("is-active"));
            dot.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((sec) => dotObserver.observe(sec));
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* Offer tabs */
  const offerTabs = document.getElementById("offerTabs");
  if (offerTabs) {
    const tabs = offerTabs.querySelectorAll(".offer-tab");
    const details = document.querySelectorAll("[data-offer-detail]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.offer;
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        details.forEach((d) => d.classList.toggle("is-active", d.dataset.offerDetail === target));
      });
    });
  }

  /* 90-day phases */
  const phases = document.getElementById("phases");
  if (phases) {
    const buttons = phases.querySelectorAll(".phase-btn");
    const panels = phases.querySelectorAll("[data-phase-panel]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.phase;
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        panels.forEach((p) => p.classList.toggle("is-active", p.dataset.phasePanel === target));
      });
    });
  }

  /* Pause pitch video when it scrolls out of view */
  const pitchVideo = document.getElementById("pitchVideo");
  if (pitchVideo) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !pitchVideo.paused) {
            pitchVideo.pause();
          }
        });
      },
      { threshold: 0 }
    );
    videoObserver.observe(pitchVideo);
  }

  /* Custom play button over the pitch video */
  const videoPlayBtn = document.getElementById("videoPlayBtn");
  if (pitchVideo && videoPlayBtn) {
    videoPlayBtn.addEventListener("click", () => pitchVideo.play());
    pitchVideo.addEventListener("play", () => videoPlayBtn.classList.add("is-hidden"));
    pitchVideo.addEventListener("pause", () => videoPlayBtn.classList.remove("is-hidden"));
  }

  /* Cover hero loop: respect reduced motion, pause off-screen */
  const coverVideo = document.getElementById("coverVideo");
  if (coverVideo) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      coverVideo.pause();
    } else {
      const coverVideoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              coverVideo.play().catch(() => {});
            } else {
              coverVideo.pause();
            }
          });
        },
        { threshold: 0 }
      );
      coverVideoObserver.observe(coverVideo);
    }
  }

  /* Smooth scroll for in-page links */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
