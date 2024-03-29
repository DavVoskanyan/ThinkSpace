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

  dynamicAddingMethod = () => {};

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

   #submitFunction() {
    const check = (this.#titleInput.value || this.#textarea.value )
        && window.localStorage.getItem('userId');
    if(check) {
      const noteForDate = this.datePickerInstance.selectedDate;
      const noteForDateString = noteForDate
          ? `${noteForDate.getFullYear()}-${noteForDate.getMonth() + 1}-${noteForDate.getDate()}`
          : null;

      const newNoteObject= {};
      newNoteObject.noteTitle = this.#titleInput.value;
      newNoteObject.noteText = this.#textarea.value;
      newNoteObject.noteForDate = noteForDateString;
      newNoteObject.userId = window.localStorage.getItem('userId');

      (async () => {
        let response = await this.#ajaxSenderInstance.addNewNote(newNoteObject);
        newNoteObject.noteId = response.newRowId

        this.dynamicAddingMethod(newNoteObject);
        if(!noteForDateString) {
          document.querySelector('#undatedQuantity').innerText =
              parseInt(document.querySelector('#undatedQuantity').innerText) + 1;
        }
        else if(new Date(noteForDateString).getTime() > new Date().getTime()) {
          document.querySelector('#actualQuantity').innerText =
              parseInt(document.querySelector('#actualQuantity').innerText) + 1;
        }
        else {
          document.querySelector('#expiredQuantity').innerText =
              parseInt(document.querySelector('#expiredQuantity').innerText) + 1;
        }
        document.querySelector('#allQuantity').innerText =
            parseInt(document.querySelector('#allQuantity').innerText) + 1;

      })();
    }
    else if(!window.localStorage.getItem('userId')) { location.href = '/index.html'; }
    else { this.#windowAlerterInstance.alertDivConstructor('error', 'No text information provided'); }

    this.closeModal();
  }


  closeModal() {
    this.#modalContainer.classList.remove('opened');
    this.datePickerInstance.dropSelectedDate();
    this.#titleInput.value = '';
    this.#textarea.value = '';
  }

  openModal() {
    this.#modalContainer.classList.add('opened');
  }

}