const BNB_PRICE = 580.01;
const INITIAL_TOKEN_PRICE = 0.03;
const BASIC_TOKEN_ADDRESS = "0xC44d660Ed9B27FB987B870E6C34EF04E0d9aA8d5"; // Project token contract address
let BASIC_TOKEN_CONTRACT = undefined;

$('#stakeBtn').on('click', async () => {
  let amountStr = $('#amountToStake').val();
  let amount = Number.parseFloat(amountStr);
  console.log("AMOUNT TO STAKE:", amount);
  if (amount <= 0) {
    $('[name="tx-info-fail"]').show();
    $('#tx-info-fail-img').show();

    $('#tx-info').flythat("show");

    return;
  }

  let gasPrice = 10 * Math.pow(10, 9);

  if (INTERACT_CONTRACT === undefined) {
    providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
    INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
  }

  if (TOKEN_CONTRACT === undefined) {
    providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
    TOKEN_CONTRACT = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, providerSubscribe.getSigner());
  }

  let allowance = await TOKEN_CONTRACT.allowance(current_account, CONTRACT_ADDRESS);
  console.log("ALLOWANCE:", allowance);
  let wait = false;
  if (allowance._hex == "0x00") { // No allowance
    wait = true;
    await TOKEN_CONTRACT.approve(CONTRACT_ADDRESS, ethers.BigNumber.from(2).pow(256).sub(1));
  }

  setTimeout(function callStaking() {
    INTERACT_CONTRACT.stake(
      ethers.utils.parseEther(amountStr),
      {
        from: current_account,
        gasPrice
      })
      .then(txn => {
        $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
        $('[name="tx-info-success"]').show();
        $('#tx-info-success-img').show();
        $('[name="tx-info-fail"]').hide();
        $('#tx-info-fail-img').hide();

        $('#tx-info').flythat("show");
    }).catch(err => {
      console.log(err);
      $('[name="tx-info-success"]').hide();
      $('#tx-info-success-img').hide();
      $('[name="tx-info-fail"]').show();
      $('#tx-info-fail-img').show();

      $('#tx-info').flythat("show");
    });
  }, wait ? 5000 : 100);
});

$('#unstakeBtn').on('click', async () => {
  let amountStr = $('#amountToUnstake').val();
  let amount = Number.parseFloat(amountStr);
  console.log("AMOUNT TO UNSTAKE:", amount);
  if (amount <= 0) {
    $('[name="tx-info-fail"]').show();
    $('#tx-info-fail-img').show();

    $('#tx-info').flythat("show");

    return;
  }

  let gasPrice = 10 * Math.pow(10, 9);

  if (INTERACT_CONTRACT === undefined) {
    providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
    INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
  }

  INTERACT_CONTRACT.unstake(
    ethers.utils.parseEther(amountStr),
    {
      from: current_account,
      gasPrice
    })
    .then(txn => {
      $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
      $('[name="tx-info-success"]').show();
      $('#tx-info-success-img').show();
      $('[name="tx-info-fail"]').hide();
      $('#tx-info-fail-img').hide();

      $('#tx-info').flythat("show");
  }).catch(err => {
    console.log(err);
    $('[name="tx-info-success"]').hide();
    $('#tx-info-success-img').hide();
    $('[name="tx-info-fail"]').show();
    $('#tx-info-fail-img').show();

    $('#tx-info').flythat("show");
  });
});

$('#collect_tokens_button').on('click', async () => {
  let gasPrice = 10 * Math.pow(10, 9);

  if (INTERACT_CONTRACT === undefined) {
    providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
    INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
  }

  INTERACT_CONTRACT.withdrawTokensReward(
    {
      from: current_account,
      gasPrice
    })
    .then(txn => {
      $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
      $('[name="tx-info-success"]').show();
      $('#tx-info-success-img').show();
      $('[name="tx-info-fail"]').hide();
      $('#tx-info-fail-img').hide();

      $('#tx-info').flythat("show");
  }).catch(err => {
    console.log(err);
    $('[name="tx-info-success"]').hide();
    $('#tx-info-success-img').hide();
    $('[name="tx-info-fail"]').show();
    $('#tx-info-fail-img').show();

    $('#tx-info').flythat("show");
  });
});

$("#addFlipTokenToMM").on('click', async (event) => {
  event.preventDefault();

  const tokenAddress = TOKEN_CONTRACT_ADDRESS;
  const tokenSymbol = 'NECLP';
  const tokenDecimals = 18;
  //const tokenImage = '...';

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          //image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
});

$("#addTokenToMM").on('click', async (event) => {
  event.preventDefault();

  const tokenAddress = BASIC_TOKEN_ADDRESS;
  const tokenSymbol = 'NEC';
  const tokenDecimals = 18;
  //const tokenImage = '...';

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          //image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
});

setTimeout(async function updateStakingStats() {
  let currentAddress = current_account;
  if (currentAddress == undefined) {
    currentAddress = "0x0000000000000000000000000000000000000000";
  }

  try {
    let CONTRACT_ = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    let statsData = await CONTRACT_.getStakingStatistics(currentAddress);
    //console.log(statsData);

    let TOKEN_CONTRACT_ = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, provider);
    let flipsBalance = await TOKEN_CONTRACT_.balanceOf(currentAddress);
    //console.log(flipsBalance);

    let BASIC_TOKEN_CONTRACT_ = new ethers.Contract(BASIC_TOKEN_ADDRESS, TOKEN_CONTRACT_ABI, provider);
    let tokensBalance = await BASIC_TOKEN_CONTRACT_.balanceOf(currentAddress);
    //console.log(tokensBalance);

    let reserves = await TOKEN_CONTRACT_.getReserves();
    let bnbAmount = reserves[0].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4;
    let tokensAmount = reserves[1].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4;
    if (bnbAmount > tokensAmount) {
      let __ = bnbAmount;
      bnbAmount = tokensAmount;
      tokensAmount = __;
    }

    let stats = {
      availableReward: statsData[0].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,
      accumulatedReward: statsData[1].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,
      withdrawnReward: statsData[2].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,
      stakeAmount: statsData[3].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,
      dailyReward: statsData[4].div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,

      flipsBalance: flipsBalance.div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,
      tokensBalance: tokensBalance.div(ethers.BigNumber.from(10).pow(14)).toNumber() / 10 ** 4,

      flipPrice: BNB_PRICE * bnbAmount / tokensAmount
    }
    //console.log(stats);
    $(".availableToCollect").text((stats.accumulatedReward + stats.availableReward).toFixed(4));
    $(".stakeAmount").text(stats.stakeAmount.toFixed(4));
    $(".flipsBalance").text(stats.flipsBalance.toFixed(4));
    $(".withdrawnReward").text(stats.withdrawnReward.toFixed(2));
    $(".dailyReward").text(stats.dailyReward.toFixed(2));

    $(".flipPrice").text(stats.flipPrice.toFixed(2));
    $(".changePrice").text("(" + Math.floor(stats.flipPrice / INITIAL_TOKEN_PRICE * 100) + "%)");

    $(".tokensBalance").text(stats.tokensBalance.toFixed(2));
    
    setTimeout(updateStakingStats, 5000);
  } catch (ex) {
    console.log(ex);
    setTimeout(updateStakingStats, 1000);
  }
}, 1000);
