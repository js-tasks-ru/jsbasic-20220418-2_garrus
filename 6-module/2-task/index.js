import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  get elem(){
    return this._elem
  }

  createCard (product) {
    let card = createElement(`
      <div class="card">
          <div class="card__top">
              <img src="../../assets/images/products/${product.image}" class="card__image" alt="product">
              <span class="card__price">€${product.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
              <div class="card__title">${product.name}</div>
              <button type="button" class="card__button">
                  <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
      </div>
    `);
    
    let btn = card.querySelector(".card__button");
    this.addCard(btn,this.product.id)
    this._elem = card;
  }

  addCard(btn,id) {
    btn.addEventListener("click", (e) => {
      
      let productEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });

      btn.dispatchEvent(productEvent);
    });
  }

  constructor(product) {
    this.product = product;
    this.createCard(product);
  }
}