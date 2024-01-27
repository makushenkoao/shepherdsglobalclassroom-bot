const LIMIT_CONFIG = {
    window: 1000,
    limit: 1,
    onLimitExceeded: (ctx) =>
        ctx.reply('Будь ласка, зачекайте перед надсиланням нової команди.'),
};

module.exports = {
    LIMIT_CONFIG,
};
