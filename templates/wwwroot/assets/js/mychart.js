let lastId = 0;

$(document).ready(function () {
    $("#chartsPage").addClass("current");

    let customerid = $("#cmbPetOwnerName").val();;

    fill_CustomerCmb(customerid);

   
    //let sensorId = $("#cmbSensorT").val();;

  
    //fill_Serial_combo(sensorId);

    var config2 = [];
    var ctx = document.getElementById("line2").getContext("2d");
    window.line2 = new Chart(ctx, config2);


    
     

});


setInterval(function () {
    if (lastId > 0) {
        drawMyChartLive();
    }
        
    }, 3000);



$("#btnSensorSave").click(function () {
    lastId = 0;

    //var config2 = {
    //    type: "line",
    //    data: {
    //        labels: ["فروردین", "اردی بهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    //        datasets: [{
    //            backgroundColor: "rgba(151,187,205,0.5)",
    //            borderColor: "rgba(151,187,205,0.7)",
    //            borderWidth: 2,
    //            label: "شیراز",
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
    //        }, {
    //            backgroundColor: "rgba(60,205,53,0.5)",
    //            borderColor: "rgba(60,205,53,0.7)",
    //            borderWidth: 2,
    //            label: "تهران",
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
    //        }]
    //    },
    //    options: {
    //        maintainAspectRatio: false,
    //        responsive: true,
    //        title: {
    //            display: true
    //        },
    //        hover: {
    //            mode: "nearest",
    //            intersect: true
    //        },
    //        scales: {
    //            xAxes: [{
    //                display: true,
    //                scaleLabel: {
    //                    display: true,
    //                    labelString: "ماه"
    //                }
    //            }],
    //            yAxes: [{
    //                display: true,
    //                scaleLabel: {
    //                    display: true,
    //                    labelString: "مقدار"
    //                },
    //                ticks: {
    //                    suggestedMin: -10,
    //                    suggestedMax: 250
    //                },
    //            }]
    //        }
    //    }
    //};
    //var ctx = document.getElementById("line2").getContext("2d");
    //window.line2 = new Chart(ctx, config2);

    
    drawMyChart();



   
});





function drawMyChartLive() {
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

        //swal({
        //    type: 'error',
        //    title: 'error',
        //    text: 'No Sensor Selected',
        //    timer: 6000
        //}).catch(swal.noop);

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

        //swal({
        //    type: 'error',
        //    title: 'error',
        //    text: 'The maximum number of selectable sensors is 6',
        //    //text: 'The maximum number of selectable Sensor Serials is 6',
        //    timer: 6000
        //}).catch(swal.noop);
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

            let chart = document.getElementById('line2').getContext('2d');
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



                console.log(" mRecords2.length:" + mRecords2.length);
                for (var i = 0; i < mRecords2.length; i++) {


                    var posts = {};
                    var row = mRecords2[i];



                    //            var dd= row.RegDate.toString()+" "+row.RegTime.toString();
                    var dds = row.date.toString() + " " + row.Id.toString();
                    var dd = row.date.toString();
                    var cc = row.value.toString();

                    //console.log("dd:" + dd);
                    //console.log("cc:" + cc);

                    var arraycontainsturtles = (mmDate.indexOf(dd) > -1);
                    var arraycontainsturtles3 = (mmDate3.indexOf(dd) > -1);

                    if (!arraycontainsturtles3) {

                        mmDate3.push(dd);
                    }
                    //if (!arraycontainsturtles) {
                    //    mmDate.push(dd);

                    //}
                    mmDate.push(dd);
                    mmDate2.push(dd);
                    //mmDate.push(dd);
                    var dob = {};
                    if (row.Serial.toString().trim() == mserial[s].trim()) {
                        //          mmDate.push(dd);
                        dob.x = dds;
                        dob.y = cc;
                        mmCol0_1.push(dob);
                        //alert(1);
                        //if (!arraycontainsturtles) {
                        //    window.line2.data.labels.push(dd);

                        //}

                        window.line2.data.labels.push(dd);

                        //window.line2.data.labels.push(dd);
                        //alert(2);
                        window.line2.data.datasets[s].data.push(dob);
                        //alert(3);
                        window.line2.update();
                      /*  alert(4);*/
                    }
                    else {

                        //           mmCol0_1.push(null);
                        //          mmCol0_1.push(null);
                        //           alert("no");
                        //          alert(2);
                        // mmDate.push(dd);
                        //if (!arraycontainsturtles3) {
                        //    dob.x = dd;
                        //    dob.y = null;
                        //    mmCol0_1.push(dob);
                        //}
                        //else{
                        // mmCol0_1.push(null);
                        //}
                    }



                 

                  
                    //window.line2.data.labels.push(mmDate);

                    //window.line2.data.datasets.forEach((dataset) => {

                    //    dataset.data.push(mydatasets);

                    //});

                    //window.line2.update();



                    //          alert(JSON.stringify(dob));
                }
                //        alert(dob);

                // alert(JSON.stringify(mmCol0_1));
                //mdataset.data = mmCol0_1;
              
                mdataset.data = mmCol0_1;
               
                mydatasets.push(mdataset);
              

                //          mydatasets.push(mdataset2);
            }


            //        alert(JSON.stringify(mydatasets));

            //        var a = ['a', 1, 'a', 2, '1'];
            //var unique = mmDate.filter( onlyUnique ); // returns ['a', 1, 2, '1']

            //          var MONTHS = unique;



            //window.line2.data.labels.push(mmDate);

            //window.line2.data.datasets.forEach((dataset) => {

            //    dataset.data.push(mydatasets);

            //});

            //window.line2.update();


        }

        , Error: function (response) {
            //alert("error ");
        }

    });




    return false;


}

function drawMyChart() {
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
               

                    var dds = row.date.toString() + " " + row.Id.toString();
                    var dd = row.date.toString();
                    var cc = row.value.toString();


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

                    if (row.Serial.toString().trim() == mserial[s].trim()) {
                        //          mmDate.push(dd);
                        //if (!arraycontainsturtles) {
                        //    dob.x = dd;

                        //}

                        //else {
                        //    dob.x = null;
                        //}
                       
                        dob.x = dds;
                      
                        dob.y = cc;
                        mmCol0_1.push(dob);

                    }
                    else {

                        //           mmCol0_1.push(null);
                        //          mmCol0_1.push(null);
                        //           alert("no");
                        //          alert(2);
                        // mmDate.push(dd);
                        //if (!arraycontainsturtles3) {
                        //    dob.x = dd;
                        //    dob.y = null;
                        //    mmCol0_1.push(dob);
                        //}
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
            alert("error");
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
        url: "/charts?handler=GetMyBuildind",
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
                        .append('<option value="' + row.Id + '">' + row.BuildingName.toString() + '</option>').val(row.Id)

                }

                else {

                    $('#cmbPetName')
                        .find('option')
                        .end()
                        .append('<option value="' + row.Id + '">' + row.BuildingName.toString() + '</option>')
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
