document.getElementById("year").textContent = new Date().getFullYear();

const links = Array.from(document.querySelectorAll(".nav-btn"));
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach(a => {
    const isMatch = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("is-active", isMatch);
  });
};

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible && visible.target && visible.target.id) {
    setActive(visible.target.id);
  }
}, { threshold: [0.35, 0.5, 0.65] });

sections.forEach(sec => observer.observe(sec));

// --- SNAP SCROLL A LA SECCIÓN MÁS CERCANA ---
let snapTimer = null;
let lastY = window.scrollY;

function snapToClosestSection() {
  const y = window.scrollY;
  const goingDown = y > lastY;
  lastY = y;

  const secs = Array.from(document.querySelectorAll(".screen"));
  if (!secs.length) return;

  // punto de referencia: un poco debajo del top para que sea más natural
  const targetLine = y + window.innerHeight * 0.25;

  let best = secs[0];
  let bestDist = Infinity;

  for (const s of secs) {
    const top = s.offsetTop;
    const dist = Math.abs(top - targetLine);

    if (dist < bestDist) {
      bestDist = dist;
      best = s;
    } else if (dist === bestDist) {
      // si empatan, elegimos según dirección
      if (goingDown && top > best.offsetTop) best = s;
      if (!goingDown && top < best.offsetTop) best = s;
    }
  }

  best.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener(
  "scroll",
  () => {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(snapToClosestSection, 140); // ajustá 100-200
  },
  { passive: true }
);
