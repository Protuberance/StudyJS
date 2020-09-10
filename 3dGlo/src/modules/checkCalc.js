const checkCalc = () => {
    const inputs = document.querySelectorAll('.calc-block input');
    inputs.forEach((elem) => {
        elem.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[\D]+/, '');
        });
    });
};

export default checkCalc;