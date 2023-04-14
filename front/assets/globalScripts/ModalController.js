import '/front/assets/globalStyles/modalControllerStyles.css';

import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";
import WindowAlerter from "/front/assets/globalScripts/WindowAlerter.js";
import DatePicker from "/front/assets/globalScripts/DatePicker.js";

export default class ModalController {
  #ajaxSenderInstance;
  #windowAlerterInstance;
  datePickerInstance;

  #modalContainer;
  #titleInput;
  #textarea;

  dynamicAddingMethod;

  constructor() {
    this.#ajaxSenderInstance = new AjaxSender();
    this.#windowAlerterInstance = new WindowAlerter(document.querySelector('#rightSideBar'));
    this.#createModal();

    this.#modalContainer.addEventListener('click', (e) => {
      if(e.target.classList.contains('modal')) { this.closeModal(); }
    })
  }

  #createModal() {
    const newModal = document.createElement('div');
    newModal.classList.add('modal');
    this.#modalContainer = newModal;

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modalHeader');
    modalHeader.innerText = 'Add new note';

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modalFooter');

    modalWindow.append(modalHeader, this.#createModalContent(), modalFooter);

    newModal.appendChild(modalWindow);

    document.body.appendChild(newModal);
  }

  #createModalContent() {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    modalContent.append(this.#createForm(), this.#createDatePicker());
    return modalContent;
  }

  #createForm() {
    const form = document.createElement('form');

    const noteTitleLabel = document.createElement('label');
    const noteTitleInput = document.createElement('input');
    noteTitleInput.id = 'titleInput';
    noteTitleInput.classList.add('title');
    noteTitleInput.placeholder = 'Title...';
    this.#titleInput = noteTitleInput;
    noteTitleLabel.appendChild(noteTitleInput);

    const noteTextLabel = document.createElement('label');
    const noteTextArea = document.createElement('textarea');
    noteTextArea.id = 'descriptionArea';
    noteTextArea.classList.add('description');
    noteTextArea.placeholder = 'Text...';
    noteTextArea.cols = 30;
    noteTextArea.rows = 10;
    this.#textarea = noteTextArea;
    noteTextLabel.appendChild(noteTextArea);

    const submitButton = document.createElement('button');
    submitButton.id = 'addNewNote';
    submitButton.classList.add('addNewNote');
    submitButton.innerText = 'Add';
    submitButton.addEventListener('click', (eventObject) => {
      eventObject.preventDefault();
      this.#submitFunction()
    })

    form.append(noteTitleLabel, noteTextLabel, submitButton);
    return form;
  }

  #createDatePicker() {
    const datePickerContainer = document.createElement('div');
    datePickerContainer.classList.add('datePickerContainer');

    this.datePickerInstance = new DatePicker(datePickerContainer);

    return datePickerContainer;
  }

  async #submitFunction() {
    const check = (this.#titleInput.value || this.#textarea.value )
        && window.localStorage.getItem('userId');
    if(check) {
      const reservedDate = this.datePickerInstance.selectedDate;
      const reservedDateString = reservedDate
          ? `${reservedDate.getFullYear()}-${reservedDate.getMonth() + 1}-${reservedDate.getDate()}`
          : null;

      const newNoteObject= {};
      newNoteObject.noteTitle = this.#titleInput.value;
      newNoteObject.noteText = this.#textarea.value;
      newNoteObject.reservedDate = reservedDateString;
      newNoteObject.userId = window.localStorage.getItem('userId');

      newNoteObject.noteId = await this.#ajaxSenderInstance.addNewNote(newNoteObject).newRowId;;
      this.dynamicAddingMethod(newNoteObject);
    }
    else if(!window.localStorage.getItem('userId')) { location.href = '/index.html'; }
    else { this.#windowAlerterInstance.alertDivConstructor('error', 'No text information provided'); }
  }


  closeModal() {
    this.#modalContainer.classList.remove('opened');
    this.datePickerInstance.dropSelectedDate();
  }

  openModal() {
    this.#modalContainer.classList.add('opened');
  }

}