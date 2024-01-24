const database = require('../../databases/database.json');
const { Markup } = require('telegraf');

async function showCourseAction(ctx) {
    const courseId = ctx.match.input.split('_')[2]; // Извлекаем id курса
    const course = database.courses.find((c) => c.id === courseId);

    if (course) {
        const title = `*${course.title}*\n\n`;
        const authors = `*Автор${course.authors.length > 1 ? 'и' : ''} курсу*\n\n${course.authors.join('\n')}\n\n`;
        const description = `*Опис курсу:*\n\n${course.descriptions.join(' ')}\n\n`;
        const objectives = `*Цілі курсу:*\n\n${Array.isArray(course.objectives) ? course.objectives.map((item, index) => `${index + 1}. ${item}`).join('\n') : course.objectives}\n\n`;
        const overview = `*Огляд курсу:*\n\n${course.overview.map((lesson, index) => `*${lesson.type}:* ${lesson.name}`).join('\n')}\n\n`;

        let keyboard;
        if (course.pdfLink && course.pdfLink.trim() !== '') {
            keyboard = Markup.inlineKeyboard([
                Markup.button.url('Завантажити PDF', course.pdfLink),
                Markup.button.url('Переглянути на сайті', course.href),
            ]);
        } else {
            keyboard = Markup.inlineKeyboard([
                Markup.button.callback('PDF недоступний', 'pdf_unavailable'),
                Markup.button.url('Переглянути на сайті', course.href),
            ]);
        }
        await ctx.replyWithPhoto(course.imageSrc);
        await ctx.replyWithMarkdown(
            `${title}${description}${objectives}${overview}${authors}`,
            keyboard,
        );
    } else {
        await ctx.replyWithMarkdown('Курс не знайдено.');
    }
}

module.exports = showCourseAction;
