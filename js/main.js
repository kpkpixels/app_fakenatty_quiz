const listaPerguntas = [
  new Questao("_________ é a fonte da juventude e a coisa ________ a fazer. Quais palavras, em ordem, completam a frase?",
    [
      new Resposta("Natural, certa", "rodrigo_muito_asteric", "rodrigo_afirmacao.gif"),
      new Resposta("O suco, certa", "rodrigo_suco_e_tudo", "rodrigo_negacao.gif"),
      new Resposta("Natural, errada", "rodrigo_pouco_asteric", "rodrigo_negacao1.gif")
    ], 0),
  new Questao("Quanto você aguenta na rosca?",
    [
      new Resposta("10kg.", "rodrigo_espero_mrolimpia", "rodrigo_afirmacao.gif"),
      new Resposta("40kg.", "rodrigo_is_that_flag", "rodrigo_negacao.gif"),
      new Resposta("Mais que tu!", "rodrigo_muito_idiota", "rodrigo_negacao1.gif")
    ], 0),
  new Questao("Quem você pensa que é?",
    [
      new Resposta("Chris Bumstead, Sibam.", "rodrigo_chris_acho_que_nao", "rodrigo_negacao1.gif"),
      new Resposta("Pessoa comum, natural.", "rodrigo_juntos_asteric", "rodrigo_afirmacao.gif"),
      new Resposta("Pessoa comum, hormonizada.", "rodrigo_mamando_suco", "rodrigo_negacao.gif")
    ], 1),
  new Questao("Qual a frase dita por Rodrigo Góes ao finalizar seus vídeos?",
    [
      new Resposta("Rodrigo Góes Out!", "rodrigo_goes_out", "rodrigo_afirmacao.gif"),
      new Resposta("Tmj família!", "rodrigo_jesus", "rodrigo_negacao1.gif"),
      new Resposta("Um beijo na bunda e até segunda!", "rodrigo_como_burro", "rodrigo_negacao.gif")
    ], 0),
  new Questao("Você aplica no bumbum quando ninguém está olhando?",
    [
      new Resposta("Eu que não.", "rodrigo_nao_usem_drogas", "rodrigo_negacao1.gif"),
      new Resposta("Não entendi.", "rodrigo_maravilhoso", "rodrigo_afirmacao.gif")
    ], 1),
  new Questao("O ______ vicia, o shape vicia. Qual palavra completa a frase?",
    [
      new Resposta("Baseball Bat", "rodrigo_alguem_gosta_baseballbat", "rodrigo_negacao.gif"),
      new Resposta("Suco", "rodrigo_stay_natty_kids", "rodrigo_afirmacao.gif"),
      new Resposta("Chris Bumstead, Sibam", "rodrigo_chris_bumstead", "rodrigo_negacao1.gif")
    ], 1),
  new Questao("O que mais se encaixa com você?",
    [
      new Resposta("Natural, boa alimentação", "rodrigo_voce_vai_vencer", "rodrigo_afirmacao.gif"),
      new Resposta("17 anos, natural, vegano e alérgico a água.", "rodrigo_realmente_verdade", "rodrigo_negacao.gif"),
      new Resposta("Abençoado pelo suco, vivo do suco, suco is my life.", "rodrigo_jesus_kid", "rodrigo_negacao1.gif")
    ], 0),
  new Questao("Pergunta decisiva, seja sincero. Natty or Not? (Natural ou não?)",
    [
      new Resposta("Sim, sou natural!", "meu_veredito_fake", "rodrigo_afirmacao.gif"),
      new Resposta("Sim, sou mais natural que uma árvore de laranjas.", "meu_veredito_fake", "rodrigo_negacao.gif"),
      new Resposta("Não me questione, se eu disse que sou natural, é porque eu sou!", "meu_veredito_fake", "rodrigo_negacao1.gif")
    ], 0)
];

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const estrutura_inicio = document.querySelector(".estrutura_inicio");
const estrutura = document.querySelector(".estrutura");
const imagem_rodrigo = estrutura.querySelector(".imagem_rodrigo");
const video_rodrigo = estrutura.querySelector(".video_rodrigo");
const container_questao = estrutura.querySelector(".container_questao");

const barra_status_respostas = document.querySelector(".barra_status_respostas");
const barra_loading_resultado = document.querySelector(".barra_loading_resultado");
const carregando = document.querySelector(".carregando");
const redes_sociais = document.querySelector(".redes_sociais");

const estrutura_resultado = document.querySelector(".estrutura_resultado");

let perguntaAtual = 0;
let resultado = listaPerguntas.length;
let tamanhoBarra = 0;
let videoTimeout;

const caminhoVideo = "files/videos/";
const caminhoImg = "files/imgs/"

function init(){  
  console.warn("%cWOOOOW LOOK AT HIM!! Are you trying to cheat??!", 'color: green; background: yellow; font-size: 30px');

  setTimeout(() => {
    estrutura_inicio.classList.add("showTelaInicio");    
  }, 200);
  
  //avaliaResultado();
 
}

function comecar(){
  //carregando.classList.add("oculto");
  carregando.classList.add("entrada");

  let video = estrutura_inicio.querySelector("video");
  let botao = estrutura_inicio.querySelector("input");
  video.classList.remove("oculto");
  botao.classList.add("oculto");
  
  video.play();
  
  video.addEventListener("ended", function() {
    estrutura.classList.remove("oculto");
    estrutura_inicio.classList.add("oculto");
    setTimeout(() => {
      estrutura.classList.add("entrarTela");
    }, 100);
  });
  
  montaPergunta(); 
}
function playVideo(elemento){
  let video = estrutura_inicio.querySelector("video");
  video.play();

  elemento.onmouseover = "";
}
function montaPergunta(){
  barra_status_respostas.style.width = tamanhoBarra + "%";
  tamanhoBarra += (100 / listaPerguntas.length);

  redes_sociais.classList.add("oculto");
  
  if (perguntaAtual < listaPerguntas.length){
    let respostas = "";
    imagem_rodrigo.innerHTML='<img class="padrao selecionada" src="files/imgs/rodrigo_padrao.gif" alt="">';
    
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
  
  if (perguntaAtual < listaPerguntas.length){
    emiteReacaoRodrigo(indiceRes);    
  }
  else{
    video_rodrigo.classList.add("oculto");
    imagem_rodrigo.classList.remove("oculto");      
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

  redes_sociais.classList.remove("oculto");

  setTimeout(() => {
    estrutura_resultado.classList.add("escala");
  }, 100);

  let reacaoResultadoVideoMP4;
  let reacaoResultadoVideoWEBM;
  let carimboResultadoVideo;
  let tempoTimeoutResultado = 2000;

  if (resultado > 5){
    reacaoResultadoVideoMP4 = caminhoVideo + "mp4/" + "meu_veredito_natural_longo.mp4";
    reacaoResultadoVideoWEBM = caminhoVideo + "webm/" + "meu_veredito_natural_longo.webm";
    carimboResultadoVideo = caminhoImg + "natty.png"
    tempoTimeoutResultado = 4000;
  }
  else if (resultado == 5){
    reacaoResultadoVideoMP4 = caminhoVideo + "mp4/" +  "meu_veredito_half.mp4";
    reacaoResultadoVideoWEBM = caminhoVideo + "webm/" + "meu_veredito_half.webm";
    carimboResultadoVideo = caminhoImg + "halfnatty.png"
    tempoTimeoutResultado = 1500;
  }
  else{
    reacaoResultadoVideoMP4 = caminhoVideo + "mp4/" +  "meu_veredito_fake.mp4";
    reacaoResultadoVideoWEBM = caminhoVideo + "webm/" + "meu_veredito_fake.webm";
    carimboResultadoVideo = caminhoImg + "fakenatty.png"
    tempoTimeoutResultado = 3500;
  }

  estrutura_resultado.innerHTML = '<div style="height: 100%;display: flex;justify-content: center;align-items: center;">'+
  '<img class="imagem_resultado" src="'+carimboResultadoVideo+'" alt="">'+
  '<video playsinline autoplay>'+
  '<source src="'+reacaoResultadoVideoWEBM+'" type="video/webm">'+
  '<source src="'+reacaoResultadoVideoMP4+'" type="video/mp4">'+
  +'</video>'+
  '</div>'+
  '<input type="button" value="Refazer Quiz" onclick="resetQuiz()" style="margin-top: 15px">';

  estrutura_resultado.querySelector("video").load(); //as vezes nao reproduz sozinho

  setTimeout(() => {
    let ima = estrutura_resultado.querySelector(".imagem_resultado");
    ima.style.opacity = "1";
  }, tempoTimeoutResultado);

}

function emiteReacaoRodrigo(indiceRes){
  imagem_rodrigo.classList.add("oculto");
  video_rodrigo.classList.remove("oculto");

  const videoWEBM = caminhoVideo+'webm/'+listaPerguntas[perguntaAtual-1].respostas[indiceRes].videoReacaoClick + '.webm';  
  const videoMP4 = caminhoVideo+'mp4/'+listaPerguntas[perguntaAtual-1].respostas[indiceRes].videoReacaoClick + '.mp4';  

  let video = video_rodrigo.querySelector("video");
  video.innerHTML = '<source src="'+videoWEBM+'" type="video/webm">'+
  '<source src="'+videoMP4+'" type="video/mp4">';

  video.load();

  setTimeout(() => {    
    video.addEventListener("ended", function() {
      video_rodrigo.classList.add("oculto");
      imagem_rodrigo.classList.remove("oculto");
    });
    
  }, 1000);

  
}

function emiteReacaoHover(indicePergunta, indiceResposta, elemento){
  const caminhoImgResposta = listaPerguntas[indicePergunta].respostas[indiceResposta].imgReacaoHover;
  const imgId = "#img" + elemento.id

  imagem_rodrigo.querySelector(".selecionada").classList.remove("selecionada");
  imagem_rodrigo.querySelector(imgId).classList.add("selecionada");

  const elementoPergunta = elemento.offsetParent.children[0].childNodes[0];

  //gambiarra alternativa custom
  if (elemento.id === "B1"){
    elemento.value = "40cm";    
  }
  if (elemento.id === "A1"){
    elementoPergunta.innerHTML = indicePergunta+1+". Quanto você aguenta na rosca direta?";
  }
}

function resetReacaoHover(elemento){
  imagem_rodrigo.querySelector(".selecionada").classList.remove("selecionada");
  imagem_rodrigo.querySelector(".padrao").classList.add("selecionada");

  const elementoPergunta = elemento.offsetParent.children[0].childNodes[0];

  //gambiarra alternativa custom
  if (elemento.id === "B1"){
    elemento.value = listaPerguntas[elemento.id[1]].respostas[alfabeto.indexOf(elemento.id[0])].texto;
  }
  if (elemento.id === "A1"){
    elementoPergunta.innerHTML = Number(elemento.id[1]) + 1 +". "+ listaPerguntas[elemento.id[1]].texto;
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
  redes_sociais.classList.add("oculto");
  video_rodrigo.classList.add("oculto");
  imagem_rodrigo.classList.remove("oculto");      

  setTimeout(() => {    
    estrutura.classList.add("entrarTela");
  }, 100);

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