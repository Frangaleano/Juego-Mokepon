const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("reiniciar")
const subtituloAtaque = document.getElementById("sub-elige")

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


let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataqueMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
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
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}


alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5, "./img/hipodoge.png")

let capipepo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5, "./img/capipepo.png")

let ratigueya = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5, "./img/ratigueya.png")

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: "boton-agua" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🌱', id: "boton-tierra" },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '🌱', id: "boton-tierra" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🔥', id: "boton-fuego" },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '🔥', id: "boton-fuego" },
    { nombre: '💧', id: "boton-agua" },
    { nombre: '🌱', id: "boton-tierra" },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() {

    botonReiniciar.style.display = "none"
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

    unirseAlJuego()
}


function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })

}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = "none"


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

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent == '🌱') {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }

            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                .then(function ({ ataques }) {
                    if(ataques.length === 5) {
                        ataqueEnemigo = ataques
                        iniciarCombate()
                    }
                })
            }
        })
}



function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataqueMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
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

    clearInterval(intervalo)


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

function revisionVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        mensajeFinal("Esto es un empate!")
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal("GANASTE EL COMBATE!")
    } else {
        mensajeFinal("PERDISTE EL COMBATE!")
    }

    contenedorAtaques.style.display = "none"
    subtituloAtaque.style.display = "none"

}

function crearMensaje(resultado) {
    sectionMensajes.innerHTML = resultado
}


function mensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonReiniciar.style.display = "block"

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
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo)
                {
                    let mokeponEnemigo = null
                    if(enemigo.mokepon != undefined)
                    {
                        const mokeponNombre = enemigo.mokepon.nombre 
                        switch (mokeponNombre)
                        {
                        case "Hipodoge":
                            mokeponEnemigo = new Mokepon('Hipodoge', './img/mokepons_mokepon_hipodoge_attack.png', 5, './img/hipodoge.png', enemigo.id)
                                break
                            case "Capipepo":
                                mokeponEnemigo = new Mokepon('Capipepo', './img/mokepons_mokepon_capipepo_attack.png', 5, './img/capipepo.png', enemigo.id)
                                break
                            case "Ratigueya":
                                mokeponEnemigo = new Mokepon('Ratigueya', './img/mokepons_mokepon_ratigueya_attack.png', 5, './img/ratigueya.png', enemigo.id)
                                break
                            default:
                                break
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    }
                    })
                })
        }
    })
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

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
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

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x



    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }


    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision");

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener("load", iniciarJuego)

