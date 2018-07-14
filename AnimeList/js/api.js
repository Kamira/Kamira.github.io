//<![CDATA[ 
$(document).ready(function () {

	var formkey = "1y-YU3bh8jI53F0obOdWV1y_x1To5DUa10leARnpLTRI";
	var key="0AvMyOkgICwgBdDktOVJHUVp0dmhxNjNud3BDRWJUeVE";
	var week=['#week-sun','#week-mon','#week-tue','#week-wed','#week-thu','#week-fri','#week-sat'];
	var temp0;

    var year=(new Date).getFullYear();
    var month=(new Date).getMonth();   
    var mkey=['冬','春','夏','秋'];
	var tmparr = [ 0, 0, 0, 0, 0, 0, 0];
	
	var maxItems;

	
	google.charts.load('current');
	//Get Data via feeds API-ization


	function GetDataFromJSON(pkey, sykey, smkey){
		$.getJSON('https://spreadsheets.google.com/feeds/list/'
				   + pkey  + '/od6/public/values?alt=json-in-script&q='
				   + smkey + '+"' + sykey + '"', function(JData) {
				console.log('GetDataFromJSON');
				console.log(JData);
				/*optional stuff to do after success */
				for(var i = 0; i < JData.feed.entry.length; i++){
					temp0 = "<div class='xinfan-cellblock'><div class='xinfan-imgfilter'><div class='xinfan-img' style='background:url("
						  + JData.feed.entry[i].gsx$縮圖.$t
						  + ")'></div></div><div class='xinfan-detail'><center><div class='xinfan-img' style='background:url("
						  + JData.feed.entry[i].gsx$縮圖.$t
						  + ")'></div></center><br /><div class='xinfan-CNname'>"
						  + JData.feed.entry[i].gsx$中文名.$t
						  + "</div><div class='xinfan-JPname'>"
						  + JData.feed.entry[i].gsx$原名.$t
						  + "</div><div class='xinfan-Releasetime'>"
						  + JData.feed.entry[i].gsx$首播時間.$t
						  + "</div><br /><a class='offical' target='_blank' href='"
						  + JData.feed.entry[i].gsx$公式網址.$t
						  + "'>公式サイト</a><div class='xinfan-detail-close'>✖</div></div></div>";

            		switch (JData.feed.entry[i].gsx$日期.$t){
                		case "日":$("#week-sun-content> .xinfan-list").append(temp0);break;
                		case "一":$("#week-mon-content> .xinfan-list").append(temp0);break;
                		case "二":$("#week-tue-content> .xinfan-list").append(temp0);break;
                		case "三":$("#week-wed-content> .xinfan-list").append(temp0);break;
                		case "四":$("#week-thu-content> .xinfan-list").append(temp0);break;
                		case "五":$("#week-fri-content> .xinfan-list").append(temp0);break;
                		case "六":$("#week-sat-content> .xinfan-list").append(temp0);break;
                		case "他":$("#week-oth-content> .xinfan-list").append(temp0);break;
            		}
				}

				MiniWindow();
				GoToday();
		});
	}

	//Get Data via GoogleVisualization API-ization
	function GetDataFromGoogleVisualization(pkey, sykey, smkey){
		
		// Get data from google spreadsheet via new Google charts api (2018/07/14)
		function initialize() {
		    var opts = {sendMethod: 'auto'};
		    // Replace the data source URL on next line with your data source URL.
		    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1MYQEvgM3fM8McVwkimQZmGe-hiWO16rR7QFeIlrYkI4/edit#gid=0', opts);

			// SQL Language Select Item
		    query.setQuery('select B, C, D, E, F, G, H, I where (E=' + sykey + ') and (F="' + smkey + '")');
		    query.send(handleQueryResponse);
		}

		
		function handleQueryResponse(response) {
			if(!response.isError()){
				var JSONdata = JSON.parse(response.getDataTable().toJSON());
				
				console.log(JSONdata);
				var dataList = JSONdata.rows;
				console.log(dataList);
				for(var i in dataList){
					
					console.log(i);
					temp0 = "<div class='xinfan-cellblock' id='" 
						  + i + "'><div class='xinfan-imgfilter'><div class='xinfan-img' style='background:url("
						  + dataList[i].c[5].v //rows.c[5].v 縮圖
						  + ")'></div></div><div class='xinfan-detail'><center><div class='xinfan-img' style='background:url("
						  + dataList[i].c[5].v //rows.c[5].v 縮圖
						  + ")'></div></center><br /><div class='xinfan-CNname'>"
						  + dataList[i].c[0].v //rows.c[0].v 中文名
						  + "</div><div class='xinfan-JPname'>"
						  + dataList[i].c[1].v //rows.c[1].v 原名
						  + "</div><div class='xinfan-Releasetime'>"
						  + dataList[i].c[7].v //rows.c[7].v 放送時間
						  + "</div><br /><a class='offical' target='_blank' href='"
						  + dataList[i].c[2].v //rows.c[2].v 公式網址
						  + "'>公式サイト</a><div class='xinfan-detail-close'>✖</div></div></div>";
					switch(dataList[i].c[6].v){
                		case "日":$("#sun").append(temp0);tmparr[0] += 1;break;
                		case "一":$("#mon").append(temp0);tmparr[1] += 1;break;
                		case "二":$("#tue").append(temp0);tmparr[2] += 1;break;
                		case "三":$("#wed").append(temp0);tmparr[3] += 1;break;
                		case "四":$("#thu").append(temp0);tmparr[4] += 1;break;
                		case "五":$("#fri").append(temp0);tmparr[5] += 1;break;
                		case "六":$("#sat").append(temp0);tmparr[6] += 1;break;
                		case "他":$("#oth").append(temp0);tmparr[7] += 1;break;
					}
					
				}
			}
			
			tmparr.sort();
			console.log(tmparr);
			maxItems = tmparr[ tmparr.length - 1 ];
			resizeh();
		  // Called when the query response is returned.
		}
		
		initialize();

		

		// Old GoogleVisualization Function
		/*
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + pkey + '');
		//google.load('visualization','1');
		query.setQuery("where (E="+ sykey +") and (F='" + smkey +"')");
		query.send(function(response){
			if(!response.isError()){
				var JSONdata = JSON.parse(response.getDataTable().toJSON());

				for (var i = 0; i < JSONdata.rows.length;  i++){
					//rows.c[0].v 中文名
					//rows.c[1].v 原名
					//rows.c[2].v 公式網址
					//rows.c[3].v 年度
					//rows.c[4].v 季
					//rows.c[5].v 縮圖
					//rows.c[6].v 日
					//rows.c[7].v 放送時間

					temp0 = "<div class='xinfan-cellblock'><div class='xinfan-imgfilter'><div class='xinfan-img' style='background:url("
						  + JSONdata.rows[i].c[5].v //rows.c[5].v 縮圖
						  + ")'></div></div><div class='xinfan-detail'><center><div class='xinfan-img' style='background:url("
						  + JSONdata.rows[i].c[5].v //rows.c[5].v 縮圖
						  + ")'></div></center><br /><div class='xinfan-CNname'>"
						  + JSONdata.rows[i].c[0].v //rows.c[0].v 中文名
						  + "</div><div class='xinfan-JPname'>"
						  + JSONdata.rows[i].c[1].v //rows.c[1].v 原名
						  + "</div><div class='xinfan-Releasetime'>"
						  + JSONdata.rows[i].c[7].v //rows.c[7].v 放送時間
						  + "</div><br /><a class='offical' target='_blank' href='"
						  + JSONdata.rows[i].c[2].v //rows.c[2].v 公式網址
						  + "'>公式サイト</a><div class='xinfan-detail-close'>✖</div></div></div>";
					switch(JSONdata.rows[i].c[6].v){
                		case "日":$("#sun").append(temp0);break;
                		case "一":$("#mon").append(temp0);break;
                		case "二":$("#tue").append(temp0);break;
                		case "三":$("#wed").append(temp0);break;
                		case "四":$("#thu").append(temp0);break;
                		case "五":$("#fri").append(temp0);break;
                		case "六":$("#sat").append(temp0);break;
                		case "他":$("#oth").append(temp0);break;
					}
				}
			}
		
		})
		*/	
		MiniWindow();
		GoToday();	
	}

	//Resize API-ization
	function resizeh(){
		console.log('Worked');
		var h = 300 * ( Math.ceil( maxItems / Math.ceil( ( $(window).width() / 260 ) ) ) );
		console.log(tmparr);
		console.log($(window).width());
		$('.variableHeight').attr('style','min-height:' + h + 'px;');
        var scrolltop = $(this).scrollTop();
        $('.week-sidetitle h2').offset({top: scrolltop+200});

	}

    //Go to Today API-ization
    function GoToday(){
    	var today = (new Date).getDay();
        $('body').animate({ scrollTop : $(week[today]).offset().top }, 200);
    }
	
	function drawVisualization(){
		
		GetDataFromGoogleVisualization(key, year, mkey[Math.floor(month/3)]);
	}

    //
    function MiniWindow(){
		//  測試用
		/*$('*').on('click', function(e) {
			if(!$(e.target).is('input')){
				console.log('Node name: ' + e.target.nodeName + ' | Id Name: ' + e.target.id + ' | Class: ' + e.target.className + ' clicked');
			}
		});*/
		$(document).on('click', '.xinfan-img', function(){
			$('.xinfan-img-lock').toggleClass('xinfan-img-lock');
			$('.xinfan-detail.xinfan-showdetail').toggleClass('xinfan-showdetail');
			$(this).closest('.xinfan-cellblock').find('.xinfan-imgfilter > .xinfan-img').toggleClass('xinfan-img-lock');
			$(this).closest('.xinfan-cellblock').find('.xinfan-detail').toggleClass('xinfan-showdetail');
		});
		
		$(document).on('click', '.xinfan-detail-close', function(){
			
			//console.log('Worked!');xinfan-showdetail
			$(this).closest(".xinfan-cellblock").find(".xinfan-detail").toggleClass('xinfan-showdetail');
			$('.xinfan-imgfilter > .xinfan-img.xinfan-img-lock').toggleClass('xinfan-img-lock');
		});
    }

	
	//POST
    $("span#submit").click(function(){    
    
        var addYear = $("input#inputyear").val();
        var addQ    = $('input:radio:checked[id="inputQ"]').val();
        var addDay  = $('input:radio:checked[id="inputDay"]').val();
        var addCN   = $("input#inputCN").val();
        var addJP   = $("input#inputJP").val();
        var addSite = $("input#inputSite").val();
        var addTumb = $("input#inputTumb").val();
        var addRele = $("input#inputRelease").val();

        if(!((addYear||addQ||addDay||addCN||addJP||addSite)=='')){
        	$.ajax({
            	type: 'POST',
            	url: 'https://docs.google.com/forms/d/' + formkey + '/formResponse',
            	crossDomain: true,
            	dataType: 'xml', 
            	data: { "entry.845750623"  : addYear,
                	    "entry.1848634393" : addQ,
                	    "entry.1862821552" : addDay,
                	    "entry.1693043026" : addCN,
                	    "entry.892438945"  : addJP,
                	    "entry.1109831467" : addRele,
                	    "entry.1249335391" : addSite,
                	    "entry.365234154"  : addTumb,
                  		},
            	success: function(data, textStatus, xhr) {
            		console.log(xhr.status);
            		},
            	complete: function(xhr, textStatus) {
            		console.log(xhr.status);
            		}
        	});
    	}else{
    		alert("OOPS！似乎有空白或沒選的選項喔！");
    	}
	});

	//PANEL SWITCH
    $("div#panelcontrol").bind('click',function(){ 
        if ($('#panel').css('right')=='0px') {
            $('#panel').css('right','-200px');
            $('#panelcontrol').css('background-position', '-20px 50%');
            $('.week-sidetitle').css('right','20px');
        } else {
            $('#panel').css('right','0px');
            $('#panelcontrol').css('background-position', '0px 50%');
            $('.week-sidetitle').css('right','220px');
        };
    });

    //Social
    $('.ftpg > div.plurk').bind('click',function(){
        var _Url = encodeURIComponent(location.href);
        var _Title = encodeURIComponent(document.title);
        window.open('http://www.plurk.com/?qualifier=shares&status='+_Url+' ('+_Title+')');
    })

    //Top NavBar
    $('.nav-day > span').bind('click',function(){
        var targetid = $(this).attr('value');
        console.log(targetid);
        $('html,body').animate({ scrollTop : $(targetid).offset().top }, 1000);
    })

    // init
    $('.twitter-share-button').attr('data-lang', navigator.language || navigator.userLanguage);
	google.charts.setOnLoadCallback(drawVisualization);
   	
	GetDataFromJSON(key, year, mkey[Math.floor(month/3)]);
    //resizeh();    
    $('#panel').css('right','-200px');
    $('#panelcontrol').css('background-position', '-20px 50%');

   	//$(window).resize(function() {resizeh();});
    $( window ).scroll(function() {
        var scrolltop = $(this).scrollTop();
        $('.week-sidetitle h2').offset({top: scrolltop + 200});
    });
	
	$( window ).resize(function() {
		resizeh();
	});
});