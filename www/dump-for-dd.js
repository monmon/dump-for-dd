/*
 *
 *
 var dd = DumpForDD();
 dd.parse('[1, {"a": "b", "c": "d"}]');
 // <li data-dd-next='1'>NUMBER</li><li data-dd-next='{"a": "b", "c": "d"}'>HASH</li>
 *
 */


var DumpForDD = (function() {
    var fn = function(opt) {
        return new fn.init(opt)
    };
    
    fn.init = function(opt) {
        var init = {
            list: "<li data-dd-next='%%dd-next%%'>%%val%%</li>",
            last: "<p>%%val%%</p>"
        };
    
        opt = opt || {};
        for (var k in init) {
            this[k] = (k in opt) ? opt[k] : init[k];
        }
    
        return this;
    };
    fn.init.prototype = {
        parse: function(jsonStr) {
            if (typeof jsonStr === 'undefined') return '';

            var parsedJSON;
            try {
                if (typeof jsonStr === 'string') {
                    parsedJSON = JSON.parse(jsonStr);
                }
                else { // maybe input object
                    parsedJSON = jsonStr;
                }
            }
            catch(e) {
                parsedJSON = {"parse error": e};
            }
        
            var results;
            if (Array.isArray(parsedJSON)) {
                results = ['<ul>'];
                for (var i=0, l=parsedJSON.length; i<l; ++i) {
                    var elem = parsedJSON[i];

                    var data = {
                        nextDD: '',
                        val: ''
                    };
                    if (Array.isArray(elem)) {
                        data.val = 'ARRAY';
                    }
                    else if (typeof elem === 'object') { // isHash
                        data.val = 'HASH';
                    }
                    else {
                        data.val = (typeof elem).toUpperCase();
                    }
                    data.nextDD = JSON.stringify(elem);
        
                    results[results.length]
                        = this.list
                            .replace('%%dd-next%%', escape(data.nextDD))
                            .replace('%%val%%', data.val);
                }
                results[results.length] = '</ul>';
                return results.join('');
            }
            else if (typeof parsedJSON === 'object') {
                results = ['<ul>'];
                for (var k in parsedJSON) {
                    results[results.length]
                        = this.list
                            .replace('%%dd-next%%', escape(JSON.stringify(parsedJSON[k])))
                            .replace('%%val%%', k);
                }
                results[results.length] = '</ul>';
                return results.join('');
            }
            else {
                return this.last.replace('%%val%%', parsedJSON);
            }
        
            return '';
        },
    };

    return fn;
})();
