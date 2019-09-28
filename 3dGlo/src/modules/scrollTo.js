const scrollTo = (event) => {
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

export default scrollTo;