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
    this.selectedDate = selectedDate ?? new Date();
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

    const domDate = document.createElement('span');
    domDate.classList.add('noteDate');

    let month, date;
    month = selectedDate.getMonth() + 1 > 9
        ? selectedDate.getMonth() + 1
        : `0${selectedDate.getMonth() + 1}`;
    date = selectedDate.getDate() > 9
        ? selectedDate.getDate()
        : `0${selectedDate.getDate()}`;

    domDate.innerText = `${selectedDate.getFullYear()}.${month}.${date}`;

    this.domElement.append(domTitle, domText, domDate);
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
