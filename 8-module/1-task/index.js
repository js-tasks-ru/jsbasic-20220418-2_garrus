import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetHeight !== 0 && document.documentElement.clientWidth > 767) {

      if (!this.initialTopCart) {
        this.initialTopCart = this.elem.getBoundingClientRect().top + window.pageYOffset;
      }

      if (window.pageYOffset > this.initialTopCart) {
        const container = document.querySelector(".container");

        let elemLeft1 = container.getBoundingClientRect().right + 20;
        let elemLeft2 = document.documentElement.clientWidth - this.elem.offsetWidth - 10;

        let newLeft = elemLeft1 < elemLeft2 ? elemLeft1 : elemLeft2;

        Object.assign(this.elem.style, {
          position: "fixed",
          left: `${newLeft}px`,
          right: `10px`,
          top: "50px",
          zIndex: 10,
        });

      } else {
        Object.assign(this.elem.style, {
          position: "absolute",
          left: "",
          right: "",
          top: "",
        });
      }
    }
  }
}
