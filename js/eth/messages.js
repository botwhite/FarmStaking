const MESSAGES_NUMBER = 1;

setTimeout(async function showSuperBeeModal() {
  try {
    if (INTERACT_CONTRACT === undefined) {
      providerSubscribe = new ethers.providers.Web3Provider(window.ethereum);
      INTERACT_CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, providerSubscribe.getSigner());
    }

    let isUnlocked = await INTERACT_CONTRACT.isSupersoulUnlocked ();
    if (isUnlocked) {
      //$('#superBeeModal').flythat("show");
    } else {
      $('#superBeeModal').flythat("hide");
    }
  } catch (ex) {
    setTimeout(showSuperBeeModal, 2000);
    return;
  }

  //setTimeout(showSuperBeeModal, 60000);
}, 2000);

let messageNum = Number.parseInt(localStorage.getItem('message_counter'));
if (isNaN(messageNum)) {
  messageNum = 0;
}

setTimeout(function showMessage() {
  try {
    $(`#message-modal-${messageNum+1}`).flythat("show");

    localStorage.setItem('message_counter', (++messageNum) % MESSAGES_NUMBER);
  } catch (e) {
    setTimeout(showMessage, 2000);
  }
}, 1000);
