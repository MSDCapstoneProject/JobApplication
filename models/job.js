"use strict";

module.exports = function (sequelize, DataTypes) {
    var Jobs = sequelize.define("Jobs", {
        title: DataTypes.STRING,
        jobLocation: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        startTime: DataTypes.TIME,
        endTime: DataTypes.TIME,
        wage: DataTypes.DECIMAL(10, 2),
        description: DataTypes.STRING,
        postDate: DataTypes.DATE,
        expiryDate: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
    }, {
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Jobs.belongsTo(models.Employers);
                    Jobs.belongsTo(models.JobTypes);
                    Jobs.belongsTo(models.JobCategories);
                }
            }

        });

    return Jobs;

};