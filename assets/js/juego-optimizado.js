// Modulo patron (funcion autoinvocada)
const miModulo = (() => {
    'use strict'
        /**
     * 2C = Two of Clubs   (Treboles)
     * 2D = Two of Diamons (Diamantes)
     * 2H = Two of Hearts  (Corazones)
     * 2S = Two of Spades  (Espadas)
     */

    let   deck            = [],
          puntosJugadores = [];

    const tipos           = ['C', 'D', 'H', 'S'],
          especiales      = ['A', 'J', 'Q', 'K'];

    //Referencias HTML
    const btnPedir         = document.querySelector('#btnPedir'),
          btnDetener       = document.querySelector('#btnDetener'),
          btnNuevo         = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');

    // Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0); // Se agrega el puntaje de los jugadores en el arreglo (cero)
        }
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        //Habilitamos los botones Pedir y Detener
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

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
        return _.shuffle( deck );
    }


    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if ( deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop();
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

    // Funcion que acumula puntos (0 es el primer jugador y el ultimo será la computadora)
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta);   
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout ( () => {

            if ( puntosMinimos > 21 ) {
                alert('Computadora gana!')
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador gana!')
            } else if ( puntosMinimos == puntosComputadora ) {
                alert ('Nadie gana!')
            } else if ( puntosMinimos > puntosComputadora ) {
                alert('Jugador gana!')
            } else {
                alert('Computadora gana!')
            }

        }, 200 );
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1 );

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }


    //Evento para pedir carta
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);
    })

    // Evento para boton NUEVO JUEGO
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    // Para declarar las funciones que seran accesible, se declara un return que devuelve un object
    return {
        nuevoJuego: inicializarJuego
    }

}) ();



