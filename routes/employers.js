/*
 * GET employers listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM employers',function(err,rows)
        {   
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('employers',{page_title:"Employers Information",data:rows});
         });
    });
};

exports.add = function(req, res){
  res.render('add_employers',{page_title:"Add Employer"});
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO employers set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/employers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

