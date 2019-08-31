'use strict'

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var date = new Date();

for (let i = 0; i < week.length; i++) {
    if (i == date.getDay()) {
        console.log(week[i].bold());
    } else if (i == 0 || i == 6) {
        console.log(week[i].italics());

    } else
        console.log(week[i]);

}