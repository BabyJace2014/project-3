const express = require('express');
const dotenv = require('dotenv').config();    // process.env
const axios = require('axios');
const parseString = require('xml2js').parseString;

/////////////////////////////////////////////////////////////////
// Sets up the variables for GoodReads API calls in
//   /books routes
/////////////////////////////////////////////////////////////////

module.exports = function(app) {

    // GET route /book/info/:query
    //  use the GoodReads API to get a list of books
    //  w/ details based on the title, author or ISBN#
    app.get("/book/list/:query", (req, res) => {
        const query = req.params.query
        let queryURL = `https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${query}`;
console.log("/book/list -- " + queryURL);
        axios.get( queryURL )
            .then( function (result) {
                let books = [];
        
                var cleanedResult = result.data.toString().replace("\ufeff", "");
                parseString(cleanedResult, function(err, goodreadsResult) {
                    if ( goodreadsResult ) {

                        goodreadsResult.GoodreadsResponse.search[0].results[0].work.forEach( function(item) {
                            let newBook = {
                                gr_id: item.best_book[0].id[0]._,
                                title: item.best_book[0].title[0],
                                authors: item.best_book[0].author[0].name[0],
                                cover: item.best_book[0].image_url[0]
                                }
                            books.push(newBook);
                        });
                        res.json( books );
                    } else {
                        return res.json( [] );
                    }
                }); 
            }).catch( function(err) {
                console.log(err);
            });
   });

    // GET route /book/info/:id
    //  use the GoodReads API to get rating/synopsis
    //  about a book given its Goodreads ID
    app.get("/book/info/:id", (req, res) => {
        const bookId = req.params.id;
        let queryURL = `https://www.goodreads.com/book/show/${bookId}.xml?key=${process.env.GOODREADS_KEY}`;
console.log("/book/info/:id -- " + queryURL);        
        axios.get( queryURL )
            .then( function (result) {
       
                var cleanedResult = result.data.toString().replace("\ufeff", "");

                parseString(cleanedResult, function(err, goodreadsResult) {
                    if ( goodreadsResult ) {
                        res.json(goodreadsResult);
                    }
                });
            }).catch( function(err) {
                console.log(err);
            });
    });
}