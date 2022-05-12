import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import gsap from 'gsap';

notice.listen('init', () => {
  const slide = $('.mv__slider .slide');
  const slideLength = slide.length;
  let currentSlide = 0;
  let lastCurrentSlide = -1;

  $('.copy_animation').each((index, element) => {
    $('span', element).each((index2, element2) => {
      const delay = index2 * 50 + index * 500;
      setTimeout(() => {
        $(element2).addClass('-start');
        if (index === 0 && index2 === 8) {
          $('.copy_symbol--1').addClass('-start');
        } else if (index === 1 && index2 === 6) {
          $('.copy_symbol--2').addClass('-start');
        }
        setTimeout(() => {
          $(element2).addClass('-color');
        }, 500);
      }, delay);
    });
  });

  $('.mv__text').addClass('-start');

  setInterval(() => {
    slide.eq(lastCurrentSlide).removeClass('-lastCurrent');
    lastCurrentSlide = currentSlide;
    slide.eq(currentSlide).addClass('-lastCurrent');
    slide.eq(currentSlide).removeClass('-current');
    currentSlide += 1;
    if (currentSlide >= slideLength) {
      currentSlide = 0;
    }
    slide.eq(currentSlide).addClass('-current');
    const targetSlide = slide.eq(currentSlide);
    gsap.fromTo(targetSlide, { left: '100%' }, { left: 0, duration: 1.5, ease: 'power4.inOut' });
    gsap.fromTo($('img', targetSlide), { x: '-100%' }, { x: 0, duration: 1.5, ease: 'power4.inOut' });
  }, 7000);

  slide.eq(currentSlide).addClass('-current');
});
