import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.createCarousel(slides);
  }

  get elem() {
    return this._elem;
  }

  createCarousel(slides) {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${slides.map(slide => this.createSlide(slide)).join("")}
        </div>
      </div>
    `);

    const carouselSlides = carousel.querySelectorAll('.carousel__slide');

    this.initBtns(carouselSlides)
    this.initCarousel(carousel);
    this._elem = carousel;
  }

  createSlide (slide) {
    const slideHTML = createElement(`
        <div class="carousel__slide" data-id="penang-shrimp">
          <img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button" data-id = ${slide.id}>
              <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      return slideHTML.outerHTML;
  }

  initCarousel(carousel) {
    let currentSlide = 0;
    const next = carousel.querySelector(".carousel__arrow_right"),
        prev = carousel.querySelector(".carousel__arrow_left"),
        inner = carousel.querySelector(".carousel__inner");

    const totalSlides = carousel.querySelectorAll(".carousel__slide").length;
    prev.style.display = "none";

    carousel.addEventListener("click", (e) => {

      let isNextBtn = !!e.target.closest(".carousel__arrow_right");
      let isPrevBtn = !!e.target.closest(".carousel__arrow_left");

      if (!isNextBtn && !isPrevBtn) return;

      const slideWidth = carousel.offsetWidth;

      if (isNextBtn && currentSlide !== totalSlides-1) {
        currentSlide === totalSlides-2 ? next.style.display = "none" : prev.style.display = "";

        currentSlide++;
        inner.style.transform = `translateX(-${slideWidth*currentSlide}px)`;
      } else if (isPrevBtn && currentSlide !== 0) {
        currentSlide === 1 ? prev.style.display = "none" : next.style.display = "";

        currentSlide--;
        inner.style.transform = `translateX(-${slideWidth*currentSlide}px)`;
      }
    });
  }

  initBtns(slidesHTML) {

    slidesHTML.forEach((slide) => {
      const btn = slide.querySelector('.carousel__button');

      btn.addEventListener("click", () => {
        let event = new CustomEvent("product-add", {
          detail: btn.dataset.id,
          bubbles: true
        });
        btn.dispatchEvent(event);
      });
    });

  }
}
