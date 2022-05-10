import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import { preloadImage, getQueryName } from '../../js/modules/utils';

notice.listen('init', () => {
  const images = document.querySelectorAll('img');
  preloadImage(images, () => {
    const queryName = getQueryName('anchor');
    if (queryName) {
      const targetTop = $(`.${queryName}`).offset().top;
      $('html, body').animate({ scrollTop: targetTop }, { duration: 1000 });
    }
  });
});
