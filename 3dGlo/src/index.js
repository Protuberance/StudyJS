'use strict';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'fetch-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'nodelist-foreach-polyfill';
import calc from './modules/calc';
import checkCalc from './modules/checkCalc';
import checkValid from './modules/checkValid';
import command from './modules/command';
import countTimer from './modules/countTimer';
import scrollTo from './modules/scrollTo';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';


const nextScrrenBtn = document.querySelector('main>a');

nextScrrenBtn.addEventListener('click', scrollTo);

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