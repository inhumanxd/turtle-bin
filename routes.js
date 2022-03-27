const express = require("express");
const authenticate = require("./middlewares/middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/new");
  //   const code = `Welcome to BatBin!

  // Use the commands in the top right corner
  // to create a new file to share with others.`;

  //   res.render("index", {
  //     code,
  //     lineNumbers: code.split("\n").length,
  //     language: "plaintext",
  //   });
});

router.get("/new", (req, res) => {
  res.render("new");
});

const Document = require("./models/Document");
router.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

router.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    const value = document.value;
    res.render("new", {
      value,
    });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    const code = document.value;
    res.render("index", {
      id,
      code,
      lineNumbers: code.split("\n").length,
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findByIdAndDelete(id);
    res.send({ message: "Document deleted.", document });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

router.delete("/", authenticate, async (req, res) => {
  try {
    const document = await Document.deleteMany();
    res.send({ message: "Document deleted.", document });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});
module.exports = router;
