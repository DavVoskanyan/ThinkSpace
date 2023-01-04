import NotesWorker from "/assets/globalScripts/NotesWorker.js";
import NoteConverter from "/assets/globalScripts/NoteConverter.js";
import ModalController from "/assets/globalScripts/ModalController.js";
import IndexedDataBaseWorker from "/assets/globalScripts/IndexedDataBaseWorker.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";

//////////////////////////   A D D   N O T E S   F R O M   S T O R A G E   /////////////////////////////
const notesContainer = document.querySelector('.notesContainer');
const notesFromStorage = new NotesWorker();
const noteConverter = new NoteConverter();

notesFromStorage.getAllNotes().forEach(noteObject => {
  notesContainer.appendChild(noteConverter.objectToElement(noteObject));
})


//////////////////////////   N O T E - L I S T   V I E W   C H A N G E   B U T T O N S   ///////////////////////////////
const gridButton = document.querySelector('.gridView');
const barView = document.querySelector('.barView');
const notesList = document.querySelector('.notesContainer');

gridButton.addEventListener("click", () => {
    gridButton.classList.add('selected');
    barView.classList.remove('selected');

    notesList.classList.remove('notesList');
    notesList.classList.add('notesGrid');
});
barView.addEventListener("click", () => {
    barView.classList.add('selected');
    gridButton.classList.remove('selected');

    notesList.classList.remove('notesGrid');
    notesList.classList.add('notesList');
});




/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////
const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );



const submitButtonInModal = document.querySelector('.addNewNote');

submitButtonInModal.addEventListener('click', (e) => {
    e.preventDefault();
    notesFromStorage.addSingleNote(noteConverter.objectFromInputs(document.querySelector('#addNoteModal form')))
    newNoteModalController.closeModal();
})




let idb = new IndexedDataBaseWorker('ThinkSpace', 1);
console.log(idb.getAllObjects('notesStore'));


const alerter = new WindowAlerter(document.querySelector('#rightSideBar'));
alerter.alertDivConstructor("error", "This is a successful alert :)");
setTimeout(() => alerter.alertDivConstructor("success", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."), 2500)
