

window.addEventListener("load", () => { // DOMContentLoaded → load
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 350,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const fadeUps = document.querySelectorAll(".fadeUp");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        
        observer.unobserve(entry.target);
      }
    });
  });

  fadeUps.forEach((el) => observer.observe(el));
});


// works fade-in
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const options = {
    threshold: 0.2, // 画面に20%見えたら発火
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only once
      }
    });
  }, options);

  faders.forEach(fader => {
    observer.observe(fader);
  });
});
