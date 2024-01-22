const { Telegraf, Markup, Scenes, session } = require('telegraf');
// commands
const gettingStarted = require('./commands/gettingStarted');
const start = require('./commands/start');
const statementOfFaith = require('./commands/statementOfFaith');
const contact = require('./commands/contact');
const support = require('./commands/support');
const books = require('./commands/books');
const courses = require('./commands/courses');
const app = require('./commands/app');
const socials = require('./commands/socials');
const throwError = require('./commands/throwError');
const about = require('./commands/about');
const help = require('./commands/help');
const contactInfo = require('./commands/contactInfo');
// actions
const coursesAction = require('./actions/coursesAction');
const showCourseAction = require('./actions/showCourseAction');
const showBookAction = require('./actions/showBookAction');
const missionAndVisionAction = require('./actions/missionAndVisionAction');
const mottoAction = require('./actions/mottoAction');
const planAction = require('./actions/planAction');
const donate = require('./commands/donate');
const donateSgc = require('./actions/donateSgc');
const donateMonobankSgc = require('./actions/donateMonobankSgc');
const donateDevelopers = require('./actions/donateDevelopers');
const donateMonobankDevelopers = require("./actions/donateMonobankDevelopers");
// scenes
const contactScene = require('./scenes/contact');
const supportScene = require('./scenes/support');

require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

const stage = new Scenes.Stage([contactScene, supportScene]);

// middlewares

bot.use(session());
bot.use(stage.middleware());

// commands

bot.start(start);
bot.command('getting_started', gettingStarted);
bot.command('statement_of_faith', statementOfFaith);
bot.command('contact', contact);
bot.command('support', support);
bot.command('books', books);
bot.command('courses', courses);
bot.command('app', app);
bot.command('socials', socials);
bot.command('contactinfo', contactInfo);
bot.command('about', about);
bot.command('donate', donate);
bot.command('throw_error', throwError);
bot.help(help);

// actions

bot.action('courses', coursesAction);
bot.action(/show_course_/, showCourseAction);
bot.action(/show_book_/, showBookAction);
bot.action(/mission_and_vision/, missionAndVisionAction);
bot.action(/motto/, mottoAction);
bot.action(/plan/, planAction);
bot.action(/donate_sgc/, donateSgc);
bot.action(/donate_monobank_sgc/, donateMonobankSgc);
bot.action(/donate_developers/, donateDevelopers);
bot.action(/donate_monobank_developers/, donateMonobankDevelopers);

// handlers

bot.catch((error, ctx) => {
    console.error('ERROR ==>', error);
    ctx.reply(
        'Виникла помилка при обробці вашого запиту. Будь ласка, спробуйте ще раз.\nЯкщо ви знайшли проблему в боті скористуйтеся командою /support.\nВибачте за надані незручності.',
    );
});

// bot.on('text', (ctx) => {
//     ctx.reply('Я не розумію цю команду. Використовуйте /help, щоб побачити доступні команди.');
// });

bot.launch().then(() => console.log('Telegram bot started!'));
