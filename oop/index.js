#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class MathTutor {
    questions = [
        { question: 'What is 5 + 3?', answer: 8 },
        { question: 'What is 10 - 6?', answer: 4 },
        { question: 'What is 7 * 2?', answer: 14 },
        { question: 'What is 16 / 4?', answer: 4 }
    ];
    async startTutor() {
        let score = 0;
        for (let q of this.questions) {
            const answer = await inquirer.prompt({
                type: 'input',
                name: 'response',
                message: chalk.yellow(q.question)
            });
            if (parseInt(answer.response) === q.answer) {
                score++;
                console.log(chalk.green('Correct!'));
            }
            else {
                console.log(chalk.red('Incorrect!'));
            }
        }
        console.log(chalk.blue(`Your final score is: ${score}/${this.questions.length}`));
    }
}
const tutor = new MathTutor();
tutor.startTutor();
