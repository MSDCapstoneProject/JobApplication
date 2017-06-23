"use strict";

module.exports = function (sequelize, DataTypes) {
    var Jobs = sequelize.define("Jobs", {
        title: DataTypes.STRING,
        jobLocation: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        startTime: DataTypes.TIME,
        endTime: DataTypes.TIME,
        wage: DataTypes.DECIMAL(10, 2),
        description: DataTypes.TEXT,
        postDate: DataTypes.DATEONLY,
        expiryDate: DataTypes.DATEONLY,
        status: DataTypes.BOOLEAN,
        views: DataTypes.INTEGER,
        totalPositions: DataTypes.INTEGER,
        filledPositions: DataTypes.INTEGER
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