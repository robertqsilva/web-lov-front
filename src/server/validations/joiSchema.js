const Joi = require("joi");

const schema = {
  createWebPage: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "O e-mail deve ser válido.",
      "any.required": "O campo e-mail é obrigatório.",
    }),

    nameCasal: Joi.string().required().messages({
      "any.required": "O nome do casal é obrigatório.",
    }),

    data: Joi.date().iso().required().messages({
      "date.base": "A data deve estar em um formato válido (ISO 8601).",
      "any.required": "A data é obrigatória.",
    }),

    message: Joi.string().max(1000).optional().messages({
      "string.max": "A mensagem pode ter no máximo 1000 caracteres.",
    }),

    plano: Joi.string()
      .valid("basic", "love", "amorEterno")
      .required()
      .messages({
        "any.only": 'O plano deve ser "basico", "intermediario" ou "premium".',
        "any.required": "O campo plano é obrigatório.",
      }),
  }),
};

module.exports = schema;
