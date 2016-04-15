/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { 
		app.receivedEvent('deviceready'); 
		window.location.hash == "indexMachineList";
		 
        if (window.cordova.platformId == "browser") {
			 
			facebookConnectPlugin.browserInit('900945193337430', 'v2.5', function(){
				initFB();
			});			
		} else {
			
			initFB();
		} 
		$('#indexList').show();
		$('#programmeListDiv').hide();
		$('#profilDiv').hide();
		$('#detailMachine').hide();
		
		window.onhashchange = function() {
			hideMenu();
			if(window.location.hash == '#programmelist') {
				
			$('#indexList').hide();
			$('#programmeListDiv').show();
			$('#profilDiv').hide();
			$('#detailMachine').hide();
			}
			else if(window.location.hash == '#index') {
				
			$('#indexList').show();
			$('#programmeListDiv').hide();
			$('#profilDiv').hide();
			$('#detailMachine').hide();
			
			}
			else if(window.location.hash == '#profil') {
			$('#indexList').hide();
			$('#programmeListDiv').hide();
			$('#profilDiv').show();
			$('#detailMachine').hide();
			
			}
			else if(window.location.hash.substr(0,window.location.hash.indexOf("-")) == '#id'){
			$('#indexList').hide();
			$('#programmeListDiv').hide();
			$('#profilDiv').hide();
			$('#detailMachine').show();
			loadMachineInfos(window.location.hash.substr(window.location.hash.indexOf("-")+1));
			
				
			}
			
			try{
					$(document).ready(function(){
							document.getElementsById("divListimg").style.border = "medium solid #FF0000";
					});

				}
				catch(err) {
				  alert(err+"---"+window.location.hash.substr(window.location.hash.indexOf("-")+1));
				 }
		}
		
		
		//Hook a swipe left to come back from the list detail
	$("#divList").swipe( {    
		
		swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
		 window.location.hash = 'divList';
		}
		
	});

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		
		}
};

function checkProfil(){
	 
	if(!loadProfil()){
		//	window.location.replace("register.html");	
	}
}

var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
   
}



function RangeOnChangeHeight(){
	var rangeValue = document.getElementById('RangeHeight');
	var textId = document.getElementById('HeightTaille');
	
	var new_number = rangeValue.value/30.4;
	
	textId.value=rangeValue.value +" Cm / " + new_number.toFixed(2) + " Ft";
	
	
}

function RangeOnChangeWeight(){
	var rangeValue = document.getElementById('RangeWeight');
	var textId = document.getElementById('weightPoid');
	
	var new_number = Math.round(0.45*rangeValue.value).toFixed(0);
	
	textId.value=rangeValue.value +" Lb / " + new_number + " Kg";
	
	
}



function checkConnection() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
 
		if(states[networkState]=='No network connection'){
		alert('Please check your connection! Some functionality may not work properly');
		}
    }
 
 
function loadProfil() {
	var obj = JSON.parse(localStorage.getItem('myProfil'));
	if(obj){
		var chaine=obj.s + ', ' + obj.fn + ', ' + obj.ln + ', ' + obj.bd + ', ' + obj.w + ', ' + obj.h;
		return true;
	}
	else{
		return false;
	}
		
}

function fillFields() {
	try{
	var obj = JSON.parse(localStorage.getItem('myProfil'));
	var chaine=obj.s + ', ' + obj.fn + ', ' + obj.ln + ', ' + obj.bd + ', ' + obj.w + ', ' + obj.h;
	if(obj.s=='male'){
		$('#radio-1').prop('checked', true);
	}
	else{
		$('#radio-2').prop('checked', true);
	}
	$('#firstName').val(obj.fn);
	$('#lastName').val(obj.ln); 
	$('#birthday').val(obj.bd);
	$('#RangeWeight').val(obj.w);
	$('#RangeHeight').val(obj.h);	
	RangeOnChangeWeight();
	RangeOnChangeHeight();
	}
	catch(err) {
      
	 }
}
  
 
  function saveProfil(){
	var sexe=$("#myform input[name='opinions']:checked").val();
	var firstName=$('#firstName').val(); 
	var lastName=$('#lastName').val();
	var birthday=$('#birthday').val();
	var weight=$('#RangeWeight').val();
	var height=$('#RangeHeight').val();
	var chaine=sexe + ', ' + firstName + ', ' + lastName + ', ' + birthday + ', ' + weight + ', ' + height;
	var obj = {
		s: sexe,
		fn: firstName,
		ln: lastName,
		bd: birthday,
		w:weight,
		h:height
		
	};

	seen = [];
	json = JSON.stringify(obj, function(key, val) {
	   if (typeof val == "object") {
			if (seen.indexOf(val) >= 0)
				return
			seen.push(val)
		}
		return val
	})
	localStorage.setItem('myProfil', json);
	 
 }
 
function scanQRCode(){
		
	cordova.plugins.barcodeScanner.scan(
      function (result) {
       /*   alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
		if(result.cancelled){
			window.location.hash == "indexMachineList";
			
		}
		if(result.text.indexOf("-") > -1){
			//window.location.replace("machineDetail.html?id="+result.text);
			window.location.hash == "id-"+result.text;
			}
		if(!(result.text.indexOf("-") > -1)){
				alert("QR code not recognized")
			}
		
		
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   ); 
}  

function loadMachines(){
 
	var machinesID = Object.keys(machines);
	var stringLi;
	for(var i in machinesID) {
		 
		var machineID = machinesID[i];
		var machineT = machines[machineID];
		stringLi=stringLi+('<li data-ride="' + machineT.id + '" name="divListli' + machineT.id + '"><a onclick="javascript:window.location.hash =\'id-'+ machineT.id  +'\';"> <img src="img/machines/' + machineT.id + '.jpg" /></a><h3>' + machineT.id + ', ' + machineT.muscle + '</h3><p>' + machineT.smallDesc + '</p></li>');		
		
	} 
	$('#machines-list-master').html(stringLi);
}


function loadMachineInfos(){
	var myParam = location.search.split('?id=')[1];
	$('#machine-master').html(machines[myParam].desc);
	
}
function loadMachineInfos(name){
	var myParam = name;
	$('#machine-master').html(machines[myParam].desc);
	
}
function loadList(name){
	var machinesID = Object.keys(machines);
	var stringLi='<ul id="divListul">';
	for(var i in machinesID) {
		 
		var machineID = machinesID[i];
		var machineT = machines[machineID];
		stringLi=stringLi+('<li class="divListli" id="divListli" name="divListli' + machineT.id + '"><a onclick="javascript:window.location.hash =\'id-'+ machineT.id  +'\';"><img id="divListimg" src="img/machines/100/' + machineT.id + '.png" /><h3 id="divListh3" align="left">Code : '+ machineT.id + '<br/>Muscle: ' + machineT.muscle +'</h3><p id="divListp"  align="left">Name: ' + machineT.smallDesc + '</p><img id="divListimgN" width="10%" height="10%" src="img/machines/N' + machineT.lvl + '.png" /></a></li><hr id="myHR" />');		
		
	} 
	stringLi=stringLi+'</ul>';
	$('#'+name).html(stringLi);
	/*var myParam = window.location.hash.substr(window.location.hash.indexOf("-")+1);
	
	//colorer le Li selectionne dans le mode tablette 
	try{
		document.getElementsByName("divListli"+myParam)[0].style.border = "medium solid #FF0000";
	}
	catch(err) {
      
	 }*/
}

function loadListProgramme(nameProgramme){
	
	var programsID = Object.keys(programs);
	var stringLi='<ul id="divListul">';
	for(var i in programsID) {
		 
		var programsID = programsID[i];
		var progT = programs[programsID]; 
		stringLi=stringLi+('<li class="divListli" id="divListli" name="divListli' + progT.id + '"><a href="machineDetail.html?id='+progT.id+'"><img id="divListimg" src="img/prgrams/100/' + progT.id + '.png" /><h3 id="divListh3" align="left">Code : '+ progT.id + '<br/>goal: ' + progT.goal +'</h3><p id="divListp"  align="left">Duration: ' + progT.duration + '</p></a></li><hr id="myHR" />');		
		
	} 
	stringLi=stringLi+'</ul>';
	$('#'+nameProgramme).html(stringLi);
	var myParam = location.search.split('?id=')[1];
	//colorer le Li selectionne dans le mode tablette  
	try{
		document.getElementsByName("divListli"+myParam)[0].style.border = "medium solid #FF0000";
	}
	catch(err) {
      
	 }
}

function loadProgsInfos(){
	// to change id p1
	var myParam = location.search.split('?id=')[1];
	$('#programme-master').html(programs['p1'].description);
	
}


function initFB(){
	
	//Bind the login button
	$('#facebook-login').click(function(){
		facebookConnectPlugin.login(["public_profile"], populateFB, function(msg){
			alert(msg);
		});
	});
	
	//Bind the logout button
	$('#facebook-logout').click(function(){
		facebookConnectPlugin.logout(function() {
			$('#facebook-data').hide();
			$('#facebook-login').show();
			$('#fbPic').attr('src', "img/icons/defaultProfil.jpg");
		}, function(msg){
			alert(msg);
		});
	});
	
	//Get the initial login status
	facebookConnectPlugin.getLoginStatus(function(data){
		if(data.status == 'connected') {
			//If connected, populate the data
			populateFB();		
		} else {
			//Connect
			facebookConnectPlugin.login(["public_profile"], populateFB, function(msg){
				alert(msg);
			});
		}
	}, function(msg){
		alert(msg);
	});
}

function populateFB() {
	//Fetch the name
	facebookConnectPlugin.api("/me", ["public_profile"], function(data){
		$('#facebook-name').html(data.name);
		$('#firstName').val(data.name.substr(0,data.name.indexOf(" ")));
		$('#lastName').val(data.name.substr(data.name.indexOf(" ")));
		//Fetch the picture
		facebookConnectPlugin.api("/me/picture?redirect=false", ["public_profile"], function(ret){
			 
			$('#fbPic').attr('src', ret.data.url);
			$('#facebook-data').show();
			$('#facebook-login').hide();
		}, function(msg){		
			alert(msg);
		});
	}, function(msg){		
		alert(msg);
	});

}


function hideMenu(){
	 
    $("#slideIndex").removeClass("open");
	$("#slideIndex").addClass("close");
	
	$("#headerIndex").removeClass("open");
	$("#headerIndex").addClass("close");
	
	$("#indexList").removeClass("open");
	$("#indexList").addClass("close");
	
	
	$("#navToggle").removeClass("close");
	
	 
	$("#profilDiv").removeClass("open");
	$("#profilDiv").addClass("close");
	
	
	
	$("#programmeListDiv").removeClass("open");
	$("#programmeListDiv").addClass("close");
	 
	 
}
