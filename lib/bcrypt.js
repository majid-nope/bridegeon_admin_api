const bcrypt = require("bcrypt");

const bcryptTool = {
  GenHash: (data, round) => {
    const genData  = bcrypt.hash(data, round);
    console.log(genData)
    return genData
  },
  comparingHash: (data, hashedData) => bcrypt.compare(data, hashedData),
};

module.exports = { bcryptTool };
