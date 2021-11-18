// HRE or Hardhat Runtime Environment is object containing all fuctionality that 
// Hardhat exposes when running a task, test, or script

// HRE does not need to be imported because when a command starts with 'npx hardhat',
// the hre object is built on the fly using 'hardhat.config.js'

const main = async () => {
  // Compiles contract & generates necessary files(under artifacts dir) to work with contract
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // Hardhat creates a local Ethereum network specifically for this contract
  const waveContract = await waveContractFactory.deploy();
  // Wait for contract to deploy on local blockchain, 'constructor' runs on deploy
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
};

const runMain  = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();