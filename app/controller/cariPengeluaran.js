'use strict';

var response = require('../res');
var connection = require('../conn');

const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
var time = "";

exports.index = function (req, res) {
    response.ok("403 Forbidden (You don't have permission to access this API)", res)
};

exports.findPengeluaran = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengeluaran-cari-tanggal");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengeluaran != null || req.body.idPengeluaran != undefined) {
        condition = " AND id = " + req.body.idPengeluaran;
    }

    var sql = `SELECT 
            name,
            invoice_no,
            exp_head_id,
            date,
            amount
        FROM
        sekolah_cerdas.expenses
        WHERE 1 = 1 
        `+ condition + ` 
        AND date BETWEEN 
        '`+ req.body.tanggal + `' AND
        '`+ req.body.sampai_tanggal + `'
        ; `;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};

exports.findPengeluaranText = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengeluaran-cari-text");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengeluaran != null || req.body.idPengeluaran != undefined) {
        condition = " AND id = " + req.body.idPengeluaran;
    }

    var sql = `SELECT 
            name,
            invoice_no,
            exp_head_id,
            date,
            amount
        FROM
        sekolah_cerdas.expenses
        WHERE 1 = 1 
        `+ condition + ` 
        AND name LIKE
        '%`+ req.body.name + `%'
        ; `;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};
