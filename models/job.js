"use strict";
var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    var Jobs = sequelize.define("Jobs", {
        title: DataTypes.STRING,
        jobLocation: DataTypes.STRING,
        startDate:{
            type: DataTypes.DATEONLY,
            get: function(){
                return moment(this.getDataValue('startDate')).format('YYYY-MM-DD')
            }
        } ,
        endDate:{
            type: DataTypes.DATEONLY,
            get: function(){
                return moment(this.getDataValue('endDate')).format('YYYY-MM-DD')
            }
        } ,
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