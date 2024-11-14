function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); 
    updateCartCount();
    showAddToCartNotification();
}
function showAddToCartNotification() {
    const notification = document.createElement("div");
    notification.className= "added-to-cart";
    notification.textContent="Item added to cart!";

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);

    }



function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const item = {
                name: this.getAttribute("data-name"),
                price: parseFloat(this.getAttribute("data-price").replace(/,/g, '')), 
                image: this.getAttribute("data-image"),
                id: this.getAttribute("data-id")
            };
            addToCart(item);
        });
    });
}


function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDisplay = document.querySelector(".cart-dis");
    cartDisplay.innerHTML = "";

    const clearCartButton = document.createElement("div");
    clearCartButton.classList.add("clear-cart");
    clearCartButton.textContent = "Clear Cart";
    clearCartButton.onclick = clearCart;

    if (cartItems.length > 0) {
        cartDisplay.appendChild(clearCartButton);
    }

    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.classList.add("empty-cart");
        emptyCartMessage.textContent = "Your cart is empty";
        cartDisplay.appendChild(emptyCartMessage);
    } else {
        cartItems.forEach(item => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cartitems");

            const itemImage = document.createElement("img");
            itemImage.src = item.image;
            itemImage.alt = item.name;
            itemImage.classList.add("cartpic");

            const itemName = document.createElement("h5");
            itemName.textContent = item.name;

            const itemPrice = document.createElement("h5");
            itemPrice.textContent = `$${item.price}`;

            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemName);
            itemContainer.appendChild(itemPrice);

            cartDisplay.appendChild(itemContainer);
        });
    }
}


function clearCart() {
    localStorage.removeItem("cart");
    displayCartItems();
    if (document.querySelector(".cart-body")) {
        displayForCartItemsPage(); 
    }
}


function displayForCartItemsPage() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const leftCart = document.querySelector(".left-cart");
    leftCart.innerHTML = "";

    let totalPrice = 0;

    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.classList.add("empty-cart");
        emptyCartMessage.textContent = "Your cart is empty";
        leftCart.appendChild(emptyCartMessage);
        return;
    }

    cartItems.forEach(item => {
        const innerLeft = document.createElement("div");
        innerLeft.classList.add("inner-left");
        const di1 = document.createElement("div");
        di1.classList.add("di-1");

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        di1.appendChild(itemImage);

        const di2 = document.createElement("div");
        di2.classList.add("di-2");

        const itemName = document.createElement("h1");
        itemName.classList.add("product-tl");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("h4");
        itemPrice.id = "amt";
        itemPrice.textContent = `$${item.price}`;
        di2.appendChild(itemName);
        di2.appendChild(itemPrice);

        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "X";
        removeBtn.onclick = () => removeFromCart(item.id);

        innerLeft.appendChild(di1);
        innerLeft.appendChild(di2);
        innerLeft.appendChild(removeBtn);
        leftCart.appendChild(innerLeft);

        totalPrice += item.price;
    });

    const totalBtn = document.createElement("div");
    totalBtn.classList.add("total-btn");

    const proList = document.createElement("div");
    proList.classList.add("pro-list");

    const totalLabel = document.createElement("h4");
    totalLabel.textContent = "Total";
    const totalAmount = document.createElement("h4");
    totalAmount.textContent = `$${totalPrice.toFixed(2)}`;

    proList.appendChild(totalLabel);
    proList.appendChild(totalAmount);
     
    const proceedLink = document.createElement("a");
    proceedLink.classList.add("pro-btn");
    proceedLink.textContent = "Proceed To Checkout";
    proceedLink.href = "checkout.html";

    //const proceedButton = document.createElement("div");
    //proceedButton.classList.add("pro-btn");
    //proceedButton.textContent = "Proceed To Checkout";

    totalBtn.appendChild(proList);
    totalBtn.appendChild(proceedLink);

    leftCart.appendChild(totalBtn);
}


function removeFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayForCartItemsPage();
}


document.addEventListener("DOMContentLoaded", () => {
    setupAddToCartButtons();

   
    if (document.querySelector(".cart-dis")) {
        displayCartItems();
    }

   
    if (document.querySelector(".cart-body")) {
        displayForCartItemsPage();
    }
});

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countElement = document.querySelector(".count");
    countElement.textContent = cart.length;
}
document.addEventListener("DOMContentLoaded", updateCartCount);