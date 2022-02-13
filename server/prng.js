function randomNumber(lowerBound, upperBound) {
  return (
    Math.floor(Math.random() * parseInt(upperBound)) + parseInt(lowerBound)
  );
}

module.exports = randomNumber;
