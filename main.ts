interface Pregunta {
  pregunta: string;
  respuestas: string[];
  correcta: string;
}

interface Jugador {
  numero: number;
  nombre: string;
  aciertos: number;
  preguntas: Pregunta[];
}

interface Game {
  numeroJugadores: number;
  numeroPreguntas: number;
  jugadores: Jugador[];
}

const baseUrl = "https://opentdb.com/api.php?";

const obtenerDatos = (): Game => {
  let nJugadores = prompt("Introduce el numero de jugadores: ");
  while (nJugadores?.length === 0 || nJugadores === null) {
    nJugadores = prompt("Introduce un valor valido.");
  }

  const numeroJugadores: number = Number.parseInt(nJugadores);

  const game: Game = { numeroJugadores, jugadores: [], numeroPreguntas: 0 };

  for (let i = 1; i <= numeroJugadores; i++) {
    let name: string | null = prompt(`Introduce el nombre del jugador ${i}:`);
    while (!name || name.length === 0) {
      name = prompt("El nombre ha de ser valido: ");
    }
    game.jugadores.push({
      numero: i,
      nombre: name,
      aciertos: 0,
      preguntas: [],
    });
  }

  let numPre = prompt("Introduce el numero de preguntas por jugador: ");
  while (!numPre || numPre.length === 0) {
    numPre = prompt("Introduce un valor valido");
  }
  game.numeroPreguntas = Number.parseInt(numPre);
  return game;
};

const imprimirPregunta = (pregunta: Pregunta, jugador: string): void => {
  console.log(`\nPregunta para ${jugador}.`);
  console.log(pregunta.pregunta);
  pregunta.respuestas.forEach((ans, i) => {
    console.log(`${i}. ${ans}`);
  });
};

const jugar = (game: Game): void => {
  for (let i = 0; i < game.numeroPreguntas; i++) {
    game.jugadores.forEach((jugador) => {
      imprimirPregunta(jugador.preguntas[i], jugador.nombre);
    });
  }
};

const inicializarJuego = (): void => {
  const game: Game = obtenerDatos();

  const url = `${baseUrl}amount=${game.numeroPreguntas * game.numeroJugadores}`;

  fetch(url).then((res) => res.json()).then((data) => {
    const preguntas: any[] = data.results;
    for (let i = 0; i < game.numeroJugadores; i++) {
      game.jugadores[i].preguntas = preguntas.slice(
        game.numeroPreguntas * i,
        game.numeroPreguntas * (i + 1) - 1,
      ).map((q) => {
        const respuestas: string[] = [q.correct_answer, ...q.incorrect_answers]
          .map((e) => {
            return { e, sort: Math.random() };
          }).sort((a, b) => a.sort - b.sort).map((e) => e.e);
        return {
          pregunta: q.question,
          respuestas,
          correcta: q.correct_answer,
        };
      });
    }

    jugar(game);
  }).catch((e) => {
    throw new Error("Error al obtener las preguntas. Error: " + e);
  });
};

inicializarJuego();
