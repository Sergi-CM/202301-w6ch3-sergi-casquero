import chalk from "chalk";
import inquirer from "inquirer";
import { Command } from "commander";
import { createSpinner } from "nanospinner";

let playerName: string;

const timeOut = (milliseconds = 2000) =>
  new Promise((action) => setTimeout(action, milliseconds));

const welcome = async (): Promise<void> => {
  console.log(`
    ${chalk.blue("WELCOME TO THE ISDI QUIZ!")}`);

  console.log(`
    ${chalk.blue("HOW TO PLAY")}
    You will have to answer 3 questions.
    If you get any answer wrong you will ${chalk.red("DIE")}.
    So you better answer all questions correctly!
  `);
};

await welcome();

const askName = async (): Promise<void> => {
  const answers = await inquirer.prompt({
    name: "player-name",
    type: "input",
    message: "What's your name, human?",
    default() {
      return "Human Player";
    },
  });

  playerName = answers["player-name"];
};

const question1 = async (): Promise<void> => {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "How many days have passed since the first day of this bootcamp?",
    choices: ["35", "37", "39", "41"],
  });

  return handleAnswer(answers.question1 === "39");
};

const question2 = async (): Promise<void> => {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "What does 'b' point to?: a=5, b=a, a=7",
    choices: ["5", "7", "a", "undefined"],
  });

  return handleAnswer(answers.question2 === "5");
};

const question3 = async (): Promise<void> => {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message: "What's the return of this expression?: !danAbramov",
    choices: ["Andrew Smith", "Ander Clark", "Andrew Clark", "Clark Andrews"],
  });

  return handleAnswer(answers.question3 === "Andrew Clark");
};

const handleAnswer = async (isCorrect: boolean) => {
  const spinner = createSpinner("Checking answer...").start();
  await timeOut();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}.` });
  } else {
    spinner.error({ text: `💀 Game over! 💀` });
    process.exit(1);
  }
};

function winner() {
  console.clear();
  console.log(`Congrats , ${playerName}!`);
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
winner();
