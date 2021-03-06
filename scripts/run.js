// HRE or Hardhat Runtime Environment is an object containing all functionalities that 
// Hardhat exposes when running a task, test, or script

// HRE does not need to be imported because when a command starts with 'npx hardhat',
// the hre object is built on the fly using 'hardhat.config.js'

const main = async () => {
  // Get wallet address of contract owner & Get random wallet address('randomPerson')
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // Compiles contract & generates necessary files(under artifacts dir) to work with contract
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // Hardhat creates a local Ethereum network specifically for this contract
  const waveContract = await waveContractFactory.deploy({
    // Fund contract with ETH from contract deployers wallet
    value: hre.ethers.utils.parseEther('0.1')
  });
  // Wait for contract to deploy on local blockchain, 'constructor' runs on deploy
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  // Prints address of person deploying contract 
  console.log("Contract deployed by:", owner.address);

  // get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  // Call 'getTotalWaves' function on contract, store # of total waves in waveCount
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  // Call 'wave' function on contract, store transaction # in waveTxn
  let waveTxn = await waveContract.wave('Test message!');
  await waveTxn.wait(); // Wait for transaction to be mined

  let waveTxn2 = await waveContract.wave('Doble trouble');
  await waveTxn2.wait();

  // Get contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  // Call 'getTotalWaves' again to check if it changed
  waveCount = await waveContract.getTotalWaves()

  // Simulate random Address interacting with contract
  waveTxn = await waveContract.connect(randomPerson).wave('Test message #2!');
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log('All waves:', allWaves)

  waveCount = await waveContract.getTotalWaves();
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