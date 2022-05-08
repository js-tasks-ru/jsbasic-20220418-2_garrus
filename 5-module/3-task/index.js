function initCarousel() {
  let currentSlide = 0;
  let next = document.querySelector(".carousel__arrow_right"),
      prev = document.querySelector(".carousel__arrow_left"),
      carousel = document.querySelector(".carousel");

  let totalSlides = document.body.querySelectorAll(".carousel__slide").length,
      slideWidth = document.body.querySelector(".carousel__slide").offsetWidth,
      inner = document.body.querySelector(".carousel__inner");

  prev.style.display = "none";
  
  carousel.addEventListener("click", (e) => {
    
    let isNextBtn = !!e.target.closest(".carousel__arrow_right");
    let isPrevBtn = !!e.target.closest(".carousel__arrow_left");

    if (!isNextBtn && !isPrevBtn) return;

    if (isNextBtn && currentSlide !== totalSlides-1) {
      currentSlide === totalSlides-2 ? next.style.display = "none" : prev.style.display = "";

      currentSlide++;
      inner.style.transform = `translateX(-${slideWidth*currentSlide}px)`;
    } else if (isPrevBtn && currentSlide !== 0) {
      currentSlide === 1 ? prev.style.display = "none" : next.style.display = "";

      currentSlide--;
      inner.style.transform = `translateX(-${slideWidth*currentSlide}px)`;
    }
  })
}
