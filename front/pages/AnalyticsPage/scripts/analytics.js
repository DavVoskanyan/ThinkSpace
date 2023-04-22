import "../styles/analytics.css";


import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";
import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import UserInfo from "/front/assets/globalScripts/UserInfo.js";
import WindowAlerter from "/front/assets/globalScripts/WindowAlerter.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";
import NumbersAnimator from "/front/assets/globalScripts/NumbersAnimator.js";
import GraphCreator from "/front/assets/globalScripts/GraphCreator.js";


const userId = parseInt(window.localStorage.getItem('userId'));
const currentDate = new Date();
let allNotes;

if(!userId) { window.location.href = '/index.html' }


////////////////   I N I T I A L I Z I N G   U S E R - I N F O   S I D E B A R   /////////////////////
new UserInfo(document.querySelector('#rightSideBar'));


/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'analytics');

//   I N I T I A L I Z I N G   A J A X - S E N D E R
const ajaxSenderInstance = new AjaxSender();

//   I N I T I A L I Z I N G   W I N D O W   A L E R T E R
new WindowAlerter(document.querySelector('#rightSideBar'));



// //   I N I T I A L I Z I N G   M O D A L - C O N T R O L L E R

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewNote');

newNoteModalController.dynamicAddingMethod = noteObject => {
    const noteObjectDate = noteObject['noteForDate']
        ? new Date(noteObject['noteForDate'])
        : null;

    const allNotesContainer = document.querySelector('#allNotesNumberContainer .number');
    const actualNotesContainer = document.querySelector('#actualNotesNumberContainer .number');
    const expiredNotesContainer = document.querySelector('#expiredNotesNumberContainer .number');
    const undatedNotesContainer = document.querySelector('#undatedNotesNumberContainer .number');


    allNotesContainer.innerText = parseInt(allNotesContainer.innerText) + 1;
    if(!noteObjectDate) {undatedNotesContainer.innerText = parseInt(undatedNotesContainer.innerText) + 1}
    else if(noteObjectDate.getTime() < currentDate.getTime()) {expiredNotesContainer.innerText = parseInt(expiredNotesContainer.innerText) + 1}
    else {actualNotesContainer.innerText = parseInt(actualNotesContainer.innerText) + 1}
};

addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );

//   I N I T I A L I Z I N G   N U M B E R S - A N I M A T O R

(new Promise(async resolve => {
    allNotes = await ajaxSenderInstance.getAllNotesById(userId);
    resolve();
})
        .then(() => {
            let actualNotesQuantity = 0, expiredNotesQuantity = 0;
            allNotes.forEach(note => {
                if(!note.noteForDate) { return null; }
                if(new Date(note.noteForDate).getTime() < currentDate.getTime()) { expiredNotesQuantity++; }
                else { actualNotesQuantity++; }
            })

            NumbersAnimator.increaseAnimate(0, allNotes.length, document.querySelector('#allNotesNumberContainer .number'));
            NumbersAnimator.increaseAnimate(0, actualNotesQuantity, document.querySelector('#actualNotesNumberContainer .number'));
            NumbersAnimator.increaseAnimate(0, expiredNotesQuantity, document.querySelector('#expiredNotesNumberContainer .number'));
            NumbersAnimator.increaseAnimate(0, allNotes.length - actualNotesQuantity - expiredNotesQuantity, document.querySelector('#undatedNotesNumberContainer .number'));
        })
        .then(() => {
            const valuesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                allNotes.forEach(noteObject => {
                    for(let i = 0; i < 12; i++) {
                        const compareDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                        const noteObjectDate = new Date(noteObject['noteCreationDate']);

                        if(compareDate.getFullYear() === noteObjectDate.getFullYear() && compareDate.getMonth() === noteObjectDate.getMonth()) {
                            valuesArray[i]++;
                        }
                    }
                })


            //   I N I T I A L I Z I N G   G R A P H - C R E A T O R

            new GraphCreator(document.querySelector('#canvasContainer'), valuesArray.reverse());
        })
);

