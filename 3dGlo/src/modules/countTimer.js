import getPrettyTime from './getPrettyTime';

const countTimer = (deadLine) => {

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
};

export default countTimer;