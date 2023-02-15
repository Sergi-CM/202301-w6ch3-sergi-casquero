import chalk from "chalk";
import inquirer from "inquirer";
import { Command } from "commander";

let playerName;

const welcome = async (): Promise<void> => {
  console.log(`
    ${chalk.blue("WELCOME TO THE ISDI QUIZ!")}`);

  console.log(`
    ${chalk.blue("HOW TO PLAY")}
    I am a virtual life inside your computer.
    If you get any answer wrong I will ${chalk.red("DIE")}.
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

await askName();
