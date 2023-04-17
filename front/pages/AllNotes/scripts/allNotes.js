import '../styles/allNotes.css';

import SideBarCreator from "/front/assets/globalScripts/SideBarCreator.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";
import WindowAlerter from "/front/assets/globalScripts/WindowAlerter.js";
import NotesView from "/front/assets/globalScripts/NotesView.js";
import DatePicker from "/front/assets/globalScripts/DatePicker.js";
import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";


/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
const sidebar = new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'all notes');


//////////////////////////   A D D   N O T E S   F R O M   I N D E X E D - D B   /////////////////////////////
const notesContainer = new NotesView(document.querySelector("#mainContent"), true, true, true);
const ajaxSender = new AjaxSender();
(async() => {
     const allNotes = await ajaxSender.getAllNotesById(
         window.localStorage.getItem('userId')
     )
     allNotes.forEach(noteObject => {
          NotesView.addNewNote({
              noteId: noteObject['noteId'],
              noteTitle: noteObject['noteTitle'],
              noteText: noteObject['noteText'],
              noteForDate: (noteObject['noteForDate'] ? new Date(noteObject['noteForDate']) : null),
              userId: noteObject['userId'],
          } );
     });
})();




/////////////////////////   I N I T I A L I Z I N G   W I N D O W   A L E R T E R   ////////////////////////
new WindowAlerter(document.querySelector('#rightSideBar'));



/////////////////////////   A D D   N E W   N O T E   M O D A L   //////////////////////////

const newNoteModalController = new ModalController();
const addNewNoteButton = document.querySelector('button.addNewNote');

newNoteModalController.dynamicAddingMethod = NotesView.addNewNote;
addNewNoteButton.addEventListener('click', () => newNoteModalController.openModal() );
