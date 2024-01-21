function contactInfo(ctx) {
    const companyEmail = 'info@example.com';
    const companyPhoneNumber = '+1234567890';

    const replyText = `Дякуємо за інтерес до нашої компанії!\n\nEmail: ${companyEmail}\nPhone: ${companyPhoneNumber}`;

    ctx.reply(replyText);
}

module.exports = contactInfo;
