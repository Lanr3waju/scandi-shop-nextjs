export default function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  }
}
