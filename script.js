/**Setting Head of HTML*/
function setHeadHTML() {
    const responsiveSetting = document.createElement('meta');
    responsiveSetting.name = "viewport";
    responsiveSetting.content = "width=device-width, initial-scale=1.0";

    const styleLink = document.createElement('link');
    styleLink.rel = "stylesheet";
    styleLink.href = "./styles.css";

    const title = document.createElement('title');
    title.innerHTML = "Vivint";

    document.head.appendChild(responsiveSetting);
    document.head.appendChild(styleLink);
    document.head.appendChild(title);
}

var countDownTime = {
    time: [25, 5, 00, 20],/**order: days, hours, minutes, seconds */
    valid: false,/**valid if the coundDownTime is bigger than current time */
    done: false /**done if the coundDownTime set to 0 */
}

/**Time Function */

function checkCountDown(currentTime) {
    for (let i = 0; i < 4; i++) {
        if (countDownTime.time[i] < currentTime[i]) {
            return false;
        }
        else if (countDownTime.time[i] > currentTime[i]) {
            return true;
        }
        else {
            continue;
        }
    }
    return false;
}

function calculate60(subtractTime, index) {
    if (countDownTime.time[index] < subtractTime) {
        countDownTime.time[index] = countDownTime.time[index] + 60 - subtractTime;
        countDownTime.time[index - 1]--;
    }
    else {
        countDownTime.time[index] -= subtractTime;
    }
}

function calculateHours(subtractTime) {
    if (countDownTime.time[1] < subtractTime) {
        countDownTime.time[1] = countDownTime.time[1] + 24 - subtractTime;
        countDownTime.time[0]--;
    }
    else {
        countDownTime.time[1] -= subtractTime;
    }
}

function calculateDays(subtractTime) {
    countDownTime.time[0] -= subtractTime;
}

function timeCalculator(subtractTime) {
    valid = checkCountDown(subtractTime);
    if (valid) {
        /**Second */
        calculate60(subtractTime[3], 3);
        /**Minute */
        calculate60(subtractTime[2], 2);
        /**Hour */
        calculateHours(subtractTime[1]);
        /**Day */
        calculateDays(subtractTime[0]);
    }

}

function settingCountDownTime() {
    var currentTime = new Date();
    var subtractTime = [currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
    timeCalculator(subtractTime);
}

function getClassData(className, index) {
    return document.getElementsByClassName(className)[index].firstChild.innerHTML;
}

function changeSecond() {
    var second = parseInt(getClassData("time-box", 3));

    if (second === 0) {
        if (!changeMinute()) {
            return false;
        }
        second = 59;
    }
    else {
        second--;
    }

    document.getElementsByClassName("time-box")[3].firstChild.innerHTML = second;
    return true;
}

function changeMinute() {
    var minute = parseInt(getClassData("time-box", 2));

    if (minute === 0) {
        if (!changeHour()) {
            return false;
        }
        minute = 59;
    }
    else {
        minute--;
    }
    document.getElementsByClassName("time-box")[2].firstChild.innerHTML = minute;
    return true;
}

function changeHour() {
    var hour = parseInt(getClassData("time-box", 1));

    if (hour === 0) {
        if (!changeDay()) {
            return false;
        }
        hour = 23;
    }
    else {
        hour--;
    }
    document.getElementsByClassName("time-box")[1].firstChild.innerHTML = hour;
    return true;
}

function changeDay() {
    var day = parseInt(getClassData("time-box", 0));

    if (day === 0) {
        return false;
    }
    else {
        day--;
    }
    document.getElementsByClassName("time-box")[0].firstChild.innerHTML = day;
    return true;
}

function remove(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**Time change */
function countDown() {
    countDownTime.done = changeSecond();

    if (!countDownTime.done) {
        remove(document.getElementsByClassName("banner")[0]);
        var element = document.getElementsByClassName("banner")[0];
        element.parentNode.removeChild(element);
        clearInterval(countInterval);
    }
}

/**Header Helping Functions */
function createDiv(className) {
    const newDiv = document.createElement('div');
    newDiv.className = className;
    return newDiv;
}

function createDivWithText(className, textInfo) {
    const newDiv = createDiv(className);
    newDiv.innerHTML = textInfo;
    return newDiv;
}

function createImageLink(url, imgPath, className) {
    const link = document.createElement('a');
    const img = document.createElement('img');
    link.href = url;
    img.src = imgPath;
    img.className = className;
    link.appendChild(img);
    return link;
}

function createSpan(message) {
    const span = document.createElement('span');
    span.innerHTML = message;
    return span;
}

function createP(message) {
    const p = document.createElement('p');
    p.innerHTML = message;
    return p;
}

/**Main Message Helping Functions */

function createClickButton() {
    const button = document.createElement('a');
    const img = document.createElement('img');
    const span = createSpan("877.537.3785");
    button.href = "tel:18775373785";
    button.className = "button";
    img.src = "https://www.iconsdb.com/icons/preview/white/phone-xxl.png";
    img.className = "icon";
    button.appendChild(img);
    button.appendChild(span);
    return button;
}

function createExtraText() {
    const extra_text = createDiv("extra-text");
    extra_text.innerHTML = "*With qualifiying system purchase.&nbsp;";

    const link = document.createElement('a');
    link.href = "https://www.vivint.com/#hero-promo-details";
    link.innerHTML = "Offer details";

    extra_text.appendChild(link);
    return extra_text;
}

/**Banner Helping Function */
function createTimeBox(time_type) {
    const time_box = createDiv("time-box");
    const span_message = createSpan(time_type);

    const p = createP('');
    switch (time_type) {
        case "days":
            p.innerHTML = countDownTime.time[0];
            break;
        case "hours":
            p.innerHTML = countDownTime.time[1];
            break;
        case "minutes":
            p.innerHTML = countDownTime.time[2];
            break;
        default:
            p.innerHTML = countDownTime.time[3];
            break;
    }

    time_box.appendChild(p);
    time_box.appendChild(span_message);
    return time_box;
}

function createTimer() {
    const timer = createDiv("timer");

    const days = createTimeBox("days");
    const hours = createTimeBox("hours");
    const minutes = createTimeBox("minutes");
    const seconds = createTimeBox("seconds");

    timer.appendChild(days);
    timer.appendChild(hours);
    timer.appendChild(minutes);
    timer.appendChild(seconds);

    return timer;
}



/**Create Header */
function createHeader() {
    const header = createDiv("header");
    const logoLink = createImageLink("https://www.vivint.com/", "https://postfiles.pstatic.net/MjAyMjAyMjJfMjk3/MDAxNjQ1NDg1NzExMDk0.ZNCWcaEniMlVcUH-Iah1UhenPl0qCfSgGUes7OtzCpUg.-RKWgpd-Av4oTl9v8OREMhePivwoxfDs7JAXaM4-nXMg.PNG.upiioo/vivint_logo.PNG?type=w966", "logo");
    header.appendChild(logoLink);
    document.body.appendChild(header);

}

/*ContentWrapper Functions*/
function createMainMessage() {
    const content_wrapper = createDiv("content-wrapper");
    const content = createDiv("content");
    const small_text_1 = createDivWithText("small-text", "HOME SECURITY SALE");
    const big_text = createDivWithText("big-text", "Up to 4 Months FREE<br>Monitoring + FREE<br>Installation*<br></br>");
    const small_text_2 = createDivWithText("small-text", "CALL NOW: USE PROMO CODE 4FREE");
    const button = createClickButton();
    const extra_text = createExtraText();
    const empty = createDiv("empty");

    content.appendChild(small_text_1);
    content.appendChild(big_text);
    content.appendChild(small_text_2);
    content.appendChild(button);
    content.appendChild(extra_text);

    content_wrapper.appendChild(content);
    content_wrapper.appendChild(empty);

    document.body.appendChild(content_wrapper);
}

/* Banner*/

function createTimeBanner() {

    const banner = createDiv("banner");
    const text_box = createDivWithText("text-box", "Get Offer Before Close");
    const timer = createTimer();

    banner.appendChild(text_box);
    banner.appendChild(timer);

    document.body.appendChild(banner);
}

/* Every Functions for Landing Webpage*/

setHeadHTML();
createHeader();
createMainMessage();
settingCountDownTime();
if (valid) {
    createTimeBanner();
    var countInterval = setInterval(function () {
        countDown();
    }, 1000);
}

