const fs = require('fs')

module.exports = async function (context, req) {
    context.res.json({
        text: "Hello from the Message 222",
    });
};