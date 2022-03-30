let isLanguageReady = false;
function isLR(){
    return isLanguageReady;
}

let language = {
    'ru': 1,
    'en': 2,
    'ir': 3,
    'zh': 4,
    'es': 5
};

let lang_indexes = {
    1: 'ru',
    2: 'en',
    3: 'ir',
    4: 'zh',
    5: 'es'
};
let language_list = [];
let isFirstLoad = true;

$('#website2').css('opacity', '0');
$('#spinner').show();


$(document).ready(function () {
    if(storage['language'] == undefined){
        storage['language'] = 2;
    }
    $('.drop-down-lg > div > span').html(lang_indexes[storage['language']]);
    
    $.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID_LANG +
          '/values/' + GOOGLE_SHEET_TAB_NAME_LANG + '!A1:L400' + 
          '?key=' + GOOGLE_API_KEY, 
    function(data, result){
        if(result != "success"){
            console.log("ERROR", "get_google", err);
        } else {
            language_list = data.values;
            setLanguage();
        }
    });

   
    $('.drop-down-lg > ul > li > span').click(event => {

        $('.drop-down-lg > ul').removeClass('active-lg-db');
        $('.drop-down-lg > div > span').html($(event.target).html());
        storage['language'] = language[$(event.target).html()];
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
        setLanguage();
    }) 
});


let setLangArr = [];
function setLanguage(){

    let r = randomInteger(1, 1000);
    setLangArr.push(r);

    for(let i = 1; i < language_list.length; i++){
        if(language_list[i][0] == "" || language_list[i][0] == undefined){
            continue;
        }

        try {
          $("."+language_list[i][0]).html(language_list[i][storage['language']]);
        } catch (e) {
          console.log(`[LANG] ${e.message}`);
        }
    }

    if(isFirstLoad){
        if(window.location.pathname == '/game.html'){
            startLoader(100, 15, setLangArr.indexOf(r));
        } else {
            startLoader(100, 6, setLangArr.indexOf(r));
            // setTimeout(function(){
            //     $('#website2').css('opacity', '1');
            //     $('#spinner').remove();
            // }, 1500);
        }
    }
}

function startLoader(progress, speed, setter){
    if(setLangArr.length > 1){
        setLangArr.splice(setLangArr.indexOf(setter), 1);
        return;
    }

    progress = progress - 100/speed;
    if(progress <= 0){
        setLangArr.splice(setLangArr.indexOf(setter), 1);
        isLanguageReady = true;
        $('#website2').css('opacity', '1');
        $('#spinner').remove();
        return;
    }

    if(progress <= 0){
        progress = 0;
    }
    $('#progress_loader').css('right', progress+'%');

    setTimeout(function(){
        startLoader(progress, speed, setter);
    }, 250);
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}