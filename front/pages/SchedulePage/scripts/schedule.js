import '../styles/schedule.css';

import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";
import Scheduler from "/front/assets/globalScripts/Scheduler.js";
import WindowAlerter from "/front/assets/globalScripts/WindowAlerter.js";
import UserInfo from "/front/assets/globalScripts/UserInfo.js";



////////////////   I N I T I A L I Z I N G   U S E R - I N F O   S I D E B A R   /////////////////////
new UserInfo(document.querySelector('#rightSideBar'));

/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'scheduler');

/////////////////////////   I N I T I A L I Z I N G   W I N D O W   A L E R T E R   ////////////////////////

new WindowAlerter(document.querySelector('#rightSideBar'));

/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewNote');
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );


////////////////////////   I I T I L I Z I N G   S C H E D U L E R   /////////////////////////

new Scheduler(document.querySelector('#schedulerMainContainer'), newNoteModalController);