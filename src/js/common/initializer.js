// @flow

/**
 * アプリ内で一度だけ読み込むファイルをここに書く
 * e.g. polyfill, RxJS
 */
import 'babel-polyfill';

import '../modules/DeviceChecker';
import * as Configs from './config';

console.log('Dev by', Configs.author);
