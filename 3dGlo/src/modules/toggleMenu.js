const toggleMenu = () => {
    // const behindMenu = document.createElement('div'),
    const menu = document.querySelector('menu'),
        btnMenu = document.querySelector('.menu');
    // behindMenu.style.cssText = `opacity: 1;
    // display: block;
    // position: fixed;
    // left: -100%;
    // top: 0;
    // bottom: 0;
    // width: 100%;
    // height: 100%;
    // z-index: 9;
    // background-color: rgba(0, 0, 0, .5);`;
    // behindMenu.classList.add('behindMenu');
    // menu.appendChild(behindMenu, null);

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
    document.body.addEventListener('click', closeMenu);
    menu.addEventListener('click', menuListener);
    btnMenu.addEventListener('click', switchStateMenu);
};

export default toggleMenu;