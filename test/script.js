
var Q_A = {
    questionList: [
        "Do you have your lock in your house?",
        "How many outdoor cameras do you have?",
        "How many indoor cameras do you have?",
        "Do you have a doorbell camera?",
        "Do you have a smart lock system?",
        "Do you have a garage door control?",
        "Do you have a car guard?",
        "How many safety alarms do you have?",
    ],
    answerList: [
        ["Yes", "No"],/**100% or 0% */
        ["None", "1 Camera", "2 Cameras", "3+ Cameras"],/**0% 50% 70% 100% */
        ["None", "1 Alarm", "2 Alarms", "3+ Alarms "],
    ],
    pair: [
        [0, 0], [1, 1], [2, 1], [3, 0],
        [4, 0], [5, 0], [6, 0], [7, 2],
    ],
    points: [/**Different Maximum Grade based on the importance of each */
        [0, 20], [1, 10], [2, 10], [3, 5],
        [4, 5], [5, 4], [6, 8], [7, 10],
    ],
    specList: [
        "Lock", "Outdoor Cameras", "Indoor Cameras", "Doorbell Camera",
        "Smart Lock System", "Garage Door Control", "Car Guard", "Safety Alarms",
    ],
    suggestionBasic: [
        "24/7 Monitoring",
        "Intrusion detection",
        "Touchscreen control panel",
        "Mobile app"
    ],
    premium: [
        "Video security",
        "Theft deterrent"
    ],
    premiumPlus: [
        "Voice control",
        "Stored video clips",
        "Smart home automation",
        "Vehicle protection"
    ],
    suggestionLevel: ["Starter", "Premium", "Premium Plus"],
    suggestionExplanation: ["Basic home security", "Complete home protection", "Security + Automation"],
    currentQuestion: 0,
    progress: 10,
}

var planNum = null;
var originalPlanNum = null;

const maximumPoint = 72;
var userGrade = 30;
var userPercentile = 30;

const canvasWidth = 500;
const canvasHeight = 500;

const userAnswer = new Map();

const arrow_icon_address = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"

/**Data Functions 
 * In the future move the data into the backend
 * For now we store them in the local server.
 * To calculate the real percentile based on users' information,
 * I need data from real Vivint Webpage. 
*/
function calculateUserGrade() {

    if (userAnswer.length != 0) {
        calculateGrade();
    }
    else {
        userGrade = 0;
        userPercentile = 0;
    }

    function calculateGrade() {
        var grade = 0;
        for (let i = 0; i < Q_A.questionList.length; i++) {
            var answer = userAnswer.get(i)
            if (answer != null) {
                const userAnswerNum = Q_A.pair[i][1];

                if (userAnswerNum === 0) {/** Yes or no 100% or 0% */
                    if (answer === 0) {
                        grade += Q_A.points[i][1];
                    }/**else is 0 so not do anything */
                }
                else { /**0 30% 70% 100% */
                    if (answer === 1) {
                        grade += (0.3 * Q_A.points[i][1]);
                    }
                    else if (answer === 2) {
                        grade += (0.7 * Q_A.points[i][1]);
                    }
                    else if (answer === 3) {
                        grade += Q_A.points[i][1];
                    }
                }
            }
        }
        grade = Math.round((grade / maximumPoint) * 100);
        userGrade = grade;
        userPercentile = grade;
    }
}

function setCustomizedPlan() {
    /**if user didn't choose the option or they selected not sure for everything. */
    if (userGrade < 50){
        planNum = 2;
    }
    else if (userGrade < 80){
        planNum = 1;
    }
    else {
        planNum = 0;
    }
    originalPlanNum = planNum;
    return planNum;
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
/**DOM for Landing the Safety Question Page */
function landingSafetyQuestionPage() {
    makeHeader();
    makeQuestionPage();

    function makeHeader() {
        var header = document.createElement('div');
        header.className = "header";

        var vividLink = document.createElement('a');
        vividLink.href = "https://www.vivint.com";

        var logo = document.createElement('img');
        logo.className = "logo";
        logo.src = "https://postfiles.pstatic.net/MjAyMjAyMjJfMjk3/MDAxNjQ1NDg1NzExMDk0.ZNCWcaEniMlVcUH-Iah1UhenPl0qCfSgGUes7OtzCpUg.-RKWgpd-Av4oTl9v8OREMhePivwoxfDs7JAXaM4-nXMg.PNG.upiioo/vivint_logo.PNG?type=w966";

        vividLink.appendChild(logo);

        header.appendChild(vividLink);

        document.body.appendChild(header);
    }

    function makeQuestionPage() {

        var content_wrapper = makeDiv("content_wrapper");

        var progress_bar = makeProgressBar();

        var content = makeQuestionContext();

        var buttons = makeButton();

        content_wrapper.appendChild(content);
        content_wrapper.appendChild(progress_bar);
        content_wrapper.appendChild(buttons);

        document.body.appendChild(content_wrapper);
    }

    function changeQuestion() {
        setProgress();
        document.getElementsByClassName("progress_bar_begin")[0].style.width = Q_A.progress + "%";
        var content = document.getElementsByClassName("content")[0];
        remove(content);
        makeQ_A(content);
    }

    function setProgress() {
        Q_A.progress = Math.ceil(((Q_A.currentQuestion + 1) / Q_A.questionList.length) * 100);
    }

    function makeProgressBar() {
        var wrapper = makeDiv("question_wrapper");

        var td0 = document.createElement('td');
        td0.innerHTML = "0%&nbsp;";

        var progressBar = makeDiv("progress_bar");
        var progressBarProgress = makeDiv("progress_bar_begin");
        setProgress();
        var progressStyle = Q_A.progress + "%";
        progressBarProgress.style.width = progressStyle;
        progressBar.appendChild(progressBarProgress);

        var td100 = document.createElement('td');
        td100.innerHTML = "100%";

        wrapper.appendChild(td0);
        wrapper.appendChild(progressBar);
        wrapper.appendChild(td100);

        return wrapper;
    }

    function makeButton() {
        var wrapper = makeDiv("question_wrapper");

        var button_right = makeDiv("button");
        var right_icon = document.createElement('img');
        right_icon.className = "icon";
        right_icon.src = arrow_icon_address;
        button_right.appendChild(right_icon);
        button_right.addEventListener("click", nextButtonEvent);

        wrapper.appendChild(button_right);

        return wrapper;
    }

    function makeQ_A(content) {
        /**Make Question */
        var question = makeText("question", Q_A.questionList[Q_A.currentQuestion]);
        content.appendChild(question);
        var answerNum = Q_A.pair[Q_A.currentQuestion][1];
        /**Make Answers */
        for (let i = 0; i < Q_A.answerList[answerNum].length; i++) {
            var answer = makeText("answer", Q_A.answerList[answerNum][i]);
            answer.addEventListener("click", function () {
                nextQuestion(i);
            }, false);
            content.appendChild(answer);
        }
    }

    function makeQuestionContext() {
        var content = makeDiv("content");
        content.style = "margin-top: 2em;";
        makeQ_A(content);
        return content;
    }

    function prevButtonEvent() {
        Q_A.currentQuestion--;
        changeQuestion();
        if (Q_A.currentQuestion === 0) {
            var buttonToDelete = document.getElementsByClassName("button")[0];
            buttonToDelete.parentNode.removeChild(buttonToDelete);
            document.getElementsByClassName("button")[0].classList.remove("b_right");
        }
        colorChosenAnswer();
    }

    function makePrevButton() {
        var button_left = makeDiv("button b_left");
        var left_icon = document.createElement('img');
        left_icon.className = "icon flip";
        left_icon.src = arrow_icon_address;
        button_left.appendChild(left_icon);
        button_left.addEventListener("click", prevButtonEvent);
        document.getElementsByClassName("question_wrapper")[1].insertBefore(
            button_left, document.getElementsByClassName("button")[0]);
    }

    function nextButtonEvent() {
        if (Q_A.currentQuestion === 0) {
            makePrevButton();
            document.getElementsByClassName("button")[1].classList.add("b_right");
            Q_A.currentQuestion++;
            changeQuestion();
            colorChosenAnswer();
        }
        else if (Q_A.currentQuestion + 1 === Q_A.questionList.length) {
            remove(document.getElementsByClassName("content_wrapper")[0]);
            landingSafetyGradePage();
        }
        else {
            Q_A.currentQuestion++;
            changeQuestion();
            colorChosenAnswer();
        }
    }

    function nextQuestion(answerNumber) {
        if (Q_A.currentQuestion === 0) {
            makePrevButton();
            document.getElementsByClassName("button")[1].classList.add("b_right");
            userAnswer.set(Q_A.currentQuestion, answerNumber);
            Q_A.currentQuestion++;
            changeQuestion();
        }
        else if (Q_A.currentQuestion + 1 === Q_A.questionList.length) {
            remove(document.getElementsByClassName("content_wrapper")[0]);
            userAnswer.set(Q_A.currentQuestion, answerNumber);
            landingSafetyGradePage();
        }
        else {
            userAnswer.set(Q_A.currentQuestion, answerNumber);
            Q_A.currentQuestion++;
            changeQuestion();
        }
    }

    function colorChosenAnswer() {
        if (userAnswer.get(Q_A.currentQuestion) != null) {
            document.getElementsByClassName("answer")[userAnswer.get(Q_A.currentQuestion)].classList.add("chosenAnswer");
        }
    }
}

/**DOM For Landing the Safety Grade Page */
function landingSafetyGradePage() {
    const wrapper = makeDiv("wrapper");
    const text_wrapper = makeTextWrapper();
    const content_wrapper = makeDiv("question_wrapper");

    calculateUserGrade();
    const grade_container = makeGradeContainer();
    const spec_container = makeSpecContainer();
    const medal_container = makeMedalContainer();

    content_wrapper.appendChild(grade_container);
    content_wrapper.appendChild(spec_container);
    content_wrapper.appendChild(medal_container);

    wrapper.appendChild(text_wrapper);
    wrapper.appendChild(content_wrapper);

    document.body.appendChild(wrapper);

    makeGrade();
    makeMedal();
    countUp();
    suggestPlan();

    function makeTextWrapper() {
        const text_wrapper = makeDiv("text_wrapper");
        const main_text = makeTextElement('h1', "My Home Safety Grade is:");
        text_wrapper.appendChild(main_text);
        return text_wrapper;
    }

    function makeGradeContainer() {
        const gradeContainer = makeDiv("box center relative");
        const canvas = makeCanvas("grade_circle");
        const grade = makeDivWithID("grade");
        grade.innerHTML = getLetterGrade();
        gradeContainer.appendChild(canvas);
        gradeContainer.appendChild(grade);
        return gradeContainer;

        function getLetterGrade() {
            if (userGrade < 20) {
                return 'F';
            }
            else if (userGrade < 40) {
                return 'C-';
            }
            else if (userGrade < 60) {
                return 'C';
            }
            else if (userGrade < 70) {
                return 'C+';
            }
            else if (userGrade < 75) {
                return 'B-';
            }
            else if (userGrade < 80) {
                return 'B';
            }
            else if (userGrade < 85) {
                return 'B+';
            }
            else if (userGrade < 90) {
                return 'A-';
            }
            else if (userGrade < 95) {
                return 'A';
            }
            else {
                return 'A+';
            }
        }
    }

    function makeSpecContainer() {
        const spec_container = makeDiv("box left");
        const spec_header = makeTextElement('h3', "Safe Home Devices");
        const spec_List = makeSpecList();
        function makeSpecList() {
            const table = document.createElement('table');
            const tbody = document.createElement('tbody');
            for (let i = 0; i < Q_A.specList.length; i++) {
                const tr = document.createElement('tr');
                const spec_name = makeTextElement('td', Q_A.specList[i]);
                var user_spec = null;
                if (userAnswer.get(i) != null) {
                    user_spec = makeTextElement('td', userAnswer.get(i));
                }
                else {
                    var answerNum = Q_A.pair[i][1];
                    var nullAnswerNum = 0;
                    if (answerNum === 0) {
                        nullAnswerNum = 1;
                    }
                    user_spec = makeTextElement('td', Q_A.answerList[answerNum][nullAnswerNum]);
                }
                tr.appendChild(spec_name);
                tr.appendChild(user_spec);

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

            return table;
        }
        spec_container.appendChild(spec_header);
        spec_container.appendChild(spec_List);

        return spec_container;
    }

    function makeMedalContainer() {
        const medal_conatiner = makeDiv("box center relative");
        const canvas = makeCanvas("medal");
        const top = makeDivWithID("top");
        const percent = makeDivWithID("percent");

        if (userPercentile > 50) {
            top.innerHTML = "TOP";
            percent.innerHTML = 100 - userPercentile;
        }
        else {
            top.innerHTML = "BOTTOM";
            percent.innerHTML = userPercentile;
        }

        medal_conatiner.appendChild(canvas);
        medal_conatiner.appendChild(top);
        medal_conatiner.appendChild(percent);

        return medal_conatiner;
    }
}


/**FadeIn & FadeOut Functions */

function fadeIn(target) {
    var level = 0;
    var inTimer = null;
    inTimer = setInterval(function () {
        level = fadeInAction(target, level, inTimer);
    }, 50);
}

function fadeInAction(target, level, inTimer) {
    level = level + 0.1;
    changeOpacity(target, level);
    if (level > 1) {
        clearInterval(inTimer);
    }
    return level;
}

function fadeOut(target) {
    var level = 1;
    var outTimer = null;
    outTimer = setInterval(function () {
        level = fadeOutAction(target, level, outTimer);
    }, 50);
}

function fadeOutAction(target, level, outTimer) {
    level = level - 0.1;
    changeOpacity(target, level);
    if (level < 0) {
        clearInterval(outTimer);
    }
    return level;
}

function changeOpacity(target, level) {
    var obj = target;
    obj.style.opacity = level;
    obj.style.MozOpacity = level;
    obj.style.KhtmlOpacity = level;
    obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
    obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

function makeGrade() {
    var canvas = document.getElementById('grade_circle');
    var ctx = canvas.getContext('2d');

    var radius = 220;
    var endPercent = userPercentile;
    var CurPer = 0;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;

    ctx.lineWidth = "30";
    ctx.strokeStyle = "blue";

    function drawBackCircle() {
        ctx.strokeStyle = "rgb(210, 210, 210)";
        ctx.beginPath();
        ctx.arc('250', '250', radius, 0, (Math.PI * 2 * radius), false);
        ctx.stroke();
    }

    function drawCircle(currentPerc) {
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc('250', '250', radius, quart, (circ * currentPerc) + quart, false);
        ctx.stroke();

        CurPer++;
        if (CurPer < endPercent) {
            requestAnimationFrame(function () {
                drawCircle(CurPer / 100);
            });
        }
        else {
            /**Insert the Character*/
        }
    }

    /**Functions of setting which color to do and what grade to give */
    drawBackCircle();
    drawCircle();
}

function makeMedal() {
    var canvas = document.getElementById('medal');
    var ctx = canvas.getContext('2d');

    var radius = 140;
    var endPercent = userPercentile;
    var CurPer = 0;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;

    const gold = "#f8d550";
    const light_gold = "#fbe880";
    const dark_gold = "#f7cc47";
    const blue = "#4571e6";
    const pink = "#ef8f8c";

    ctx.lineWidth = "30";
    ctx.strokeStyle = "blue";

    function drawFirstRectangle() {
        ctx.fillStyle = blue;
        ctx.fillRect(160, 50, 60, 80);
    }

    function drawSecondRectangle() {
        ctx.fillStyle = 'white';
        ctx.fillRect(220, 50, 60, 80);
    }

    function drawThirdRectangle() {
        ctx.fillStyle = blue;
        ctx.fillRect(280, 50, 60, 80);
    }

    function drawConnectingRectangle() {
        ctx.fillStyle = pink;
        ctx.fillRect(160, 130, 180, 10);
    }

    function drawBackCircle() {
        ctx.strokeStyle = dark_gold;
        ctx.beginPath();
        ctx.arc('250', '300', radius, 0, 10, false);
        ctx.stroke();
        ctx.fillStyle = light_gold;
        ctx.fill();
        ctx.arc('250', '300', radius, 0, 10, false);
        ctx.stroke();
    }

    function drawCircle(currentPerc) {
        ctx.strokeStyle = gold;
        ctx.beginPath();
        ctx.arc('250', '300', radius, quart, (circ * currentPerc) + quart, false);
        ctx.stroke();

        CurPer++;
        if (CurPer < endPercent) {
            requestAnimationFrame(function () {
                drawCircle(CurPer / 100);
            });
        }
    }
    drawFirstRectangle();
    drawSecondRectangle();
    drawThirdRectangle();
    drawConnectingRectangle();
    drawBackCircle();
    drawCircle();
}

function countUp() {
    // How long you want the animation to take, in ms
    const animationDuration = 2000;
    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;
    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round(animationDuration / frameDuration);
    // An ease-out function that slows the count as it progresses
    const easeOutQuad = t => t * (2 - t);

    // The animation function, which takes an Element
    const animateCountUp = el => {
        let frame = 0;

        const countTo = parseInt(el.innerHTML, 10);
        // Start the animation running 60 times per second
        const counter = setInterval(() => {
            frame++;
            // Calculate our progress as a value between 0 and 1
            // Pass that value to our easing function to get our
            // progress on a curve
            const progress = easeOutQuad(frame / totalFrames);
            // Use the progress value to calculate the current count
            const currentCount = Math.round(countTo * progress);

            // If the current count has changed, update the element
            if (parseInt(el.innerHTML, 10) !== currentCount) {
                el.innerHTML = currentCount + "%";
            }

            // If we’ve reached our last frame, stop the animation
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    };

    // Run the animation on all elements with a class of ‘countup’
    const runAnimations = () => {
        const countUpNum2 = document.getElementById('percent');
        animateCountUp(countUpNum2);
    };

    runAnimations();
}

/**DOM For Suggesting Plan */
function suggestPlan() {
    const suggestion_wrapper = makeDiv("suggestion_wrapper");
    const suggestion_box = makeDiv("suggestion_box");
    const suggestion_image = makeSuggestionImage();
    const suggestion_text = makeSuggestionText();
    const background = makeDiv("background");
    var background_img = makeDiv("background_img");
    const insertPlace = makeDiv("insertPlace");

    background_img = makeSuggestionButtons(background_img);

    if (planNum === 2) {
        suggestion_wrapper.style.marginTop = "20px";
        suggestion_box.style.width = "950px";
        suggestion_image.style.height = "596px";
        suggestion_text.style.height = "500px";
    }

    suggestion_box.appendChild(suggestion_image);
    suggestion_box.appendChild(suggestion_text);
    suggestion_box.appendChild(insertPlace);

    suggestion_wrapper.appendChild(suggestion_box);

    document.body.appendChild(suggestion_wrapper);

    background.appendChild(background_img);

    document.body.appendChild(background);



    function makeVivintText() {
        const your_vivint_plan = document.createElement("h2");
        your_vivint_plan.className = "suggestion_main_text";

        if (originalPlanNum == planNum) {
            your_vivint_plan.innerHTML = "Your Vivint Plan is:";
        }
        else if (originalPlanNum < planNum) {
            your_vivint_plan.innerHTML = "Upgraded Vivint Plan is:";
        }
        else {
            your_vivint_plan.innerHTML = "Downgraded Vivint Plan is:";
        }

        return your_vivint_plan;
    }

    function makePlanBenefitList(userPlan) {
        const ul = document.createElement("ul");
        for (let i = 0; i < Q_A.suggestionBasic.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = Q_A.suggestionBasic[i];
            ul.appendChild(li);
        }

        if (userPlan > 0) {
            for (let i = 0; i < Q_A.premium.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = Q_A.premium[i];
                ul.appendChild(li);
            }
        }
        if (userPlan > 1) {
            for (let i = 0; i < Q_A.premiumPlus.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = Q_A.premiumPlus[i];
                ul.appendChild(li);
            }
        }
        return ul;
    }

    function makeSuggestionMainText(userPlan) {
        const package = document.createElement("h1");
        package.className = "suggestion_package_name";
        package.innerHTML = Q_A.suggestionLevel[userPlan] + "&nbsp;Package";
        return package;
    }

    function makeSuggestionPackageName(userPlan) {
        const explanation = document.createElement("p");
        explanation.innerHTML = Q_A.suggestionExplanation[userPlan];
        return explanation;
    }

    function createSpan(message) {
        const span = document.createElement('span');
        span.innerHTML = message;
        return span;
    }

    function createCallButton() {
        const button = document.createElement('a');
        const img = document.createElement('img');
        const span = createSpan("877.537.3785");
        button.href = "tel:18775373785";
        button.className = "call_button";
        if (planNum === 2) {
            button.style.marginTop = "1em";
        }

        img.src = "https://www.iconsdb.com/icons/preview/white/phone-xxl.png";
        img.className = "icon";
        button.appendChild(img);
        button.appendChild(span);
        return button;
    }


    function makeSuggestionText() {
        const suggestion_text = makeDiv("suggestion_text");

        const your_vivint_plan = makeVivintText();
        var userPlan = null;
        if (planNum != null) {
            userPlan = planNum;
        }
        else {
            userPlan = setCustomizedPlan();
        }

        const package = makeSuggestionMainText(userPlan);

        const explanation = makeSuggestionPackageName(userPlan);

        const ul = makePlanBenefitList(userPlan);

        const call_button = createCallButton();

        suggestion_text.appendChild(your_vivint_plan);
        suggestion_text.appendChild(package);
        suggestion_text.appendChild(explanation);
        suggestion_text.appendChild(ul);
        suggestion_text.appendChild(call_button);

        return suggestion_text;
    }

    function makeSuggestionImage() {
        const suggestion_image = document.createElement('img');
        suggestion_image.src = "https://d1sfco99flnudn.cloudfront.net/www.vivintsource.com/images/pages/packages/dog-on-chair-small.jpg";
        suggestion_image.className = "suggestion_image";
        return suggestion_image;
    }

    /**Functions for Changing the content of the suggestion package */

    function changeStyle(state) {
        var suggestion_wrapper = document.querySelectorAll(".suggestion_wrapper")[0];
        var suggestion_box = document.querySelectorAll(".suggestion_box")[0];
        var suggestion_image = document.querySelectorAll(".suggestion_image")[0];
        var suggestion_text = document.querySelectorAll(".suggestion_text")[0];

        if (state === true) {
            suggestion_wrapper.style.marginTop = "20px";
            suggestion_box.style.width = "850px";
            suggestion_image.style.height = "546px";
            suggestion_text.style.height = "450px";
        }
        else {
            suggestion_wrapper.style.marginTop = "0";
            suggestion_box.style.width = "800px";
            suggestion_image.style.height = "496px";
            suggestion_text.style.height = "400px";
        }
    }

    function plusSuggestion() {
        if (planNum === 2) {
            planNum = 0;
        }
        else {
            planNum++;
        }
        changeSuggestion();
    }

    function minusSuggestion() {
        if (planNum === 0) {
            planNum = 2;
        }
        else {
            planNum--;
        }
        changeSuggestion();
    }

    function changeSuggestion() {
        var newSuggestion = makeSuggestionText();
        remove(document.getElementsByClassName("suggestion_text")[0]);
        var element = document.getElementsByClassName("suggestion_text")[0];
        element.parentNode.removeChild(element);
        var insertPlace = document.getElementsByClassName("insertPlace")[0];
        var parentDiv = document.body.querySelectorAll(".suggestion_box")[0];
        parentDiv.insertBefore(newSuggestion, insertPlace);

        if (planNum == 2) {
            changeStyle(true);
        }
        else {
            changeStyle(false);
        }
    }

    function makeSuggestionButtons(wrapper) {
        const left_button = makeDiv("button");
        const right_button = makeDiv("button");
        left_button.style.cursor = "pointer";
        right_button.style.cursor = "pointer";

        var left_img = document.createElement('img');
        left_img.className = "icon flip";
        left_img.src = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png";
        left_img.style.padding = "0em";

        var right_img = document.createElement('img');
        right_img.className = "icon";
        right_img.src = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png";
        right_img.style.padding = "0em";

        left_button.setAttribute("id", "suggestion_left_button");
        left_button.addEventListener("click", minusSuggestion);

        right_button.setAttribute("id", "suggestion_right_button");
        right_button.addEventListener("click", plusSuggestion);

        right_button.appendChild(right_img);
        left_button.appendChild(left_img);

        wrapper.appendChild(left_button);
        wrapper.appendChild(right_button);

        return wrapper;
    }
}

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

jQuery(document).ready(function ($) {

    $(".find_plan").click(function (event) {

        event.preventDefault();

        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);

    });

});


landingSafetyQuestionPage();