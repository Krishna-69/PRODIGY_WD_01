let startTime;
let running = false;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
        document.body.style.backgroundImage = "none"; // Reset background image
        running = false;
    } else {
        startTime = Date.now() - laps.reduce((a, b) => a + b, 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStop").innerText = "Stop";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?stopwatch')"; // Change background image when started
        running = true;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startStop").innerText = "Start";
    document.body.style.backgroundImage = "none"; // Reset background image
    running = false;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (running) {
        let lapTime = Date.now() - startTime - laps.reduce((a, b) => a + b, 0);
        laps.push(lapTime);
        let lapDisplay = document.createElement("li");
        lapDisplay.className = "lap";
        lapDisplay.innerText = formatTime(lapTime);
        document.getElementById("laps").appendChild(lapDisplay);
    }
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor(time % 1000);
    
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
