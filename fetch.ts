import { Data, Pregunta } from "./interfaces.ts";

export enum Category {
  "General Knowledge" = 9,
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
}

// Funcion que convierte el objeto obtenido por la api a mi tipo Pregunta
const toPregunta = (p: Data): Pregunta => {
  const temp: string[] = [p.correct_answer, ...p.incorrect_answers];
  let respuestas: string[];

  if (temp.length === 2) {
    respuestas = ["True", "False"];
  } else {
    respuestas = temp.map(
      (answ) => {
        return {
          answ,
          sort: Math.random(),
        };
      },
    ).sort((a, b) => a.sort - b.sort).map(({ answ }) => answ);
  }

  return {
    pregunta: p.question,
    respuestas,
    correcta: p.correct_answer,
    categoria: p.category,
  } as Pregunta;
};

// Funcion encargada de hacer el fetch que devuelve el array de preguntas
export const getPreguntas = async (
  cantidad: number,
  difficulty: "easy" | "medium" | "hard",
  categoria?: Category,
): Promise<Pregunta[]> => {
  if (cantidad < 23) return getDistintas(cantidad, difficulty);

  const baseUrl = "https://opentdb.com/api.php";

  try {
    const res = await fetch(
      `${baseUrl}?amount=${cantidad}&difficulty=${difficulty}${
        categoria ? `&category=${categoria}` : ""
      }`,
    );
    const data = await res.json();

    return data.results.map((p: Data) => toPregunta(p));
  } catch (_e) {
    throw new Error("Error en el fetch");
  }
};

// No se pueden obtener distintas categorias de forma directa de la api, por lo que
// pido el maximo de preguntas y voy escogiendo las de distina categoria.
// Pido el maximo para tratar de minimizar las llamadas a la api.
const getDistintas = async (
  cantidad: number,
  difficulty: "easy" | "medium" | "hard",
): Promise<Pregunta[]> => {
  const preguntas: Pregunta[] = [];
  const baseUrl = "https://opentdb.com/api.php";
  const url = `${baseUrl}?amount=20&difficulty=${difficulty}`;

  try {
    do {
      const res = await fetch(url);
      const data = await res.json();

      data.results.forEach((p: Data) => {
        if (
          !preguntas.some((pregunta: Pregunta) =>
            pregunta.categoria === p.category
          )
        ) {
          preguntas.push(toPregunta(p));
        }
      });
    } while (preguntas.length < cantidad);
  } catch (_e) {
    throw new Error("Error en el fetch");
  }

  return preguntas;
};
