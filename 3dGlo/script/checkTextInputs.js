const checkTextInputs = () => {
    const telInputs = document.querySelectorAll('input');

    telInputs.forEach((elem) => {
        if (elem.placeholder === 'Ваше имя' || elem.placeholder === 'Ваше сообщение') {
            elem.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^А-ЯЁ\s]/i, '');
            });
        }
    });
};