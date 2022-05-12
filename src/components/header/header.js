import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import { preloadImage, getQueryName } from '../../js/modules/utils';

notice.listen('init', () => {
  const queryName = getQueryName('anchor');
  if (queryName) {
    const targetTop = $(`.${queryName}`).offset().top;
    $('html, body').animate({ scrollTop: targetTop }, { duration: 1000 });
  }

  $('.nav_list li, .drawer-list li').each((index, element) => {
    $('a.-anchor', element).on('click', e => {
      const targetId = $(e.currentTarget).data('anchor');
      e.preventDefault();
      const targetTop = $(`.${targetId}`).offset().top;
      $('html, body').animate({ scrollTop: targetTop }, { duration: 1000 });

      $('#drawer-check').prop('checked', false);
    });
  });
});
