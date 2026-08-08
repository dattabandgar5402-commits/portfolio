

document.addEventListener('DOMContentLoaded', function () {

  
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.textContent = isOpen ? '✕' : '☰';
    });

    
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      });
    });

    
    document.addEventListener('click', function (e) {
      const clickedInside = navLinks.contains(e.target) || hamburger.contains(e.target);
      if (!clickedInside && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  }

  
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function highlightActiveLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120; 

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); 

  
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

     
      showFormStatus('Thanks, ' + name + '! Your message has been noted.', 'success');
      contactForm.reset();
    });
  }

  function showFormStatus(text, type) {
    let statusEl = document.getElementById('form-status');

    if (!statusEl) {
      statusEl = document.createElement('p');
      statusEl.id = 'form-status';
      statusEl.style.marginTop = '12px';
      statusEl.style.fontWeight = '600';
      contactForm.appendChild(statusEl);
    }

    statusEl.textContent = text;
    statusEl.style.color = type === 'error' ? '#e63946' : '#2a9d8f';
  }

  /* ---------- 6. Footer Year (optional auto-update) ---------- */
  const yearSpan = document.querySelector('footer p');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace(/©\s*\d{4}/, '© ' + currentYear);
  }

});