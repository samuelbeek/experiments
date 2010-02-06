function draw() {
    var canvas = document.getElementById('shape');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // draw basic "Ruby shape" which is a rounded corner square
        ctx.beginPath();
        ctx.moveTo(50, 25);
        ctx.lineTo(125, 25);
        ctx.quadraticCurveTo(150, 25, 150, 50);
        ctx.lineTo(150, 125);
        ctx.quadraticCurveTo(150, 150, 125, 150);
        ctx.lineTo(50, 150);
        ctx.quadraticCurveTo(25, 150, 25, 125);
        ctx.lineTo(25, 50);
        ctx.quadraticCurveTo(25, 25, 50, 25);

        // set line color and width, and fill color
        ctx.strokeStyle = "maroon";
        ctx.fillStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fill();

        // add top horizontal white logo reflection
        ctx.save();
        drawReflectionTop(ctx);
        ctx.restore();

        // add bottom horizontal maroon reflection
        ctx.save();
        drawReflectionBottom(ctx);
        ctx.restore();
    }
}
function drawReflectionTop(ctx) {
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(35, 40);
    ctx.quadraticCurveTo(105, 35, 140, 40);

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function drawReflectionBottom(ctx) {
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = "maroon";
    ctx.moveTo(35, 60);
    ctx.quadraticCurveTo(35, 150, 135, 140);
    ctx.quadraticCurveTo(35, 170, 35, 60);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "maroon";
    ctx.fill();
    ctx.restore();
}