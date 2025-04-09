const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    const currentClass = btn.getAttribute('class');

    if (currentClass === 'dark') {
        btn.getQuote('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
    });
