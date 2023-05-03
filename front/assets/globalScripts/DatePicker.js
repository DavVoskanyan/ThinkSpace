import '/front/assets/globalStyles/datePickerStyles.css';

export default class DatePicker {

  static #MONTH_NAMES = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
  #NOW;
  #CURRENT_DATE;
  #DAYS_TABLE;
  #IN_TITLE_MONTH;
  #IN_TITLE_YEAR;
  #DATE_ELEMENT;
  #DEFAULT_TEXT_FOR_ELEMENT;
  selectedDate;
  datePickerObjectModel;



  constructor(container, elementForDate, defaultTextForElement) {
    this.#DATE_ELEMENT = elementForDate;
    this.#DEFAULT_TEXT_FOR_ELEMENT = defaultTextForElement ?? '';

    this.#CURRENT_DATE = new Date();
    this.#NOW = new Date();

    if(container) {
      this.datePickerObjectModel = this.createDatePicker();
      container.appendChild(this.datePickerObjectModel);
    }
    else { console.error(`DatePickerError: Parent element is ${container}`); }
  }

  createDatePicker() {
    const datePicker = document.createElement('div');
    datePicker.classList.add('datePicker');

    this.#DAYS_TABLE = document.createElement('div');
    this.#DAYS_TABLE.classList.add('daysTable');

    this.#drawMonthTable(this.#CURRENT_DATE);

    datePicker.appendChild( this.createDatePickerHeader() );
    datePicker.appendChild( this.#DAYS_TABLE );

    return datePicker;
  }

  createDatePickerHeader() {
    const datePickerHeader = document.createElement('div');
    datePickerHeader.classList.add('datePickerHead');




    const previousButton = document.createElement('button');
    previousButton.classList.add('datePickerPreviousButton');
    previousButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5
                                            12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8
                                            0-45.3s-32.8-12.5-45.3 0l-192 192z" fill="currentColor"/>
                                </svg>`
    previousButton.addEventListener('click', () => this.#changeMonthByCount(-1) );





    const dateInfoTitle = document.createElement('div');
    previousButton.classList.add('datePickerPreviousButton');

    const month = document.createElement('span');
    month.classList.add('onTitleMonth');
    this.#IN_TITLE_MONTH = month;

    const year = document.createElement('span');
    year.classList.add('onTitleYear');
    this.#IN_TITLE_YEAR = year;

    this.#changeMonthAndYearTitle(this.#CURRENT_DATE);

    dateInfoTitle.appendChild(month);
    dateInfoTitle.appendChild(year);






    const nextButton = document.createElement('button');
    nextButton.classList.add('datePickerNextButton');
    nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5
                                        12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8
                                        0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/>
                            </svg>`
    nextButton.addEventListener('click', () => this.#changeMonthByCount(1) );



    datePickerHeader.appendChild(previousButton);
    datePickerHeader.appendChild(dateInfoTitle);
    datePickerHeader.appendChild(nextButton);
    return datePickerHeader;
  }

  #changeMonthByCount(number) {
    this.#CURRENT_DATE = new Date(this.#CURRENT_DATE.getFullYear(), this.#CURRENT_DATE.getMonth() + number, this.#CURRENT_DATE.getDate());
    this.#drawMonthTable(this.#CURRENT_DATE);
    this.#changeMonthAndYearTitle(this.#CURRENT_DATE);
  }

  #drawMonthTable(dateObject) {
    this.#DAYS_TABLE.innerHTML = '';
    const firstDayOfMonth = new Date(dateObject.getFullYear(), dateObject.getMonth(), 1 );
    const lastDayOfMonth = new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0 );
    this.#DAYS_TABLE.innerHTML = `<div class="weekDayName">s</div>
                                  <div class="weekDayName">m</div>
                                  <div class="weekDayName">t</div>
                                  <div class="weekDayName">w</div>
                                  <div class="weekDayName">t</div>
                                  <div class="weekDayName">f</div>
                                  <div class="weekDayName">s</div>`
    for(let i = 0; i < firstDayOfMonth.getDay(); i++) {
      this.#DAYS_TABLE.appendChild( document.createElement('div') );
    }

    for(let i = 0; i < lastDayOfMonth.getDate(); i++) {
      const day = document.createElement('div');
      day.innerText = (i + 1).toString();
      day.classList.add('currentMonthDay');

      if(i + 1 === this.#NOW.getDate()
        && this.#CURRENT_DATE.getMonth() === this.#NOW.getMonth()
        && this.#CURRENT_DATE.getFullYear() === this.#NOW.getFullYear()) { day.classList.add('today'); }

      if( this.selectedDate
        && i + 1 === this.selectedDate.getDate()
        && this.#CURRENT_DATE.getMonth() === this.selectedDate.getMonth()
        && this.#CURRENT_DATE.getFullYear() === this.selectedDate.getFullYear()) {day.classList.add('selected');}

      day.addEventListener('click', () => {
        this.selectDate(new Date(this.#CURRENT_DATE.getFullYear(), this.#CURRENT_DATE.getMonth(), parseInt(day.innerText)));
      })
      this.#DAYS_TABLE.appendChild(day);
    }
  }
  #changeMonthAndYearTitle(dateObject) {
    this.#IN_TITLE_MONTH.innerText = `${DatePicker.#MONTH_NAMES[dateObject.getMonth()]}, `;
    this.#IN_TITLE_YEAR.innerText = dateObject.getFullYear();
  }

  selectDate(dateObject) {
    this.#changeMonthAndYearTitle(dateObject);
    this.selectedDate = dateObject;
    this.#CURRENT_DATE = dateObject;
    this.#drawMonthTable(dateObject);
    this.#DAYS_TABLE.querySelectorAll(':scope .currentMonthDay.selected').forEach(selected => selected.classList.remove('selected'));

    this.#DAYS_TABLE.querySelectorAll(':scope .currentMonthDay').forEach(day => {
      if(parseInt(day.innerText) === dateObject.getDate()) { day.classList.add('selected') }
    })
    if(this.#DATE_ELEMENT) {
      let day = this.selectedDate.getDate() < 10 ? `0${this.selectedDate.getDate()}` : this.selectedDate.getDate();
      let month = this.selectedDate.getMonth() < 9 ? `0${this.selectedDate.getMonth() + 1}` : this.selectedDate.getMonth() + 1
      let translatedDate = `${day}/${month}/${this.selectedDate.getFullYear()}`;

      if(this.#DATE_ELEMENT.tagName.toLowerCase() === 'input') { this.#DATE_ELEMENT.value = translatedDate; }
      else { this.#DATE_ELEMENT.innerText = translatedDate; }
      this.#DATE_ELEMENT.dataset['date'] = translatedDate;
    }
  }

  dropSelectedDate() {
    this.#CURRENT_DATE = new Date();
    this.selectedDate = null;
    this.#DAYS_TABLE.querySelectorAll(':scope .currentMonthDay.selected').forEach(selected => selected.classList.remove('selected'));
    if(this.#DATE_ELEMENT) { this.#DATE_ELEMENT.innerText = this.#DEFAULT_TEXT_FOR_ELEMENT }
  }
}