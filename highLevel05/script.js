'use strict'

const weekList = document.getElementById('weekList');

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var date = new Date();

for (let i = 0; i < week.length; i++) {
    if (i == date.getDay()) {
        console.log(week[i].bold());
        const day = document.createElement('p');
        day.innerHTML = week[i].bold();
        weekList.appendChild(day);
    } else if (i == 0 || i == 6) {
        console.log(week[i].italics());
        const day = document.createElement('p');
        day.innerHTML = week[i].italics();
        weekList.appendChild(day);

    } else {
        console.log(week[i]);
        const day = document.createElement('p');
        day.innerHTML = week[i];
        weekList.appendChild(day);
    }

}