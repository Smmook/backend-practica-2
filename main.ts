import { inicializarDatosJuego, manejarPregunta } from "./game.ts";
import { Game } from "./interfaces.ts";

const game: Game = await inicializarDatosJuego();

for (let i = 0; i < game.numeroPreguntas; i++) {
  game.jugadores.forEach((jugador) => {
    manejarPregunta(jugador, i);
  });
}

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
