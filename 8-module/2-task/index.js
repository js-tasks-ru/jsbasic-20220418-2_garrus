import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.createProductGrid(this.products);
  }

  createProductGrid(products) {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          ${products.map(card => this.createCards(card)).join("")}
        </div>
      </div>
    `);
  }

  createCards(card) {
    const cardHTML = new ProductCard(card);
    return cardHTML.elem.outerHTML;
  }

  updateFilter(filters) {
    this.filters = filters;
    this.products = this.products.filter(card => this.filterCards(card));
    this.render();
  }

  filterCards(card) {


    if (this.filters.hasOwnProperty('noNuts')) {
      if (card.nuts === this.filters.noNuts) {
        return false;
      }
    }

    if (this.filters.hasOwnProperty('vegeterianOnly')) {
      if (card.vegeterian !== this.filters.vegeterianOnly) {
        return false;
      }
    }

    if (card.hasOwnProperty('spiciness') && this.filters.hasOwnProperty('maxSpiciness')) {
      if (card.spiciness > this.filters.maxSpiciness) {
        return false;
      }
    }

    if (card.hasOwnProperty('category') && this.filters.hasOwnProperty('category')) {
      if (card.category !== this.filters.category) {
        return false;
      }
    }

    return true;
  }
}
