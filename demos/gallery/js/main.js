(function() {
    window.turn = 
    function (elem) {
        let cls = elem.className;
        if (/photo-front/.test(cls)) {
            cls = cls.replace(/photo-front/, ' photo-back');
        } else {
            cls = cls.replace(/photo-back/, ' photo-front');
        }

        elem.className = cls;
    };
})();
