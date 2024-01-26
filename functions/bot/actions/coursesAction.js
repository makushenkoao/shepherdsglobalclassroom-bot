const { Markup } = require('telegraf');
const database = require('../../../databases/database.json');

function coursesAction(ctx) {
    const buttons = Markup.inlineKeyboard(
        database.courses.map((course) => [
            Markup.button.callback(course.title, `show_course_${course.id}`),
        ]),
    );

    ctx.reply(`Наші курси:`, buttons);
}

module.exports = coursesAction;
