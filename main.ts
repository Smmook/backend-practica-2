import { inicializarDatosJuego, manejarPregunta } from "./game.ts";
import { Game } from "./interfaces.ts";

// Inicializamos el juego
const game: Game = await inicializarDatosJuego();

// Hacemos las preguntas
for (let i = 0; i < game.numeroPreguntas; i++) {
  game.jugadores.forEach((jugador) => {
    manejarPregunta(jugador, i);
  });
}

// Calculamos el/los ganadores
const maxAciertos: number = game.jugadores.reduce(
  (acc, curr) => curr.aciertos > acc ? curr.aciertos : acc,
  0,
);

const ganadores: string[] = game.jugadores.filter((jugador) =>
  jugador.aciertos === maxAciertos
).map((jugador) => jugador.nombre);

if (ganadores.length === 1) {
  console.log(`El ganador es ${ganadores[0]} con ${maxAciertos} puntos!!!`);
} else {
  console.log(`Los ganadores empatando a ${maxAciertos} puntos son:`);
  ganadores.forEach((g) => console.log(g));
}
