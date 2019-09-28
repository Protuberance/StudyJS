const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popUpBtns = document.querySelectorAll('.popup-btn');

    let animationIndex,
        opacity = 0;
    const openPopUp = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            popUp.style.display = 'block';
        } else {
            popUp.style.opacity = opacity;
            popUp.style.display = 'block';
            animationIndex = requestAnimationFrame(animationClose);
        }
    };
    const animationClose = () => {
        animationIndex = requestAnimationFrame(animationClose);

        popUp.style.opacity = opacity;
        opacity += 0.1;
        if (opacity >= 1) {
            cancelAnimationFrame(animationIndex);
        }
    };

    popUpBtns.forEach((element) => {
        element.addEventListener('click', openPopUp);
    });

    popUp.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default togglePopUp;