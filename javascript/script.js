canva = new Canvas(200,400,document.getElementById('canva'));
tamagotchi = new Tamagotchi(50,50,false,true,canva.conteudo.getContext('2d'));

let pet = getFromLocalStorage("pet");
if (!pet) {
    pet = {
        px: 120,
        py: 120,
        andarX: 10,
        andarY: 0,
        altCanvas: 200,
        lagCanvas: 400,
        linhaSprite: 1,
        colunaSprite: 0,
        stop: false
    }
}

//sprite pet
const alturaSprite = 37.4;
const larguraSprite = 37.5;

const CORRENDO_DIREITA = 1;
const CORRENDO_ESQUERDA = 3;
const DORMINDO = 7;

//sprite food
const tamSpriteFood = 75;
let linhaSpriteFood = 0;
let colunaSpriteFood = 0;
//acoes
let eating = false;
let speaking = false;
let phrasal = '';
let pyPhrasalAdjust = 10;
let maxLengthPhasal = 0;
let phrasalIncrement = 0;

let poopObj = getFromLocalStorage("poop");

if (!poopObj) {
    poopObj = {
        tam: 40,
        eatCount: 0,
        poopList: [],
    }
}

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

//imagem comida
const poopImage = new Image();
poopImage.src = "./assets/poop.png";

tamagotchi.exist.fillStyle = 'red';
function criar(){
    //DELIMITA COLUNAS DA LINHA DORMINDO
    if(pet.linhaSprite == DORMINDO) {
        if(pet.colunaSprite > 1) {
            pet.colunaSprite = 0;
        }
    }
    //DELIMITA COLUNAS DAS LINHAS CORRENDO
    if(pet.linhaSprite == CORRENDO_DIREITA || pet.linhaSprite == CORRENDO_ESQUERDA) {
        if(pet.colunaSprite > 3) {
            pet.colunaSprite = 0;
        }
    }
    //px eixo x de onde se inicia meu sprite
    let posicaoInicialX = pet.colunaSprite * larguraSprite;
    //px eixo y de onde se inicia o sprite
    let posicaoInicialY = pet.linhaSprite * alturaSprite;
    tamagotchi.exist.clearRect(0,0,canva.lag,canva.alt);
    tamagotchi.exist.drawImage(cenarioImage, 0, 0, canva.lag, canva.alt);

    tamagotchi.exist.drawImage(image, posicaoInicialX, posicaoInicialY, larguraSprite, alturaSprite, pet.px, pet.py, tamagotchi.alt, tamagotchi.lag);

    eatAction();
    speakAction();
    poop();

    pet.colunaSprite++;

    if (!pet.stop) {
        pet.py+=pet.andarY;
        pet.px+=pet.andarX;
    }

    if(pet.px >= pet.lagCanvas-(larguraSprite * 2) || pet.px <= tamagotchi.lag){
        pet.andarX *= -1;
        if (pet.linhaSprite == CORRENDO_DIREITA)
            pet.linhaSprite = CORRENDO_ESQUERDA;
        else if (pet.linhaSprite == CORRENDO_ESQUERDA)
            pet.linhaSprite = CORRENDO_DIREITA;
    }

    saveOnLocalStorage("pet", pet);
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
    poopObj.eatCount++;
}

function poop() {
    if(poopObj.eatCount >= 3) {
        let newPoop = {};
        newPoop.pxPoop = pet.px;
        newPoop.pyPoop = pet.py + 15;

        poopObj.eatCount = 0;
        poopObj.poopList.push(newPoop);
        hasPoop = true;

        saveOnLocalStorage("poop", poopObj);
    }

    poopObj.poopList.forEach(p => {
        tamagotchi.exist.drawImage(poopImage, p.pxPoop, p.pyPoop, poopObj.tam, poopObj.tam);
    })
    
}

function sleepRunHandler() {
    if(pet.stop) {
        run();        
    } else {
        sleep();
    }
}

function speak() {
    if(pet.stop) {
        run();
    }
    speaking = true;
    maxLengthPhasal = getRandomInt(6) * 2;
}

function sleep(){
    pet.linhaSprite = 7;
    pet.stop = true;
}

function run(){
    if (pet.andarX > 0)
        pet.linhaSprite = 1;
    else
        pet.linhaSprite = 3;
    pet.stop = false;
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
        tamagotchi.exist.drawImage(foodImage, posicaoInicialX, posicaoInicialY, tamSpriteFood, tamSpriteFood, pet.px, pet.py, tamagotchi.alt, tamagotchi.lag)
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
        tamagotchi.exist.fillRect(pet.px - 3, (pet.py - (pyPhrasalAdjust * 2) - 3), 105, (15 + pyPhrasalAdjust));
        tamagotchi.exist.fillStyle = "white";
        tamagotchi.exist.fillRect(pet.px, (pet.py - (pyPhrasalAdjust * 2)), 100, (10 + pyPhrasalAdjust));
        tamagotchi.exist.fillStyle = "black";
        tamagotchi.exist.fillText((phrasal + "..."), pet.px, (pet.py - pyPhrasalAdjust), 100);

        phrasalIncrement++;
    }
}

function saveOnLocalStorage(key, obj) {
    const stringJSON = JSON.stringify(obj);
    localStorage.setItem(key, stringJSON);
}

function getFromLocalStorage(key) {
    const stringJSON = localStorage.getItem(key);
    const meuObjeto = JSON.parse(stringJSON);
    console.log(meuObjeto);
    return meuObjeto;
}


canva.conteudo.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    removePoop(x, y);
})

function removePoop(x, y) {
    const indexToRemove = poopObj.poopList.filter(p => (((p.pxPoop <= x) && ((p.pxPoop + poopObj.tam) >= x)) 
                        && ((p.pyPoop <= y) && ((p.pyPoop + poopObj.tam) >= y))
                    ))
                    .map(e => poopObj.poopList.indexOf(e));
    
    let offset = 0;
    for (const index of indexToRemove) {
        poopObj.poopList.splice(index + offset, 1);
        offset--;
    }

    saveOnLocalStorage("poop", poopObj);  
}