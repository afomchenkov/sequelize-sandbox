const express = require("express");
const Book = require("../models").Book;
const router = express.Router();

const random = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


const checkIDInput = (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(400).json("Invalid ID supplied");
  } else {
    next();
  }
};

const checkIDExist = (req, res, next) => {
  Book.count({ where: { id: req.params.id } }).then((count) => {
    if (count != 0) {
      next();
    } else {
      res.status(400).json("Book not found");
    }
  });
};

router.get("/", (req, res) => {
  Book.findAll().then((book) => {
    res.status(200).json(book);
  });
});

router.post("/", (req, res) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    tags: Array.from({ length: 4 }, _ => random(10)),
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(405).json("Error has occured");
    });
});

router.get("/:id", [checkIDInput, checkIDExist], (req, res) => {
  Book.findById(req.params.id).then((book) => {
    res.status(200).json(book);
  });
});

router.put("/:id", [checkIDInput, checkIDExist], (req, res) => {
  Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
    },
    {
      where: { id: req.params.id },
    }
  ).then((result) => {
    res.status(200).json(result);
  });
});

router.delete("/:id", [checkIDInput, checkIDExist], (req, res) => {
  Book.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
