"user strict";

module.exports = function(sequelize,DataTypes){
    var UserTokens = sequelize.define("UserTokens",{
        token: DataTypes.STRING
    },{
        paranoid : true
    });

    return UserTokens;
}