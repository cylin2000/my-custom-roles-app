const fs = require('fs')

module.exports = async function (context, req) {


    const data = fs.readFileSync('/tmp/test_access_token.txt', 'utf8')

    //update
    context.res.json({
        id : 'test001',
        text: "Hello from the API",
        token : "token:" + data
    });
};