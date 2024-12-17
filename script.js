const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const toggle_musica = document.getElementById('alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('/sons/beep.mp3')
const comecarBtn = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 5
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
    alterarContexto('foco')
})

curtoBtn.addEventListener("click", () => {
    alterarContexto('descanso-curto')
})

longoBtn.addEventListener("click", () => {
    alterarContexto('descanso-longo')
})


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        audioFim.volume = 0.3
        audioFim.play()
        alert('Tempo esgotado')
        return
    }
    tempoDecorridoEmSegundos -=1
    console.log('Temporizador: '+ tempoDecorridoEmSegundos)
}

comecarBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intevaloID){
        audioPause.play()
        zerar()
        return
    } else {
        audioPlay.play()
    }
    intevaloID = setInterval(contagemRegressiva, 1000) //valor em ms
}

function zerar(){
    clearInterval(intevaloID)
    intevaloID = null
}