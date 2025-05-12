// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll animation for sections
const sections = document.querySelectorAll('.section');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Horizontal scrolling carousel for products
const productsGrid = document.querySelector('.products-grid');
let isDown = false;
let startX;
let scrollLeft;

productsGrid.addEventListener('mousedown', (e) => {
  isDown = true;
  productsGrid.style.cursor = 'grabbing';
  startX = e.pageX - productsGrid.offsetLeft;
  scrollLeft = productsGrid.scrollLeft;
});

productsGrid.addEventListener('mouseleave', () => {
  isDown = false;
  productsGrid.style.cursor = 'grab';
});

productsGrid.addEventListener('mouseup', () => {
  isDown = false;
  productsGrid.style.cursor = 'grab';
});

productsGrid.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - productsGrid.offsetLeft;
  const walk = (x - startX) * 2;
  productsGrid.scrollLeft = scrollLeft - walk;
}); 