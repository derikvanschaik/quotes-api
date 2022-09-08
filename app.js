const express = require('express');

function createApp(quotesService, imageService){
    const app = express();
    // allow cors 
    app.use(cors());
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
    return app;
}

module.exports = createApp;