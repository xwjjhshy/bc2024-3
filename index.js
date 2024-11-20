const { program } = require('commander');
const fs = require('fs');

// Функція для запису результату у файл
function writeOutput(output, result) {
  try {
    fs.writeFileSync(output, JSON.stringify(result, null, 2));
    console.log('Output written to', output);
  } catch (err) {
    console.error('Error writing to output file:', err);
    process.exit(1);
  }
}

// Налаштування командної програми
program
  .requiredOption('-i, --input <file>', 'Input file (required)')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display result in console')
  .parse();

const options = program.opts();

// Перевірка, чи існує вхідний файл
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file:', options.input);
  process.exit(1);
}

let result;

try {
  // Зчитування даних із вхідного файлу
  const data = fs.readFileSync(options.input, 'utf-8');
  const records = JSON.parse(data);

  // Форматування результатів
  const formattedResults = {};
  records.forEach(record => {
    if (record.txt === "Доходи, усього" || record.txt === "Витрати, усього") {
      formattedResults[record.txt] = record.value;
    }
  });

  result = formattedResults;

} catch (err) {
  console.error('Error reading or parsing input file:', err);
  process.exit(1);
}

// Запис результату у файл, якщо вказано
if (options.output) {
  writeOutput(options.output, result);
}

// Виведення результату у консоль, якщо вказано
if (options.display) {
  console.log(result);
}
