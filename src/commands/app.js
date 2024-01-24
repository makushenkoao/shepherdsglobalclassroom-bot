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

    ctx.replyWithMarkdown('*Проходьте курси SGC на своєму смартфоні, де б ви не були.*\n\nМи раді запропонувати безкоштовний додаток на додаток до наших друкованих курсів. Додаток SGC дає вам змогу читати матеріал курсу, робити нотатки, проходити тести, брати участь у онлайн-навчальних групах тощо — усе це безкоштовно на вашому телефоні! Додаток SGC для вашого телефону Android безкоштовно! Додаток SGC для iOS.\n\nВиберіть операційну систему:', socialButtons);
}

module.exports = app;
