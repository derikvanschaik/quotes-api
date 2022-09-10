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

module.exports = { getQuotesData, searchForAuthor }