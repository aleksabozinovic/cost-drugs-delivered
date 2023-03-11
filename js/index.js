const medLinksLi = document.querySelectorAll(".medications--links li");

medLinksLi.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    el.classList.remove("active__link--medications");
    // e.target.classList.toggle("active__link--medications");
    if (e.target.classList.contains("active__link--medications")) {
      e.target.classList.remove("active__link--medications");
    }
  });
});
