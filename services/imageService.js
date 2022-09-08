const cheerio = require('cheerio');
const axios = require('axios');

async function getImage(author){
    try{
        const page = await axios.get(`https://en.wikipedia.org/wiki/${author}`)
        const $ = cheerio.load(page.data);
        const endURL = $('.infobox-image > a > img').attr('src');
        if(!endURL){
            return null;
        }
        return 'https:' + endURL;
    }catch(e){
        return null;
    }
}

module.exports = {getImage}