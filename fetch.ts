import { Pregunta } from "./interfaces.ts";

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

export const getPreguntas = async (
  cantidad: number,
  difficulty: "easy" | "medium" | "hard",
  categoria?: Category,
): Promise<Pregunta[]> => {
  const baseUrl = "https://opentdb.com/api.php";

  try {
    const res = await fetch(
      `${baseUrl}?amount=${cantidad}&difficulty=${difficulty}${
        categoria ? `&category=${categoria}` : ""
      }`,
    );
    const data = await res.json();

    return data.results.map(
      (
        p: {
          incorrect_answers: string[];
          correct_answer: string;
          [key: string]: string | string[];
        },
      ) => {
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
        };
      },
    );
  } catch (_e) {
    throw new Error("Error en el fetch");
  }
};
