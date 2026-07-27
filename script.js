(() => {
  const menuButton = document.getElementById('menuButton');
  const mainNav = document.getElementById('mainNav');

  if (menuButton && mainNav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mainNav.classList.toggle('is-open', !open);
    });

    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const page = document.body.dataset.page;
  if (page) {
    const currentLink = document.querySelector(`[data-nav="${page}"]`);
    if (currentLink) currentLink.setAttribute('aria-current', 'page');
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && motionAllowed) {
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach((element) => observer.observe(element));
    window.setTimeout(() => reveals.forEach((element) => element.classList.add('is-visible')), 1600);
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }
})();
