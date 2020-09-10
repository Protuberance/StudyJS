const slider = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content'),
        btn = document.querySelectorAll('.portfolio-btn'),
        dotsContainer = slider.querySelector('ul');


    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.className = 'dot';
        if (i === 0) {
            dot.classList.add('dot-active');
        }
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');


    let currentSlide = 0,
        interval;

    const nextSlide = (elem, index, clasName) => {
        elem[index].classList.add(clasName);
    };
    const previousSlide = (elem, index, clasName) => {
        elem[index].classList.remove(clasName);
    };

    const autoPlay = () => {
        previousSlide(slides, currentSlide, 'portfolio-item-active');
        previousSlide(dots, currentSlide, 'dot-active');

        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');

    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

        previousSlide(slides, currentSlide, 'portfolio-item-active');
        previousSlide(dots, currentSlide, 'dot-active');

        if (event.target.matches('#arrow-right')) {
            currentSlide++;
        } else if (event.target.matches('#arrow-left')) {
            currentSlide--;
        } else if (event.target.matches('.dot')) {
            dots.forEach((element, index) => {
                if (element === event.target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    });

    const startSlide = (time = 2000) => {
        interval = setInterval(autoPlay, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });
    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
        }
    });


    startSlide();
};

export default slider;