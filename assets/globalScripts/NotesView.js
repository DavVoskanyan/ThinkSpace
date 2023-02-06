import Note from "/assets/globalScripts/Note.js";

class NotesView {
  #isGrid;
  #openNoteContainer;
  #noteInfoContainer;
  #noteEditingContainer;
  #notesContainer;
  #editAndSubmitButton;
  #buttonStatus;

  constructor(parentElement, isGrid) {

    this.#isGrid = isGrid ?? true;
    this.#buttonStatus = 'edit';

    const elementContainer = document.createElement("div");
    elementContainer.classList.add('notesView');

    elementContainer.appendChild(this.#createFilteringField());
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
      this.#notesContainer.classList.remove('noteList');
      this.#notesContainer.classList.add('noteGrid');
      this.#isGrid = true;
    })

    const listButton = document.createElement('button');
    listButton.classList.add('listButton');
    listButton.addEventListener('click', () => {
      this.#notesContainer.classList.remove('noteGrid');
      this.#notesContainer.classList.add('noteList');
      this.#isGrid = false;
    })


    filterLine.appendChild(gridButton);
    filterLine.appendChild(listButton);

    return filterLine;
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
    openNoteContainer.appendChild(editAndSubmitButton);

    this.#openNoteContainer = openNoteContainer;
    return openNoteContainer;
  }
  #openNoteModalContainer() {
    this.#openNoteContainer.classList.add('open');
  }
  #closeNoteModalContainer() {
    this.#openNoteContainer.classList.remove('open');
    this.#changeButtonState('edit');
  }


  #inNoteContainerEditOnClick() {
    if(this.#buttonStatus === 'submit') {
      this.#changeButtonState('edit');

      this.#changeContainerState('submit');
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

    this.#notesContainer = notesContainer;
    return notesContainer;
  }

  addNewNote(title, description, selectedDate) {
    const newNote = new Note(title, description, selectedDate, this.#openNoteContainer);

    this.#notesContainer.insertBefore(newNote.domElement, this.#notesContainer.firstChild);
  }
}

export default NotesView;
