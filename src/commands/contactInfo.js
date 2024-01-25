const { Markup } = require('telegraf');

function contactInfo(ctx) {
    const companyEmail = 'info@example.com';
    const companyPhoneNumber = '+1234567890';

    const buttons = Markup.inlineKeyboard([
        Markup.button.url(
            'Перейти на сайт',
            'https://silly-cocada-669d91.netlify.app/',
        ),
    ]);

    const replyText = `Дякуємо за інтерес до нашої компанії!\n\n*Email:* ${companyEmail}\n*Phone:* ${companyPhoneNumber}`;

    ctx.replyWithMarkdown(replyText, buttons);
}

module.exports = contactInfo;
