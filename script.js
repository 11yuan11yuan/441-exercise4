//My name is Susan(Zhou Jingyuan)
//Function to shopping cart
document.addEventListener('DOMContentLoaded', function () {
    // Selecting necessary elements and setting up event listeners
    // Adding items to the cart, updating total price, and handling checkout and clearing the cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartList = document.querySelector('.cart');
    const checkoutButton = document.querySelector('.checkout');
    const clearCartButton = document.querySelector('.clearcart');
    const totalPriceElement = document.createElement('p');
    totalPriceElement.id = "totalPrice";
    totalPriceElement.textContent = 'Total: $0';
    cartList.parentNode.insertBefore(totalPriceElement, cartList);

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productId = this.parentElement.dataset.id;
            const productName = this.parentElement.querySelector('h2').textContent;
            const productPrice = parseInt(this.parentElement.querySelector('p').textContent.replace('Prices: $', ''));
            const productQuantity = parseInt(this.parentElement.querySelector('input').value);

            if (productQuantity > 0) {
                const cartItem = document.createElement('li');
                const itemTotalPrice = productPrice * productQuantity;
                cartItem.textContent = `${productName} - ${productPrice} x ${productQuantity} =${itemTotalPrice}`;
                cartItem.dataset.id = productId;

                const removeFromCartButton = document.createElement('button');
                removeFromCartButton.textContent = 'Remove';
                removeFromCartButton.addEventListener('click', function () {
                    cartList.removeChild(cartItem);
                    updateTotalPrice();
                    // Clear the input field of the removed product
                    const inputField = button.parentElement.querySelector('input');
                    inputField.value = '';
                });

                cartItem.appendChild(removeFromCartButton);
                cartList.appendChild(cartItem);
                updateTotalPrice();
            }
        });
    });

    checkoutButton.addEventListener('click', function () {
        const totalPriceElement = document.getElementById("totalPrice");
        if(totalPriceElement.textContent != "Total: $0"){
            const inputElements = document.querySelectorAll('input');
            inputElements.forEach(function (input) {
                input.value = '';
            });
            alert('Checkout Successfully!');
            cartList.innerHTML = '';
            updateTotalPrice();
        }
        else{
            alert('Checkout was unsuccessful, please add to cart and checkout again.');
        }
    });
    clearCartButton.addEventListener('click', function () {
        cartList.innerHTML = ''; // Empty Shopping Cart List
        const inputElements = document.querySelectorAll('input');
        inputElements.forEach(function (input) {
            input.value = '';
        });
        updateTotalPrice(); // Update total price
    });

    function updateTotalPrice() {
        let totalPrice = 0;
        const cartItems = cartList.querySelectorAll('li');
        cartItems.forEach(function (item) {
            const price = parseInt(item.textContent.split(' - ')[1].split(' x ')[0]);
            const quantity = parseInt(item.textContent.split(' - ')[1].split(' x ')[1]);
            totalPrice += price * quantity;
        });
        totalPriceElement.textContent = 'Total:' + " " + '$' + totalPrice;
    }
});


// Function to set the username and password in localStorage
function setUsername() {
    const usernameInput = document.getElementById('usernameInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();
    if (usernameInput !== '' && passwordInput !== '') {
        localStorage.setItem('username', usernameInput);
        localStorage.setItem('password', passwordInput);
        alert(`User "${usernameInput}" has been set in localStorage.`);
        location.assign("login.html");
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to retrieve and verify the username and password from localStorage
function getUsername() {
    // Retrieving stored username and password, comparing with input values, and redirecting accordingly
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const usernameInput = document.getElementById('usernameInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    if (storedUsername && storedPassword && usernameInput === storedUsername && passwordInput === storedPassword) {
        location.assign("cart.html");
    } else {
        alert('Incorrect username or password.');
    }
}

// Function to clear the stored username and password from localStorage
function clearStorage() {
    //Removing stored username and password from localStorage and notifying the user
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    alert('localStorage cleared.');
}
