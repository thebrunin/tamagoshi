canva = new Canvas(200,400,document.getElementById('canva'));
tamagotchi = new Tamagotchi(50,50,false,true,canva.conteudo.getContext('2d'));
var px=120;
var py=80;
let andarX = 2;
let andarY = 0;
let altCanvas=200;
let lagCanvas=400;
let anima;

const image = new Image(50, 35); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "./assets/charmander.png";

tamagotchi.exist.fillStyle = 'red';
function criar(){
    
    tamagotchi.exist.clearRect(0,0,canva.lag,canva.alt);
    tamagotchi.exist.drawImage(image, px, py, tamagotchi.alt, tamagotchi.lag)
    // tamagotchi.exist.fillRect(px, py, tamagotchi.alt, tamagotchi.lag);
    // tamagotchi.exist.clearRect(px+12, py+15, 5, 5);
    // tamagotchi.exist.clearRect(px+30, py+15, 5, 5);
    // tamagotchi.exist.clearRect(px+12, py+35, 22, 5);

    py+=andarY
    px+=andarX;

    if(px >= lagCanvas-tamagotchi.lag*2 || px == tamagotchi.lag){
        andarX *= -1;
    }

    anima=requestAnimationFrame(criar);
}

function eat(){
    tamagotchi.alt += 10;
    tamagotchi.lag += 10;
}
function emagrece(){
    if(tamagotchi.alt>50){
        tamagotchi.alt = tamagotchi.alt - 1;
        tamagotchi.lag = tamagotchi.lag - 1;
    }
}

function jump(){
    window.setInterval()
}
a.addEventListener('click', eat);
b.addEventListener('click', jump);
