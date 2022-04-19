/* eslint import/first: off */
import './common/initializer';
import $ from 'jquery';
import { format } from 'date-fns';
import notice from 'libraries-frontend-framelunch/js/notice';

import subscribeEvents from './modules/_events';

class Main {
  onDOMContentLoaded = () => {
    console.log(`DOMContentLoaded: ${format(new Date())}`);
  };
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
subscribeEvents();
