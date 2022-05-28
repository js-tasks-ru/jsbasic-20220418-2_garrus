import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.createProductGrid(this.filteredProducts);
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
    this.filters = {...this.filters, ...filters};
    this.filteredProducts = this.products.filter(card => this.filterCards(card));
    this.updateInner();
  }

  updateInner () {
    this.elem.innerHTML = createElement(`
      <div class="products-grid__inner">
          ${this.filteredProducts.map(card => this.createCards(card)).join("")}
      </div>
    `).outerHTML;
  }


  filterCards(card) {
    if (this.filters["noNuts"]) {
      if (card.nuts) {
        return false;
      }
    }

    if (this.filters['vegeterianOnly']) {
      if (!card.vegeterian) {
        return false;
      }
    }

    if (this.filters["maxSpiciness"]) {
      if (card.spiciness > this.filters.maxSpiciness) {
        return false;
      }
    }

    if (this.filters["category"]) {
      if (card.category !== this.filters.category) {
        return false;
      }
    }

    return true;
  }
}
