window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    function countTimer(deadLine) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemainig() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                deltaTime = (new Date().getTimezoneOffset()) * 60 * 1000,
                timeRemaining = ((dateStop - deltaTime) - dateNow) / 1000,
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

            countTimer(getFullDate(date.getUTCDate() + 1, month[date.getUTCMonth()], date.getUTCFullYear()));
        }

        function updateClock() {
            let timer = getTimeRemainig();

            timerHours.textContent = getPrettyTime(timer.hours);
            timerMinutes.textContent = getPrettyTime(timer.minutes);
            timerSeconds.textContent = getPrettyTime(timer.seconds);
        }
    }

    let month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'december'],
        date = new Date(),
        zeroGrinvich = getFullDate(date.getDate() + 1, month[date.getMonth()], date.getFullYear());

    countTimer(zeroGrinvich);

    function getFullDate(date, month, year) {
        return date + ' ' + month + ' ' + year;
    }

    function getPrettyTime(stringTime) {
        let _stringTime = stringTime.toString();
        if (_stringTime.length < 2)
            return '0' + _stringTime;
        else return _stringTime;
    }
})