const { Payment, MercadoPagoConfig } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_GATEWAY,
});
const paymentOn = new Payment(client);

const createPayment = async (email, transaction_amount, description) => {

  const createPaymentPix = await paymentOn.create({
    body: {
      transaction_amount,
      description,
      payment_method_id: "pix",
      date_of_expiration: new Date(
        new Date().getTime() + 10 * 60 * 1000
      ).toISOString(),
      payer: {
        email,
      },
      notification_url: "https://seu-servidor.com/mercadolivre/notification",
    },
  });

  try {
    const {
      id: preferenceId,
      point_of_interaction: {
        transaction_data: { qr_code, qr_code_base64 },
      },
    } = createPaymentPix;

    return { qr_code, qr_code_base64, preferenceId };
  } catch (error) {
    console.error("Erro ao gerar pagamento:", error);
    throw new Error("Erro ao gerar o pagamento.");
  }
};

async function checkPayment(id_payment) {
  const statusPayment = await paymentOn.get({
    id: id_payment,
  });

  return statusPayment.status;
}

module.exports = { createPayment, checkPayment };