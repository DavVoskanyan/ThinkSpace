



class NoteConverter {
  objectFromInputs(form) {
    const noteObject = {};
    noteObject.name = form.querySelector(':scope > input.title').value;
    noteObject.text = form.querySelector(':scope > textarea').value;

    return noteObject;
  }
  objectToElement(noteObject) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.dataset.id = noteObject.id;
    newNote.addEventListener('click', () => {
      newNote.classList.add('fullScreened')
    })

    const title = document.createElement('h2');
    title.innerText = noteObject.name;
    title.classList.add('noteTitle');

    const text = document.createElement('p');
    text.innerText = noteObject.text;
    text.classList.add('noteText');

    newNote.appendChild(title);
    newNote.appendChild(text);

    return newNote;
  }
}

export default NoteConverter;
