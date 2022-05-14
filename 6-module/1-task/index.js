export default class UserTable {
  get elem ()  {
    return this._elem;
  }

  createCellBtn(rowHTML){
    let cellBtn = document.createElement("td");

    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.addEventListener("click", () => rowHTML.remove());

    cellBtn.append(btn);
    return cellBtn;
  }

  createRow(rowData){
    let rowHTML = document.createElement("tr");

    for (let value of Object.values(rowData)) {
      rowHTML.innerHTML += `<td>${value}</td>`;
    }

    rowHTML.append(this.createCellBtn(rowHTML));
    return rowHTML;
  }

  createTable (rows) {
    let table = document.createElement("table");
    table.innerHTML=`
    <thead>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
    </thead>`;
    let tbody = table.createTBody();

    rows.forEach( row => {
      let rowHTML = this.createRow(row);
      tbody.append(rowHTML);
    });

    this._elem = table;
  }

  constructor(rows) {
    this.rows = rows;
    this.createTable(rows);
  }
}
