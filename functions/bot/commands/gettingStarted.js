const database = require('../../../databases/database.json');
const { Markup } = require('telegraf');

function gettingStarted(ctx) {
    const title = `*${database.getting_started.title}*\n\n`;
    const blocks = database.getting_started.blocks
        .map((item, index) => {
            const courses = item.courses
                .map((course, courseIndex) => {
                    return `${courseIndex + 1}. ${course}`;
                })
                .join('\n');
            const description = item.descriptions.join(' ');

            return `*${item.title}*\n\n_${description}_\n${courses}\n\n`;
        })
        .join('');

    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Огляд курсів', 'courses'),
    ]);

    ctx.replyWithMarkdown(`${title}${blocks}`, buttons);
}

module.exports = gettingStarted;
