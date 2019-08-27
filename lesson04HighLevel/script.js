const ellips = function (textRow) {
    if ((typeof textRow) !== 'string') {
        alert('Вы ввели что-то отличное от строки, попробуйте еще раз');
    } else {
        textRow = textRow.trim();
        if (textRow.length > 30) {
            textRow = textRow.slice(0, 30);
            textRow += '...';
        }
        return textRow;
    }
}

console.log(ellips('         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu   '));
console.log(ellips(155));