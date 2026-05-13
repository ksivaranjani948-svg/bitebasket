let cart = []

function scrollProducts(){

  document.getElementById('products').scrollIntoView({
    behavior:'smooth'
  })

}

function addToCart(name,price){

  cart.push({
    name:name,
    price:price
  })

  updateCart()

}

function updateCart(){

  const cartItems = document.getElementById('cart-items')

  const cartCount = document.getElementById('cart-count')

  const totalPrice = document.getElementById('total-price')

  cartItems.innerHTML = ''

  let total = 0

  cart.forEach((item)=>{

    total += item.price

    cartItems.innerHTML += `
    
      <div class="cart-item">
      
        <h3>${item.name}</h3>
        
        <p>Price: ₹${item.price}</p>

      </div>

    `

  })

  cartCount.innerText = cart.length

  totalPrice.innerText = total

}

function checkout(){

  if(cart.length === 0){

    alert('Your cart is empty')

    return

  }

  // GET OLD ORDERS

  let orders = JSON.parse(localStorage.getItem('orders')) || []

  // ADD NEW ORDERS

  orders.push(...cart)

  // SAVE AGAIN

  localStorage.setItem('orders',JSON.stringify(orders))

  alert('🎉 Order placed successfully!')

  cart = []

  updateCart()

  showOrders()

}

function showOrders(){

  const ordersContainer = document.getElementById('orders-list')

  const orders = JSON.parse(localStorage.getItem('orders')) || []

  ordersContainer.innerHTML = ''

  orders.forEach((order)=>{

    ordersContainer.innerHTML += `

      <div class="cart-item">

        <h3>${order.name}</h3>

        <p>Sold Price: ₹${order.price}</p>

      </div>

    `

  })

}

window.onload = showOrders
