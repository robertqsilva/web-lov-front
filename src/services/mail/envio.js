const compiladorHtml = require("./compilador");
const transportador = require("./transportador");

async function envioEmailConfirmaçãoCadastro(nome, qrCode, email) {
  const path = "./src/template/tokencadastro.html"; 
  const htmlPage = await compiladorHtml(path, { qrCode });

  await transportador.sendMail({
    from: `"Web Love" <silvarobert4321@gmail.com>`, 
    to: `${nome} <${email}>`, 
    subject: "Criação de pagina web", 
    html: htmlPage, 
  });
}

module.exports = { envioEmailConfirmaçãoCadastro };
