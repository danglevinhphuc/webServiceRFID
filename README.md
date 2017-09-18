# webServiceRFID 
source code webservice project RFID
Nếu chạy trên web thì thay đỗi http://localhost:3000 => https://servicerfid.herokuapp.com/
# SỬ DỤNG API CÁN BỘ
# GET
GET DANH SÁCH CÁN BỘ ##
http://localhost:3000/api/canbo/gets
##GET DANH SÁCH CÁN BỘ THEO TÊN ##
http://localhost:3000/api/canbo/search/ABC
##GET DANH CÁN BỘ THEO MSCB##
http://localhost:3000/api/canbo/get/B1400718
# POST
POST THÊM 1 CÁN BỘ
http://localhost:3000/api/canbo/post
# PUT
PUT SỬA 1 CÁN BỘ THEO ID
http://localhost:3000/api/canbo/put/59bdd2396a749a19087b5c9e
# DELETE
DELETE XOÁ 1 CÁN BỘ THEO ID
http://localhost:3000/api/canbo/delete/59bdd2396a749a19087b5c9e
# TƯƠNG TỰ VỚI API CỦA SINH VIÊN CHỈ CẦN THAY canbo =>sinhvien
# SỰ DỤNG API ĐIỂM DANH VÀO
# GET
GET DANH SÁCH ĐIỂM DANH VÀO##
http://localhost:3000/api/diemdanhvao/gets
##GET DANH SÁCH ĐIỂM DANH VÀO THEO TÊN
http://localhost:3000/api/diemdanhvao/search/abcxyz
# POST
POST THÊM 1 CÁN BỘ HOẶC SINH VIÊN ĐIỂM DANH VÀO
http://localhost:3000/api/diemdanhvao/post
# PUT
PUT SỬA 1 CÁN BỘ HOẶC SINH VIÊN ĐIỂM DANH VÀO THEO ID
http://localhost:3000/api/diemdanhvao/put/59bdd2396a749a19087b5c9e
# DELETE
DELETE XOÁ 1 CÁN BỘ HOẶC SINH VIÊN ĐIỂM DANH VÀO THEO ID
http://localhost:3000/api/diemdanhvao/delete/59bdd2396a749a19087b5c9e
# TƯƠNG TỰ API CỦA ĐIÊM DANH RA VÀ SỰ KIỆN CHỈ CẦN THAY diemdanhvao => diemdanhra | diemdanhvao => sukien
# API DANH SÁCH 
 Danh sách này là api gồm mssv / mscb nếu có dùng để lưu lại danh sách xuất ra file excel 
# GET
http://localhost:3000/api/danhsach/gets
# POST
http://localhost:3000/api/danhsach/post
# PUT 
PUT SỬA 1 THÀNH VIÊN TRONG DANH SÁCH THEO ID
http://localhost:3000/api/danhsach/put/59bdd2396a749a19087b5c9e
# DELETE 
DELETE XOÁ 1 THÀNH VIÊN TRONG DANH SÁCH THEO ID
http://localhost:3000/api/danhsach/delete/59bdd2396a749a19087b5c9e
