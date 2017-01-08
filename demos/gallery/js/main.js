(function() {

    window.g = function(selector) {
        let method = selector.substr(0, 1) == '.' ?
                'getElementsByClassName' : 'getElementById';

        return document[method](selector.substr(1));
    };

    let data = window.data;
    function addPhotos() {
        let template = g('#wrap').innerHTML;
        let html = [];
        let nav = [];

        for (let s in data) {
            let _html = template.replace('{{index}}', s)
                    .replace('{{img}}', data[s].img)
                    .replace('{{caption}}', data[s].caption)
                    .replace('{{desc}}', data[s].desc);
            html.push(_html);

            nav.push('<span class="i" id="nav_' + s + '" onclick="turn(g(\'#photo_' + s + '\'))">&nbsp;</span>');
        }

        html.push('<div class="nav">' + nav.join('') + '</div>');

        g('#wrap').innerHTML = html.join('');

        rsort(random([0, data.length - 1]));
    }

    function random(range) {
        let max = Math.max(range[0], range[1]);
        let min = Math.min(range[0], range[1]);

        let diff = max - min;
        let number = Math.ceil(Math.random() * diff + min);

        return number;
    }

    addPhotos();

    function range() {
        let range = {
            left: { x: [], y: [] },
            right: { x: [], y: [] }
        };

        let wrap = {
            w : g('#wrap').clientWidth,
            h : g('#wrap').clientHeight
        };

        let photo = {
            w : g('.photo')[0].clientWidth,
            h : g('.photo')[0].clientHeight
        };

        range.left.x = [ 0 - photo.w, wrap.w/2 - photo.w/2 ];
        range.left.y = [ 0 - photo.h, wrap.h ];
        range.right.x = [ wrap.w/2 + photo.w/2, wrap.w + photo.w ];
        range.right.y = [ 0 - photo.h, wrap.h ];

        return range;
    }
    
    function rsort(n) {

        let _photo = g('.photo');
        let photos = [];
        
        for (s = 0; s < _photo.length; s++) {
            _photo[s].className = _photo[s].className.replace(/\s*photo-center\s*/, ' ');
            _photo[s].className = _photo[s].className.replace(/\s*photo-front\s*/, ' ');
            _photo[s].className = _photo[s].className.replace(/\s*photo-back\s*/, ' ');

            _photo[s].className += ' photo-front ';
            
            _photo[s].style = '';

            photos.push(_photo[s]);
        }
        
        let photo_center = g('#photo_' + n);
        photo_center.className += ' photo-center';
        photo_center = photos.splice(n, 1)[0];

        let photos_left = photos.splice(0, Math.ceil(photos.length/2));
        let photos_right = photos;

        let ranges = range();
        
        for (s in photos_left) {
            let photo = photos_left[s];

            photo.style.left = random(ranges.left.x) + 'px';
            photo.style.top = random(ranges.left.y) + 'px';

            photo.style['-webkit-transform'] = 'rotate(' + random([-45, 45]) + 'deg)';
        }

        for (s in photos_right) {
            let photo = photos_right[s];

            photo.style.left = random(ranges.right.x) + 'px';
            photo.style.top = random(ranges.right.y) + 'px';

            photo.style['-webkit-transform'] = 'rotate(' + random([-45, 45]) + 'deg)';
        }

        let navs = g('.i');

        for (s = 0; s < navs.length; s++) {
            navs[s].className = navs[s].className.replace(/\s*i_current\s*/, ' ');
            navs[s].className = navs[s].className.replace(/\s*i_back\s*/, ' ');
        }
        
        g('#nav_' + n).className += ' i_current ';
    }
    
    window.turn = 
    function (elem) {
        let cls = elem.className;
        let n = elem.id.split('_')[1];

        if (!/photo-center/.test(cls)) {
            return rsort(n);
        }
        
        if (/photo-front/.test(cls)) {
            cls = cls.replace(/photo-front/, 'photo-back');
        } else {
            cls = cls.replace(/photo-back/, 'photo-front');
        }

        elem.className = cls;
    };

})();



