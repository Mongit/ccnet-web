import KoBinder = require("./../utils/KoBinder");
import StockListModel = require("./StockListModel");

$(async function () {
    KoBinder.bind($("#stockListModel"), new StockListModel());
});