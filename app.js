const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let mainArr = [];
let emptyId= [];

const employeeQuestions = [{
    type: "input",
    name: "managerName",
    message: "What is your manager's name?"
},
{
    type: "input",
    name: "managerId",
    message: "What is your manager's ID?"
},
{
    type: "input",
    name: "managerEmail",
    message: "What is your managers email?"
},
{
    type: "input",
    name: "officeNumber",
    message: "What is your managers office number?"
}
];

function manager() {
    console.log("Lets build your team");
    inquirer.prompt(employeeQuestions).then(function(data) {
        const manager = new Manager (data.managerName, data.managerId, data.managerEmial, data.officeNumber);
        mainArr.push(manager);
        emptyId.push(data.managerId);
        team();
    });
};

function team() {
    inquirer.prompt([{
        type: "list",
        name: "teamMemberChoice",
        message: "Which team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add another team member"
        ]

    }
]).then(function(data) {
    if (data.teamMemberChoice == "Engineer") {
        engineer();

    } else if (data.teamMemberChoice === "Intern") {
        intern();
    } else (outputTeam());
})
};

function engineer() {
    inquirer.prompt([{
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's ID?"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email?"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's Github link?"
    },
]).then(function(data) {
    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.enginnerGithub);
    mainArr.push(engineer);
    emptyId.push(data.engineerId);
    team();
});
};

function intern() {
    inquirer.prompt([{
        type: "input",
        name: "internName",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "internId",
        message: "What is the intern's ID?"
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is the interns's email?"
    },
    {
        type: "input",
        name: "internSchool",
        message: "What school did the intern go to?"
    },
]).then(function(data) {
    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
    mainArr.push(intern);
    emptyId.push(data.internId);
    team();
});
};

function outputTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(mainArr), "utf-8");
}


manager();