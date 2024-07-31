const inquirer = require('inquirer');
const colors = require('colors')
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');


// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: colors.green('Please provide a project title.  (Required)'),
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(colors.red('Please provide a project title!'));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: colors.green('Please enter your GitHub username. (Required)'),
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log(colors.red('Please enter your GitHub username!'));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: colors.green('Please enter the name of your repo. (Required)'),
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log(colors.red('Please enter the name of your repo!'))
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: colors.green('Provide a description of your application. (Required)'),
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log(colors.red('Please enter a description!'));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: colors.green('Please provide information for using your application. (Required)'),
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log(colors.red('Please provide information for using your application!'));
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: colors.blue('Any additional sections you would like to include in your README?'),
        choices: [
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Contribution Guidlines',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Contact',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please list any requirements for installation of your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log(colors.red('Please enter installation instructions!'));
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log(colors.red('Please provide license information!'));
                return false;
            }
        }
    }, 
    {
        type: 'input',
        name: 'contribution',
        message: 'Please enter your guidelines for contributing.',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log(colors.red('Please enter guidelines for contributing!'));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter test information for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log(colors.red('What packages are required to run tests for your application?'));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contact',
        message: 'Please provide an email address for others to reach you with questions.',
        when: ({ contents }) => {
            if (contents.indexOf('Contact') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: contactInput => {
            if (contactInput) {
                return true;
            } else {
                console.log(colors.red('Please provide an email address!'));
                return false;
            }
        }
    }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log(colors.rainbow('README created!'))
    });
};
// function to initialize program
function init() {
    return inquirer.prompt(questions);
};
// function call to initialize program
init()
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });