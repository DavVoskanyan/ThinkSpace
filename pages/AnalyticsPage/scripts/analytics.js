import "../styles/analytics.css";


import SideBarCreator from "/assets/globalScripts/SideBarCreator.js";
import WindowAlerter from "/assets/globalScripts/WindowAlerter.js";
import ModalController from "/assets/globalScripts/ModalController.js";
import DatePicker from "/assets/globalScripts/DatePicker.js";
import NumbersAnimator from "/assets/globalScripts/NumbersAnimator.js";
import GraphCreator from "/assets/globalScripts/GraphCreator.js";



/////////////////////////   I N I T I A L I Z I N G   S I D E B A R   //////////////////////////////
const sidebar = new SideBarCreator(
    document.querySelector('#leftSideBar'),
    document.querySelector('#mainContent'),
    'analytics');

//   I N I T I A L I Z I N G   W I N D O W   A L E R T E R
const windowAlerter = new WindowAlerter(document.querySelector('#rightSideBar'));
//
// //   I N I T I A L I Z I N G   M O D A L - C O N T R O L L E R
const modalController = new ModalController('addNoteModal', );

//   I N I T I A L I Z I N G   N U M B E R S - A N I M A T O R
const numbersAnimator = new NumbersAnimator();
numbersAnimator.increaseAnimate(0, 182, document.querySelector('#allNotesNumberContainer .number'));
numbersAnimator.increaseAnimate(0, 20, document.querySelector('#actualNotesNumberContainer .number'));
numbersAnimator.increaseAnimate(0, 153, document.querySelector('#expiredNotesNumberContainer .number'));
numbersAnimator.increaseAnimate(0, 9, document.querySelector('#undatedNotesNumberContainer .number'));

//   I N I T I A L I Z I N G   G R A P H - C R E A T O R
const canvas = new GraphCreator(document.querySelector('#canvasContainer'));