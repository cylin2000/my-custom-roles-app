module.exports = async function (context, req) {
    const user = req.body || {};

    context.res.json({
        id : 'test001',
        text: "Hello from the API",
        token : user.accessToken
    });
};