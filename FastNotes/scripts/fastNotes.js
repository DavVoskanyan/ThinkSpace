import ModalController from "/assets/globalScripts/ModalController.js";
import IndexedDataBaseWorker from "/assets/globalScripts/IndexedDataBaseWorker.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";
import DatePicker from "/assets/globalScripts/DatePicker.js";
import NotesView from "/assets/globalScripts/NotesView.js";

//////////////////////////   A D D   N O T E S   F R O M   I N D E X E D - D B   /////////////////////////////
const notesContainer = new NotesView(document.querySelector("#mainContent"), true);
notesContainer.addNewNote('Hello World 1', "Lorem Ipsum dolor sit amet", new Date());
notesContainer.addNewNote('Hello World 2', "Lorem Ipsum dolor sit sequel", new Date());
notesContainer.addNewNote('Hello World 3', "Lorem Ipsum dolor sit amet", new Date());
notesContainer.addNewNote('Hello World 4', "Lorem Ipsum dolor sit sequel", new Date());
notesContainer.addNewNote('Hello World 5', "Lorem Ipsum dolor sit amet", new Date());
notesContainer.addNewNote('Hello World 6', "Lorem Ipsum dolor sit sequel", new Date());




/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////
const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );



const submitButtonInModal = document.querySelector('.addNewNote');

submitButtonInModal.addEventListener('click', (e) => {

})




