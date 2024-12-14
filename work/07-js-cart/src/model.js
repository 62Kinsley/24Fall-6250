const state ={
    products:{
       'Jorts':{ id: '1', price: 0.99 , url: 'http://placehold.co/100x100?text=Jorts', count:0},
       'Jean': { id: '2',  price: 3.14, url: 'http://placehold.co/100x100?text=Jean', count:0 },
       'Nyancat':{ id: '3',  price: 2.73, url: 'http://placehold.co/100x100?text=Nyancat', count:0 }
    
    },
    cart: {}, 
    cartShown:false
} ;

export function addToCart(productName) {
   state.products[productName].count++
}

export function updateCount(productName, count) {
    state.products[productName].count = count;
    
}

export function removeFromCart(productName) {
    if (state.products[productName].count > 0) {
        state.products[productName].count = 0;
    }
}

export function checkout(){
    for(let productName in state.products) state.products[productName].count = 0;
    toggleCart();
}

export function toggleCart() {
    state.cartShown = !state.cartShown;
}

export default state;