/* ----- buy_bee ----- */
$("#modal-buy-soul").flythat({});
$("#modal-unlock-soul").flythat({});
$("#tx-info").flythat({});
$("#web-info").flythat({});

let id = 2;

$('#modal-soul-buy-minus').click(function(){
    let input_val = parseInt($('#modal-soul-buy-input').val());
    if(input_val <= 1){
        input_val = 2;
    }
    
    let price = bee_levels_prices[id-1] * (input_val-1);
    $('#modal-soul-buy-input').val(input_val-1);
    $('#modal-soul-buy-price').html(format_number(price));
    //check that have
    if(price > balanceHoney*1.1+balanceWax){
        $('#modal-buy-soul-button').prop('disabled', true);
        $('[name="modal-buy-soul-not-enough"]').show();
        $('#modal-buy-soul-comment').hide();
        $('[name="modal-buy-soul-button"]').hide();
    } else {
        $('#modal-buy-soul-button').prop('disabled', false);
        $('[name="modal-buy-soul-not-enough"]').hide();
        $('#modal-buy-soul-comment').show();
        $('[name="modal-buy-soul-button"]').show();
    }
});

$('#modal-soul-buy-plus').click(function(){
    let input_val = parseInt($('#modal-soul-buy-input').val());
    if(input_val >= 32 - playersouls[id-1]){
        input_val = 32 - playersouls[id-1] - 1;
    }
    
    let price = bee_levels_prices[id-1] * (input_val+1);
    $('#modal-soul-buy-input').val(input_val+1);
    $('#modal-soul-buy-price').html(format_number(price));
    //check that have
    if(price > balanceHoney*1.1+balanceWax){
        $('#modal-buy-soul-button').prop('disabled', true);
        $('[name="modal-buy-soul-not-enough"]').show();
        $('#modal-buy-soul-comment').hide();
        $('[name="modal-buy-soul-button"]').hide();
    } else {
        $('#modal-buy-soul-button').prop('disabled', false);
        $('[name="modal-buy-soul-not-enough"]').hide();
        $('#modal-buy-soul-comment').show();
        $('[name="modal-buy-soul-button"]').show();
    }
});

let element;

$('[name="bee_type_button"]').click(function(event){
    element = event.target.id;

    if($('#'+element).hasClass('none-active')){
        return;
    }

    id = parseInt(element.split('bee_type_button_')[1]);
    checkMetaMask().then(ok => {
        if(!isGetBeeMonthlyPercentsAndPrices || !isGetPlayerBees){
            $('#web-info').flythat("show");
            return;
        }

        for(let i = 2; i <= 8; i++){
            $('[name="modal-buy-soul-'+i+'"]').hide();    
        }
        $('[name="modal-buy-soul-'+id+'"]').show();
        $('[name="modal-soul-buy-amount"]').html(format_number(balanceHoney*1.1+balanceWax));

        $('#modal-unlock-soul-price').html(format_number(bee_levels_prices[id-1]));
        $('#modal-unlock-soul-unlock-price').html(format_number(unlockBeePrice[id-1]));
        $('#modal-unlock-soul-percent').html(bee_monthly_percents[id-1]);
        $('#modal-unlock-soul-profit').html(format_number(parseFloat(bee_levels_prices[id-1] * bee_monthly_percents[id-1] / 30 / 24 / 100), 2));

        $('[name="modal-buy-soul-img"]').attr('src', 'image/'+id+'.png');
        $('#modal-buy-soul-have').html(playersouls[id-1]);

        $('#modal-soul-buy-input').val(1);
        $('#modal-soul-buy-price').html(format_number(bee_levels_prices[id-1]));
        $('#modal-soul-buy-max').html(32 - playersouls[id-1]);
        
        if($(event.target).html() == "Unlock" || $(event.target).html() == "Открыть"){
            $('#modal-unlock-soul').flythat("show"); 

            $('[name="modal-unlock-soul-need-collect"]').hide();
            $('[name="modal-unlock-soul-button-collect"]').hide();
            $('[name="modal-buy-soul-button"]').show();

            if(balanceHoney*1.1+balanceWax < unlockBeePrice[id-1]){
                $('[name="modal-buy-soul-button"]').prop('disabled', true);
                $('[name="modal-buy-soul-not-enough"]').show();
            } else {
                $('[name="modal-buy-soul-button"]').prop('disabled', false);
                $('[name="modal-buy-soul-not-enough"]').hide();

                if(notImaginaryBalanceHoney*1.1+notImaginaryBalanceWax < unlockBeePrice[id-1]){
                    $('[name="modal-buy-soul-not-enough"]').hide();
                    $('[name="modal-buy-soul-button"]').hide();
                    $('[name="modal-unlock-soul-need-collect"]').show();
                    $('[name="modal-unlock-soul-button-collect"]').show();
                }
            }

            if(!bees_can_unlock[element.split('bee_type_button_')[1]-1] || (element.split('bee_type_button_')[1]-1 == 6 && medal < 9)){
                $('#modal-unlock-soul-about-first').hide();
                $('#modal-unlock-soul-about-failed').hide();
                $('#modal-unlock-soul-about-last').hide();

                if(element.split('bee_type_button_')[1]-1 == 1){
                    $('#modal-unlock-soul-about-first').show();    
                } else if(element.split('bee_type_button_')[1]-1 == 7){
                    $('#modal-unlock-soul-about-last').show();
                } else {
                    $('#modal-unlock-soul-about-failed').show();
                }
                $('#modal-unlock-soul-about-success').hide();
                $('[name="modal-buy-soul-button"]').hide();
                $('[name="modal-buy-soul-not-enough"]').hide();
            } else {
                $('#modal-unlock-soul-about-first').hide();   
                $('#modal-unlock-soul-about-failed').hide();
                $('#modal-unlock-soul-about-last').hide();
                $('#modal-unlock-soul-about-success').show();
                $('[name="modal-buy-soul-button"]').show();
            }
        } else {
            $('[name="modal-buy-soul-button"]').show();
            if($('#modal-soul-buy-input').val() * bee_levels_prices[id-1] > balanceHoney*1.1+balanceWax){
                $('[name="modal-buy-soul-button"]').prop('disabled', true);
                $('[name="modal-buy-soul-not-enough"]').show();
                $('#modal-buy-soul-comment').hide();
                $('.wrapper-pay-soul-input').hide();
            } else {
                $('[name="modal-buy-soul-button"]').prop('disabled', false);
                $('[name="modal-buy-soul-not-enough"]').hide();
                $('#modal-buy-soul-comment').show();
                $('.wrapper-pay-soul-input').show();
            }

            if(id == 8){
                if(registered < parseInt((new Date()).getTime()/1000) - 60*60*24*7){
                    $('[name="modal-buy-soul-button"]').prop('disabled', true);
                    $('[name="modal-buy-soul-not-in-time"]').show();
                    $('[name="modal-buy-soul-not-enough"]').hide();
                    $('#modal-buy-soul-comment').hide();
                }
            }

            $('#modal-buy-soul').flythat("show");
        }
        
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-soul-buy-input').on('input', function(){
    let value = parseInt($('#modal-soul-buy-input').val());

    if(value < 1){
        value = 1;
    }
    if(value > 32 - playersouls[id-1]){
        value = 32 - playersouls[id-1];
    }
    
    let price = (isNaN(value) ? 0 : bee_levels_prices[id-1] * value);
    $('#modal-soul-buy-input').val(value);
    $('#modal-soul-buy-price').html(format_number(price));

    //check that have
    if(price > balanceHoney*1.1+balanceWax || isNaN(value)){
        $('#modal-buy-soul-button').prop('disabled', true);
        $('#modal-buy-soul-comment').hide();
        $('[name="modal-buy-soul-button"]').hide();

        if(isNaN(value)){
            $('[name="modal-buy-soul-not-enough"]').hide();
            $('[name="modal-buy-soul-not-value"]').show();
        } else {
            $('[name="modal-buy-soul-not-enough"]').show();
            $('[name="modal-buy-soul-not-value"]').hide();
        }
    } else {
        $('#modal-buy-soul-button').prop('disabled', false);
        $('[name="modal-buy-soul-not-enough"]').hide();
        $('[name="modal-buy-soul-not-value"]').hide();
        $('#modal-buy-soul-comment').show();
        $('[name="modal-buy-soul-button"]').show();
    }
});

$('[name="modal-buy-soul-button"]').on('click', () => {
    //$(".debug").html("START");
    if($('#modal-buy-soul-button').prop('disabled') || (!bees_can_unlock[element.split('bee_type_button_')[1]-1] && id != 8) || (id == 8 && !superBeeUnlocked)){
        return;
    }

    let value = parseInt($('#modal-soul-buy-input').val());
    checkMetaMask().then(_ => {
        let gasPrice = 10 * Math.pow(10, 9);

        if (INTERACT_CONTRACT === undefined) {
          providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
          INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
        }
        if(unlockedBee < id-1 && id != 8){
        console.log(id-1)
        console.log(unlockedBee)

          INTERACT_CONTRACT.unlock(id-1, {'from':current_account, 'value':0, 'gasPrice':gasPrice})
            .then(txn => {
              actionAfterMetamask(false, txn.hash);
            }).catch(err => {
              actionAfterMetamask(err, "");
            });
        } else {
            INTERACT_CONTRACT.buysouls(id-1, value, {'from':current_account, 'value':0, 'gasPrice':gasPrice})
              .then(txn => {
                actionAfterMetamask(false, txn.hash)
              }).catch(err => {
                actionAfterMetamask(err, "");
              });
        }
    }, error => {
        showModalAuth(error);
    });
});

$('[name="modal-unlock-soul-button-collect"]').click(function(){
    checkMetaMask().then(ok => {
        let gasPrice = 10 * Math.pow(10,9);
        INTERACT_CONTRACT.collect({'from':current_account, 'value':0, 'gasPrice':gasPrice})
          .then(txn => {
            actionAfterMetamask(false, txn.hash);
          }).catch(err => {
            actionAfterMetamask(err, "");
          });
    }, error => {
        showModalAuth(error);
    });
});

function actionAfterMetamask(err, hash){
    
    if(err){
        $('[name="tx-info-success"]').hide();
        $('#tx-info-success-img').hide();
        $('[name="tx-info-fail"]').show();
        $('#tx-info-fail-img').show();
    } else {
        $('#tx-info-tx').attr('href', 'https://'+NETWORK_URL+'bscscan.com/tx/'+hash);
        $('[name="tx-info-success"]').show();
        $('#tx-info-success-img').show();
        $('[name="tx-info-fail"]').hide();
        $('#tx-info-fail-img').hide();
        $('#modal-buy-soul').flythat("hide");
        $("#modal-unlock-soul").flythat("hide");
    }

    $('#tx-info-deposit').hide();
    $('#tx-info-withdraw').hide();
    $('#tx-info-quality-upgrade').hide();
    $('#tx-info-airdrop').hide();
    $('#tx-info-buy-soul').show();
    $('#tx-info-collect-medal').hide();
    $('#tx-info-reward').hide();

    $('#tx-info').flythat("show");
}