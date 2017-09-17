let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let diemDanhRa = new Schema({
	rfid: {
        type: String,
        required: true
    },
    MSSV: String,
    MSCB: String,
    hoTen: String,
    diemDanhRa: {
        type: Date,
        default: Date.now        
    }
},{collection: "diemdanhra"});

module.exports = mongoose.model("diemdanhra",diemDanhRa);