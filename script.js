var slideItems = [/**Order: main_text, link_text, link, imgLink */
    ["Protect your perimeter", "Outdoor Camera Pro", "https://www.vivint.com/products/outdoor-camera", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DOutdoor%2C%20Devide%3DDesktop.png.webp?itok=9J5v_tNz"],
    ["Stop package theft", "Doorbell Camera Pro", "https://www.vivint.com/products/doorbell-camera", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DDoorbell%2C%20Devide%3DDesktop.png.webp?itok=eH375NXZ"],
    ["Lock up automatically", "Smart Locks", "https://www.vivint.com/products/smart-locks", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-10/Tab-SmartLock.png.webp?itok=zI49yCVP"],
    ["Convenient home control", "Smart home control", "https://www.vivint.com/products/smart-control", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DSmart%20Control%2C%20Devide%3DDesktop.png.webp?itok=3unSJCR4"],
    ["30 days of 24/7 video", "Smart Drive", "https://www.vivint.com/products/video-recording", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DSmart%20Drive%2C%20Devide%3DDesktop.png.webp?itok=Qd5uNRzT"],
    ["help when you need it", "24/7 monitoring", "https://www.vivint.com/products/monitoring", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DMonitor%2C%20Devide%3DDesktop.png.webp?itok=tG3mjeoF"],
    ["Check in on your home", "Indoor Camera", "https://www.vivint.com/products/ping", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DIndoor%20Cam%2C%20Devide%3DDesktop.png.webp?itok=mHnsaC3T"],
    ["Monitor doors and windows", "Security sensors", "https://www.vivint.com/products/security-sensors", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DSensors%2C%20Devide%3DDesktop.png.webp?itok=PcfyW8Qc"],
    ["Control the garage from anywhere", "Garage door control", "https://www.vivint.com/products/garage-door-control", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DGarage%20Control%2C%20Devide%3DDesktop.png.webp?itok=dN_z_It_"],
    ["Protect against car theft", "Car Guard", "https://www.vivint.com/products/car-guard", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DCar%20Guard%2C%20Devide%3DDesktop.png.webp?itok=3IBt-ffG"],
    ["Smart temperature control", "Thermostat", "https://www.vivint.com/products/smart-thermostat", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DThermostat%2C%20Devide%3DDesktop.png.webp?itok=GKNVJx2w"],
    ["Protect against disasters", "Safety alarms", "https://www.vivint.com/products/safety-alarms", "https://www.vivint.com/sites/default/files/styles/square_hq_280x280/public/image/2021-05/Product%3DSmoke%20Detector%2C%20Devide%3DDesktop.png.webp?itok=uI6NBHr_"],
]

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
function createCheckHomeSafetyTest() {
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
    9
    const button = createImageLink("./test/safetytest.html", "https://www.iconsdb.com/icons/preview/white/phone-xxl.png", "");
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

    video_mask.setAttribute("id", "myVideo");

    const message = createDiv("video-text");
    message.setAttribute('id', "video" + videoNum);
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
    video_mask.appendChild(message);

    wrapper.appendChild(video_mask);


    /**wrapper.appendChild(message);*/

    document.body.appendChild(wrapper);
}

/**buffer for showing all */
function createBuffer() {
    const buffer = createDiv("padding");
    document.body.appendChild(buffer);
}

/**Basic Functions */

function remove(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function makeDiv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

function makeDivWithID(id) {
    var div = document.createElement('div');
    div.setAttribute('id', id);
    return div;
}

function makeText(className, textInfo) {
    var text = document.createElement('h2');
    text.className = className;
    text.innerHTML = textInfo;
    return text;
}

function makeTextElement(tag, text) {
    var element = document.createElement(tag);
    element.innerHTML = text;
    return element;
}

function makeCanvas(id) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute('id', id);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    return canvas;
}

/**Slide Show Functions */

function makeSlideShowWithText() {
    makeIntroduceSlide();
    makeSlides();
    makeSlideShow();

    function makeIntroduceSlide() {
        const introduce_wrapper = makeDiv("introduce_wrapper");

        const slide_introduce = makeDiv("slide_introduce");
        const small_text = makeText("small-text-main", "EVERYTHING WORKS TOGETHER");
        const big_text = makeText("bit-text-main", "Combine products for a safer home");

        const slide_button = makeDiv("slide_button");
        const left_button = makeDiv("slide_click_button");
        const right_button = makeDiv("slide_click_button");
        left_button.innerHTML = "&lang;";
        right_button.innerHTML = "&rang;";

        slide_introduce.appendChild(small_text);
        slide_introduce.appendChild(big_text);

        slide_button.appendChild(left_button);
        slide_button.appendChild(right_button);

        introduce_wrapper.appendChild(slide_introduce);
        introduce_wrapper.appendChild(slide_button);

        document.body.appendChild(introduce_wrapper);
    }

    function makeSlides() {
        const slide_show = makeDiv("slideShow");
        const slides = makeDiv("slides");
        for (let i = 0; i < slideItems.length; i++) {
            const slide = document.createElement('a');
            slide.className = "slide";
            slide.href = slideItems[i][2];

            const img = document.createElement('img');
            img.src = slideItems[i][3];

            const main_text = makeText("slide_main_text", slideItems[i][0]);
            const single_text = makeText("single_link", slideItems[i][1] + '&nbsp;&nbsp;&rang;');

            slide.appendChild(img);
            slide.appendChild(main_text);
            slide.appendChild(single_text);

            slides.appendChild(slide);
        }

        slide_show.appendChild(slides);

        document.body.appendChild(slide_show);
    }
    
    function makeSlideShow() {
        const slides = document.querySelector('.slides');
        const slideImg = document.querySelectorAll('.slide');
        let currentIdx = 0;
        const slideCount = slideItems.length;
        const prev = document.querySelectorAll('.slide_click_button')[0];
        const next = document.querySelectorAll('.slide_click_button')[1];
        const slideWidth = 400;
        const slideMargin = 25;
        const black_color = "#141c1c";
        const grey_color = "#bfc7c7";

        slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

        function moveSlide(num) {
            slides.style.left = -num * 465 + 'px';
            currentIdx = num;
        }

        function addHoverStyleNext() {
            next.style.backgroundColor = grey_color;
        }
        function addBasicStyleNext() {
            next.style.backgroundColor = black_color;
        }
        function addHoverStylePrev() {
            prev.style.backgroundColor = grey_color;
        }
        function addBasicStylePrev() {
            prev.style.backgroundColor = black_color;
        }

        prev.style.backgroundColor = grey_color;

        prev.addEventListener('click', function () {
            if (currentIdx !== 0) {
                moveSlide(currentIdx - 1);
                if (currentIdx === 0) {
                    prev.style.backgroundColor = grey_color;
                    prev.removeEventListener('mouseenter', addBasicStylePrev);
                    prev.removeEventListener('mouseleave', addBasicStylePrev);
                }
                else if (currentIdx === slideCount - 6) {
                    next.style.backgroundColor = black_color;
                    next.addEventListener('mouseenter', addHoverStyleNext);
                    next.addEventListener('mouseleave', addBasicStyleNext);
                }
            }
        });

        next.addEventListener('click', function () {
            if (currentIdx !== slideCount - 5) {
                moveSlide(currentIdx + 1);
                if (currentIdx == 1) {
                    prev.style.backgroundColor = black_color;
                    prev.addEventListener('mouseenter', addHoverStylePrev);
                    prev.addEventListener('mouseleave', addBasicStylePrev);
                }
                else if (currentIdx === slideCount - 5) {
                    next.style.backgroundColor = grey_color;
                    next.removeEventListener('mouseenter', addBasicStyleNext);
                    next.removeEventListener('mouseleave', addBasicStyleNext);
                }
            }
        });
    }
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
makeSlideShowWithText();