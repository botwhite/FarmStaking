/* ----- history ----- */
$("#modal-games-history").flythat({});

$('[name="modal-history-games-button"]').click(function(){
    checkMetaMask().then(ok => {

        $('#modal-games-history').flythat("show");
    }, error => {
        showModalAuth(error);
    });
});

function compareDepositAndWithdraw(a, b) {
    if (a.blockNumber < b.blockNumber){
        return -1;
    }
    if (a.blockNumber > b.blockNumber){
        return 1;
    }
    return 0;
}
