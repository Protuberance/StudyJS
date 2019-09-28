'use strict';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
require('es6-promise/auto');
import 'fetch-polyfill';
import 'nodelist-foreach-polyfill';
import calc from './modules/calc';
import checkCalc from './modules/checkCalc';
import checkValid from './modules/checkValid';
import command from './modules/command';
import countTimer from './modules/countTimer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';

countTimer('8 november 2019');

toggleMenu();

togglePopUp();

tabs();

slider();

command();

checkCalc();

calc(100);

sendForm();

checkValid();