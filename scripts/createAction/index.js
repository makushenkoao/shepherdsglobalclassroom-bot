const fs = require('fs');
const path = require('path');

const actionName = process.argv[2];

if (!actionName) {
    console.error(
        'Action name not specified. Example usage: npm run generate:action actionName',
    );
    process.exit(1);
}

const actionFilePath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'actions',
    `${actionName}.js`,
);

if (fs.existsSync(actionFilePath)) {
    console.error(`The file ${actionFilePath} already exists.`);
    process.exit(1);
}

fs.writeFileSync(
    actionFilePath,
    `function ${actionName}(ctx) { 
    ctx.reply('calling the action ${actionName}');
}

module.exports = ${actionName};
`,
);

function camelToSnakeCase(inputString) {
    return inputString
        .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
        .replace(/^_/, '');
}

const indexPath = path.join(__dirname, '..', '..', 'src', 'index.js');

const indexContent = fs.readFileSync(indexPath, 'utf-8');

const importStatement = `const ${actionName} = require('./actions/${actionName}');`;
const commandsSection = '// actions';
const newImport = `${commandsSection}\n${importStatement}`;

const botCommands = "bot.action('courses', coursesAction);";
const newCommand = `bot.action(/${camelToSnakeCase(actionName)}/, ${actionName});`;
const newBotCommands = `${newCommand}\n${botCommands}`;

const newIndexContent = indexContent
    .replace(commandsSection, newImport)
    .replace(botCommands, newBotCommands);

fs.writeFileSync(indexPath, newIndexContent);

console.log(`Action '${actionName}' created successfully`);
