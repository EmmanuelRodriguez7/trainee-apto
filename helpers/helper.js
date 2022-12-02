const express = require('express');

const return_error = (code, msg) => {
    return {
        "ok": false,
        "message": {
            "code": code,
            "messageText": msg
        }
    }
};

module.exports= {
    return_error
}