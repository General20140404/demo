var http =  require('http');

function getBook(id, callback){

    // e.g. http://api.douban.com/v2/book/17604305

    var url = "http://api.douban.com/v2/book/" + id + "?fields=id,title,subtitle,alt,author,price,image,pubdate,publisher,summary";
    http.get(url, function(res) {
        var source = "";
        
        res.on('data', function(data) {
            source += data;
        });
        
        res.on('end', function() {
            var json = JSON.parse(source);
            if(callback){
                callback(json);
            }
        });
    }).on('error', function() {
        console.log("error");
    });
}

exports.getBook = getBook;

//getBook(1003078);