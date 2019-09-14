window.addEventListener('DOMContentLoaded', function () {
    'use strict'
    let menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        btnMenu = document.querySelector('.menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        popup = document.querySelector('.popup');

    console.log(navigator.userAgent);
    //#region Timer
    function countTimer(deadLine) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemainig() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        let intervalIndex = setInterval(updateClock, 1000);

        if (getTimeRemainig().seconds < 0) {
            clearInterval(intervalIndex);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

        function updateClock() {
            let timer = getTimeRemainig();

            timerHours.textContent = getPrettyTime(timer.hours);
            timerMinutes.textContent = getPrettyTime(timer.minutes);
            timerSeconds.textContent = getPrettyTime(timer.seconds);
        }
    }
    countTimer('1 january 2020');
    //#endregion

    //#region Menu
    const toggleMenu = () => {

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((element) => element.addEventListener('click', handlerMenu));
    }
    //#endregion
    toggleMenu();

    //#region popUp
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popUpBtns = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        let animationIndex,
            opacity = 0;
        const openPopUp = () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                popup.style.display = 'block';
            } else {
                popup.style.opacity = opacity;
                popup.style.display = 'block';
                animationIndex = requestAnimationFrame(animationClose);
            }
        };
        const animationClose = () => {
            animationIndex = requestAnimationFrame(animationClose);

            popup.style.opacity = opacity;
            opacity += 0.1;
            if (opacity >= 1)
                cancelAnimationFrame(animationIndex);
        };
        const closePopUp = () => {
            opacity = 0;
            popup.style.display = 'none';
        };

        popUpBtns.forEach((element) => {
            element.addEventListener('click', openPopUp);
        });
        popUpClose.addEventListener('click', closePopUp);
    }
    togglePopUp();
    //#endregion

    function getPrettyTime(stringTime) {
        let _stringTime = stringTime.toString();
        if (_stringTime.length < 2)
            return '0' + _stringTime;
        else return _stringTime;
    }
});