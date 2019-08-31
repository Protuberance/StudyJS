'use strict'

let arr = [];

arr[0] = '245674';
arr[1] = '475644';

for (let i = 2; i < 7; i++) {
    arr[i] = Math.floor((Math.random() * 10000)).toString();
}

for (let i = 0; i < arr.length; i++) {
    if (arr[i].substr(0, 1) === '2' || arr[i].substr(0, 1) === '4')
        console.log(arr[i]);
}

let simpledigitals = ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29', '31', '37', '41', '43', '47', '53', '59', '61', '67', '71', '73', '79', '83', '89', '97'];

for (let i = 0; i < simpledigitals.length; i++) {
    console.log(simpledigitals[i] +
        ' - Делители этого числа: 1 и ' + simpledigitals[i]);;

}