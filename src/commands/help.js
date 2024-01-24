const database = require('../../databases/database.json');

function help(ctx) {
    const commands = database.commands.map(
        (item) => `/${item.command} - ${item.description}\n`,
    );

    ctx.reply(`Перелік команд які знає бот:\n\n${commands.join('')}`);
}

module.exports = help;
