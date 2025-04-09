const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("finalizado") || document.getElementById("btnInit");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});
