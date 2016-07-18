// original reference: https://www.zhihu.com/question/30262900
// 
(function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    let canvas2 = document.getElementById("mandelbrot");
    let context2 = canvas2.getContext("2d");

    let canvas3 = document.getElementById("martinart");
    let context3 = canvas3.getContext("2d");

    let canvas4 = document.getElementById("manuelKasten");
    let context4 = canvas4.getContext("2d");

    let canvas5 = document.getElementById("manuelKasten2");
    let context5 = canvas5.getContext("2d");

    let canvas6 = document.getElementById("githubphagocyte");
    let context6 = canvas6.getContext("2d");
    
    window.onload = function() {
        // image1 
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

        // mandelbrot image
        canvas2.width = 1024;
        canvas2.height = 1024;

        let mandelbrotData = context2.createImageData(canvas2.width, canvas2.height);
        let mandelbrotPixel = mandelbrotData.data;

        for (let i = 0; i < canvas2.height; i++)
            for (let j = 0; j < canvas2.width; j++) {
                let p = i * canvas2.width + j;

                let x = 0;
                let y = 0;
                let k = 0;
                for (k = 0; k < 256; k++) {
                    let a = x*x - y*y + (j - 768.0)/512;
                    y = 2*x*y + (i - 512.0)/512;
                    x = a;

                    if (x*x + y*y > 4) break;
                }
                
                
                mandelbrotPixel[4*p + 0] = Math.log(k) * 47;
                mandelbrotPixel[4*p + 1] = Math.log(k) * 47;
                mandelbrotPixel[4*p + 2] = 128 - Math.log(k) * 23;
                mandelbrotPixel[4*p + 3] = 255;
            }

        context2.putImageData(mandelbrotData, 0, 0, 0, 0, canvas2.width, canvas2.height);

        // martin buttner art
        canvas3.width = 1024;
        canvas3.height = 1024;

        let martinData = context3.createImageData(canvas3.width, canvas3.height);
        let martinPixel = martinData.data;
        let r = new Array(canvas3.height);
        let g = new Array(canvas3.height);
        let b = new Array(canvas3.height);
        for (let i = 0; i < canvas3.height; i++) {
            r[i] = new Array(canvas3.width);
            g[i] = new Array(canvas3.width);
            b[i] = new Array(canvas3.width);
            for (let j = 0; j < canvas3.width; j++) {
                r[i][j] = 0;
                g[i][j] = 0;
                b[i][j] = 0;
            }
        }

        for (let i = 0; i < canvas3.height; i++)
            for (let j = 0; j < canvas3.width; j++) {
                let p = i * canvas3.width + j;
                
                martinPixel[4*p + 0] = martin_art_r(i, j);
                martinPixel[4*p + 1] = martin_art_g(i, j);
                martinPixel[4*p + 2] = martin_art_b(i, j);
                martinPixel[4*p + 3] = 255;
            }
            
        context3.putImageData(martinData, 0, 0, 0, 0, canvas3.width, canvas3.height);

        
        function martin_art_r(i, j) {
            // console.log(i, j, c[i][j]);
            if (r[i][j] == 0) {
                r[i][j] = Math.floor(Math.random() * 999) == 0 ? Math.floor(Math.random() * 256) : martin_art_r((i + Math.floor(Math.random() * 2)) % 1024, (j + Math.floor(Math.random() * 2)) % 1024);
            }

            return r[i][j];
        };

        function martin_art_g(i, j) {
            if (g[i][j] == 0) {
                g[i][j] = Math.floor(Math.random() * 999) == 0 ? Math.floor(Math.random() * 256) : martin_art_g((i + Math.floor(Math.random() * 2)) % 1024, (j + Math.floor(Math.random() * 2)) % 1024);
            }

            return g[i][j];
        };

        function martin_art_b(i, j) {
            if (b[i][j] == 0) {
                b[i][j] = Math.floor(Math.random() * 999) == 0 ? Math.floor(Math.random() * 256) : martin_art_b((i + Math.floor(Math.random() * 2)) % 1024, (j + Math.floor(Math.random() * 2)) % 1024);
            }

            return b[i][j];
        };

        // manuel Kasten's mandelbrot art
        canvas4.width = 1024;
        canvas4.height = 1024;
        
        let kastenData = context4.createImageData(canvas4.width, canvas4.height);
        let kastenPixel = kastenData.data;

        for (let i = 0; i < canvas4.height; i++)
            for (let j = 0; j < canvas4.width; j++) {
                let p = i * canvas4.width + j;

                let a = 0;
                let b = 0;
                let c = 0;
                let d = 0;
                let n = 0;

                while((c = a*a) + (d = b*b) < 4 && n++ < 880) {
                    b = 2*a*b + j*8e-9 - 0.645411;
                    a = c - d + i*8e-9 + 0.356888;
                }
                
                kastenPixel[4*p + 0] = 255*Math.pow((n-80)/800, 3.0);
                kastenPixel[4*p + 1] = 255*Math.pow((n-80)/800, 0.7);
                kastenPixel[4*p + 2] = 255*Math.pow((n-80)/800, 0.5);
                kastenPixel[4*p + 3] = 255;
            }
        
        context4.putImageData(kastenData, 0, 0, 0, 0, canvas4.width, canvas4.height);

        // Manuel Kasten's second art
        canvas5.width = 1024;
        canvas5.height = 1024;

        let kasten2Data = context5.createImageData(canvas5.width, canvas5.height);
        let kasten2Pixel = kasten2Data.data;
        r = 0;
        g = 0;
        b = 0;
        for (let i = 0; i < canvas5.height; i++)
            for (let j = 0; j < canvas5.width; j++) {
                let p = i * canvas5.width + j;

                kasten2Pixel[4*p + 0] = kasten2_r();
                kasten2Pixel[4*p + 1] = kasten2_g();
                kasten2Pixel[4*p + 2] = kasten2_b();
                kasten2Pixel[4*p + 3] = 255;
            }

        context5.putImageData(kasten2Data, 0, 0, 0, 0, canvas5.width, canvas5.height);

        function kasten2_r() {
            r += Math.random() / 1.0;
            let l = r;
            l = l % 512;

            return l > 255 ? 511 - l : l;
        };

        function kasten2_g() {
            g += Math.random() / 1.0;
            let l = g;
            l = l % 512;

            return l > 255 ? 511 - l : l;
        }

        function kasten2_b() {
            b += Math.random() / 1.0;
            let l = b;
            l = l % 512;

            return l > 255 ? 511 - l : l;
        }

        // githubphagocyte's art
        canvas6.width = 1024;
        canvas6.height = 1024;

        let githubphagocyteData = context6.createImageData(canvas6.width, canvas6.height);
        let githubphagocytePixel = githubphagocyteData.data;

        for (let i = 0; i < canvas6.height; i++)
            for (let j = 0; j < canvas6.width; j++) {
                let p = i * canvas6.width + j;
                let s = 3.0/(i+99);
                let y = (i + Math.sin((j*j + Math.pow(i-700, 2)*5)/100.0/canvas6.width)*35)*s;

                githubphagocytePixel[4*p + 0] = (parseInt((j+canvas6.width)*s+y)%2 + parseInt((canvas6.width*2 - j)*s + y) % 2 )*127;
                githubphagocytePixel[4*p + 1] = (parseInt(5*((j+canvas6.width)*s+y))%2 + parseInt(5*((canvas6.width*2 - j)*s + y)) % 2)*127;
                githubphagocytePixel[4*p + 2] = (parseInt(29*((j+canvas6.width)*s+y))%2 + parseInt(29*((canvas6.width*2 - j)*s + y)) % 2)*127;
                githubphagocytePixel[4*p + 3] = 255;
            }

        context6.putImageData(githubphagocyteData, 0, 0, 0, 0, canvas6.width, canvas6.height);
        
    };

})();










