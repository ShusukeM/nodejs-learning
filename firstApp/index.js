const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
// const {v4: uuid} = require("uuid");
const { webcrypto } = require("crypto");
globalThis.crypto = webcrypto;
async function startApp() {
    const { v4: uuid } = await import("uuid");
const app = express();
let comments = [
    {
        id: uuid(),
        username: "mishima",
        comment: "hi!"
    },
    {
        id: uuid(),
        username: "takahashi",
        comment: "hello!"
    },
    {
        id: uuid(),
        username: "sato",
        comment: "good morning!"
    }
]
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.get("/comments", (req, res) => {
    res.render("comments/index", {comments});
});
app.get("/comments/new", (req, res) => {
    res.render("comments/new", {comments});
});
app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    console.log("受け取ったid:", id);
    const comment = comments.find(c => c.id === id);
    console.log("見つかったcomment:", comment);
    if (!comment) {
        return res.status(404).send("Comment not found");
    }
    res.render("comments/show", {c: comment});
});
app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect("/comments");
});
app.get("/comments/:id/edit", (req, res) => {
    const {id} = req.params;
    console.log("受け取ったid:", id);
    const comment = comments.find(c => c.id === id);
    console.log("見つかったcomment:", comment);
    if (!comment) {
        return res.status(404).send("Comment not found");
    }
    res.render("comments/edit", {c: comment});
});
app.patch("/comments/:id", (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
    // res.redirect("comments") とすると、/comments/commentsにredirectし、getするので、req.paramas.id = commentsになってしまう。
});
app.delete("/comments/:id", (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
    // res.redirect("comments") とすると、/comments/commentsにredirectし、getするので、req.paramas.id = commentsになってしまう。
});
app.listen(3000, () => {
    console.log("request wo port 3000 de matiukechu");
});
}
startApp();