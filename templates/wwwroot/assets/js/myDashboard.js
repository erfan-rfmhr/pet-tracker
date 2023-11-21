let lastId = 0;

let firstExecut = true;
let prosesse = false;

var MyserialsInput = [];

let gauges = [];
let gaugeOptions = [];




$(document).ready(function () {
 
    $("#DashboardPage").addClass("current");

    let customerid = $("#cmbPetOwnerName").val();;

    fill_CustomerCmb(customerid);

   
    //let sensorId = $("#cmbSensorT").val();;

  
    //fill_Serial_combo(sensorId);

    //var config2 = [];
    //var ctx = document.getElementById("line2").getContext("2d");
    //window.line2 = new Chart(ctx, config2);


    
     

    map = L.map('mapDiv');


    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 25,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);



    var mlat, lng;

    map.addEventListener('mousemove', function (ev) {
        mlat = ev.latlng.lat;
        lng = ev.latlng.lng;

        //console.log(mlat + " " + lng);

    });

   
    document.getElementById("mapDiv").addEventListener("dblclick", function (event) {

    
    });
});


setInterval(function () {
    //if (lastId > 0) {
        //drawMyChart(true);
    //}
    if (!prosesse) {
      
        drawMyChart(true);
    }

   
    }, 1000);



$("#btnSensorSave").click(function () {
    lastId = 0;

    $('#DivResult').empty();
    MyserialsInput = [];
    gauges = [];
    gaugeOptions = [];

    drawMyChart(false);



   
});

$('#MapModal').on('shown.bs.modal', function () {
    setTimeout(function () {
        map.invalidateSize();
    }, 10);
});

function createMyElements(line)
{

    return  '<div  class="row mt-3">'

        + '<div class="col-lg-3">'
        + '<div  class="portlet box border shadow">'
        + '<div class="portlet-body" style="padding-top:50px;padding-bottom:50px">'
        + '<canvas width =240 height=125  id="canvas-preview' + line + '" ></canvas>'
        + '<div id="preview-textfield' + line + '" class="preview-textfield reset" style="font-size: 30px;"></div>'
        + '<div id="preview-time' + line + '" style="font-size: 15px;margin-top: 40px;text-align: center;"></div>'
        + '</div >'
        + '</div >'
        + '</div >'

        + '<div class="col-lg-3">'
        + '<div  class="portlet box border shadow">'
        + '<div class="portlet-body">'

        + '<div i class="table-responsive">'
        + '<table id="recordsDatatable' + line + '" class="table table-striped" width="100%" height="180" cellspacing="0">'
        + '<thead>'
        + '<tr>'
        //+ '<th>Id</th>'

        //+ '<th>buildingId</th>'

        //+ '<th>s_Id</th>'
        //+ '<th>CustomerId</th>'
        //+ '<th>Sensor</th>'
        //+ '<th>LowLimit</th>'
        //+ '<th>HighLimit</th>'
        //+ '<th>Customer Name</th>'
        //+ '<th>Building Name</th>'
        //+ '<th>Sensor AliasName</th>'
        //+ '<th>Sesnsor Type</th>'

        + '<th>Date</th>'
        + '<th>Time</th>'
        + '<th>Value</th>'


        + '</tr>'
        + '</thead>'

        + '<tbody>'



        + '</tbody>'
        + '</table>'

        + '</div >'
        + '</div >'

        + '</div >'

        + '</div >'


       

        + '<div class="col-lg-6">'
        + '<div  class="portlet box border shadow">'
        + '<div class="portlet-body">'
        + '<canvas id="' + line + '" class="min-height-300"></canvas>'
        + '</div>'
        + '</div >'
        + '</div >'

        + '</div >';

}

function drawMyChart(isLive) {

    prosesse = true;

    var mserial_Id = [];
    var mserial = [];
    var result = {};

    //$('#cmbSerial :selected').each(function () {
    //    var o = $(this);
    //    //console.log(o.text());
    //    //result[o.text()] = o.val();
    //    mserial_Id.push(o.val());
    //    mserial.push(o.text());
    //});


    //if (mserial.length < 1) {

    //    swal({
    //        type: 'error',
    //        title: 'error',
    //        text: 'No Sensor Selected',
    //        timer: 6000
    //    }).catch(swal.noop);

    //    return false;
    //}
    //$('#output').text(JSON.stringify(result));

    //alert(JSON.stringify(result));

    let mToken = $('input:hidden[name="__RequestVerificationToken"]').val();

   
    let mData = {
        //Id: parseInt($("#hfId").val()) || 0,
        //Name: $("#txtName").val(),
        //Family: $("#txtFamily").val(),
        //Phone: $("#txtPhone").val(),
        //UserName: $("#txtUserName").val(),
        //Address: $("#txtAddress").val(),
        //Pass: $("#txtPass").val(),
        ////img: $("#txtimg").val(),
        //img: output.src.split('/').pop(),



      /*  Serial_Ids: mserial_Id,*/
        //StartDate: $("#txtStartDate").val(),
        //EndDate: $("#txtEndDate").val(),
        isLive: isLive,
        buildingId: $("#cmbPetName").val(),
        mySerials: MyserialsInput


    };



    $.ajax({
        type: "POST",
        async: true,
        url: "/dashboard?handler=GetRecords",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        //url: "CompareRecords.aspx/GetRecords2",



        success: function (response) {




            if (!isLive) {
                $('#DivResult').empty();
                MyserialsInput = [];
                gauges = [];
                gaugeOptions = [];
            }
           

           
            //console.log("response:");
            //console.log(response);
            //console.log("Serial_Id:");
            //console.log(response[0].Serial_Id);

            //console.log("LastId:");
            //console.log(response[0].LastId);

            for (var k = 0; k < response.length; k++) {

        
                let mydatasets = [];
                let myColor = ["#8cc63f", "#0a6aea", "#ff3700", "#15ab83", "#cc65fe", "#d6df44"];

                let mmDate = [];
                let mmDate2 = [];


                let mRecords2 = [];

                mRecords2 = response[k].userData1;
                if (mRecords2.length < 1) {

                    continue;
                }


                let mySS = {};
                mySS.Serial_Id = response[k].Serial_Id;
                mySS.LastId = response[k].LastId;
                mySS.Serial = response[k].Serial;
                

                if (!isLive) {
                    MyserialsInput.push(mySS);
                }

                else {


                    objIndex = MyserialsInput.findIndex((obj => obj.Serial_Id == mySS.Serial_Id));
                    MyserialsInput[objIndex].LastId = mySS.LastId;
                }
               
                let line = "line" + mySS.Serial_Id;

                //console.log("line:");
                //console.log(line);

                let ss = "";


               


                if (!isLive) {



                    ss = createMyElements(line);
                    //ss = '<div  class="row mt-3">'

                    //    + '<div class="col-lg-6">'
                    //    + '<div  class="portlet box border shadow">'
                    //    + '<div class="portlet-body">'
                    //    + '<canvas id="' + line + '" class="min-height-300"></canvas>'
                    //    + '</div>'
                    //    + '</div >'
                    //    + '</div >'

                    //    + '<div class="col-lg-3">'
                    //    + '<div  class="portlet box border shadow">'
                    //    + '<div class="portlet-body">'

                    //    + '<div i class="table-responsive">'
                    //    + '<table id="recordsDatatable' + line + '" class="table table-striped" width="100%" height="180" cellspacing="0">'
                    //    + '<thead>'
                    //    + '<tr>'
                    //    //+ '<th>Id</th>'

                    //    //+ '<th>buildingId</th>'

                    //    //+ '<th>s_Id</th>'
                    //    //+ '<th>CustomerId</th>'
                    //    //+ '<th>Sensor</th>'
                    //    //+ '<th>LowLimit</th>'
                    //    //+ '<th>HighLimit</th>'
                    //    //+ '<th>Customer Name</th>'
                    //    //+ '<th>Building Name</th>'
                    //    //+ '<th>Sensor AliasName</th>'
                    //    //+ '<th>Sesnsor Type</th>'

                    //    + '<th>Date</th>'
                    //    + '<th>Time</th>'
                    //    + '<th>Value</th>'


                    //    + '</tr>'
                    //    + '</thead>'

                    //    + '<tbody>'



                    //    + '</tbody>'
                    //    + '</table>'

                    //    + '</div >'
                    //    + '</div >'

                    //    + '</div >'

                    //    + '</div >'


                    //    + '<div class="col-lg-3">'
                    //    + '<div  class="portlet box border shadow">'
                    //    + '<div class="portlet-body">'
                    //    + '<canvas width =380 height=150  id="canvas-preview' + line + '" ></canvas>'
                    //    + '<div id="preview-textfield' + line + '"></div>'

                    //    + '</div >'
                    //    + '</div >'
                    //    + '</div >'

                    //    + '</div >';

                    $('#DivResult').append(ss);



                    //let canvas = document.createElement('canvas');
                    ////canvas.setAttribute('id', 'chart_' + name);
                    //canvas.setAttribute('id', 'chart_' + line);
                    //canvas.setAttribute('width', '250');
                    //canvas.setAttribute('height', '200');
                    //let canvasContainer = document.createElement('div');
                    //canvasContainer.appendChild(canvas);
                    //document.getElementById("charts").appendChild(canvasContainer);

                    let config2 = [];
                    let ctx = document.getElementById(line).getContext("2d");






                    let window_line2 = new Chart(ctx, config2);

                    lastId = response.LastId;

                    mserial_Id.push(response[k].Serial_Id);
                    //console.log("mRecords2:");
                    //console.log(response[k].Serial);
                    mserial.push(response[k].Serial);


                    let mmDate3 = [];
                    let mdataset2 = {};
                    let mdataset = {};
                    mdataset.label = response[k].Serial;
                    mdataset.borderColor = myColor[0];
                    mdataset.backgroundColor = myColor[0];

                    //let ranColor = randomColor(1);
                    //mdataset.borderColor = ranColor;
                    //mdataset.backgroundColor = ranColor;

                    mdataset.fill = false;


                    mdataset2.label = response[k].Serial;
                    mdataset2.borderColor = myColor[0];
                    mdataset2.fill = false;

                    var posts_list = [];

                    let mmCol0_1 = [];





                    var rowLast = mRecords2[mRecords2.length - 1];


                    //currval = 1250 & animationSpeed=32 & angle=-20 & lineWidth=20 & radiusScale=100 & pointer.length=60 & pointer.color=000000 & pointer.strokeWidth=35 & fontSize=41 & divisions=5 & divLength=70 & divColor=333333 & divWidth=11 & subDivisions=3 & subLength=50 & subColor=666666 & subWidth=6


                    //var opts = {
                    //    currval: 1250,
                    //    fontSize:41,
                    //    angle: -20, // The span of the gauge arc
                    //    lineWidth: 20, // The line thickness
                    //    radiusScale: 100, // Relative radius
                    //    pointer: {
                    //        length: 60, // // Relative to gauge radius
                    //        strokeWidth: 35, // The thickness
                    //        color: '#000000' // Fill color
                    //    },
                    //    limitMax: false,     // If false, max value increases automatically if value > maxValue
                    //    limitMin: false,     // If true, the min value of the gauge will be fixed
                    //    colorStart: '#6F6EA0',   // Colors
                    //    colorStop: '#C0C0DB',    // just experiment with them
                    //    strokeColor: '#EEEEEE',  // to see which ones work best for you
                    //    generateGradient: true,
                    //    highDpiSupport: true,     // High resolution support
                    //    // renderTicks is Optional
                    //    renderTicks: {
                    //        divisions: 8,
                    //        divWidth: 1.1,
                    //        divLength: 1,
                    //        divColor: '#333333',
                    //        subDivisions: 0,
                    //        subLength: 0.5,
                    //        subWidth: 0.6,
                    //        subColor: '#666666'
                    //    },
                    //    staticZones: [
                    //        //{ strokeStyle: "#f03e3e", min: 0, max: 1 },
                    //        //{ strokeStyle: "#fa5f31", min: 1, max: 1.4 },
                    //        //{ strokeStyle: "#ff7d22", min: 1.4, max: 2 },
                    //        //{ strokeStyle: "#ff9a0f", min: 2, max: 2.6 },
                    //        //{ strokeStyle: "#ffb700", min: 2.6, max: 3.2 },
                    //        //{ strokeStyle: "#f1c200", min: 3.2, max: 3.8 },
                    //        //{ strokeStyle: "#e1cc00", min: 3.8, max: 4.4 },
                    //        //{ strokeStyle: "#d0d500", min: 4.4, max: 5 },
                    //        //{ strokeStyle: "#adce02", min: 5, max: 5.6 },
                    //        //{ strokeStyle: "#89c612", min: 5.6, max: 6.3 },
                    //        //{ strokeStyle: "#62bd20", min: 6.3, max: 7 },
                    //        //{ strokeStyle: "#30b32d", min: 7, max: 8 },

                    //        { strokeStyle: "#dc3545", min: rowLast.LowLimit - 20, max: rowLast.LowLimit },
                    //        { strokeStyle: "#30b32d", min: rowLast.LowLimit, max: rowLast.HighLimit },

                    //        { strokeStyle: "#dc3545", min: rowLast.HighLimit, max: rowLast.HighLimit + 20 },
                    //    ]
                    //};

                    //var myLable = [100, 260, 300];
                    var myLable = [];
                    var _countLbl =5;
                    let _ss = (rowLast.HighLimit - rowLast.LowLimit) / _countLbl;
                    //console.log(_ss);

                    //myLable.push(parseInt(rowLast.LowLimit*1.2));
                    myLable.push(rowLast.LowLimit);

                    let _fr = rowLast.LowLimit;
                    for (var kk = 0; kk < _countLbl; kk++) {

                        _fr = _fr + _ss;
                        myLable.push(_fr);
                        //myLable.push(_ss+(_ss*kk));
                        //myLable.push(10 * kk);
                    }

                    //myLable.push(parseInt(rowLast.HighLimit * 1.2));

                    var opts = {
                        angle: -0.01, // The span of the gauge arc
                        lineWidth: 0.20, // The line thickness
                        radiusScale: 1, // Relative radius
                        pointer: {
                            length: 0.52, // // Relative to gauge radius
                            strokeWidth: 0.040, // The thickness
                            color: '#000000' // Fill color
                        },
                        limitMax: false,     // If false, max value increases automatically if value > maxValue
                        limitMin: false,     // If true, the min value of the gauge will be fixed
                        colorStart: '#6F6EA0',   // Colors
                        colorStop: '#C0C0DB',    // just experiment with them
                        strokeColor: '#EEEEEE',  // to see which ones work best for you
                        generateGradient: true,
                        highDpiSupport: true,     // High resolution support
                        // renderTicks is Optional
                        renderTicks: {
                            divisions: 8,
                            divWidth: 1.1,
                            divLength: 1,
                            divColor: '#333333',
                            subDivisions: 0,
                            subLength: 0.5,
                            subWidth: 0.6,
                            subColor: '#666666'
                        },                      
                        staticZones: [
                            //{ strokeStyle: "#f03e3e", min: 0, max: 1 },
                            //{ strokeStyle: "#fa5f31", min: 1, max: 1.4 },
                            //{ strokeStyle: "#ff7d22", min: 1.4, max: 2 },
                            //{ strokeStyle: "#ff9a0f", min: 2, max: 2.6 },
                            //{ strokeStyle: "#ffb700", min: 2.6, max: 3.2 },
                            //{ strokeStyle: "#f1c200", min: 3.2, max: 3.8 },
                            //{ strokeStyle: "#e1cc00", min: 3.8, max: 4.4 },
                            //{ strokeStyle: "#d0d500", min: 4.4, max: 5 },
                            //{ strokeStyle: "#adce02", min: 5, max: 5.6 },
                            //{ strokeStyle: "#89c612", min: 5.6, max: 6.3 },
                            //{ strokeStyle: "#62bd20", min: 6.3, max: 7 },
                            //{ strokeStyle: "#30b32d", min: 7, max: 8 },

                            //{ strokeStyle: "#dc3545", min: rowLast.LowLimit -  50, max: rowLast.LowLimit },
                            //{ strokeStyle: "#30b32d", min: rowLast.LowLimit, max: rowLast.HighLimit },
                            { strokeStyle: "#dc3545", min: rowLast.LowLimit *1.2, max: rowLast.LowLimit },
                            { strokeStyle: "#30b32d", min: rowLast.LowLimit, max: rowLast.HighLimit },
                            { strokeStyle: "#dc3545", min: rowLast.HighLimit, max: rowLast.HighLimit * 1.2, },
                        ]
                        ,
                        staticLabels: {
                            font: "12px sans-serif",  // Specifies font
                            labels: myLable,  // Print labels at these values
                            color: "#000000",  // Optional: Label text color
                            fractionDigits: 0  // Optional: Numerical precision. 0=round off.
                        },
                    };

                    //var opts = {
                    //    angle: -0.25,
                    //    lineWidth: 0.2,
                    //    pointer: {
                    //        length: 0.6,
                    //        strokeWidth: 0.05,
                    //        color: '#000000'
                    //    },
                    //    staticZones: [
                    //        { strokeStyle: "#F03E3E", min: 0, max: 200 },
                    //        { strokeStyle: "#FFDD00", min: 200, max: 500 },
                    //        { strokeStyle: "#30B32D", min: 500, max: 2100 },
                    //        { strokeStyle: "#FFDD00", min: 2100, max: 2800 },
                    //        { strokeStyle: "#F03E3E", min: 2800, max: 3000 }
                    //    ],
                    //    limitMax: false,
                    //    limitMin: false,
                    //    strokeColor: '#E0E0E0',
                    //    highDpiSupport: true
                    //};
                    //selectGauge3.minValue = 0;
                    //selectGauge3.maxValue = 3000;
                    //selectGauge3.setOptions(opts);
                    //selectGauge3.set(1607);

                    var target = document.getElementById('canvas-preview' + line); // your canvas element
                    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

                    gaugeOptions.push({
                        opts,
                        target
                    });

                    gauges.push(gauge);

                    //gauge.maxValue = rowLast.HighLimit + 50; // set max gauge value
                    //gauge.setMinValue(rowLast.LowLimit - 50);  // Prefer setter over gauge.minValue = 0
                    gauge.maxValue = rowLast.HighLimit * 1.2,
                    gauge.setMinValue(rowLast.LowLimit * 1.2);
                    
                    for (var i = 0; i < mRecords2.length; i++) {


                        var posts = {};
                        var row = mRecords2[i];



                        //            var dd= row.RegDate.toString()+" "+row.RegTime.toString();


                        var dds = row.date.toString() + " " + row.Id.toString();
                        var dd = row.date.toString();
                        var cc = row.value.toString();


                        let bg_lh = "";
                        if (row.value < row.LowLimit || row.value > row.HighLimit) {

                            bg_lh = "bg-danger text-white";
                        }

                        var td_val = '<label style="display: block;" class=" ps-2 ' + bg_lh + '" title="Lower Limit:' + row.LowLimit + ' Upper Limit:' + row.HighLimit + '" >' + cc + '</label>';


                        //var td_val = '<label style="display: block;" class=" ps-2 bg-danger text-white" >'+ cc +'</label>';


                        let newRowContent = "<tr><td>" + dd.split(" ")[0] + "</td><td>" + row.time.toString() + "</td><td>" + td_val + "</td></tr>"
                       

                        $("#recordsDatatable" + line + " tbody").append(newRowContent);
                       

                        //$("#recordsDatatable" + line).css('width', '95%');
                        $("#recordsDatatable" + line).css('height', '40%');










                        var arraycontainsturtles = (mmDate.indexOf(dd) > -1);
                        var arraycontainsturtles3 = (mmDate3.indexOf(dd) > -1);

                        if (!arraycontainsturtles3) {

                            mmDate3.push(dd);
                        }

                        mmDate2.push(dd);
                        //mmDate.push(dd);
                        var dob = {};

                        //if (!arraycontainsturtles) {
                        //    mmDate.push(dd);

                        //}

                        mmDate.push(dd);


                        dob.x = dds;

                        dob.y = cc;
                        mmCol0_1.push(dob);





                        //          alert(JSON.stringify(dob));
                    }
                    //        alert(dob);

                    // alert(JSON.stringify(mmCol0_1));
                    mdataset.data = mmCol0_1;

                    //mdataset.showLine = document.getElementById('chkLine').checked;
                    mdataset.showLine = true;
                    //        mdataset.label='Dashed';

                    mdataset.borderDash = [5, 5];

                    //         mdataset.pointRadius= [2, 4, 6, 18, 0, 12, 20];

                    mdataset.pointRadius = 5;
                    mdataset.pointHoverRadius = 7;

                    mdataset.spanGaps = true;
                    //            mdataset.spanGaps=document.getElementById('chkLine').checked;


                    mydatasets.push(mdataset);



                    mdataset2.data = mmCol0_1;
                    mdataset2.label = 'Dashed';

                    mdataset2.borderDash = [5, 5];
                    mdataset2.spanGaps = true;

                    //          mydatasets.push(mdataset2);
                    /*    }*/


                    //        alert(JSON.stringify(mydatasets));

                    //        var a = ['a', 1, 'a', 2, '1'];
                    //var unique = mmDate.filter( onlyUnique ); // returns ['a', 1, 2, '1']

                    //          var MONTHS = unique;
                    var MONTHS = mmDate;





                    config2 = {

                        type: 'line',
                        data: {

                            //        labels:unique,
                            labels: mmDate,
                            datasets: mydatasets,
                        },
                        options: {
                            //            legend: {
                            //        	display: false
                            //        },

                            //             animation: {
                            //            duration: 5000 // general animation time
                            //        },

                            responsive: true,
                            title: {
                                display: true,
                                text: ' chart   ' + response[k].Serial + ' ( ' + response[k].userData1[0].SesnsorType.toUpperCase()+ ' )'
                                /* text: ' chart   ' + massetName + '( ' + myformName + ' ) '*/
                            },
                            //				tooltips: {
                            //					mode: 'label',
                            //					intersect: true,
                            //				},
                            //tooltips: {
                            //    //						enabled: false,
                            //    mode: 'x',
                            //    callbacks: {
                            //        title: function (tooltipItems, data) {
                            //            return '';
                            //        }
                            //        //                    ,
                            //        //                     label: function(tooltipItems, data) {
                            //        //                    return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' '+tooltipItems.xLabel;
                            //        //                }
                            //    }
                            //    //						mode: 'x'
                            //    //                        ,
                            //    //                        	intersect: false
                            //    //						position: 'nearest'
                            //    //						custom: customTooltips
                            //    //  callbacks: {
                            //    //            label: function(tooltipItem, data) {


                            //    ////            tooltipItems.forEach(function(tooltipItem) {
                            //    ////								sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            //    ////							});
                            //    ////							return 'Sum: ' + sum;

                            //    //               return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            //    //            }
                            //    //            }
                            //},
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },

                            scales: {

                                //                 pointLabels :{
                                //                 fontsize:"larger",
                                //           fontStyle: "bold",
                                //        },
                                xAxes: [{


                                    //                    ticks: {
                                    //                fontSize: 40
                                    //            },
                                    //   type: 'time',
                                    //        distribution: 'linear',
                                    //						display: true,
                                    scaleLabel: {

                                        display: true,
                                        labelString: 'date'

                                    }
                                }],






                                yAxes: [{


                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: "value"
                                    }
                                }]
                            }
                        }
                    };
                    //ctx = 'chart_' + line;

                    ctx = document.getElementById(line).getContext('2d');

                    //console.log("Serial2:");
                    //console.log(response[k].Serial);

                    //console.log("ctx:");
                    //console.log(ctx);

                    //if (window.line2 != null) {
                    //    window.line2.destroy();
                    //}




                    if (window_line2 != null) {
                        window_line2.destroy();
                    }


                    let delayInMilliseconds = 600;
                    setTimeout(function () {
                        //your code to be executed after 1 second
                        //window.line2 = new Chart(ctx, config);
                        window_line2 = new Chart(ctx, config2);
                        window_line2.update();
                        //                  alert(1);
                    }, delayInMilliseconds);

                    // scrollTop: $("#canvas").offset().top
                    //             $([document.documentElement, document.body]).animate({
                    //        scrollTop: $("#canvas").offset().top
                    //    }, 2000);

                    //scrollTop: $("#btnSensorSave").offset().top - 60
                    //$([document.documentElement, document.body]).animate({
                    //    scrollTop: $("#btnSensorSave").offset().top - 60
                    //}, 2000);

                    gauge.animationSpeed = 32; // set animation speed (32 is default value)
                    console.log(rowLast);
                   
                    console.log(rowLast.date);
                   
                    $("#preview-time" + line).html(rowLast.date.toString());
                    gauge.setTextField(document.getElementById("preview-textfield"+line));
                    gauge.set(rowLast.value.toString()); // set actual value


                }


                else // isLive
                {
                    let window_line2 = null;

                    //objIndex2 = Chart.helpers.findIndex((instance => instance.chart.canvas.id == line));
                 
                    //window_line2 = Chart.helpers[objIndex2];


                    var BreakException = {};

                    try {
                    Chart.helpers.each(Chart.instances, function (instance) {
/*                        alert(instance.chart.canvas.id)*/
                        //console.log(instance.chart.canvas.id);

                        if (instance.chart.canvas.id.toString() == line) {
                            window_line2 = instance.chart;
                            throw BreakException;
                            //break;
                        }
                        //window_line2 = instance.chart;
                    })
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }


                    let config2 = [];
                    let ctx = document.getElementById(line).getContext("2d");

                    //let window_line2 = new Chart(ctx, config2);
                   
                    //let window_line2 = Chart.getChart(ctx);
                    //let window_line2 = ctx;

                   



                    var rowLast = mRecords2[mRecords2.length - 1];

                    //var opts = {
                    //    angle: -0.01, // The span of the gauge arc
                    //    lineWidth: 0.20, // The line thickness
                    //    radiusScale: 1, // Relative radius
                    //    pointer: {
                    //        length: 0.35, // // Relative to gauge radius
                    //        strokeWidth: 0.035, // The thickness
                    //        color: '#000000' // Fill color
                    //    },
                    //    limitMax: false,     // If false, max value increases automatically if value > maxValue
                    //    limitMin: false,     // If true, the min value of the gauge will be fixed
                    //    colorStart: '#6F6EA0',   // Colors
                    //    colorStop: '#C0C0DB',    // just experiment with them
                    //    strokeColor: '#EEEEEE',  // to see which ones work best for you
                    //    generateGradient: true,
                    //    highDpiSupport: true,     // High resolution support
                    //    // renderTicks is Optional
                    //    renderTicks: {
                    //        divisions: 8,
                    //        divWidth: 1.1,
                    //        divLength: 1,
                    //        divColor: '#333333',
                    //        subDivisions: 0,
                    //        subLength: 0.5,
                    //        subWidth: 0.6,
                    //        subColor: '#666666'
                    //    },
                    //    staticZones: [
                    //        //{ strokeStyle: "#f03e3e", min: 0, max: 1 },
                    //        //{ strokeStyle: "#fa5f31", min: 1, max: 1.4 },
                    //        //{ strokeStyle: "#ff7d22", min: 1.4, max: 2 },
                    //        //{ strokeStyle: "#ff9a0f", min: 2, max: 2.6 },
                    //        //{ strokeStyle: "#ffb700", min: 2.6, max: 3.2 },
                    //        //{ strokeStyle: "#f1c200", min: 3.2, max: 3.8 },
                    //        //{ strokeStyle: "#e1cc00", min: 3.8, max: 4.4 },
                    //        //{ strokeStyle: "#d0d500", min: 4.4, max: 5 },
                    //        //{ strokeStyle: "#adce02", min: 5, max: 5.6 },
                    //        //{ strokeStyle: "#89c612", min: 5.6, max: 6.3 },
                    //        //{ strokeStyle: "#62bd20", min: 6.3, max: 7 },
                    //        //{ strokeStyle: "#30b32d", min: 7, max: 8 },

                    //        { strokeStyle: "#dc3545", min: rowLast.LowLimit - 20, max: rowLast.LowLimit },
                    //        { strokeStyle: "#30b32d", min: rowLast.LowLimit, max: rowLast.HighLimit },

                    //        { strokeStyle: "#dc3545", min: rowLast.HighLimit, max: rowLast.HighLimit + 20 },
                    //    ]
                    //};
                    //let target = document.getElementById('canvas-preview' + line); // your canvas element
                    //let gauge = Gauge.getElementById('canvas-preview' + line);               
                    ////let gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                    ////gauge.maxValue = rowLast.HighLimit + 20; // set max gauge value
                    ////gauge.setMinValue(rowLast.LowLimit - 20);  // Prefer setter over gauge.minValue = 0

                  
                

                    //for (let gauge of gauges) {
                    //    //gauge.maxValue = 3000; // set max gauge value
                    //    gauge.animationSpeed = 32; // set animation speed (32 is default value)
                    //    gauge.set(rowLast.value.toString()); // set actual value
                    //}

                    objIndex2 = gauges.findIndex((obj => obj.canvas.id == 'canvas-preview' + line));

                    
                    //gauges[objIndex2].setOptions(gaugeOptions[objIndex2].opts);
                    $("#preview-time" + line).text(rowLast.date.toString());
                    gauges[objIndex2].animationSpeed = 32;
                    gauges[objIndex2].setTextField(document.getElementById("preview-textfield" + line));
                  
                    
                    gauges[objIndex2].set(rowLast.value.toString());

                    for (var i = 0; i < mRecords2.length; i++) {


                        var posts = {};
                        var row = mRecords2[i];



                        //            var dd= row.RegDate.toString()+" "+row.RegTime.toString();


                        var dds = row.date.toString() + " " + row.Id.toString();
                        var dd = row.date.toString();
                        var cc = row.value.toString();


                        let bg_lh = "";
                        if (row.value < row.LowLimit || row.value > row.HighLimit) {

                            bg_lh = "bg-danger text-white";
                        }

                        var td_val = '<label style="display: block;" class=" ps-2 ' + bg_lh + '" title="Lower Limit:' + row.LowLimit + ' Upper Limit:' + row.HighLimit + '" >' + cc + '</label>';


                        //var td_val = '<label style="display: block;" class=" ps-2 bg-danger text-white" >'+ cc +'</label>';

                        var rowCount = $("#recordsDatatable" + line + " tbody tr").length;
                        if (rowCount >= 10) {
                            $("#recordsDatatable" + line + " tbody tr:first").remove();

                        }
                       
                        let newRowContent = "<tr><td>" + dd.split(" ")[0] + "</td><td>" + row.time.toString() + "</td><td>" + td_val + "</td></tr>"
                        $("#recordsDatatable" + line + " tbody").append(newRowContent);

                        //$("#recordsDatatable" + line).css('width', '95%');
                        $("#recordsDatatable" + line).css('height', '40%');


                      

                        //mmDate2.push(dd);
                      
                        var dob = {};

                        mmDate.push(dd);

                        dob.x = dds;
                        dob.y = cc;
                        //mmCol0_1.push(dob);

                        if (rowCount >= 10) {
                            window_line2.data.labels.splice(0, 1);
                            window_line2.data.datasets[0].data.splice(0, 1);
                            window_line2.update();
                        }


                        window_line2.data.labels.push(dd);

                        //window.line2.data.labels.push(dd);
                        //alert(2);
                       
                        window_line2.data.datasets[0].data.push(dob);
                        //alert(3);
                        window_line2.update();

                       
                        //window_line2.data.labels.pop();
                        //window_line2.data.datasets[0].data.pop();
                        //window_line2.update();



                        //          alert(JSON.stringify(dob));
                    }
                   
                    //mdataset.data = mmCol0_1;

                   
                    //mydatasets.push(mdataset);



                  
                    //gauge.animationSpeed = 32; // set animation speed (32 is default value)
                    //gauge.set(rowLast.value.toString()); // set actual value
                    //gauge.set("20");

                }
                
               



            }


            prosesse = false;

        }

        , Error: function (response) {

            prosesse = false;
            //alert("error");
        }

    });




    return false;


}


function drawMyChart_old()

{
    var mserial_Id = [];
    var mserial = [];
    var result = {};

    $('#cmbSerial :selected').each(function () {
        var o = $(this);
        //console.log(o.text());
        //result[o.text()] = o.val();
        mserial_Id.push(o.val());
        mserial.push(o.text());
    });


    if (mserial.length < 1) {

        swal({
            type: 'error',
            title: 'error',
            text: 'No Sensor Selected',
            timer: 6000
        }).catch(swal.noop);

        return false;
    }
    //$('#output').text(JSON.stringify(result));

    //alert(JSON.stringify(result));
    
    let mToken = $('input:hidden[name="__RequestVerificationToken"]').val();
   
    var mydatasets = [];


    var myColor = ["#8cc63f", "#0a6aea", "#ff3700", "#15ab83", "#cc65fe", "#d6df44"];
    

   

    //mserial.push("22221");
    //mserial.push("3331");
    //mserial.push("22221");
    var mmDate = [];
    var mmDate2 = [];

   

   
  
    
    if (mserial.length > 6) {

        swal({
            type: 'error',
            title: 'error',
            text: 'The maximum number of selectable sensors is 6',
            //text: 'The maximum number of selectable Sensor Serials is 6',
            timer: 6000
        }).catch(swal.noop);
        return false;
    }


    var mRecords2 = [];
    let mData = {
        //Id: parseInt($("#hfId").val()) || 0,
        //Name: $("#txtName").val(),
        //Family: $("#txtFamily").val(),
        //Phone: $("#txtPhone").val(),
        //UserName: $("#txtUserName").val(),
        //Address: $("#txtAddress").val(),
        //Pass: $("#txtPass").val(),
        ////img: $("#txtimg").val(),
        //img: output.src.split('/').pop(),

        Serial_Ids: mserial_Id,
        StartDate: $("#txtStartDate").val(),
        EndDate: $("#txtEndDate").val(),
        lastId: lastId
        

    };
    $.ajax({
        type: "POST",
        async: true,
        url: "/charts?handler=GetRecords",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        //url: "CompareRecords.aspx/GetRecords2",

      
      
        success: function (response) {
         
            mRecords2 = response.userData1;

            lastId = response.LastId;
           /* alert(response.LastId);*/
           

            for (var s = 0; s < mserial.length; s++) {

                var mmDate3 = [];
                var mdataset2 = {};
                var mdataset = {};
                mdataset.label = mserial[s];
                mdataset.borderColor = myColor[s];
                mdataset.backgroundColor = myColor[s];

                //let ranColor = randomColor(1);
                //mdataset.borderColor = ranColor;
                //mdataset.backgroundColor = ranColor;

                mdataset.fill = false;


                mdataset2.label = mserial[s];
                mdataset2.borderColor = myColor[s];
                mdataset2.fill = false;

                var posts_list = [];

                var mmCol0_1 = [];


              

                for (var i = 0; i < mRecords2.length; i++) {


                    var posts = {};
                    var row = mRecords2[i];

                   
                    
                    //            var dd= row.RegDate.toString()+" "+row.RegTime.toString();
                    var dd = row.date.toString();
                    var cc = row.value.toString();


                    var arraycontainsturtles = (mmDate.indexOf(dd) > -1);
                    var arraycontainsturtles3 = (mmDate3.indexOf(dd) > -1);

                    if (!arraycontainsturtles3) {

                        mmDate3.push(dd);
                    }
                    if (!arraycontainsturtles) {
                        mmDate.push(dd);

                    }
                    mmDate2.push(dd);
                    //mmDate.push(dd);
                    var dob = {};
                    if (row.Serial.toString().trim() == mserial[s].trim()) {
                        //          mmDate.push(dd);
                        dob.x = dd;
                        dob.y = cc;
                        mmCol0_1.push(dob);

                    }
                    else {

                        //           mmCol0_1.push(null);
                        //          mmCol0_1.push(null);
                        //           alert("no");
                        //          alert(2);
                        // mmDate.push(dd);
                        if (!arraycontainsturtles3) {
                            dob.x = dd;
                            dob.y = null;
                            mmCol0_1.push(dob);
                        }
                        //else{
                        // mmCol0_1.push(null);
                        //}
                    }



                    //          alert(JSON.stringify(dob));
                }
                //        alert(dob);

                // alert(JSON.stringify(mmCol0_1));
                mdataset.data = mmCol0_1;

                //mdataset.showLine = document.getElementById('chkLine').checked;
                mdataset.showLine = true;
                //        mdataset.label='Dashed';

                mdataset.borderDash = [5, 5];

                //         mdataset.pointRadius= [2, 4, 6, 18, 0, 12, 20];

                mdataset.pointRadius = 8;
                mdataset.pointHoverRadius = 10;

                mdataset.spanGaps = true;
                //            mdataset.spanGaps=document.getElementById('chkLine').checked;


                mydatasets.push(mdataset);



                mdataset2.data = mmCol0_1;
                mdataset2.label = 'Dashed';

                mdataset2.borderDash = [5, 5];
                mdataset2.spanGaps = true;

                //          mydatasets.push(mdataset2);
            }


            //        alert(JSON.stringify(mydatasets));

            //        var a = ['a', 1, 'a', 2, '1'];
            //var unique = mmDate.filter( onlyUnique ); // returns ['a', 1, 2, '1']

            //          var MONTHS = unique;
            var MONTHS = mmDate;

            var config = {

                type: 'line',
                data: {

                    //        labels:unique,
                    labels: mmDate,
                    datasets: mydatasets,
                },
                options: {
                    //            legend: {
                    //        	display: false
                    //        },

                    //             animation: {
                    //            duration: 5000 // general animation time
                    //        },

                    responsive: true,
                    title: {
                        display: true,
                        text: ' chart   ' + $("#cmbSensorT").select2('data')[0].text
                       /* text: ' chart   ' + massetName + '( ' + myformName + ' ) '*/
                    },
                    //				tooltips: {
                    //					mode: 'label',
                    //					intersect: true,
                    //				},
                    //tooltips: {
                    //    //						enabled: false,
                    //    mode: 'x',
                    //    callbacks: {
                    //        title: function (tooltipItems, data) {
                    //            return '';
                    //        }
                    //        //                    ,
                    //        //                     label: function(tooltipItems, data) {
                    //        //                    return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' '+tooltipItems.xLabel;
                    //        //                }
                    //    }
                    //    //						mode: 'x'
                    //    //                        ,
                    //    //                        	intersect: false
                    //    //						position: 'nearest'
                    //    //						custom: customTooltips
                    //    //  callbacks: {
                    //    //            label: function(tooltipItem, data) {


                    //    ////            tooltipItems.forEach(function(tooltipItem) {
                    //    ////								sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    //    ////							});
                    //    ////							return 'Sum: ' + sum;

                    //    //               return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    //    //            }
                    //    //            }
                    //},
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },

                    scales: {

                        //                 pointLabels :{
                        //                 fontsize:"larger",
                        //           fontStyle: "bold",
                        //        },
                        xAxes: [{


                                                ticks: {
                                            fontSize: 20
                                        },
                            //   type: 'time',
                            //        distribution: 'linear',
                            //						display: true,
                            scaleLabel: {

                                display: true,
                                labelString: 'date'

                            }
                        }],






                        yAxes: [{

                            ticks: {
                                fontSize: 20
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "value"
                            }
                        }]
                    }
                }
            };


            var ctx = document.getElementById('line2').getContext('2d');

            if (window.line2 != null) {
                window.line2.destroy();
            }


            var delayInMilliseconds = 600;
            setTimeout(function () {
                //your code to be executed after 1 second
                window.line2 = new Chart(ctx, config);
                //                  alert(1);
            }, delayInMilliseconds);

            // scrollTop: $("#canvas").offset().top
            //             $([document.documentElement, document.body]).animate({
            //        scrollTop: $("#canvas").offset().top
            //    }, 2000);

            scrollTop: $("#btnSensorSave").offset().top - 60
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#btnSensorSave").offset().top - 60
            }, 2000);




        }

        , Error: function (response) {
            alert("errorت");
        }

    });




    return false;


}




/*$('#cmbPetName').on("select2:change", function (e) {*/
    $('#cmbPetName').on("change", function (e) { //after Select
    // what you would like to happen

    var sensorId = $("#cmbSensorT").val();
    $('#cmbSerial')
        .find('option')
        .remove();


    fill_Serial_combo(sensorId);

});


$('#cmbSensorT').on("select2:select", function (e) {
    // what you would like to happen

    var sensorId = e.params.data.id;

 /*   alert(sensorId);*/

    $('#cmbSerial')
        .find('option')
        .remove();

    
    fill_Serial_combo(sensorId);

});


function fill_Serial_combo(sensorId)
{

    let buildings = [];
    $('#cmbPetName :selected').each(function () {
        var o = $(this);
        //console.log(o.text());
        //result[o.text()] = o.val();

        buildings.push(o.val());
    });

    if (buildings.length < 1) {
       
        return;
    }

    let mToken = $('input:hidden[name="__RequestVerificationToken"]').val();
    let mData = {

        buildings: buildings,
        sensorId: sensorId,

    };
    $.ajax({
        type: "POST",
        async: true,
        url: "/charts?handler=GetMySerials",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $('#cmbSerial')
                .find('option')
                .remove();
            let mRecords2 = [];
            mRecords2 = response;

            for (var i = 0; i < mRecords2.length; i++) {


                var posts = {};
                var row = mRecords2[i];

                if (i == 0) {

                    $('#cmbSerial')
                        .find('option')
                        .end()
                        .append('<option value="' + row.Id + '">' + row.Serial.toString() + '</option>').val(row.Id)

                }

                else {

                    $('#cmbSerial')
                        .find('option')
                        .end()
                        .append('<option value="' + row.Id + '">' + row.Serial.toString() + '</option>')
                }
               




                    /*.append('<option value="' + row.Id + '">' + row.Serial.toString() + '</option>')*/

                //$('#cmbSerial')
                //    .find('option')
                //    .remove()
                //    .end()
                //    .append('<option value="' + row.Id + '">' + row.Serial.toString() + '</option>')
                    /*.val(row.Id)*/ //select option
                    ;
            }


            if (firstExecut)

            {
                firstExecut = false;
                drawMyChart(false);
            }

        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);


            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);

        }
    });
    return false;
}

$('#cmbPetOwnerName').on("select2:select", function (e) {
    // what you would like to happen
   
    var customerid = e.params.data.id;
  
    fill_CustomerCmb(customerid);
});


function fill_CustomerCmb(customerid) {

    let mToken = $('input:hidden[name="__RequestVerificationToken"]').val();
    let mData = {

        customerid: customerid


    };
    $.ajax({
        type: "POST",
        async: true,
        url: "/dashboard?handler=GetMyBuildind",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $('#cmbSerial')
                .find('option')
                .remove();
            $('#cmbPetName')
                .find('option')
                .remove();

            let mRecords2 = [];
            mRecords2 = response;

            for (var i = 0; i < mRecords2.length; i++) {


                var posts = {};
                var row = mRecords2[i];



                if (i == 0) {

                    $('#cmbPetName')
                        .find('option')
                        .end()
                        .append('<option  value="' + row.Id + '">' + row.BuildingName.toString() + '</option>').val(row.Id)

                }

                else {

                    $('#cmbPetName')
                        .find('option')
                        .end()
                        .append('<option  value="' + row.Id + '">' + row.BuildingName.toString() + '</option>')
                }




                //$('#cmbPetName')
                //    .find('option')
                //    .end()
                //    .append('<option value="' + row.Id + '">' + row.BuildingName.toString() + '</option>')
                //    /*.val(row.Id)*/ //select option
                //    ;
            }

            let sensorId = $("#cmbSensorT").val();

            fill_Serial_combo(sensorId);

        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);


            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);

        }
    });
    return false;

}

var randomScalingFactor = function () {
    return Math.round(Math.random() * 300);
};
var randomColorFactor = function () {
    return Math.round(Math.random() * 255);
};
var randomColor = function (opacity) {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.7') + ')';
};


function show_Picker3() {
    document.getElementById('txtStartDate').showPicker();
}
function show_Picker4() {
    document.getElementById('txtEndDate').showPicker();
}
