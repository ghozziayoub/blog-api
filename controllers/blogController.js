const express = require("express");

const { Blog } = require("../models/blog");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to blog controller");
});

app.post("/add", (req, res) => {
  let data = req.body;

  let blog = new Blog({
    title: data.title,
    content: data.content,
  });

  blog
    .save()
    .then((savedBlog) => {
      res.status(201).send(savedBlog);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/all", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.status(200).send(blogs);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/one/:id", (req, res) => {
  let id = req.params.id;

  Blog.findOne({ _id: id })
    .then((blog) => {
      if (!blog) {
        res.status(404).send({ message: "Blog not found" });
      } else {
        res.status(200).send(blog);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/update_info/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;

  Blog.findOneAndUpdate({ _id: id }, data, { new: true })
    .then((blog) => {
      if (!blog) {
        res.status(404).send({ message: "Blog not found" });
      } else {
        res.status(200).send({ message: "Blog updated" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  Blog.findOneAndDelete({ _id: id })
    .then((blog) => {
      if (!blog) {
        res.status(404).send({ message: "Blog not found" });
      } else {
        res.status(200).send({ message: "Blog Deleted" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = app;