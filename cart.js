// Shopping cart
let cart = [];

// Add item to cart
function addToCart(productId, price) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
}

// Update cart counter
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('furniture_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('furniture_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Checkout function
function checkout(customerData) {
    if (cart.length === 0) return;
    
    const orderData = {
        customer: customerData,
        items: cart,
        total_amount: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
    
    fetch('api/orders.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully! Order ID: ' + data.order_id);
            cart = [];
            updateCartCount();
            saveCartToLocalStorage();
        }
    })
    .catch(error => console.error('Error placing order:', error));
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
});