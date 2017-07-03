"use strict";

module.exports = function (sequelize, DataTypes) {
    var Topics = sequelize.define("topics", {
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING
    }, {
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Topics.belongsTo(models.TopicGroups);
                }
            }
        });

    return Topics;
}