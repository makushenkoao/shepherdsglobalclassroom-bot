const { Markup } = require('telegraf');

function donateSgc(ctx) {
    const buttons = Markup.inlineKeyboard([
        Markup.button.url(
            'Paypal',
            'https://www.paypal.com/donate/?hosted_button_id=3RYKE5FSXQ95Y',
        ),
        Markup.button.callback('Monobank', 'donate_monobank_sgc'),
    ]);

    ctx.reply('Виберіть cпосіб оплати:', buttons);
}

module.exports = donateSgc;
