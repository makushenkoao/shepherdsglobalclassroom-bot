const LIMIT_CONFIG = {
    window: 2000,
    limit: 1,
    onLimitExceeded: (ctx, next) =>
        ctx.reply('Будь ласка, зачекайте перед надсиланням нової команди.'),
};

module.exports = {
    LIMIT_CONFIG,
};
