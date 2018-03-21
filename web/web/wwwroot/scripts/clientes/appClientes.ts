import KoBinder = require("./../utils/KoBinder");
import ClientesModel = require("./ClientesModel");

$(async function () {
    KoBinder.bind($("#clientesForm"), new ClientesModel());
})