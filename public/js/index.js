const profileIcon = document.getElementById("profileIcon");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const productCarousel = document.getElementById("productCarousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const productWidth = 320; // This should match the width from tailwind classes + margin.

profileIcon.addEventListener("click", function (event) {
  event.preventDefault();
  loginModal.classList.remove("hidden");
});

closeModal.addEventListener("click", function () {
  loginModal.classList.add("hidden");
});

loginModal.addEventListener("click", function (event) {
  if (event.target === loginModal) {
    loginModal.classList.add("hidden");
  }
});

nextBtn.addEventListener("click", function () {
  productCarousel.scrollBy({ left: productWidth, behavior: "smooth" });
  // Scroll the carousel by the width of one product
});

prevBtn.addEventListener("click", function () {
  productCarousel.scrollBy({ left: -productWidth, behavior: "smooth" });
  // Scroll the carousel backwards by the width of one product
});
