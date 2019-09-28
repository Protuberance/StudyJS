const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMesasge = 'Загрузка...',
        successMesage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1'),
        popUpForm = document.getElementById('form3'),
        contactForm = document.getElementById('form2');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    const formHandler = (event) => {
        event.preventDefault();
        event.target.appendChild(statusMessage);
        // statusMessage.textContent = loadMesasge;
        loadImage(statusMessage);

        const inputs = event.target.querySelectorAll('input');
        inputs.forEach(item => {
            item.value = '';
        });

        const formData = new FormData(event.target);
        let body = {};

        formData.forEach((key, value) => {
            body[key] = value;
        });
        postData(body)
            .then(function(response){
                if (response.status !== 200) {
                    throw new Error('Status network is not 200');
                }
                statusMessage.textContent = successMesage;
            }).catch(function(error){
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    };

    const loadImage = (container) => {
        container.textContent = '';
        const img = document.createElement('img');
        img.setAttribute('src', './images/loading/circle-loading-animation.gif');
        img.style.cssText = `max-width: 100px`;
        container.appendChild(img);
    }

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.addEventListener('submit', formHandler);
    popUpForm.addEventListener('submit', formHandler);
    contactForm.addEventListener('submit', formHandler);
};

export default sendForm;