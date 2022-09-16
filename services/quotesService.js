const axios = require('axios')

async function getQuotesData(){
    const data = await axios.get('https://type.fit/api/quotes')
    const authorsToQuotes = {}

    for(const obj of data.data){
        if(!authorsToQuotes[obj.author]){
            authorsToQuotes[obj.author] = [];
        }
        authorsToQuotes[obj.author].push(obj.text);
    }
    return authorsToQuotes;
}
async function searchForAuthor(author){
    const authorsToQuotes = await getQuotesData();
    const authors = Array.from(Object.keys(authorsToQuotes));
    const authsLowerAlpha = authors.map(auth => auth.replace(/[^a-zA-Z]/g,"").toLowerCase());
    const search = author.replace(/[^a-zA-Z]/g,"").toLowerCase();
    const matchedAuthors = authsLowerAlpha.filter((auth) => auth.includes(search));
    const result = matchedAuthors.map(auth => {
        const obj = {
            author: authors[authsLowerAlpha.indexOf(auth)], 
            quotes: authorsToQuotes[ authors[authsLowerAlpha.indexOf(auth)] ]
        }
        return obj;
    });
    return result;
}
async function searchForKeywords(keywords){
    const quotes = await axios.get('https://type.fit/api/quotes')
    const matches = {}
    for(const { author, text } of quotes.data){
        for(const key of keywords){
            if(text.toLowerCase().includes(key.toLowerCase())){
                if(!matches[text]){
                    matches[text] = {'keywords': {'match': [], 'indices': []}, author}
                }
                matches[text]['keywords']['match'].push(key)
                matches[text]['keywords']['indices'].push(text.toLowerCase().indexOf(key.toLowerCase()))
            }
        }
    }
    return matches;
    
}

module.exports = { getQuotesData, searchForAuthor, searchForKeywords }