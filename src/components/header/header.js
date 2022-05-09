import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

notice.listen('init', () => {
  $('.nav_list li a').each((index, element) => {
    $(element).on('click', e => {
      const targetName = $(element).data('anchor-id');
      e.preventDefault();
      const targetTop = $(`.${targetName}`).offset().top;
      $('html, body').animate({ scrollTop: targetTop });
    });
  });
});
