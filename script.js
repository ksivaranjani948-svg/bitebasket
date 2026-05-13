import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyA2NhmB-i3W5nLA62b4xJ_kKYmfHpxa508",

  authDomain: "bitebasket-925a7.firebaseapp.com",

  projectId: "bitebasket-925a7",

  storageBucket: "bitebasket-925a7.firebasestorage.app",

  messagingSenderId: "275401126053",

  appId: "1:275401126053:web:057d5e1197c2da60329d4c"

};

// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// CART

let cart = []
window.scrollProducts = function(){

  document.getElementById('products').scrollIntoView({
    behavior:'smooth'
  })

}

window.addToCart = function(name,price){

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

// CHECKOUT

window.checkout = async function(){

  if(cart.length === 0){

    alert('Your cart is empty')

    return

  }

  const now = new Date()

  const date = now.toLocaleDateString()

  const time = now.toLocaleTimeString()

  try{

    for(const item of cart){

      await addDoc(collection(db,"orders"),{

        name:item.name,

        price:item.price,

        date:date,

        time:time

      })

    }

    alert('🎉 Order placed successfully!')

// CLEAR CART ARRAY

cart = []

// CLEAR HTML

document.getElementById('cart-items').innerHTML = ''

document.getElementById('cart-count').innerText = 0

document.getElementById('total-price').innerText = 0

  }

  catch(error){

    console.log(error)

    alert('Order failed')

  }

}
