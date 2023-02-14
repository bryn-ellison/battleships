const shipFactory = (length) => {
  let hits = 0;
  const isSunk = () => {
    if (hits >= length) {
      return true;
    } else {
      return false;
    }
  };
  const hit = () => {
    hits++;
  };

  return { length, hit, isSunk };
};

module.exports = { shipFactory };
