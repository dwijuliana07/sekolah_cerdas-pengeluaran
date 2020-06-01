'use strict';

exports.error = function (status_code, time, messages, error, res) {
    var data = {
        'statusCode': status_code,
        'elapsedTime': time,
        'messages': messages,
        'error': error
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};

exports.successPost = function (status_code, time, messages, res) {
    var data = {
        'statusCode': status_code,
        'elapsedTime': time,
        'messages': messages
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};

exports.successGet = function (status_code, time, messages, total, datasets, res) {
    var data = {
        'statusCode': status_code,
        'elapsedTime': time,
        'messages': messages,
        'total': total,
        'data': datasets
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};