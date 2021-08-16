var connectionstring={
    server : "DESKTOP-HJEPHAP",
    user:"sa",
    password:"",
    database:"sam",
    port:1433,
    options:{
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
}
module.exports.connectionstring=connectionstring;