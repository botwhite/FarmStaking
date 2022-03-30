/* ----- withdraw ----- */
$("#modal-withdraw").flythat({});
$("#tx-info").flythat({});

$('#modal-withdraw-init-button').click(function(){
    checkMetaMask().then(ok => {
    
        $('#modal-withdraw-input').val(honeyEqual1eth);
        $('#honeyEqual1eth').html(format_number(honeyEqual1eth));
        $('#modal-withdraw-button-value').html(1);
        $('[name="modal-honey-balance"]').html(format_number(balanceHoney));

        if($('#modal-withdraw-input').val() > balanceHoney){
            $('#modal-withdraw-not-enough').show();
            $('#modal-withdraw-button').prop("disabled", true);
        } else {
            $('#modal-withdraw-not-enough').hide();
            $('#modal-withdraw-button').prop("disabled", false);
        }

        $('#modal-withdraw').flythat("show");
        
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-withdraw-input').on('input', function(){
    let honey = parseInt($('#modal-withdraw-input').val());
    if(honey < 0){
        honey = 0;
        $('#modal-withdraw-input').val(0);
    }

    let value = (isNaN(honey) ? 0 : parseFloat(honey / honeyEqual1eth));

    $('#modal-withdraw-button-value').html(format_number(value,3));

    let disabled = false;
    if(honey < 250){
        $('#modal-withdraw-less-min').show();
        $('#modal-withdraw-not-enough').hide();
        disabled = true;
    } else {
        $('#modal-withdraw-less-min').hide();
    }

    if (!disabled &&
        (honey > balanceHoney || isNaN(honey))){
        $('[name="modal-withdraw-balance"]').html(format_number(balanceHoney));
        $('#modal-withdraw-not-enough').show();
        disabled = true;
    } else {
        $('#modal-withdraw-not-enough').hide();
    }
    $('#modal-withdraw-button').prop("disabled", disabled);
});

$('#modal-withdraw-button').on('click', () => {
    if ($('#modal-deposit-button').prop('disabled')) {
      return;
    }

    let valueHoney = $('#modal-withdraw-input').val();
    checkMetaMask().then(_ => {
        let honeyWei = ethers.BigNumber.from(valueHoney).mul(ethers.BigNumber.from(10).pow(18));
        let gasPrice = 10 * Math.pow(10,9);

        if (INTERACT_CONTRACT == undefined || providerSubscribe == undefined) {
          providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
          INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
        }

        INTERACT_CONTRACT.withdraw(
          honeyWei,
          {
            from: current_account,
            value: "0",
            gasPrice
          })
          .then(txn => {
            $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
            $('[name="tx-info-success"]').show();
            $('#tx-info-success-img').show();
            $('[name="tx-info-fail"]').hide();
            $('#tx-info-fail-img').hide();
            $('#modal-withdraw').flythat("hide");

            $('#tx-info-deposit').hide();
            $('#tx-info-withdraw').show();
            $('#tx-info-quality-upgrade').hide();
            $('#tx-info-airdrop').hide();
            $('#tx-info-buy-bee').hide();
            $('#tx-info-collect-medal').hide();
            $('#tx-info-reward').hide();

            $('#tx-info').flythat("show");
        }).catch(err => {
          console.log(err);
          $('[name="tx-info-success"]').hide();
          $('#tx-info-success-img').hide();
          $('[name="tx-info-fail"]').show();
          $('#tx-info-fail-img').show();
        });
    }, error => {
        showModalAuth(error);
    });
});
