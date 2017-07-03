"use strict";

module.exports = function(sequelize,DataTypes){
    var JobApplications = sequelize.define("jobapplications",{
        appliedOn: DataTypes.DATEONLY
    },{
        paranoid : true,
        /* classMethods : {
            associate: function (models){
                JobApplications.belongsTo(models.Employers);
                JobApplications.belongsTo(models.JobSeekers);
                JobApplications.belongsTo(models.Jobs);
                JobApplications.belongsTo(models.JobApplicationStatuses)
            }
        } */
    });

    return JobApplications;

}