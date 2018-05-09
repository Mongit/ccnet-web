import KoBinder = require("./../utils/KoBinder");
import ReciboModel = require("./ReciboModel");

$(async function () {
    KoBinder.bind($("#reciboModel"), new ReciboModel());
});