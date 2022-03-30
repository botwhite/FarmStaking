/* ----- rates ----- */
$("#modal-rates").flythat({});

$('[name="modal-rate-init-button"]').click(function(){
    let storage = getStorage();
    if(storage["rate"] == undefined){
        storage["rate"] = {};
    }
    if(storage["rate"]['rating'] == undefined){
        storage["rate"]['rating'] = [];
    }
    if(storage["rate"]['your_position'] == undefined){
        storage["rate"]['your_position'] = '--';
    }
    if(storage["rate"]['players_count'] == undefined){
        storage["rate"]['players_count'] = '--';
    }

    let empty_tr = '<tr id="modal-rates-list-empty">'+$('#modal-history-list-empty').html()+'</tr>';
    let rates_list = empty_tr;
    for(let i = 0; i < storage["rate"]['rating'].length; i++){
        rates_list +=   '  <tr>'+
                        '      <td id="modal-rates-list-pos-'+(i+1)+'">'+
                        '          <span class="nuber-position">'+(i+1)+'</span>'+ 
                        '      </td>'+
                        '      <td>'+
                        '          <span class="bee-home"><a class="about-bee" href="https://'+NETWORK_URL+'bscscan.com/address/'+storage["rate"]['rating'][i].address+'" target="_blank">'+storage["rate"]['rating'][i].address+'</a></span>'+
                        '      </td>'+
                        '      <td>'+
                        '          <span class="doxod"></span>+<span class="summa activ-honey">'+format_number(storage["rate"]['rating'][i].profit)+'</span>'+
                        '      </td>'+
                        '  </tr>';
    }
    $('#modal-rates-list > div > div').first().html(rates_list);
    if(rates_list != empty_tr){
        $('#modal-rates-list-empty').hide();    
    } else {
        $('#modal-rates-list-empty').show();
    }

    for(let i = 0; i < storage["rate"]['rating'].length; i++){
        let url = "";
        if(storage["rate"]['rating'][i].medal != undefined && storage["rate"]['rating'][i].medal > 0 && storage["rate"]['rating'][i].medal <= 10){
            url = "../image/medal-"+storage["rate"]['rating'][i].medal+".png";
        }
        $('#modal-rates-list-pos-'+(i+1)).css("background", "url("+url+")no-repeat");
        $('#modal-rates-list-pos-'+(i+1)).css("background-size", "contain");
        $('#modal-rates-list-pos-'+(i+1)).css("background-position", "right");
    }

    $('#modal-rates-position').html(format_number(storage["rate"]['your_position'])/* + " / " + format_number(storage["rate"]['players_count'])*/);

    $('#modal-rates').flythat("show");
});

