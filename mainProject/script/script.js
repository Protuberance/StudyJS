const start = document.getElementById('start'),
    buttons = document.getElementsByTagName('button'),
    incomePlus = buttons[0],
    expensesPlus = buttons[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.querySelector('#cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 5000000;
        this.expenses = {};
    }
    start() {

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getInfoDepost();
        this.getBudget();
        this.getAddField(additionalExpensesItem, this.addExpenses, true);
        this.getAddField(additionalIncomeItem, this.addIncome, false);

        this.showResult();
        this.setCalculatedState();
    }
    showResult() {
        let _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function (event) {
            incomePeriodValue.value = _this.calcPeriod();
        });
        this.saveCookies();
    }
    reset() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 5000000;
        this.expenses = {};
        periodAmount.textContent = 1;

        let inputs = document.querySelectorAll('input');
        inputs.forEach(element => {
            if (element.type === 'text') {
                element.value = '';
            }
            if (element.type === 'range')
                element.value = 1;
            if (element.type === 'checkbox')
                element.checked = false;
        });
        inputs = document.querySelectorAll('.data input[type=text]');
        inputs.forEach(element => {
            element.removeAttribute('disabled');
        });

        start.setAttribute('style', 'display:block');
        start.setAttribute('disabled', 'true');
        cancel.setAttribute('style', 'display:none');

        this.clearAllStorage();
    }
    addBlock(items, button) {
        return function () {
            let cloneItem = items[0].cloneNode(true);
            cloneItem.querySelectorAll('input').forEach((item) => {
                item.value = '';
            });
            items[0].parentNode.insertBefore(cloneItem, button);

            items = document.querySelectorAll(`.${items[0].classList.item(0)}`);
            if (items.length === 3) {
                button.style.display = 'none';
            }
        };
    }
    rangeListener(event) {
        periodAmount.textContent = event.target.value;
    }
    getExpenses() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '')
                this.expenses[itemExpenses] = cashExpenses;
        });
    }
    getIncome() {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '')
                this.income[itemIncome] = cashIncome;
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddField(addedItems, arrayToAdd, toSplit) {
        let items;

        if (toSplit) {
            items = addedItems.value.split(',')
        } else {
            items = addedItems;
        }

        items.forEach((item) => {
            let itemValue = toSplit === true ? item.trim() : item.value.trim();
            if (itemValue !== '')
                arrayToAdd.push(itemValue);
        });
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        this.period = Math.ceil(targetAmount.value / this.budgetMonth);
        if (this.period < 0) {
            return 'Цель не будет достигнута';
        } else
            return 'Вы накопите ' + targetAmount.value + ' за ' + this.period + ' месяцев';
    }
    getStatusIncome() {
        if (this.budgetDay >= 800)
            console.log('Высокий уровень дохода');
        else if (this.budgetDay >= 300 && this.budgetDay < 800)
            console.log('Средний уровень дохода');
        else if (this.budgetDay > 0 && this.budgetDay < 300)
            console.log('Низкий уровень дохода');
        else if (this.budgetDay <= 0)
            console.log('Что то пошло не так');
    }
    getInfoDepost() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    checkLetters(event) {
        if (event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            let pattern = /^[а-я.,?!]+$/i;
            if (!pattern.test(event.key)) {
                event.preventDefault();
            }
        }
    }
    checkNumber(event) {
        if (event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            let pattern = /^[0-9]+$/i;
            if (!pattern.test(event.key)) {
                event.preventDefault();
            }
        }
    }
    eventsListeners() {
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addBlock(expensesItems, expensesPlus));
        incomePlus.addEventListener('click', this.addBlock(incomeItems, incomePlus));
        periodSelect.addEventListener('change', this.rangeListener);
        salaryAmount.addEventListener('keyup', function (event) {
            if (this.value !== '')
                start.removeAttribute('disabled');
            else
                start.setAttribute('disabled', 'true');
        });
        let textInputs = document.querySelectorAll('input');
        textInputs.forEach(element => {
            if (element.placeholder === 'Наименование') {
                element.addEventListener('keydown', this.checkLetters);
            } else if (element.placeholder === 'Сумма')
                element.addEventListener('keydown', this.checkNumber);
        });
    }
    saveCookies() {
        const inputs = document.querySelector('.result').querySelectorAll('input');

        inputs.forEach((element) => {
            const title = element.previousElementSibling.textContent;
            const cooka = title + '=' + element.value + ';max-age=3600';
            document.cookie = cooka;
            localStorage.setItem(title, element.value);
        });

        document.cookie = 'isLoaded=true';
    }
    tryUploadCookies() {
        const inputs = document.querySelector('.result').querySelectorAll('input');
        let success = true;
        inputs.forEach((element) => {
            let savedValue = this.getCookie(element.previousElementSibling.textContent);
            if (savedValue === undefined || savedValue !== localStorage.getItem(element.previousElementSibling.textContent)) {
                success = false;
            } else {
                element.value = savedValue;
            }
        });
        if (success) {
            this.setCalculatedState();
        } else {
            this.clearAllStorage();
            this.reset();
        }
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    checkSavedCookies() {
        const isLoaded = this.getCookie('isLoaded');
        if (isLoaded === 'true') {
            this.tryUploadCookies();
        }
    }
    setCalculatedState() {
        let inputs = document.querySelectorAll('.data input');
        inputs.forEach(element => {
            if (element.getAttribute('type') === 'text')
                element.setAttribute('disabled', 'true');
        });
        start.setAttribute('style', 'display:none');
        cancel.setAttribute('style', 'display:block');
    }
    clearAllStorage() {
        const inputs = document.querySelector('.result').querySelectorAll('input');

        inputs.forEach((element) => {
            const title = element.previousElementSibling.textContent;
            const cooka = title + '=' + ';max-age=0';
            document.cookie = cooka;
        });

        document.cookie = 'isLoaded=false';
        localStorage.clear();
    }
};

depositCheck.addEventListener('change', function () {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = 'true';
        depositBank.addEventListener('change', function () {
            let selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }

        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        appData.deposit = 'false';
    }
});

const appData = new AppData();
appData.eventsListeners();
appData.checkSavedCookies();