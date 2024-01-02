let countInterval;

countDown = () => {
    let secElement = document.querySelector('#sec');
    let minElement = document.querySelector('#min');
    let hrElement = document.querySelector('#hours');
    let dayElement = document.querySelector('#days');
    let secRemain = secElement.style.getPropertyValue('--value');
    let minRemain = minElement.style.getPropertyValue('--value');
    let hrRemain = hrElement.style.getPropertyValue('--value');
    let dayRemain = dayElement.style.getPropertyValue('--value');

    if (dayRemain == 0 && hrRemain == 0 && minRemain == 0 && secRemain == 0) {
        newYearMode();
        return;
    }

    let newSec = secRemain - 1;
    let newMin = minRemain;
    let newHr = hrRemain;
    let newDay = dayRemain;

    if (secRemain == 0) {
        newSec = 59;
        newMin = minRemain - 1;
    }

    if (dayRemain != 0 && hrRemain != 0 && minRemain == 0) {
        newMin = 59;
        newHr = hrRemain - 1;
    }

    if (dayRemain != 0 && hrRemain == 0) {
        newHr = 23;
        newDay = dayRemain - 1;
    }

    secElement.style.setProperty('--value', newSec);
    minElement.style.setProperty('--value', newMin);
    hrElement.style.setProperty('--value', newHr);
    dayElement.style.setProperty('--value', newDay);
}

counter = () => {
    let nowDate = new Date();
    let newYearDate = new Date(nowDate.getFullYear() + 1, 0, 1);
    let remainingMilli = newYearDate - nowDate;
    let remainingSec = Math.floor(remainingMilli / 1000);
    let remainingMin = Math.floor(remainingSec / 60);
    let remainingHr = Math.floor(remainingMin / 60);
    let remainingDay = Math.floor(remainingHr / 24);
    let milli = remainingMilli % 1000;
    let sec = remainingSec % 60;
    let min = remainingMin % 60;
    let hr = remainingHr % 24;
    let day = remainingDay;

    let secElement = document.querySelector('#sec');
    let minElement = document.querySelector('#min');
    let hrElement = document.querySelector('#hours');
    let dayElement = document.querySelector('#days');

    secElement.style.setProperty('--value', sec);
    minElement.style.setProperty('--value', min);
    hrElement.style.setProperty('--value', hr);
    dayElement.style.setProperty('--value', day);

    // secElement.style.setProperty('--value', sec);
    // minElement.style.setProperty('--value', 0);
    // hrElement.style.setProperty('--value', 0);
    // dayElement.style.setProperty('--value', 0);

    setTimeout(() => countInterval = setInterval(countDown, 1000), milli);
    // countInterval = setInterval(countDown, 1000);
}

newYear = () => {
    const container = document.querySelector('.fireworks');
    const fireworks = new Fireworks.default(container);
    const options = {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 10,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 1,
            max: 100
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        sounds: {
            enabled: true,
            volume: {
                min: 4,
                max: 10
            }
        }
    };

    fireworks.updateOptions(options);
    fireworks.start();
}

newYearMode = () => {
    let counterElement = document.querySelector('#counter');
    counterElement.innerHTML = "";

    displayNewYear();
    newYear();
    clearInterval(countInterval);
}

counterMode = () => {
    let counterElement = document.querySelector('#newyear');
    counterElement.innerHTML = "";

    displaycounter();
    counter();
}

displaycounter = () => {
    let counterElement = document.querySelector('#counter');
    // counterElement.innerHTML = '';
    counterElement.innerHTML =
        `
    <div class="flex flex-col justify-center content-center min-h-screen">
        <div class="flex flex-row flex-wrap gap-4 text-center justify-center content-center text-5xl p-6 -mt-14">
            <div>Countdown</div>
            <div>to</div> 
            <div>New Year</div>
        </div>
        <div class="grid grid-flow-col gap-5 text-center auto-cols-max justify-center content-center">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content max-h-24">
                <span class="countdown countdown-days font-mono text-5xl">
                    <span id="days"></span>
                </span>
                days
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content max-h-24">
                <span class="countdown font-mono text-5xl">
                    <span id="hours"></span>
                </span>
                hours
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content max-h-24">
                <span class="countdown font-mono text-5xl">
                    <span id="min"></span>
                </span>
                mins
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content max-h-24">
                <span class="countdown font-mono text-5xl">
                    <span id="sec"></span>
                </span>
                secs
            </div>
        </div>
    </div>
    `;

    // for generate days content
    // initDaysContent();
}

displayNewYear = () => {
    let date = new Date();
    let newyearElement = document.querySelector('#newyear');
    newyearElement.innerHTML =
        `
    <div class="fireworks relative min-h-screen z-1"></div>
    <div class="flex absolute bottom-0 left-0 right-0 top-0 text-center justify-center items-center animate-bounce z-2">
        <h1 class="text-6xl">HAPPY NEW YEAR<br>${date.getFullYear()}</h1>
    </div>
    `;
}

selectedMode = () => {
    let nowDate = new Date();
    let newYearDate = new Date(2024, 0, 1);
    // nowDate.setFullYear(2024, 0, 1)
    nowDate.setHours(0, 0, 0, 0);

    if (nowDate.getTime() == newYearDate.getTime()) {
        newYearMode();
    } else {
        counterMode();
    }
}

initTitle = () => {
    let nowDate = new Date()
    document.title = `Countdown | New Year ${nowDate.getFullYear() + 1}`;
}

// initDaysContent = () => {
//     function daysInMonth(month, year) {
//         return new Date(year, month, 0).getDate();
//     }

//     function daysInYear(year) {
//         var days = 0;

//         for (var month = 1; month <= 12; month++) {
//             days = days + daysInMonth(month, year);
//         }

//         return days;
//     }

//     function pad(d) {
//         if (d < 100) {
//             return String("0" + d).slice(-3) + '\\A';
//         } else {
//             return String("00" + d).slice(-3) + '\\A';
//         }
//     }

//     var now = new Date();
//     var totalDate = daysInYear(now.getFullYear());
//     var content = '';
//     for(let i = 0; i < totalDate; i++) {
//         content += pad(i);

//         if (i + 1 < totalDate) {
//             content += ' ';
//         }
//     }
    
//     console.log(content);
// }

document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        clearInterval(countInterval);
        selectedMode();
    }
}, false);

initTitle();
selectedMode();