const listaPerguntas = [
  new Questao("_________ é a fonte da juventude e a coisa ________ a fazer. Quais palavras, em ordem, completam a frase?",
    [
      new Resposta("Natural, certa", "meu_veredito_fake.mp4", "rodrigo_beijo.jpg"),
      new Resposta("O suco, certa", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Natural, errada", "meu_veredito_fake.mp4", "rodrigo_t.jpg")
    ], 0),
  new Questao("Quanto você aguenta na rosca?",
    [
      new Resposta("10kg", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("40kg", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Mais que tu!", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 0),
  new Questao("Quem você pensa que é?",
    [
      new Resposta("Chris Bumstead, Sibam.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Pessoa comum, natural.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Pessoa comum, hormonizada.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 1),
  new Questao("Qual a frase dita por Rodrigo Goes ao finalizar seus vídeos?",
    [
      new Resposta("Rodrigo Goes Out!", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Tmj família!", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Um beijo na bunda e até segunda!", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 0),
  new Questao("Você aplica no bumbum quando ninguém está olhando?",
    [
      new Resposta("Sim né, não sou natty.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Não entendi.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 1),
  new Questao("O ______ vicia, o shape vicia. Qual palavra completa a frase?",
    [
      new Resposta("Baseball Bat.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Suco.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Chris Bumstead, Sibam.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 1),
  new Questao("O que mais se encaixa com você?",
    [
      new Resposta("Natural, boa alimentação", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("17 anos, natural, vegano e alérgico a água.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Abençoado pelo suco, vivo do suco, suco is my life.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 0),
  new Questao("Pergunta decisiva, seja sincero. Natty or Not? (Natural ou não?)",
    [
      new Resposta("Sim, sou natural!", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Sim, sou mais natural que uma árvore de laranjas.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg"),
      new Resposta("Não Rodrigo, não sou natural! Admito que fiz amor com o suco.", "meu_veredito_fake.mp4", "rodrigo_desapontado.jpg")
    ], 0)
];

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const estrutura = document.querySelector(".estrutura");
const imagem_rodrigo = estrutura.querySelector(".imagem_rodrigo");
const video_rodrigo = estrutura.querySelector(".video_rodrigo");
const container_questao = estrutura.querySelector(".container_questao");

const barra_status_respostas = document.querySelector(".barra_status_respostas");
const barra_loading_resultado = document.querySelector(".barra_loading_resultado");
const carregando = document.querySelector(".carregando");

const estrutura_resultado = document.querySelector(".estrutura_resultado");

let perguntaAtual = 0;
let resultado = listaPerguntas.length;
let tamanhoBarra = 0;
let videoTimeout;

const caminhoVideo = "files/videos/";
const caminhoImg = "files/imgs/"

function init(){  
  console.warn("WOOOOW LOOK AT HIM!! Are you trying to cheat??!");

  estrutura.classList.remove("oculto");
  carregando.classList.add("oculto");
  
  //avaliaResultado();

  montaPergunta();  
}

function montaPergunta(){
  barra_status_respostas.style.width = tamanhoBarra + "%";
  tamanhoBarra += (100 / listaPerguntas.length);
  
  if (perguntaAtual < listaPerguntas.length){
    let respostas = "";
    imagem_rodrigo.innerHTML='<img class="padrao selecionada" src="files/imgs/rodrigo_desapontado.jpg" alt="">';
    
    if (perguntaAtual == 3){
      abreAnuncio();
    }

    for (let i = 0; i < listaPerguntas[perguntaAtual].respostas.length; i++) {
      const resposta = listaPerguntas[perguntaAtual].respostas[i];
      respostas+= '<input type="button" id="'+alfabeto[i]+perguntaAtual+'" onmouseout="resetReacaoHover(this)" onmouseover="emiteReacaoHover('+perguntaAtual+','+i+', this);" onclick="avaliaResposta(this)" value="'+resposta.texto+'">';            
    
      imagem_rodrigo.innerHTML+= '<img id=img'+alfabeto[i]+perguntaAtual+' src="'+caminhoImg+resposta.imgReacaoHover+'" alt="">'
    }


    container_questao.innerHTML = 
    '<div class="corpo_questao entrada">'+
    '<div class="questao"><h2>'+Number(perguntaAtual+1)+'. '+listaPerguntas[perguntaAtual].texto+'</h2><div>'+
    '<div class="alternativas">'+respostas+'</div>';

    perguntaAtual += 1;        

    setTimeout(() => {      
      entrarTela();
    }, "300");
  }
  else{
    avaliaResultado();
  }
}

function entrarTela(){
  const corpo_questao = document.querySelector(".corpo_questao");
  
  corpo_questao.classList.remove("sairTela");
  corpo_questao.classList.add("entrarTela");
}
function sairTela(){
  const corpo_questao = document.querySelector(".corpo_questao");
  
  corpo_questao.classList.remove("entrarTela");
  corpo_questao.classList.add("sairTela");
  
  if (perguntaAtual < listaPerguntas.length){
    emiteReacaoRodrigo();    
  }

  setTimeout(() => {      
    corpo_questao.remove();
    montaPergunta();
  }, "300");

}

function avaliaResposta(elemento){
  const indiceRes = alfabeto.indexOf(elemento.id[0]);

  if (listaPerguntas[elemento.id[1]].indiceRespostaCorreta !== indiceRes){
    resultado -= 1; 
  }

  console.log(resultado);  
  sairTela();
}

function avaliaResultado(){
  fechaAnuncio();
  
  let video = video_rodrigo.querySelector("video");
  video.pause();
  
  const textoCarregando = carregando.querySelector("h3");

  estrutura.classList.remove("entrarTela");
  estrutura.classList.add("sairTela");

  setTimeout(()=>{
    estrutura.classList.add("oculto");
    carregando.classList.remove("oculto");

    barra_loading_resultado.style.width = "0%";
    textoCarregando.innerHTML = "Woooow, look at him!"

    setTimeout(() => {
      carregando.classList.add("entrarTela");
    
      let tamanhoBarraResultado = 0;
      const id = setInterval(frame, 1000);
      function frame() {
        if (tamanhoBarraResultado == 100) {
          clearInterval(id);
          montaResultado();
        } else {
          tamanhoBarraResultado+= 20; 
          textoCarregando.innerHTML = setTextoCarregando(tamanhoBarraResultado);
          barra_loading_resultado.style.width = tamanhoBarraResultado + '%'; 
        }
      }
    }, 300);
    
  }, 300);

}

function setTextoCarregando(porcentagem){  
  if (porcentagem >= 80){
    return "A verdade está próxima!";
  }
  if (porcentagem >= 20){
    return "Hmmmmm";
  }
  else{
    return "Rodrigo está se preparando, aguarde...";
  }
}

function montaResultado(){
  estrutura_resultado.classList.remove("oculto");  
  estrutura.classList.add("oculto");
  carregando.classList.add("oculto");
  
  setTimeout(() => {
    estrutura_resultado.classList.add("escala");
  }, 100);

  let reacaoResultadoVideo;

  if (resultado > 5){
    reacaoResultadoVideo = caminhoVideo + "jesus_maria_jose.mp4";
  }
  else if (resultado == 5){
    reacaoResultadoVideo = caminhoVideo + "jesus_maria_jose.mp4";
  }
  else{
    reacaoResultadoVideo = caminhoVideo + "meu_veredito_fake.mp4";
  }

  estrutura_resultado.innerHTML = '<video src="'+reacaoResultadoVideo+'" autoplay></video>'+
  '<input type="button" value="Refazer Quiz" onclick="resetQuiz()" style="margin-top: 15px">';

}

function emiteReacaoRodrigo(indice){
  clearTimeout(videoTimeout);

  let tempoTimeout = 0;

  imagem_rodrigo.classList.add("oculto");
  video_rodrigo.classList.remove("oculto");

  let video = video_rodrigo.querySelector("video");
  video.src = caminhoVideo+"meu_veredito_fake.mp4";  

  setTimeout(() => {
    tempoTimeout = (video.duration * 1000) - 1000;

    videoTimeout = setTimeout(() => {      
      video_rodrigo.classList.add("oculto");
      imagem_rodrigo.classList.remove("oculto");
    }, tempoTimeout);
  }, "1000");

  
}

function emiteReacaoHover(indicePergunta, indiceResposta, elemento){
  const caminhoImgResposta = listaPerguntas[indicePergunta].respostas[indiceResposta].imgReacaoHover;
  const imgId = "#img" + elemento.id

  imagem_rodrigo.querySelector(".selecionada").classList.remove("selecionada");
  imagem_rodrigo.querySelector(imgId).classList.add("selecionada");

  //gambiarra alternativa custom
  if (elemento.id === "B1"){
    elemento.value = "40cm"
  }
}

function resetReacaoHover(elemento){
  imagem_rodrigo.querySelector(".selecionada").classList.remove("selecionada");
  imagem_rodrigo.querySelector(".padrao").classList.add("selecionada");

  //gambiarra alternativa custom
  if (elemento.id === "B1"){
    elemento.value = listaPerguntas[elemento.id[1]].respostas[alfabeto.indexOf(elemento.id[0])].texto;
  }
}

function resetQuiz(){
  perguntaAtual = 0;
  resultado = listaPerguntas.length;
  tamanhoBarra = 0;

  estrutura.classList.remove("oculto");
  estrutura.classList.remove("sairTela");
  carregando.classList.add("oculto");
  carregando.classList.remove("entrarTela");
  estrutura_resultado.classList.add("oculto");
  estrutura_resultado.classList.remove("escala");

  montaPergunta();
}

function redirecionador(){
  resultado = 1;
  perguntaAtual = 8;
  tamanhoBarra = 100;
  fechaAnuncio();
  montaPergunta();
}

function abreAnuncio(){
  const popup = document.querySelector(".popup_anuncio");
  popup.classList.remove("entrada");
}
function fechaAnuncio(){
  const popup = document.querySelector(".popup_anuncio");
  popup.classList.add("entrada");
}

function mobileCheck(){
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

window.onload = () => {
  init();
};