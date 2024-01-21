const { Telegraf, Markup, Scenes, session } = require('telegraf');
const contactScene = require('./scenes/contact');
const database = require('../database/database.json');
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

const stage = new Scenes.Stage([contactScene]);

// middlewares

bot.use(session());
bot.use(stage.middleware());

// commands

bot.start((ctx) =>
    ctx.reply(
        "Ласкаво просимо до нашого боту! 🌟 Тут ви можете дізнатися про наші курси, отримати корисну інформацію та зв'язатися з нами. Використовуйте /help, щоб побачити доступні команди. Приємного використання!",
    ),
);

bot.command('getting_started', (ctx) => {
    const title = '*Як почати\n\n*';
    const block1 =
        '*Дозвольте нам допомогти вам на шляху учнівства*\n\nНас часто запитують: «З якого курсу мені почати?» Хоча однозначної відповіді немає, ми можемо допомогти вам звузити вибір. Нижче наведено кілька списків, які допоможуть вам прийняти рішення.\n\n_Після того, як ви вибрали курс навчання, є три способи почати навчання:_\n\n1. Ви можете безкоштовно завантажити курс у форматі PDF\n2. Ви можете завантажити наш безкоштовний додаток або\n3. Ви можете придбати друковану книгу.\n\n';
    const block2 =
        '*Проходьте кожен курс по порядку*\n\n_Якщо ви хочете пройти кожен курс, який ми пропонуємо, ми пропонуємо пройти їх у такому порядку:_\n\n1. Вивчення Старого Завіту\n2. Вивчення Нового Завіту\n3. Християнські вірування\n4. Римляни\n5. Принципи тлумачення Біблії\n6. Есхатологія\n7. Доктрина і практика святого життя\n8. Духовне становлення\n9. Вступ до християнського богослужіння\n10. Практичне християнське життя\n11. Введення в апологетику\n12. Світові релігії та культи\n13. Біблійна євангелізація та учнівство\n14. Життя і служіння Ісуса\n15. Доктрина і практика Церкви\n16. Керівництво міністерства\n17. Принципи спілкування\n18. Огляд церковної історії І\n19. Огляд церковної історії II\n\n';
    const block3 =
        '*Для учнівства або навчання в малих групах*\n\n_Якщо ви навчаєтесь у групі учнівства, ми пропонуємо ці курси як чудове місце для початку:_\n\n1. Християнські вірування\n2. Вчення і практика святого життя\n3. Духовне формування\n4. Римляни\n5. Біблійна євангелізація та учнівство\n6. Світові релігії та культи\n7. Есхатологія\n\n';
    const block4 =
        '*Середня школа чи молодь*\n\n_Якщо ви вчитель Біблії, який шукає курси для своєї молодіжної групи, або якщо ви молода людина, яка хоче глибше піти у свою ходу з Богом, почніть із цих курсів:_\n\n1. Вивчення Старого Завіту\n2. Вивчення Нового Завіту\n3. Християнські вірування\n4. Світові релігії та культи\n5. Вступ до апологетики\n\n';
    const block5 =
        '*Завантажте курси зараз*\n\nПочніть завантажувати курси зараз:';

    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Огляд курсів', 'courses'),
    ]);

    ctx.replyWithMarkdown(
        `${title}${block1}${block2}${block3}${block4}${block5}`,
        buttons,
    );
});

bot.command('statement_of_faith', (ctx) => {
    const title = `*${database.statement_of_faith.title}*\n\n`;
    const description = `_${database.statement_of_faith.subtitle}_\n\n`;
    const blocks = database.statement_of_faith.block.map((item) => {
        return `*${item.title}*\n\n ${item.text}\n\n`;
    });

    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Огляд курсів', 'courses'),
    ]);

    const messagePart1 = `${title}${description}${blocks.slice(0, blocks.length / 2).join('')}`;
    const messagePart2 = `${blocks.slice(blocks.length / 2).join('')}`;

    ctx.replyWithMarkdown(messagePart1);
    ctx.replyWithMarkdown(messagePart2, buttons);
});

bot.command('contact', (ctx) => {
    ctx.scene.enter('contactScene');
});

bot.command('books', (ctx) => {
    const buttons = Markup.inlineKeyboard(
        database.books.map((book) => [
            Markup.button.callback(book.name, `show_book_${book.id}`),
        ]),
    );

    ctx.reply(`Наші книги:`, buttons);
});

bot.command('courses', (ctx) => {
    const buttons = Markup.inlineKeyboard(
        database.courses.map((course) => [
            Markup.button.callback(course.title, `show_course_${course.id}`),
        ]),
    );

    ctx.reply(`Наші курси:`, buttons);
});

bot.command('app', (ctx) => {
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
});

bot.command('socials', (ctx) => {
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
});

bot.command('contactinfo', (ctx) => {
    const companyEmail = 'info@example.com';
    const companyPhoneNumber = '+1234567890';

    const replyText = `Дякуємо за інтерес до нашої компанії!\n\nEmail: ${companyEmail}\nPhone: ${companyPhoneNumber}`;

    ctx.reply(replyText);
});

bot.command('about', (ctx) => {
    const buttons = Markup.inlineKeyboard([
        Markup.button.callback('Наш девіз', 'motto'),
        Markup.button.callback('Місія SGC', 'mission_and_vision'),
        Markup.button.callback('Наш план', 'plan'),
    ]);

    ctx.reply('Виберіть інформацію яка вас цікавить:', buttons);
});

bot.command('throw_error', () => {
    throw new Error("THAT'S TEST ERROR!");
});

bot.help((ctx) =>
    ctx.reply(
        "/start - Почніть роботу з ботом.\n/getting_started - Виводить інформацію про те, як почати навчання, включаючи поради та перелік курсів.\n/statement_of_faith - Подивіться, що вірить Shepherds Global Classroom про християнську віру.\n/contact - Зв'яжіться з нами.\n/books - Перегляньте доступні наші книги.\n/courses - Перегляньте доступні наші курси.\n/app - Завантажте додаток на свій смартфон.\n/socials - Слідкуйте за нашими соціальними мережами\n/contactinfo - Подивіться контактну інформацію компанії.\n/about - Дізнайтеся про нас і наші цілі.\n/help - Подивіться доступні команди.",
    ),
);

// actions

bot.action('courses', (ctx) => {
    const buttons = Markup.inlineKeyboard(
        database.courses.map((course) => [
            Markup.button.callback(course.title, `show_course_${course.id}`),
        ]),
    );

    ctx.reply(`Наші курси:`, buttons);
});

bot.action(/show_course_/, async (ctx) => {
    const courseId = ctx.match.input.split('_')[2]; // Извлекаем id курса
    const course = database.courses.find((c) => c.id === courseId);

    if (course) {
        if (ctx.callbackQuery.message) {
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
                    Markup.button.callback(
                        'PDF недоступний',
                        'pdf_unavailable',
                    ),
                    Markup.button.url('Переглянути на сайті', course.href),
                ]);
            }
            await ctx.replyWithMarkdown(
                `${title}${description}${objectives}${overview}${authors}`,
                keyboard,
            );
        } else {
            await ctx.replyWithMarkdown(
                `*${course.title}*\n\n${course.description}`,
            );
        }
    } else {
        await ctx.replyWithMarkdown('Курс не знайдено.');
    }
});

bot.action(/show_book_/, async (ctx) => {
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
        await ctx.replyWithMarkdown(`${title}${description}`, keyboard);
    } else {
        await ctx.replyWithMarkdown('Книга не знайдена.');
    }
});

bot.action(/mission_and_vision/, (ctx) => {
    ctx.replyWithMarkdown(
        "*Місія та бачення SGC*\n\nНаша місія — надати навчальну програму для становлення лідерів-християн по всьому світу.\n\nБачення полягає в тому, щоб будинки, кав'ярні і навіть тінисті місця в літню спеку перетворювалися на класи, де віруючі оснащуються та висилаються на жнива.\n\nНавчальний план ШШГ складено так, щоб бути відповіддю на потребу і закласти доктринальну та практичну основи навчання лідерів-християн; це простий у використанні інструмент для пасторів та місіонерів, котрі бажають створити структуровані неформальні навчальні програми у будь-якому контексті.",
    );
});

bot.action(/motto/, (ctx) => {
    ctx.replyWithMarkdown(
        '*Це наш девіз*\n\nПід час проведення дводенного учбового тренінгу для лідерів-християн в Африці засновник SGC (ШШГ) відчув тягар на серці через брак навчальних матеріалів, необхідних для отримання біблійної освіти. Мета заснування SGC (ШШГ) — оснастити лідерів-християн по всьому світу, надавши комплексну навчальну програму здобуття теологічної освіти.\n\nПотреба в підготовлених до служіння лідерах величезна!\n1.85–95% пасторів у всьому світі зовсім чи недостатньо підготовлені.\n2.становлено, що всередині вікна 10/40 5 мільйонам пасторів недоступна біблійна освіта.\n3.На кожні 500 000 осіб за межами США приходиться лише 1 пастор.\n4.Доктринальний голод призвів до болю та страждань у світі.\n5.За даними Всесвітнього євангельського альянсу брак біблійної освіти — найбільший виклик, з яким стикається євангельська церква по всьому світу.\n6.Традиційні біблійні школи не можуть бути відповіддю на цю потребу; необхідно зробити доступним навчання для широких мас.',
    );
});

bot.action(/plan/, (ctx) => {
    ctx.replyWithMarkdown(
        '*Наш план поширення учнівства по всьому світу*\n\nSGC (ШШГ) розробила чотиристоронній план втілення в життя бачення організації.\n\n1. Створення доступної комплексної навчальної програми з перекладами на мови багатьох народів світу; вона має бути простою, але надійною та адаптованою до різних контекстуальних умов.\n2. Покращення навчальної програми за допомогою технологій, включно з аудіо-, відео- та використанням додатків.\n3. Розвиток партнерських відносин з місіонерськими організаціями однодумців, котрі стануть основним каналом поширення та впровадження навчальної програми.\n4. Розробка методу підготовки викладачів, відомого як Shepherds Global Trainers (SGT) (тренінгова програма (ТШГ)), що використовуватиметься нашими партнерськими організаціями.',
    );
});

// bot.on('text', (ctx) => {
//     ctx.reply('Я не розумію цю команду. Використовуйте /help, щоб побачити доступні команди.');
// });

bot.catch((error, ctx) => {
    console.error('ERROR ==>', error);
    ctx.reply(
        'Виникла помилка при обробці вашого запиту. Будь ласка, спробуйте ще раз.\nЯкщо ви знайшли проблему в боті зверніться до @makushenkoao.\nВибачте за надані незручності.',
    );
});

bot.launch().then(() => console.log('Telegram bot started!'));
