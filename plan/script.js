/**Make an object of Question and answers. */
var Q_A = {
    questionList: [
        "Choose Your Property Type",
        "Are you interested in remote video access?",
        "How many doors do you want to monitor?",
    ],
    answerList: [
        ["Homeowner", "Rental", "Commercial", "Other"],
        ["Yes", "No", "Not Sure"],
        ["1 Door", "2 Doors", "3 Doors + ", "Not Sure"],
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
};

var planNum = null;
var originalPlanNum = null;

const userAnswer = new Map();

const arrow_icon_address = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"

function setCustomizedPlan() {
    /**if user didn't choose the option or they selected not sure for everything. */
    if (userAnswer.size === 0 ||
        ((userAnswer.get(1) === 2 || userAnswer.get(1) === 1) &&
            (userAnswer.get(2) === 1 || userAnswer.get(2) === 3))) {
        planNum = 0;
    }
    else if (
        userAnswer.get(1) === 0 && userAnswer.get(2) === 2
    ) {
        planNum = 2;
    }
    else {
        planNum = 1;
    }
    originalPlanNum = planNum;
    return planNum;
}

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

    img.src = "../img/vivint_call.png";
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

function suggestPlan() {
    const suggestion_wrapper = makeDiv("suggestion_wrapper");
    const suggestion_box = makeDiv("suggestion_box");
    const suggestion_image = makeSuggestionImage();
    const suggestion_text = makeSuggestionText();
    const background = makeDiv("background");
    var background_img = makeDiv("background_img");
    const background_img2 = makeDiv("background_img");
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
    background.appendChild(background_img2);

    document.body.appendChild(background);
}

/**Make it memorable in the memory >> after chosen >> it's remembered, does not change stuff.
*/
function changeQuestion() {
    setProgress();
    document.getElementsByClassName("progress_bar_begin")[0].style.width = Q_A.progress + "%";
    var content = document.getElementsByClassName("content")[0];
    remove(content);
    makeQ_A(content);
}

function colorChosenAnswer() {
    if (userAnswer.get(Q_A.currentQuestion) != null) {
        document.getElementsByClassName("answer")[userAnswer.get(Q_A.currentQuestion)].classList.add("chosenAnswer");
    }
}

function prevButtonEvent() {
    Q_A.currentQuestion--;
    changeQuestion();
    if (Q_A.currentQuestion === 0) {
        var buttonToDelete = document.getElementsByClassName("button")[0];
        buttonToDelete.parentNode.removeChild(buttonToDelete);
        document.getElementsByClassName("button")[0].classList.remove("right");
    }
    colorChosenAnswer();
}

function makePrevButton() {
    var button_left = makeDiv("button left");
    var left_icon = document.createElement('img');
    left_icon.className = "icon flip";
    left_icon.src = arrow_icon_address;
    button_left.appendChild(left_icon);
    button_left.addEventListener("click", prevButtonEvent);
    document.getElementsByClassName("wrapper")[1].insertBefore(
        button_left, document.getElementsByClassName("button")[0]);
}

function nextButtonEvent() {
    if (Q_A.currentQuestion === 0) {
        makePrevButton();
        document.getElementsByClassName("button")[1].classList.add("right");
        Q_A.currentQuestion++;
        changeQuestion();
        colorChosenAnswer();
    }
    else if (Q_A.currentQuestion + 1 === Q_A.questionList.length) {
        remove(document.getElementsByClassName("content_wrapper")[0]);
        suggestPlan();
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
        document.getElementsByClassName("button")[1].classList.add("right");
        userAnswer.set(Q_A.currentQuestion, answerNumber);
        Q_A.currentQuestion++;
        changeQuestion();
    }
    else if (Q_A.currentQuestion + 1 === Q_A.questionList.length) {
        remove(document.getElementsByClassName("content_wrapper")[0]);
        userAnswer.set(Q_A.currentQuestion, answerNumber);
        suggestPlan();
    }
    else {
        userAnswer.set(Q_A.currentQuestion, answerNumber);
        Q_A.currentQuestion++;
        changeQuestion();
    }

}

function remove(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**Question Array Functions */
function makeDiv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

function makeText(className, textInfo) {
    var text = document.createElement('h2');
    text.className = className;
    text.innerHTML = textInfo;
    return text;
}

function makeHeader() {
    var header = document.createElement('div');
    header.className = "header";

    var vividLink = document.createElement('a');
    vividLink.href = "https://www.vivint.com";

    var logo = document.createElement('img');
    logo.className = "logo";
    logo.src = "../img/vivint_logo.png";

    vividLink.appendChild(logo);

    header.appendChild(vividLink);

    document.body.appendChild(header);
}

function makeQ_A(content) {
    /**Make Question */
    var question = makeText("question", Q_A.questionList[Q_A.currentQuestion]);
    content.appendChild(question);
    /**Make Answers */
    for (let i = 0; i < Q_A.answerList[Q_A.currentQuestion].length; i++) {
        var answer = makeText("answer", Q_A.answerList[Q_A.currentQuestion][i]);
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

/**Progress Bar Function */
function setProgress() {
    Q_A.progress = Math.ceil(((Q_A.currentQuestion + 1) / Q_A.questionList.length) * 100);
}


function makeProgressBar() {
    var wrapper = makeDiv("wrapper");

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
    var wrapper = makeDiv("wrapper");

    var button_right = makeDiv("button");
    var right_icon = document.createElement('img');
    right_icon.className = "icon";
    right_icon.src = arrow_icon_address;
    button_right.appendChild(right_icon);
    button_right.addEventListener("click", nextButtonEvent);

    wrapper.appendChild(button_right);

    return wrapper;
}

/**destroy content and make questions */
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

/**Landing Page */
makeHeader();
makeQuestionPage();