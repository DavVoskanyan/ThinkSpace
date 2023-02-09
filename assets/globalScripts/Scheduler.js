class Scheduler {
    #PARENT_NODE;
    #CURRENT_DATE_CONTAINER;
    #DAYS_ARRAY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    #MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    #currentShowingDate;
    #CALENDARS_CONTAINER

    #previousMonth;
    #currentMonth;
    #nextMonth;

    constructor(parentNode) {
        this.#PARENT_NODE = parentNode;
        this.#currentShowingDate = new Date();

        this.#createSchedulerContainer();
    }

    #createSchedulerContainer() {
        const scheduler = document.createElement('div');
        scheduler.classList.add('scheduler');

        scheduler.appendChild( this.#createControlLine() );
        scheduler.appendChild( this.#createCalendars() );

        this.#PARENT_NODE.appendChild(scheduler);
    }

    #createControlLine() {
        const controlLine = document.createElement('div');
        controlLine.classList.add('controlLine');

        const dateLine = document.createElement('span');
        dateLine.classList.add('dateLine');
        dateLine.innerText = `${this.#MONTHS_ARRAY[this.#currentShowingDate.getMonth()]}, ${this.#currentShowingDate.getFullYear()}`;
        this.#CURRENT_DATE_CONTAINER = dateLine;

        const previousMonthButton = document.createElement('button');
        previousMonthButton.classList.add('previousMonthButton');
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
            this.#CURRENT_DATE_CONTAINER.innerText = `${this.#MONTHS_ARRAY[this.#currentShowingDate.getMonth()]}, ${this.#currentShowingDate.getFullYear()}`;
        })


        const nextMonthButton = document.createElement('button');
        nextMonthButton.classList.add('nextMonthButton');
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
            this.#CURRENT_DATE_CONTAINER.innerText = `${this.#MONTHS_ARRAY[this.#currentShowingDate.getMonth()]}, ${this.#currentShowingDate.getFullYear()}`;
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

            calendarPage.appendChild(notThisMonthDay);
        }
        for(let i = 0; i < new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('currentShownMonthDay');
            day.innerText = (i + 1).toString();

            calendarPage.appendChild(day);
        }
        for(let i = 0; i < calendarPage.children.length % 7; i++) {
            const notThisMonthDay = document.createElement('div');
            notThisMonthDay.classList.add('notThisMonthDay');

            calendarPage.appendChild(notThisMonthDay);
        }

        return calendarPage;
    }
}

export default Scheduler;