import KoBinder = require("./../utils/KoBinder");
import RecibosModel = require("./RecibosModel");

$(async function () {
    KoBinder.bind($("#recibosModel"), new RecibosModel());
});