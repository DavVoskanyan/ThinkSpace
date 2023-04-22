import '/front/assets/globalStyles/settingsOptionsStyles.css';

import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";
import WindowAlerter from "./WindowAlerter";

export default class SettingsOptions {
    #IMAGES_QUANTITY = 7;
    #currentUserAccount;

    #windowAlerterInstance;
    #ajaxSenderInstance;

    #parentElement;

    #selectedImageName;
    #newName;
    #newEmail;
    #newPassword;
    constructor(parentElement) {
        this.#parentElement = parentElement;
        this.#ajaxSenderInstance = new AjaxSender();
        this.#windowAlerterInstance = new WindowAlerter(document.querySelector('#rightSideBar'));

        (async () => {
            this.#currentUserAccount = await this.#ajaxSenderInstance.getUserAccount( parseInt(window.localStorage.getItem('userId')) )

            this.#createImageSelector(this.#currentUserAccount[0]['imageName']);
            this.#createInputs(
                this.#currentUserAccount[0]['userName'],
                this.#currentUserAccount[0]['userEmail'],
                this.#currentUserAccount[0]['userPassword']
            );
            this.#createThemeChanger();
            this.#createSubmitButton();
        })();
    }

    #createImageSelector(selectedImageName) {
        const mainContainer = document.createElement('div');
        mainContainer.id = 'imagesMainContainer';

        for(let i = 0; i < this.#IMAGES_QUANTITY; i++) {
            const imageSelector = document.createElement('div');
            imageSelector.classList.add('imageSelector');
            if(selectedImageName === `avatar_${i + 1}.jpg`) {
                this.#selectedImageName = `avatar_${i + 1}.jpg`;
                imageSelector.classList.add('selected');
            }

            const inSelectorImage = document.createElement('img');
            inSelectorImage.classList.add('inSelectorImage');
            inSelectorImage.src = `/front/assets/avatars/avatar_${i + 1}.jpg`;

            imageSelector.addEventListener('click', () => {
                mainContainer.querySelectorAll(':scope .selected')
                    .forEach(notSelected => notSelected.classList.remove('selected'));
                imageSelector.classList.add('selected');
                this.#selectedImageName = `avatar_${i + 1}.jpg`;
            })
            imageSelector.appendChild(inSelectorImage);
            mainContainer.appendChild(imageSelector);
        }
        this.#parentElement.appendChild(mainContainer);
    }
    #createInputs(userName, userEmail, userPassword) {
        const inputsContainer = document.createElement('div');
        inputsContainer.id = 'inputsContainer';

        const nameInput = document.createElement('input');
        nameInput.id = 'nameInput';
        nameInput.classList.add('settingsInput');
        nameInput.value = userName;
        this.#newName = userName;
        nameInput.placeholder = 'Name';
        nameInput.addEventListener('input', () => {
            nameInput.value = nameInput.value.trim();
            if(nameInput.value.length > 15) {
                nameInput.value = nameInput.value.substring(0, nameInput.value.length - 1);
            }
            this.#newName = nameInput.value;
        })

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'emailInput';
        emailInput.classList.add('settingsInput');
        emailInput.value = userEmail;
        this.#newEmail = userEmail;
        emailInput.placeholder = 'Email';
        emailInput.addEventListener("input", () => {
            emailInput.value = emailInput.value.trim();
            if(emailInput.value.length > 30) {
                emailInput.value = emailInput.value.substring(0, emailInput.value.length - 1);
            }
            this.#newEmail = emailInput.value;
        })

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'passwordInput';
        passwordInput.classList.add('settingsInput');
        passwordInput.value = userPassword;
        this.#newPassword = userPassword;
        passwordInput.placeholder = 'Password';
        passwordInput.addEventListener('input', () => {
            passwordInput.value = passwordInput.value.trim();
            if(passwordInput.value.length > 20) {
                passwordInput.value = passwordInput.value.substring(0, passwordInput.value.length - 1);
            }
            this.#newPassword = passwordInput.value;
        })
        inputsContainer.append(nameInput, emailInput, passwordInput);
        this.#parentElement.appendChild(inputsContainer);
    }

    #createThemeChanger() {
        const themeChanger = document.createElement('button');
        themeChanger.id = 'themeChanger';

        this.#parentElement.appendChild(themeChanger);
    }

    #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.id = 'submitChanges';
        submitButton.innerText = 'submit';

        submitButton.addEventListener('click', () => {
            if(!this.#newName.trim()) {
                this.#windowAlerterInstance.alertDivConstructor('error', 'Name cannot be empty');
            }
            if(!this.#newEmail.trim()) {
                this.#windowAlerterInstance.alertDivConstructor('error', 'Email cannot be empty');
            }
            if(!this.#newPassword.trim()) {
                this.#windowAlerterInstance.alertDivConstructor('error', 'Password cannot be empty');
            }
            if(this.#newName.trim() && this.#newEmail.trim() && this.#newPassword.trim()) {
                const userObject = {};

                userObject.userId = window.localStorage.getItem('userId');
                userObject.userName = this.#newName.trim();
                userObject.userEmail = this.#newEmail.trim();
                userObject.userPassword = this.#newPassword.trim();
                userObject.imageName = this.#selectedImageName.trim();

                const updateStatus = this.#ajaxSenderInstance.updateUserAccount(userObject);

                if(updateStatus) {
                    this.#windowAlerterInstance.alertDivConstructor('success', 'Updated Successfully');
                }
                else {
                    this.#windowAlerterInstance.alertDivConstructor('error', 'Something Has Gone Wrong');
                }
            }
        })

        this.#parentElement.appendChild(submitButton);
    }
}