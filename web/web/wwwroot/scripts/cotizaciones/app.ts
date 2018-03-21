import KoBinder = require("./../utils/KoBinder");
import CotizacionModel = require("./CotizacionModel");

$(async function () {
    KoBinder.bind($("#empresaForm"), new CotizacionModel());    
});