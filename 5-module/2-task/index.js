function toggleText() {
  let text = document.getElementById("text");

  document.body.addEventListener("click", (e) => {
    let btn = e.target.closest(".toggle-text-button");
    
    if (btn) {
      if (text.hasAttribute("hidden")) {
        text.hidden = false;
      } else{
        text.hidden = true;
      }
    }
  });
}