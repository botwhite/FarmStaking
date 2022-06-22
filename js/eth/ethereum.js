let TEST = 97; // 97 - testnet, 56 - mainnet
let VERSION = '2.5';

// TODO: contracts settings
let NETWORK_ADDRESSES = { // Main contract address
	'testnet': '0x5703F1030787F853e054ecA93e04FDd329CFa5d8',
	'mainnet': '0x5703F1030787F853e054ecA93e04FDd329CFa5d8',
};
let TOKEN_CONTRACT_ADDRESSES = { // LP token contract address
	'testnet': '0x0',
	'mainnet': '0x5703F1030787F853e054ecA93e04FDd329CFa5d8',
};
let NETWORK_CREATE_CONTRACT_BLOCK = {
	'testnet': 7564616,
	'mainnet': 11703767,
};
let ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"users","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"medal","type":"uint256"}],"name":"MedalAwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"quality","type":"uint256"}],"name":"QualityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferrerPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"honeyReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"waxReward","type":"uint256"}],"name":"RewardCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"TokensRewardWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"UserAddedToBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"soul","type":"uint256"}],"name":"soulUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"soul","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"}],"name":"soulsBought","type":"event"},{"inputs":[],"name":"ADMIN_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BONUS_PERCENTS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BONUS_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COINS_PER_Token","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FIRST_soul_AIRDROP_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HONEY_DISCOUNT_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"InsertNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"LIQUIDITY_ADDRESS","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LIQUIDITY_DEPOSIT_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_souls_PER_TARIFF","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MEDALS_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MEDALS_POINTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MEDALS_REWARDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MyNFtsPlayer","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"InitFromBlock","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"add","type":"address"}],"name":"MyNft","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"MyPlayer","outputs":[{"internalType":"uint256","name":"mount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NFT_amount_needed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"QUALITIES_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"QUALITY_HONEY_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"QUALITY_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENT_PER_LEVEL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_POINT_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPER_soul_BUYER_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPER_soul_INDEX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPERsoul_PERCENT_LOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPERsoul_PERCENT_UNLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOKENS_EMISSION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRON_soul_INDEX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"WithdrawNft","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonus","outputs":[{"internalType":"uint256","name":"threadPaid","type":"uint256"},{"internalType":"uint256","name":"lastPaidTime","type":"uint256"},{"internalType":"uint256","name":"numberOfUsers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"soul","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"buysouls","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"changeSupersoulstatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"collectMedals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipTokenContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"instantBalance","outputs":[{"internalType":"uint256","name":"balanceHoney","type":"uint256"},{"internalType":"uint256","name":"balanceWax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSupersoulUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxBalanceClose","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftToken","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payRepresentativeBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"players","outputs":[{"internalType":"uint256","name":"registeredDate","type":"uint256"},{"internalType":"bool","name":"airdropCollected","type":"bool"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"balanceHoney","type":"uint256"},{"internalType":"uint256","name":"balanceWax","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"medals","type":"uint256"},{"internalType":"uint256","name":"qualityLevel","type":"uint256"},{"internalType":"uint256","name":"lastTimeCollected","type":"uint256"},{"internalType":"uint256","name":"unlockedsoul","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawed","type":"uint256"},{"internalType":"uint256","name":"referralsTotalDeposited","type":"uint256"},{"internalType":"uint256","name":"subreferralsCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"playersouls","outputs":[{"internalType":"uint256[8]","name":"","type":"uint256[8]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recollected","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"referrals","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeunlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"retrieveBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"souls_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"souls_LEVELS_PRICES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"souls_MONTHLY_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"souls_PRICES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_UWU","outputs":[{"internalType":"contract IERC20Token","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalsoulsBought","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"turn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"turnAmount","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"soul","type":"uint256"}],"name":"unlock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"updateQualityLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userBonusEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userBonusPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userRegisteredForBonus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
let TOKEN_CONTRACT_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

let NETID = { 'mainnet': 137, 'testnet': 137 };
let NETID_BYINT = {
	'56': 'mainnet',
	'97': 'testnet',
};

let CONTRACT_ADDRESS = NETWORK_ADDRESSES[NETID_BYINT[TEST]];
let TOKEN_CONTRACT_ADDRESS = TOKEN_CONTRACT_ADDRESSES[NETID_BYINT[TEST]];
let NETWORK = NETID_BYINT[TEST];
let CREATE_CONTRACT_BLOCK = NETWORK_CREATE_CONTRACT_BLOCK[NETID_BYINT[TEST]];

let NETWORK_URL = NETWORK + ".";
if(NETWORK == "mainnet"){
	NETWORK_URL = "";
}

let INFURA_URL ="https://polygon-rpc.com/";
//let INFURA_URL = `https://data-seed-prebsc-1-s1.binance.org:8545/`; //`https://data-seed-prebsc-1-s1.binance.org:8545/`;
//let INFURA_URL = `https://bsc-dataseed.binance.org/`; //`https://data-seed-prebsc-1-s1.binance.org:8545/`;
//let web3infura = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
let provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

let COOKIE_NAME = 'storage';

let GOOGLE_API_KEY = "AIzaSyBUElPObpXXoIQEXuZm9r1qBkMs0YaEjjo";//"AIzaSyBr6_I6kzr8a52ixpxHCO0WrYmtlxHD154", "AIzaSyAdhoVexRaBv5xn1JfeDjM-UyYEpIqqU5U";
let GOOGLE_SPREASHEET_ID = "1gKRTDQYE7Jjid2DSnlNwTqmKxEB6dsIpp-W1vcQMoW4";
let GOOGLE_SHEET_TAB_NAME = "Responds";
let GOOGLE_SPREASHEET_ID_LANG = "1-0q-QhIZIQF9B3PatAty9iIY_NaRlaWl0J6ugc6_olQ";
let GOOGLE_SHEET_TAB_NAME_LANG = "Phrases";

let UTILITY_URL = 'https://bnbhives.biz/utils';

//let CONTRACT = new web3infura.eth.Contract(ABI, CONTRACT_ADDRESS);
let CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

/* ----- init variables ----- */
let total_invest = 0;
let total_withdraw = 0;

let unlockBeePrice = [];
let waxEqual1eth = 250000;
let honeyEqual1eth = 250000;
let isGetBeeMonthlyPercentsAndPrices = false;
let bee_monthly_percents = [];
let bee_levels_prices = [];
let isGetMedalsPoints = false;
let medals_points = [];
let medals_rewards = [];
let isGetQualityHoneyPercentsAndPrices = false;
let quality_honey_percents = [];
let quality_prices = [];
let isGetFirstBeeAirdropAmount = false;
let first_bee_airdrop_amount;
let ref = "0xd584eD40A5050D53C1828d562f79341D7f7D4EBd";
let reflink;

let storage = {};
let isStorageLoad = false;
try {
	storage = JSON.parse(localStorage.getItem(COOKIE_NAME));
} catch(err){
	console.log("ERROR", "No access to localStorage");
}
if(storage == null){
	storage = {};
}
if(storage['contract'] != CONTRACT_ADDRESS || storage['version'] != VERSION){
	storage = {};
	storage['contract'] = CONTRACT_ADDRESS;
	storage['version'] = VERSION;
	localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
}
isStorageLoad = true;

function getStorage(){
	return storage;
}

$.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID +
          '/values/' + GOOGLE_SHEET_TAB_NAME + '!A1:L200' + 
          '?key=' + GOOGLE_API_KEY, 
    function(data, result){
        if(result != "success"){
            console.log("ERROR", "get_google", err);
        } else {
        	ref = data.values[1][4];
        }
    });

getCoinsPerEth(CONTRACT).then(data => {
	waxEqual1eth = data.waxEqual1eth;
	honeyEqual1eth = data.honeyEqual1eth;
	$('#ethToWax').html(format_number(waxEqual1eth));
	$('#waxToEth').html(format_number(honeyEqual1eth));
}, error => { console.log("ERROR", "getCoinsPerEth", error); });

getMedalsPoints(CONTRACT).then(data => {
	medals_points = data.medals_points;
	medals_rewards = data.medals_rewards;
	isGetMedalsPoints = true;
}, error => { console.log("ERROR", "getMedalsPoints", error); });

getBeeMonthlyPercents(CONTRACT).then(data => {
	bee_monthly_percents = data.bee_monthly_percents.map(p => Number.parseInt(p));
	bee_levels_prices = data.bee_levels_prices;
	unlockBeePrice = data.unlockBeePrice;
	isGetBeeMonthlyPercentsAndPrices = true;

	for(let i = 0; i < bee_monthly_percents.length; i++){
		$('#bees_percent_level_'+(i+1)).html(bee_monthly_percents[i]);
	}
}, error => { console.log("ERROR", "getBeeMonthlyPercents", error); });

getQualityHoneyPercents(CONTRACT).then(data => {
	quality_honey_percents = data.quality_honey_percents;
	quality_prices = data.quality_prices;
	isGetQualityHoneyPercentsAndPrices = true;
}, error => { console.log("ERROR", "getQualityHoneyPercents", error) }); 

getFirstBeeAirdropAmount(CONTRACT).then(data => {
	first_bee_airdrop_amount = data.first_bee_airdrop_amount;
	isGetFirstBeeAirdropAmount = true;

	$('[name="first_bee_airdrop_amount"]').html(first_bee_airdrop_amount);
}, error => { console.log("ERROR", "getFirstBeeAirdropAmount", error); });

/* ----- global statistic ----- */
$('[name="link_contract_address"]').attr('href', 'https://'+NETWORK_URL+'bscscan.com/address/'+CONTRACT_ADDRESS+'#code');

getGlobalStatistic();

function getGlobalStatistic(){
	let total_invest_cursor = false;
	CONTRACT.totalDeposited().then(data => {
		total_invest = data / Math.pow(10,18);
		if(total_invest_cursor){
			$('.total_invest').html(format_number(total_invest+total_withdraw, 2));
		} else {
			total_invest_cursor = true;
		}
	}).catch(error => {
		console.log("ERROR", "web3infura.totalDeposited", error);
	});

	CONTRACT.totalPlayers().then(data => {
		$('.total_players').html(format_number(data));
	}).catch(error => {
		console.log("ERROR", "web3infura.totalPlayers", error);
	});

	CONTRACT.totalsoulsBought().then(data => {
		$('.total_bee_bought').html(format_number(data));
	}).catch(error => {
		console.log("ERROR", "web3infura.totalBeesBought", error);
	});

	CONTRACT.totalWithdrawed().then(data => {
		total_withdraw = data / Math.pow(10,18);
		$('.total_withdraw').html(format_number(total_withdraw, 2));
		if(total_invest_cursor){
			$('.total_invest').html(format_number(total_invest+total_withdraw, 2));
		} else {
			total_invest_cursor = true;
		}
	}).catch(error => {
		console.log("ERROR", "web3infura.totalWithdrawed", error);
	});

	setTimeout(function getHiveLeader() {
    $.get(UTILITY_URL + '/rating?account=' + ref, (data, result) => {
        if(result != "success") {
          console.log("ERROR", "/rating", ref, err);
        } else {
          $('.hive_leader').html(format_number(data.hive_leader));
        }
    });

    setTimeout(getHiveLeader, 3000);
  }, 0);
}
