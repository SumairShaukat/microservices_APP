import bcrypt from "bcrypt";

const hashedPass = async (password) => {
  bcrypt.genSalt(password, 10);
};
const comparePasses = async (password, hash) => {
  await bcrypt.compare(password, hash);
};

export { comparePasses, hashedPass };
