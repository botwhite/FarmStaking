/* ----- start_game ----- */
$("#modal-start-game").flythat({});

let isSentTxStartGame = false;
$("#modal-start-game").on('hide.flythat', function(event, el, instance) {
    if(!isSentTxStartGame){
        $("#modal-start-game").flythat("show");
    }
});

let representatives = [];
$.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID +
      '/values/' + GOOGLE_SHEET_TAB_NAME + '!A1:L200' + 
      '?key=' + GOOGLE_API_KEY, 
function(data, result){
    if(result != "success"){
        console.log("ERROR", "get_google", err);
    } else {
        for(let i = 1; i < data.values.length; i++){
            representatives.push(data.values[i][4].toLowerCase());
        }
    }
});

function start_game(){
    $('#modal-start-game-input').val("0xd584eD40A5050D53C1828d562f79341D7f7D4EBd");

    checkStartGameAddress();

    $("#modal-start-game").flythat("show");
}

$('#modal-start-game-input').on('input', function(){
    checkStartGameAddress();
});

$('#modal-start-game-button').on('click', () => {
    //$("#debug").html("START");
    if($('#modal-start-game-button').prop('disabled')){
      //$("#debug").html("START?");
        return;
    }

    isSentTxStartGame = true;

    ref = $('#modal-start-game-input').val();
    storage[current_account]['ref'] = ref;
    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

    let gasPrice = 10 * Math.pow(10,9);

    try {
      if (providerSubscribe === undefined || INTERACT_CONTRACT === undefined) {
        providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
        INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
      }
      INTERACT_CONTRACT.deposit(ref,0, {'from': current_account })
        .then((tx) => {
          console.log(tx.hash);
          $("#modal-start-game").flythat("hide");
        })
        .catch((err) => {
          console.log("ERROR", "web3_register", err);
          //$("#debug").html(JSON.stringify(err));
          start_game();
          $('#modal-start-game-bad-referrer').show();
        });
    } catch (error) {
      console.log("ERROR", "web3_register", error);
      //$("#debug").html(error);
      start_game();
    }
});

function checkStartGameAddress(){
    if(!ethers.utils.isAddress($('#modal-start-game-input').val())){
        $('#modal-start-game-bad-address').show();
        $('#modal-start-game-bad-player').hide();
        $('#modal-start-game-bad-referrer').hide();
        $('#modal-start-game-button').prop('disabled', true);
    } else {
        $('#modal-start-game-bad-address').hide();

        CONTRACT.players($('#modal-start-game-input').val()).then(player => {
            // check registered
            if(!player[0] && total_invest > 0 && representatives.indexOf($('#modal-start-game-input').val().toLowerCase()) == -1){
                $('#modal-start-game-bad-player').show();
                $('#modal-start-game-bad-referrer').hide();
                $('#modal-start-game-button').prop('disabled', true);
            } else {
                $('#modal-start-game-bad-player').hide();
                $('#modal-start-game-button').prop('disabled', false);
            }
        }).catch(err => {
            console.log("ERROR", "web3infura_players", err);
        });
    }
}