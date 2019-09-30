'use strict';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'es6-promise';
import 'whatwg-fetch';
import 'formdata-polyfill';
import 'nodelist-foreach-polyfill';
import calc from './modules/calc';
import checkCalc from './modules/checkCalc';
import checkValid from './modules/checkValid';
import command from './modules/command';
import countTimer from './modules/countTimer';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import sendForm from './modules/sendForm';

countTimer('8 november 2019');

toggleMenu();

togglePopUp();

tabs();

slider();

command();

calc(100);

checkCalc();

sendForm();

checkValid();