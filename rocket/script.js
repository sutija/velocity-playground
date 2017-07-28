let $body;
let $container;
let $rocket;

const numOfSmokeElements = 2;
const smokeElements = [];

const animateRocket = () => {
  $rocket
  .velocity({
    bottom: 0,
    left: $(window).width() / 2 - $rocket.width() / 2,
    translateY: 0,
  },0)
  .velocity({
    easing: 'ease',
    translateY: -$(window).height() -$rocket.height(),
  }, {
      duration: 15000,
      loop: true,
      mobileHA: false,
      progress: (elements, percentComplete) =>{
        $container.css('transform','translate3d(0,0,'+(percentComplete * 100 +'%')+')');
        createSmoke();
      },
    });
};

const animateSmoke = (smoke) => {
  $container.append(smoke);
  smoke.velocity({
    opacity: 1,
    top: ($rocket.offset().top + $rocket.height() - 30),
    left: getRandomInt($rocket.offset().left + 30, $rocket.offset().left + $rocket.width() - 30),
  }, 0)
  .velocity({
    backgroundColor: [ 'red', 'yellow' ],
    scale: 0,
    translateY: getRandomInt(10, 1000)+'%',
  }, {
    duration: getRandomInt(1500, 3000),
    easing: 'ease',
    complete: () => {
      smoke.remove();
      smokeElements.splice(smokeElements.indexOf(smoke), 1);
      $('#totalElements').text(smokeElements.length);
    }
  });
};

const createSmoke = () => {
  for (let i=0; i<numOfSmokeElements; i++){
    smokeElements.push($('<div />').addClass('smoke'));
    animateSmoke(smokeElements[smokeElements.length-1]);
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

$(document).ready(_ => {
  $rocket = $('#rocket');
  $body = $(document.body);
  $container = $('#container');

  animateRocket();
});