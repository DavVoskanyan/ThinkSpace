import ModalController from "/assets/globalScripts/ModalController.js";

class Scheduler {
    #ALL_NOTES_ARRAY = [ {date: new Date(2023, 2, 10)},
                         {date: new Date(2023, 1, 10)},
                         {date: new Date(2023, 2, 12)},
                         {date: new Date(2023, 2, 10)} ];

    #PARENT_NODE;
    #CURRENT_DATE_CONTAINER;
    #DAYS_ARRAY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    #MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    #currentShowingDate;
    #CALENDARS_CONTAINER

    #previousMonth;
    #currentMonth;
    #nextMonth;

    #onDayNotesContainer;
    #notesListElementInContainer;
    #singleNoteContainer;

    #addNoteModalContainer;

    constructor(parentNode) {
        this.#PARENT_NODE = parentNode;
        this.#currentShowingDate = new Date();

        this.#addNoteModalContainer = new ModalController('addNoteModal')

        this.#createSchedulerContainer();
        this.#createInDayNotes();
    }

    #createSchedulerContainer() {
        const scheduler = document.createElement('div');
        scheduler.classList.add('scheduler');

        scheduler.appendChild( this.#createCalendars() );
        scheduler.appendChild( this.#createControlLine() );

        this.#PARENT_NODE.appendChild(scheduler);
    }

    #createControlLine() {
        const controlLine = document.createElement('div');
        controlLine.classList.add('controlLine');

        const dateLine = document.createElement('span');
        dateLine.classList.add('dateLine');
        this.#CURRENT_DATE_CONTAINER = dateLine;
        this.#setValueOfDateLine();

        const previousMonthButton = document.createElement('button');
        previousMonthButton.classList.add('previousMonthButton');
        previousMonthButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/></svg>`;
        previousMonthButton.addEventListener('click', () => {
            this.#currentShowingDate = new Date(
                this.#currentShowingDate.getFullYear(),
                this.#currentShowingDate.getMonth() - 1,
                1);
            this.#nextMonth.remove();

            this.#currentMonth.classList.remove('currentShowingMonth');
            this.#currentMonth.classList.add('nextBeShownMonth');
            this.#nextMonth = this.#currentMonth;

            this.#previousMonth.classList.remove('previousShownMonth');
            this.#previousMonth.classList.add('currentShowingMonth');
            this.#currentMonth = this.#previousMonth;

            this.#previousMonth = this.#createCalendarPage(
                new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() - 1, 1 ),
                'previousShownMonth'
            );
            this.#CALENDARS_CONTAINER.insertBefore(this.#previousMonth, this.#currentMonth);
            this.#setValueOfDateLine();
        })


        const nextMonthButton = document.createElement('button');
        nextMonthButton.classList.add('nextMonthButton');
        nextMonthButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/></svg>`;
        nextMonthButton.addEventListener('click', () => {
            this.#currentShowingDate = new Date(
                this.#currentShowingDate.getFullYear(),
                this.#currentShowingDate.getMonth() + 1,
                1);

            this.#previousMonth.remove();

            this.#currentMonth.classList.remove('currentShowingMonth');
            this.#currentMonth.classList.add('previousShownMonth');
            this.#previousMonth = this.#currentMonth;

            this.#nextMonth.classList.remove('nextBeShownMonth');
            this.#nextMonth.classList.add('currentShowingMonth');
            this.#currentMonth = this.#nextMonth;

            this.#nextMonth = this.#createCalendarPage(
                new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() + 1, 1 ),
                'nextBeShownMonth'
            );
            this.#CALENDARS_CONTAINER.appendChild(this.#nextMonth);
            this.#setValueOfDateLine();
        })

        controlLine.appendChild(dateLine);
        controlLine.appendChild(previousMonthButton);
        controlLine.appendChild(nextMonthButton);

        return controlLine;
    }

    #createCalendars() {
        const calendar = document.createElement('div');
        calendar.classList.add('calendar');

        const daysLine = document.createElement('div');
        daysLine.classList.add('daysLine');

        for(let i = 0; i < 7; i++) {
            let dayDiv = document.createElement('div');
            dayDiv.classList.add('dayCell');
            dayDiv.innerText = this.#DAYS_ARRAY[i];

            daysLine.appendChild(dayDiv);
        }

        calendar.appendChild(daysLine);

        const calendarsContainer = document.createElement('div');
        calendarsContainer.classList.add('calendarsContainer');
        this.#CALENDARS_CONTAINER = calendarsContainer;

        this.#previousMonth = this.#createCalendarPage(
            new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() - 1, 1 ),
            'previousShownMonth'
        );
        this.#currentMonth = this.#createCalendarPage(
            this.#currentShowingDate,
            'currentShowingMonth'
        );
        this.#nextMonth = this.#createCalendarPage(
            new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() + 1, 1 ),
            'nextBeShownMonth'
        );

        calendarsContainer.appendChild( this.#previousMonth );
        calendarsContainer.appendChild( this.#currentMonth );
        calendarsContainer.appendChild( this.#nextMonth );

        calendar.appendChild(calendarsContainer);

        return calendar;
    }

    #createCalendarPage(dateObject, startCssClass) {
        const calendarPage = document.createElement('div');
        calendarPage.classList.add('calendarList', startCssClass);
        for(let i = 0; i < new Date(dateObject.getFullYear(), dateObject.getMonth(), 0).getDay(); i++) {
            const notThisMonthDay = document.createElement('div');
            notThisMonthDay.classList.add('notThisMonthDay');
            notThisMonthDay.innerText = '✕';

            calendarPage.appendChild(notThisMonthDay);
        }
        for(let i = 0; i < new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('currentShownMonthDay');
            day.innerText = (i + 1).toString();

            const inDayNotesButton = this.#createDayButton( new Date( dateObject.getFullYear(), dateObject.getMonth(), i + 1 ) );
            if(inDayNotesButton) { day.append(inDayNotesButton); }

            calendarPage.appendChild(day);
        }
        for(let i = 0; i < calendarPage.children.length % 7; i++) {
            const notThisMonthDay = document.createElement('div');
            notThisMonthDay.classList.add('notThisMonthDay');
            notThisMonthDay.innerText = '✕';

            calendarPage.appendChild(notThisMonthDay);
        }

        return calendarPage;
    }
    #setValueOfDateLine() {
        this.#CURRENT_DATE_CONTAINER.innerHTML = `  <span>${this.#MONTHS_ARRAY[this.#currentShowingDate.getMonth()]}</span>
                                                    <span>${this.#currentShowingDate.getFullYear()}</span>`;
    }

    #createDayButton(dateObject) {
        const inDayButton = document.createElement('button');
        inDayButton.classList.add('inDayButton');

        const notesForDay = this.#ALL_NOTES_ARRAY.filter(note => {
            return note['date'].getFullYear() === dateObject.getFullYear()
                && note['date'].getMonth() === dateObject.getMonth()
                && note['date'].getDate() === dateObject.getDate();
        }).length;

        inDayButton.innerText = notesForDay <= 5 ? notesForDay : '5+';

        inDayButton.addEventListener('click', () => {
            this.#openInDayNotes(dateObject);
        })

        const inDayAddNoteButton = document.createElement('button');
        inDayAddNoteButton.classList.add('inDayAddNoteButton');

        inDayAddNoteButton.innerText = '+';
        inDayAddNoteButton.addEventListener('click', () => {
            this.#addNoteModalContainer.openModal();
        })

        return notesForDay ? inDayButton : inDayAddNoteButton;
    }

    #createInDayNotes() {
        const onDayNotesContainer = document.createElement('div');
        onDayNotesContainer.classList.add('onDayNotes');

        const closeButton = document.createElement('button');
        closeButton.classList.add('closeButton');
        closeButton.innerText = 'Cancel';
        closeButton.addEventListener('click',
            () => this.#onDayNotesContainer.classList.remove('isOpen'));

        const notesList = document.createElement('div');
        notesList.classList.add('notesList');
        this.#notesListElementInContainer = notesList;

        const singleNoteContainer = document.createElement('div');
        singleNoteContainer.classList.add('singleNoteContainer');
        this.#singleNoteContainer = singleNoteContainer;

        onDayNotesContainer.append(singleNoteContainer, notesList, closeButton);

        this.#onDayNotesContainer = onDayNotesContainer;
        this.#PARENT_NODE.appendChild(onDayNotesContainer);
    }
    #openInDayNotes(dateObject) {
        const selectedDateNotes = this.#ALL_NOTES_ARRAY.filter(note => {
            return note.date.getFullYear() === dateObject.getFullYear()
                && note.date.getMonth() === dateObject.getMonth()
                && note.date.getDate() === dateObject.getDate()
        })
        selectedDateNotes.forEach(note => {
            const noteDomObject = document.createElement('div');
            noteDomObject.classList.add('noteObjectInList');
            noteDomObject.addEventListener('click', () => {
                this.#singleNoteContainer.innerHTML = ` <h2 class="noteTitle">${note.title}</h2>
                                                    <p class="noteText">${note.text}</p>`;
                this.#singleNoteContainer.classList.add('noteIsSelected');
            })
            noteDomObject.innerHTML = ` <h2 class="noteTitle">${note.title}</h2>
                                    <p class="noteText">${note.text}</p>`;
            this.#notesListElementInContainer.appendChild(noteDomObject);
        })
        this.#onDayNotesContainer.classList.add('isOpen');
    }
}

export default Scheduler;