#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import {pastel} from "gradient-string";
import chalkAnimation from 'chalk-animation';
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";

let playerName;

const sleep = (ms = 4000) => new Promise((r)=>setTimeout(r,ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.karaoke('Who wants to be a JavaScript expert?');

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        Suppose i am a process in your computer.
        if you get any question wrong i will be ${chalk.bgRed('killed')}
        so get all questions right!
        `);
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name?',
        default(){
            return 'Player';
        }
    });

    playerName = answers.player_name;
}


async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'rawlist',
        message: '\nJavaScript was developed by ________ in May 1995?',
        choices: [
            'Lars Bak and Kasper Lund',
            'Bjarne Stroustrup',
            'Brendan Eich',
            'James Gosling'
        ]
    });

    return handleAnswer(answers.question_1 == 'Brendan Eich');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'rawlist',
        message: '\nWhich method is used to convert a JavaScript object into a JSON string?',
        choices: [
            'JSON.parse()',
            'JSON.stringify()',
            'Object.toString()',
            'JSON.encode()'
        ]
    });

    return handleAnswer(answers.question_2 == 'JSON.stringify()');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'rawlist',
        message: '\nWhat is the output of `typeof null` in JavaScript?',
        choices: [
            'null',
            'undefined',
            'object',
            'string'
        ]
    });

    return handleAnswer(answers.question_3 == 'object');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'rawlist',
        message: '\nWhich character is used to enclose a string literal in JavaScript?',
        choices: [
            'Quotation marks (" or \')',
            'Angle brackets (< >)',
            'Parentheses (( ))',
            'Square brackets ([ ])'
        ]
    });

    return handleAnswer(answers.question_4 == 'Quotation marks (" or \')');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect){
        spinner.success({text: `Nice work ${playerName}. That's a correct answer`});
    }else{
        spinner.error({text: `Game over, you lose ${playerName}!💀💀💀`});
        process.exit(1);
    }
}

function winner(){
    console.clear();
    const msg = `Congrats, ${playerName}! \n Ap jeetay hain 7 Crore💀`;

    figlet(msg, (err, data) => {
        console.log(pastel.multiline(data));     
    });
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();