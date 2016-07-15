(function() {
    let slider = document.getElementById("scale-range");
    let canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 600;
    let scale = slider.value;
    let context = canvas.getContext('2d');
    let image = new Image();

    let watermarkCanvas = document.getElementById("watermark-canvas");
    let watermarkContext = watermarkCanvas.getContext("2d");

    window.onload = function() {
        image.src = "img/dagger.jpg";
        image.onload = function() {
            // context.drawImage(image, 0, 0);
            drawImageByScale(scale);

            slider.onmousemove = function() {
                scale = slider.value;
                drawImageByScale(scale);
            };
        };

        watermarkCanvas.width = 600;
        watermarkCanvas.height = 100;

        watermarkContext.font = "bold 50px Arial";
        watermarkContext.fillStyle = "rgba(255, 255, 255, 0.5)";
        watermarkContext.textBaseline = "middle";
        watermarkContext.fillText("== Jacob Su ==", 20, 50);
        
    };

    function drawImageByScale(scale) {
        let imageWidth = canvas.width * scale;
        let imageHeight = canvas.height * scale;

        let dx = canvas.width / 2 - imageWidth / 2;
        let dy = canvas.height / 2 - imageWidth / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, dx, dy, imageWidth, imageHeight);
        context.drawImage(watermarkCanvas, canvas.width - watermarkCanvas.width, canvas.height - watermarkCanvas.height);
    }
    
})();
