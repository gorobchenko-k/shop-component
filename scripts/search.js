searchInput.oninput = function () {
    let searchReg = new RegExp(`${searchInput.value}`, 'i');
    let searchProducts = products.filter((item) => searchReg.test(item.name) || searchReg.test(item.id) );
    loadProductsList(searchProducts);
}
