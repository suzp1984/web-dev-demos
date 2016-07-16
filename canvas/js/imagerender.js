(function() {
    let canvasa = document.getElementById("canvasa");
    let canvasb = document.getElementById("canvasb");

    let contexta = canvasa.getContext("2d");
    let contextb = canvasb.getContext("2d");

    canvasa.width = 628;
    canvasa.height = 472;
    canvasb.width = canvasa.width;
    canvasb.height = canvasa.height;
    
    let image = new Image();

    window.onload = function() {
        image.src = "img/dagger.jpg";
//        image.crossOrigin = "Anonymous";
        image.onload = function() {
            contexta.drawImage(image, 0, 0, canvasa.width, canvasa.height);
        };
    };

    window.filter = function() {
        //console.log('filter');
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;

        for (let i = 0; i < canvasb.width * canvasb.height; i++) {
            pixelData[4*i + 0] = 0;
            pixelData[4*i + 1] = 0;
        }
        
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };

    window.greyEffect = function() {
        //console.log('filter');
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;

        for (let i = 0; i < canvasb.width * canvasb.height; i++) {
            let r = pixelData[4*i + 0];
            let g = pixelData[4*i + 1];
            let b = pixelData[4*i + 2];

            let grey = r*0.3 + g*0.59 + b*0.11;

            pixelData[4*i + 0] = grey;
            pixelData[4*i + 1] = grey;
            pixelData[4*i + 2] = grey;
        }
        
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };

    window.blackEffect = function() {
        //console.log('filter');
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;

        for (let i = 0; i < canvasb.width * canvasb.height; i++) {
            let r = pixelData[4*i + 0];
            let g = pixelData[4*i + 1];
            let b = pixelData[4*i + 2];

            let grey = r*0.3 + g*0.59 + b*0.11;

            if (grey > 255 / 2) {
                grey = 255;
            } else {
                grey = 0;
            }
            
            pixelData[4*i + 0] = grey;
            pixelData[4*i + 1] = grey;
            pixelData[4*i + 2] = grey;
        }
        
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };

    window.reverseEffect = function() {
        //console.log('filter');
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;

        for (let i = 0; i < canvasb.width * canvasb.height; i++) {
            let r = pixelData[4*i + 0];
            let g = pixelData[4*i + 1];
            let b = pixelData[4*i + 2];
            
            pixelData[4*i + 0] = 255 - r;
            pixelData[4*i + 1] = 255 - g;
            pixelData[4*i + 2] = 255 - b;
        }
        
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };

    window.blurEffect = function() {

        let tmpImageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let tmpPixelData = tmpImageData.data;
        
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;
        let blurR = 2;
        let totalBlurPoint = (blurR*2 + 1)*(blurR*2 + 1);

        for (let i = blurR; i < canvasb.height - blurR; i++)
            for (let j = blurR; j < canvasb.width - blurR; j++) {
                let totalr = 0;
                let totalg = 0;
                let totalb = 0;
                for (let dx = -blurR; dx <= blurR; dx++)
                    for (let dy = -blurR; dy <= blurR; dy++) {
                        let x = i + dx;
                        let y = j + dy;

                        let p = x*canvasb.width + y;
                        totalr += tmpPixelData[p*4 + 0];
                        totalg += tmpPixelData[p*4 + 1];
                        totalb += tmpPixelData[p*4 + 2];
                    }
                let p = i*canvasb.width + j;
                pixelData[p*4 + 0] = totalr / totalBlurPoint;
                pixelData[p*4 + 1] = totalg / totalBlurPoint;
                pixelData[p*4 + 2] = totalb / totalBlurPoint;
            }
            
        
        
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };

    window.mosaicEffect = function() {

        let tmpImageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let tmpPixelData = tmpImageData.data;
        
        let imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
        let pixelData = imageData.data;
        let size = 16;
        let totalPoint = size * size;

        for (let i = 0; i < canvasb.height; i += size)
            for (let j = 0; j < canvasb.width; j += size) {
                let totalr = 0;
                let totalg = 0;
                let totalb = 0;
                for (let dx = 0; dx <= size; dx++)
                    for (let dy = 0; dy <= size; dy++) {
                        let x = i + dx;
                        let y = j + dy;

                        let p = x*canvasb.width + y;
                        totalr += tmpPixelData[p*4 + 0];
                        totalg += tmpPixelData[p*4 + 1];
                        totalb += tmpPixelData[p*4 + 2];
                    }
                let p = i*canvasb.width + j;
                let aveR = totalr / totalPoint;
                let aveG = totalg / totalPoint;
                let aveB = totalb / totalPoint;

                for (let dx = 0; dx <= size; dx++)
                    for (let dy = 0; dy <= size; dy++) {
                        let x = i + dx;
                        let y = j + dy;

                        let p = x * canvasb.width + y;
                        pixelData[p*4 + 0] = aveR;
                        pixelData[p*4 + 1] = aveG;
                        pixelData[p*4 + 2] = aveB;
                    }
               
            }
                
        contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
    };
})();



















