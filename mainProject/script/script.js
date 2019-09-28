const wrapper = document.getElementById('wrapper'),
    button = document.getElementById('button'),
    colorText = document.getElementById('colorText');
colorText.textContent = '******';

const letters = '0123456789ABCDEF';
button.addEventListener('click', () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    colorText.textContent = color;
    wrapper.style.backgroundColor = color;
})