const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
// const should = chai.should();
const Book = require("../models").Book;

chai.use(chaiHttp);

describe("Book API", () => {
  beforeEach((done) => {
    Book.destroy({
      where: {},
      truncate: true,
    });
    done();
  });

  describe("/GET books", () => {
    it("Getting all books", (done) => {
      chai
        .request(app)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST books", () => {
    it("Insert new book", (done) => {
      var book = {
        title: "Jack Ma",
        author: "Chen Wei",
        category: "Biography",
      };
      chai
        .request(app)
        .post("/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET/:id books", () => {
    it("Get book by id", (done) => {
      Book.create({
        title: "Jack Ma",
        author: "Chen Wei",
        category: "Biography",
      }).then((book) => {
        chai
          .request(app)
          .get("/books/" + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    it("Get book by not existed id", (done) => {
      chai
        .request(app)
        .get("/books/100")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.equal("Book not found");
          done();
        });
    });

    it("Get book by invalid id", (done) => {
      chai
        .request(app)
        .get("/books/abc")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.equal("Invalid ID supplied");
          done();
        });
    });
  });

  describe("/PUT/:id books", () => {
    it("Update book by id", (done) => {
      Book.create({
        title: "Jack Ma",
        author: "Chen Wei",
        category: "Biography",
      }).then((book) => {
        const bookEdit = {
          title: "Amor Fati",
          author: "Rando Kim",
          category: "Non Fiction",
        };
        chai
          .request(app)
          .put("/books/" + book.id)
          .send(bookEdit)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
  });

  describe("/DELETE/:id books", () => {
    it("Delete book by id", (done) => {
      Book.create({
        title: "Jack Ma",
        author: "Chen Wei",
        category: "Biography",
      }).then((book) => {
        chai
          .request(app)
          .delete("/books/" + book.id)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.equal(1);
            done();
          });
      });
    });
  });
});
