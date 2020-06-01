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

exports.createTambahPengeluaran = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pengeluaran-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.expenses (
            exp_head_id,
            name,
            invoice_no,
            date,
            amount,
            documents,
            note,
            is_active,
            is_deleted,
            created_at
      ) 
      VALUES
        (
        '`+ req.body.expHead + `',
        '`+ req.body.name + `',
        '`+ req.body.invoiceNo + `',
        '`+ req.body.date + `',
        '`+ req.body.amount + `',
        '`+ req.body.documents + `',
        '`+ req.body.note + `',
        'yes',
        'no',
        NOW()
        ) ;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readTambahPengeluaran = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengeluaran-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengeluaran != null || req.body.idPengeluaran != undefined) {
        condition = " AND id = " + req.body.idPengeluaran;
    }
    var sql = `SELECT 
            exp_head_id,
            name,
            invoice_no,
            date,
            amount,
            documents,
            note,
            is_active,
            is_deleted,
            created_at,
            updated_at
        FROM
            sekolah_cerdas.expenses
     WHERE 1=1  
       `+ condition + `;`;

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

exports.updateTambahPengeluaran = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pengeluaran-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengeluaran != null || req.body.idPengeluaran != undefined) {
        condition = " AND id = " + req.body.idPengeluaran;
    }
    var sql = `UPDATE 
        sekolah_cerdas.expenses
     SET
            exp_head_id = '`+ req.body.expHead + `',
            name = '`+ req.body.name + `',
            invoice_no = '`+ req.body.invoiceNo + `',
            date = '`+ req.body.date + `',
            amount = '`+ req.body.amount + `',
            documents = '`+ req.body.documents + `',
            note = '`+ req.body.note + `',
            is_active = 'yes',
            is_deleted = 'no',
            updated_at = NOW()
     WHERE 1 = 1
     `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteTambahPengeluaran = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pengeluaran-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengeluaran != null || req.body.idPengeluaran != undefined) {
        condition = " AND id = " + req.body.idPengeluaran;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.expenses
        WHERE 1 = 1 
        `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

