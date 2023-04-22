import WindowAlerter from '/front/assets/globalScripts/WindowAlerter.js';

export default class AjaxSender {
    static BACK_SERVER_URL = 'http://localhost:3000';
    #windowAlerterInstance;

    constructor(alerterOff) {
        if(alerterOff) {
            this.#windowAlerterInstance = new WindowAlerter(document.querySelector('#rightSideBar'));
        }
    }
    async getUserAccount(userId) {
        let userInfo = {};
        await fetch(`${AjaxSender.BACK_SERVER_URL}/getUserAccount/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => userInfo = response);
        return userInfo;
    }
    async getAllNotesById(userId) {
        let notes = [];
        await fetch(`${AjaxSender.BACK_SERVER_URL}/getAllNotes/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => notes = response);
        return notes;
    }
    async addNewNote(noteObject) {
        let result;
        await fetch(`${AjaxSender.BACK_SERVER_URL}/setNewNote`, {
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
    async updateUserAccount(userObject) {
        let status;

        await fetch(`${AjaxSender.BACK_SERVER_URL}/updateUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        })
            .then(response => response.json())
            .then(response => status = response.status);

        return status;
    }
    async updateNote(noteObject) {
        let returnResponse = null;
        await fetch(`${AjaxSender.BACK_SERVER_URL}/updateNote/${noteObject['noteId']}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteObject)
        })
            .then(response => response.json())
            .then(response => returnResponse = response);
        return returnResponse;
    }

    async
}