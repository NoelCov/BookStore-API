const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/bookstoreDB", {useNewUrlParser: true, useUnifiedTopology: true});

const bookSchema = new mongoose.Schema({
    title: String,
    URL: String,
    price: Number,
    about: String,
    id: Number
})

const Book = mongoose.model("Book", bookSchema)

app.route('/Books')
    .get((req, res) => {
        Book.find({}, (err, result) => {
            if (!err){
                res.send(result);
            } else {
                res.send(er);
            }
        })
    })
    .post((req, res) => {
        const newBook = new Book({
            title: req.body.title,
            URL: req.body.URL,
            price: req.body.price,
            about: req.body.about,
            id: req.body.id
        });

        newBook.save((err) =>{
            if (!err){
                res.send("Book added to DB");
            } else {
                res.send(err);
            }
        })
    })
    .delete((req, res) => {
        Book.deleteMany((err) => {
            if (!err) {
                res.send("Successully deleted all books from DB.")
            } else {
                res.send(err);
            }
        })
    });

    app.route('/Books/:bookTitle')
    .get((req, res) => {
        Book.findOne({title: req.params.bookTitle}, (err, result) =>{
            if (!err){
                res.send(result);
            } else {
                res.send(err + "Nook book with that title was found.");
            }
        })
    })
    .put((req, res) => {
        Book.updateOne(
            {title: req.params.bookTitle},
            {title: req.body.title, URL: req.body.URL,
            price: req.body.price, about: req.body.about},
            {overwrite: true},
            (err) => {
                if (!err){
                    res.send("Book " + req.params.bookTitle + " successully updated");
                }
            }
        )
    })
    .patch((req, res) => {
        Book.updateOne(
            {title: req.params.bookTitle},
            {$set: req.body},
            (err) => {
                if (!err){
                    res.send("Succesfully updated " + req.body.bookTitle + " values");
                } else {
                    res.send(err);
                }
            }
        )
    })
    .delete((req, res) => {
        Book.deleteOne(
            {title: req.params.bookTitle},
            (err) => {
                if (!err){
                    res.send("Book " + req.params.bookTitle + " successfully deleted.");
                } else {
                    res.send(err);
                }
            }
        )
    });


app.listen(5000, () => {
    console.log("Server running on port 5000");
})