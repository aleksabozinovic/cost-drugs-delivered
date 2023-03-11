const medLinksLi = document.querySelectorAll(".medications--links li");
const medLinksA = document.querySelectorAll(".medications--links li a");

medLinksA.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    medLinksLi.forEach((el) => {
      el.querySelector("a").classList.remove("active__link--medications");
    });
    e.target.classList.add("active__link--medications");
    // el.classList.remove("active__link--medications");
    // console.log(el.closest(a));
    // e.target.classList.toggle("active__link--medications");
    // if (e.target.classList.contains("active__link--medications")) {
    // e.target.classList.remove("active__link--medications");
    // }
  });
});
