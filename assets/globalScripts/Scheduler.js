class Scheduler {
    #PARENT_NODE;

    #DAYS_ARRAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    constructor(parentNode) {
        this.#parentNode = parentNode;
    }

    #createSchedulerContainer() {
        const scheduler = document.createElement('div');
        scheduler.classList.add('scheduler');

        scheduler.appendChild(this.#createControlLine());
        scheduler.appendChild(this.#createCalendar());

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

    #createCalendar() {
        const calendar = document.createElement('div');
        calendar.classList.add('calendar');

        for(let i = 0; i < 7; i++) {
            let dayDiv = document.createElement('div');
            dayDiv.classList.add('dayCell');
            dayDiv.innerText = this.#DAYS_ARRAY[i];

            calendar.appendChild(dayDiv);
        }

        // @todo add days in calendar

        return calendar;
    }
}