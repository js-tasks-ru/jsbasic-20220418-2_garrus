let calculator = {
  read(a,b) {
    this.a = a;
    this.b = b;
  },
  sum() {
    if (this.a === undefined || this.b === undefined) return null;
    return this.a + this.b;
  },
  mul() {
    if (this.a === undefined || this.b === undefined) return null;
    return this.a * this.b;
  }

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
