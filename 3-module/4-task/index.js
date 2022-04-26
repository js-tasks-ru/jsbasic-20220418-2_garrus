function showSalary(users, age) {
  let result = users.reduce( (prevItem,currentItem) => {
    if (currentItem.age <= age) {
      return prevItem + `${currentItem.name}, ${currentItem.balance}\n`;
    } else {
      return prevItem;
    }
  },"").slice(0,-1);
  
  return result;
}
