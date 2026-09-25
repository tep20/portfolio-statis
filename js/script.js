'use strict';

// ===== SIDEBAR TOGGLE =====
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn) {
  sidebarBtn.addEventListener('click', function () {
    sidebar.classList.toggle('active');
    const span = this.querySelector('span');
    const icon = this.querySelector('ion-icon');
    if (sidebar.classList.contains('active')) {
      span.textContent = 'Hide Contacts';
      icon.setAttribute('name', 'chevron-up');
    } else {
      span.textContent = 'Show Contacts';
      icon.setAttribute('name', 'chevron-down');
    }
  });
}

// ===== PAGE NAVIGATION =====
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(link => {
  link.addEventListener('click', function () {
    const targetPage = this.dataset.page;

    // Update active nav link
    navigationLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Show target page, hide others
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    window.scrollTo(0, 0);
  });
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterSelect = document.querySelector('[data-select]');
const selectValue = document.querySelector('[data-select-value]');
const selectItems = document.querySelectorAll('[data-select-item]');
const projectItems = document.querySelectorAll('.project-item');

function filterProjects(category) {
  projectItems.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.classList.add('active');
      item.style.display = 'block';
    } else {
      item.classList.remove('active');
      item.style.display = 'none';
    }
  });
}

// Desktop filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const category = this.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    if (selectValue) selectValue.textContent = this.textContent;
    filterProjects(category);
  });
});

// Mobile select dropdown
if (filterSelect) {
  filterSelect.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}

selectItems.forEach(item => {
  item.addEventListener('click', function () {
    const category = this.dataset.filter;
    const text = this.textContent;

    if (selectValue) selectValue.textContent = text;
    if (filterSelect) filterSelect.classList.remove('active');

    // Sync desktop buttons
    filterBtns.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    filterProjects(category);
  });
});

// Close select when clicking outside
document.addEventListener('click', function (e) {
  if (filterSelect && !filterSelect.contains(e.target) && !e.target.closest('.select-list')) {
    filterSelect.classList.remove('active');
  }
});

// ===== CONTACT FORM VALIDATION =====
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

function validateForm() {
  if (!form) return;
  formBtn.disabled = !form.checkValidity();
}

formInputs.forEach(input => {
  input.addEventListener('input', validateForm);
});

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulasi kirim pesan (tanpa backend)
    const name = form.querySelector('[name="fullname"]').value;
    alert(`Terima kasih, ${name}! Pesan kamu berhasil dikirim ke Tito.`);

    form.reset();
    formBtn.disabled = true;
  });
}

// Init
validateForm();
filterProjects('all');