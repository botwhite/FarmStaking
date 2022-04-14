/* ----- referrals ----- */
$("#modal-referrals").flythat({});

$('[name="modal-referrals-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        let storage = getStorage();
        let current_account = getCurrentAccount();
        
        let url = window.location.href;
        $('.reffer-link').html(`${window.location.origin}${window.location.pathname}?${current_account}`);
        
        if(storage[current_account]['referrals'] == undefined){
            storage[current_account]['referrals'] = {};
        }
        if(storage[current_account]['referrals']['refs'] == undefined){
            storage[current_account]['referrals']['refs'] = {};
        }

        let profit = 0;
        let empty_tr = '<tr id="modal-referrals-list-empty">'+$('#modal-referrals-list-empty').html()+'</tr>';
        let referrals_list = empty_tr;
        for (let addr in storage[current_account]['referrals']['refs']) {
            profit += parseInt(storage[current_account]['referrals']['refs'][addr].amount / honeyEqual1eth);
            referrals_list += '  <tr>'+
                             '      <td>'+
                             '          <span class="date-table">'+storage[current_account]['referrals']['refs'][addr].join+'</span>'+
                             '      </td>'+
                             '      <td>'+
                             '          <span class="soul-home"><a class="about-soul" href="https://'+NETWORK_URL+'bscscan.com/address/'+addr+'" target="_blank">'+addr+'</a></span>'+
                             '      </td>'+
                             '      <td>'+
                             '          <span class="reit-referal">'+storage[current_account]['referrals']['refs'][addr].level+'</span>'+
                             '      </td>'+
                             '      <td>'+
                             '          <span class="summa activ-honey">'+parseInt(storage[current_account]['referrals']['refs'][addr].amount / honeyEqual1eth)+'</span>'+
                             '      </td>'+
                             '  </tr>';
        }
        $('#modal-referrals-list > div > div').first().html(referrals_list);
        if(referrals_list != empty_tr){
            $('#modal-referrals-list-empty').hide();
        } else {
            $('#modal-referrals-list-empty').show();
        }

        $('#modal-referrals-bees-count').html(format_number(Object.keys(storage[current_account]['referrals']['refs']).length));
        $('#modal-referrals-total-profit').html(format_number(profit));

        $('#modal-referrals').flythat("show");
    

    }, error => {
        showModalAuth(error);
    });
});

$('.reffer-btn').click(function(){
    copyToClipboard($('.reffer-link').html());
    console.log('copy');
});

