'use Strict';
const timeOnScreen = document.getElementById('timeOnScreen');

const showTime = () => {
    const date = new Date();
    const timeString = `${getPrettyTime(date.getHours())}:${getPrettyTime(date.getMinutes())}:${getPrettyTime(date.getSeconds())} ${getPrettyTime(date.getDate())}.${getPrettyTime(date.getMonth())}.${date.getFullYear()}`;
    timeOnScreen.textContent = timeString;
};

const getPrettyTime = (stringTime) => {
    const _stringTime = stringTime.toString();
    if (_stringTime.length < 2) {
        return '0' + _stringTime;
    } else {
        return _stringTime;
    }
};

showTime();