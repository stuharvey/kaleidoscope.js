const MAX_SEED = 10000;

function createRandomSeed() {
  return Math.floor(Math.random() * MAX_SEED);
}

module.exports = {
  createRandomSeed,
  MAX_SEED
};
