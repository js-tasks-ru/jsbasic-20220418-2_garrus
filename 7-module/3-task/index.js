import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
  }

  get elem () {
    return this._elem;
  }

  #render() {
    const Slider = this.#createSlider();
    this.$initSlider(Slider);
    this._elem = Slider;
  }

  #createSlider = () => {
    return createElement(`
    <div class="slider">

      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps">
        ${this.#createSteps()}
      </div>
    </div>
    `);
  }

  #createSteps = () => {
    let steps = "";
    for (let i = 0; i < this.steps; i++) {
      steps += `<span class = "${this.value === i ? "slider__step-active" : ""}"></span>`;
    }
    return steps;
  }

  $initSlider = (container) => {
    const spans = container.querySelectorAll("span");
    const thumb = container.querySelector(".slider__thumb");
    const progress = container.querySelector(".slider__progress");

    container.addEventListener("click", (e) => {
      let width = container.offsetWidth;
      let x = e.pageX - container.getBoundingClientRect().x;

      const currentStep = Math.round((x * (this.steps - 1)) / width);
      this.value = currentStep;


      thumb.style.left = ((currentStep) / (this.steps - 1)) * 100 + "%";
      progress.style.width = ((currentStep) / (this.steps - 1)) * 100 + "%";

      this.#setCurrentStep(spans);
      this.#dispatchEvent(container);
    });
  }

  #dispatchEvent = (container) => {
    container.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  #setCurrentStep = (spans) => {
    spans.forEach((span, index) => {
      if (span.classList.contains("slider__step-active")) {
        span.classList.remove("slider__step-active");
      }
      if (index === this.value + 1) {
        span.classList.add("slider__step-active");
      }
    });
  }
}
