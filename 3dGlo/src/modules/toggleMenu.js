const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        btnMenu = document.querySelector('.menu'),
        nextScrrenBtn = document.querySelector('main>a');

    const switchStateMenu = () => {
        menu.classList.toggle('active-menu');
    };
    const closeMenu = (event) => {
        if (!event.target.closest('menu') && !event.target.closest('.menu')) {
            menu.classList.remove('active-menu');
        }
    };
    const menuListener = (event) => {
        if (event.target.classList.contains('close-btn')) {
            switchStateMenu();
        } else if (event.target.tagName.toLowerCase() === 'li' || event.target.tagName.toLowerCase() === 'a') {
            scrollTo(event);
            switchStateMenu();
        } else if (event.target.classList.contains('behindMenu')) {
            switchStateMenu();
        }
    };
    const scrollTo = () => {
        event.preventDefault();
        let scrollToElementName,
            eventTargetTag = event.target.tagName;

        if (eventTargetTag.toLowerCase() === 'a') {
            scrollToElementName = event.target.getAttribute('href');
        } else if (eventTargetTag.toLowerCase() === 'li') {
            scrollToElementName = event.target.querySelector('a').getAttribute('href');
        } else if (eventTargetTag.toLowerCase() === 'img') {
            scrollToElementName = event.target.parentElement.getAttribute('href');
        }
        scrollToElementName = scrollToElementName.substring(1);

        let scrollToElement = document.getElementById(scrollToElementName),
            scrollToTopValue = scrollToElement.offsetTop,
            indexScrollAnimation,
            currentScrollTop = document.documentElement.scrollTop;

        function scrollAnimation() {
            indexScrollAnimation = requestAnimationFrame(scrollAnimation);
            document.documentElement.scrollTop = currentScrollTop;
            if (currentScrollTop >= scrollToTopValue) {
                cancelAnimationFrame(indexScrollAnimation);
                document.documentElement.scrollTop = scrollToTopValue;
            }
            currentScrollTop += 100;
        }
        indexScrollAnimation = requestAnimationFrame(scrollAnimation);
    };


    nextScrrenBtn.addEventListener('click', scrollTo);
    document.body.addEventListener('click', closeMenu);
    menu.addEventListener('click', menuListener);
    btnMenu.addEventListener('click', switchStateMenu);
};

export default toggleMenu;