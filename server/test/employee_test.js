const assert = require("assert");
const Connection = require('./test_helper');


describe('Employee tests', () => {

  it("Add new employee", done => {
    var sql = "INSERT INTO user (fname, lname,age,address,email,phone) VALUES ('Dilan', 'Hewathudella',25,'pannipitiya','dialn@gmail.com','232323232')";
    Connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(result);
    });
      //assert( "cdap" === "cdap");
      Connection.destroy();
      done();
    });
});