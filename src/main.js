const navmenu = document.getElementById('nav-menu');
const navlink = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
  navmenu.classList.toggle('left-[0%]');
  hamburger.classList.toggle('ri-close-large-line');
});

navlink.forEach((n) =>
  n.addEventListener('click', () => {
    navmenu.classList.toggle('left-[0%]');
    hamburger.classList.remove('ri-close-large-line');
  })
);

const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 20,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  grabCursor: true,

pagination: {
  el: '.swiper-pagination',
  clickable: true,
},

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
function goToShop() {
  window.location.href = "./shop.html";
}