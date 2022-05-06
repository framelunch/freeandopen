import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

notice.listen('init', () => {
  // eslint-disable-next-line
  const swiper = new Swiper('#ourWorkSlide', {
    slidesPerView: 'auto',
    spaceBetween: 25,
    breakpoints: {
      768: {
        spaceBetween: 30,
      },
    },
    pagination: {
      el: '#ourWorkSlide, .swiper-pagination',
    },
  });
});
