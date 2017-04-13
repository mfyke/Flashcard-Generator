var inquirer = require("inquirer");
var basicCard = require("./basicCard");
var clozeCard = require("./clozeCard");

start();
function start () {
	inquirer.prompt([
		{
			name: "type",
			message: "Would you like to use basic or cloze cards?"
		}

		]).then(function(answers) {
			if(answers.type=="basic") {
				var basic = new basicCard();
				basic.create();
			}
			else if(answers.type=="cloze") {
				var cloze = new clozeCard();
				cloze.create();
			}
			else {
				console.log('Command not recognized!');
				start();
			}

		});
}