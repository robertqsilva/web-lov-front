const { v4: uuidv4 } = require("uuid");
const { createPayment, checkPayment } = require("../../services/gateway/index");
const { uploadFiles, uploadQrCodeToS3 } = require("../../services/aws-sdk/index");
const {
  savePhotoUrls,
  registerUser,
} = require("../../services/database/query/querydb");
const {
  sendConfirmationEmail,
  envioEmailConfirmaçãoCadastro,
} = require("../../services/mail/envio");
const QRCode = require("qrcode");
const createPageWebLove = async (req, res) => {
  const { email, nameCasal, data, message, plano } = req.body;

  const files = req.files;


  const transactionAmount =
    plano === "basic"
      ? 9.99
      : plano === "love"
      ? 14.99
      : plano === "amorEterno"
      ? 19.99
      : "";

  const description = `Plano ${plano.charAt(0).toUpperCase() + plano.slice(1)}`;

  const page_uuid = uuidv4();

  try {
    const { qr_code, qr_code_base64, preferenceId } = await createPayment(
      email,
      transactionAmount,
      description
    );

    res.status(201).json({
      message: "Pagamento criado!",
      qr_code,
      qr_code_base64,
      transactionAmount
    });

    let paymentConfirmed = false;

    const checkInterval = setInterval(async () => {
      const paymentStatus = await checkPayment(preferenceId);

      if (paymentStatus === "approved") {
        paymentConfirmed = true;
        clearInterval(checkInterval);

        await registerUser(email, nameCasal, data, message, plano, page_uuid);

        const uploadedFiles = await uploadFiles(files);
        await savePhotoUrls(uploadedFiles, page_uuid);

          const linkPagina = `127.0.0.1:5500/publi/index.html?rgb=${page_uuid}`;

          try {
            const linkqrcode = await QRCode.toDataURL(linkPagina, {
              errorCorrectionLevel: "H",
            });

             const qrCodeUrl = await uploadQrCodeToS3(linkqrcode, page_uuid);
            
             console.log(qrCodeUrl);
             
            await envioEmailConfirmaçãoCadastro(nameCasal, qrCodeUrl, email);
          } catch (err) {
            console.error("Erro ao gerar QR Code:", err);
          }

        console.log("Pagamento concluido");
      }
    }, 10000);
  } catch (error) {
    console.error("Erro ao processar pagamento ou cadastro:", error);
    res.status(500).json({
      message: "Erro ao processar pagamento ou cadastro.",
      error: error.message,
    });
  }
};

module.exports = { createPageWebLove };
