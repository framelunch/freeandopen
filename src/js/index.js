/* eslint import/first: off */
import './common/initializer';
import $ from 'jquery';
import { format } from 'date-fns';
import notice from 'libraries-frontend-framelunch/js/notice';

import subscribeEvents from './modules/_events';

import '../components/common/pagetop/pagetop';
import '../components/top/animation/animation';
import '../components/top/mv/mv';
import '../components/top/aboutDetail/aboutDetail';
import '../components/top/ourWork/ourWork';
import '../components/top/company/company';

import { preloadImage, getQueryName } from './modules/utils';

class Main {
  onDOMContentLoaded = () => {
    const images = document.querySelectorAll('img');
    preloadImage(images, () => {
      notice.publish('init', []);
    });
  };
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
subscribeEvents();
