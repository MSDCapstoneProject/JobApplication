"user strict";

module.exports = function (sequelize, DataTypes) {
    var JobSeekerTokens = sequelize.define("jobseekertokens", {
        token: DataTypes.STRING
    }, {
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    JobSeekerTokens.belongsTo(models.JobSeekers);
                }
            }
        });

    return JobSeekerTokens;
}