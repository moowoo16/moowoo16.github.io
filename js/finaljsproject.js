const formContainer = document.getElementById('formContainer');
const message = document.getElementById('message');

for (let i = 0; i < 10; i++) {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('inputGroup');

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.disabled = true;
    input.dataset.index = i;

    const button = document.createElement('button');
    button.textContent = "Unlock";

    button.addEventListener('click', () => {
        unlockInput(input, button);
    });

    inputGroup.appendChild(input);
    inputGroup.appendChild(button);
    formContainer.appendChild(inputGroup);

    if (i === 2 || i === 5) {
        const dash = document.createElement('span');
        dash.textContent = '-';
        dash.style.margin = '10px';
        formContainer.appendChild(dash);
    }
}

function unlockInput(input, button) {
    input.disabled = false;
    input.focus();
    button.disabled = true;
    message.textContent = "You have 1 second to type!";

    const timer = setTimeout(() => {
        if (input.value === '') {
            input.disabled = true;
            button.disabled = false;
            message.textContent = "Too slow :( Try again!";
        } else {
            message.textContent = "KEEP GOING!";
        }
    }, 1000);

    input.addEventListener('input', () => {
        clearTimeout(timer);
        button.disabled = false;
    }, { once: true });
}