qs = require('querystring')
var search = 's=123&limit=100&offset=0&type=song'
var res = qs.parse(search);
//console.log(res)
let query = {}
// query = qs.parse(query);
// query = qs.stringify(query)
console.log(res)
