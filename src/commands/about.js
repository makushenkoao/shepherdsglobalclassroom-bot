const { Markup } = require('telegraf');

function about(ctx) {
    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Наш девіз', 'motto'),
        Markup.button.callback('Місія SGC', 'mission_and_vision'),
        Markup.button.callback('Наш план', 'plan'),
    ]);

    ctx.reply('Виберіть інформацію яка вас цікавить:', buttons);
}

module.exports = about
