const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("GET /auth/logout", () => {
  it("should return 200 and a response message", (done) => {
    chai
      .request(server)
      .get(`/auth/logout/`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal("You have successfully logged out");
        done();
      });
  });
});
