"use strict";

module.exports = function(sequelize,DataTypes){
    var JobSeekerSubscriptions = sequelize.define("jobseekersubscriptions",{
        status: DataTypes.BOOLEAN
    },{
        paranoid: true,
        classMethods: {
            associate: function(models){
                JobSeekerSubscriptions.belongsTo(models.JobSeekers);
                JobSeekerSubscriptions.belongsTo(models.Topics);
            }
        }
    });

    return JobSeekerSubscriptions;
}