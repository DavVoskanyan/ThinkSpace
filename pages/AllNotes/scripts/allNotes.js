import '../styles/allNotes.css';

import ModalController from "/assets/globalScripts/ModalController.js";
import IndexedDatabaseWorker from "/assets/globalScripts/IndexedDatabaseWorker.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";
import DatePicker from "/assets/globalScripts/DatePicker.js";
import NotesView from "/assets/globalScripts/NotesView.js";


//////////////////////////   A D D   N O T E S   F R O M   I N D E X E D - D B   /////////////////////////////
const notesContainer = new NotesView(document.querySelector("#mainContent"), true);


/////////////////////////   I N I T I A L I Z I N G   W I N D O W   A L E R T E R   ////////////////////////
const windowAlerter = new WindowAlerter(document.querySelector('#rightSideBar'));
windowAlerter.alertDivConstructor('success', "It finally works!")


/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////
const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );


const submitButtonInModal = document.querySelector('.addNewNote');

submitButtonInModal.addEventListener('click', (e) => {
     newNoteModalController.closeModal();
})
