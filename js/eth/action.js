/* ----- init ----- */
console.log("888")
$("#modal-auth").flythat({});
$("#modal-deposit").flythat({});
$("#deposit-info").flythat({});
$("#modal-history").flythat({});
$("#modal-deposit-v2").flythat({});

let flagMedalsPoints;
let flagQualityHoneyPercentsAndPrices;
let flagProfit;
let flagBeesInfo;
let flagSubscribeEvents;
let isGetActualBalance = true;
let actualBalanceTimeout = 0;

let isMobileSiteVersion =false;
let trust_link = 'https://link.trustwallet.com/open_url?coin_id=61&url=https://bnbhives.biz';
let trust_app = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
let OS = getMobileOperatingSystem();
if(OS == "Android") { // if is android
    trust_app = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
} else if(OS == "iOS"){ // if is ios
    trust_app = 'https://itunes.apple.com/ru/app/trust-ethereum-wallet/id1288339409';
}
let isTabActive = true;
$(window).focus(function () { 
    isTabActive = true; 
}); 
$(window).blur(function () { 
    isTabActive = false; 
});

fillBeesWaxes();

/* ----- auth ----- */
console.log("777");
auth();

let isMetamask = false;
let isBinanceWallet = false;

let isDepositV2 = false;
function auth(){
  console.log("999");
    checkMetaMask().then(_ => {
        console.log("MetaMask", isMetamask); //TODO: remove debug
        console.log("BinanceWallet", isBinanceWallet); //TODO: remove debug
        //if (!isMobileSiteVersion) {
            let ethereum = null;
            if (isMetamask) {
              ethereum = window.ethereum;
            } else if (isBinanceWallet) {
              ethereum = window.BinanceChain;
            }

            ethereum.on('accountsChanged', function (accounts) {
                location.reload();
                return; 
            });
        //}

        $(document).ready(function() {
            run();
        });

        if(!isDepositV2){
            isDepositV2 = true;
            // $("#modal-deposit-v2").flythat("show");
        }
    }, error => {
        showModalAuth(error);
    }); 
}

function showModalAuth(message){
    $('#modal-auth > div > .ok-title').html(message);

    $("#modal-auth").flythat("show");
}

$("#modal-auth").on('hide.flythat', function(event, el, instance) {
    auth();
});

const ethereumButton = document.querySelector('.button-lottery');
try {
  ethereumButton.addEventListener('click', () => {
    //Will Start the metamask extension
    window.ethereum.request({ method: 'eth_requestAccounts' });
  });
} catch (e) {
  console.log(e);
}

/* ----- run ----- */
let balance = 0;
let current_account;
let totalDeposited = 0;
let totalWithdrawed = 0;
let isGetPlayerBees = false;
let playerBees = [];
let qualityLevel = 0;
let balanceHoney = 0;
let balanceWax = 0;
let airdropCollected = false;
let registered = false;
let unlockedBee = 0;
let superBeeUnlocked = false;
let medal = 0;
let notImaginaryBalanceHoney = 0;
let notImaginaryBalanceWax = 0;

let last_playerBees;
let last_airdropCollected;
let last_registered;
let last_unlockedBee;

let depositEvent;
let withdrawEvent;
let referrerPaidEvent;
let rewardCollectedEvent;
let medalAwardedEvent;
let beesBoughtEvent;
let qualityUpdatedEvent;
let beeUnlockedEvent;
let userAddedToBonusEvent;

function getCurrentAccount(){
    return current_account;
}

let alreadyGetActualBalance = false;
function getActualBalance(){
    alreadyGetActualBalance = true;
    setTimeout(function(){
        CONTRACT.instantBalance(current_account).then(actual_balance => {
            balanceHoney = Math.floor(
              actual_balance[0].div(ethers.BigNumber.from(10).pow(18)).toNumber()
            );
            balanceWax = Math.floor(
              actual_balance[1].div(ethers.BigNumber.from(10).pow(18)).toNumber()
            );
            if(!airdropCollected && balanceWax > 0){
                balanceWax -= 500;
            }
            $('#balanceHoney').val(format_number(balanceHoney));
            $('#balanceWax').val(format_number(balanceWax));
        }).catch(err => {
            console.log("ERROR", "web3.instantBalance", err);
        });
        actualBalanceTimeout = 10000;
        if(isGetActualBalance){
            getActualBalance();
        }
    }, actualBalanceTimeout);
}

let isSubscribeEvents = false;
let isFirstRun = true;
async function run(){

    getGlobalStatistic();

    let accounts = [];
    if (isMetamask) {
      accounts = await window.ethereum.request({ method: 'eth_accounts' });
    } else if (isBinanceWallet) {
      accounts = await window.BinanceChain.request({ method: 'eth_accounts' });
    }

        current_account = accounts[0];
        if (current_account) {
          current_account = current_account.toLowerCase();
        }
        // current_account = "0x17c1cf2eefda3f339996c67cd18d4389d132d033";

        isGetActualBalance = true;
        if(!alreadyGetActualBalance){
            getActualBalance();
        }

        CONTRACT.players(current_account).then(player => {
            console.log(player);
            // registered and airdropCollected
            registered = player[0];
            airdropCollected = player[1];
            if(airdropCollected){
                $('#modal-collect-airdrop-init-button').addClass("none-active");  
                $('#modal-collect-airdrop-init-button').html("Collected");  
            } else {
                $('#modal-collect-airdrop-init-button').html("Collect");
                if(registered){
                    $('#modal-collect-airdrop-init-button').removeClass("none-active"); 
                } else {
                    $('#modal-collect-airdrop-init-button').addClass("none-active"); 
                }
            }

            // referral
            if(player[2] != "0x0000000000000000000000000000000000000000"){
                ref = player[2];
            } else {
                if(window.location.search != "" && ethers.utils.isAddress(window.location.search.split('?')[1])){
                    reflink = window.location.search.split('?')[1];
                } else {
                    if(storage[current_account] == undefined){
                        storage[current_account] = {};
                    }

                    if(storage[current_account]['ref'] != undefined && ethers.utils.isAddress(storage[current_account]['ref'])){
                        reflink = storage[current_account]['ref'];
                    } else {
                        reflink = ref;
                    }
                }
                isSentTxStartGame = false;
                start_game();
            }

            notImaginaryBalanceHoney = Math.ceil(Number.parseInt(player[3], 16) / Math.pow(10,18) * honeyEqual1eth);
            notImaginaryBalanceWax = Math.ceil(Number.parseInt(player[4], 16) / Math.pow(10,18));
            
            medal = parseInt(player[6], 10);
            let next_medal = medal + 1;
            if(registered && next_medal == 1){
                next_medal++;
            }
            if(next_medal == 11){
                next_medal = 10;
            }
            if (next_medal <= 0) {
              next_medal = 1;
            }
            $('.medal-after').css('background', 'url("../image/medal-'+next_medal+'.png")no-repeat');

            flagMedalsPoints = setInterval(function(){
                if(!isGetMedalsPoints){
                    return;
                }

                clearInterval(flagMedalsPoints);
                let points = Math.ceil(player[5] / Math.pow(10,18));
                let leftower = (1 - points / medals_points[next_medal-1])*100;
                letfower = (leftower < 0 ? 0: leftower);
                $('.progress-line').css('right', letfower+'%');
                if(letfower != 0 || medal == 10){
                    $('#collect-medal').hide();
                    $('.medal-after').removeClass('active-100');
                } else {
                    $('#collect-medal').show();
                    $('.medal-after').addClass('active-100');
                }
                
                // medal popap
                if (next_medal <= 0) {
                  next_medal = 1;
                }
                $('#modal-medal-info > div > div > img').attr('src', 'image/big-medal-'+next_medal+'.png');
                $('#medal-info-points').html(parseInt(points));
                $('#medal-info-points-awaiting').html(next_medal == 1 ? 0 : medals_points[next_medal-1]);
                $('[name="medal-info-max"]').hide();
                if(next_medal == 1){
                    $('#medal-info-score').hide();
                    $('#medal-info-text1').hide();
                    $('#medal-info-text0').show();
                    $('#medal-info-text2').show();
                    $('#medal-info-text3').hide();  
                    $('#medal-info-have-points').hide();
                    $('#medal-info-need-points').hide();
                } else {
                    if(medal == 10){
                        $('#medal-info-score').hide();
                        $('#medal-info-text1').hide();
                        $('#medal-info-text0').hide();
                        $('#medal-info-text2').hide();
                        $('#medal-info-have-points').hide();
                        $('#medal-info-need-points').hide();
                        $('[name="medal-info-max"]').show();
                    } else {
                        $('#medal-info-score').show();
                        $('#medal-info-text1').show();
                        $('#medal-info-text0').hide();
                        $('#medal-info-text2').hide();
                        $('#medal-info-text3').show();    
                        $('#medal-info-text3 > span').eq(1).html($('#medal-info-name-'+(next_medal-1)).html());
                        $('#medal-info-have-points').show();
                        $('#medal-info-need-points').show();
                        $('#medal-info-have-points').html(format_number(medals_rewards[next_medal-2]));
                        $('#medal-info-need-points').html(format_number(medals_rewards[next_medal-1]));   
                    }
                }
                for(let i = 1; i < medals_points.length; i++){
                    $('#medal-info-name-'+i).hide();
                }
                $('#medal-info-name-'+next_medal).show();

            }, 1000);

            // history
            totalDeposited = player[10] / Math.pow(10,18);
            totalWithdrawed = player[11] / Math.pow(10,18);

            // qualityLevel
            qualityLevel = Number.parseInt(player.qualityLevel);
            let flagQualityHoneyPercentsAndPrices = setInterval(function(){
                if(!isGetQualityHoneyPercentsAndPrices){
                    return;
                }

                clearInterval(flagQualityHoneyPercentsAndPrices);
                $('#qualityHoneyPercent').html(quality_honey_percents[qualityLevel]);
                $('#qualityWaxPercent').html(100 - quality_honey_percents[qualityLevel]);
            }, 1000);

            flagProfit = setInterval(function(){
                if(!isGetBeeMonthlyPercentsAndPrices || !isGetPlayerBees){
                    return;
                }

                clearInterval(flagProfit);
                let profit = calculateProfitAtHour(playerBees, bee_monthly_percents, bee_levels_prices);
                let waxHour = (profit * (100 - quality_honey_percents[qualityLevel])) / 100;
                let honeyHour = (profit * quality_honey_percents[qualityLevel]) / 100;
                $('#waxHour').html(format_number(waxHour, 1));
                $('#honeyHour').html(format_number(honeyHour, 1));
            }, 1000);

            // unlockedBee
            unlockedBee = player[9];

            if(!isSubscribeEvents){
                subscribeEvents();
            }
        }).catch(err => {
            console.log("ERROR", "web3.players", err);
        });

        CONTRACT.isSupersoulUnlocked().then(isUnlocked => {
            superBeeUnlocked = isUnlocked;
        }).catch(err => {
            console.log("ERROR", "web3.isSuperBeeUnlocked", err);
        });
        
        CONTRACT.playersouls(current_account).then(bees => {
            for(let i = 0; i < bees.length; i++){
                playerBees[i] = Number.parseInt(bees[i]);
            }
            isGetPlayerBees = true;
        }).catch(err => {
            console.log("ERROR", "web3.playerBees", err);
        });

        flagBeesInfo = setInterval(function(){
            if(!isGetPlayerBees || !isGetBeeMonthlyPercentsAndPrices){
                return;
            }

            clearInterval(flagBeesInfo);
            if(JSON.stringify(playerBees) !== JSON.stringify(last_playerBees) || airdropCollected !== last_airdropCollected || registered !== last_registered || unlockedBee !== last_unlockedBee){
                last_playerBees = playerBees;
                last_airdropCollected = airdropCollected;
                last_registered = registered;
                last_unlockedBee = unlockedBee;
                fillBeesWaxes(playerBees, airdropCollected, registered, unlockedBee, superBeeUnlocked);
            }
        }, 1000);

        /* utility */
        if(isFirstRun){
            isFirstRun = false;

            $.get(UTILITY_URL + '/history?account='+current_account, 
            function(data, result){
                if(result != "success"){
                    console.log("ERROR", "/history", current_account, err);
                } else {
                    if(storage[current_account] == undefined){
                        storage[current_account] = {};
                    }
                    storage[current_account]['history'] = data;
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                }
            });

            $.get(UTILITY_URL + '/referrals?account='+current_account,
            function(data, result){
                if(result != "success"){
                    console.log("ERROR", "/referrals", current_account, err);
                } else {
                    if(storage[current_account] == undefined){
                        storage[current_account] = {};
                    }
                    storage[current_account]['referrals'] = data;
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                }
            });

            $.get(UTILITY_URL + '/super_repr', 
            function(data, result){
                if(result != "success"){
                    console.log("ERROR", "/super_repr", err);
                } else {
                    if(storage['super_repr'] == undefined){
                        storage['super_repr'] = [];
                    }
                    storage['super_repr'] = data;
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                }
            });

            $.get(UTILITY_URL + '/rating?account=' + current_account, 
            function(data, result){
                if(result != "success"){
                    console.log("ERROR", "/rating", current_account, err);
                } else {
                    if(storage['rate'] == undefined){
                        storage['rate'] = {};
                    }
                    storage['rate']['rating'] = data.rating;
                    storage['rate']['your_position'] = data.your_position;
                    storage['rate']['players_count'] = data.players_count;
                    $('.hive_leader').html(format_number(data.hive_leader));
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                }
            });

            setTimeout(function(){
                $.get(UTILITY_URL + '/super_repr', 
                function(data, result){
                    if(result != "success"){
                        console.log("ERROR", "/super_repr", err);
                    } else {
                        if(storage['super_repr'] == undefined){
                            storage['super_repr'] = [];
                        }
                        storage['super_repr'] = data;
                        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                    }
                });

                $.get(UTILITY_URL + '/referrals?account='+current_account, 
                function(data, result){
                    if(result != "success"){
                        console.log("ERROR", "/referrals", current_account, err);
                    } else {
                        if(storage[current_account] == undefined){
                            storage[current_account] = {};
                        }
                        storage[current_account]['referrals'] = data;
                        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                    }
                });

                $.get(UTILITY_URL + '/rating?account=' + current_account, 
                function(data, result){
                    if(result != "success"){
                        console.log("ERROR", "/rating", current_account, err);
                    } else {
                        if(storage['rate'] == undefined){
                            storage['rate'] = {};
                        }
                        storage['rate']['rating'] = data.rating;
                        storage['rate']['your_position'] = data.your_position;
                        storage['rate']['players_count'] = data.players_count;
                        $('.hive_leader').html(format_number(data.hive_leader));
                        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                    }
                });
            }, 1000*60*5);
        }
}

/* ----- common ----- */ 
function checkMetaMask(){
  console.log("000");
    return new Promise(function(ok, fail){
        console.log("111");
        if(!window.ethereum && !window.BinanceChain){
          console.log("222");
          fail('Please install the <a class="ok-title" target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">Metamask</a> browser extension or similar');
        } else {
            if (window.ethereum != undefined) {
              window.ethereum.request({ method: 'eth_accounts' }).then(async function(accounts) {
                    if (accounts.length == 0) {
                        //isMobileSiteVersion ? fail('Please add account to the App TrustWallet') : fail("Please login to Metamask");
                        isMetamask = false;
                        //fail("Please switch to appropriate network: " + NETWORK);

                        // Try to use Binance Wallet
                        checkBinanceWallet().then(
                          result => {
                            console.log(result); //TODO: remove debug
                            ok(result);
                          },
                          error => {
                            showModalAuth(error + "2"); //TODO: change extension error text on custom one
                          }
                        );
                    } else {
                        if (!accounts[0]) {
                            isMobileSiteVersion ? fail('Please add account to the App TrustWallet') : fail("Please login to Metamask");
                        } else {
                            let netId = Number.parseInt(window.ethereum.chainId, 16);
                            if (isNaN(netId)) {
                              netId = NETID[NETWORK];
                            }
                            if (netId != NETID[NETWORK] && window.ethereum.chainId != 56){
                                isMetamask = false;
                                //fail("Please switch to appropriate network: " + NETWORK);

                                // Try to use Binance Wallet
                                checkBinanceWallet(1).then(
                                  result => {
                                    console.log(result); //TODO: remove debug
                                    ok(result);
                                  },
                                  error => {
                                    showModalAuth(error + ":" + window.ethereum.chainId); //TODO: change extension error text on custom one
                                  }
                                );
                            } else {
                                isMetamask = true;

                                ok("MetaMask is OK!");
                            }
                        }
                    }
                }).catch(_ => {
                    isMetamask = false;
                    //fail('User denied access to Metamask');
                    console.log("No MetaMask catched");
                    console.log(window.ethereum);

                    return;
                    // Try to use Binance Wallet
                    checkBinanceWallet(2).then(
                      result => {
                        console.log(result); //TODO: remove debug
                        ok(result);
                      },
                      error => {
                        showModalAuth(error + "4"); //TODO: change extension error text on custom one
                      }
                    );
                });
            } else {
                isMetamask = false;
                //fail('User denied access to Metamask');
                console.log("No MetaMask");

                return;
                // Try to use Binance Wallet
                checkBinanceWallet(3).then(
                  result => {
                    console.log(result); //TODO: remove debug
                    ok(result);
                  },
                  error => {
                    showModalAuth(error + "5"); //TODO: change extension error text on custom one
                  }
                );
            }
        }
    });
}

/**
 *  56 - mainnet
 *  97 - testnet
 */
function checkBinanceWallet(w) {
  return;
  return new Promise(async (ok, fail) => {
    if (window.BinanceChain != undefined) {
      let accounts = await window.BinanceChain.request({ method: 'eth_accounts' });
      if (accounts.length == 0 || !accounts[0]) {
        isMobileSiteVersion ? fail('Please add account to the Binance Wallet') : fail("Please login to Binance Wallet");
      } else {
        console.log(accounts); //TODO: remove debug
        let netId = Number.parseInt(await window.BinanceChain.request({ method: 'eth_chainId' }));
        console.log(netId); //TODO: remove debug
        if (netId != NETID[NETWORK]) {
          isBinanceWallet = false;

          fail("Please switch to appropriate network: " + NETWORK);
        } else {
          isBinanceWallet = true;
          isMetamask = false;

          ok("Binance Wallet OK!");
        }
      }
    } else {
      isBinanceWallet = false;

      fail('No Binance Wallet extension: ' + w);
    }
  });
}

function clearAllPlayerVariables(){
    clearInterval(flagMedalsPoints);
    clearInterval(flagQualityHoneyPercentsAndPrices);
    clearInterval(flagProfit);
    clearInterval(flagBeesInfo);
    clearInterval(flagSubscribeEvents);
    isGetActualBalance = false;
    actualBalanceTimeout = 0;
    
    totalDeposited = 0;
    totalWithdrawed = 0;
    isGetPlayerBees = false;
    playerBees = [];
    qualityLevel = 0;
    balanceHoney = 0;
    balanceWax = 0;
    airdropCollected = false;
    unlockedBee = 0;
}

function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        isMobileSiteVersion = true;
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        isMobileSiteVersion = true;
        return "iOS";
    }

    return "unknown";
}