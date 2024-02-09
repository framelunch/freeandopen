import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import ajax from 'ajax';

const SEND_PATH = '/tools/recruit.php';
const $contact = $('.contact');
const $form = $('.contact_wrapper--form');

const errorCheck = target => {
  if ($(target).val() === '') {
    $(target)
      .parent()
      .addClass('-err');
    return true;
  }
  $(target)
    .parent()
    .removeClass('-err');
  return false;
};

notice.listen('init', () => {
  $('.submit', $contact).on('click', () => {
    const name = $('input[id="name"]', $contact);
    const tel = $('input[id="tel"]', $contact);
    const email = $('input[id="email"]', $contact);
    const message = $('textarea[id="message"]', $contact);

    let isErr = false;
    isErr = errorCheck(name);
    isErr = errorCheck(tel);
    isErr = errorCheck(email);
    isErr = errorCheck(message);

    if (!isErr) {
      const postData = JSON.stringify({
        name: name.val(),
        tel: tel.val(),
        email: email.val(),
        message: message.val(),
      });
      $.ajax({
        type: 'POST',
        url: SEND_PATH,
        // contentType: 'application/json',
        data: postData,
        // dataType: 'json',
      });

      $form.addClass('-thanks');
    } else {
      $('html, body').animate({ scrollTop: $('.contact').offset().top });
    }
  });
});
