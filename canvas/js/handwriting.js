(function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    
    canvas.width = 700;
    canvas.height = 700;

    drawGrid();

    function drawGrid() {
        context.save();
        context.strokeStyle = "rgb(230, 11, 9)";

        context.beginPath();
        context.moveTo(3, 3);
        context.lineTo(canvas.width - 3, 3);
        context.lineTo(canvas.width - 3, canvas.height - 3);
        context.lineTo(3, canvas.height - 3);
        context.closePath();

        context.lineWidth = 6;
        context.stroke();

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvas.width, canvas.height);

        context.moveTo(canvas.width, 0);
        context.lineTo(0, canvas.height);

        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);

        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        
        context.lineWidth = 1;
        context.stroke();
        
        context.restore();
    }
})();
