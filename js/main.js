let totalStock = [
    { id: 1, name: "T-shirt 1", type: "t-shirt", price: 180, img: "images/t-shirts/t-shirt_01.jpg" },
    { id: 2, name: "T-shirt 2", type: "t-shirt", price: 169, img: "images/t-shirts/t-shirt_02.jpg" },
    { id: 3, name: "T-shirt 3", type: "t-shirt", price: 200, img: "images/t-shirts/t-shirt_03.jpg" },
    { id: 4, name: "T-shirt 4", type: "t-shirt", price: 189, img: "images/t-shirts/t-shirt_04.jpg" },
    { id: 5, name: "T-shirt 5", type: "t-shirt", price: 200, img: "images/t-shirts/t-shirt_05.jpg" },
    { id: 6, name: "T-shirt 6", type: "t-shirt", price: 169, img: "images/t-shirts/t-shirt_06.jpg" },
    { id: 7, name: "Pant 1", type: "pants", price: 500, img: "images/pants/pant_01.jpg" },
    { id: 8, name: "Pant 2", type: "pants", price: 644, img: "images/pants/pant_02.jpg" },
    { id: 9, name: "Pant 3", type: "pants", price: 800, img: "images/pants/pant_03.jpg" },
    { id: 10, name: "Pant 4", type: "pants", price: 650, img: "images/pants/pant_04.jpg" },
    { id: 11, name: "Pant 5", type: "pants", price: 499, img: "images/pants/pant_05.jpg" },
    { id: 12, name: "Pant 6", type: "pants", price: 500, img: "images/pants/pant_06.jpg" },
    { id: 13, name: "Shoes 1", type: "shoes", price: 500, img: "images/shoes/shoes_01.jpg" },
    { id: 14, name: "Shoes 2", type: "shoes", price: 500, img: "images/shoes/shoes_02.jpg" },
    { id: 15, name: "Shoes 3", type: "shoes", price: 500, img: "images/shoes/shoes_03.jpg" },
    { id: 16, name: "Shoes 4", type: "shoes", price: 500, img: "images/shoes/shoes_04.jpg" },
    { id: 17, name: "Shoes 5", type: "shoes", price: 500, img: "images/shoes/shoes_05.jpg" },
    { id: 18, name: "Shoes 6", type: "shoes", price: 500, img: "images/shoes/shoes_06.jpg" },
]

const productContainer = document.querySelector(".product_container")
const typeButton = document.querySelectorAll(".type_button")
const qtyNumber = document.querySelector(".number-change")
const mainTitle = document.querySelector(".main_title")
const cartNumber = JSON.parse(localStorage.getItem("cart-number"))


let cart;
const cartLS = JSON.parse(localStorage.getItem("products-in-cart"))
if(cartLS){
cart = cartLS;
}else{
cart = []
}


updateNumber()
drawProducts(totalStock)

typeButton.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.currentTarget.id != "all-p") {
            mainTitle.innerHTML = e.currentTarget.id.toUpperCase()
            const buttonProduct = totalStock.filter(product => product.type === e.currentTarget.id)
            drawProducts(buttonProduct)
        } else {
            mainTitle.innerHTML = "ALL PRODUCTS"
            drawProducts(totalStock)
        }
    })
})




function drawProducts(el) {
    productContainer.innerHTML = ""
    el.forEach((prod) => {
        const { id, name, type, price, img } = prod
        productContainer.innerHTML += `<div class="product">
    <img class="product_image" src=${img} alt="product-image">
    <div class="product_details">
    <p class="product_title">${name}</p>
    <p class="product_price">$${price}</p>
    <button onclick="addProduct(${id})" class="product_addbtn">Add item</button></div>
</div>`
    })
}


function addProduct(id) {
    const item = totalStock.find((prod) => prod.id === id)
    if (cart.some(product => product.id === id)) {
        const index = cart.findIndex(product => product.id === id)
        cart[index].quantity++
        updateNumber()
    } else {
        item.quantity = 1
        cart.push(item)
        updateNumber()
    }
    localStorage.setItem("products-in-cart", JSON.stringify(cart))
    
}

function updateNumber() {
    let numberT
    if(cartNumber){
        numberT = cartNumber
    }else{
        numberT = cart.reduce((acc, product) => acc + product.quantity, 0)
    }
    qtyNumber.innerHTML = `${numberT}`
    localStorage.setItem("cart-number", JSON.stringify(numberT))
}

