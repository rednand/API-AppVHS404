require("dotenv/config");
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");

const azureStorage = new MulterAzureStorage({
  azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  containerSecurity: "blob",
});

const upload = multer({ storage: azureStorage });

module.exports = upload;
