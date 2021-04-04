const child_process = require('child_process');

// commands list
const commands = [
  {
    name: 'redis',
    command: 'brew services start redis',
  },
  {
    name: 'sub',
    command: 'cd ./subscriber && npm start',
  },
  {
    name: 'pub',
    command: 'cd ./publisher && npm start',
  },
];

// run command
function runCommand(command, name, callback) {
  child_process.exec(command, function (error, stdout, stderr) {
    if (stderr) {
      callback(stderr, null);
    } else {
      callback(null, `Successfully executed ${name} ...`);
    }
  });
}

// main calling function
function main() {
  commands.forEach((element) => {
    runCommand(element.command, element.name, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });
  });
}

// call main
main();
