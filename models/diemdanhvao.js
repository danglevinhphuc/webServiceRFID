let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let diemDanhVao = new Schema({
	rfid: {
        type: String,
        required: true
    },
    MSSV: String,
    MSCB: String,
    diemDanhVao: {
        type: Date,
        default: Date.now
    }
},{collection: "diemdanhvao"});

module.exports = mongoose.model("diemdanhvao",diemDanhVao);