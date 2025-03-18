const knex = require('../config')

const registerUser = async (
  email,
  nameCasal,
  data,
  message,
  plano,
  page_uuid
) => {
  try {
    await knex("webpage").insert({
      email,
      namecasal: nameCasal,
      data,
      message,
      plano,
      page_uuid,
    });

    console.log("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw new Error("Erro ao realizar o cadastro no banco de dados.");
  }
};


async function savePhotoUrls(files, page_uuid) {
  const photoUrls = files.map((file) => ({
    photo_url: file.fileUrl,
    page_uuid, 
  }));

  await knex("photos").insert(photoUrls);

  return photoUrls;
}

const getPageInfo = async (uuid) => {
  try {
    // Buscar as informações do usuário e do plano pela chave UUID
    const pageInfo = await knex("webpage").where("page_uuid", uuid).first(); // Retorna apenas o primeiro registro encontrado

    if (!pageInfo) {
      throw new Error("Página não encontrada");
    }

    // Buscar as fotos associadas ao UUID
    const photos = await knex("photos")
      .where("page_uuid", uuid)
      .select("photo_url");

    // Retornar as informações da página e as URLs das fotos
    return {
      nameCasal: pageInfo.namecasal,
      message: pageInfo.message,
      data: pageInfo.data,
      photos: photos.map((photo) => photo.photo_url),
    };
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar informações da página");
  }
};

module.exports = { savePhotoUrls, registerUser, getPageInfo };

