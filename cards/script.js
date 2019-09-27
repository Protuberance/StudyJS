window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const catContainer = document.getElementById('catsContainer'),
        dogsContainer = document.getElementById('dogsContainer'),
        getCat = document.getElementById('getCat'),
        getDog = document.getElementById('getDog');

    const getSource = (event) => {
        const element = event.target;
        const url = element.dataset.src;

        fetch(url)
            .then((response) => {
                return response.json();
                // console.log(resultData);
            }).then((data) => {
                const src = data[Object.keys(data)[0]],
                    format = src.slice(src.lastIndexOf('.') + 1).toLowerCase();
                let tag;
                console.log(format);

                if (format === 'jpg' || format === 'jpeg' || format === 'gif' || format === 'png') {
                    tag = 'img';
                } else {
                    tag = 'iframe';
                }

                const img = document.createElement(tag);

                img.setAttribute('src', src);
                img.style.cssText = `width:250px;`;
                element.previousElementSibling.textContent = '';
                element.previousElementSibling.appendChild(img);


            }).catch((error) => {
                console.log(error);
            });

    };

    getCat.addEventListener('click', getSource);
    getDog.addEventListener('click', getSource);

});