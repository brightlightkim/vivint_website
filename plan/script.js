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
    currentQuestion: 0,
    progress: 10,
};

const userAnswer = new Map();

var arrow_icon_address = "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"

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
    QandAList.currentQuestion++;
    changeQuestion();
    colorChosenAnswer();
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
        /**Suggest Plan Page */

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
    var text = document.createElement('h1');
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
    button_right.addEventListener("click", nextQuestion);

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

makeHeader();

makeQuestionPage();