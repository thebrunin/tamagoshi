canva = new Canvas(200,400,document.getElementById('canva'));
tamagotchi = new Tamagotchi(50,50,false,true,canva.conteudo.getContext('2d'));
var px=120;
var py=80;
let andarX = 10;
let andarY = 0;
let altCanvas=200;
let lagCanvas=400;
const alturaSprite = 37.4;
const larguraSprite = 37.5;
let linhaSprite = 1;
let colunaSprite = 0;
let stop = false;
const image = new Image(50, 35); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "./assets/dog-sprite.png";

tamagotchi.exist.fillStyle = 'red';
function criar(){
    if(linhaSprite == 7) {
        if(colunaSprite > 1) {
            colunaSprite = 0;
        }
    }
    if(linhaSprite == 1 || linhaSprite == 3) {
        if(colunaSprite > 3) {
            colunaSprite = 0;
        }
    }
    //px eixo x de onde se inicia meu sprite
    let posicaoInicialX = colunaSprite * larguraSprite;
    //px eixo y de onde se inicia o sprite
    let posicaoInicialY = linhaSprite * alturaSprite;
    tamagotchi.exist.clearRect(0,0,canva.lag,canva.alt);
    tamagotchi.exist.drawImage(image, posicaoInicialX, posicaoInicialY, larguraSprite, alturaSprite, px, py, tamagotchi.alt, tamagotchi.lag)
    // tamagotchi.exist.fillRect(px, py, tamagotchi.alt, tamagotchi.lag);

    colunaSprite++;

    if (!stop) {
        py+=andarY
        px+=andarX;
    }

    if(px >= lagCanvas-tamagotchi.lag*2 || px == tamagotchi.lag){
        andarX *= -1;
        if (linhaSprite == 1)
            linhaSprite = 3;
        else if (linhaSprite == 3)
            linhaSprite = 1;
    }
}

let anima = setInterval(()=> {
    criar();
}, 200);

function emagrece() {
    tamagotchi.alt -= 10;
    tamagotchi.lag -= 10;
}

function eat() {
    tamagotchi.alt += 10;
    tamagotchi.lag += 10;
    setTimeout(emagrece, 200);
}

function sleep(){
    linhaSprite = 7;
    stop = true;
}

function run(){
    if (andarX > 0)
        linhaSprite = 1;
    else
        linhaSprite = 3;
    stop = false;
}

function jump(){
    window.setInterval()
}
a.addEventListener('click', eat);
b.addEventListener('click', jump);
