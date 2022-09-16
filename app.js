const express = require('express');
const cors = require('cors');

function createApp(quotesService, imageService){
    const app = express();
    // allow cors 
    app.use(cors({origin: '*'}));
    // routes
    app.get('/', async (req, res) =>{
        const authorToQuotes = await quotesService.getQuotesData();
        res.send(authorToQuotes);
    })
    app.get('/:author', async (req, res) => {
        const author = req.params.author;
        const quotes = await quotesService.getQuotesData();
        const image = await imageService.getImage(author);
        res.send({author, quotes: quotes[author], image});
    })
    app.get('/search/:author', async (req, res) => {
        const author = req.params.author;
        const search = author.replace(/[^a-zA-Z]/g,"");
        if(search === ''){
            res.send({authors: []});
        }else{
            const authors = await quotesService.searchForAuthor(search);
            res.send({authors});
        }
    })
    app.get('/keyword-search/:keywords', async (req, res) => {
        const keywords = req.params.keywords.split("-");
        const matches = await quotesService.searchForKeywords(keywords);
        res.send(matches);
    })
    return app;
}

module.exports = createApp;