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
