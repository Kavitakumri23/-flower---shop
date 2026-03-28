document.addEventListener("DOMContentLoaded", function () {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let shareList = JSON.parse(localStorage.getItem("share")) || [];

  // ================= 🛒 ADD TO CART =================
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: Number(this.dataset.price),
        image: this.dataset.image,
        quantity: 1
      };

      const existing = cart.find(item => item.id == product.id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      alert(product.name + " added to cart 🛒");
    });
  });

  // ================= ❤️ WISHLIST =================
  document.querySelectorAll(".wishlist").forEach(btn => {

    if (wishlist.find(item => item.id == btn.dataset.id)) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", function(e) {
      e.preventDefault();

      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price,
        image: this.dataset.image
      };

      const exists = wishlist.find(item => item.id == product.id);

      if (exists) {
        wishlist = wishlist.filter(item => item.id != product.id);
        this.classList.remove("active");
      } else {
        wishlist.push(product);
        this.classList.add("active");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount(); // 🔥 add this
    });

  });

  // ================= 🔗 SHARE =================
  document.querySelectorAll(".share-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      const product = {
        id: this.dataset.id,
        name: this.dataset.name
      };

      shareList.push(product);
      localStorage.setItem("share", JSON.stringify(shareList));

      alert("Sharing: " + product.name + " 🔗");
    });
  });

  // ================= 🔢 CART COUNT =================
  function updateCartCount() {
    let total = 0;
    cart.forEach(item => total += item.quantity);

    let count = document.getElementById("cart-count");
    if (count) count.innerText = total;
  }

  // ================= ❤️ WISHLIST COUNT =================
  function updateWishlistCount() {
    let count = document.getElementById("wishlist-count");
    if (count) count.innerText = wishlist.length;
  }

  updateCartCount();
  updateWishlistCount();

});


// ================= 🔥 GLOBAL BUTTONS =================
document.addEventListener("click", function(e) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ➕ INCREASE
  if (e.target.classList.contains("increase")) {
    let id = e.target.dataset.id;

    cart.forEach(item => {
      if (item.id == id) item.quantity++;
    });
  }

  // ➖ DECREASE
  if (e.target.classList.contains("decrease")) {
    let id = e.target.dataset.id;

    cart.forEach(item => {
      if (item.id == id && item.quantity > 1) {
        item.quantity--;
      }
    });
  }

  // ❌ REMOVE
  if (e.target.classList.contains("remove-btn")) {
    let id = e.target.dataset.id;
    cart = cart.filter(item => item.id != id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();

});

// 💳 CHECKOUT TOTAL
if (document.getElementById("checkout-total")) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  document.getElementById("checkout-total").innerText = total;
}

// 🧾 PLACE ORDER
let form = document.getElementById("checkout-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart"); // cart empty

    window.location.href = "index.html";
  });
}