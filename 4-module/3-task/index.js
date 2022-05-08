function highlight(table) {
  function checkStatus(row) {
    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available");
    } else if (row.cells[3].dataset.available === "false") {
      row.classList.add("unavailable");
    } else {
      row.setAttribute("hidden", "true");
    }
  }

  function checkMale (row) {
    row.cells[2].innerHTML === "m" ? 
      row.classList.add("male") : 
      row.classList.add("female");
  }

  function checkAge(row) {
    if (parseInt(row.cells[1].innerHTML) < 18) {
      row.style = "text-decoration: line-through";
    }
  }

  Array.from(table.rows).forEach( row => {
    checkStatus(row);
    checkMale(row);
    checkAge(row);
  });
}
