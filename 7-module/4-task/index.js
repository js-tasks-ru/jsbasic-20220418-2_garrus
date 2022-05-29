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
    this._elem = this.#createSlider();
    this.$initSlider(this._elem);
  }

  #createSlider = () => {
    return createElement(`
    <div class="slider">

      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
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
    this.spans = container.querySelectorAll("span");
    this.thumb = container.querySelector(".slider__thumb");
    this.progress = container.querySelector(".slider__progress");
    this.valueHTML = container.querySelector(".slider__value");
    this.thumb.style.left = ((this.value) / (this.steps - 1)) * 100 + "%";
    this.progress.style.width = ((this.value) / (this.steps - 1)) * 100 + "%";

    this.thumb.ondragstart = () => false;
    this.thumb.addEventListener("pointerdown", this.#pointerDown);
    document.addEventListener("pointerup", this.#pointerUp);

    container.addEventListener("click", this.#mouseClick);
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
        this.valueHTML.textContent = this.value;
      }
    });
  }

  #pointerDown = (e) => {
    e.preventDefault();
    this._elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#pointerMove);
  }

  #pointerMove = (e) => {
    e.preventDefault();
    let x = e.pageX - this._elem.getBoundingClientRect().x;
    const width = this._elem.offsetWidth;

    if (x < 0) {
      x = 0;
    } else if (x > this._elem.offsetWidth) {
      x = width;
    }

    const xPercent = x / width * 100;
    this.value = Math.round((x * (this.steps - 1)) / width);

    this.thumb.style.left = xPercent + "%";
    this.progress.style.width = xPercent + "%";

    this.#setCurrentStep(this.spans);
  }

  #pointerUp = (e) => {
    this._elem.classList.remove("slider_dragging");

    this.thumb.style.left = ((this.value) / (this.steps - 1)) * 100 + "%";
    this.progress.style.width = ((this.value) / (this.steps - 1)) * 100 + "%";

    document.removeEventListener("pointermove", this.#pointerMove);
    this.#dispatchEvent(this._elem);
  }

  #mouseClick = (e) => {
    let x = e.pageX - this._elem.getBoundingClientRect().x;
    let width = this._elem.offsetWidth;

    const currentStep = Math.round((x * (this.steps - 1)) / width);
    this.value = currentStep;

    this.thumb.style.left = ((currentStep) / (this.steps - 1)) * 100 + "%";
    this.progress.style.width = ((currentStep) / (this.steps - 1)) * 100 + "%";

    this.#setCurrentStep(this.spans);
    this.#dispatchEvent(this._elem);
  }
}
