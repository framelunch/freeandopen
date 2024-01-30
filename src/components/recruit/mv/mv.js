import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import gsap from 'gsap';

notice.listen('init', () => {
  const slide = $('.mv__slider .slide');
  const slideLength = slide.length;
  let currentSlide = 0;
  let lastCurrentSlide = -1;

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
  }, 3000);

  slide.eq(currentSlide).addClass('-current');
});
