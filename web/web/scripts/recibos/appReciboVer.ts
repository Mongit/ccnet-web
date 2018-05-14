import KoBinder = require("./../utils/KoBinder");
import ReciboVerModel = require("./ReciboVerModel");

$(async function () {
    KoBinder.bind($("#reciboVerModel"), new ReciboVerModel());
});