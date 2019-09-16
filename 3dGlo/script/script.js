window.addEventListener('DOMContentLoaded', function () {
    'use strict'
    let menu = document.querySelector('menu'),
        btnMenu = document.querySelector('.menu'),
        nextScrrenBtn = document.querySelector('main>a');

    nextScrrenBtn.addEventListener('click', scrollTo);
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
        };
        const menuListener = (event) => {
            if (event.target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (event.target.tagName === 'LI' || event.target.tagName === 'A') {
                scrollTo(event);
                handlerMenu();
            } else if (event.target.classList.contains('behindMenu'))
                handlerMenu();
        };

        menu.addEventListener('click', menuListener);
        btnMenu.addEventListener('click', handlerMenu);
    }
    toggleMenu();
    //#endregion

    //#region popUp
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtns = document.querySelectorAll('.popup-btn');

        let animationIndex,
            opacity = 0;
        const openPopUp = () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                popUp.style.display = 'block';
            } else {
                popUp.style.opacity = opacity;
                popUp.style.display = 'block';
                animationIndex = requestAnimationFrame(animationClose);
            }
        };
        const animationClose = () => {
            animationIndex = requestAnimationFrame(animationClose);

            popUp.style.opacity = opacity;
            opacity += 0.1;
            if (opacity >= 1)
                cancelAnimationFrame(animationIndex);
        };

        popUpBtns.forEach((element) => {
            element.addEventListener('click', openPopUp);
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-contnet');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    }
    togglePopUp();
    //#endregion

    //#region Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');


        const togleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab ');

            if (target) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        togleTabContent(index);
                    }
                })
            }

        });
    };
    tabs();
    //#endregion

    function scrollTo(event) {
        event.preventDefault();
        let scrollToElementName,
            eventTargetTag = event.target.tagName;
        if (eventTargetTag === 'A') {
            scrollToElementName = event.target.getAttribute('href');
        } else if (eventTargetTag === 'LI') {
            scrollToElementName = event.target.querySelector('a').getAttribute('href');
        } else if (eventTargetTag === 'IMG') {
            scrollToElementName = event.target.parentElement.getAttribute('href');
        }
        scrollToElementName = scrollToElementName.substring(1);

        let scrollToElement = document.getElementById(scrollToElementName),
            scrollToTopValue = scrollToElement.offsetTop,
            indexScrollAnimation,
            currentScrollTop = document.documentElement.scrollTop;

        function scrollAnimation() {
            indexScrollAnimation = requestAnimationFrame(scrollAnimation);
            document.documentElement.scrollTop = currentScrollTop;
            if (currentScrollTop >= scrollToTopValue) {
                cancelAnimationFrame(indexScrollAnimation);
                document.documentElement.scrollTop = scrollToTopValue;
            }
            currentScrollTop += 100;
        }
        indexScrollAnimation = requestAnimationFrame(scrollAnimation);
    }

    function getPrettyTime(stringTime) {
        let _stringTime = stringTime.toString();
        if (_stringTime.length < 2)
            return '0' + _stringTime;
        else return _stringTime;
    }
});