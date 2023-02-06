import ModalController from "/assets/globalScripts/ModalController.js";
import IndexedDatabaseWorker from "/assets/globalScripts/IndexedDatabaseWorker.js";


/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );

