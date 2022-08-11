/**
 * 2C = Two of Clubs   (Treboles)
 * 2D = Two of Diamons (Diamantes)
 * 2H = Two of Hearts  (Corazones)
 * 2S = Two of Spades  (Espadas)
 */

let   deck            = [];
const tipos           = ['C', 'D', 'H', 'S'];
const especiales      = ['A', 'J', 'Q', 'K'];
let puntosJugador     = 0,
    puntosComputadora = 0;

//Referencias HTML
const btnPedir         = document.querySelector('#btnPedir')
const btnDetener       = document.querySelector('#btnDetener')
const btnNuevo         = document.querySelector('#btnNuevo')
const puntosHTML       = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const crearDeck = () => {
    deck =[];
    for (let i = 2; i <= 10; i++) {
        // deck.push (i + 'C' );

        for (let tipo of tipos) {
            deck.push ( i + tipo);
        }
    }

    for (let tipo of tipos) {

        for (let esp of especiales) {
            deck.push ( esp + tipo);
        }

    }

    //Barajea las cartas
    deck = _.shuffle( deck );
    console.log ( deck )
    return deck;
    
}


//Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0) {
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop();
    return carta;
}



const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return   (!isNaN(valor)) ? parseInt(valor) : 
             (valor === 'A') ? 11 : 10;
    
    //Otra solucion simplificada es:
    return ( isNaN( valor ) ) ?
           ( valor === 'A' )  ? 11 : 10  //Si se cumple el isNaN(valor), es decir no es numero, esta linea es la primera ejecucion de la operacion ternaria
           : parseInt( valor )
    
    //La solucion larga podría ser:
    if ( isNaN(valor)) {
        
        puntos = (valor === 'A') ? 11 : 10;

    } else {
        console.log ('Es un numero')
        //Como el campo 'valor' es un string, para transformarlo, lo multiplicamos por 1 para convertirlo en numerico
        //Si es string, en la consola de navegador lo imprime en color blanco, si es numerico lo imprime en morado
        puntos = valor * 1;
        puntos = parseInt(puntos) //Otra forma de convertirlo a numerico
    }
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta =pedirCarta();
        puntosComputadora += valorCarta(carta);   
        puntosHTML[1].innerText = puntosComputadora;

        //Insertamos una carta cada que se pide carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21 ) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout ( () => {

        if ( puntosJugador > 21 ) {
            alert('Computadora gana!')
        } else if ( puntosComputadora > 21 ) {
            alert('Jugador gana!')
        } else if ( puntosJugador == puntosComputadora ) {
            alert ('Nadie gana!')
        } else if ( puntosJugador > puntosComputadora ) {
            alert('Jugador gana!')
        } else {
            alert('Computadora gana!')
        }

        // if ( puntosComputadora === puntosMinimos ) {
        //     alert ('Nadie gana!');
        // } else if (  puntosMinimos > 21 ) {
        //     alert ('Computadora gana!');
        // } else if ( puntosComputadora > 21 ) {
        //     alert ('Jugador gana!')
        // }

    }, 200 );
}


//Crea las cartas y las barajea
crearDeck();

//Evento para pedir carta
btnPedir.addEventListener('click', () => {
    const carta =pedirCarta();
    puntosJugador += valorCarta(carta);   
    puntosHTML[0].innerText = puntosJugador;

    //Insertamos una carta cada que se pide carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21 ) { 
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador )
    } else if ( puntosJugador == 21 ) {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador )
    }
})

// Evento para boton DETENER
btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

// Evento para boton NUEVO JUEGO
btnNuevo.addEventListener('click', () => {
    // Barajeamos las cartas
    deck = crearDeck();

    //Reiniciamos los puntajes del programa y del HTML
    puntosComputadora = 0
    puntosJugador     = 0
    puntosHTML.forEach( elem => elem.innerText = 0);

    //Habilitamos los botones Pedir y Detener
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
    
    // Eliminamos los divs que contienen las cartas
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';

})

