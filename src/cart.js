
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
    renderCart();

}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      category: button.dataset.category,
      quantity: 1
    };

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }

    saveCart(cart);

    button.classList.add("scale-110");
    setTimeout(() => button.classList.remove("scale-110"), 200);
  });
});

updateCartCount();
const searchInput = document.querySelector('aside input[type="text"]');
const categoryCheckboxes = document.querySelectorAll('aside input[type="checkbox"]');
const priceRange = document.querySelector('aside input[type="range"]');
const productCards = document.querySelectorAll(".popular_card");
const priceDisplay = priceRange.nextElementSibling;

priceRange.addEventListener("input", () => {
  priceDisplay.children[1].textContent = `$${priceRange.value}`;
  filterProducts();
});

searchInput.addEventListener("input", filterProducts);

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", filterProducts);
});

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter(chk => chk.checked)
    .map(chk => chk.nextElementSibling.textContent);
  const maxPrice = parseInt(priceRange.value);

  productCards.forEach(card => {
    const button = card.querySelector(".add-to-cart");

    const name = button.dataset.name.toLowerCase();
    const price = Number(button.dataset.price);
    const category = button.dataset.category || "Indoor"; 
    const matchesSearch = name.includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesPrice = price <= maxPrice;

    if (matchesSearch && matchesCategory && matchesPrice) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

function gotoCart() {
  window.location.href = "./cart.html";
}

