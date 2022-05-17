import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.titleHTML = "";
    this.bodyHTML = "";
    this.#render();
  }

  #elem = null

  #render = () => {
    this.#createModal();
    this.#initBtnClose();
  }

  #createModal = () => {
    this.#elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">

            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">${this.titleHTML}</h3>

          </div>

          <div class="modal__body">${this.bodyHTML.outerHTML}</div>
        </div>

      </div>
    `);
  }

  open = () => {
    document.body.append(this.#elem);
    document.body.classList.add("is-modal-open");
    document.addEventListener("keydown", this.#closeESC);
  }

  setTitle = (title) => {
    this.titleHTML = title;
    this.#elem.querySelector(".modal__title").textContent = title;
  }

  setBody = (node) => {
    this.bodyHTML = node;
    this.#elem.querySelector(".modal__body").innerHTML = node.outerHTML;
  }

  close = () => {
    this.#elem.remove();
    document.body.classList.remove("is-modal-open");
    document.removeEventListener('keydown', this.#closeESC);
  }

  #closeESC = (e) => {
    if (e.code === "Escape") {
      this.close();
    }
  }

  #initBtnClose = () => {
    const closeBtn = this.#elem.querySelector(".modal__close");

    closeBtn.addEventListener('click', () => {
      this.close();
    });
  }
}
