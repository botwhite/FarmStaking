/* ----- super_representative ----- */
$("#modal-super-representative").flythat({});

$('[name="modal-super-representative-init-button"]').click(function(){
    let storage = getStorage();

    provider.getBalance(CONTRACT_ADDRESS)
      .then((balance) => {
        let bonus = balance / Math.pow(10,18) * 0.01;
        $('#modal-super-representative-to-charge').html(format_number(bonus, 2));
        $('#modal-super-representative-get-reward').hide();

        let getUserBonusCount = 0;
        let userBonusCount = 0;
        let empty_tr = '<tr id="modal-super-representative-list-empty">'+$('#modal-super-representative-list-empty').html()+'</tr>';
        let super_representative_arr = [];
        super_representative_arr[0] = empty_tr;
        if (storage['super_repr'] != undefined) {
            let superRepresentativesAddresses = storage['super_repr'].filter(
              (value, index, self) => self.findIndex(val => val === value) === index
            );
            userBonusCount = superRepresentativesAddresses.length;
            console.log(userBonusCount);
            for (let i = 0; i < superRepresentativesAddresses.length; i++) {
                
                CONTRACT.userBonusEarned(superRepresentativesAddresses[i]).then(function(user_earned){
                    if (superRepresentativesAddresses[i] == current_account && user_earned != 0) {
                        $('#modal-super-representative-get-reward').show();
                    }

                    CONTRACT.userBonusPaid(superRepresentativesAddresses[i]).then(function(user_bonus){
                        
                        user_bonus = user_bonus / Math.pow(10,18);
                        super_representative_arr[i] = '  <tr>' +
                          '       <td>' +
                          '           <span class="nuber-position-super">'+(i+1)+'</span>' +
                          '       </td>' +
                          '       <td>' +
                          '           <span class="bee-home bee-home-super"><a class="about-bee" href="https://'+NETWORK_URL+'bscscan.com/address/'+superRepresentativesAddresses[i]+'" target="_blank">'+superRepresentativesAddresses[i]+'</a></span>'+
                          '       </td>' +
                          '       <td class="super-row">' +
                          '           <span class="summa-super">'+format_number(bonus / superRepresentativesAddresses.length, 3)+'</span><span class="monet-style">BNB</span>' +
                          '       </td>' +
                          '       <td class="super-row">' +
                          '           <span class="summa-super">'+format_number(user_bonus, 3)+'</span><span class="monet-style">BNB</span>' +
                          '       </td>' +
                          '   </tr>';
                    }.bind(i)).catch(err => {
                        console.log("ERROR", "web3_userBonusPaid", err);
                    }).finally(() => {
                        getUserBonusCount++;
                    });
                }.bind(i)).catch(err => {
                    console.log("ERROR", "web3_userBonusEarned", err);
                    getUserBonusCount++;
                });
            }
        }

        $('#modal-super-representative').flythat("show");
        let flagGetUserBonus = setInterval(function(){
            if(getUserBonusCount < userBonusCount){
                return;
            }

            clearInterval(flagGetUserBonus);
            let super_representative_list = '';
            for(let i = 0; i < super_representative_arr.length; i++){
                super_representative_list += super_representative_arr[i];
            }

            $('#modal-super-representative-list > div > div').first().html(super_representative_list);
            if(super_representative_list != empty_tr){
                $('#modal-super-representative-list-empty').hide();
            } else {
                $('#modal-super-representative-list-empty').show();
            }

            //$('#modal-super-representative').flythat("show");
        }, 200);
    }).catch(err => {
      console.log("ERROR", "web3_getBalance", err);
    });
});

$('#modal-super-representative-get-reward').click(function() {
  checkMetaMask().then(_ => {
    INTERACT_CONTRACT.retrieveBonus({
      from: current_account,
      value: 0,
      gasPrice: 10 * Math.pow(10, 9)
    }).then(txn => {
      $('#tx-info-tx').attr('href', 'https://' + NETWORK_URL+'bscscan.com/tx/' + txn.hash);
      $('[name="tx-info-success"]').show();
      $('#tx-info-success-img').show();
      $('[name="tx-info-fail"]').hide();
      $('#tx-info-fail-img').hide();

      $('#tx-info-deposit').hide();
      $('#tx-info-withdraw').hide();
      $('#tx-info-quality-upgrade').hide();
      $('#tx-info-airdrop').hide();
      $('#tx-info-buy-bee').hide();
      $('#tx-info-collect-medal').hide();
      $('#tx-info-reward').show();

      $('#tx-info').flythat("show");
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
