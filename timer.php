
<script type="text/javascript" src="https://code.jquery.com/jquery-1.4.1.min.js"></script>
<script>
    setInterval(function () {
        var currentTime = new Date();
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes();
        var currentSeconds = currentTime.getSeconds();
        currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
        currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
        var timeOfDay = (currentHours < 12) ? "AM" : "PM";
        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
        currentHours = (currentHours == 0) ? 12 : currentHours;
        var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
        document.getElementById("timer").innerHTML = currentTimeString;
    }, 1000);

    setInterval(function () {
        var currentok = new Date();
        var currentoksecond = currentok.getUTCSeconds();
        document.getElementById("timer2").innerText = currentoksecond;
    }, 1000);

</script>

<!--<h1>Print here: </h1>-->
<!--<br/>-->
<!--<div id="timer"></div>-->
<!---->
<!--<br/>-->
<!--<h1>Print Current UTC second</h1>-->
<!--<div id="timer2"></div>-->


