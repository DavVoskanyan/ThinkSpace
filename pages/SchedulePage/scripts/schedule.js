import '../styles/schedule.css';

import ModalController from "/assets/globalScripts/ModalController.js";
import Scheduler from "/assets/globalScripts/Scheduler.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";

/////////////////////////   I N I T I A L I Z I N G   W I N D O W   A L E R T E R   ////////////////////////

const windowAlerter = new WindowAlerter(document.querySelector('#rightSideBar'));
windowAlerter.alertDivConstructor('success', "It finally works!")

/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController('addNoteModal');
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );


////////////////////////   I I T I L I Z I N G   S C H E D U L E R   /////////////////////////

const scheduler = new Scheduler(document.querySelector('#schedulerMainContainer'));