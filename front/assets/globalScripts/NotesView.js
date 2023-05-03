import '/front/assets/globalStyles/notesContainer.css';

import Note from "/front/assets/globalScripts/Note.js";
import DatePicker from "/front/assets/globalScripts/DatePicker.js";
import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";

export default class NotesView {

  #isGrid;
  #isFilterable;
  #isEditable;

  #ajaxSenderInstance;

  #openNoteContainer;
  #noteInfoContainer;
  #noteEditingContainer;
  #editAndSubmitButton;
  #buttonStatus;

  static notesContainer;

  static allNotesObjects;

  #filterLine;
  filterStartDate;
  filterEndDate;

  constructor(parentElement, isGrid, isEditable, isFilterable) {
    this.#isGrid = isGrid === undefined ? true : isGrid;
    this.#isEditable = isEditable === undefined ? true : isEditable;
    this.#isFilterable = isFilterable === undefined ? true : isFilterable;
    this.#buttonStatus = 'edit';

    this.#ajaxSenderInstance = new AjaxSender( true );

    NotesView.allNotesObjects = [];

    const elementContainer = document.createElement("div");
    elementContainer.classList.add('notesView');
    if(this.#isFilterable) {
      this.#filterLine = this.#createFilteringField();
      elementContainer.appendChild(this.#filterLine);
    }
    elementContainer.appendChild(this.#createOpenNoteContainer());
    elementContainer.appendChild(this.#createNotesContainer());

    parentElement.appendChild(elementContainer);
  }

  #createFilteringField() {
    const filterLine = document.createElement("div");
    filterLine.classList.add('filterLine');


    const gridButton = document.createElement('button');
    gridButton.classList.add('gridButton', 'active');
    gridButton.innerHTML = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.36 122.88" >
                                <path d="M5.85,0h20.09c3.22,0,5.85,2.63,5.85,5.85v20.09c0,3.22-2.63,
                                         5.85-5.85,5.85H5.85C2.63,31.8,0,29.16,0,25.94 V5.85C0,2.63,2.63,0,5.85,
                                         0L5.85,0z M96.42,91.08h20.09c3.22,0,5.86,2.63,5.86,5.86v20.09c0,3.22-2.63,
                                         5.86-5.86,5.86H96.42 c-3.22,0-5.86-2.63-5.86-5.86V96.94C90.56,93.72,93.2,91.08,
                                         96.42,91.08L96.42,91.08z M51.14,91.08h20.09 c3.22,0,5.86,2.63,5.86,5.86v20.09c0,
                                         3.22-2.63,5.86-5.86,5.86H51.14c-3.22,0-5.85-2.63-5.85-5.86V96.94 C45.28,93.72,47.92,
                                         91.08,51.14,91.08L51.14,91.08z M5.85,91.08h20.09c3.22,0,5.85,2.63,5.85,5.86v20.09 c0,
                                         3.22-2.63,5.86-5.85,5.86H5.85c-3.22,0-5.85-2.63-5.85-5.86V96.94C0,93.72,2.63,91.08,
                                         5.85,91.08L5.85,91.08z M96.42,45.54 h20.09c3.22,0,5.86,2.63,5.86,5.86v20.09c0,
                                         3.22-2.63,5.86-5.86,5.86H96.42c-3.22,0-5.86-2.63-5.86-5.86V51.4 C90.56,48.18,
                                         93.2,45.54,96.42,45.54L96.42,45.54z M51.14,45.54h20.09c3.22,0,5.86,2.63,5.86,
                                         5.86v20.09 c0,3.22-2.63,5.86-5.86,5.86H51.14c-3.22,0-5.85-2.63-5.85-5.86V51.4C45.28,
                                         48.18,47.92,45.54,51.14,45.54L51.14,45.54z M5.85,45.54h20.09c3.22,0,5.85,2.63,5.85,
                                         5.86v20.09c0,3.22-2.63,5.86-5.85,5.86H5.85C2.63,77.34,0,74.7,0,71.48V51.4 C0,48.18,
                                         2.63,45.54,5.85,45.54L5.85,45.54z M96.42,0h20.09c3.22,0,5.86,2.63,5.86,5.85v20.09c0,
                                         3.22-2.63,5.85-5.86,5.85H96.42 c-3.22,0-5.86-2.63-5.86-5.85V5.85C90.56,2.63,93.2,0,
                                         96.42,0L96.42,0z M51.14,0h20.09c3.22,0,5.86,2.63,5.86,5.85v20.09 c0,3.22-2.63,5.85-5.86,
                                         5.85H51.14c-3.22,0-5.85-2.63-5.85-5.85V5.85C45.28,2.63,47.92,0,51.14,0L51.14,0z"/>
                            </svg>`
    gridButton.addEventListener('click', () => {
      NotesView.notesContainer.classList.remove('notesList');
      NotesView.notesContainer.classList.add('notesGrid');
      this.#isGrid = true;
    })

    const listButton = document.createElement('button');
    listButton.classList.add('listButton');
    listButton.innerHTML = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
                                <path d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
                                <path d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
                                <path d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
                            </svg>`;
    listButton.addEventListener('click', () => {
      NotesView.notesContainer.classList.remove('notesGrid');
      NotesView.notesContainer.classList.add('notesList');
      this.#isGrid = false;
    })

    const searchInput = document.createElement('input');
    searchInput.classList.add('notesSearchInput');
    searchInput.placeholder = 'Search';
    searchInput.addEventListener('input', () => {
      this.filterAndHide(searchInput.value, this.filterStartDate.selectedDate, this.filterEndDate.selectedDate);
    })

    const startDateContainer = this.#createDatePickerForFiltering('startDatePicker', 'filterStartDate', searchInput);
    const endDateContainer = this.#createDatePickerForFiltering('endDatePicker', 'filterEndDate', searchInput);



    filterLine.append(gridButton, listButton, startDateContainer, endDateContainer, searchInput);

    return filterLine;
  }

  filterAndHide(searchText, startDate, endDate) {
    searchText = searchText.toLowerCase().trim();
    const domObjectsOfNotes = NotesView.allNotesObjects.map(noteObject => noteObject.domElement);
    const valuesOfTitles = domObjectsOfNotes.map(domObject => domObject.querySelector(':scope .noteTitle').innerText.toLowerCase().trim());
    const valuesOfTexts = domObjectsOfNotes.map(domObject => domObject.querySelector(':scope .noteText').innerText.toLowerCase().trim());

    domObjectsOfNotes.forEach((domObject, index) => {
      const dateInObject = domObject.querySelector(':scope .noteDate').innerText.trim();
      const searchCheck = searchText
          ? valuesOfTitles[index].includes(searchText) || valuesOfTexts[index].includes(searchText)
          : true;
      const startDateCheck = startDate
          ? startDate.getTime() <= new Date(dateInObject).getTime()
          : true;
      const endDateCheck = endDate
          ? endDate.getTime() >= new Date(dateInObject).getTime()
          : true;

      if(searchCheck && startDateCheck && endDateCheck) { domObject.classList.remove('hiddenNote'); }
      else { domObject.classList.add('hiddenNote'); }
    })
  }


  #createDatePickerForFiltering(id, propertyName, searchInput) {
    const datePickerContainer = document.createElement('div');
    datePickerContainer.id = id;
    datePickerContainer.classList.add('datePickerContainer');

    datePickerContainer.addEventListener('click', () => {
      this.filterAndHide(
          searchInput.value.trim(),
          this.filterStartDate ? this.filterStartDate.selectedDate : null,
          this.filterEndDate ? this.filterEndDate.selectedDate : null
          );
    })

    const containerTitle = document.createElement('span');
    containerTitle.classList.add('containerTitle');

    const dropValueButton = document.createElement('button');
    dropValueButton.classList.add('dropValueButton');
    dropValueButton.innerText = '✕';
    dropValueButton.addEventListener('click', () => this[propertyName].dropSelectedDate() );

    const forModuleContainer = document.createElement('div');
    forModuleContainer.classList.add('forModuleContainer');

    datePickerContainer.append(containerTitle, dropValueButton, forModuleContainer);
    this[propertyName] = new DatePicker(forModuleContainer, containerTitle);

    return datePickerContainer;
  }


  #createOpenNoteContainer() {
    const openNoteContainer = document.createElement('div');
    openNoteContainer.classList.add('openNoteContainer');

    const containerForNoteInfo = document.createElement('div');
    containerForNoteInfo.classList.add('noteInfoContainer');
    this.#noteInfoContainer = containerForNoteInfo;

    const containerForNoteEdition = document.createElement('div');
    containerForNoteEdition.classList.add('noteEditionContainer');
    this.#noteEditingContainer = containerForNoteEdition;

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');
    closeButton.addEventListener('click', () => this.#closeNoteModalContainer());
    closeButton.innerText = 'Close';

    const editAndSubmitButton = document.createElement('button');
    this.#editAndSubmitButton = editAndSubmitButton;
    editAndSubmitButton.classList.add("editAndSubmitButton", 'editState');
    editAndSubmitButton.addEventListener('click', () => this.#inNoteContainerEditOnClick());
    editAndSubmitButton.innerText = 'Edit';

    openNoteContainer.appendChild(closeButton);
    openNoteContainer.appendChild(containerForNoteInfo);
    openNoteContainer.appendChild(containerForNoteEdition);
    if(this.#isEditable) {
      openNoteContainer.appendChild(editAndSubmitButton);
    }

    NotesView.openNoteContainer = openNoteContainer;
    return openNoteContainer;
  }


  #closeNoteModalContainer() {
    NotesView.openNoteContainer.classList.remove('open');
    this.#changeButtonState('edit');
  }


  #inNoteContainerEditOnClick() {
    if(this.#buttonStatus === 'submit') {
      this.#changeButtonState('edit');

      this.#changeContainerState('submit');
      const newNoteTitle = document.querySelector(':scope .editNoteTitleInput').value;
      const newNoteText = document.querySelector(':scope .editNoteTextInput').value;
      const newNoteDate = document.querySelector('.openNoteContainer').dataset['date']
          ? new Date(document.querySelector('.openNoteContainer').dataset['date'])
          : null;

      let newNoteDateString = '';
      if(newNoteDate) {
        const newNoteDateYear = newNoteDate.getFullYear();
        const newNoteDateMonth = newNoteDate.getMonth() + 1 < 10
            ? `0${newNoteDate.getMonth() + 1}`
            : newNoteDate.getMonth() + 1;
        const newNOteDateDay = newNoteDate.getDate();
        newNoteDateString = `${newNoteDateYear}.${newNoteDateMonth}.${newNOteDateDay}`;
      }

      if(!newNoteTitle && !newNoteText) {
        this.#ajaxSenderInstance.deleteNote(
            { noteId: parseInt(document.querySelector('.openNoteContainer').dataset['note']) }
        )
        NotesView.allNotesObjects = NotesView.allNotesObjects.filter(noteObject => {
          if(parseInt(noteObject.id) === parseInt(document.querySelector('.openNoteContainer').dataset['note'])){
            noteObject.domElement.remove();
            return false;
          }
          return true;
        })
      }
      else {
        this.#ajaxSenderInstance.updateNote({
          noteId: parseInt(document.querySelector('.openNoteContainer').dataset['note']),
          noteTitle: newNoteTitle,
          noteText: newNoteText,
          noteForDate: newNoteDate,
        });


      const currentNote = NotesView.allNotesObjects.filter(noteObject => {
        return parseInt(noteObject.id) === parseInt(document.querySelector('.openNoteContainer').dataset['note']);
      })[0];



      currentNote.title = newNoteTitle;
      currentNote.description = newNoteText;
      currentNote.selectedDate = newNoteDate;

      this.#noteInfoContainer.querySelector(':scope .openElementTitle').innerText = newNoteTitle;
      this.#noteInfoContainer.querySelector(':scope .openElementDescription').innerText = newNoteText;

      currentNote.domElement.querySelector(':scope .noteTitle').innerText = newNoteTitle;
      currentNote.domElement.querySelector(':scope .noteText').innerText = newNoteText;
      currentNote.domElement.querySelector(':scope .noteDate').innerText = newNoteDateString;
      }

      this.#closeNoteModalContainer();
    }
    else {
      this.#changeButtonState('submit');

      this.#changeContainerState('edit');
    }
  }


  #changeButtonState(status) {
    if(status.trim().toLowerCase() === 'edit') {
      this.#editAndSubmitButton.classList.remove('submitState');
      this.#editAndSubmitButton.classList.add('editState');
      this.#editAndSubmitButton.innerText = 'Edit';
      this.#buttonStatus = 'edit';
    }
    else {
      this.#editAndSubmitButton.classList.remove('editState');
      this.#editAndSubmitButton.classList.add('submitState');
      this.#editAndSubmitButton.innerText = 'Submit';
      this.#buttonStatus = 'submit';
    }
  }


  #changeContainerState(status) {
    if(status.trim().toLowerCase() === 'edit') {
      this.#noteInfoContainer.classList.add('hidden');
      this.#noteEditingContainer.classList.remove('hidden');
    }
    else {
      this.#noteEditingContainer.classList.add('hidden');
      this.#noteInfoContainer.classList.remove('hidden');
    }
  }


  #createNotesContainer() {
    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notesContainer');
    notesContainer.classList.add(this.#isGrid ? 'notesGrid' : 'notesList');

    NotesView.notesContainer = notesContainer;
    return notesContainer;
  }


  static addNewNote({noteId, noteTitle, noteText, noteForDate}) {

    const newNote = new Note(noteId, noteTitle, noteText, noteForDate, NotesView.openNoteContainer);

    NotesView.notesContainer.insertBefore(newNote.domElement, NotesView.notesContainer.firstChild);
    NotesView.allNotesObjects.push(newNote);
  }
}