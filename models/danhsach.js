let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let danhSach = new Schema({
    MSSV: String,
    MSCB: String
},{collection: "danhsach"});

module.exports = mongoose.model("danhsach",danhSach);
