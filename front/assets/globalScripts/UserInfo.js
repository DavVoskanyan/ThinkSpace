import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";

export default class UserInfo {

    #ajaxSenderInstance;

    #parentElement;
    #userInfo;
    #notes;
    constructor(parentElement) {
        this.#parentElement = parentElement;
        this.#ajaxSenderInstance = new AjaxSender();

        (async () => {
            this.#userInfo = await this.#ajaxSenderInstance.getUserAccount(
                window.localStorage.getItem('userId')
            )
            this.#notes = await this.#ajaxSenderInstance.getAllNotesById(
                window.localStorage.getItem('userId')
            )

            let actual = 0, expired = 0;
            this.#notes.forEach(noteObject => {
                if(!noteObject['noteForDate']) { return; }
                if(new Date(noteObject['noteForDate']).getTime() < new Date()) { expired++; }
                else { actual++; }
            })


            this.#parentElement.insertBefore(
                this.#createNotesInfo( actual, expired ),
                this.#parentElement.firstChild
            )
            this.#parentElement.insertBefore(
                document.createElement('hr'),
                this.#parentElement.firstChild
            )
            this.#parentElement.insertBefore(
                this.#createUserInfoContainer(this.#userInfo[0]['userName'], this.#userInfo[0]['imageName']),
                this.#parentElement.firstChild
            )
        })();


    }

    #createUserInfoContainer(userName, userImageName) {
        const nameAndAvatarContainer = document.createElement('div');
        nameAndAvatarContainer.classList.add('nameAndAvatar');
        nameAndAvatarContainer.innerHTML = `
                                            <div class="welcome">
                                                <span>Hello,</span>
                                                <span class="userName">${userName}</span>
                                            </div>
                                            <img class="userAvatar" src="/front/assets/avatars/${userImageName}" alt="">`;
        return nameAndAvatarContainer;
    }

    #createNotesInfo(actual, expired) {
        const numbersContainer = document.createElement('div');
        numbersContainer.classList.add('infoBlocksContainer');

        const numbersArray = [this.#notes.length, actual, expired, this.#notes.length - actual - expired];
        const blockTitlesArray = ['all', 'actual', 'expired', 'undated'];

        for(let i = 0; i < numbersArray.length; i++) {
            numbersContainer.innerHTML += `<div class="infoBlock">
                                              <div class="blockTitle">${blockTitlesArray[i]}</div>
                                              <div class="blockInfoContainer">
                                                  <div class="coloredBorder"></div>
                                                  <span class="numericInfo">${numbersArray[i]}</span>
                                              </div>
                                          </div>`;
        }

        return numbersContainer;
    }
}