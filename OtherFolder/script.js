window.addEventListener('DOMContentLoaded', function () {
    'use strict'
    let content = document.getElementById('content'),
        dateNow = new Date(),
        hours = dateNow.getHours(),
        minutes = dateNow.getMinutes(),
        seconds = dateNow.getSeconds(),
        newYear = new Date('1 january 2020'),
        week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let timeToNewYear = Math.floor((newYear.getTime() - dateNow.getTime()) / 1000 / 60 / 60 / 24);
    console.log(timeToNewYear);

    function getPartOfDay() {
        if (hours <= 9 || hours >= 5)
            return 'утро';
        else if (hours < 17)
            return 'день';
        else if (hours <= 23)
            return 'утро';
    };

    function getPrettyTime(stringTime) {
        let _stringTime = stringTime.toString();
        if (_stringTime.length < 2)
            return '0' + _stringTime;
        else return _stringTime;
    };

    let text = `Добрый ${getPartOfDay()}</br>
Сегодня: ${week[dateNow.getDay()]}</br>
Текущее время:${getPrettyTime(hours)}:${getPrettyTime(minutes)}:${getPrettyTime(seconds)} ${hours >= 12? 'PM':'AM'}</br>
До нового года осталось ${timeToNewYear} дней
`;

    content.innerHTML = text;
})