(function() {
    let destImg = document.getElementById("dest-img");
    let description = document.getElementById("description");

    window.onload = function() {
        //destImg.src
        greyEffect();
    };
    
    window.greyEffect = function() {
        destImg.style["-webkit-filter"] = "grayscale(1)";
        // console.log("greyscale");
        description.innerHTML = "filter: grayscale(1)";
    
    };

    window.sepiaEffect = function() {
        destImg.style["-webkit-filter"] = "sepia(1)";
        description.innerHTML = "filter: sepia(1)";
    };

    window.saturateEffect = function() {
        destImg.style["-webkit-filter"] = "saturate(3)";
        description.innerHTML = "filter: saturate(3)";
    };

    window.hueRotate = function() {
        destImg.style["-webkit-filter"] = "hue-rotate(90deg)";
        description.innerHTML = "filter: hue-rotate(90deg)";
    };

    window.invert = function() {
        destImg.style["-webkit-filter"] = "invert(1)";
        description.innerHTML = "filter: invert(1)";
    };

    window.opacity = function() {
        destImg.style["-webkit-filter"] = "opacity(0.2)";
        description.innerHTML = "filter: opacity(0.2)";
    };

    window.brightness = function() {
        destImg.style["-webkit-filter"] = "brightness(0.5)";
        description.innerHTML = "filter: brightness(0.5)";
    };

    window.contrast = function() {
        destImg.style["-webkit-filter"] = "contrast(2)";
        description.innerHTML = "filter: contrast(2)";
    };

    window.blur = function() {
        destImg.style["-webkit-filter"] = "blur(10px)";
        description.innerHTML = "filter: blur(10px)";
    };

    window.dropShadow = function() {
        destImg.style["-webkit-filter"] = "drop-shadow(10px 10px 2px #aaa)";
        description.innerHTML = "filter: drop-shadow(10px 10px 2px #aaa)";
    };
})();
