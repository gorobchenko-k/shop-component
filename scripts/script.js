const searchInput = document.querySelector('.search__input-value');
const searchProducts = document.querySelector('.search__products'); // .search__products
const productsList = document.querySelector('.list-products'); //ul
const salesList = document.querySelector('.sales-list'); //ul 
const salesSumValue = document.querySelector('.component__title-value');


let productsListItems = document.getElementsByClassName('list-products__item');
let salesListItems = document.getElementsByClassName("sales-list__item"); //document.querySelectorAll('.sales-list__item');
let indicators = document.getElementsByClassName('sales-list__indicator-span');
let plusSalesList = document.getElementsByClassName('sales-list__plus');
let minusSalesList = document.getElementsByClassName('sales-list__minus');

let productsListStr = ``;
let salesListStr = ``;

//создание массива продаваемых товаров
let sales = new Map();

//массив продуктов, которые можно выбрать в поиске
let products = [
    {
        id: "UPC-0456К12",
        name: "Кирпич",
        price: 25,
        quantityInStock: "150 шт."
    },
    {
        id: "UPC-0456К12",
        name: "Двухсекционная прижимная пневмобалкастанка HOMMEL L32",
        price: 2500,
        quantityInStock: "20 шт."
    },
    {
        id: "UPC-0456К13",
        name: "Поддон",
        price: 2,
        quantityInStock: "2 шт."
    }
];

//загрузка списка продуктов в поиск
function loadProductsList() {
    //создание строки html-тегов из массива product для заполнения ul со списком товаров в поиске
    for (let product of products) {
        // console.log(product.name);
        productsListStr += `<li class="list-products__item">
        <h2 class="list-products__title">${product.name}</h2>
         <div class="list-products__text">
            <span class="list-products__text-code">${product.id}</span> · <span
                class="list-products__text-quantityInStoc"> ${product.quantityInStock} на складе</span>
         </div>
     </li>`;
    }
    //вставка контента 
    productsList.innerHTML = productsListStr;
    productsListStr = null;

}

//загрузка списка продуктов в продажах
function loadsalesList() {
    //создание строки html-тегов из массива sales для заполнения ul со списком продаваемых товаров 
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
}

//добавление в массив продаваемых товаров объекта-продукта и количество проданного изначально 0
sales.set(products[0], 0);

// загрузка всех списков при загрузке страницы
loadProductsList();
loadsalesList();
addSalesListEvent();

//каждому продукту в списке поиска присваиваем событие по клику
for (let product = 0; product < productsListItems.length; product++) {
    // console.log(product);
    productsListItems[product].addEventListener('click', () => {
        sales.set(products[product], 0);
        loadsalesList();
        hiddenProductsList();
        addSalesListEvent();
    })
}

//при установке курстора в input отображаем скрытый список поиска
searchInput.onfocus = function () {
    searchProducts.hidden = false;
}

//если курсор убран скрываем список поиска
function hiddenProductsList() {
    searchProducts.hidden = true;
}
//при клике в любои месте окна браузера, но не по списку продуктов или строке поиска, скрывать список продуктов
window.addEventListener('click', e => { // при клике в любом месте окна браузера
    if (!searchProducts.hidden) {
        const target = e.target // находим элемент, на котором был клик
        //  если этот элемент или его родительские элементы не список продуктов и не поле input
        if (!target.closest('.search__products') && !target.closest('.search__input')) {
            hiddenProductsList(); // то закрываем окно навигации, удаляя активный класс
        }
    }
})

//изменение индикатора
function changeIndicator() {
    let i = 0;
    for (let product of sales) {
        let percentSaleProduct = (product[1] * 100) / product[0].quantityInStock.replace(/[^0-9]/g, "");
        if (percentSaleProduct >= 100) {
            indicators[i].style.removeProperty("background");
            // indicators[i].style.background = "none";
            indicators[i].classList.add('done');
            //return; // из-за этого, если после выполненого заказа есть еще продукты у них не происходит обновление
        } else {
            indicators[i].classList.remove('done');
            let valueIndicator = (360 * percentSaleProduct) / 100 - 89;
            percentSaleProduct <= 50 ?
                indicators[i].style.background = `linear-gradient(${valueIndicator}deg, #ddd 50%, transparent 50%), linear-gradient(91deg, #ddd 50%, steelblue 50%)` :
                indicators[i].style.background = `linear-gradient(${valueIndicator}deg, transparent 50%, steelblue 50%), linear-gradient(90deg, #ddd 50%, steelblue 50%)`;
        }
        i++;
    }
}

// изменение общей суммы продаж
function changeSalesSumValue() {
    let sum = 0;
    for (let product of sales) {
        sum += product[0].price * product[1];
    }
    salesSumValue.innerHTML = sum;

}

//изменение количества проданного товара
function changeQuantitySold(indexElem, operator) {
    let product = Array.from(sales)[indexElem][0];
    let count = sales.get(product);
    operator === "+" ? count++ : count--;

    if ((count - 1 < product.quantityInStock.replace(/[^0-9]/g, "")) && (count + 1 > 0)){
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



