const { Markup } = require('telegraf');

function donateDevelopers(ctx) {
    const buttons = Markup.inlineKeyboard([
        Markup.button.url(
            'Paypal',
            'https://www.paypal.com/donate/?hosted_button_id=3RYKE5FSXQ95Y',
        ),
        Markup.button.callback('Monobank', 'donate_monobank_developers'),
    ]);

    ctx.reply('Виберіть cпосіб оплати:', buttons);
}

module.exports = donateDevelopers
