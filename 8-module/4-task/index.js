import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (typeof cartItem === "object" && this.cartItems.length > 0) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    let totalCount = cartItem.count + amount;

    if (totalCount <= 0) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    } else {
      cartItem.count = totalCount;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((prev, current) => prev + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((prev, current) => prev + current.product.price * current.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modalBody = createElement(`
      <div>
        ${this.cartItems
          .map(cart => this.renderProduct(cart.product, cart.count).outerHTML)
          .join("")
          }
        ${this.renderOrderForm().outerHTML}
      </div>
    `);

    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal.setBody(modalBody);
    this.initProductBtns(this.modal.elem);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    if (cartItem && document.body.classList.contains("is-modal-open")) {
      const currentCart = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}]`)
      const currentCount = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}] .cart-counter__count`);
      const currentPrice = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}] .cart-product__price`);
      const infoPrice = this.modal.elem.querySelector(".cart-buttons__info-price");

      if (this.cartItems.length === 0) {
        this.modal.close();
      } else if (!this.cartItems.includes(cartItem)) {
        currentCart.remove();
      } else {
        let newPrice = (+cartItem.product.price * +cartItem.count).toFixed(2);
        currentCount.innerHTML = cartItem.count;
        currentPrice.innerHTML = `€${newPrice}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event, form) {
    const submitBtn = this.modal.elem.querySelector(".cart-buttons__button");
    submitBtn.classList.add("is-loading");

    try {
      await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(form)
      });

      this.modal.setTitle('Success!');
      this.cartItems.length = 0;
      this.modal.setBody(this.setBodySuccess());
      this.onProductUpdate();

    } catch (err) {
      console.log(err);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  initProductBtns (modalContainer) {
    const cartForm = modalContainer.querySelector('.cart-form');

    cartForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit(e, cartForm);
    });

    modalContainer.addEventListener("click", (e) => {
      const targetBtn = e.target.closest(".cart-counter__button");

      if (!targetBtn) {
        return;
      }

      let targetCart = e.target.closest(".cart-product");
      let targetId = targetCart.dataset.productId

      if (targetBtn.classList.contains("cart-counter__button_plus")) {
        this.updateProductCount(targetId, 1);
      } else {
        this.updateProductCount(targetId, -1);
      }
    })
  }

  setBodySuccess () {
    return createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `)
  }
}

