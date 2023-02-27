import '../styles/schedule.css';

import ModalController from "/assets/globalScripts/ModalController.js";
import Scheduler from "/assets/globalScripts/Scheduler.js";


/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );


////////////////////////   I I T I L I Z I N G   S C H E D U L E R   /////////////////////////

const scheduler = new Scheduler(document.querySelector('#schedulerMainContainer'));