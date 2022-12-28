import NotesWorker from "./NotesWorker";

class AnalyticWorker {
  ALL_TIME_NOTES = 'allTasks';
  noteWorker = new NotesWorker();

  constructor() {
  }

  getCountOfAllNotesEver() {
    return this.noteWorker.getAllNotes()
  }
}
