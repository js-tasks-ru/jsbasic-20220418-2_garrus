import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.nutsCheckbox = document.getElementById('nuts-checkbox');
    this.vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    this.Carousel = new Carousel(slides);
    this.RibbonMenu = new RibbonMenu(categories);
    this.StepSlider = new StepSlider({steps: 5, value: 3});
    this.CartIcon = new CartIcon();
    this.Cart = new Cart(this.CartIcon);

    document.body.querySelector("[data-carousel-holder]").append(this.Carousel.elem);
    document.body.querySelector("[data-ribbon-holder]").append(this.RibbonMenu.elem);
    document.body.querySelector("[data-slider-holder]").append(this.StepSlider.elem);
    document.body.querySelector("[data-cart-icon-holder]").append(this.CartIcon.elem);

    this.productContainer = document.body.querySelector("[data-products-grid-holder]");
    await this.fetchProducts();

    this.renderWithFilters({
      noNuts: this.nutsCheckbox.checked,
      vegeterianOnly: this.vegeterianCheckbox.checked,
      maxSpiciness: this.StepSlider.value,
      category: this.RibbonMenu.value
    })

    this.addEventListeners();
  }

  async fetchProducts() {
    try {
      const response = await fetch('products.json');
      this.products = await response.json();
      this.ProductsGrid = new ProductsGrid(Array.from(this.products));
      this.productContainer.append(this.ProductsGrid.elem);
    } catch (err) {
      console.log("Не удалось загрузить");
    }
  }

  addEventListeners () {

    document.body.addEventListener("product-add", (e) => {
      let targetId = e.detail;
      let currentProduct = this.products.find(elem => elem.id === targetId);
      this.Cart.addProduct(currentProduct);
    });

    this.StepSlider.elem.addEventListener("slider-change", (e) => {
      this.renderWithFilters({
        maxSpiciness: e.detail,
      });
    });

    this.RibbonMenu.elem.addEventListener("ribbon-select", (e) => {
      let currentCategory = e.detail;
      this.renderWithFilters({
        category: currentCategory,
      });
    });

    this.nutsCheckbox.addEventListener("change", (e) => {
      this.renderWithFilters({
        noNuts: e.target.checked,
      });
    });

    this.vegeterianCheckbox.addEventListener("change", (e) => {
      this.renderWithFilters({
        vegeterianOnly: e.target.checked,
      });
    });
  }

  renderWithFilters (filters) {
    this.ProductsGrid.updateFilter(filters)
    this.productContainer.innerHTML = `${this.ProductsGrid.elem.outerHTML}`;
  }
}
