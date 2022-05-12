

/* ----- deposit ----- */
$("#modal-deposit").flythat({});
$("#tx-info").flythat({});

$('#modal-deposit-init-button').click(function(){
    //return; //TODO!!!: disable deposits button
    checkMetaMask().then(async ok => {
        _balance = await provider.getBalance(current_account);
        //balance = Number.parseInt(_balance) / Math.pow(10, 18);
        balance = 100000

        $('#modal-deposit-input').val(1);
        $('#waxEqual1eth').html(format_number(waxEqual1eth));
        $('#modal-deposit-button-value').html(format_number(waxEqual1eth))
        $('[name="modal-deposit-balance"]').html(format_number(balance,4));

        if($('#modal-deposit-input').val() > balance){
            $('#modal-deposit-not-enough').show();
            $('#modal-deposit-button').prop("disabled", true);
        } else {
            $('#modal-deposit-not-enough').hide();
            $('#modal-deposit-button').prop("disabled", false);
        }

        $('#modal-deposit').flythat("show");
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-deposit-input').on('input', function(){
   // let value = parseFloat($('#modal-deposit-input').val());
   let amountStr = $('#modal-deposit-input').val();
   let value = Number.parseFloat(amountStr);
    if(value < 0){
        value = 0;
        $('#modal-deposit-input').val(0);
    }

    let wax = (isNaN(value) ? 0 : value * waxEqual1eth);

    $('#modal-deposit-button-value').html(format_number(wax));

    let disabled = false;
    if(value > balance || isNaN(value)){
        $('[name="modal-deposit-balance"]').html(format_number(balance,4));
        $('#modal-deposit-not-enough').show();
        disabled = true;
    } else {
        $('#modal-deposit-not-enough').hide();
    }
    $('#modal-deposit-button').prop("disabled", disabled);
});

$('#modal-deposit-button').on('click', () => {
    //$(".debug").html("START");
   if($('#modal-deposit-button').prop('disabled')){
        return;
    }

    let value = $('#modal-deposit-input').val();
    /* checkMetaMask().then(_ => {
        //$(".debug").html("START...");
        let gasPrice = 10 * Math.pow(10,9);

        //$(".debug").html(typeof INTERACT_CONTRACT);
        



        if (INTERACT_CONTRACT === undefined) {
          providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
          INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
        }
        console.log(value)
        INTERACT_CONTRACT.deposit(ref, value, 
          {
            from: current_account
          
          })
          .then(txn => {
            $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
            $('[name="tx-info-success"]').show();
            $('#tx-info-success-img').show();
            $('[name="tx-info-fail"]').hide();
            $('#tx-info-fail-img').hide();
            $('#modal-deposit').flythat("hide");

            $('#tx-info-deposit').show();
            $('#tx-info-withdraw').hide();
            $('#tx-info-quality-upgrade').hide();
            $('#tx-info-airdrop').hide();
            $('#tx-info-buy-soul').hide();
            $('#tx-info-collect-medal').hide();
            $('#tx-info-reward').hide();

            $('#tx-info').flythat("show");
        }).catch(err => {
          console.log(err);
          //$(".debug").html(JSON.stringify(err));
          $('[name="tx-info-success"]').hide();
          $('#tx-info-success-img').hide();
          $('[name="tx-info-fail"]').show();
          $('#tx-info-fail-img').show();
        });
    }, error => {
        //$(".debug").html(error);
        showModalAuth(error);
    });*/


 
    let _spend = web3.utils.toWei(value.toString())
    console.log(_spend)
   
    const result =  contract.methods.deposit(ref, _spend)
      .send({ from: accounts[0] }).then(txn => {
        $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
        $('[name="tx-info-success"]').show();
        $('#tx-info-success-img').show();
        $('[name="tx-info-fail"]').hide();
        $('#tx-info-fail-img').hide();
        $('#modal-deposit').flythat("hide");

        $('#tx-info-deposit').show();
        $('#tx-info-withdraw').hide();
        $('#tx-info-quality-upgrade').hide();
        $('#tx-info-airdrop').hide();
        $('#tx-info-buy-soul').hide();
        $('#tx-info-collect-medal').hide();
        $('#tx-info-reward').hide();

        $('#tx-info').flythat("show");
    }).catch(err => {
      console.log(err);
      //$(".debug").html(JSON.stringify(err));
      $('[name="tx-info-success"]').hide();
      $('#tx-info-success-img').hide();
      $('[name="tx-info-fail"]').show();
      $('#tx-info-fail-img').show();
    });
});


//d


const NETWORK_ID = 137
var contract
var tokenContract
var accounts
var web3


const tokenAddress = '0xD2723088403944C4327C41aCCDB189910BafF10F'
const tokenAbi = [{"constant":false,"inputs":[],"name":"disregardProposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"assetProtectionRole","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"},{"name":"v","type":"uint8[]"},{"name":"to","type":"address[]"},{"name":"value","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"seq","type":"uint256[]"},{"name":"deadline","type":"uint256[]"}],"name":"betaDelegatedTransferBatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sig","type":"bytes"},{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"seq","type":"uint256"},{"name":"deadline","type":"uint256"}],"name":"betaDelegatedTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initializeDomainSeparator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unfreeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newSupplyController","type":"address"}],"name":"setSupplyController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"nextSeqOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAssetProtectionRole","type":"address"}],"name":"setAssetProtectionRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"freeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newWhitelister","type":"address"}],"name":"setBetaDelegateWhitelister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"decreaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isWhitelistedBetaDelegate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"whitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_proposedOwner","type":"address"}],"name":"proposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"increaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"betaDelegateWhitelister","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unwhitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"wipeFrozenAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"EIP712_DOMAIN_HASH","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isFrozen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supplyController","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaimBUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentOwner","type":"address"},{"indexed":true,"name":"proposedOwner","type":"address"}],"name":"OwnershipTransferProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldProposedOwner","type":"address"}],"name":"OwnershipTransferDisregarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressUnfrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"FrozenAddressWiped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldAssetProtectionRole","type":"address"},{"indexed":true,"name":"newAssetProtectionRole","type":"address"}],"name":"AssetProtectionRoleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldSupplyController","type":"address"},{"indexed":true,"name":"newSupplyController","type":"address"}],"name":"SupplyControllerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"seq","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"BetaDelegatedTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWhitelister","type":"address"},{"indexed":true,"name":"newWhitelister","type":"address"}],"name":"BetaDelegateWhitelisterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newDelegate","type":"address"}],"name":"BetaDelegateWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldDelegate","type":"address"}],"name":"BetaDelegateUnwhitelisted","type":"event"}]

const getAccounts = async () => {
    metamaskReloadCallback()
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      resolve(web3)
    } catch (error) {
      console.log(error)
    }
  }
  

  const getWeb3 = async () => {
    return new Promise((resolve, reject) => {
      if (document.readyState == "complete") {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum)
          resolve(web3)
        } else {
          reject("must install MetaMask")
          document.getElementById("web3_message").textContent = "Error: Please install Metamask";
        }
      } else {
        window.addEventListener("load", async () => {
          if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            resolve(web3)
          } else {
            reject("must install MetaMask")
            document.getElementById("web3_message").textContent = "Error: Please install Metamask";
          }
        });
      }
    });
  };
  

  function handleRevertError(message) {
    alert(message)
  }
  
  async function getRevertReason(txHash) {
    const tx = await web3.eth.getTransaction(txHash)
    await web3.eth
      .call(tx, tx.blockNumber)
      .then((result) => {
        throw Error("unlikely to happen")
      })
      .catch((revertReason) => {
        var str = "" + revertReason
        json_reason = JSON.parse(str.substring(str.indexOf("{")))
        handleRevertError(json_reason.message)
      });
  }
  
  const getContract = async (web3) => {
    // const response = await fetch("./contracts/MinerGlobal.json");
    //const data = await response.json();
  
    const netId = await web3.eth.net.getId();
    //const deployedNetwork = data.networks[netId];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

    console.log(tokenContract)
  
    return contract

  }
  
  async function connectWallet() {
    getAccounts()
  }
  async function loadAccount() {

    accounts = await web3.eth.getAccounts()
  //  balance = await contract.methods.balanceOf(accounts[0]).call()
    //balanceNFT = await contract.methods.tokensOfOwner(accounts[0]).call()
   
  
    
  
}
  

  async function loadDapp() {
   var awaitWeb3 = async function () {
      web3 = await getWeb3()
      web3.eth.net.getId((err, netId) => {
        if (netId == NETWORK_ID) {
          var awaitContract = async function () {
            contract = await getContract(web3);
           
            
 
            web3.eth.getAccounts(function (err, accounts) {
              if (err != null)
                console.error("An error occurred: " + err);
              else if (accounts.length == 0)
                console.log("User is not logged in to MetaMask");
              else {
                loadAccount()
              }
            });
          };
          awaitContract();
        } else {
          document.getElementById("web3_message").textContent = "Please connect to Binance smart chain";
        }
      });
    };
    awaitWeb3();
  }
  
  loadDapp()
  const mint = async () => {

    

  }

  function approveToken() {
    let _amount = $('#modal-deposit-input').val();
  

    approve(_amount);
  }
      
    
  function approve(_amount) {
   
    console.log(_amount)

    let _spend = web3.utils.toWei(_amount.toString())
    tokenContract.methods.approve(CONTRACT_ADDRESS, _spend).send({ from: accounts[0] }).then(result => {
      if (result) {
        //alert("aprovado")
        
        //refreshData();
      }
  
    }).catch((err) => {
      console.log(err)
    });
  }