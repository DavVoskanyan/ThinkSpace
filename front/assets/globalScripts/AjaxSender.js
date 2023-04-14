import WindowAlerter from '/front/assets/globalScripts/WindowAlerter.js';

export default class AjaxSender {
    #BACK_SERVER_URL = 'http://localhost:3000';
    #windowAlerterInstance;

    constructor() {
        this.#windowAlerterInstance = new WindowAlerter(document.querySelector('#rightSideBar'));
    }

    async getAllNotesById(userId) {
        let notes = [];
        await fetch(`${this.#BACK_SERVER_URL}/getAllNotes/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => notes = response);
        return notes;
    }
    async addNewNote(noteObject) {
        let result;
        await fetch(`${this.#BACK_SERVER_URL}/setNewNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteObject),
        })
            .then(response => response.json())
            .then(response => {
                if(response && response['status']) {
                    this.#windowAlerterInstance.alertDivConstructor('success', 'New note is successfully added')
                } else {
                    this.#windowAlerterInstance.alertDivConstructor('error', 'Something went wrong...')
                }
                result = response;
            });
        return result;
    }
}