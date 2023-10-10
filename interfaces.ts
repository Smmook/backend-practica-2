export interface Pregunta {
  pregunta: string;
  respuestas: string[];
  correcta: string;
  categoria: string;
}

export interface Jugador {
  nombre: string;
  aciertos: number;
  preguntas: Pregunta[];
  dificultad: "easy" | "medium" | "hard";
}

export interface Game {
  numeroJugadores: number;
  numeroPreguntas: number;
  jugadores: Jugador[];
}
