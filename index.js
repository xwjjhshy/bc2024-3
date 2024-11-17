const { program } = require('commander');
const fs = require('fs');

// Функція для запису результату в файл
function writeOutput(output, result) {
  fs.writeFile(output, result, (err) => {
    if (err) {
      console.error('Error writing to output file:', err);
      process.exit(1);
    }
    console.log('Output written to', output);
  });
}

program
  .option('-i, --input <file>', 'input file') // параметр input
  .option('-o, --output <file>', 'output file') // параметр output
  .option('-d, --display', 'display result in console') // параметр для виведення в консоль
  .parse(process.argv);

const options = program.opts();

// Перевірка наявності обовʼязкового параметра input
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Перевірка, чи існує файл для зчитування
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання файлу
fs.readFile(options.input, 'utf-8', (err, result) => {
  if (err) {
    console.error('Error reading input file:', err);
    process.exit(1);
  }

  // Запис у файл, якщо параметр output вказано
  if (options.output) {
    writeOutput(options.output, result);
  }

  // Виведення в консоль, якщо параметр display вказано
  if (options.display) {
    console.log(result);
  }
});