const searchInput = document.querySelector('.search__input-value');
const searchProducts = document.querySelector('.search__products');
const productsList = document.querySelector('.list-products');
const salesList = document.querySelector('.sales-list');
const salesSumValue = document.querySelector('.component__title-value');
const messageNoTovar = document.querySelector(".sales__not");

let productsListItems = document.getElementsByClassName('list-products__item');
let salesListItems = document.getElementsByClassName("sales-list__item");
let indicators = document.getElementsByClassName('sales-list__indicator-span');
let plusSalesList = document.getElementsByClassName('sales-list__plus');
let minusSalesList = document.getElementsByClassName('sales-list__minus');

let productsListStr = ``;
let salesListStr = ``;

let sales = new Map();


function loadProductsList() {
    for (let product of products) {
        productsListStr += `<li class="list-products__item">
        <h2 class="list-products__title">${product.name}</h2>
         <div class="list-products__text">
            <span class="list-products__text-code">${product.id}</span> · <span ${product.quantityInStock.replace(/[^0-9]/g, "") === "0" ?
                "class='list-products__text-quantityInStoc_no'>  Нет " : "class='list-products__text-quantityInStoc'>" + product.quantityInStock} на складе</span>
         </div>
     </li>`;
    }
    productsList.innerHTML = productsListStr;
    productsListStr = ``;
    addProductsListEvent();

}

function loadsalesList() {
    let i = 0;
    for (let product of sales) {
        salesListStr += `<li class="sales-list__item">
                        <div class="sales-list__indicator">
                            <span class="sales-list__indicator-span"> </span>
                        </div>
                        <div class="sales-list__text">
                            <h2 class="sales-list__title">${product[0].name}</h2>
                            <div class="sales-list__code">${product[0].id}</div>
                        </div>
                        <div class="sales-list__quantity-change">
                            <span class="sales-list__minus">−</span>
                            <span class="sales-list__value"> ${product[1]} </span>
                            <span class="sales-list__plus">+</span>
                        </div>
                        <div class="sales-list__sum">
                            <span class="sales-list__price"> ${product[0].price} ₽</span> *
                            <span class="sales-list__quantity"> ${product[1]}</span> =
                            <span class="sales-list__sum-value"> ${product[0].price * product[1]} ₽ </span>
                        </div>
                    </li>`;
    }

    salesList.innerHTML = salesListStr;
    salesListStr = "";
    changeIndicator();
    checkSalesList();
}

loadProductsList();
addProductsListEvent();
loadsalesList();
addSalesListEvent();

function addProductsListEvent() {
    for (let product = 0; product < productsListItems.length; product++) {
        productsListItems[product].addEventListener('click', () => {
            sales.set(products[product], 0);
            loadsalesList();
            hiddenProductsList();
            addSalesListEvent();
        })
    }
}

searchInput.onfocus = function () {
    searchProducts.classList.add("active");
}

function hiddenProductsList() {
    searchProducts.classList.remove("active");
}

window.addEventListener('click', e => {
    if (!searchProducts.hidden) {
        const target = e.target
        if (!target.closest('.search__products') && !target.closest('.search__input')) {
            hiddenProductsList();
        }
    }
})

function changeIndicator() {
    let i = 0;
    for (let product of sales) {
        let percentSaleProduct = (product[1] * 100) / product[0].quantityInStock.replace(/[^0-9]/g, "");
        if (percentSaleProduct >= 100) {
            indicators[i].style.removeProperty("background");
            indicators[i].classList.add('done');
        } else {
            indicators[i].classList.remove('done');
            let valueIndicator = (360 * percentSaleProduct) / 100 - 89;
            percentSaleProduct <= 50 ?
                indicators[i].style.backgroundImage = `linear-gradient(${valueIndicator}deg, #ddd 50%, transparent 50%), linear-gradient(91deg, #ddd 50%, steelblue 50%)` :
                indicators[i].style.backgroundImage = `linear-gradient(${valueIndicator}deg, transparent 50%, steelblue 50%), linear-gradient(90deg, #ddd 50%, steelblue 50%)`;
        }
        i++;
    }
}

function changeSalesSumValue() {
    let sum = 0;
    for (let product of sales) {
        sum += product[0].price * product[1];
    }
    salesSumValue.innerHTML = sum;

}

function changeQuantitySold(indexElem, operator) {
    let product = Array.from(sales)[indexElem][0];
    let count = sales.get(product);
    operator === "+" ? count++ : count--;

    if ((count - 1 < product.quantityInStock.replace(/[^0-9]/g, "")) && (count + 1 > 0)) {
        sales.set(product, count);

        salesListItems[indexElem].querySelector('.sales-list__value').innerHTML = count;
        salesListItems[indexElem].querySelector('.sales-list__quantity').innerHTML = count;
        salesListItems[indexElem].querySelector('.sales-list__sum-value').innerHTML = product.price * count + " ₽";

        changeIndicator();
        changeSalesSumValue();
    }
}

function addSalesListEvent() {
    for (let i = 0; i < plusSalesList.length; i++) {
        plusSalesList[i].addEventListener("click", () => changeQuantitySold(i, "+"));
        minusSalesList[i].addEventListener("click", () => changeQuantitySold(i, "-"));
    }
}

function checkSalesList() {
    if (sales.size === 0) {
        messageNoTovar.style.display = "flex";
    } else {
        messageNoTovar.style.display = "none";
    }
}

