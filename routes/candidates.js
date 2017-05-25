/*
 * GET users listing.
 */

var status = require('./resStatus');

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM candidates',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('candidates',{page_title:"Candidates",data:rows});

         });
         //console.log(query.sql);
    });
  
};

/*Save the candidate*/
exports.save = function(req,res){
    var postData = req.body;

    if(postData.method == "add_candidate"){
        console.log("reached here");
    }

    var respone ={};
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO candidates set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/candidates');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};