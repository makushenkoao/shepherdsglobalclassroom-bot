const { Scenes } = require('telegraf');

const contactScene = new Scenes.WizardScene(
    'contactScene',
    async (ctx) => {
        await ctx.reply("Введіть ім'я:");
        ctx.wizard.state.userData = {};
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.firstName = ctx.message.text;
        await ctx.reply('Введіть прізвище:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.lastName = ctx.message.text;
        await ctx.reply('Введіть електронну пошту:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.email = ctx.message.text;
        await ctx.reply('Введіть тему:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.subject = ctx.message.text;
        await ctx.reply('Введіть повідомлення:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.message = ctx.message.text;

        const user = ctx.wizard.state.userData;

        const data = `Ім'я: ${user.firstName}\nПрізвище: ${user.lastName}\nЕл.адреса: ${user.email}\nТема: ${user.subject}\nПовідомлення: ${user.message}`;

        const reply = `Дякую! Ваші дані отримані:\n\n${data}\n\nОчікуйте!`;

        await ctx.reply(reply);

        try {
            // TODO: send mail request

            console.log('Данные успешно отправлены на сервер.');
        } catch (error) {
            console.log(error);
            console.error('Ошибка отправки данных на сервер:', error.message);
        }

        return ctx.scene.leave();
    },
);

module.exports = contactScene;
