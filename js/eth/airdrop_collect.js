/* ----- airdrop_collect ----- */
$("#modal-airdrop-collect").flythat({});
$("#modal-medal-info").flythat({});
$("#tx-info").flythat({});

$('#modal-collect-airdrop-init-button').click(function(){
    if(airdropCollected || !registered){
        return;
    }

    checkMetaMask().then(ok => {
        const gasPrice = 10 * Math.pow(10,9);
        INTERACT_CONTRACT.collect({'from':current_account, 'value':0, 'gasPrice':gasPrice}).then((txn) => {
            $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash); //TODO: change url to the scanner
            $('[name="tx-info-success"]').show();
            $('#tx-info-success-img').show();
            $('[name="tx-info-fail"]').hide();
            $('#tx-info-fail-img').hide();
            // $('#modal-airdrop-collect').flythat("show");
            
            $('#tx-info-deposit').hide();
            $('#tx-info-withdraw').hide();
            $('#tx-info-quality-upgrade').hide();
            $('#tx-info-airdrop').show();
            $('#tx-info-buy-bee').hide();
            $('#tx-info-collect-medal').hide();

            $('#tx-info').flythat("show");
        }).catch(err => {
          $('[name="tx-info-success"]').hide();
          $('#tx-info-success-img').hide();
          $('[name="tx-info-fail"]').show();
          $('#tx-info-fail-img').show();
        });
    }, error => {
        showModalAuth(error + "6");
    });
});

/* ----- collect-medal ----- */
$('#collect-medal').click(function(){
    $('#modal-medal-info').flythat("hide");
    
    checkMetaMask().then(ok => {
        let gasPrice = 10 * Math.pow(10,9);
        INTERACT_CONTRACT.collectMedals(current_account, {'from':current_account, 'value':0, 'gasPrice':gasPrice})
          .then(txn => {
            $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL + 'bscscan.com/tx/' + txn.hash);
            $('[name="tx-info-success"]').show();
            $('#tx-info-success-img').show();
            $('[name="tx-info-fail"]').hide();
            $('#tx-info-fail-img').hide();   
            
            $('#tx-info-deposit').hide();
            $('#tx-info-withdraw').hide();
            $('#tx-info-quality-upgrade').hide();
            $('#tx-info-airdrop').hide();
            $('#tx-info-buy-bee').hide();
            $('#tx-info-collect-medal').show();

            $('#tx-info').flythat("show");
        }).catch(err => {
          $('[name="tx-info-success"]').hide();
          $('#tx-info-success-img').hide();
          $('[name="tx-info-fail"]').show();
          $('#tx-info-fail-img').show();
        });
    }, error => {
        showModalAuth(error + "7");
    });
});
