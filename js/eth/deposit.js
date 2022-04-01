

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
            $('#tx-info-buy-bee').hide();
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
        $('#tx-info-buy-bee').hide();
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


const NETWORK_ID = 97
var contract
var accounts
var web3
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
    console.log(contract)
  
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