function hideSelf() {
  document.body.addEventListener("click", (e) => {
    let btn = e.target.closest(".hide-self-button");
    if (btn) {
      btn.hidden = true;
    }
  });
}
