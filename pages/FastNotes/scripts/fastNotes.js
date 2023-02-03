import ModalController from "/assets/globalScripts/ModalController.js";
import IndexedDatabaseWorker from "/assets/globalScripts/IndexedDatabaseWorker.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";
import DatePicker from "/assets/globalScripts/DatePicker.js";
import NotesView from "/assets/globalScripts/NotesView.js";


window.addEventListener('load', async () => {

//////////////////////////   A D D   N O T E S   F R O M   I N D E X E D - D B   /////////////////////////////
    const notesContainer = new NotesView(document.querySelector("#mainContent"), true);
    let notesFromDB = await IndexedDatabaseWorker.getAllObjectsFromStore('notesStore');
    notesFromDB.forEach(noteObject => {
        console.log(noteObject);
    });



/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////
    const newNoteModalController = new ModalController('addNoteModal');
    const addNewNoteButton = document.querySelector('button.addNewThought');
    addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );



    const submitButtonInModal = document.querySelector('.addNewNote');

    submitButtonInModal.addEventListener('click', (e) => {
        IndexedDatabaseWorker.setNewObject('notesStore', {id: 1, title: "From Code Title", text: 'From Code Text', date: new Date()})
    })
})