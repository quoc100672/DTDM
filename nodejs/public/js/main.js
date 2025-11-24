document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Add product
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(productForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                productList.insertAdjacentHTML('beforeend', `<li>${result.name} - ${result.price}</li>`);
                productForm.reset();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Search products
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        try {
            const response = await fetch(`/api/products/search?query=${query}`);
            const products = await response.json();
            productList.innerHTML = '';
            products.forEach(product => {
                productList.insertAdjacentHTML('beforeend', `<li>${product.name} - ${product.price}</li>`);
            });
        } catch (error) {
            console.error('Error searching products:', error);
        }
    });
});