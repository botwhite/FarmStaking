let bees_can_unlock = [true, true, false, false, false, false, false, false];

function format_number(number, toFixed = 0){
	if(number == undefined)
		number = 0;

	let int_part = number.toString().split('.');
	let str_number_last_pos = int_part[0].length - 1;
	let result = "";
	for(let i = str_number_last_pos; i >= 0; i--){
		if((str_number_last_pos - i) % 3 == 0 && i != str_number_last_pos)
			result = " " + result;
		result = number.toString()[i] + result;
	}

	if(int_part[1] != undefined && toFixed != 0){
		result += "." + int_part[1].substring(0,toFixed);
	}

	return result;
}

function DEBUG(o){
	let res = '';
	for(key in o){
		res += key + ' => ' + o[key] + '\n';
	}
	alert(res);
}

function getCoinsPerEth(contract){
	return new Promise(function(ok, fail){
		contract.COINS_PER_BNB().then(amount => {
			ok({'waxEqual1eth':amount, 'honeyEqual1eth':amount});
		}).catch(error => {
			fail(error);
		});
	});
}

function getMedalsPoints(contract){
	return new Promise(function(ok, fail){
		contract.MEDALS_COUNT().then(medals_count => {
			let counter = 0;
			let error;
			medals_points = [];
			medals_rewards = [];
			for(let i = 0; i < medals_count; i++){
		    	contract.MEDALS_POINTS(i).then(function(point){
					medals_points[i] =  Math.ceil(point / Math.pow(10, 18));
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });

				contract.MEDALS_REWARDS(i).then(function(reward){
					medals_rewards[i] =  Math.ceil(reward / Math.pow(10, 18));
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });
			}

			let flagMedalsPoints = setInterval(function(){
				if(2*medals_count > counter){
					return;
				}

				clearInterval(flagMedalsPoints);
				if(error != undefined){
					fail(error);
				}
				ok({'medals_points':medals_points, 'medals_rewards':medals_rewards});
			}, 200);
		}).catch(err => {
			fail(err);
		});
	});
}

function getBeeMonthlyPercents(contract){
	return new Promise(function(ok, fail){
		contract.BEES_COUNT().then(bees_count => {
			let counter = 0;
			let error;
			bee_monthly_percents = [];
			unlockBeePrice = [];
			bee_levels_prices = [];
			for(let i = 0; i < bees_count; i++){
			    contract.BEES_MONTHLY_PERCENTS(i).then(function(monthlyPercents){
			    	bee_monthly_percents[i] = monthlyPercents;
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });

			    contract.BEES_LEVELS_PRICES(i).then(function(unlockPrice){
			    	unlockBeePrice[i] =  unlockPrice / Math.pow(10, 18);
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });

			    contract.BEES_PRICES(i).then(function(levelPrice){
			    	bee_levels_prices[i] =  Math.ceil(levelPrice / Math.pow(10, 18));
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });
			}

			let flagBeesMonthlyPercents = setInterval(function(){
				if(3*bees_count > counter){
					return;
				}

				clearInterval(flagBeesMonthlyPercents);
				if(error != undefined){
					fail(error);
				}
				ok({'bee_monthly_percents':bee_monthly_percents,'bee_levels_prices':bee_levels_prices,'unlockBeePrice':unlockBeePrice});
			}, 200);
		}).catch(err => {
			fail(err);
		});
	});
}

function getQualityHoneyPercents(contract){
	return new Promise(function(ok, fail){
		contract.QUALITIES_COUNT().then(qualities_count => {
			let counter = 0;
			let error;
			quality_honey_percents = [];
			quality_prices = [];
			for(let i = 0; i < qualities_count; i++){
			    contract.QUALITY_HONEY_PERCENT(i).then(function(qualityHoneyPercent){
			    	quality_honey_percents[i] = Number.parseInt(qualityHoneyPercent);
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });

				contract.QUALITY_PRICE(i).then(function(qualityPrice){
			    	quality_prices[i] =  Math.ceil(qualityPrice / Math.pow(10,18));
			    }.bind(i)).catch(err => {
			    	error = err;
			    }).finally(() => {
			    	counter++;
			    });
      }

			let flagQualityHoneyPercentsAndPrices = setInterval(function(){
				if(2*qualities_count > counter){
					return;
				}

				clearInterval(flagQualityHoneyPercentsAndPrices);
				if(error != undefined){
					fail(error);
				}
				ok({'quality_honey_percents':quality_honey_percents, 'quality_prices':quality_prices});
			}, 200);
		}).catch(err => {
			fail(err);
		});
	});
}

function getFirstBeeAirdropAmount(contract){
	return new Promise(function(ok, fail){
		contract.FIRST_BEE_AIRDROP_AMOUNT().then(airdropAmount => {
			first_bee_airdrop_amount = airdropAmount / Math.pow(10,18);
			ok({'first_bee_airdrop_amount':first_bee_airdrop_amount});
		}).catch(err => {
			fail(err);
		});
	});
}

function calculateProfitAtHour(bees, bee_monthly_percents, bee_levels_prices){
	let result = 0;
	for(let i = 0; i < bees.length; i++){
		result += parseFloat(bee_levels_prices[i] * bee_monthly_percents[i] / 100 / 30 / 24) * bees[i];
	}
	return result;
}

function fillBeesWaxes(playerBees = [], airdropCollected = false, registered = false, unlockedBee = 0, superBeeUnlocked = false){
	for(let bee_type = 1; bee_type <= 8; bee_type++){
		let bee_type_wax = '';

		for(let i = 1; i <= 32; i++){
			let number_wax = (i < 10 ? ''+0+i : ''+i);
			let bee_img = '';
			if(playerBees[bee_type-1] >= i)
				bee_img = '<img src="image/by-bee.png">';

			bee_type_wax += '<div class="hexagon-container hexagon-'+i+' active-bee">'+
			                    bee_img+
			                    '<div class="hexagon">'+
			                    '<span class="namber-wax">'+number_wax+'</span>'+
			                    '</div>'+
			                    '<div class="trx-rounde">'+
			                        '<span>+0,0925</span>'+
			                    '</div>'+
			                '</div>';
		}
		$('#bee_type_'+bee_type+' > div > div > .sotu-container').html(bee_type_wax);

		if(bee_type == 1){
			continue;
		}

		if((bee_type != 2 || playerBees[bee_type-1] != 32) && unlockedBee < bee_type-1){
			$('#bee_type_button_'+bee_type).addClass('red-btn');
			// $('#bee_type_button_'+bee_type).addClass('none-active');
			bees_can_unlock[bee_type-1] = false;
			$('#bee_type_button_'+bee_type).removeClass('bay-bee-btn');
			$('#bee_type_button_'+bee_type).html('Unlock');
		}

		if(bee_type != 8 && playerBees[bee_type-2] == 32){
			bees_can_unlock[bee_type-1] = true;
			$('#bee_type_button_'+bee_type).removeClass('none-active');
			$('#bee_type_button_'+bee_type).addClass('bay-bee-btn');
			if(unlockedBee < bee_type-1){
				$('#bee_type_button_'+bee_type).html('Unlock');
				$('#bee_type_button_'+bee_type).addClass('UNLOCK');
				$('#bee_type_button_'+bee_type).removeClass('BUY_A_BEE');
			} else {
				$('#bee_type_button_'+bee_type).removeClass('red-btn');
				$('#bee_type_button_'+bee_type).html('Buy a bee');
				$('#bee_type_button_'+bee_type).removeClass('UNLOCK');
				$('#bee_type_button_'+bee_type).addClass('BUY_A_BEE');
			}
		}

		if(bee_type != 8 && playerBees[bee_type-1] == 32){
			$('#bee_type_button_'+bee_type).removeClass('red-btn');
			$('#bee_type_button_'+bee_type).addClass('none-active');
			$('#bee_type_button_'+bee_type).addClass('bay-bee-btn');
			$('#bee_type_button_'+bee_type).addClass('COLLECTED');
			$('#bee_type_button_'+bee_type).removeClass('COLLECT');
			$('#bee_type_button_'+bee_type).html('Collected');
		}

		if(bee_type == 8 && superBeeUnlocked){
			$('#bee_type_button_'+bee_type).removeClass('none-active');
			$('#bee_type_button_'+bee_type).addClass('bay-bee-btn');
			$('#bee_type_button_'+bee_type).removeClass('red-btn');
			$('#bee_type_button_'+bee_type).html('Buy a bee');
			$('#bee_type_button_'+bee_type).removeClass('UNLOCK');
			$('#bee_type_button_'+bee_type).addClass('BUY_A_BEE');
		}
	}

	if(registered && !airdropCollected){
		$('#bee_type_1 > div').addClass('no-active-round');

		$('#bee_type_1 > div > div > a').removeClass('COLLECTED');
		$('#bee_type_1 > div > div > a').addClass('COLLECT');

		let wax = $('#bee_type_1 > div').html();
		$('#bee_type_1 > div').html(wax + '<div class="drop-big">'+
            '<img src="image/big-drop.png"/>'+
            '<div class="text-drop">'+
                '<span class="info-big-drop" name="first_bee_airdrop_amount">1000</span>'+
            '</div>'+
        '</div>');

        $('[name="first_bee_airdrop_amount"]').html(first_bee_airdrop_amount);
        $.get('js/eth/airdrop_collect.js');
	} else {
		$('#bee_type_1 > div').removeClass('no-active-round');

		$('#bee_type_1 > div > div > a').addClass('COLLECTED');
		$('#bee_type_1 > div > div > a').removeClass('COLLECT');
		$('#bee_type_1 > div > .drop-big').remove();
	}

	setLanguage();
}

function copyToClipboard(str){
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function getDateTime(timestamp) {
	date = new Date(timestamp);
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}