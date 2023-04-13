import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";
import DatePicker from "/front/assets/globalScripts/DatePicker.js";

export default class ModalController {
  MODAL_ELEMENT;
  #ajaxSenderInstance;
  constructor() {
    this.#ajaxSenderInstance = new AjaxSender();
    this.#createModal();

    this.MODAL_ELEMENT.addEventListener('click', (e) => {
      if(e.target.classList.contains('modal')) { this.closeModal(); }
    })
  }

  #createModal() {
    const newModal = document.createElement('div');
    newModal.classList.add('modal');

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');

    const modalHeader = document.createElement('div');
    modalHeader.innerText = 'Add new note';

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modalFooter');

    modalWindow.append(modalHeader, this.#createModalContent(), modalFooter);

    newModal.appendChild(modalWindow);

    document.body.appendChild(modalWindow);
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
    noteTitleLabel.appendChild(noteTitleInput);

    const noteTextLabel = document.createElement('label');
    const noteTextArea = document.createElement('textarea');
    noteTextArea.id = 'descriptionArea';
    noteTextArea.classList.add('description');
    noteTextArea.placeholder = 'Text...';
    noteTextArea.cols = 30;
    noteTextArea.rows = 10;
    noteTextLabel.appendChild(noteTextArea);

    const submitButton = document.createElement('button');
    submitButton.id = 'addNewNote';
    submitButton.classList.add('addNewNote');

    form.append(noteTitleLabel, noteTextLabel, submitButton);
    return form;
  }

  #createDatePicker() {
    const datePickerContainer = document.createElement('div');
    datePickerContainer.classList.add('datePickerContainer');

    new DatePicker(datePickerContainer);

    return datePickerContainer;
  }

  closeModal() {
    this.MODAL_ELEMENT.classList.remove('opened');
  }

  openModal() {
    this.MODAL_ELEMENT.classList.add('opened');
  }

  #submitFunction() {
    const newNoteObject= {};

    newNoteObject
  }
}