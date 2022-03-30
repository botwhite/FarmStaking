$(document).ready(function () {
    $.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID +
          '/values/' + GOOGLE_SHEET_TAB_NAME + '!A1:L200' + 
          '?key=' + GOOGLE_API_KEY, 
    function(data, result){
        if(result != "success"){
            console.log("ERROR", "get_google", err);
        } else {
            let representatives = '';
            let repr_arr = [];
            let steps = 1;

            //console.log(data);

            for(let i = 1; i < data.values.length; i++){
                if(data.values[i][10] != 1){
                    steps++;
                    continue;
                }

                let addr = data.values[i][4].toLowerCase();
                if (!ethers.utils.isAddress(addr)) {
                    addr = data.values[i][4].split('?')[1];
                    if (!ethers.utils.isAddress(addr)) {
                        console.log("Incorrect address " + data.values[i][4]);
                        continue;
                    }
                }
                CONTRACT.players(addr).then(function(player){

                    let medal = Number.parseInt(player[6], 16);
                    if(medal > 0){
                        medal = '-' + medal;
                    } else {
                        medal = '';
                    }

                    let referrals = 0;
                    console.log(UTILITY_URL + '/referrals?account='+addr);
                    $.get(UTILITY_URL + '/referrals?account='+addr, function(referrals_data, result){
                        if(result != "success"){
                            console.log("ERROR", "/referrals", addr, err);
                        } else {
                            if(referrals_data['refs'] != undefined){
                                referrals = Object.keys(referrals_data['refs']).length;
                            }
                        }

                        repr_arr[i] =  '<li class="item-representative">' +
                                '   <div class="container-representative">' +
                                '       <div class="wrapper-relative-avatar">' +
                                '           <div class="wrapper-avatar-representative">' +
                                '               <div class="container-avatar-representative">' +
                                '                   <img src="'+data.values[i][2]+'" alt="representative photo">' +
                                '               </div>' +
                                '               <div class="position-status-block">' +
                                '                   <img src="image/_big-medal-1.png" alt="medal status">' +
                                '                   <h4 class="number-medal">'+referrals+'</h4>' +
                                '               </div>' +
                                '           </div>' +
                                '       </div>' +
                                '   </div>' +
                                '   <div class="container-contact-info">' +
                                '       <div class="content-contact-info">' +
                                '           <div class="header-contact-item">' +
                                '               <h3 class="title-contact-info">'+data.values[i][1]+'</h3>' +
                                '               <span class="country-contact">'+data.values[i][3]+'</span>' +
                                '           </div>' +
                                '           <ul class="contact-list-user">' +
                                '               <li class="item-contact">' +
                                '                   <span class="connection-address"><a href="'+data.values[i][6]+'">'+data.values[i][5]+'</a></span>' +
                                '                   <span class="connection-number"><a href="'+data.values[i][8]+'">'+data.values[i][7]+'</a></span>' +
                                '               </li>' +
                                '           </ul>' +
                                '       </div>' +
                                '      <button type="button" class="button-btn copy-this-link CHOOSE_SPONSOR" id="select_'+addr+'" name="select_ref">Выбрать спонсором</button>' +
                                '   </div>' +
                                '</li>';
                        steps++;
                    });
                }.bind(addr, i)).catch(err => {
                    console.log("ERROR", "web3_players", err);
                    steps++;
                });

                
            }
            
            let awaitRepr = setInterval(function(){
                if(steps < data.values.length){
                    return;
                }

                clearInterval(awaitRepr);
                for(let i = 0; i < repr_arr.length; i++){
                    if(repr_arr[i] == undefined){
                        continue;
                    }
                    representatives += repr_arr[i];
                }
                
                $('.list-representative').html(representatives);

                $('[name="select_ref"]').click(function(event){
                    let ref = event.target.id.split('_')[1];
                    window.location.href = "/game.html?" + ref;
                });

                setLanguage();
            }, 200);
        }
    });

    
});

$('#representative_button').click(function(){
    window.location.href = "https://docs.google.com/forms/d/1m6xK8vnGngx5a8pR9PGVFcSGMrW_JXwDfn9kWpcCGN0/edit";
});
