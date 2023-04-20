import '../styles/settings.css';

import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";


/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'settings');

/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewNote');

addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );
