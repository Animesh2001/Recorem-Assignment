module.exports.home = function(req,res){
    return res.render('home',{
        title: "Homepage"  
//Title is passed to the template and can be accessed there as <%= title %>
    });
}

