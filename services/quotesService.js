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

module.exports = { getQuotesData }