const botonReinicio = document.getElementById("reiniciar")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascotaJugador")

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataqueMokeponEnemigo = []
let botonTierra
let botonFuego
let botonAgua
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./img/mokemap.png"

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10, ) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let hipodoge = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5, "./img/hipodoge.png")

let capipepo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5, "./img/capipepo.png")

let ratigueya = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5, "./img/ratigueya.png")

let hipodogeEnemigo = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5, "./img/hipodoge.png", 80, 120)

let capipepoEnemigo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5, "./img/capipepo.png", 150, 95)

let ratigueyaEnemigo = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5, "./img/ratigueya.png", 200, 190)

hipodoge.ataques.push(
    { nombre: '💧', id: "boton-agua" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🌱', id: "boton-tierra" },
)

capipepo.ataques.push(
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🔥', id: "boton-fuego" },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🌱', id: "boton-tierra" },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    botonReinicio.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>

            <label for=${mokepon.nombre} class="tarjeta-de-mokepones">
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })

    sectionSeleccionarAtaque.style.display = "none"

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)

}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none"

    //sectionSeleccionarAtaque.style.display = "flex"

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Debes seleccionar una mascota")
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    seleccionarMascotaEnemigo()

}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="botones-ataque BAtaques">${ataque.nombre}</button>
            `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonTierra = document.getElementById("boton-tierra")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".BAtaques")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()

        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataqueMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {

    ataqueAleatorio = aleatorio(0, ataqueMokeponEnemigo.length - 1)

    if (ataqueMokeponEnemigo[ataqueAleatorio].textContent === '💧') {
        ataqueEnemigo.push('AGUA')
        console.log(ataqueEnemigo)
    } else if (ataqueMokeponEnemigo[ataqueAleatorio].textContent === '🔥') {
        ataqueEnemigo.push('FUEGO')
        console.log(ataqueEnemigo)
    } else {
        ataqueEnemigo.push('TIERRA')
        console.log(ataqueEnemigo)
    }

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisionVictorias()

}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


function revisionVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        mensajeFinal("Esto es un empate!")
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal("GANASTE EL COMBATE!")
    } else {
        mensajeFinal("PERDISTE EL COMBATE!")
    }

}

function mensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonReinicio.style.display = "block"

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        mascotaJugadorObjeto.mapaFoto,
        mascotaJugadorObjeto.x,
        mascotaJugadorObjeto.y,
        mascotaJugadorObjeto.alto,
        mascotaJugadorObjeto.ancho
    )
}

function moverMascotaDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverMascotaIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverMascotaArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverMascotaAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}


function sePresionaUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverMascotaArriba()
            break
        case "ArrowDown":
            moverMascotaAbajo()
            break
        case "ArrowLeft":
            moverMascotaIzquierda()
            break
        case "ArrowRight":
            moverMascotaDerecha()
            break
        default:
            break
    }
} 

function iniciarMapa() {
    mapa.width = 320
    mapa.height = 240
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionaUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}



window.addEventListener("load", iniciarJuego)

