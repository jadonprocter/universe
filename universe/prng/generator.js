const fs = require("fs");

path_prng = "./ui.txt"; // PUT THE FILE YOU WANT TO WATCH HERE
fs.watchFile(
  path_prng,
  { persistent: true, interval: 1000 },
  async function () {
    const max = 10000; // PUT MAX VALUE HERE
    const min = 1; // PUT MIN VALUE HERE
    fileRead = fs.readFileSync(path_prng);
    if (fileRead.toString() == "get") {
      randomNum =
        Math.round((Math.random() * (max - min + 1) + min) * 100) / 100; // ROUNDS A NUMBER TO TWO DECIMAL PLACES
      fs.writeFileSync(path_prng, randomNum.toString());
    }
  }
);
