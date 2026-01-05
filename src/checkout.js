function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  cartContainer.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.classList.add('hidden');
    emptyCart.classList.remove('hidden');
  } else {
    cartContainer.classList.remove('hidden');
    emptyCart.classList.add('hidden');

    cart.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      const card = document.createElement("div");
      card.className = "cart-item group bg-gradient-to-br from-green-900/60 to-green-800/40 rounded-xl p-4 border border-green-700/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10";

      card.innerHTML = `
<div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-green-900/30 rounded-2xl border border-green-700/30">
  <!-- Product Image -->
  <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-green-950/50 flex-shrink-0">
    <img src="${item.image}" 
         alt="${item.name}" 
         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
  </div>
  
  <!-- Product Info -->
  <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-start mb-2">
        <div class="min-w-0">
          <h3 class="text-lg sm:text-base md:text-lg font-bold group-hover:text-yellow-300 transition truncate">${item.name}</h3>
          <p class="text-sm text-green-300 truncate">$${item.price.toFixed(2)} each</p>
        </div>
        <button class="remove text-red-400 hover:text-red-300 hover:scale-110 transition-all p-2 hover:bg-red-500/10 rounded-lg flex-shrink-0">
          <i class="ri-delete-bin-line text-xl"></i>
        </button>
      </div>

      <div class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 gap-2 sm:gap-0">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-3 bg-green-950/50 rounded-lg p-1">
          <button class="decrease w-8 h-8 flex items-center justify-center rounded-md hover:bg-green-700/50 transition-all hover:scale-110 active:scale-95">
            <i class="ri-subtract-line"></i>
          </button>
          <span class="w-8 text-center font-semibold">${item.quantity}</span>
          <button class="increase w-8 h-8 flex items-center justify-center rounded-md hover:bg-green-700/50 transition-all hover:scale-110 active:scale-95">
            <i class="ri-add-line"></i>
          </button>
        </div>
        
        <!-- Price -->
        <div class="text-right sm:text-right mt-2 sm:mt-0">
          <p class="text-xl sm:text-2xl font-bold text-yellow-400">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
</div>

      `;

      card.querySelector(".increase").addEventListener("click", () => {
        item.quantity++;
        saveCart(cart);
      });

      card.querySelector(".decrease").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(cart.indexOf(item), 1);
        }
        saveCart(cart);
      });

      card.querySelector(".remove").addEventListener("click", () => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          cart.splice(cart.indexOf(item), 1);
          saveCart(cart);
        }, 300);
      });

      cartContainer.appendChild(card);
    });
  }

  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + tax;

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("subtotal").textContent = `$${totalPrice.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("total-price").textContent = `$${finalTotal.toFixed(2)}`;
}
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeModal = document.getElementById("closeModal");

  checkoutBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart(); 
    checkoutModal.classList.remove("hidden");
    checkoutModal.classList.add("flex");
  });

  closeModal.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
    checkoutModal.classList.remove("flex");
  });
renderCart();