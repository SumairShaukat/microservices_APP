import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
 const hashedPass = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS); 
  return await bcrypt.hash(password, salt);
};
const comparePasses = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { comparePasses, hashedPass };
