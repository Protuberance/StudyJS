const command = () => {
    const command = document.querySelectorAll('.command .row img'),
        changePhoto = (event) => {
            let previousSource = event.target.getAttribute('src');
            event.target.setAttribute('src', event.target.dataset.img);
            event.target.dataset.img = previousSource;
        };

    command.forEach((elem) => {
        elem.addEventListener('mouseenter', changePhoto);
        elem.addEventListener('mouseleave', changePhoto);
    });
};

export default command;