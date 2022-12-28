class NotesWorker {
  NOTES_KEY_IN_STORAGE;
  constructor() {
    this.NOTES_KEY_IN_STORAGE = 'notes';
  }
  addSingleNote(noteObject) {
    let notesArray = localStorage.getItem(this.NOTES_KEY_IN_STORAGE)
        ? JSON.parse(localStorage.getItem(this.NOTES_KEY_IN_STORAGE))
        : [];
    notesArray.push(noteObject);
    localStorage.setItem(this.NOTES_KEY_IN_STORAGE, JSON.stringify(notesArray));
  }

  addManyNotes(notesArray) {
    let inStorageNotesArray = localStorage.getItem(this.NOTES_KEY_IN_STORAGE)
        ? JSON.parse(localStorage.getItem(this.NOTES_KEY_IN_STORAGE))
        : [];
    inStorageNotesArray.concat(notesArray);
    localStorage.setItem(this.NOTES_KEY_IN_STORAGE, inStorageNotesArray);
  }

  getSingleNote(noteId) {
    let notesArray = JSON.parse(localStorage.getItem(this.NOTES_KEY_IN_STORAGE));
    let searchedNote;

    notesArray.forEach(note => {
      if(note.id === noteId) {
        searchedNote = note;
      }
    })

    return searchedNote;
  }

  getManyNotes(noteIdArray) {
    let notesArray = JSON.parse(localStorage.getItem(this.NOTES_KEY_IN_STORAGE));
    let searchedNotesArray = [];

    notesArray.forEach(note => {
      noteIdArray.forEach(id => {
        if(note.id === id) {
          searchedNotesArray.push(note);
        }
      })
    })
    return searchedNotesArray;
  }

  getAllNotes() {
    return localStorage.getItem(this.NOTES_KEY_IN_STORAGE)
      ? JSON.parse(localStorage.getItem(this.NOTES_KEY_IN_STORAGE))
      : [];
  }
}

export default NotesWorker;
