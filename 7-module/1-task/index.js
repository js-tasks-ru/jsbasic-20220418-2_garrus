import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render(this.categories);
  }

  get elem() {
    return this._elem;
  }

  render(categories) {
    let categoriesHTML = this.createContainer(categories);
    this.initScrolling(categoriesHTML);
    this.initCurrentCategory(categoriesHTML);
    this._elem = categoriesHTML;
  }

  createContainer(categories) {
    return createElement(`
      <div class="ribbon">

        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${categories.map(item => this.createCategory(item)).join("")}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  createCategory(category){
    let categoryHTML = createElement(`
      <a href="#" class="ribbon__item ${category.id === "" ? "ribbon__item_active" : ""}"
                  data-id=${category.id}>${category.name}</a>
    `)
    return categoryHTML.outerHTML;
  }

  initScrolling(container) {
    const leftBtn = container.querySelector(".ribbon__arrow_left"),
          rightBtn = container.querySelector(".ribbon__arrow_right"),
          ribbonInner = container.querySelector(".ribbon__inner");

    leftBtn.addEventListener("click",() => ribbonInner.scrollBy(-350, 0));
    rightBtn.addEventListener("click",() => ribbonInner.scrollBy(350, 0));

    ribbonInner.addEventListener("scroll", () => {
      const scrollWidth = ribbonInner.scrollWidth,
          scrollLeft = ribbonInner.scrollLeft,
          clientWidth = ribbonInner.clientWidth,
          scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft >= 0 && scrollLeft <1) {
        leftBtn.classList.remove("ribbon__arrow_visible");
      } else if (scrollRight >= 0 && scrollRight <1) {
        rightBtn.classList.remove("ribbon__arrow_visible");
      }

      if (scrollLeft >=1) leftBtn.classList.add("ribbon__arrow_visible");
      if (scrollRight >=1) rightBtn.classList.add("ribbon__arrow_visible");

    })
  }

  initCurrentCategory (container) {
    const links = container.querySelectorAll(".ribbon__item");

    console.log(container)

    container.addEventListener('click', (e) => {
      console.log("container")
      let target = e.target.closest(".ribbon__item");
      if (!target) return

      e.preventDefault();

      links.forEach(item => {
        if (item.classList.contains("ribbon__item_active")) {
          item.classList.remove("ribbon__item_active");
        }
      });

      target.classList.add("ribbon__item_active");

      this.dispatchEvent(container,target);
    });
  }

  dispatchEvent(container,target) {
    container.dispatchEvent(new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
      detail: target.dataset.id, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    }))
  }
}
