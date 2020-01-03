var countdown = new Vue({
    el: '#countdown',
    data: {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    mounted: function() {
        setInterval(() =>{
            let now = new Date().getTime();
            let end = new Date('2020-02-13 18:55:49:123').getTime();
            let diff = parseInt((end - now)/1000);
            // since we know only count january days..
            // thus hardcode to 31..
            let months = diff/(31 * 24 * 60 * 60);
            this.months = parseInt(months);
            
            let rem = diff - parseInt(months) * (31 * 24 * 60 * 60);
            let days = rem/(24 * 60 * 60);
            this.days = parseInt(days);

            rem = rem - parseInt(days) * (24 * 60 * 60);
            let hours = rem/(60 * 60);
            this.hours = parseInt(hours);

            rem = rem - parseInt(hours) * (60 * 60);
            let minutes = rem/60;
            this.minutes = parseInt(minutes);

            rem = rem - parseInt(minutes) * 60;
            let seconds = rem;
            this.seconds = seconds;
        }, 1000);
    }

});