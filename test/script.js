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
function calculateUserGrade(){
    userGrade = 0;
    userPercentile = 0;
    if (userAnswer.length != 0){
        calculateGrade();
    }
    else {
        userGrade = 0;
        userPercentile = 0;
    }

    function calculateGrade(){        
        var grade = 0;
        for (let i = 0; i < Q_A.questionList.length; i++){
            var answer = userAnswer.get(i)
            if (answer != null){
                const userAnswerNum = Q_A.pair(i);
                
                if (userAnswerNum === 0){/** Yes or no 100% or 0% */
                    if (answer === 0){
                        grade += Q_A.points[i][1];
                    }/**else is 0 so not do anything */
                }
                else{ /**0 30% 70% 100% */
                    if (answer === 1){
                        grade += (0.3 * Q_A.points[i][1]);
                    }
                    else if (answer === 2){
                        grade += (0.7 * Q_A.points[i][1]);
                    }
                    else if (answer === 3){
                        grade += Q_A.points[i][1];
                    }
                }
            }
        }
        grade = (Math.round(Math.round(grade)/maximumPoint) * 100);
        userGrade = grade;
        userPercentile = 1;
    }
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

/**DOM For Landing the Safety Grade Page */
function landingSafetyGradePage() {
    const wrapper = makeDiv("wrapper");
    const text_wrapper = makeTextWrapper();
    const content_wrapper = makeDiv("content_wrapper");

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
landingSafetyGradePage();
makeGrade();
makeMedal();
countUp();
