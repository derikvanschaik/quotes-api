const cheerio = require('cheerio');
const axios = require('axios');

// scrapes a 'profile picture' for the given author
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

async function getAllImages(author){
    try{
        const page = await axios.get(`https://en.wikipedia.org/wiki/${author}`)
        const $ = cheerio.load(page.data);
        const imageList = [];
        $('img').each(function (_, element) {
            imageList.push( 'https:' + $(element).attr('src'));
        });
        return imageList;
    }catch(e){
        return null;
    }
}

module.exports = {getImage, getAllImages}