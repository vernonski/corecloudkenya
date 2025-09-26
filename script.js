// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  });
}
// Header hide on scroll
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});
// Card reveal
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));
// About reveal
const aboutElements = document.querySelectorAll('.about-text, .about-image');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
aboutElements.forEach(el => aboutObserver.observe(el));
// Particles.js simulation
function createParticles(canvasId, count = 60) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function initializeParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }
    return particles;
  }
  let particles = initializeParticles();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = '#06FCEB';
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = initializeParticles();
  });
}
// Initialize particles for relevant pages
if (document.getElementById('particles')) createParticles('particles', 60);
if (document.getElementById('contact-particles')) createParticles('contact-particles', 40);
if (document.getElementById('footer-particles')) createParticles('footer-particles', 30);
// Animated Counters with IntersectionObserver
const counters = document.querySelectorAll('.counter');
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 200);
      const updateCount = () => {
        count += increment;
        if (count > target) count = target;
        counter.innerText = count;
        if (count < target) {
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
    heroObserver.unobserve(entries[0].target);
  }
}, { threshold: 0.5 });
if (document.querySelector('.hero-cards')) {
  heroObserver.observe(document.querySelector('.hero-cards'));
}