import  state, { addToCart, updateCount, removeFromCart,checkout, toggleCart } from './model';
import render from './render';

const appEl = document.querySelector('#app');
render(state, appEl);

appEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        addToCart(e.target.closest('li').querySelector('.product-name').textContent);
        render(state, appEl);
    }
    if (e.target.classList.contains('view')) {
        toggleCart();
        render(state, appEl);
    }
    if (e.target.classList.contains('remove-from-cart')) {
        const productName = e.target.closest('li').querySelector('.product-name').textContent;
        removeFromCart(productName);
        render(state, appEl);
    }
    if (e.target.classList.contains('check-out-button')) {
        checkout();
        render(state, appEl);
    }
})

appEl.addEventListener('input', (e) => {
    updateCount(e.target.closest('li').querySelector('.product-name').textContent, e.target.value);
    render(state, appEl);
})