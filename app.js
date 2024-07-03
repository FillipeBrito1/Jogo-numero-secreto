let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
//criando a função para mudar e exibir os textos na tela 
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}
//chamando a função e os parâmetros para exibir o que foi pedido na tela
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let plavaraTentativa = tentativas > 1? 'tentativas':'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${plavaraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if(chute > numeroSecreto){
        exibirTextoNaTela('h1', 'Quase lá...');
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}.`);
        }else{
        exibirTextoNaTela('h1', 'Quase lá...');
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}.`);
        }
    tentativas++;
    limparCampo();
    }
}
// função criada para gerar um número aleatório
// gerar um outro número caso o numero ja esteja na lista de números sorteados antes
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumeroSorteados.length;
    if(quantidadeElementosLista == numeroLimite){
        listaNumeroSorteados = [];
    }
    if(listaNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disable', true);
}