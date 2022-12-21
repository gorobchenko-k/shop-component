const formButton = document.querySelector('.form__button');
const units = {
    pieces: "шт.",
    kilogram: "кг",
    liters: "л"
}

formButton.addEventListener("click", () => {
    const code = document.querySelector('.form__code');
    const name = document.querySelector('.form__name');
    const price = document.querySelector('.form__price');
    const quantity = document.querySelector('.form__quantity-num');
    const unit = document.querySelector('.form__quantity-select');

    if (checkValue(code) && checkValue(name) && checkValue(price) && checkValue(quantity)) {
        addProduct(code.value, name.value, price.value, quantity.value + " " + units[unit.value]);
        loadProductsList(products);
        document.querySelector('#popup').classList.remove('open');
        bodyUnlock();
    } else {
        checkValue(code); checkValue(name);
        checkValue(price); checkValue(quantity);
    }
});

function addProduct(code, name, price, quantity) {
    let product = {
        id: code,
        name: name,
        price: price,
        quantityInStock: quantity
    };
    products.push(product);
}

function checkValue(item) {
    if (item.value === '') {
        item.style.border = '#e22a2a solid 2px';
        return false;
    } else {
        item.style.border = '#c0c0c0 solid 1px';
        return true;
    }
}
