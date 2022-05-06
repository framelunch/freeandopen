import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

notice.listen('init', () => {
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
});
