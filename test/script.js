

function makeGrade() {
    var canvas = document.getElementById('grade_circle');
    var ctx = canvas.getContext('2d');

    var radius = 220;
    var endPercent = 40;
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
    var endPercent = 40;
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

makeGrade();
makeMedal();


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
        const countupNum = document.getElementById('percent');
        animateCountUp(countupNum);
    };

    runAnimations();
}

countUp();
