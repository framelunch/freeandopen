/* eslint import/first: off */
import './common/initializer';
import $ from 'jquery';
import { format } from 'date-fns';
import notice from 'libraries-frontend-framelunch/js/notice';

import subscribeEvents from './modules/_events';

import '../components/common/pagetop/pagetop';
import '../components/top/animation/animation';

class Main {
  onDOMContentLoaded = () => {
    notice.publish('init', []);

    const headerFixed = $('.headerFixed');

    $('.company__info dl dd a').each((_index, element) => {
      $(element).on('click', () => {
        const anchorId = $(element).data('anchor-id');
        const target = $(`div[data-anchor="${anchorId}"]`);
        const targetTop = $(target).offset().top - headerFixed.height();
        $('html, body').animate({scrollTop: targetTop});
      });
    });
  };
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
subscribeEvents();
