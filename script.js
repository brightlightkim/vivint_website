createHeader();

var currentTime = {
    days: 0,
    hours: 0, 
    minutes: 0,
    seconds: 0,
    
    currentTime: function() {
        var today = new Date();
        this.days = today.getDay();
        this.hours = today.getHours();
        this.minutes = today.getMinutes();
        this.seconds = today.getSeconds();
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

/**Main Message Helping Functions */

function createClickButton(){
    const button = document.createElement('a');
    const img = document.createElement('img');
    const span = document.createElement('span');
    button.href = "tel:18775373785";
    button.className = "button";
    img.src = "https://www.iconsdb.com/icons/preview/white/phone-xxl.png";
    img.className = "icon";
    span.innerHTML = "877.537.3785";
    button.appendChild(img);
    button.appendChild(span);
    return button;
}

function createExtraText(){
    const extra_text = createDiv("extra-text");
    extra_text.innerHTML = "*With qualifiying system purchase.&nbsp;";

    const link = document.createElement('a');
    link.href = "https://www.vivint.com/#hero-promo-details";
    link.innerHTML = "Offer details";

    extra_text.appendChild(link);
    return extra_text;
}

/**Banner Helping Function */

/**Create Header */
function createHeader() {
    const header = createDiv("header");
    const logoLink = createImageLink("https://www.vivint.com/", "https://postfiles.pstatic.net/MjAyMjAyMjJfMjk3/MDAxNjQ1NDg1NzExMDk0.ZNCWcaEniMlVcUH-Iah1UhenPl0qCfSgGUes7OtzCpUg.-RKWgpd-Av4oTl9v8OREMhePivwoxfDs7JAXaM4-nXMg.PNG.upiioo/vivint_logo.PNG?type=w966", "logo");
    header.appendChild(logoLink);
    document.body.appendChild(header);

}

/*ContentWrapper Functions*/

function createMainMessage(){
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

function createTimeBanner(){
    
}



/* Banner Function*/