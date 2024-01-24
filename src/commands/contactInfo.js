function contactInfo(ctx) {
    const companyEmail = 'info@example.com';
    const companyPhoneNumber = '+1234567890';

    const replyText = `Дякуємо за інтерес до нашої компанії!\n\n*Email:* ${companyEmail}\n*Phone:* ${companyPhoneNumber}`;

    ctx.replyWithMarkdown(replyText);
}

module.exports = contactInfo;
