import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

const $window = $(window);

notice.listen('scroll', $scrollTop => {
  $('.show-animation').each((index, element) => {
    const targetY = $(element).offset().top - $window.height() / 2;
    if ($scrollTop > targetY) {
      $(element).addClass('-show');
    } else {
      $(element).removeClass('-show');
    }
  });
});
