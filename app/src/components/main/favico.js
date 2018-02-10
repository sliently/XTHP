import Favico from 'favico.js'
const favicon = (function(num) {
    var favico = new Favico({
        type: 'rectangle',
        animation: 'popFade',
        bgColor: '#2ea3f2',
        textColor: '#fff',
    });
    var count = 0;
    var addBage = function() {
        count <= 99 ? count++ : count = 'n'
        favico.badge(count);
    };
    var resetBage = function() {
        favico.badge(0);
        favico = new Favico({
            type: 'rectangle',
            animation: 'popFade',
            bgColor: '#2ea3f2',
            textColor: '#fff',
        });

        count = 0;
    };
    var resetWhenDocVisibility = function() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                resetBage();
            }
        })
    };
    return {
        addBage,
        resetBage,
        resetWhenDocVisibility
    }
})(Favico)
export default favicon