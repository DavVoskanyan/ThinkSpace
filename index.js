if(window.localStorage.getItem('userId')) {
    window.location.href = '/front/pages/SchedulePage/schedule.html';
}



const signupSwitcher = document.querySelector('#signUpSwitcher');
const loginSwitcher = document.querySelector('#loginSwitcher');

function switchersOnclickFunction() { document.body.classList.toggle('registration'); }

signupSwitcher.addEventListener('click', switchersOnclickFunction );
loginSwitcher.addEventListener('click', switchersOnclickFunction );





document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('wrong');
        input.value = input.value.trim();
    });
})






const loginButton = document.querySelector('#loginPage .inContainerButton');
const signupButton = document.querySelector('#signupPage .inContainerButton');

loginButton.addEventListener('click', () => {
    const emailInput = document.querySelector('#loginEmailInput');
    const passwordInput = document.querySelector('#loginPasswordInput');

    if( !emailInput.value ) { emailInput.classList.add('wrong'); }
    if( !passwordInput.value ) { passwordInput.classList.add('wrong'); }
    if( emailInput.value && passwordInput.value ) {
        fetch(`http://localhost:3000/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailInput.value, password: passwordInput.value}),
        })
            .then(response => response.json())
            .then(response => {
                if(response[0]) {
                    window.localStorage.setItem('userId', response[0]['userId'].toString());
                    window.location.href = '/front/pages/SchedulePage/schedule.html';
                }
                else {
                    document.querySelectorAll('#loginPage input').forEach(input => input.classList.add('wrong'));
                }
            })
    }
})

signupButton.addEventListener('click', () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const nameInput = document.querySelector('#signupNameInput');
    const emailInput = document.querySelector('#signupEmailInput');
    const passwordInput = document.querySelector('#signupPasswordInput');

    if( !nameInput.value ) { nameInput.classList.add('wrong') }
    if( !emailInput.value || !emailRegex.test(emailInput.value)) { emailInput.classList.add('wrong') }
    if( !passwordInput.value ) { passwordInput.classList.add('wrong') }
    if( nameInput.value && emailInput.value && emailRegex.test(emailInput.value) && passwordInput.value) {
        fetch(`http://localhost:3000/signupUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            })
        })
            .then(response => response.json())
            .then(response => {
                if(response['isMailUsed']) {
                    emailInput.classList.add('wrong');
                }
                else {
                    window.localStorage.setItem('userId', response['userId'].toString());
                    window.location.href = '/front/pages/SchedulePage/schedule.html';
                }
            })
    }
})