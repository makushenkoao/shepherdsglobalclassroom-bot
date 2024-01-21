const { Scenes } = require('telegraf');
const nodemailer = require('nodemailer');

const supportScene = new Scenes.WizardScene(
    'supportScene',
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
        await ctx.reply('Введіть повідомлення:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.userData.message = ctx.message.text;

        const user = ctx.wizard.state.userData;

        const data = `Ім'я: ${user.firstName}\nПрізвище: ${user.lastName}\nЕл.адреса: ${user.email}\nПовідомлення: ${user.message}`;

        const reply = `Дякую! Ваші дані отримані:\n\n${data}\n\nОчікуйте!`;

        await ctx.reply(reply);

        try {
            const emailMessage = `Дані користувача:
                1. Ім'я - ${user.firstName}
                2. Прізвище - ${user.lastName}
                3. Ел.адреса - ${user.email}
                5. Повідомлення - ${user.message}
            `;

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOptions = {
                from: user.email,
                to: process.env.EMAIL,
                subject: 'Нове повідомлення з форми служби підтримки бота',
                text: emailMessage,
            };

            await transporter.sendMail(mailOptions);

            console.log('Email sent successfully.');
        } catch (error) {
            console.log(error);
            console.error('Error sending data to server:', error.message);
        }

        return ctx.scene.leave();
    },
);

module.exports = supportScene;
