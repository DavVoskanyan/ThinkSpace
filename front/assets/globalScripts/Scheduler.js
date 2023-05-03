import '/front/assets/globalStyles/schedulerStyles.css';

import AjaxSender from "/front/assets/globalScripts/AjaxSender.js";
import ModalController from "/front/assets/globalScripts/ModalController.js";

export default class Scheduler {
    static ALL_NOTES_ARRAY = [];

    #PARENT_NODE;
    #CURRENT_DATE_CONTAINER;
    #DAYS_ARRAY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    #MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    static currentShowingDate;
    #CALENDARS_CONTAINER

    #ajaxSenderInstance;

    #previousMonth;
    #currentMonth;
    #nextMonth;

     static onDayNotesContainer;
    static notesListElementInContainer;
     static singleNoteContainer;

    #addNoteModalContainer;
    #datePickerController;

    constructor(parentNode, modalController) {
        this.#ajaxSenderInstance = new AjaxSender( true );
        (async () => {
            Scheduler.ALL_NOTES_ARRAY = await this.#ajaxSenderInstance.getAllNotesById(
                window.localStorage.getItem('userId')
            )
             

            this.#PARENT_NODE = parentNode;
             Scheduler.currentShowingDate = new Date();

            this.#addNoteModalContainer = modalController;
            this.#datePickerController = modalController.datePickerInstance;
            modalController.dynamicAddingMethod = this.addNoteDynamically;

            this.#createSchedulerContainer();
            this.#createInDayNotes();
        })();
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
             Scheduler.currentShowingDate = new Date(
                 Scheduler.currentShowingDate.getFullYear(),
                 Scheduler.currentShowingDate.getMonth() - 1,
                1);
            this.#nextMonth.remove();

            this.#currentMonth.classList.remove('currentShowingMonth');
            this.#currentMonth.classList.add('nextBeShownMonth');
            this.#nextMonth = this.#currentMonth;

            this.#previousMonth.classList.remove('previousShownMonth');
            this.#previousMonth.classList.add('currentShowingMonth');
            this.#currentMonth = this.#previousMonth;

            this.#previousMonth = this.#createCalendarPage(
                new Date(  Scheduler.currentShowingDate.getFullYear(),  Scheduler.currentShowingDate.getMonth() - 1, 1 ),
                'previousShownMonth'
            );
            this.#CALENDARS_CONTAINER.insertBefore(this.#previousMonth, this.#currentMonth);
            this.#setValueOfDateLine();
        })


        const nextMonthButton = document.createElement('button');
        nextMonthButton.classList.add('nextMonthButton');
        nextMonthButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/></svg>`;
        nextMonthButton.addEventListener('click', () => {
             Scheduler.currentShowingDate = new Date(
                 Scheduler.currentShowingDate.getFullYear(),
                 Scheduler.currentShowingDate.getMonth() + 1,
                1);

            this.#previousMonth.remove();

            this.#currentMonth.classList.remove('currentShowingMonth');
            this.#currentMonth.classList.add('previousShownMonth');
            this.#previousMonth = this.#currentMonth;

            this.#nextMonth.classList.remove('nextBeShownMonth');
            this.#nextMonth.classList.add('currentShowingMonth');
            this.#currentMonth = this.#nextMonth;

            this.#nextMonth = this.#createCalendarPage(
                new Date(  Scheduler.currentShowingDate.getFullYear(),  Scheduler.currentShowingDate.getMonth() + 1, 1 ),
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
            new Date(  Scheduler.currentShowingDate.getFullYear(),  Scheduler.currentShowingDate.getMonth() - 1, 1 ),
            'previousShownMonth'
        );
        this.#currentMonth = this.#createCalendarPage(
             Scheduler.currentShowingDate,
            'currentShowingMonth'
        );
        this.#nextMonth = this.#createCalendarPage(
            new Date(  Scheduler.currentShowingDate.getFullYear(),  Scheduler.currentShowingDate.getMonth() + 1, 1 ),
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
        this.#CURRENT_DATE_CONTAINER.innerHTML = `  <span>${this.#MONTHS_ARRAY[ Scheduler.currentShowingDate.getMonth()]}</span>
                                                    <span>${ Scheduler.currentShowingDate.getFullYear()}</span>`;
    }

    #createDayButton(dateObject) {
        const inDayButton = document.createElement('button');
        inDayButton.classList.add('inDayButton');
         

        const notesForDay =  Scheduler.ALL_NOTES_ARRAY.filter(note => {
            const currentNoteDate = new Date(note['noteForDate']);
            return currentNoteDate.getFullYear() === dateObject.getFullYear()
                && currentNoteDate.getMonth() === dateObject.getMonth()
                && currentNoteDate.getDate() === dateObject.getDate();
        }).length;

        inDayButton.innerText = notesForDay <= 5 ? notesForDay : '5+';

        inDayButton.addEventListener('click', () => {
             Scheduler.openInDayNotes(dateObject);
        })

        const inDayAddNoteButton = document.createElement('button');
        inDayAddNoteButton.classList.add('inDayAddNoteButton');

        inDayAddNoteButton.innerText = '+';
        inDayAddNoteButton.addEventListener('click', (e) => {
            this.#datePickerController.selectDate(
                new Date(
                     Scheduler.currentShowingDate.getFullYear(),
                     Scheduler.currentShowingDate.getMonth(),
                    parseInt(e.currentTarget.parentNode.childNodes[0].nodeValue)
                )
            );
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
            () => {
                Scheduler.onDayNotesContainer.classList.remove('isOpen');
                Scheduler.notesListElementInContainer.innerHTML = '';
            }
        );

        const notesList = document.createElement('div');
        notesList.classList.add('notesList');
        Scheduler.notesListElementInContainer = notesList;

        const singleNoteContainer = document.createElement('div');
        singleNoteContainer.classList.add('singleNoteContainer');
        Scheduler.singleNoteContainer = singleNoteContainer;

        onDayNotesContainer.append(singleNoteContainer, notesList, closeButton);

        Scheduler.onDayNotesContainer = onDayNotesContainer;
        this.#PARENT_NODE.appendChild(onDayNotesContainer);
    }
     static openInDayNotes(dateObject) {
        Scheduler.singleNoteContainer.innerHTML = '';

        const selectedDateNotes =  Scheduler.ALL_NOTES_ARRAY.filter(note => {
            const currentDate = new Date(note['noteForDate']);
            return currentDate.getFullYear() === dateObject.getFullYear()
                && currentDate.getMonth() === dateObject.getMonth()
                && currentDate.getDate() === dateObject.getDate()
        })
        selectedDateNotes.forEach(note => {
            const noteDomObject = document.createElement('div');
            noteDomObject.classList.add('noteObjectInList');
            noteDomObject.addEventListener('click', () => {
                Scheduler.singleNoteContainer.innerHTML = ` <h2 class="noteTitle">${note['noteTitle']}</h2>
                                                    <p class="noteText">${note['noteText']}</p>`;
                Scheduler.singleNoteContainer.classList.add('noteIsSelected');
            })
            noteDomObject.innerHTML = ` <h2 class="noteTitle">${note['noteTitle']}</h2>
                                    <p class="noteText">${note['noteText']}</p>`;
            Scheduler.notesListElementInContainer.appendChild(noteDomObject);
        })
        Scheduler.onDayNotesContainer.classList.add('isOpen');
    }

    addNoteDynamically(noteObject) {
         Scheduler.ALL_NOTES_ARRAY.push(noteObject);

        const inNoteDate = new Date(noteObject['noteForDate']);
        const check = inNoteDate.getFullYear() === Scheduler.currentShowingDate.getFullYear()
            && inNoteDate.getMonth() === Scheduler.currentShowingDate.getMonth();

        if(check) {
            const dayElement = document.querySelectorAll('.currentShowingMonth .currentShownMonthDay')[inNoteDate.getDate() -1]
            const inDayButton = dayElement.querySelector(':scope .inDayButton');

            if(inDayButton) {inDayButton.innerText = parseInt(parseInt(inDayButton.innerText) + 1)}
            else {
                const newInDayButton = document.createElement('button');
                newInDayButton.classList.add('inDayButton');
                newInDayButton.innerText = '1';
                newInDayButton.addEventListener('click', () => {
                    Scheduler.openInDayNotes(inNoteDate);
                });

                dayElement.appendChild(newInDayButton);
            }
        }
    }
}