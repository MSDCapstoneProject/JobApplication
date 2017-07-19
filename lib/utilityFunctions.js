
var utilityFunctions = {};

function formatInternalCode(description){
    var internalCode = description.replace(" ", "_");
    return internalCode.toUpperCase();
}

utilityFunctions.formatInternalCode = formatInternalCode;
module.exports = utilityFunctions;