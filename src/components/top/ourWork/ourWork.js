import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

notice.listen('init', () => {
  // eslint-disable-next-line
  const swiper = new Swiper('#ourWorkSlide', {
    slidesPerView: 'auto',
    spaceBetween: 25,
    speed: 500,
    breakpoints: {
      768: {
        spaceBetween: 30,
      },
    },
    mousewheel: {
      forceToAxis: true,
    },
    pagination: {
      el: '#ourWorkSlide, .swiper-pagination',
    },
    navigation: {
      nextEl: '#ourWorkSlide, .swiper-button-next',
      prevEl: '#ourWorkSlide, .swiper-button-prev',
    },
  });
});
