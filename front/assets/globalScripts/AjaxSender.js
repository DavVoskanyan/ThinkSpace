import WindowAlerter from '/front/assets/globalScripts/WindowAlerter.js';

export default class AjaxSender {
    #BACK_SERVER_URL = 'http://localhost:3000';
    #windowAlerterInstance;

    constructor() {
        this.#windowAlerterInstance = new WindowAlerter(document.querySelector('#rightSideBar'));
    }

    async getAllNotesById(userId) {
        let notes = null;
        await fetch(`${this.#BACK_SERVER_URL}/getAllNotes/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => notes = response);
        console.log(notes);
    }
    addNewNote(noteObject) {
        fetch(`${this.#BACK_SERVER_URL}/setNewNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteObject),
        })
            .then(response => response.json())
            .then(response => {
                if(response && response['status']) {
                    console.log(response);
                    this.#windowAlerterInstance.alertDivConstructor('success', 'New note is successfully added')
                }
            });
    }
}