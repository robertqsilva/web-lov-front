const query = require("../../services/database/query/querydb");


const getPageInfo = async (req, res) => {
  const { uuid } = req.params;

  console.log(uuid);
  
  try {
    const pageInfo = await query.getPageInfo(uuid);
    console.log(pageInfo);
    
    res.status(200).json(pageInfo);
  } catch (error) {
    console.error("Erro ao buscar as informações da página:", error);
    res.status(500).json({
      message: error.message || "Erro ao buscar as informações da página.",
    });
  }
};

module.exports = { getPageInfo };
