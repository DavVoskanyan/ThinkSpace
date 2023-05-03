export default class NumbersAnimator {
    constructor() {
    }
    static increaseAnimate(startValue, finalValue, DomElement) {
        let currentValue = startValue;
        const increaseInterval = setInterval(() => {
            if(currentValue === finalValue) { clearInterval(increaseInterval); }
            else { DomElement.innerText = ++currentValue; }
        },5);
    }

}