class Note {
  id;
  domElement;
  openModalElement;
  openEditModalElement;
  title;
  description;
  creationDate;
  selectedDate;

  constructor(title, description, selectedDate, openModalElement) {
    this.title = title;
    this.description = description;
    this.creationDate = new Date();
    this.selectedDate = selectedDate;
    this.openModalElement = openModalElement.querySelector(':scope .noteInfoContainer');
    this.openEditModalElement = openModalElement.querySelector(':scope .noteEditionContainer');


    this.domElement = document.createElement('div');
    this.domElement.classList.add('note');

    const domTitle = document.createElement('h2');
    domTitle.classList.add('noteTitle');
    domTitle.innerText = title;

    const domText = document.createElement('p');
    domText.classList.add('noteText');
    domText.innerText = description;

    this.domElement.appendChild(domTitle);
    this.domElement.appendChild(domText);

    this.domElement.addEventListener('click', () => this.addToOpenElement(title, description, selectedDate));
  }


  addToOpenElement(title, description, date) {
    this.openModalElement.innerHTML = '';
    this.openEditModalElement.innerHTML = '';
    this.openModalElement.classList.remove('open');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('openElementTitle');
    titleElement.innerText = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('openElementDescription');
    descriptionElement.innerText = description;

    const domTitleInput = document.createElement('input');
    domTitleInput.setAttribute('type', 'text');
    domTitleInput.classList.add('editNoteTitleInput');
    domTitleInput.value = title;

    const domTextInput = document.createElement('textarea');
    domTextInput.classList.add('editNoteTextInput');
    domTextInput.value = description;

    this.openModalElement.appendChild(titleElement);
    this.openModalElement.appendChild(descriptionElement);
    this.openModalElement.classList.remove('hidden');

    this.openEditModalElement.appendChild(domTitleInput);
    this.openEditModalElement.appendChild(domTextInput);
    this.openEditModalElement.classList.add('hidden');

    this.openModalElement.parentElement.classList.add('open');
  }

}

export default Note;
