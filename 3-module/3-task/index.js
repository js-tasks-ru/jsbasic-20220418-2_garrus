function camelize(str) {

  function updateArr(item,index) {
    if (item.length === 0 && index===0) {
      return item;
    } else if (item.length >= 1 && index===0) {
      return item;
    } else {
      return item[0].toUpperCase() + item.slice(1)
    }
  }

  return str.split('-')
            .map((item,index) => updateArr(item,index))
            .join("");
}
