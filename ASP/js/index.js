$(document).ready(function(){
	$(".menubar>li>a").each(function(){
		this.style.textDecoration="none";
	});


	$(".menubar>li>a").click(function(){
		$(".menubar>li>a").each(function(){
			this.style.color="#9d9d9d";
			this.style.textDecoration="none";
		});

		this.style.color="#fff";
		this.style.textDecoration="none";
	});

	//Load live chart
	loadLiveChart();
	//Load Column chart
	loadColumnChart();
});



//the live chart
function loadLiveChart()
{
	//The global setting
	Highcharts.setOptions({
		global:{
			useUTC:false
		}
	});


	var chart;
	$("#divLiveChart").highcharts({
		chart:{
			type:'spline',
			animation:Highcharts.svg,
			marginRight:10,
			events:{
				load:function(){
					//set up the updating of the chart each second
					var series = this.series[0]

					setInterval(function(){
						var x = (new Date()).getTime();
						var	y = Math.random();
						series.addPoint([x,y],true,true);
					},1000);
				}
			}
		},

		title:{
			text:'Live random data'
		},

		xAxis:{
			type: 'datetime',                                                   
            tickPixelInterval: 150 
		},

		 yAxis: {                                                                
             title: {                                                            
                text: 'Value'                                                   
             },                                                                  
            plotLines: [{                                                       
                 value: 0,                                                       
                 width: 1,                                                       
                 color: '#808080'                                                
             }]                                                                  
         }, 

  		tooltip: {                                                              
            formatter: function() {                                             
            	return '<b>'+ this.series.name +'</b><br/>'+                
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);                         
            }                                                                   
        },                                                                      
        legend: {                                                               
            enabled: false                                                      
        },                                                                      
        exporting: {                                                            
            enabled: false                                                      
        },                                                                      
        series: [{                                                              
            name: 'Random data',                                                
            data: (function() {                                                 
            	// generate an array of random data                             
                var data = [],                                                  
                    time = (new Date()).getTime(),                              
                    i;                                                          
                                                                                    
                for (i = -19; i <= 0; i++) {                                    
                    data.push({                                                 
                        x: time + i * 1000,                                     
                        y: Math.random()                                        
                    });                                                         
                }                                                               
                return data;                                                    
            })()                                                                
        }]    
	});
}


var mySeries = [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }];

//Column chart
function loadColumnChart()
{
	  $('#divColumnChart').highcharts({
        chart: {
            type: 'column',
            animation:Highcharts.svg,
            events:{
				load:function(){
					//set up the updating of the chart each second
					var series = this.series[0]

					// setInterval(function(){
					// 	console.log("Hello");
						
					// },1000);
				}
			}
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });
} 

