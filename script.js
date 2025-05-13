/* JavaScript for mobile menu toggle */
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }
  
  // Add intersection observer for section animations
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Force mobile responsive view (meta viewport is already set in HTML)
function checkMobileView() {
  // Add any additional mobile-specific adjustments here if needed
  if (window.innerWidth <= 480) {
    // Adjust for smallest screens
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (e.currentTarget === e.target) {
          this.classList.toggle('active');
        }
      });
    });
  }
}

window.addEventListener('resize', checkMobileView);
window.addEventListener('load', checkMobileView);

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