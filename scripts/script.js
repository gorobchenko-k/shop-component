const searchInput = document.querySelector('.search__input-value');
const searchProducts = document.querySelector('.search__products');
const productsList = document.querySelector('.list-products'); //ul
const salesList = document.querySelector('.sales-list'); //ul 

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
        quantityInStock: "1500 шт."
    },
    {
        id: "UPC-0456К12",
        name: "Двухсекционная прижимная пневмобалкастанка HOMMEL L32",
        price: 25,
        quantityInStock: "1500 шт."
    },
    {
        id: "UPC-0456К13",
        name: "Поддон",
        price: 2,
        quantityInStock: "2 шт."
    }
];

function loadsalesList() {
    //создание строки html-тегов из массива sales для заполнения ul со списком продаваемых товаров 
    for (let product of sales) {
        salesListStr += `<li class="sales-list__item">
                        <div class="sales-list__indicator"></div>
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

    //.replace(/[^0-9]/g, "")  //убрать все не цифры из строки

    //вставка контента 
    salesList.innerHTML = salesListStr;
    salesListStr = "";
}


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





//добавление в массив продаваемых товаров объекта-продукта и количество проданного изначально 0
sales.set(products[0], 0);
// // sales.set(products[1], 10);
// sales.set(products[2], 10);

loadsalesList();



let salesListItems = document.querySelectorAll('.sales-list__item');
console.log(salesListItems);

function increaseQuantitySold() {

}



let productsListItems = document.querySelectorAll('.list-products__item');
console.log(productsListItems);

for (let product = 0; product < productsListItems.length; product++) {
    // console.log(product);
    productsListItems[product].addEventListener('click', () => {
        // clearActiveClasses();
        // slide.classList.add('active');
        sales.set(products[product], 0);
        loadsalesList();
        hiddenProductsList(); 
        console.log("fd - " + product);
    })
}

//при установке курстора в input отображаем скрытый список поиска
searchInput.onfocus = function () {
    searchProducts.hidden = false;
}


function hiddenProductsList() {
    searchProducts.hidden = true;
}

//если курсор убран скрываем список поиска
// searchInput.onblur = function () {
//     searchProducts.hidden = true;
// }

const indicator = document.querySelector('.sales-list__indicator');
let valueIndicator = 120;
valueIndicator <= 50 ? 
    indicator.style.background=`linear-gradient(${valueIndicator}deg, #ddd 50%, transparent 50%), linear-gradient(90deg, #ddd 50%, steelblue 50%)` :
    indicator.style.background=`linear-gradient(${valueIndicator}deg, transparent 50%, steelblue 50%), linear-gradient(90deg, #ddd 50%, steelblue 50%)`;
