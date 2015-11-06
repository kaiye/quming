"use strict";

let Q = require('q');
let request = Q.denodeify(require('request'));
let $ = require('cheerio');

function sendRequest(url) {
  let response = request({
    uri: url,
    timeout: 5000,
    method: 'GET'
  });
  return response.then( (req) =>{
    let resp = req[0];
    if (resp.statusCode >= 300) {
      throw new Error('Server responded status code ' + resp.statusCode);
    } else {
      return resp.body.toString();
    }
  });
}

function SearchSong(searchOption, callback){
  let searchResult = [];
  //默认最大页数是 114，为了不给人添麻烦，debug 模式设置小一点
  let pagesCount = searchOption.debug && searchOption.debug.num ?  searchOption.debug.num : 114;
  let pagesRequest = Array.apply(null, {length: pagesCount}).map(function(item,i){
    let url = 'http://so.gushiwen.org/mingju/Default.aspx?p=' + (i + 1) + '&c=&t=';

     return sendRequest(url).then(function(html){
        let parsedHTML = $.load(html);

        parsedHTML('.sons').each(function(){
          let a = $(this).children('a');
            let text = a.eq(0).text();
            let searchText = searchOption.noLastWord ? new RegExp( searchOption.text + '(?!。|，)') : searchOption.text;
            if(text.match(searchText)){
              searchResult.push(text + a.eq(1).text());
            }
        }); 
    });   
  });

  return Q.all(pagesRequest).then(() => searchResult);
}

module.exports = SearchSong ;
