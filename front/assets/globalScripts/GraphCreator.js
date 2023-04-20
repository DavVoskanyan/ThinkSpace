import '/front/assets/globalStyles/graphCreatorStyles.css';

class GraphCreator {

    values = [];

    #CURRENT_MONTH;
    #MONTHS_SHORT_NAMES = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Sep', 'Oct', 'Nov', 'Dec'];
    #QUANTITY_MEASURE_POINTS = [0, 5, 10, 15, 20];

    #parentElement;
    #canvasContext;

    #canvasWidth;
    #canvasHeight;

    constructor(parentElement, valuesArray) {
        this.values = valuesArray ? valuesArray : [];
        this.#CURRENT_MONTH = new Date();

        this.#parentElement = parentElement;
        this.#parentElement.append(
            this.#createMeasurePointsOnY(),
            this.#createAndSetUpCanvas(),
            this.#createMeasurePointsOnX()
        );
        this.#drawGraph();
    }


    #createAndSetUpCanvas() {
        const canvasContainer = document.createElement('div');
        canvasContainer.classList.add('canvasContainer');

        const canvasElement = document.createElement('canvas');
        canvasElement.id = 'graphCanvas';

        this.#canvasWidth = this.#parentElement.offsetWidth - 50;
        this.#canvasHeight = this.#parentElement.offsetHeight - 90;
        canvasElement.width = this.#parentElement.offsetWidth - 50;
        canvasElement.height = this.#parentElement.offsetHeight - 90;

        this.#canvasContext = canvasElement.getContext('2d');

        canvasContainer.appendChild(canvasElement);
        return canvasContainer;
    }

    #createMeasurePointsOnY() {
        const pointsContainer = document.createElement('div');
        pointsContainer.id = 'measurePointsOnY';

        this.#QUANTITY_MEASURE_POINTS.forEach(point => {
            const newPoint = document.createElement('span');
            newPoint.classList.add('measurePointOnX');
            newPoint.innerText = point.toString();

            pointsContainer.append(newPoint);
        });

        return pointsContainer;
    }
    #createMeasurePointsOnX() {
        const pointsContainer = document.createElement('div');
        pointsContainer.id = 'measurePointsOnX';
        const currentMonth = this.#CURRENT_MONTH.getMonth();
        for(let i = 0; i < 12; i++) {
            const newPoint = document.createElement('span');

            const thisMonthYear = new Date(this.#CURRENT_MONTH.getFullYear(), currentMonth - i, 1).getFullYear().toString().substring(2, 5)
            newPoint.innerText = `${this.#MONTHS_SHORT_NAMES.at(currentMonth - i)} ${thisMonthYear}`;

            pointsContainer.append(newPoint);
        }
        return pointsContainer;
    }
    #drawGraph() {
        this.#canvasContext.strokeStyle = '#3aafae';
        this.#canvasContext.lineWidth = 4;
        this.#canvasContext.beginPath();

        this.#canvasContext.moveTo((1) * Math.floor(this.#canvasWidth / 12) - this.#canvasWidth * 4 / 100, this.#canvasHeight - ((this.#canvasHeight / 20) * this.values[0]));

        this.values.forEach((item, index) => {

                let x = (index + 1) * Math.floor(this.#canvasWidth / 12);
                x -= this.#canvasWidth * 4 / 100;
                let y = this.#canvasHeight - ((this.#canvasHeight / 20) * item);
                this.#canvasContext.lineTo(x, y);
        })
        this.#canvasContext.stroke();
    }
}

export default GraphCreator;