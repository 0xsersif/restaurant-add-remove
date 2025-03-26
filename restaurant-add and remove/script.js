 // script.js - Main Shopping Cart Logic

class ShoppingCart {
	constructor() {
			this.items = [];
			this.cartItemsContainer = document.getElementById('cart-items');
			this.cartTotalElement = document.getElementById('cart-total');
			this.initEventListeners();
	}

	initEventListeners() {
			// Add to cart buttons
			document.querySelectorAll('.add-to-cart').forEach(button => {
					button.addEventListener('click', (e) => {
							const menuItem = e.target.closest('.menu-item');
							const name = menuItem.dataset.name;
							const price = parseFloat(menuItem.dataset.price);
							this.addItem(name, price);
					});
			});
	}

	addItem(name, price) {
			// Check if item already exists in cart
			const existingItem = this.items.find(item => item.name === name);
			
			if (existingItem) {
					existingItem.quantity++;
			} else {
					this.items.push({
							name,
							price,
							quantity: 1,
							liked: false
					});
			}
			
			this.renderCart();
	}

	renderCart() {
			// Clear existing cart items
			this.cartItemsContainer.innerHTML = '';

			// Render each cart item
			this.items.forEach((item, index) => {
					const cartItemElement = document.createElement('div');
					cartItemElement.classList.add('cart-item');
					cartItemElement.innerHTML = `
							<div>
									<strong>${item.name}</strong>
									<p>${formatPrice(item.price)} each</p>
							</div>
							<div class="quantity-control">
									<button class="decrease-qty" data-index="${index}">-</button>
									<input type="text" value="${item.quantity}" readonly>
									<button class="increase-qty" data-index="${index}">+</button>
							</div>
							<button class="heart-btn ${item.liked ? 'liked' : ''}" data-index="${index}">
									♥
							</button>
							<button class="delete-btn" data-index="${index}">Delete</button>
					`;
					
					this.cartItemsContainer.appendChild(cartItemElement);
			});

			// Add event listeners for quantity and delete buttons
			this.addCartItemEventListeners();

			// Update total
			this.updateTotal();
	}

	addCartItemEventListeners() {
			// Decrease quantity
			document.querySelectorAll('.decrease-qty').forEach(button => {
					button.addEventListener('click', (e) => {
							const index = e.target.dataset.index;
							if (this.items[index].quantity > 1) {
									this.items[index].quantity--;
									this.renderCart();
							}
					});
			});

			// Increase quantity
			document.querySelectorAll('.increase-qty').forEach(button => {
					button.addEventListener('click', (e) => {
							const index = e.target.dataset.index;
							this.items[index].quantity++;
							this.renderCart();
					});
			});

			// Delete item
			document.querySelectorAll('.delete-btn').forEach(button => {
					button.addEventListener('click', (e) => {
							const index = e.target.dataset.index;
							this.items.splice(index, 1);
							this.renderCart();
					});
			});

			// Like/Unlike item
			document.querySelectorAll('.heart-btn').forEach(button => {
					button.addEventListener('click', (e) => {
							const index = e.target.dataset.index;
							this.items[index].liked = !this.items[index].liked;
							this.renderCart();
					});
			});
	}

	updateTotal() {
			const total = this.items.reduce((sum, item) => {
					return sum + (item.price * item.quantity);
			}, 0);

			this.cartTotalElement.textContent = `Total: ${formatPrice(total)}`;
	}
}

// Utility function to format price (in case dom.js is not imported)
function formatPrice(price) {
	return `$${price.toFixed(2)}`;
}

// Initialize the shopping cart
document.addEventListener('DOMContentLoaded', () => {
	const cart = new ShoppingCart();
});
