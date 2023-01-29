import Note from "/assets/globalScripts/Note.js";

class NotesView {
  #isGrid;
  #openNoteContainer;
  #notesContainer;

  constructor(parentElement, isGrid) {

    this.#isGrid = isGrid ?? true;

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

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');
    closeButton.addEventListener('click', () => openNoteContainer.classList.remove('open'));
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3
                                         0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0
                                         45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5
                                         45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8
                                         0-45.3L205.3 256 310.6 150.6z" 
                                      fill="currentColor"/>
                             </svg>`;
    openNoteContainer.appendChild(closeButton);
    openNoteContainer.appendChild(containerForNoteInfo);

    this.#openNoteContainer = openNoteContainer;
    return openNoteContainer;
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
