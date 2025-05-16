canva = new Canvas(200,400,document.getElementById('canva'));
tamagotchi = new Tamagotchi(50,50,false,true,canva.conteudo.getContext('2d'));
var px=120;
var py=120;
let andarX = 10;
let andarY = 0;
let altCanvas=200;
let lagCanvas=400;
//sprite pet
const alturaSprite = 37.4;
const larguraSprite = 37.5;
let linhaSprite = 1;
const CORRENDO_DIREITA = 1;
const CORRENDO_ESQUERDA = 3;
const DORMINDO = 7;
let colunaSprite = 0;
//sprite food
const tamSpriteFood = 75;
let linhaSpriteFood = 0;
let colunaSpriteFood = 0;
//acoes
let stop = false;
let eating = false;
let speaking = false;
let phrasal = '';
let pyPhrasalAdjust = 10;
let maxLengthPhasal = 0;
let phrasalIncrement = 0;
//image
const image = new Image(50, 35); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "./assets/dog-sprite.png";

//imagem cenário
const cenarioImage = new Image();
cenarioImage.src = "./assets/floresta.jpg";

//imagem comida
const foodImage = new Image();
foodImage.src = "./assets/foods.png";

tamagotchi.exist.fillStyle = 'red';
function criar(){
    //DELIMITA COLUNAS DA LINHA DORMINDO
    if(linhaSprite == DORMINDO) {
        if(colunaSprite > 1) {
            colunaSprite = 0;
        }
    }
    //DELIMITA COLUNAS DAS LINHAS CORRENDO
    if(linhaSprite == CORRENDO_DIREITA || linhaSprite == CORRENDO_ESQUERDA) {
        if(colunaSprite > 3) {
            colunaSprite = 0;
        }
    }
    //px eixo x de onde se inicia meu sprite
    let posicaoInicialX = colunaSprite * larguraSprite;
    //px eixo y de onde se inicia o sprite
    let posicaoInicialY = linhaSprite * alturaSprite;
    tamagotchi.exist.clearRect(0,0,canva.lag,canva.alt);
    tamagotchi.exist.drawImage(cenarioImage, 0, 0, canva.lag, canva.alt);
    tamagotchi.exist.drawImage(image, posicaoInicialX, posicaoInicialY, larguraSprite, alturaSprite, px, py, tamagotchi.alt, tamagotchi.lag);

    eatAction();
    speakAction();

    colunaSprite++;

    if (!stop) {
        py+=andarY
        px+=andarX;
    }

    if(px >= lagCanvas-(larguraSprite * 2) || px <= tamagotchi.lag){
        andarX *= -1;
        if (linhaSprite == CORRENDO_DIREITA)
            linhaSprite = CORRENDO_ESQUERDA;
        else if (linhaSprite == CORRENDO_ESQUERDA)
            linhaSprite = CORRENDO_DIREITA;
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
    eating = true;
}

function sleepRunHandler() {
    if(stop) {
        run();        
    } else {
        sleep();
    }
}

function speak() {
    if(stop) {
        run();
    }
    speaking = true;
    maxLengthPhasal = getRandomInt(7) * 2;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function eatAction() {
    if(eating) {
        let posicaoInicialX = colunaSpriteFood * tamSpriteFood;
        let posicaoInicialY = linhaSpriteFood * tamSpriteFood;
        tamagotchi.exist.drawImage(foodImage, posicaoInicialX, posicaoInicialY, tamSpriteFood, tamSpriteFood, px, py, tamagotchi.alt, tamagotchi.lag)
        colunaSpriteFood++;
        if (colunaSpriteFood > 2) {
            colunaSpriteFood = 0;
            linhaSpriteFood++;
        }
        if (linhaSpriteFood > 2) {
            colunaSpriteFood = 0;
            linhaSpriteFood = 0;
            eating = false;
        }
    }
}


function speakAction() {
    if(speaking) {
        if(phrasalIncrement == maxLengthPhasal) {
            speaking = false;
            phrasal = "";
            phrasalIncrement = 0;
            maxLengthPhasal = 0;
            pyPhrasalAdjust = 10;
            return;
        }

        phrasal += "Au ";

        tamagotchi.exist.fillStyle = "black";
        tamagotchi.exist.fillRect(px - 3, (py - (pyPhrasalAdjust * 2) - 3), 105, (15 + pyPhrasalAdjust));
        tamagotchi.exist.fillStyle = "white";
        tamagotchi.exist.fillRect(px, (py - (pyPhrasalAdjust * 2)), 100, (10 + pyPhrasalAdjust));
        tamagotchi.exist.fillStyle = "black";
        tamagotchi.exist.fillText((phrasal + "..."), px, (py - pyPhrasalAdjust), 100);

        phrasalIncrement++;
    }
}
