const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const toggle_musica = document.getElementById('alternar-musica')
const comecarBtn = document.querySelector('#start-pause')
const comecarBtnText = document.querySelector('#start-pause span')
const comecarBtnImg = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intevaloID = null

musica.loop = true

toggle_musica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            focoBtn.classList.add('active')
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            curtoBtn.classList.add('active')
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            longoBtn.classList.add('active')
        default:
            break;
    }
}

focoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 5
    alterarContexto('foco')
})

curtoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
})

longoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
})


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioFim.volume = 0.3
        audioFim.play()
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
}

comecarBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intevaloID){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intevaloID = setInterval(contagemRegressiva, 1000) //valor em ms
    comecarBtnText.textContent = 'Pausar'
    comecarBtnImg.src = '/imagens/pause.png'
}

function zerar(){
    clearInterval(intevaloID)
    comecarBtnText.textContent = 'Começar'
    comecarBtnImg.src = '/imagens/play_arrow.png'
    intevaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()