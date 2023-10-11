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

export interface Data {
  incorrect_answers: string[];
  correct_answer: string;
  [key: string]: string | string[]; // Hago esto para permitir el resto de propiedades del objeto en el tipo Data sin escribirlas todas
}
