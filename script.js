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
    time: [28, 12, 00, 00],/**order: days, hours, minutes, seconds */
    valid: false,/**valid if the countDownTime is bigger than current time */
    done: false /**done if the countDownTime set to 0 */
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

        var buffer = document.getElementsByClassName("padding")[0];
        element.parentNode.removeChild(buffer);
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
    const banner = document.createElement('a');

    banner.href = "https://www.vivint.com/packages/home-security";
    /**This link can be changed to a desired url */
    banner.className = "banner";

    const text_box = createDivWithText("text-box", "Get Offer Before Close");
    const timer = createTimer();

    banner.appendChild(text_box);
    banner.appendChild(timer);
    
    document.body.appendChild(banner);
}

/**Functions for setting the link page for "Find My Vivint Plan" */

function createFindMyVivintPlanLink() {
    const wrapper = createDiv("wrapper");
    const find_my_plan_wrapper = createDiv("find_my_plan_wrapper");
    const plan_content = createDiv("plan_content");

    const small_text_1 = createDivWithText("small-text-s", "SEE WHAT PLAN IS AVAILABLE");
    const small_text_2 = createDivWithText("small-text-s big-padding-top", "FIND CUSTOMIZED VIVINT PLAN FOR FREE");

    const big_text = createDivWithText("big-text-s small-padding-bottom", "FIND MY VIVINT PLAN");

    const button = createImageLink("./plan/findmyplan.html", "https://www.iconsdb.com/icons/preview/white/phone-xxl.png", "");
    button.className = "button";
    button.innerHTML = "Find My Plan";

    plan_content.appendChild(small_text_1);
    plan_content.appendChild(big_text);
    plan_content.appendChild(small_text_2);
    plan_content.appendChild(button);

    find_my_plan_wrapper.appendChild(plan_content);

    wrapper.appendChild(find_my_plan_wrapper);

    document.body.appendChild(wrapper);
}

/**Functions for creating the link page for "Check My Home Safety" */
function createCheckHomeSafetyTest(){
    const wrapper = createDiv("wrapper");
    const check_home_safety_wrapper = createDiv("check_home_safety_wrapper");
    const plan_content = createDiv("safety_content");
    const image_mask = createDiv("image-mask");
    const img = document.createElement('img');
    img.src = "https://cammy-marketing.s3.amazonaws.com/2015/02/1424795684/burglar-front-house-dark.jpg";
    
    const small_text_1 = createDivWithText("small-text-s", "FIND YOUR HOME SAFETY GRADE");
    small_text_1.style.marginTop = "20px";
    const small_text_2 = createDivWithText("small-text-s big-padding-top", "CHECK YOUR HOME SAFETYNESS FOR FREE");

    const big_text = createDivWithText("big-text-s", "CHECK MY HOME SAFETY");

    const button = createImageLink("./plan/findmyplan.html", "https://www.iconsdb.com/icons/preview/white/phone-xxl.png", "");
    button.className = "button";
    button.innerHTML = "SAFETY TEST";
    button.style.margin = "20px";

    plan_content.appendChild(small_text_1);
    plan_content.appendChild(big_text);
    plan_content.appendChild(small_text_2);
    plan_content.appendChild(button);

    image_mask.appendChild(img);

    check_home_safety_wrapper.appendChild(image_mask);
    check_home_safety_wrapper.appendChild(plan_content);

    wrapper.appendChild(check_home_safety_wrapper);

    document.body.appendChild(wrapper);
}

/**Create a Video */

function breakMessage(message) {
    var span = document.createElement('span');
    /**40 characters >> change the line >> if it includes the word
     * include that word and change.
     * Then cut the word and do the break thing again.
     * Do this until the message length is below 40. 
     * If the word gets too long for the divide position,
     * Then it go backs one character each time to find the space 
     * to break the sentence. 
     */
    var divideLocation = 35;
    var checkRight = false;

    var breakLine = document.createElement('br');

    while (message.length > 35) {
        if (!checkRight) {
            if (message.charAt(divideLocation) != ' ') {
                divideLocation++;
            }
            else {
                if (divideLocation < 50) {
                    span.innerHTML += message.substring(0, divideLocation).trim();
                    span.appendChild(breakLine);
                    message = message.substring(divideLocation);
                    divideLocation = 35; /**resetting the location */                    
                }
                else {
                    checkRight = true;
                    divideLocation = 35;
                }
            }
        }
        else {
            if (message.charAt(divideLocation) != ' ') {
                divideLocation--;
            }
            else {
                span.innerHTML += message.substring(0, divideLocation).trim();
                span.appendChild(breakLine);
                message = message.substring(divideLocation);
                divideLocation = 35; /**resetting the location */                
            }
        }

    }
    /**Last part */
    if (message.length != 0) {
        span.innerHTML += message.substring(0, message.length).trim();
    }

    return span;
}

function createVideo(videoNum, videoLink, videoMessage) {
    const wrapper = createDiv("wrapper");
    const video_mask = createDiv("video-mask");
    const video = document.createElement('video');
    
    const message = createDiv("video-text");
    message.setAttribute('id', "video"+videoNum);
    const span = breakMessage(videoMessage);

    message.appendChild(span);

    video.src = videoLink;
    video.controls = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.preload = "none";
    video.innerHTML = "Your Browser does not support the video tag";

    video_mask.appendChild(video);

    wrapper.appendChild(video_mask);


    /**wrapper.appendChild(message);*/

    document.body.appendChild(wrapper);
    document.body.appendChild(message);
}

/**buffer for showing all */
function createBuffer(){
    const buffer = createDiv("padding");
    document.body.appendChild(buffer);
}

/* Every Function for Landing a Webpage*/

setHeadHTML();
createHeader();
createMainMessage();
createFindMyVivintPlanLink();

settingCountDownTime();
if (valid) {
    createTimeBanner();
    var countInterval = setInterval(function () {
        countDown();
    }, 1000);
}

createVideo(1, "./videos/vivint.mp4", "Protect your home with a Vivint system that stops crime before it starts");
createCheckHomeSafetyTest();
createBuffer();
