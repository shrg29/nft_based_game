const Token = artifacts.require("Token");

module.exports = async function (deployer) {
 await deployer.deploy(Token, "Tamagotchiiiii", "NFT");
 let tokenInstance  = await Token.deployed();

 await tokenInstance.mint(100, 200, 1000000);
 let pet = await tokenInstance.getTokenDetails(0);
 console.log(pet);
};
