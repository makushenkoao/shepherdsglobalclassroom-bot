const { Markup } = require('telegraf');

function socials(ctx) {
    const socialButtons = Markup.inlineKeyboard([
        Markup.button.url(
            'Linkedin',
            'https://www.linkedin.com/company/89994899/admin/',
        ),
        Markup.button.url(
            'Instagram',
            'https://www.facebook.com/ShepherdsGlobal',
        ),
        Markup.button.url(
            'Facebook',
            'https://www.instagram.com/shepherdsglobalclassroom/',
        ),
    ]);

    ctx.reply(
        'Дякуємо за інтерес до нашої компанії!\n\nВиберіть соціальну мережу:',
        socialButtons,
    );
}

module.exports = socials;
