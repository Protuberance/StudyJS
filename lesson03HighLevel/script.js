'use strict'
let lang;
const map = {
    ru: 0,
    en: 1
}
const days = [
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
];
let column;

let succes = false;
while (!succes) {
    lang = prompt('Введите идентификатор языковой среды (\'ru\' или \'en\')');
    if (lang === 'ru' || lang === 'en')
        succes = true;
    else {
        alert('Что то пошло не так');
    }
}

//#region variant with if
if (lang === 'ru')
    column = 0;
else
    column = 1;

for (let i = 0; i < days[column].length; i++) {
    console.log(days[column][i]);
}
//#endregion 
//#region variant with switch-case
switch (lang) {
    case 'ru':
        column = 0;
        break;
    case 'en':
        column = 1;
        break;
}

for (let i = 0; i < days[column].length; i++) {
    console.log(days[column][i]);
}
//#endregion 
//#region variant without if and switch-case
for (let i = 0; i < days[map[lang]].length; i++) {
    console.log(days[map[lang]][i]);
}
//#endregion 

let namePerson;
namePerson = prompt('Как вас зовут?');
console.log(namePerson === 'Артем' ? 'директор' : (namePerson === 'Максим' ? 'преподаватель' : 'студент'));