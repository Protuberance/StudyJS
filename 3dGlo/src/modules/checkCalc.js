const checkCalc = () => {
    const inputs = document.querySelectorAll('.calck-block input');
    inputs.forEach((elem) => {
        elem.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/, '');
        });
    });
};

export default checkCalc;