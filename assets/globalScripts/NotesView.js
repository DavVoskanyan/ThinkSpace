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
