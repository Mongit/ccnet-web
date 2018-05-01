var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {        
        cotizacionesApp: [
            './wwwroot/js/site.js',
            './scripts/cotizaciones/app.ts'],
        nuevoClienteApp: [
            './scripts/clientes/appNuevo.ts'
        ],
        clientesApp: [
            './scripts/clientes/appClientes.ts'
        ],
        cotizacionesClienteApp: [
            './scripts/cotizaciones/appCotizacionesCliente.ts'
        ],
        editarClienteApp: [
            './scripts/clientes/appEditar.ts'
        ],
        presupuestosApp: [
            './scripts/cotizaciones/appPresupuestos.ts'
        ],
        proveedoresApp: [
            './scripts/proveedores/appProveedores.ts'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist/')
    },

    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        })
    ]
};
