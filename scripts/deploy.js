// scripts/deploy.js
async function main() {
  const Zodiac = await ethers.getContractFactory("JapaneseZodiac");
  const zodiac = await Zodiac.deploy();
  await zodiac.waitForDeployment();
  console.log("JapaneseZodiac deployed to:", await zodiac.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
