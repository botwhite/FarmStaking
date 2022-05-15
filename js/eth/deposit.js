

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


