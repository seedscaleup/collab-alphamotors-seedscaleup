document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Merci, votre message a bien été noté. Nous revenons vers vous rapidement.";
    form.reset();
  });
});
