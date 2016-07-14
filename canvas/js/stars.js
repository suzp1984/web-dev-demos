(function() {
function starPath(ctx) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72)/180 * Math.PI),
                   -Math.sin((18 + i * 72)/180 * Math.PI));
        ctx.lineTo(Math.cos((54 + i * 72)/180 * Math.PI) * 0.5,
                   -Math.sin((54 + i * 72)/180* Math.PI) * 0.5);
    }
    
    ctx.closePath();
}

function drawStar(ctx, x, y, R, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot / 180 * Math.PI);
    ctx.scale(R, R);

    starPath(ctx);

    ctx.fillStyle = "#fb3";
    //ctx.strokeStyle = "#fd5";
    //ctx.lineWidth = 3;
    //ctx.lineJoin = "round";

    ctx.fill();
    //ctx.stroke();

    ctx.restore();
}

window.onload = function() {
    let canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 600;

    let context = canvas.getContext('2d');

    let linearGrid = context.createLinearGradient(0, 0, 0, canvas.height);
    linearGrid.addColorStop(0.0, "#000");
    linearGrid.addColorStop(1.0, "#035");

    context.fillStyle = linearGrid;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 200; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.65;
        let R = Math.random() * 5 + 5;
        let a = Math.random() * 360;

        drawStar(context, x, y, R, a);
    }
}
})();
