const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        caclCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    let total = 0;

    const coutnSum = () => {
        let dayValue = 1,
            countValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (+calcDay.value === 0 || squareValue === 0 || typeValue === 0 || +caclCount.value === 0) {
            return;
        }

        if (caclCount.value > 1) {
            countValue += (caclCount.value - 1) / 10;
        }

        if (calcDay && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        currentValue = 0;
        indexRequest = requestAnimationFrame(showResult);

        // totalValue.textContent = total;
    };

    let indexRequest,
        currentValue = 0;

    const showResult = () => {
        indexRequest = requestAnimationFrame(showResult);
        currentValue += 713;
        if (currentValue <= total) {
            totalValue.textContent = Math.floor(currentValue);
        } else {
            totalValue.textContent = Math.floor(total);
            cancelAnimationFrame(indexRequest);
        }
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
            coutnSum();
        }
    });
};

export default calc;