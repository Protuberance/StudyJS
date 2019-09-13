window.addEventListener('DOMContentLoaded', function () {
    console.log('HI');
    let cube = document.getElementById('cube'),
        startPauseButton = document.getElementById('startPause'),
        resetButton = document.getElementById('reset'),
        indexRequestAnimation,
        isActive = false,
        count = 0;
    cube.style.left = 0 + 'px';
    cube.style.top = 0 + 'px';


    let start = function () {
        indexRequestAnimation = requestAnimationFrame(start);
        count++;

        if (count <= 100) {
            let newValue = parseInt(cube.style.left, 10) + 1;
            cube.style.left = newValue + 'px';
        } else if (count <= 200) {
            let newValue = parseInt(cube.style.top, 10) + 1;
            cube.style.top = newValue + 'px';
        } else if (count <= 300) {
            let newValue = parseInt(cube.style.left, 10) - 1;
            cube.style.left = newValue + 'px';
        } else if (count <= 400) {
            let newValue = parseInt(cube.style.top, 10) - 1;
            cube.style.top = newValue + 'px';
        } else {
            count = 0;
        }


    };

    let reset = function () {
        cancelAnimationFrame(indexRequestAnimation);
        cube.style.left = 0 + 'px';
        cube.style.top = 0 + 'px';
        count = 0;
        isActive = false;
    };
    let startPause = function () {
        if (isActive) {
            cancelAnimationFrame(indexRequestAnimation);
            isActive = false;
        } else {
            indexRequestAnimation = requestAnimationFrame(start);
            isActive = true;
        }
    };

    let getValueAttribute = function (stringValue) {
        let _stringValue
    }
    startPauseButton.addEventListener('click', startPause);
    resetButton.addEventListener('click', reset);
});