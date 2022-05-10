import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

notice.listen('init', () => {
  $('.pagetop_btn a').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, { duration: 1000 });
  });
});
