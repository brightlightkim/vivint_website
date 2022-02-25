/**Make an object of Question and answers. */
var QandAList = {
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

const userAnswer = new Map();

const arrow_icon_address = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"

function setCustomizedPlan() {
    var planNum = 0;
    return planNum;
}

function makeVivintText() {
    const your_vivint_plan = document.createElement("h2");
    your_vivint_plan.className = "suggestion_main_text";
    your_vivint_plan.innerHTML = "Your Vivint Plan is:";
    return your_vivint_plan;
}

function makePlanBenefitList(userPlan){
    const ul = document.createElement("ul");
    for (let i = 0; i < QandAList.suggestionBasic.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = QandAList.suggestionBasic[i];
        ul.appendChild(li);
    }

    if (userPlan > 0) {
        for (let i = 0; i < QandAList.premium.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = QandAList.premium[i];
            ul.appendChild(li);
        }
    }
    if (userPlan > 1){
        for (let i = 0; i < QandAList.premiumPlus.length; i++){
            const li = document.createElement('li');
            li.innerHTML = QandAList.premiumPlus[i];
            ul.appendChild(li);
        }
    }
    return ul;
}

function makeSuggestionMainText(userPlan){
    const package = document.createElement("h1");
    package.className = "suggestion_package_name";
    package.innerHTML = QandAList.suggestionLevel[userPlan]
    return package;
}

function makeSuggestionPackageName(userPlan){
    const explanation = document.createElement("p");
    explanation.innerHTML = QandAList.suggestionExplanation[userPlan];
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
    img.src = "https://www.iconsdb.com/icons/preview/white/phone-xxl.png";
    img.className = "icon";
    button.appendChild(img);
    button.appendChild(span);
    return button;
}


function makeSuggestionText() {
    const suggestion_text = makeDiv("suggestion_text");

    const your_vivint_plan = makeVivintText();

    const userPlan = setCustomizedPlan();

    const package = makeSuggestionMainText(userPlan);

    const explanation =makeSuggestionPackageName(userPlan);
    
    const ul = makePlanBenefitList(userPlan);

    const call_button = createCallButton();

    suggestion_text.appendChild(your_vivint_plan);
    suggestion_text.appendChild(package);
    suggestion_text.appendChild(explanation);
    suggestion_text.appendChild(ul);
    suggestion_text.appendChild(call_button);

    return suggestion_text;
}

function makeSuggestionImage(){
    const suggestion_image = document.createElement('img');
    suggestion_image.src = "https://d1sfco99flnudn.cloudfront.net/www.vivintsource.com/images/pages/packages/dog-on-chair-small.jpg";
    suggestion_image.className = "suggestion_image";
    return suggestion_image;
}

function suggestPlan() {
    const suggestion_wrapper = makeDiv("suggestion_wrapper");
    const suggestion_box = makeDiv("suggestion_box");
    const suggestion_image = makeSuggestionImage();
    const suggestion_text = makeSuggestionText();   

    suggestion_box.appendChild(suggestion_image);
    suggestion_box.appendChild(suggestion_text);

    suggestion_wrapper.appendChild(suggestion_box);

    document.body.appendChild(suggestion_wrapper);
}

/**Make it memorable in the memory >> after chosen >> it's remembered, does not change stuff.
*/
function changeQuestion() {
    setProgress();
    document.getElementsByClassName("progress_bar_begin")[0].style.width = QandAList.progress + "%";
    var content = document.getElementsByClassName("content")[0];
    remove(content);
    makeQ_A(content);
}

function colorChosenAnswer() {
    if (userAnswer.get(QandAList.currentQuestion) != null) {
        document.getElementsByClassName("answer")[userAnswer.get(QandAList.currentQuestion)].classList.add("chosenAnswer");
    }
}

function prevButtonEvent() {
    QandAList.currentQuestion--;
    changeQuestion();
    if (QandAList.currentQuestion === 0) {
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
    if (QandAList.currentQuestion === 0) {
        makePrevButton();
        document.getElementsByClassName("button")[1].classList.add("right");
        QandAList.currentQuestion++;
        changeQuestion();
        colorChosenAnswer();
    }
    else if (QandAList.currentQuestion + 1 === QandAList.questionList.length) {
        remove(document.getElementsByClassName("content_wrapper")[0]);
        suggestPlan();
    }
    else {
        QandAList.currentQuestion++;
        changeQuestion();
        colorChosenAnswer();
    }
}

function nextQuestion(answerNumber) {
    if (QandAList.currentQuestion === 0) {
        makePrevButton();
        document.getElementsByClassName("button")[1].classList.add("right");
        userAnswer.set(QandAList.currentQuestion, answerNumber);
        QandAList.currentQuestion++;
        changeQuestion();
    }
    else if (QandAList.currentQuestion + 1 === QandAList.questionList.length) {
        remove(document.getElementsByClassName("content_wrapper")[0]);
        suggestPlan();

    }
    else {
        userAnswer.set(QandAList.currentQuestion, answerNumber);
        QandAList.currentQuestion++;
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
    logo.src = "https://postfiles.pstatic.net/MjAyMjAyMjJfMjk3/MDAxNjQ1NDg1NzExMDk0.ZNCWcaEniMlVcUH-Iah1UhenPl0qCfSgGUes7OtzCpUg.-RKWgpd-Av4oTl9v8OREMhePivwoxfDs7JAXaM4-nXMg.PNG.upiioo/vivint_logo.PNG?type=w966";

    vividLink.appendChild(logo);

    header.appendChild(vividLink);

    document.body.appendChild(header);
}

function makeQ_A(content) {
    /**Make Question */
    var question = makeText("question", QandAList.questionList[QandAList.currentQuestion]);
    content.appendChild(question);
    /**Make Answers */
    for (let i = 0; i < QandAList.answerList[QandAList.currentQuestion].length; i++) {
        var answer = makeText("answer", QandAList.answerList[QandAList.currentQuestion][i]);
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
    QandAList.progress = Math.ceil(((QandAList.currentQuestion + 1) / QandAList.questionList.length) * 100);
}


function makeProgressBar() {


    var wrapper = makeDiv("wrapper");

    var td0 = document.createElement('td');
    td0.innerHTML = "0%&nbsp;";

    var progressBar = makeDiv("progress_bar");
    var progressBarProgress = makeDiv("progress_bar_begin");
    setProgress();
    var progressStyle = QandAList.progress + "%";
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