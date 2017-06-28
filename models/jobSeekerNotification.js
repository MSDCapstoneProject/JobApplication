"use strict";

module.exports = function(sequelize,DataTypes){
    var JobSeekerNotifications = sequelize.define("JobSeekerNotifications",{
        status: DataTypes.BOOLEAN
    },{
        paranoid: true,
        classMethods: {
            associate: function(models){
                JobSeekerNotifications.belongsTo(models.JobSeekers);
                JobSeekerNotifications.belongsTo(models.Topics);
            }
        }
    });

    return JobSeekerNotifications;
}