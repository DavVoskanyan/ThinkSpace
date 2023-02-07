class Scheduler {
    #PARENT_NODE;

    #DAYS_ARRAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    #currentShowingDate;

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

        const previousMonthButton = document.createElement('button');
        previousMonthButton.classList.add('previousMonthButton');

        const nextMonthButton = document.createElement('button');
        nextMonthButton.classList.add('nextMonthButton');

        controlLine.appendChild(dateLine);
        controlLine.appendChild(previousMonthButton);
        controlLine.appendChild(nextMonthButton);

        return controlLine;
    }

    #createCalendars() {
        const calendar = document.createElement('div');
        calendar.classList.add('calendar');

        for(let i = 0; i < 7; i++) {
            let dayDiv = document.createElement('div');
            dayDiv.classList.add('dayCell');
            dayDiv.innerText = this.#DAYS_ARRAY[i];

            calendar.appendChild(dayDiv);
        }

        const calendarsContainer = document.createElement('div');
        calendarsContainer.classList.add('calendarsContainer');

        calendarsContainer.appendChild( this.#createCalendarPage( new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() - 1, 1 ) ) );
        calendarsContainer.appendChild( this.#createCalendarPage( this.#currentShowingDate));
        calendarsContainer.appendChild( this.#createCalendarPage( new Date( this.#currentShowingDate.getFullYear(), this.#currentShowingDate.getMonth() + 1, 1 ) ) );

        calendar.appendChild(calendarsContainer);

        return calendar;
    }

    #createCalendarPage(dateObject) {
        const calendarPage = document.createElement('div');
        calendarPage.classList.add('calendarList');

        for(let i = 0; i <= new Date(dateObject.getFullYear(), dateObject.getMonth(), 0).getDay(); i++) {
            const notThisMonthDay = document.createElement('div');
            notThisMonthDay.classList.add('notThisMonthDay');

            calendarPage.appendChild(notThisMonthDay);
        }
        for(let i = 0; i < new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('currentMonthDay');

            calendarPage.appendChild(day);
        }

        return calendarPage;
    }
}

export default Scheduler;