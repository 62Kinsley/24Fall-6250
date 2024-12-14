function render(state, appEl){
    const products = renderProducts(state);
    const cart = renderCart(state);
    appEl.innerHTML = `
        ${products}
        ${cart}
    `;
}

function renderProducts(state){
    let productListHTML = `<ul class="product">`;
    for( const[productName, details] of Object.entries(state.products)){
        productListHTML += `
            <li>
                <img class= "product-image" src="${details.url}" alt="${productName}">
                <span class= "product-name">${productName}</span>
                <span class= "product-price">${details.price}</span>
                <button class="add-to-cart" type="button">Add to Cart</button>
            </li>
        `;
    }
    return productListHTML+`</ul>`;
}


function renderCart(state) {
    let totalCount  = 0;
    for(const[productName, details] of Object.entries(state.products)) totalCount += details.count;
    if(state.cartShown && totalCount > 0){
        let productListHTML = `
            <button class="view" type="button">Hide Cart</button>
            <ul class="cart">
        `;
        for(const[productName, details] of Object.entries(state.products)){
            if(details.count > 0){
                productListHTML += `
                  <li>
                        <img class= "cart-image" src="${details.url}" alt="${productName}">
                        <span class= "product-name">${productName}</span> 
                        <input type="number" name="quantity" min="0" value="${details.count}">
                        <span class="total-price">$${(details.price * details.count).toFixed(2)}</span>
                        <button class="remove-from-cart">Remove</button>
                    </li>
                `;
            }
        }
        let totalCost = 0;
        for(const[productName, details] of Object.entries(state.products)) totalCost += details.price * details.count;
        return productListHTML + `
                </ul>
                <p>Total: $${totalCost.toFixed(2)}</p>
                <button class="check-out-button" type="button">Checkout</button>
        
        `;
    }
    else if(state.cartShown){
        return`
            <button class="view" type="button">Hide Cart</button> 
            <p>Nothing in the cart</p>
        `;
    }
    else{
        if (totalCount > 0) {
            return `<button class="view" type="button">View Cart (${totalCount})</button>`;
        }
        else {
            return `<button class="view" type="button">View Cart</button>`;
        }
    }
        
}



export default render;






