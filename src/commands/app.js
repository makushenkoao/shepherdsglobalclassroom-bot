const { Markup } = require('telegraf');

function app(ctx) {
    const socialButtons = Markup.inlineKeyboard([
        Markup.button.url(
            'IOS',
            'https://apps.apple.com/us/app/shepherds-global-classroom/id1570300055',
        ),
        Markup.button.url(
            'Android',
            'https://play.google.com/store/apps/details?id=dev.andrewblankenship.org.shepherdsglobal',
        ),
    ]);

    ctx.reply('Виберіть операційну систему:', socialButtons);
}

module.exports = app;
