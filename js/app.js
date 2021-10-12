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
        let progresBar = document.querySelector('.progress-indicator');
        let totalTime = parseInt(document.querySelector('.curent-time').getAttribute('data-max'));
        let curentTime = document.querySelector('.curent-time');
        let timeCounter = totalTime;
        let stage = parseInt(document.querySelector('.question').getAttribute('stage'));
        let lives = parseInt(document.querySelector('.question').getAttribute('lives'));
        let totalLiver = document.querySelectorAll('.live').length;
        let canSelect = document.querySelector('.can-select');
        let audio = new Audio('https://huntercront.github.io/quizup/mp3/chasyi-obratnogo-otscheta-medlennogo-vrascheniya-38140%20(mp3cut.net).mp3');
        let toNextTime = parseInt(document.querySelector('.curent-time').getAttribute('to-next'));
        let nextIndicator = document.querySelector('.next-indicator');
        let timeText = document.querySelector('.time-descr');
        let nextUrl = document.querySelector('.btn.size-xl').getAttribute('next-page');
        let ansverBtn = document.querySelector('.btn.size-xl')



        function updateLives() {
            if (lives > 1) {
                document.querySelector('[live-count="' + (totalLiver - lives + 1) + '"]').classList.add('remove-life');
            }
        }

        function updateBar(value, total, barSelector) {
            let partUpdate = 100 / total;
            barSelector.style.width = partUpdate * (total - value + 1 / value) + '%';
        }


        let timerId = setInterval(function() {
            timeCounter--;

            if (timeCounter <= totalTime / 2) {
                progresBar.classList.add('time-center');
            }
            if (timeCounter <= 5) {
                curentTime.classList.add('will-end');
                progresBar.classList.add('time-ended');
                audio.play();
            }
            updateBar(timeCounter, totalTime, progresBar);
            curentTime.textContent = timeCounter;
            if (timeCounter == 0) {
                clearTimeout(timerId);
                curentTime.classList.remove('will-end');
                progresBar.classList.add('time-end');
                audio.pause();
                setTimeout(function() {
                    checkAnswer();
                    // updateLives();
                }, 200);

            }
        }, 1000);


        function showMessage(message) {
            let sucsess = document.querySelector('.sucsess');
            let error = document.querySelector('.error');
            if (message) {
                sucsess.classList.add('visible');
            } else {
                error.classList.add('visible');
            }
        };

        function toNext() {
            let nextCounter = toNextTime;
            timeText.textContent = timeText.getAttribute('next-text')
            let timerNext = setInterval(function() {
                nextCounter--;
                updateBar(nextCounter, toNextTime, nextIndicator);
                curentTime.textContent = nextCounter;
                if (nextCounter == 0) {
                    clearTimeout(timerNext);
                    document.location.href = nextUrl;
                }
            }, 1000);
        }


        function checkAnswer() {
            canSelect.classList.remove('can-select');
            let ansverRight = document.querySelector('.question').getAttribute('key');
            if (document.querySelector('.ansver.selected')) {
                if (('answer-' + ansverRight) == document.querySelector('.ansver.selected').id) {
                    document.querySelector('.ansver.selected').classList.add('ansver-right');
                    showMessage(true);

                } else {
                    document.querySelector('.ansver.selected').classList.add('ansver-wrong');
                    document.getElementById('answer-' + ansverRight).classList.add('ansver-right');
                    showMessage(false);

                }
            } else {
                document.getElementById('answer-' + ansverRight).classList.add('ansver-right');
                showMessage(false);
            }
            toNext()
        }


        let ansvers = document.querySelectorAll('.ansver');
        ansvers.forEach(function(ansver) {
            ansver.addEventListener('click', function(e) {
                if (canSelect.classList.contains('can-select')) {
                    if (document.querySelector('.ansver.selected')) {
                        document.querySelector('.ansver.selected').classList.remove('selected')
                    }
                    ansver.classList.add('selected');
                    if (ansverBtn.disabled == true) {
                        ansverBtn.disabled = false;
                        ansverBtn.textContent = "Ответить"
                    }
                }
            })
        })


        function changeAnsverBtn(btn) {
            btn.classList.add('to-next');
            btn.textContent = 'Далее';
        }

        ansverBtn.addEventListener('click', function(e) {
            if (this.classList.contains('to-next')) {
                document.location.href = nextUrl;
            } else {
                if (this.disabled == false) {
                    clearTimeout(timerId);
                    checkAnswer();
                    changeAnsverBtn(ansverBtn);
                    curentTime.classList.remove('will-end');
                    progresBar.classList.add('time-end');
                }
            }
        })
    }


})