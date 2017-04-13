var inquirer = require("inquirer");
var counter = 0;
var quizCounter = 0;
var correctAnswers = 0;
var cards = [];
var questions;
var basicCard = function () {
	
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

	function BasicCard(front, back) {
    this.front = front;
    this.back = back;
	}	
		if (counter<total) {
			inquirer.prompt([
			{
				name: "front",
				message: "What is the question?"
			},
			{
				name: "back",
				message: "What is the answer?"
			}

			]).then(function(answers) {
					var question = new BasicCard(answers.front, answers.back);
					cards.push(question);
					counter++;
					createFC(total);
				
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
			message: cards[quizCounter].front
		}	
		]).then(function(answers){
			if (answers.question==cards[quizCounter].back){
				console.log("correct! : " + cards[quizCounter].back);
				correctAnswers++;
				quizCounter++;
				quiz();
			}
			else {
				console.log("incorrect! : " + cards[quizCounter].back);
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
module.exports = basicCard;