# Porto Solaris

Projeto de automação para formatar dados do Google Sheets e enviar ao Storage/E-mail utilizando Google Apps Script.

## Descrição

Este projeto inclui um conjunto de funções no Google Apps Script para extrair dados de uma planilha do Google Sheets, formatá-los conforme necessário, e então enviá-los para um bucket do Google Cloud Storage ou por e-mail, usando uma conta de serviço do Google Cloud Platform para autenticação. Além de um template de e-mail

## Funções

### `getToken()`

Gera um token de acesso para o projeto GCP.

- **Retorno:** Token de acesso para o projeto GCP como uma string.

### `checkEmail(email)`

Verifica se a string fornecida é um endereço de e-mail válido.

- **Parâmetros:**
  - `email`: String a ser verificada.
- **Retorno:** `true` se a string for um e-mail válido, `false` caso contrário.

### `sendEmail(email)`

Envia um e-mail usando um template HTML.

- **Parâmetros:**
  - `email`: Endereço de e-mail do destinatário.

### `nameFormatter(name)`

Remove os números do nome fornecido.

- **Parâmetros:**
  - `name`: Nome a ser formatado.
- **Retorno:** Nome formatado.

### `dataformatter(data)`

Formata os dados extraídos da planilha do Google Sheets.

- **Parâmetros:**
  - `data`: Dados brutos extraídos da planilha.
- **Retorno:** Dicionário com os dados formatados.

### `main()`

Função principal que coordena a extração de dados, formatação e envio para o Google Cloud Storage ou por e-mail.

## Configuração

Para usar este script, você precisa configurar algumas variáveis no código:

- `SERVICE_ACCOUNT.private_key`: Chave privada da conta de serviço.
- `SERVICE_ACCOUNT.client_email`: E-mail da conta de serviço.
- `SPREADSHEETID`: ID da planilha do Google Sheets.
- `SHEETNAME`: Nome da aba da planilha de onde os dados serão extraídos.
- `STORAGE_BUCKET`: Nome do bucket do Google Cloud Storage onde os dados serão armazenados.
- `FILE_NAME`: Nome do arquivo JSON a ser criado.
- `FILE_PATH`: Caminho no bucket do Google Cloud Storage onde o arquivo será salvo.

## Como Usar

1. Abra o editor de script do Google Sheets onde você deseja implementar este projeto.
2. Cole o código fornecido.
3. Ajuste as variáveis de configuração conforme descrito acima.
4. Execute a função `main()` para iniciar o processo de automação.

## Créditos

Criado por: stefanikaline15@gmail.com
