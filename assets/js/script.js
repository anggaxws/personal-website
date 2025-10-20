'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (modalContainer && modalCloseBtn && overlay && testimonialsItem.length) {
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar && modalImg) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (title && modalTitle) {
        modalTitle.innerHTML = title.innerHTML;
      }

      if (text && modalText) {
        modalText.innerHTML = text.innerHTML;
      }

      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const targetPage = this.dataset.navLink || this.textContent.trim().toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      const pageName = pages[i].dataset.page;

      if (targetPage === pageName) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// certifications slider
const certTrack = document.querySelector("[data-cert-track]");
const certSlides = certTrack ? Array.from(certTrack.children) : [];
const certPrevBtn = document.querySelector("[data-cert-prev]");
const certNextBtn = document.querySelector("[data-cert-next]");

if (certTrack && certSlides.length && certPrevBtn && certNextBtn) {
  let certIndex = 0;
  let slidesToShow = 1;
  let slideWidth = 0;

  const updateCertSlider = () => {
    const sliderViewport = certTrack.parentElement;
    const trackStyles = window.getComputedStyle(certTrack);
    const gap =
      parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
    const viewportWidth = sliderViewport.getBoundingClientRect().width;

    if (window.innerWidth >= 1250) {
      slidesToShow = Math.min(3, certSlides.length);
    } else if (window.innerWidth >= 768) {
      slidesToShow = Math.min(2, certSlides.length);
    } else {
      slidesToShow = 1;
    }

    slideWidth =
      slidesToShow > 0
        ? (viewportWidth - gap * (slidesToShow - 1)) / slidesToShow
        : viewportWidth;

    certSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    const maxIndex = Math.max(0, certSlides.length - slidesToShow);
    if (certIndex > maxIndex) certIndex = maxIndex;

    const offset = certIndex * (slideWidth + gap);
    certTrack.style.transform = `translateX(-${offset}px)`;

    certPrevBtn.disabled = certIndex === 0;
    certNextBtn.disabled = certIndex === maxIndex;
  };

  certPrevBtn.addEventListener("click", () => {
    certIndex = Math.max(0, certIndex - 1);
    updateCertSlider();
  });

  certNextBtn.addEventListener("click", () => {
    const maxIndex = Math.max(0, certSlides.length - slidesToShow);
    certIndex = Math.min(maxIndex, certIndex + 1);
    updateCertSlider();
  });

  window.addEventListener("resize", updateCertSlider);
  updateCertSlider();
}
