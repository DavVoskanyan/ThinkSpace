if(!window.localStorage.getItem('userId')) {
    window.location.href = '/index.html';
}



import '../styles/settings.css';

import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";
import SettingsOptions from "/front/assets/globalScripts/SettingsOptions.js";
import UserInfo from "/front/assets/globalScripts/UserInfo.js";



////////////////   I N I T I A L I Z I N G   U S E R - I N F O   S I D E B A R   /////////////////////
new UserInfo(document.querySelector('#rightSideBar'));

/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'settings');

/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewNote');

addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );

new SettingsOptions(document.querySelector('#mainContent'));