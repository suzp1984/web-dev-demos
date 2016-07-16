(function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    window.onload = function() {
        canvas.width = 800;
        canvas.height = 800;

        let imageData = context.createImageData(canvas.width, canvas.height);
        let pixelData = imageData.data;

        for (let i = 0; i < canvas.height; i++)
            for (let j = 0; j < canvas.width; j++) {
                let p =  i * canvas.width + j;

                pixelData[4*p + 0] = parseInt(Math.pow(Math.cos(Math.atan2(j-400, i-400)/2), 2)*255);
                pixelData[4*p + 1] = parseInt(Math.pow(Math.cos(Math.atan2(j-400, i-400)/2 - 2*Math.acos(-1)/3), 2)*255);
                pixelData[4*p + 2] = parseInt(Math.pow(Math.cos(Math.atan2(j-400, i-400)/2 + 2*Math.acos(-1)/3), 2)*255);
                pixelData[4*p + 3] = 255;
            }

        context.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
            
    };
    
})();
