const fs = require('fs');
const path = require('path');

const commandName = process.argv[2];

if (!commandName) {
    console.error(
        'Command name not specified. Example usage: npm run generate:command commandName',
    );
    process.exit(1);
}

const commandFilePath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'commands',
    `${commandName}.js`,
);

if (fs.existsSync(commandFilePath)) {
    console.error(`The file ${commandFilePath} already exists.`);
    process.exit(1);
}

fs.writeFileSync(
    commandFilePath,
    `
function ${commandName}(ctx) { 
    ctx.reply('calling the command ${commandName}');
}

module.exports = ${commandName};
`,
);

function camelToSnakeCase(inputString) {
    return inputString
        .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
        .replace(/^_/, '');
}

const indexPath = path.join(__dirname, '..', '..', 'src', 'index.js');

const indexContent = fs.readFileSync(indexPath, 'utf-8');

const importStatement = `const ${commandName} = require('./commands/${commandName}');`;
const commandsSection = '// commands';
const newImport = `${commandsSection}\n${importStatement}`;

const botCommands = 'bot.help(help);';
const newCommand = `bot.command('${camelToSnakeCase(commandName)}', ${commandName});`;
const newBotCommands = `${newCommand}\n${botCommands}`;

const newIndexContent = indexContent
    .replace(commandsSection, newImport)
    .replace(botCommands, newBotCommands);

fs.writeFileSync(indexPath, newIndexContent);

console.log(`Command '${commandName}' created successfully`);
