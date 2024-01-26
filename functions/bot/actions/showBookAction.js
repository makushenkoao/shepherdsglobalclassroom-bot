const database = require('../../../databases/database.json');
const { Markup } = require('telegraf');

async function showBookAction(ctx) {
    const bookId = ctx.match.input.split('_')[2]; // Извлекаем id книги
    const book = database.books.find((b) => b.id === bookId);

    if (book) {
        const title = `*${book.name}*\n\n`;
        const description = `*Опис книги:*\n\n${book.description}\n\n`;

        let keyboard;
        if (book.pdfLink && book.pdfLink.trim() !== '') {
            keyboard = Markup.inlineKeyboard([
                Markup.button.url('Переглянути книгу', book.pdfLink),
            ]);
        } else {
            keyboard = Markup.inlineKeyboard([
                Markup.button.callback('PDF недоступний', 'pdf_unavailable'),
            ]);
        }
        await ctx.replyWithPhoto(book.imageSrc);
        await ctx.replyWithMarkdown(`${title}${description}`, keyboard);
    } else {
        await ctx.replyWithMarkdown('Книга не знайдена.');
    }
}

module.exports = showBookAction;
