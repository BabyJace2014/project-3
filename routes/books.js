const express = require('express');
const dotenv = require("dotenv").config();    // process.env
const axios = require('axios');
const parseString = require('xml2js').parseString;

/////////////////////////////////////////////////////////////////
// Sets up the variables for GoodReads API calls in
//   /books routes
/////////////////////////////////////////////////////////////////

module.exports = function(app) {

    // POST route /book/info
    //  use the GoodReads API to get a list of books
    //  w/ details based on the title user entered
    app.post("/book/info", (req, res) => {
        let queryURL = "https://www.goodreads.com/search/index.xml";
        queryURL += "?key=" + process.env.GOODREADS_KEY;
        queryURL += "&q=" + req.body.query;
        
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


}