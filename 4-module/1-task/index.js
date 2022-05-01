function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.forEach(element => {
    ul.innerHTML+= `<li>${element.firstName} ${element.lastName}</li>`;
  });
  return ul;
}
