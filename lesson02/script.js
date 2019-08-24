const num = 266219;

const strNum = num.toString();
let multiNum = 1;

for (let i = 0; i < strNum.length; i++) {
    multiNum *= +strNum[i];
}

console.log(multiNum);

const powResult = (multiNum**3).toString();
console.log(powResult.substr(0,2));