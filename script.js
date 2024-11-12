
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    
    window.location.href = "cart.html";
}

function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart-button").forEach(button => {
        button.addEventListener("click", function() {
            const item = {
                name: this.getAttribute("data-name"),
                price: this.getAttribute("data-price"),
                image: this.getAttribute("data-image")
            };
            addToCart(item);
        });
    });
}

document.addEventListener("DOMContentLoaded", setupAddToCartButtons);