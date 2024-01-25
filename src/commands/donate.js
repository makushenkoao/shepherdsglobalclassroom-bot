const { Markup } = require('telegraf');

function donate(ctx) {
    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Donate for SGC', 'donate_sgc'),
        Markup.button.callback('Donate for developers', 'donate_developers'),
    ]);

    ctx.reply('Виберіть кому хочете задонатити:', buttons);
}

module.exports = donate;
