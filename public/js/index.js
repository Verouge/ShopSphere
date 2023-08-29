const profileIcon = document.getElementById("profileIcon");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

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
