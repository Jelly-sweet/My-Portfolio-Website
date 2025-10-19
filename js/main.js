const circle = document.querySelector("circle");
const percent = document.getElementById("percent");
const loading = document.getElementById("loading");
const hero = document.getElementById("hero");
const header = document.querySelector("header");
const logo = document.querySelector(".logo-text");

const circumference = 2 * Math.PI * 90;
circle.style.strokeDasharray = circumference;

function startLoading() {
  let progress = 0;
  circle.style.strokeDashoffset = circumference;
  percent.textContent = "0%";

  percent.style.opacity = "1";
  circle.style.opacity = "1";

  loading.style.display = "flex";
  loading.style.opacity = "1";
  loading.classList.remove("slide-up");

  hero.classList.remove("show");
  hero.classList.add("hidden");
  header.classList.remove("show");
  header.classList.add("hidden");

  
  resetHeroAnimations();

  const interval = setInterval(() => {
    progress++;
    percent.textContent = progress + "%";
    circle.style.strokeDashoffset = circumference - (progress / 100) * circumference;

    if (progress >= 100) {
      clearInterval(interval);

        percent.style.transition = "opacity 1s ease";
        circle.style.transition = "opacity 1s ease";
        percent.style.opacity = "0";
        circle.style.opacity = "0";

      setTimeout(() => {
        loading.classList.add("slide-up");

        setTimeout(() => {
          loading.style.display = "none";

          resetHeroAnimations();
          hero.classList.remove("hidden");
          hero.classList.add("show");
          header.classList.remove("hidden");
          header.classList.add("show");
        }, 1000); 
      }, 800); 
    }
  }, 15);
}

window.addEventListener("load", startLoading);


logo.addEventListener("click", e => {
  e.preventDefault();
  startLoading();
});

// Hero animation reset
function resetHeroAnimations() {
  const fadeItems = document.querySelectorAll("#hero .fade-item");
  fadeItems.forEach(item => {
    item.style.animation = "none";
    void item.offsetWidth;
    item.style.animation = "";
  });
}

// hamburger menu
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
});


(function() {
  const stage = document.getElementById('stage');
  const btnNext = document.getElementById('next');
  const btnPrev = document.getElementById('prev');
  let cards = Array.from(stage.querySelectorAll('.card'));
  const duration = 600;
  let locked = false;

  function assignClasses() {
    cards.forEach((card, i) => {
      card.classList.remove('p-left', 'p-center', 'p-right');
      if (i === 0) card.classList.add('p-left');
      if (i === 1) card.classList.add('p-center');
      if (i === 2) card.classList.add('p-right');
    });
  }

  assignClasses();

  function rotateNext() {
    if (locked) return;
    locked = true;
    cards.unshift(cards.pop());
    assignClasses();
    setTimeout(() => (locked = false), duration + 20);
  }

  function rotatePrev() {
    if (locked) return;
    locked = true;
    cards.push(cards.shift());
    assignClasses();
    setTimeout(() => (locked = false), duration + 20);
  }

  btnNext.addEventListener('click', rotateNext);
  btnPrev.addEventListener('click', rotatePrev);

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') rotateNext();
    if (e.key === 'ArrowLeft') rotatePrev();
  });

  stage.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card || locked) return;
    const idx = cards.indexOf(card);
    if (idx === 1) return;
    if (idx === 0) rotatePrev();
    else if (idx === 2) rotateNext();
  });
})();

