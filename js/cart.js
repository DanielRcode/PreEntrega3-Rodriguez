const cartContainer = document.querySelector(".cart_container")
let cartinLS = localStorage.getItem("products-in-cart")
let cart = JSON.parse(cartinLS)
const cartTotal = document.querySelector("#total")
const clearBtn = document.querySelector(".cart_actions-clear")
const emptyCart = document.querySelector(".empty_cart")
const cartActions = document.querySelector(".cart_actions")
const purchaseBtn = document.querySelector(".cart_actions-complete")
const mainTitle = document.querySelector(".main_title")

function updateNumber() {
    cartQtity.innerHTML = `${cartNumber}`
}
clearBtn.addEventListener("click", clearCart)

purchaseBtn.addEventListener("click", processPurchase)

drawCart()

function drawCart() {
    cartContainer.innerHTML = ""
    if(cart && cart.length > 0){
        let totalCart = 0;
    cart.forEach((prod) => {
        const { id, name, price, quantity, img } = prod
        const subtotal = price * quantity
        totalCart = totalCart + subtotal
        cartContainer.innerHTML += `<div class="cart_product">
        <img
          class="cart_product-image"
          src="${img}"
          alt="cart-image"
        />
        <div class="cart_product-title">
          <small>Title</small>
          <h3>${name}</h3>
        </div>
        <div class="cart_product-quantity">
          <small>Quantity</small>
          <p>${quantity}</p>
        </div>
        <div class="cart_product-price">
          <small>Price</small>
          <p>$${price}</p>
        </div>
        <div class="cart_product-subtotal">
          <small>Subtotal</small>
          <p>$${subtotal}</p>
        </div>
        <button onclick="deleteProduct(${id})" class="cart_product-delete">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </div>`
    });
    cartTotal.innerHTML = `$${totalCart}`
    }
    else{
        emptyCart.style.display = "block"
        cartActions.style.display = "none"
    }
    
    
}



function deleteProduct(id) {
    const item = cart.find((prod) => prod.id === id)
    let index = cart.findIndex((prod) => prod.id === id)
    cart.splice(item[index], 1)
    localStorage.setItem("products-in-cart", JSON.stringify(cart))
    localStorage.setItem("cart-number", JSON.stringify(cart))

    drawCart()
   

}

function clearCart() {
    cart.length = 0
    localStorage.clear()
    cartContainer.innerHTML = ""
    cartNumber = 0
    emptyCart.style.display = "block"
    cartActions.style.display = "none"
}

function processPurchase(){
    cart.length = 0
    localStorage.clear()
    cartContainer.innerHTML = ""
    cartNumber = 0
    mainTitle.innerHTML=`Have a nice day!`
    emptyCart.innerHTML= `Thank you for your purchase <i class="bi bi-emoji-laughing"></i>`
    emptyCart.style.display = "block"
    cartActions.style.display = "none"
}

