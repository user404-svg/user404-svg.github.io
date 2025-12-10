const seconds_objects = [
    $("#seconds_d_nav"),
    $('#seconds'),
    $("#seconds_mob")
];
const minutes_objects = [
    $("#minutes_mob"),
    $('#minutes_d_nav'),
    $("#minutes")
];
class Timer {
    constructor(val = 3600) {
        this.timeleft = val;
        console.log(this);
    }
    dec_second() {
        this.timeleft -= 1;
        this.minutes = parseInt((this.timeleft / 60));
        this.seconds = this.timeleft - this.minutes * 60;
        localStorage.setItem('timeleft', this.timeleft);
        return true;
    }
    start() {
        let timerId = setInterval(() => {
            this.dec_second();
            for (let key in seconds_objects) {
                if (this.seconds < 10) {
                    seconds_objects[key].text('0' + this.seconds);
                } else {
                    seconds_objects[key].text(this.seconds);
                }
            }
            for (let key in minutes_objects) {
                if (this.minutes < 10) {
                    minutes_objects[key].text('0' + this.minutes);
                } else {
                    minutes_objects[key].text(this.minutes);
                }
            }
        }, 1000);
        setTimeout(() => {
            clearInterval(timerId);
        }, this.timeleft * 1000);
        return true;
    }
}
$(document).ready(function() {
    var seconds_count;
    if (localStorage.getItem('timeleft') === null) {
        seconds_count = 3600;
        localStorage.setItem('timeleft', seconds_count);
    } else {
        seconds_count = parseInt(localStorage.getItem('timeleft'));
    }
    var TTimer = new Timer(seconds_count);
    TTimer.start();
});