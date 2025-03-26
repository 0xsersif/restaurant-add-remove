// DOM.js - Utility functions for DOM manipulation

/**
 * Create a new DOM element with optional classes and attributes
 * @param {string} tag - The type of element to create
 * @param {string[]} [classes] - Optional array of classes to add
 * @param {Object} [attributes] - Optional object of attributes to set
 * @returns {HTMLElement} The created DOM element
 */
function createElement(tag, classes = [], attributes = {}) {
	const element = document.createElement(tag);
	
	// Add classes
	if (classes.length > 0) {
			element.classList.add(...classes);
	}
	
	// Set attributes
	Object.keys(attributes).forEach(attr => {
			element.setAttribute(attr, attributes[attr]);
	});
	
	return element;
}

/**
* Find the closest parent element matching a selector
* @param {HTMLElement} element - The starting element
* @param {string} selector - The selector to match
* @returns {HTMLElement|null} The matched parent element or null
*/
function closest(element, selector) {
	return element.closest(selector);
}

/**
* Add event listener with optional delegation
* @param {string|HTMLElement} target - The target to add event listener to
* @param {string} eventType - The type of event
* @param {string} [selector] - Optional selector for event delegation
* @param {Function} handler - The event handler function
*/
function addEvent(target, eventType, selector, handler) {
	const element = typeof target === 'string' 
			? document.querySelector(target) 
			: target;
	
	if (selector && typeof selector === 'function') {
			handler = selector;
			selector = null;
	}
	
	if (selector) {
			element.addEventListener(eventType, (event) => {
					const delegatedTarget = event.target.closest(selector);
					if (delegatedTarget) {
							handler.call(delegatedTarget, event);
					}
			});
	} else {
			element.addEventListener(eventType, handler);
	}
}

/**
* Format price to two decimal places
* @param {number} price - The price to format
* @returns {string} Formatted price string
*/
function formatPrice(price) {
	return `$${price.toFixed(2)}`;
}

// Export functions if using modules, otherwise they'll be global
export {
	createElement,
	closest,
	addEvent,
	formatPrice
};