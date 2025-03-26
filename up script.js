// Load products from API
function loadProducts() {
    fetch('api/products.php')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.querySelector('.product-grid');
            productGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = createProductCard(product);
                productGrid.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image_url || 'https://images.unsplash.com/photo-1565791380713-1756b9a05343'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">KSh ${parseFloat(product.price).toLocaleString()}</p>
        <button class="add-to-cart" data-id="${product.id}" data-price="${product.price}">Add to Cart</button>
    `;
    
    return card;
}

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Handle add to cart clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            const price = e.target.getAttribute('data-price');
            addToCart(productId, price);
        }
    });
});