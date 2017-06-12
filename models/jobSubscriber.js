"use strict";

module.exports = function(sequelize,DataTypes){
    var JobSubscribers = sequelize.define("JobSubscribers",{
        applicationStatus: DataTypes.STRING,
        appliedOn: DataTypes.DATEONLY
    },{
        paranoid : true,
        classMethods : {
            associate: function (models){
                JobSubscribers.belongsTo(models.Employers);
                JobSubscribers.belongsTo(models.JobSeekers);
                JobSubscribers.belongsTo(models.Jobs);
            }
        }
    });

    return JobSubscribers;

}