import IndexedDataBaseWorker from "./IndexedDataBaseWorker.js";
import WindowAlerter from "./WindowAlerter.js";
import DatePicker from "./DatePicker.js";


let idb = new IndexedDataBaseWorker('ThinkSpace', 1);
console.log(idb.getAllObjects('notesStore'));


const alerter = new WindowAlerter(document.querySelector('#rightSideBar'));




alerter.alertDivConstructor("error", "This is a successful alert :)");
setTimeout(() => alerter.alertDivConstructor("success", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."), 2500)



let dp = new DatePicker(document.querySelector('.datePickerContainer'));
