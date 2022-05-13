
export const code = `const timeout = (callback, time, ...args) => setTimeout(callback.bind(null, ...args), time);
timeout(eco, 0, 'First');
timeout(newLogger, 0, 'Second', true);
console.log('Third');

function eco (voice) {
  console.log(voice + '...');
}

function newLogger(loggedText, withEco) {
  if (withEco) {
    eco(loggedText)
  }
  console.log(loggedText);
}

newLogger("This is a log", true);
newLogger("This is another log", true);
`