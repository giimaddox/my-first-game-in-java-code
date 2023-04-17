//variáveis da raquete
let xRaquete = 5
let yRaquete = 150
let alturaRaquete = 80
let larguraRaquete = 10
let colidiu = false

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// variáveis da raquete do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let VelocidadeYOponente;
let chanceDeErrar = 0;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;


//variáveis de movimento da bolinha
let velocidadeXBolinha = 5 ;
let velocidadeYBolinha = 5 ;


//Função de criação de cenário
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Função de desenho
function draw() {
  background(0);
  Bolinha();
  Raquete(xRaquete, yRaquete);
  Raquete(xRaqueteOponente, yRaqueteOponente);
  MovimentoBolinha();
  VerificaColisaoBorda();
  MovimentaMinhaRaquete();
  MovimentaRaqueteOponente();
  colisao(xRaquete,yRaquete);
  colisao(xRaqueteOponente, yRaqueteOponente);
  placar();
  pontuacao();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  bolinhaNaoFicaPresaOponente();
  
}
//Desenho Raquete
function Raquete(x,y){
   rect(x, y , larguraRaquete, alturaRaquete);

}
//Desenho Bolinha
function Bolinha(){
  circle(xBolinha, yBolinha, diametro);
  
}  
  
//Função de Movimento da Bolinha
function MovimentoBolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23;

    }
    }
function bolinhaNaoFicaPresaOponente(){
  if (xBolinha > 584){
      xBolinha = 555;}
}

  
//Função de Colisão com a Borda
function VerificaColisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0) {velocidadeXBolinha *= -1
 }
  if (yBolinha + raio > height || yBolinha - raio < 0) {velocidadeYBolinha *= -1
  
}
  
  }
  
function MovimentaMinhaRaquete(){
  if (keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
      }     
}
  function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }

  }
}
function MovimentaRaqueteOponente(){
  
  VelocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30
  yRaqueteOponente += VelocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function colisao(x,y){
  
  colidiu =
  
  collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
  
}

function pontuacao(){
  if (xBolinha > 584){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
    
  }
}