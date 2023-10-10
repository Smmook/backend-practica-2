interface question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const url: string =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";

fetch(url).then((res) => res.json()).then((data) => {
  data.results.forEach((q) => {
    console.log(q.question);
    // const respuesta = prompt("Respuesta: ");
    const respuestas = [q.correct_answer, ...q.incorrect_answers].map((val) => {
      return {
        val,
        sort: Math.random(),
      };
    }).sort((a, b) => a.sort - b.sort).map(({ val }) => val);
    console.log(respuestas);

    console.log(
      prompt("Respuesta: ") === q.correct_answer
        ? "Correcto!"
        : "Eres gilipollas.",
    );
  });
});
