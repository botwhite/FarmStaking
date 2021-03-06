/* ----- quality-upgrade ----- */
$("#modal-quality-upgrade").flythat({});
$("#tx-info").flythat({});

$('[name="modal-quality-upgrade-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        $('#modal-quantity-update-honey-balance').html(format_number(balanceHoney));

        let flagQualityHoneyPercentsAndPrices = setInterval(function(){
            if(!isGetQualityHoneyPercentsAndPrices){
                return;
            }

            clearInterval(flagQualityHoneyPercentsAndPrices);
            if(qualityLevel == 5){
                $('#modal-quality-upgrade-about').hide();
                $('#modal-quality-upgrade-next-level').hide();
                $('#modal-quantity-update-button').hide();
                $('#modal-quality-upgrade-max-level').show();
            } else {
                $('#modal-quality-upgrade-about').show();
                $('#modal-quality-upgrade-next-level').show();
                $('#modal-quantity-update-button').show();
                $('#modal-quality-upgrade-max-level').hide();

                let price = quality_prices[qualityLevel+1];
                $('#quality_upgrade_price').html(price);

                let disabled = false;
                if(price > balanceHoney){
                    $('#modal-quantity-update-not-enough').show();
                    $('#modal-quantity-update-button').prop("disabled", true);
                } else {
                    $('#modal-quantity-update-not-enough').hide();
                    $('#modal-quantity-update-button').prop("disabled", false);
                }
            }

            $('#cur_honey_percent').html(quality_honey_percents[qualityLevel]);
            $('#cur_wax_percent').html(100-quality_honey_percents[qualityLevel]);
            $('#next_honey_percent').html(quality_honey_percents[qualityLevel+1]);
            $('#next_wax_percent').html(100-quality_honey_percents[qualityLevel+1]);
            $('[name="modal-quality-upgrade-balance"]').html(format_number(balanceHoney));

            $('#modal-quality-upgrade').flythat("show");
        }, 200);
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-quantity-update-button').click(function(){
    if($('#modal-quantity-update-button').prop('disabled')){
        return;
    }

    if (INTERACT_CONTRACT == undefined || providerSubscribe == undefined) {
      providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
      INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
    }

    checkMetaMask().then(_ => {
        INTERACT_CONTRACT.updateQualityLevel(
          {
            'from': current_account,
            'value': 0, 
            gasPrice: 10 * Math.pow(10, 9)
          }
        ).then(txn => {
            $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
            $('[name="tx-info-success"]').show();
            $('#tx-info-success-img').show();
            $('[name="tx-info-fail"]').hide();
            $('#tx-info-fail-img').hide();
            $('#modal-quality-upgrade').flythat("hide");

            $('#tx-info-deposit').hide();
            $('#tx-info-withdraw').hide();
            $('#tx-info-quality-upgrade').show();
            $('#tx-info-airdrop').hide();
            $('#tx-info-buy-soul').hide();
            $('#tx-info-collect-medal').hide();
            $('#tx-info-reward').hide();

            $('#quality-upgrade-info').flythat("show");
        }).catch(_ => {
          $('[name="tx-info-success"]').hide();
          $('#tx-info-success-img').hide();
          $('[name="tx-info-fail"]').show();
          $('#tx-info-fail-img').show();
        });
    }, error => {
        showModalAuth(error);
    });
});
