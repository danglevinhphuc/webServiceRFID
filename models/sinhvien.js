let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let sinhVien = new Schema({
	rfid: {
        type: String,
        required: true
    },
    MSSV:  {
        type: String,
        required: true
    },
    hoTen: {
        type: String,
        required: true
    },
    lop: String,
    nganh: String,
    tenKhoa: String,
    Khoa: Number
},{collection: "sinhvien"});

module.exports = mongoose.model("sinhvien",sinhVien);