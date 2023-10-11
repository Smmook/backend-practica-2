import { Game, Jugador, Pregunta } from "./interfaces.ts";
import { getPreguntas } from "./fetch.ts";

export const inicializarDatosJuego = async (): Promise<Game> => {
  let nJugadores = prompt("Introduce el numero de jugadores: ");
  let numeroJugadores: number = Number.parseInt(nJugadores as string);
  while (Number.isNaN(numeroJugadores) || numeroJugadores <= 1) {
    nJugadores = prompt("Introduce un valor valido.");
    numeroJugadores = Number.parseInt(nJugadores as string);
  }

  const game: Game = { numeroJugadores, jugadores: [], numeroPreguntas: 0 };

  for (let i = 1; i <= numeroJugadores; i++) {
    let name: string | null = prompt(`Introduce el nombre del jugador ${i}:`);
    while (!name || name.length === 0) {
      name = prompt("El nombre ha de ser valido: ");
    }

    console.log("Elige la dificultad de las preguntas: (easy | medium | hard)");
    let difficulty: string | null = prompt("");
    while (
      difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard"
    ) {
      difficulty = prompt(
        "Introduce un valor valido. (easy | medium | hard)\n",
      );
    }

    game.jugadores.push({
      nombre: name,
      aciertos: 0,
      preguntas: [],
      dificultad: difficulty,
    });
  }

  let numPre = prompt("Introduce el numero de preguntas por jugador: ");
  while (!numPre || numPre.length === 0) {
    numPre = prompt("Introduce un valor valido");
  }
  game.numeroPreguntas = Number.parseInt(numPre);

  await obtenerPreguntas(game);
  return game;
};

const obtenerPreguntas = async (game: Game): Promise<void> => {
  for (const jugador of game.jugadores) {
    jugador.preguntas = await getPreguntas(
      game.numeroPreguntas,
      jugador.dificultad,
    );
  }
};

export const manejarPregunta = (jugador: Jugador, numero: number): void => {
  console.log(`\nTurno de ${jugador.nombre}.`);

  const pregunta: Pregunta = jugador.preguntas[numero];

  console.log(`Categoria: ${pregunta.categoria}`);
  console.log(pregunta.pregunta);

  pregunta.respuestas.forEach((r, i) => console.log(`${i + 1}. ${r}`));

  let res: string | null = prompt("Respuesta: ");
  let nRes: number = Number.parseInt(res as string);

  while (!res || isNaN(nRes) || nRes < 1 || nRes > pregunta.respuestas.length) {
    res = prompt("Introduce un valor valido: ");
    nRes = Number.parseInt(res as string);
  }
  const correcta: number = pregunta.respuestas.indexOf(pregunta.correcta) + 1;

  if (nRes === correcta) {
    console.log("Correcto!");
    jugador.aciertos++;
    return;
  } else console.log("Has fallado!");
};
