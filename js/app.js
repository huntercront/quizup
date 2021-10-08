WebFontConfig = {
    google: { families: ['Inter:400,600,900&display=swap'] }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);



document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('body').classList.remove('loading')
    let introSteps = document.querySelectorAll('[to-intro]');
    introSteps.forEach(function(introStep) {
        introStep.addEventListener('click', function(e) {
            let nextIntroIndex = introStep.getAttribute('to-intro')
            document.querySelector('.intro-content.active').classList.remove('active')
            let nextIntro = document.querySelector('[intro-step="' + nextIntroIndex + '"]')
            nextIntro.classList.add('active')
        })
    })

})