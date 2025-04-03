class Countdown {
    constructor(targetDate, daysElement, hoursElement, minutesElement, secondsElement) {
        this.targetDate = new Date(targetDate);
        this.daysElement = daysElement;
        this.hoursElement = hoursElement;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        
        this.interval = null;
    }

    start() {
        // Update immediately
        this.update();
        
        // Then update every second
        this.interval = setInterval(() => {
            this.update();
        }, 1000);
    }

    update() {
        const now = new Date();
        const difference = this.targetDate - now;
        
        // Check if the target date has passed
        if (difference <= 0) {
            clearInterval(this.interval);
            this.daysElement.textContent = '00';
            this.hoursElement.textContent = '00';
            this.minutesElement.textContent = '00';
            this.secondsElement.textContent = '00';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update DOM elements
        this.daysElement.textContent = days.toString().padStart(2, '0');
        this.hoursElement.textContent = hours.toString().padStart(2, '0');
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
}