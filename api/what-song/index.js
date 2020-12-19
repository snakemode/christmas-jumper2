const fetch = require("node-fetch");
const FormData = require('form-data');

const apiKey = process.env.AUDD_API_KEY;

module.exports = async function (context, req) {
    let form = new FormData();
    form.append('file', Buffer.from(req.body.bytes, 'base64'), { filename: 'audio.ogg' });

    const result = await fetch(`https://api.audd.io/?api_token=${apiKey}&return=timecode`, { method: 'POST', body: form });
    const body = await result.text();

    context.res = {
        headers: { "content-type": "application/json" },
        body: body
    };
};