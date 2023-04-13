import '../styles/schedule.css';

import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";
import Scheduler from "/front/assets/globalScripts/Scheduler.js";
import WindowAlerter from "/front/assets/globalScripts/WindowAlerter.js";


/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
const sidebar = new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'scheduler');

/////////////////////////   I N I T I A L I Z I N G   W I N D O W   A L E R T E R   ////////////////////////

const windowAlerter = new WindowAlerter(document.querySelector('#rightSideBar'));
windowAlerter.alertDivConstructor('success', "It finally works!")

/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewThought');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );


////////////////////////   I I T I L I Z I N G   S C H E D U L E R   /////////////////////////

const scheduler = new Scheduler(document.querySelector('#schedulerMainContainer'));