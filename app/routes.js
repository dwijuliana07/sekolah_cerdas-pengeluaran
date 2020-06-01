'use strict';

module.exports = function (app) {
    var control = require('./controller/tambahPengeluaran.js');
    var cors = require('cors')

    app.use(cors())
    //Default API Access
    app.route('/services').get(control.index);

    //Tambah Pengeluaran
    app.route('/services/create-pengeluaran-tambah').post(control.createTambahPengeluaran);
    app.route('/services/read-pengeluaran-tambah').get(control.readTambahPengeluaran);
    app.route('/services/update-pengeluaran-tambah').post(control.updateTambahPengeluaran);
    app.route('/services/delete-pengeluaran-tambah').post(control.deleteTambahPengeluaran);
    
    //Tipe Pengeluaran
    var tipe = require('./controller/tipePengeluaran.js');
    app.route('/services/create-pengeluaran-tipe').post(tipe.createTipePengeluaran);
    app.route('/services/read-pengeluaran-tipe').get(tipe.readTipePengeluaran);
    app.route('/services/update-pengeluaran-tipe').post(tipe.updateTipePengeluaran);
    app.route('/services/delete-pengeluaran-tipe').post(tipe.deleteTipePengeluaran);

    //Cari Pengeluaran
    var cari = require('./controller/cariPengeluaran.js');
    app.route('/services/read-pengeluaran-cari-tanggal').get(cari.findPengeluaran);
    app.route('/services/read-pengeluaran-cari-text').get(cari.findPengeluaranText);

    
};
