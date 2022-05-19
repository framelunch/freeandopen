import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import gsap from 'gsap';

const $window = $(window);
const $swiper = null;
let currentNumber = 0;

notice.listen('init', () => {
  // eslint-disable-next-line
  $swiper = new Swiper('#aboutDetailSwiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 500,
    allowTouchMove: false,
  });

  $('.about_detail--list--item--textNo img')
    .eq(0)
    .addClass('-show');
});

notice.listen('scroll', $scrollTop => {
  if (!$swiper) return;
  const slideStartY = $('.about_detail').offset().top;
  const slideEndY = slideStartY + $('.about_detail').height() - $('.about_detail--list').height();
  const progress = ($scrollTop - slideStartY) / (slideEndY - slideStartY);
  if (progress > 0 && progress < 1) {
    $('.about_detail--list--item--textNo img')
      .eq(currentNumber)
      .removeClass('-show');

    const slideNumber = Math.round(progress * 2);
    $swiper.slideTo(slideNumber);
    $('.about_detail--list--item--textNo img')
      .eq(slideNumber)
      .addClass('-show');
    $('.about_detail--list--item--img ul li').each((index, element) => {
      if (index > slideNumber) {
        if ($(element).hasClass('-show')) {
          $(element).removeClass('-show');
        }
      } else if (!$(element).hasClass('-show')) {
        $(element).addClass('-show');
      }
    });

    $('.about_detail--pagination span')
      .eq(currentNumber)
      .removeClass('-current');
    currentNumber = slideNumber;
    $('.about_detail--pagination span')
      .eq(currentNumber)
      .addClass('-current');
  }
});
