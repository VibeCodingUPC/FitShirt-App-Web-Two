import {reactive, watch} from 'vue';

const cart = reactive(JSON.parse(localStorage.getItem('cart')) || [] );

watch(cart, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
}, {deep: true});

const addToCart = (item) => {
    cart.push(item);
};

const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart.splice(0, cart.length, ...savedCart);
    }
};

const removeFromCart = (postId, sizeId) => {
    const index = cart.findIndex(item => item.postId === postId && item.sizeId === sizeId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
};

const clearCart = () => {
    cart.splice(0, cart.length);
}

export const useCart = () => {
    return {
        cart,
        addToCart,
        removeFromCart,
        loadCart,
        clearCart,
    };
};