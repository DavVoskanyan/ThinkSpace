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
