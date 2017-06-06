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
        postDate: DataTypes.date,
        expiryDate: DataTypes.date,
        status: DataTypes.BOOLEAN,
    }, {
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Jobs.belongsTo(models.employer);
                    Jobs.belongsTo(models.jobTypes);
                    Jobs.belongsTo(models.jobCategories);
                }
            }

        });

    return Jobs;

};