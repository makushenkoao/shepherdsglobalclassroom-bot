const { Markup } = require('telegraf');
const database = require('../../databases/database.json');

function books(ctx) {
    const buttons = Markup.inlineKeyboard(
        database.books.map((book) => [
            Markup.button.callback(book.name, `show_book_${book.id}`),
        ]),
    );

    ctx.reply(`Наші книги:`, buttons);
}

module.exports = books;
