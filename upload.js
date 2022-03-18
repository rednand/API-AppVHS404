require("dotenv/config");
const { request } = require("express");
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");

const getFileName = function (file) {
  return file.originalname ;
};

const azureStorage = new MulterAzureStorage({
  azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  containerSecurity: "blob",
  fileName: getFileName,
});

const upload = multer({ storage: azureStorage });

module.exports = upload;
