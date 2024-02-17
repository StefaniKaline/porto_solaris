/**
 * Porto Solaris: Criando uma automação para formatar dados do Google Sheets e enviar ao Storage/E-mail com Apps Script
 * Criado por: stefanikaline15@gmail.com
 */

function getToken(){
  /**
   * Function to generate an access token for the GCP project.
   * 
   * :return acessToken: Access token for the GCP project
   */
  try {
    
    const SERVICE_ACCOUNT = {
      private_key: "<CHAVE DA SERVICE ACCOUNT>",
      client_email: '<SERVICE ACCOUNT>'
    };
    // Create a new service with credentials
    const GET_STORAGE_SERVICE = () =>
      OAuth2.createService('FirestoreStorage')
        .setPrivateKey(SERVICE_ACCOUNT.private_key)
        .setIssuer(SERVICE_ACCOUNT.client_email)
        .setPropertyStore(PropertiesService.getUserProperties())
        .setCache(CacheService.getUserCache())
        .setTokenUrl('https://oauth2.googleapis.com/token')
        .setScope('https://www.googleapis.com/auth/devstorage.read_write');
      
    var service = GET_STORAGE_SERVICE();
    var accessToken = service.getAccessToken();

      //return accessToken;
      return JSON.stringify(accessToken);
    } catch (err) {
      console.log('Failed with error %s', err.message);
    }

}
// Verifica se a string é um email
function checkEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
// Envia um e-mail
function sendEmail(email){
  var template = HtmlService.createTemplateFromFile('template');
  template.values = email; // define o valor da variável values
  
  // executa o Apps Script dentro do HTML e gera um arquivo HTML
  var html = template.evaluate().getContent();
  console.log(html);
  GmailApp.sendEmail([email], 'Email gerado pela equipe Porto Solaris', '', { name: 'Email Automático', htmlBody: html });
}

// Remove os números do nome do jogador
function nameFormatter(name) {
  let newName = name.replace(/\d+/g, '');
  return newName;
}
// 
function dataformatter(data) {
  
  var newDict = {};

  for (var i = 1; i < data.length; i++) {
    line = data[i]
    if(checkEmail(line[1])) {
      if (line[2] == 'Mestre') {
        sendEmail(line[1]);
      }
      newDict[line[1]] = {
        'Nome': nameFormatter(line[3]),
        'Classe': line[2]
      };

    } else {
      console.log(line[1] + " não é um email válido.");
    }
  }

  console.log(newDict);
  return newDict;
}

// Função Principal
function main() {

  const SPREADSHEETID = '1MXCa5zHFdpoQxb8yW2QIccJzacCF-fZfCz5uBESrexI'; //id da planilha
  const SHEETNAME = 'respostas'; //nome da aba 

  const API = `https://www.googleapis.com/upload/storage/v1/b`;
  const STORAGE_BUCKET = '<NOME DO STORAGE>';
  const FILE_NAME = 'jogadores.json';
  const FILE_PATH = 'data';
  var LOCATION = encodeURIComponent(`${FILE_PATH}/${FILE_NAME}`);
  var URL = `${API}/${STORAGE_BUCKET}/o?uploadType=media&name=${LOCATION}`;
  
  var accessToken = getToken();

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEETID);
  var sheet = spreadsheet.getSheetByName(SHEETNAME);

  // Extraindo dados da planilha
  var data = sheet.getDataRange().getValues();
  
  if (data.length > 1) {
    newDict = dataformatter(data);


    var gcsDataJson = JSON.stringify(newDict, null, 2)

    //Send the data to GCS
    var options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      payload: gcsDataJson,
      muteHttpExceptions: true
    };

      var response = UrlFetchApp.fetch(URL, options);

      Logger.log('Resposta: ' + response.getContentText());
    

  
    sheet.deleteRows(2,data.length-1);

  }
}
