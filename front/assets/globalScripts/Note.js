export default class Note {
  id;
  domElement;
  openedNoteContainer;
  openModalElement;
  openEditModalElement;
  title;
  description;
  creationDate;
  selectedDate;

  constructor(id, title, description, selectedDate, openModalElement) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.selectedDate = selectedDate ? new Date(selectedDate) : null;
    this.openedNoteContainer = openModalElement;
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
    domDate.innerText = '';

    let month, date;
    if(this.selectedDate) {
      month = this.selectedDate.getMonth() + 1 > 9
          ? this.selectedDate.getMonth() + 1
          : `0${this.selectedDate.getMonth() + 1}`;
      date = this.selectedDate.getDate() > 9
          ? this.selectedDate.getDate()
          : `0${this.selectedDate.getDate()}`;

      domDate.innerText = `${this.selectedDate.getFullYear()}.${month}.${date}`;
    }


    this.domElement.append(domTitle, domText, domDate);
    this.domElement.addEventListener('click', () => this.addToOpenElement(this.id, this.title, this.description, this.selectedDate));
  }


  addToOpenElement(id, title, description, date) {
    this.openedNoteContainer.dataset['note'] = id;
    this.openedNoteContainer.dataset['date'] = date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : '';

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