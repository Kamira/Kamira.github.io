//<![CDATA[ 
$(window).load(function(){
    var k_value="0AvMyOkgICwgBdGRDUUVmNjdENFJhcnBIV2YyOGltb3c", num_value=10;
    var s_value, JSONdata, dataList;
    var isready=false;
	
	google.charts.load('current');
    function ShowJSONData( x, y){
        $('#search_result').html("<div class='result_tr'><div class='result_td resource'>來源</div><div class='result_td'></div><div class='result_td'>標題</div><div class='result_td timestamp'>時間戳記</div>");

        x++;
        if ((y>JSONdata.rows.length)||(y==0)) y=JSONdata.rows.length;
        y++;
		console.log(JSONdata);
        for (var i = x; i < y;  i++){
                    //rows.c[0].v RSS from
                    //rows.c[1].v Title
                    //rows.c[2].v Url
                    //rows.c[3].v Magnet
                    //rows.c[4].v Timestamp

            temp0 = "<div class='result_tr'>"
                  +     "<div class='result_td'>"
                  +         JSONdata.rows[i].c[0].v //Data From
                  +     "</div>"
                  +     "<div class='result_td magnet'>";
            if(!(JSONdata.rows[i].c[3].v=='')){
                temp0 = temp0
                  +         "<a href='" + JSONdata.rows[i].c[3].v + "' target='_self'><div>➲</div></a>";
            }
                         // +       JSONdata.rows[i].c[3].v //Magnet
            temp0 = temp0
                  +     "</div>"
                  +     "<div class='result_td'>"
                  +         "<a href='" + JSONdata.rows[i].c[2].v + "' target='_blank'>"  + JSONdata.rows[i].c[1].v + "</a>"
                  +     "</div>"
                  +     "<div class='result_td'>"
                  +         JSONdata.rows[i].c[4].v //Data From
                  +     "</div>";

            $('#search_result').append(temp0);
        }
    }
	
	
	
    //Get Data via GoogleVisualization API-ization
    function GetDataFromGoogleVisualization(pkey, skey, x, y){
		
		// Get data from google spreadsheet via new Google charts api (2018/07/14)
		function initialize() {
		    var opts = {sendMethod: 'auto'};
			
			var keys=skey.split(" ");
			var SQL="where ";
			for(var i=0;i<keys.length;i++){
				if(i>0){
					SQL+="or ";
				}
				SQL+="upper(B) like '%"+keys[i].toUpperCase()+"%' ";
			}
			
		    // Replace the data source URL on next line with your data source URL.
		    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/13kGTUgqLb-808XUJy7kDenVV7-JVAggQx7k3VZzSBZo/gviz/tq?gid=1415260859&headers=1&tq=', opts);
			query.setQuery('select A, B, C, D, E, F ' + SQL);
		    query.send(handleQueryResponse);
		}

		
		function handleQueryResponse(response) {
			if(!response.isError()){
				JSONdata = JSON.parse(response.getDataTable().toJSON());
				
				console.log(JSONdata);
				
				
				dataList = JSONdata.rows;
				console.log(dataList);
				
				var temp = '本次搜尋  <b>['+ skey +']</b>  共有 ';
				if (JSONdata.rows.length==0){
					temp = temp + '0';
				}else{
					temp = temp + (JSONdata.rows.length-1);
				}
				temp = temp + ' 個結果<br>備註：極影主要為種子，動漫花園主要為磁力';

				$('#searchInformation').html(temp);
				
				for(var i in dataList){
					console.log(JSONdata + " | " + i);
					
					ShowJSONData( x, y);
					/*
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
					*/
					
				}
			}else{
				$('footer').html('目前資料庫或網路出現錯誤，請稍後再試。');
			}
			/*
			tmparr.sort();
			console.log(tmparr);
			maxItems = tmparr[ tmparr.length - 1 ];
			resizeh();
			*/
		  // Called when the query response is returned.
		}
		
		initialize();
		
		/*
        var query = new google.visualization.Query('http://spreadsheets.google.com/tq?key=' + pkey + '&gid=6');
        var keys=skey.split(" ");
        var SQL="where ";
        for(var i=0;i<keys.length;i++){
            if(i>0){
                SQL+="or ";
            }
            SQL+="upper(B) like '%"+keys[i].toUpperCase()+"%' ";
        }

        query.setQuery(SQL);
        query.send(function(response){

            if(!response.isError()){
                JSONdata = JSON.parse(response.getDataTable().toJSON());
                //以下找時間整理並弄成function
                var temp = '本次搜尋  <b>['+ skey +']</b>  共有 ';
                if (JSONdata.rows.length==0){
                    temp = temp + '0';
                }else{
                    temp = temp + (JSONdata.rows.length-1);
                }
                temp = temp + ' 個結果<br>備註：極影主要為種子，動漫花園主要為磁力';

                $('footer').html(temp);

                ShowJSONData( x, y);
            }else{
                $('footer').html('目前資料庫或網路出現錯誤，請稍後再試。');
            }
        })  
		*/
    }
    function init(){
        GetDataFromGoogleVisualization(k_value, s_value , 1, num_value );
    }

    function btnsubmit(){
        s_value = $('#key').val();
		console.log(s_value);
        init();
    }
	
	$(document).on('click', '#search_btn', function(){
		btnsubmit();
	});
	
	
    $( "#result_num" ).change(function() {
        num_value = $("select#result_num option:selected").val();
        ShowJSONData( 0, num_value);
    });

    //Enter Key Press
    $('#key').keypress(function(event) {
        /* Act on the event */
        if(event.keyCode == 13) btnsubmit();
    });



});//]]> 