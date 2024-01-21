const database = require('../../databases/database.json');
const { Markup } = require('telegraf');

function statementOfFaith(ctx) {
    const title = `*${database.statement_of_faith.title}*\n\n`;
    const description = `_${database.statement_of_faith.subtitle}_\n\n`;
    const blocks = database.statement_of_faith.block.map((item) => {
        return `*${item.title}*\n\n ${item.text}\n\n`;
    });

    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Огляд курсів', 'courses'),
    ]);

    const messagePart1 = `${title}${description}${blocks.slice(0, blocks.length / 2).join('')}`;
    const messagePart2 = `${blocks.slice(blocks.length / 2).join('')}`;

    ctx.replyWithMarkdown(messagePart1);
    ctx.replyWithMarkdown(messagePart2, buttons);
}

module.exports = statementOfFaith
