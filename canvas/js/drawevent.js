(function() {
    let canvas = document.getElementById('canvas');
    canvas.width = 628;
    canvas.height = 472;
    let context = canvas.getContext('2d');
    let image = new Image();
    let isMouseDown = false;

    let offCanvas = document.getElementById('offCanvas');
    offCanvas.width = canvas.width * 2;
    offCanvas.height = canvas.height * 2;
    let offContext = offCanvas.getContext('2d');

    let scale = 2;
    
    window.onload = function() {
        image.src = "img/dagger.jpg";
        image.onload = function() {
            context.drawImage(image, 0, 0);
            offContext.drawImage(image, 0, 0, offCanvas.width, offCanvas.height);
        };
    };

    canvas.onmousedown = function(e) {
        e.preventDefault();
        let point = windowToCanvas(e.clientX, e.clientY);
//        console.log(point);
        isMouseDown = true;
        drawCanvasWithMagnifier(true, point);
    };

    canvas.onmousemove = function(e) {
        e.preventDefault();
        //console.log(e);
        if (isMouseDown == true) {
            drawCanvasWithMagnifier(true, windowToCanvas(e.clientX, e.clientY));
        } 
    };

    canvas.onmouseup = function(e) {
        e.preventDefault();
        isMouseDown = false;
        drawCanvasWithMagnifier(false);
    };

    canvas.onmouseout = function(e) {
        e.preventDefault();
        isMouseDown = false;
        drawCanvasWithMagnifier(false);
    };

    function windowToCanvas(x, y) {
        let bbox = canvas.getBoundingClientRect();
        return {x : x - bbox.left, y: y - bbox.top};
    };

    function drawCanvasWithMagnifier(isShowMagnifier, point) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        //console.log(point);
        if (isShowMagnifier) {
            drawMagnifier(point);
        }
    };

    function drawMagnifier(point) {
        let mr = 50;
        //console.log(point);
        let imagel_cx = point.x * scale;
        let imagel_cy = point.y * scale;

        let sx = imagel_cx - mr;
        let sy = imagel_cy - mr;

        let dx = point.x - mr;
        let dy = point.y - mr;

        context.save();
        context.lineWidth = 2.0;
        context.strokeStyle = "#069";
        context.beginPath();
        context.arc(point.x, point.y, mr, 0, Math.PI*2);
        context.stroke();
        
        context.clip();
        context.drawImage(offCanvas, sx, sy, 2*mr, 2*mr, dx, dy, 2*mr, 2*mr);
        context.restore();
    };

})();










