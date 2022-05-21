export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (typeof cartItem === "object" && this.cartItems.length > 0) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    let totalCount = cartItem.count + amount;

    if (totalCount <= 0) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    } else {
      cartItem.count = totalCount;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((prev, current) => prev + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((prev, current) => prev + current.product.price * current.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

