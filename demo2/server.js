var http = require("http"), 
    url  = require("url"), 
    path = require("path"), 
    fs   = require("fs");

var mongo = require("./mongo"),
    book = require("./book");

var mine = {
  ".css": "text/css",
  ".gif": "image/gif",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".swf": "application/x-shockwave-flash",
  ".tiff": "image/tiff",
  ".txt": "text/plain",
  ".wav": "audio/x-wav",
  ".wma": "audio/x-ms-wma",
  ".wmv": "video/x-ms-wmv",
  ".xml": "text/xml"
}; 
  
http.createServer(function (req, res) { 

    var pathname= __dirname + url.parse(req.url).pathname; 
    if (path.extname(pathname)=="") { 
        pathname+="/"; 
    } 
    if (pathname.charAt(pathname.length-1)=="/"){ 
        pathname+="index.html"; 
    } 

    //console.log(pathname)

    if(/addNewBook.do/.test(pathname)){

        var info = "";

        req.addListener('data', function(chunk){  
            info += chunk;  
        });

        req.addListener('end', function(){  
            var data = JSON.parse(info);

            mongo.insertDocument(data.id, function(err, id, collection){

                var returnJSON = {
                    success : null,
                    message : ""
                }

                if(err){
                    returnJSON.success = false;
                    returnJSON.message = err;

                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify(returnJSON)); 
                    res.end();

                    return;
                }

                book.getBook(id, function(source){

                    collection.insert(source,function(err, result){
                        if(err){
                            returnJSON.success = false;
                            returnJSON.message = err;
                        }else{
                            returnJSON.success = true;
                            returnJSON.message = "insert successfully";
                            returnJSON.data = result;
                        }

                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify(returnJSON)); 
                        res.end();
                    });

                });

                return;

                
            });

        });

    }else{
        
        fs.exists(pathname,function(exists){ 
            if(exists){
                var type = path.extname(pathname);
                if(mine[type]){
                    res.writeHead(200, {"Content-Type": mine[type]}); 
                }else{
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
                }

                fs.readFile(pathname,function (err,data){ 
                    res.end(data); 
                }); 
                
                
            } else { 
                res.writeHead(404, {"Content-Type": "text/html"}); 
                res.end("<h1>404 Not Found</h1>"); 
            } 
        });

    }
  
     
  
}).listen(8888); 
  
console.log("Server running");