class DatePicker {
  #DATEPICKER_CONTAINER;
  #CURRENT_DATE;

  #DAYS_TABLE;

  constructor(container) {
    this.#CURRENT_DATE = new Date();


    if(container) {
      container.appendChild(this.createDatePicker());
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
    previousButton.addEventListener('click', () => {
      this.changeMonthByCount(-1);
    });





    const dateInfoTitle = document.createElement('div');
    previousButton.classList.add('datePickerPreviousButton');

    const month = document.createElement('span');
    month.classList.add('onTitleMonth');
    month.innerText = this.#CURRENT_DATE.toLocaleDateString('default', {month: 'long'});

    const year = document.createElement('span');
    year.classList.add('onTitleYear');
    year.innerText = this.#CURRENT_DATE.getFullYear();

    dateInfoTitle.appendChild(month);
    dateInfoTitle.appendChild(year);






    const nextButton = document.createElement('button');
    nextButton.classList.add('datePickerNextButton');
    nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5
                                        12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8
                                        0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/>
                            </svg>`
    nextButton.addEventListener('click', () => {
      this.changeMonthByCount(1);
    });



    datePickerHeader.appendChild(previousButton);
    datePickerHeader.appendChild(dateInfoTitle);
    datePickerHeader.appendChild(nextButton);
    return datePickerHeader;
  }

  changeMonthByCount(number) {

  }

  #drawMonthTable(dateObject) {
    const firstDayOfMonth = new Date(dateObject.getFullYear(), dateObject.getMonth(), 1 );
    const lastDayOfMonth = new Date(dateObject.getFullYear(), dateObject.getMonth(), 0 );
    console.log(lastDayOfMonth.getDay());
    debugger
    for(let i = 0; i < firstDayOfMonth.getDay(); i++) {
      this.#DAYS_TABLE.appendChild( document.createElement('div') );
    }
    debugger

    for(let i = 0; i < lastDayOfMonth.getDate(); i++) {
      const day = document.createElement('div');
      day.classList.add('currentMonthDay');
      if(i + 1 === this.#CURRENT_DATE.getDate()) { day.classList.add('today'); }

      this.#DAYS_TABLE.appendChild(day);
    }


  }
}

export default DatePicker;
