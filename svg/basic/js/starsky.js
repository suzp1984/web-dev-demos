(function() {
    
    let SVG_NS = 'http://www.w3.org/2000/svg';
    let XLINK_NS = 'http://www.w3.org/1999/xlink';
    
    let paper = document.querySelector('svg');
    renderStar();

    function use(orgin) {
        let _use = document.createElementNS(SVG_NS, 'use');
        _use.setAttributeNS(XLINK_NS, 'xlink:href', '#' + orgin.id);
        return _use;
    }

    function random(min, max) {
        return min + (max-min)* Math.random();
    }

    function renderStar() {
        let starRef = document.getElementById('star');
        let starGroup = document.getElementById('star-group');
        let starCount = 500;

        let star;
        while(starCount--) {
            star = use(starRef);
            star.setAttribute('opacity', random(0.1, 0.4));
            star.setAttribute('transform', 'translate(' + random(-400, 400) + ',' + random(-300, 50) + ')' + 'scale(' + random(0.1, 0.4) + ')');
            starGroup.appendChild(star);
        }
    }

})();
