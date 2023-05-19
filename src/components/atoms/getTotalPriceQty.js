function createTotalPriceAndQty(cart, currency) {
    const arraySum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

    let totalPrice = [];
    let totalQuantity = [];

    cart.forEach((item) => {
        const cartPrice = item.prices.find((price) => price.currency.symbol === currency);
        totalPrice = [...totalPrice, cartPrice.amount * item.quantity];
        totalQuantity = [...totalQuantity, item.quantity];
    });

    return { totalPrice: arraySum(totalPrice), totalQuantity: arraySum(totalQuantity) };
}

export default createTotalPriceAndQty;
