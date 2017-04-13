var inquirer = require("inquirer");
var counter = 0;
var quizCounter = 0;
var correctAnswers = 0;
var cards = [];
var questions;
var clozeCard = function () {
	
	this.create = function(){
		inquirer.prompt([
		{
			name: "totalCards",
			message: "How many flashcards would you like to create?",
			validate: function(value) {
    			if (isNaN(value) === false && parseInt(value) > 0) {
        			return true;
    			}
    				return false;
				}
		}

		]).then(function(answers) {
			createFC(answers.totalCards);
		});

	}

}

function createFC (total) {
	console.log(total);
	questions=total;

	function ClozeCard(text, cloze) {
    this.fullText = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, "...");
	}	
		if (counter<total) {
			inquirer.prompt([
			{
				name: "fullText",
				message: "What is the full text?"
			},
			{
				name: "cloze",
				message: "What is the missing word?"
			}

			]).then(function(answers) {
				if(answers.fullText.indexOf(answers.cloze)!=-1){
					var question = new ClozeCard(answers.fullText, answers.cloze);
					cards.push(question);
					counter++;
					createFC(total);
				}
				else{
					console.log("error, the missing word does not exist in the full text!");
				}
			});

			}
		else {

			quiz();

		}

	}

function quiz () {
	if(quizCounter<questions) {
		inquirer.prompt([
		{
			name: "question",
			message: cards[quizCounter].partial
		}	
		]).then(function(answers){
			if (answers.question==cards[quizCounter].cloze){
				console.log("correct! : " + cards[quizCounter].fullText);
				correctAnswers++;
				quizCounter++;
				quiz();
			}
			else {
				console.log("incorrect! : " + cards[quizCounter].fullText);
				quizCounter++;
				quiz();
			}
		});
	}
	else {
		console.log("Quiz over! You got " + correctAnswers + " answers correct!");
		inquirer.prompt([
		{
			name: "playAgain",
			message: "Play Again? (y/n)"
		}	
		]).then(function(answers){
			if (answers.playAgain=="y") {
				quizCounter=0;
				correctAnswers=0;
				quiz();
			}
			else{
				console.log("Thanks for playing!");
			}

		});
	}

}


module.exports = clozeCard;
