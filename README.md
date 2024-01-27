# Shepherds Global Classroom Bot

---

### Bots:

-   [Production Bot](https://t.me/sgc_ua_bot)
-   [Development Bot](https://t.me/SGCForDevBot)

### How to develop

- To develop, you need to create a new bot at [Bot Father](https://t.me/botfather)
- Install `nodemon` package
- Add script `"dev": "nodemon src/index.js",` to package.json
- For development, create a src folder and make changes there, then as soon as the bot is tested and ready for production, you need to make changes in the [functions/bot](functions/bot) folder and push it to GitHub

### How to deploy a bot

- Create a bot at [Bot Father](https://t.me/botfather) and save the token
- Create [GitHub](https://github.com/) repository
- Create bot files 
  - create a [netlify.toml](docs/filesToStart/netlify.toml) file
  - create a [package.json](docs/filesToStart/package.json) file
  - create [functions/bot/bot.js](docs/filesToStart/bot.js) file
  - create [.gitignore](docs/filesToStart/.gitignore) file
- Deploy the project to Netlify
  - Login to Netlify and go to “Add New Site” -> “Import an existing project”
  - For your basic build settings, leave both the Basic directory, and the Publish Directory field blank (if there is anything in either of them, delete it)
  - The Build command should have auto-filled, but if it hasn’t the command in the field should be: netlify-lambda install && mkdir ./public
  - Now click on the “New Variables” button, so that we can add a new environment variable, with a key of BOT_TOKEN, and a value which is the Telegram token that you first retrieved from BotFather.
- Setting up a Web hook
  - The webhook is called in a browser, and needs to be set in the following format, which includes both the Telegram token and the new Netlify URL: `https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://YOUR_NETLIFY_URL/api/bot`
  - If all went well, you’ll see the following response in the borwser: `{"ok":true,"result":true,"description":"Webhook was set"}`
- Test connectivity from the Telegram bot to Netlify
  - Now that everything is setup, we should be able to test our bot. Head back to Telegram, and send the bot the message /start
  - If all goes well, and everything connected, you’ll see the following message back to you: *Congrats! You've connected to Netlify!*
  - You’re now connected! The next steps are to expand upon what we want our bot.js functions (hosted on Netlify) to retrieve when we type in commands!
