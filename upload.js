// //não utilizado por não ter inscrição paga no Azure
// require("dotenv/config");
// const { request } = require("express");
// const multer = require("multer");
// const MulterAzureStorage = require("multer-azure-storage");

// const getFileName = function (file) {
//   var data = new Date(),
//     dia = data.getDate().toString().padStart(2, "0"),
//     mes = (data.getMonth() + 1).toString().padStart(2, "0"),
//   data = dia + "-" + mes + "-" + ano;

//   console.log(data);

//   return file.originalname + data;
// };

// const azureStorage = new MulterAzureStorage({
//   azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
//   azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
//   containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
//   containerSecurity: "blob",
//   fileName: getFileName,
// });

// const upload = multer({ storage: azureStorage });

// module.exports = upload;
