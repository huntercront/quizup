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
    document.querySelector('body').classList.remove('loading');
    let introSteps = document.querySelectorAll('[to-intro]');
    introSteps.forEach(function(introStep) {
        introStep.addEventListener('click', function(e) {
            let nextIntroIndex = introStep.getAttribute('to-intro')
            document.querySelector('.intro-content.active').classList.remove('active')
            let nextIntro = document.querySelector('[intro-step="' + nextIntroIndex + '"]')
            nextIntro.classList.add('active')
        })
    })

    if (document.querySelector('.question')) {
        let progresBar = document.querySelector('.hs-circle--bar');
        let totalTime = parseInt(document.querySelector('.total-time').textContent);
        let curentTime = document.querySelector('.curent-time');
        let timeCounter = totalTime;
        let stage = parseInt(document.querySelector('.question').getAttribute('stage'));
        let lives = parseInt(document.querySelector('.question').getAttribute('lives'));
        let totalLiver = document.querySelectorAll('.live').length;
        let canSelect = document.querySelector('.can-select');
        var audio = new Audio('https://huntercront.github.io/quizup/mp3/chasyi-obratnogo-otscheta-medlennogo-vrascheniya-38140%20(mp3cut.net).mp3');


        function updateLives() {
            if (lives > 1) {
                document.querySelector('[live-count="' + (totalLiver - lives + 1) + '"]').classList.add('remove-life');
            }
        }

        function updateBar(value) {
            let partUpdate = 80 / totalTime;
            progresBar.style.strokeDashoffset = 100 - (partUpdate * (totalTime - value + 1));
        }
        let timerId = setInterval(function() {
            timeCounter--;
            if (timeCounter == 5) {
                curentTime.classList.add('will-end');
                audio.play();
            }
            updateBar(timeCounter);
            curentTime.textContent = timeCounter;
            if (timeCounter == 0) {
                clearTimeout(timerId);
                curentTime.classList.remove('will-end');
                audio.pause();
                setTimeout(function() {
                    checkAnswer();
                    updateLives();
                }, 200);

            }
        }, 1000);

        function checkAnswer() {
            canSelect.classList.remove('can-select');
            let ansverRight = document.querySelector('.question').getAttribute('key');
            if (document.querySelector('.ansver.selected')) {
                if (('answer-' + ansverRight) == document.querySelector('.ansver.selected').id) {
                    document.querySelector('.ansver.selected').classList.add('ansver-right')
                } else {
                    document.querySelector('.ansver.selected').classList.add('ansver-wrong');
                    document.getElementById('answer-' + ansverRight).classList.add('ansver-right');
                }
            } else {
                document.getElementById('answer-' + ansverRight).classList.add('ansver-right')
            }
        }


        let ansvers = document.querySelectorAll('.ansver');
        ansvers.forEach(function(ansver) {
            ansver.addEventListener('click', function(e) {
                if (canSelect.classList.contains('can-select')) {
                    if (document.querySelector('.ansver.selected')) {
                        document.querySelector('.ansver.selected').classList.remove('selected')
                    }
                    ansver.classList.add('selected')
                }
            })
        })
    }


})