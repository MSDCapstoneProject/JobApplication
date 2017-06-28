"use strict"

module.exports = function (sequelize, DataTypes) {
    var Topics = sequelize.define("Topics", {
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    }, {
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Topics.belongsTo(TopicGroups);
                }
            }
        });

    return Topics;
}