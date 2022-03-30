$("#modal-success-action").flythat({});

class InvalidProviderError extends Error {};
class InvalidChainError extends Error {};

//let web3subscribe = new Web3(window.ethereum);
let providerSubscribe;
let INTERACT_CONTRACT;
let TOKEN_CONTRACT;

let metaMaskIsLoggedOut = false;
setTimeout(async function initProvider() {
  try {
    if (window.ethereum != undefined && window.ethereum.chainId && Number.parseInt(window.ethereum.chainId) == NETID[NETWORK] && !metaMaskIsLoggedOut) {
      let accs = await window.ethereum.request({ method: 'eth_accounts' });
      if (accs.length === 0) {
        metaMaskIsLoggedOut = true;

        throw new InvalidProviderError("MM is logged out");
      }

      providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
    } else if (window.BinanceChain != undefined) {
      let netId = Number.parseInt(await window.BinanceChain.request({ method: 'eth_chainId' }));
      if (netId == NETID[NETWORK]) {
        providerSubscribe = new ethers.providers.Web3Provider(window.BinanceChain);
      } else {
        throw new InvalidChainError("Invalid chain");
      }
    } else {
      //throw new InvalidProviderError("No provider");
      window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
    TOKEN_CONTRACT = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, providerSubscribe.getSigner());

    console.log(providerSubscribe); //TODO: remove debug
    console.log(INTERACT_CONTRACT); //TODO: remove debug
  } catch (err) {
    console.log(err); //TODO: remove debug
    if (err instanceof InvalidProviderError) {
      setTimeout(initProvider, 1500);
    }
  }
});

function subscribeEvents(){
    
    isSubscribeEvents = true;
    
    if(storage[current_account] == undefined){
        storage[current_account] = {};
    }
    if(storage['rate'] == undefined){
        storage['rate'] = [];
    }
    if(storage['medals'] == undefined){
        storage['medals'] = {};
    }

    flagSubscribeEvents = setInterval(async function(){
        if(!isGetBeeMonthlyPercentsAndPrices){
            return;
        }
        
        clearInterval(flagSubscribeEvents);
        try {
          subscribeDeposit();
          subscribeWithdraw();
          subscribeMedalAwarded();
          subscribeRewardCollected();
          subscribeBeesBought();
          subscribeQualityUpdated();
          subscribeBeeUnlocked();
        } catch (err) {
          console.log("ERROR", "getBlockNumber", err);
          setTimeout(function(){ subscribeEvents(); }, 3000);
        }
    }, 200);
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function subscribeDeposit(){
    if(storage[current_account]['history'] == undefined){
        storage[current_account]['history'] = [];
    }

    console.log("Subscribe to the `Deposited` event");
    INTERACT_CONTRACT.on("Deposited",
      (user, amount, event) => {
        console.log("emitted `Deposited` event", event);

        if(current_account != user.toLowerCase()){
            return;
        }

        amount = Number.parseInt(amount);
        
        provider.getBlock(event.blockNumber)
          .then(data => {
            if (data == null){
                block_timestamp = 0;
            } else {
                block_timestamp = data.timestamp * 1000;
            }

            let deposit = {
                'datetime': getDateTime(block_timestamp),
                'type': 'deposit',
                'amount': amount / Math.pow(10,18),
                'blockNumber': event.blockNumber,
                'transactionHash': event.transactionHash,
            };
            
            if (storage[current_account]['history'].map(
                function(e) {
                  return JSON.stringify(_objectWithoutProperties(e, "datetime"))
                })
                .indexOf(JSON.stringify(_objectWithoutProperties(deposit, "datetime"))) != -1)
            {
              return;
            }
            
            storage[current_account]['history'].push(deposit);
            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            
            if (amount / Math.pow(10, 18) != 0) {
                console.log("Dialog actions...");
                $('[name="modal-success-action-deposit"]').show();
                $('[name="modal-success-action-withdraw"]').hide();
                $('[name="modal-success-action-airdrop-collect"]').hide();
                $('[name="modal-success-action-medal"]').hide();
                $('[name="modal-success-action-buy-bee"]').hide();
                $('[name="modal-success-quality-upgrade"]').hide();
                $('[name="modal-success-bee-unlock"]').hide();
                $('[name="modal-success-action-deposit"] > span').eq(1).html(format_number(Math.ceil(waxEqual1eth * amount / Math.pow(10,18))));
                $('[name="modal-success-action-deposit"] > a').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + event.transactionHash);
                $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

                $('#modal-success-action').flythat("show");
            }

            clearAllPlayerVariables();
            run();
        }).catch(err => {
          console.log(getDateTime(), "ERROR", "getBlock", err);
        });
    });
}

function subscribeWithdraw() {
    if(storage[current_account]['history'] == undefined){
        storage[current_account]['history'] = [];
    }

    console.log("Subscribe to the `Withdrawed` event");
    INTERACT_CONTRACT.on("Withdrawed",
      (user, amount, event) => {
        console.log("emitted `Withdrawed` event", event);

        if(current_account != user.toLowerCase()){
            return;
        }

        amount = Number.parseInt(amount);

        provider.getBlock(event.blockNumber)
          .then(data => {
            if (data == null) {
                block_timestamp = 0;
            } else {
                block_timestamp = data.timestamp*1000;
            }

            let withdraw = {
                'datetime': getDateTime(block_timestamp),
                'type': 'withdraw',
                'amount': amount / Math.pow(10,18),
                'blockNumber': event.blockNumber,
                'transactionHash': event.transactionHash,
            };

            if(storage[current_account]['history'].map(function(e) { return JSON.stringify(_objectWithoutProperties(e, "datetime")); }).indexOf(JSON.stringify(_objectWithoutProperties(withdraw, "datetime"))) != -1){
                return;
            }

            storage[current_account]['history'].push(withdraw);
            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

            $('[name="modal-success-action-deposit"]').hide();
            $('[name="modal-success-action-withdraw"]').show();
            $('[name="modal-success-action-airdrop-collect"]').hide();
            $('[name="modal-success-action-medal"]').hide();
            $('[name="modal-success-action-buy-bee"]').hide();
            $('[name="modal-success-quality-upgrade"]').hide();
            $('[name="modal-success-bee-unlock"]').hide();
            $('[name="modal-success-action-withdraw"] > span').eq(1).html(format_number(amount / Math.pow(10,18), 3));
            $('[name="modal-success-action-withdraw"] > a').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + event.transactionHash);
            $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

            $('#modal-success-action').flythat("show");

            clearAllPlayerVariables();
            run();
        }).catch(err => {
          console.log(getDateTime(), "ERROR", "getBlock", err);
        });
    });
}

function subscribeMedalAwarded() {
    console.log("Subscribe to the `MedalAwarded` event");
    INTERACT_CONTRACT.on("MedalAwarded",
      (user, medal, event) => {
        console.log("emitted `MedalAwarded` event", event);

        medal = Number.parseInt(medal);

        if(current_account != user.toLowerCase()){
            return;
        }

        if(storage['medals'] == undefined){
            storage['medals'] = {};
        }
        if(storage['medals'][user.toLowerCase()] != undefined && storage['medals'][user.toLowerCase()] >= medal){
            return;
        }

        storage[current_account]['lastMedalAwarded'] = event.blockNumber;
        storage['medals'][user.toLowerCase()] = medal;
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

        $('[name="modal-success-action-deposit"]').hide();
        $('[name="modal-success-action-withdraw"]').hide();
        $('[name="modal-success-action-airdrop-collect"]').hide();
        $('[name="modal-success-action-medal"]').show();
        $('[name="modal-success-action-buy-bee"]').hide();
        $('[name="modal-success-quality-upgrade"]').hide();
        $('[name="modal-success-bee-unlock"]').hide();
        // $('[name="modal-success-action-medal"] > a').attr('href', 'https://'+NETWORK+'.bscscan.com/tx/'+event.transactionHash);
        if (medal <= 0) {
          medal = 1;
        }
        $('#modal-success-action > div > div > img').attr('src', 'image/big-medal-' + medal + '.png');

        $('#modal-success-action').flythat("show");

        clearAllPlayerVariables();
        run();
    });
}

function subscribeRewardCollected() {
    console.log("Subscribe to the `RewardCollected` event");
    INTERACT_CONTRACT.on("RewardCollected",
      (user, honeyReward, waxReward, event) => {
        console.log("emitted `RewardCollected` event", event);

        waxReward = Number.parseInt(waxReward);
        honeyReward = Number.parseInt(honeyReward);

        if(current_account != user.toLowerCase() || airdropCollected){
            return;
        }
        
        if(!isNaN(storage[current_account]['lastRewardCollected'])){
            return;
        }
        if((honeyReward != "0" || waxReward != "500000000000000000000") && isNaN(storage[current_account]['lastRewardCollected'])){
            return;
        }
            
        $('[name="modal-success-action-deposit"]').hide();
        $('[name="modal-success-action-withdraw"]').hide();
        $('[name="modal-success-action-airdrop-collect"]').show();
        $('[name="modal-success-action-medal"]').hide();
        $('[name="modal-success-action-buy-bee"]').hide();
        $('[name="modal-success-quality-upgrade"]').hide();
        $('[name="modal-success-bee-unlock"]').hide();
        // $('[name="modal-success-action-airdrop-collect"] > a').attr('href', 'https://'+NETWORK+'.bscscan.com/tx/'+event.transactionHash);
        $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

        $('#modal-success-action').flythat("show");    

        storage[current_account]['lastRewardCollected'] = event.blockNumber;
        // storage[current_account]['eventsRewardCollected'].push(event.id);
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));                 
        
        clearAllPlayerVariables();
        run();
    });
}

function subscribeBeesBought() {
    console.log("Subscribe to the `BeesBought` event");
    INTERACT_CONTRACT.on("BeesBought",
      (user, bee, count, event) => {
        console.log("emitted `BeesBought` event", event);
        let uniqueId = `BeesBought-${event.blockNumber}`;

        if (current_account != user.toLowerCase()) {
          return;
        }

        if(storage[current_account]['eventsBuyBee'] == undefined){
          storage[current_account]['eventsBuyBee'] = [];
        }
        if (storage[current_account]['eventsBuyBee'].indexOf(uniqueId) != -1) {
          return;
        }

        $('[name="modal-success-action-deposit"]').hide();
        $('[name="modal-success-action-withdraw"]').hide();
        $('[name="modal-success-action-airdrop-collect"]').hide();
        $('[name="modal-success-action-medal"]').hide();
        $('[name="modal-success-action-buy-bee"]').show();
        $('[name="modal-success-quality-upgrade"]').hide();
        $('[name="modal-success-bee-unlock"]').hide();
        $('[name="modal-success-action-buy-bee"] > span').eq(1).html(count);
        // $('[name="modal-success-action-buy-bee"] > a').attr('href', 'https://'+NETWORK+'.bscscan.com/tx/'+event.transactionHash);
        $('#modal-success-action > div > div > img').attr('src', 'image/'+(parseInt(bee, 10)+1)+'.png');

        $('#modal-success-action').flythat("show");

        storage[current_account]['lastBuyBee'] = event.blockNumber;
        storage[current_account]['eventsBuyBee'].push(uniqueId);
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

        clearAllPlayerVariables();
        run();
      }
    );
}

function subscribeQualityUpdated() {
  console.log("Subscribe to the `QualityUpdated` event");
  INTERACT_CONTRACT.on("QualityUpdated",
    (user, _ /* quality */, event) => {
        console.log("emitted `QualityUpdated` event", event);

        if(current_account != user.toLowerCase()){
            return;
        }

        if(storage[current_account]['eventsQualityUpdated'] == undefined){
            storage[current_account]['eventsQualityUpdated'] = [];
        }
        if(storage[current_account]['eventsQualityUpdated'].indexOf(event.id) != -1){
            return;
        }

        $('[name="modal-success-action-deposit"]').hide();
        $('[name="modal-success-action-withdraw"]').hide();
        $('[name="modal-success-action-airdrop-collect"]').hide();
        $('[name="modal-success-action-medal"]').hide();
        $('[name="modal-success-action-buy-bee"]').hide();
        $('[name="modal-success-quality-upgrade"]').show();
        $('[name="modal-success-bee-unlock"]').hide();
        // $('[name="modal-success-quality-upgrade"] > a').attr('href', 'https://'+NETWORK+'.bscscan.com/tx/'+event.transactionHash);
        $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

        $('#modal-success-action').flythat("show");

        storage[current_account]['lastQualityUpdated'] = event.blockNumber;
        storage[current_account]['eventsQualityUpdated'].push(event.id);
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

        clearAllPlayerVariables();
        run();
    });
}

function subscribeBeeUnlocked() {
    console.log("Subscribe to the `BeeUnlocked` event");
    INTERACT_CONTRACT.on("BeeUnlocked",
      (user, bee, event) => {
        console.log("emitted `BeeUnlocked` event", event);

        bee = Number.parseInt(bee);

        if(current_account != user.toLowerCase()){
            return;
        }

        if(storage[current_account]['eventsBeeUnlocked'] == undefined){
            storage[current_account]['eventsBeeUnlocked'] = [];
        }
        if(storage[current_account]['eventsBeeUnlocked'].indexOf(event.id) != -1){
            return;
        }

        $('[name="modal-success-action-deposit"]').hide();
        $('[name="modal-success-action-withdraw"]').hide();
        $('[name="modal-success-action-airdrop-collect"]').hide();
        $('[name="modal-success-action-medal"]').hide();
        $('[name="modal-success-action-buy-bee"]').hide();
        $('[name="modal-success-quality-upgrade"]').hide();
        $('[name="modal-success-bee-unlock"]').show();
        // $('[name="modal-success-bee-unlock"] > a').attr('href', 'https://'+NETWORK+'.bscscan.com/tx/'+event.transactionHash);
        $('#modal-success-action > div > div > img').attr('src', 'image/' + (parseInt(bee, 10)+1) + '.png');

        $('#modal-success-action').flythat("show");

        storage[current_account]['lastBeeUnlocked'] = event.blockNumber;
        storage[current_account]['eventsBeeUnlocked'].push(event.id);
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

        clearAllPlayerVariables();
        run();
    });
}
