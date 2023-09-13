$(document).ready(function () {

    var lat = 40.73;
    var lon = -74.00;





    // initialize map
    map = L.map('mapDiv');




    // set map tiles source

    //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    //    maxZoom: 18,
    //}).addTo(map);
    //L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
    //    maxZoom: 80,
    //    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //}).addTo(map);


    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 25,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);


    //map.locate({ setView: false, maxZoom: 8 }); // for permission

    // add marker to the map
    //map.setView(new L.LatLng(lat, lon), 18);

    //marker = L.marker([lat, lon]).addTo(map);
    //marker.bindPopup("<b>ACME CO.</b><br />This st. 47<br />New York").openPopup();


    var mlat, lng;

    map.addEventListener('mousemove', function (ev) {
        mlat = ev.latlng.lat;
        lng = ev.latlng.lng;

        //console.log(mlat + " " + lng);

    });

    //document.getElementById("mapDiv").addEventListener("contextmenu", function (event) {
    document.getElementById("mapDiv").addEventListener("dblclick", function (event) {
        
        //event.preventDefault();

        ////console.log(mlat + " " + lng);
        ////markers.clearLayers();
        //map.removeLayer(marker);

        //marker = L.marker([mlat, lng]).addTo(map);
        //marker.bindPopup(mlat + " , " + lng).openPopup();
        

        //return false; // To disable default popup.
    });



    $("#cmbSensorT").select2({
        dropdownParent: $("#SensorModal")
    });

    let m_date = new Date().toUTCString().slice(0, 10);
    //$("#txtContractDate").text(m_date);
    document.getElementById('txtdate').value = m_date;
    //$('#mySensor').DataTable({
    //    responsive: true,
    //    order: [[1, 'asc']],
    //    rowGroup: {
    //        dataSrc: 1
    //    },
    //    paging: false,
    //    scrollY: "600px",
      
    //    "columnDefs":
    //    {
    //        "targets": [1],
    //        "visible": false

    //    }
    //    ,
    //    "columnDefs":
    //    {
    //        "targets": [2],
    //        "visible": false

    //    }
    //    ,
    //    ordering: false,

    //});


  


    //$('#mySensor tbody').on('click', 'tr.group', function () {
    //    var currentOrder = activityTable2.order()[0];
    //    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
    //        activityTable2.order([groupColumn, 'desc']).draw();
    //    } else {
    //        activityTable2.order([groupColumn, 'asc']).draw();
    //    }
    //});

    $(window).resize(function () {
        setTimeout(function () {
            $("#mySensor").DataTable().columns.adjust();
        }, 500);
        setTimeout(function () {
            $("#buildingDatatable").DataTable().columns.adjust();
        }, 500);
    });
    $("#toggle-sidebar").on("click", function (e) {

        setTimeout(function () {
            $("#mySensor").DataTable().columns.adjust();
        }, 500);
        setTimeout(function () {
            $("#buildingDatatable").DataTable().columns.adjust();
        }, 500);
    });


    let test_s = parseInt(getParameterByName('customer'))||0;
   
    if (test_s != 0) {

        $("#cmbPetOwnerName").val(test_s).change();
        $("#cmbPetOwnerName").prop('disabled', true);
    }
   
    let mydata = {
        CusId: parseInt(test_s) || 0
    };
    let murl = "/api/customer/Buildings";
    var activityTable = $("#buildingDatatable").DataTable({
        //ajax: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Portuguese-Brasil.json",

        /*  "processing": "<img src='~/assets/images/AjaxLoader.gif'> Loading...",*/
        "processing": true,
        language: {
            processing: "<img src='/assets/images/AjaxLoader.gif' style='max-width: 100px;'> Loading..."
        },
        "serverSide": true,
        "filter": true,
        "scrollX": true,
        "scrollY": 500,
        "ajax": {

            /* "url": "/api/customer/Patients",*/
            "url": murl,
            "data": mydata,
            "type": "POST",
            "datatype": "json"



        },
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
            ,
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            }
            ,
            {
                "targets": [4],
                "data": 'teamgo',
                "render": function (data, type, row, meta) {
                    return '<textarea style="width:250px;height: 100px; resize: none;background-color: transparent;border: none;" disabled >' + data + '</textarea>';
                }
            }
            ,
            {
                "targets": 7,
                "data": 'teamLogo',
                "render": function (data, type, row, meta) {
                    return '<img class="img-circle img-responsive img_profile_Right" src="/assets/Images/user/' + data + '" alt="image"/>';
                }

            }
        ],
        //,


        rowId: "Id",
        select: true,
        "columns": [
            { "data": "Id", "name": "Id", "autoWidth": true },
            { "data": "CustomerId", "name": "CustomerId", "autoWidth": true },
            { "data": "UserName", "name": "UserName", "width": "150px"},
            { "data": "BuildingName", "name": "BuildingName", "width": "150px" },
            { "data": "Address", "name": "Address", "width":"200px"},
                   
            { "data": "Location", "name": "Location", "width": "150px" },
            { "data": "Description", "name": "Description", "width": "160px" },
            { "data": "img", "name": "img", "width": "150px"},
            {
                "render": function (columns, row) {

                    //console.log(columns);
                    //console.log(row);
                    //<button class="btn btn-sm me-5 pe-3 btn-primary btn-curve" tabindex="0" aria-controls="customerDatatable" type="button"><span><i class="icon-plus me-1 pe-1"></i>New</span></button>
                    return "<button href='#' class='btn btn-sm  DeletT' title='Delete' ><i class='fa fa-remove fa-2x text-danger'></i></button>" +


                        "<button  class='btn btn-sm  EditT' title='Edit' ><i class='fa fa-edit fa-2x'></i></button>"
                        +

                        "<button href='#' class='btn btn-sm  BuildingT' title='Building' ><i class='fa fa-map-marker fa-2x text-danger'></i></button>";
                }
            },
        ]
        ,
        dom: 'Blfrtip',
        buttons: [

            //{
            //    extend: 'new',
            //    className: 'btn btn-sm btn-info btn-curve',
            //    attr: {
            //        title: 'Copy',
            //        id: 'copyButton'
            //    }


            //},
            {
                text: '<i class="icon-plus me-1 pe-1"></i>New',


                className: "btn btn-sm me-5 pe-3 btn-primary btn-curve",


                action: function (e, dt, node, config) {

                  /*  $('#mySensor').dataTable().clear();*/
                    $("#hfId").val("");


                    

                    var output = document.getElementById('imgP');
                    $("#fileProgress").hide();

                    output.src = "/assets/Images/user/building.png";
                    $("#imgP").show();


                    //$('input:checkbox').removeAttr('checked');
                    //$('input:checkbox').iCheck('update');
                    //$('input[name=sex]:checked').val("1");
                    //$('input:radio[name="sex"]').filter('[value="1"]').iCheck('check');
                    $('input:radio').iCheck('uncheck');
                    //$('input[name="sex"]').prop('checked', false);
                    $('form').find("input[type=text],input[type=date],input[type=password], textarea").val("");
                    $('#gridUser').hide();

                    $('#ttlPage').text("New Building");
                    $('#recordDetail').show();
                    $('#DivSensorDt').hide();

                }
            }
        ]
    });


    $(".dt-button").removeClass("dt-button");
    $('#recordDetail').hide();

    function getUsName() {
        var data = activityTable.row($(this).parents('tr')).data();
        $(this).text(data.UserName);
    }

    $('#buildingDatatable').on('click', '.EditT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
     
        EditCustomer(data);


        //alert("The ID is: " + data.Id);
    });

    $('#MapModal').on('shown.bs.modal', function () {
        setTimeout(function () {
            map.invalidateSize();
        }, 10);
    });

    $('#buildingDatatable').on('click', '.BuildingT', function () {
        var data = activityTable.row($(this).parents('tr')).data();

       

        let m_location = data.Location;

        let locat = m_location.split(",");

        if (!locat || locat.length != 2)
        {
            swal({
                type: 'error',
                title: 'error',
                text: 'Invalid Location',
                //text: 'The maximum number of selectable Sensor Serials is 6',
                timer: 6000
            }).catch(swal.noop);
            return false;

        }
      
        let m_lat = parseFloat(locat[0]);
        let m_lng = parseFloat(locat[1]);
       

      


        var lat = m_lat;
        var lon = m_lng;

     
        map.setView(new L.LatLng(lat, lon), 11);

        marker = L.marker([lat, lon]).addTo(map);
        map.panTo(new L.LatLng(lat, lon));
        marker.bindPopup(data.BuildingName).openPopup();

        $("#MapModalTitle").text(data.BuildingName + " (" + m_lat + " , " + m_lng + ")");
        let myModal = new bootstrap.Modal($('#MapModal'))
        myModal.show();
       



    });


    $('#buildingDatatable').on('click', '.DeletT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        DeleteCustomer(data);
        //alert("The ID is: " + data.Id);
    });




    $('#mySensor').on('click', '.EditST', function () {
     
        var data = activityTable2.row($(this).parents('tr')).data();

        $("#hfSensorId").val(data.Id);
        //$("#hfSensorType").val(ss);
        $("#cmbSensorT").val(data.Sensor).change();

        $("#txtSerial").val(data.Serial);
        $("#txtAliasName").val(data.AliasName);
        $("#txtLowLimit").val(data.LowLimit);
        $("#txtHighLimit").val(data.HighLimit);


        $("#SensorModalTitle").text("Edit Sensor");
        let myModal = new bootstrap.Modal($('#SensorModal'))
        myModal.show();


        //alert("The ID is: " + data.Id);
    });

    $('#mySensor').on('click', '.AddRecord', function () {

        var data = activityTable2.row($(this).parents('tr')).data();

        $("#hfSensorId").val(data.Id);
        //$("#hfSensorType").val(ss);
       
        $("#txtvalue").val("");
      
        let date2 = new Date();
       
        let sssa = date2.toLocaleString('en-GB').toString().split(",")[1].toString().trim();
      
        document.getElementById('txttime').value = sssa.trim();
        $("#txttime").val(sssa);
       
        document.getElementById('txtdate').valueAsDate = new Date();
        //$("#txtdate").val(m_date);
       
        $("#recordModalTitle").text("New Record For '" + data.AliasName+"'");
        let myModal = new bootstrap.Modal($('#recordModal'))
        myModal.show();


        //alert("The ID is: " + data.Id);
    });

    
   
    $('#mySensor').on('click', '.DeletST', function () {

        var data = activityTable2.row($(this).parents('tr')).data();


        DeleteSensor(data);
      
    });

});
//setInterval(function () {

//    setTimeout(function () {
//        $("#buildingDatatable").DataTable().columns.adjust();
     
//        $("#mySensor").DataTable().columns.adjust().draw();
//    }, 500);
//}, 1000);

//setInterval(function () {

//    setTimeout(function () {
      
//        $("#mySensor").DataTable().columns.adjust();

//    }, 500);
//}, 1000);

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


$.fn.extend({
    trackChanges: function () {
        $(":input", this).change(function () {
            $(this.form).data("changed", true);
        });
        $('input').on('ifChanged ', function (event) {
            $(this.form).data("changed", true);

        });
    }
    ,
    isChanged: function () {
        return this.data("changed");
    }
});

//document.getElementById("usersPage").classList.add("current");
$("#form1").trackChanges();

$("#BuildingsPage").addClass("current");



$("#btnRecordSave").click(function () {


    /* if ($('#form1').valid()) {*/
    if ($('#txtvalue').val().length < 1) {
        $('#txtvalue').focus();
        swal({
            type: 'error',
            title: 'Error',
            text: "Please enter the value ",
            timer: 6000
        }).catch(swal.noop);
        return;

    }

    if ($('#txttime').val().length < 1) {
        $('#txttime').focus();
        swal({
            type: 'error',
            title: 'Error',
            text: "Please enter the  time ",
            timer: 6000
        }).catch(swal.noop);
        return;

    }


    if ($('#txtdate').val().length < 1) {
        $('#txtdate').focus();
        swal({
            type: 'error',
            title: 'Error',
            text: "Please enter the date ",
            timer: 6000
        }).catch(swal.noop);
        return;

    }
    $("#btnRecordSave").prop('disabled', true);



    var dd = {
        s_Id: parseInt($("#hfSensorId").val()),
       
        date: $("#txtdate").val(),
        time: $("#txttime").val(),
        value: $("#txtvalue").val()
        



    };

    Crud_Record($('input:hidden[name="__RequestVerificationToken"]').val(), dd);



});

$("#btnRecordCancel").click(function () {


   

    hideModalRecord();

});



$("#btnSensorSave").click(function () {

   
    /* if ($('#form1').valid()) {*/
    if ($('#txtSerial').val().length < 1) {
        $('#txtSerial').focus();
        swal({
            type: 'error',
            title: 'Error',
            text: "Please enter the Serial ",
            timer: 6000
        }).catch(swal.noop);
        return;
      
    }

    if ($('#txtAliasName').val().length < 1) {
        $('#txtAliasName').focus();
        swal({
            type: 'error',
            title: 'Error',
            text: "Please enter the Alias Name ",
            timer: 6000
        }).catch(swal.noop);
        return;

    }
        $("#btnSensorSave").prop('disabled', true);

            
      
            var dd = {
                Id: parseInt($("#hfSensorId").val()) || 0,             
                buildingId: $("#hfId").val(),        
                Serial: $("#txtSerial").val(),
                Address: $("#txtAddress").val(),
                AliasName: $("#txtAliasName").val(),
                LowLimit: $("#txtLowLimit").val(),
                HighLimit: $("#txtHighLimit").val(),

                //img: $("#txtimg").val(),
              
                Sensor: $("#cmbSensorT").val()



            };
     
        Crud_Sensor($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


   
});

function hideModalFunc() {
    const truck_modal = document.querySelector('#SensorModal');
    const modal = bootstrap.Modal.getInstance(truck_modal);
    modal.hide();
}

function hideModalRecord() {
    const truck_recordModal = document.querySelector('#recordModal');
    const modal_recordModal = bootstrap.Modal.getInstance(truck_recordModal);
    modal_recordModal.hide();
}

$("#btnSave1").click(function () {


    /* if ($('#form1').valid()) {*/
    if ($('#txtBuildingName').valid() && $('#txtContractNo').valid() && $('#txtContractDate').valid()) {
        

        if ($("#form1").isChanged()) {


            $("#btnSave1").prop('disabled', true);

            var output = document.getElementById('imgP');


            var dd = {
                Id: parseInt($("#hfId").val()) || 0,
                Location: $("#txtLocation").val(),
                BuildingName: $("#txtBuildingName").val(),
                ContractNo: $("#txtContractNo").val(),
                Location: $("#txtLocation").val(),
                Address: $("#txtAddress").val(),
                ContractSubject: $("#txtContractSubject").val(),
                Description: $("#txtDescription").val(),
                ContractDate: $("#txtContractDate").val(),
              
                //img: $("#txtimg").val(),
                img: output.src.split('/').pop(),
                CustomerId: $("#cmbPetOwnerName").val()



            };
            Crud_Sec1($('input:hidden[name="__RequestVerificationToken"]').val(), dd);

        }



        else {
            //$('#mytabs a[href="#tab23"]').tab('show');
            $("#hfId").val("");
            $('#recordDetail').hide();
            $('#ttlPage').text("Buildings");
            $('#gridUser').show();
            $('#buildingDatatable').DataTable().ajax.reload();
        }

    }
    else {
        return false;
    }
});




$("#btnCancel1").click(function () {

    
    $("#hfId").val("");
    $('#recordDetail').hide();
    $('#ttlPage').text("Buildings");
    $('#gridUser').show();
    $("#buildingDatatable").DataTable().columns.adjust();

 

});

function EditCustomer(row) {

  

    var dd = {
        PatientId: row.Id
    };
    getData_Edit($('input:hidden[name="__RequestVerificationToken"]').val(), dd, row.Id);


}

function OpenSensorModal(ss) {



    //var dd = {
    //    PatientId: row.Id
    //};
    
    /* alert(ss);*/
    $("#hfSensorId").val("");
    //$("#hfSensorType").val(ss);


    $("#cmbSensorT").val(ss).change();

    $("#txtSerial").val("");
    $("#txtAliasName").val("");
    $("#txtLowLimit").val("");
    $("#txtHighLimit").val("");

    $("#SensorModalTitle").text("New Sensor");
    let myModal = new bootstrap.Modal($('#SensorModal'))
    myModal.show();
    //$('#SensorModal').modal();
}


function DeleteSensor(row) {

    //if (row.sys) {

    //    swal({
    //        type: 'error',
    //        title: 'Error',
    //        text: 'The System User Cannot Be Deleted',
    //        timer: 6000
    //    }).catch(swal.noop);

    //    return false;
    //}

    var dd = {
        PatientId: row.Id
    };
    DataSensor_delete($('input:hidden[name="__RequestVerificationToken"]').val(), dd, row);
}


function DeleteCustomer(row) {

    if (row.sys) {

        swal({
            type: 'error',
            title: 'Error',
            text: 'The System User Cannot Be Deleted',
            timer: 6000
        }).catch(swal.noop);

        return false;
    }

    var dd = {
        PatientId: row.Id
    };
    Data_delete($('input:hidden[name="__RequestVerificationToken"]').val(), dd, row);
}

function show_Picker3() {
    document.getElementById('txtContractDate').showPicker();
}

function show_Picker4() {
    document.getElementById('txtdate').showPicker();
}


function Crud_Sec1(mToken, mData) {

    let isNewMode = (mData.Id == 0);
    
    $.ajax({
        type: "POST",
        async: true,
        url: "/buildings?handler=Crud_Sec1",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {



            if (response.res) {
                //alert(response.Id);
            
                if (isNewMode) {
                 
                    $("#hfId").val(response.Id);
                    //$('#mytabs a[href="#tab23"]').tab('show');

                   
                    $('#ttlPage').text("Edit Building");
                   
                    $('#buildingDatatable').DataTable().ajax.reload();


                    $("#form1").data("changed", false);
                    //$("#form1").trackChanges();

                    $("#btnSave1").prop('disabled', false);


                    let dData = {
                        PatientId: response.Id
                    };
                    get_sensorData(dData);
                    $('#DivSensorDt').show();

                    

                }

                else {


                    $("#hfId").val("");
                    //$('#mytabs a[href="#tab23"]').tab('show');

                    $('#recordDetail').hide();
                    $('#ttlPage').text("Buildings");
                    $('#gridUser').show();
                    $('#buildingDatatable').DataTable().ajax.reload();


                    $("#form1").data("changed", false);
                    //$("#form1").trackChanges();

                    $("#btnSave1").prop('disabled', false);

                }
               
            }

            else {


                //alert("Y");
                swal({
                    type: 'error',
                    title: 'Error',
                    text: response.msg,
                    timer: 6000
                }).catch(swal.noop);
                $("#btnSave1").prop('disabled', false);

            }



        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnSave1").prop('disabled', false);

            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnSave1").prop('disabled', false);
        }
    });
}


function Crud_Record(mToken, mData) {

    let isNewMode = (mData.Id == 0);

    $.ajax({
        type: "POST",
        async: true,
        url: "/buildings?handler=Crud_Record",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {



            if (response.res) {
               
                


                $("#btnRecordSave").prop('disabled', false);

                $("#txtvalue").val("");

                swal(
                    'success',
                    'Record Add successfully.',
                    'success'
                ).catch(swal.noop);
            }

            else {


                //alert("Y");
                swal({
                    type: 'error',
                    title: 'Error',
                    text: response.msg,
                    timer: 6000
                }).catch(swal.noop);
                $("#btnRecordSave").prop('disabled', false);

            }



        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnRecordSave").prop('disabled', false);

            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnRecordSave").prop('disabled', false);
        }
    });
}
function Crud_Sensor(mToken, mData) {
   
    let isNewMode = (mData.Id == 0);
   
    $.ajax({
        type: "POST",
        async: true,
        url: "/buildings?handler=Crud_Sensor",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {



            if (response.res) {
                //alert(response.Id);

             /*   if (isNewMode) {*/

                    //$("#hfId").val(response.Id);
                    //$('#mytabs a[href="#tab23"]').tab('show');


                   

                    //$('#mySensor').DataTable().ajax.reload();


                    let dData = {
                        PatientId: mData.buildingId
                    };
                    get_sensorData(dData);


                   

                    $("#btnSensorSave").prop('disabled', false);


              
                hideModalFunc();

                //}

                //else {


                //    //$("#hfId").val("");
                //    //$('#mytabs a[href="#tab23"]').tab('show');

                //    $('#recordDetail').hide();
                //    $('#ttlPage').text("Buildings");
                //    $('#gridUser').show();
                //    $('#buildingDatatable').DataTable().ajax.reload();


                //    $("#form1").data("changed", false);
                //    //$("#form1").trackChanges();

                //    $("#btnSave1").prop('disabled', false);

                //}

            }

            else {


                //alert("Y");
                swal({
                    type: 'error',
                    title: 'Error',
                    text: response.msg,
                    timer: 6000
                }).catch(swal.noop);
                $("#btnSensorSave").prop('disabled', false);

            }



        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnSensorSave").prop('disabled', false);

            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 6000
            }).catch(swal.noop);
            $("#btnSensorSave").prop('disabled', false);
        }
    });
}
function getData_Edit(mToken, mData, buildingId) {
    //alert(JSON.stringify(mData));
    //var formData = new FormData();


   
    //formData.append("buildingId", buildingId);
   
    get_sensorData(mData);
    $.ajax({
        type: "POST",
        async: true,
        url: "/buildings?handler=MyPatientData",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            let mdata = response.building;
            $("#hfId").val(mdata.Id);
            $("#hfCustomerId").val(mdata.CustomerId);
            $("#cmbPetOwnerName").val(mdata.CustomerId).change();
            $("#txtLocation").val(mdata.Location);
            $("#txtBuildingName").val(mdata.BuildingName);
            $("#txtContractNo").val(mdata.ContractNo);
            $("#txtDescription").val(mdata.Description);
            $("#txtAddress").val(mdata.Address);
            $("#txtContractDate").val(mdata.ContractDate);
            $("#txtContractSubject").val(mdata.ContractSubject);
            $("#txtimg").val(mdata.img);

            var output = document.getElementById('imgP');
            $("#fileProgress").hide();

            output.src = "/assets/Images/user/" + mdata.img;
            $("#imgP").show();

          

            $("#form1").data("changed", false);
            //$("#form1").trackChanges();
            $('#gridUser').hide();
            $('#ttlPage').text("Edit Building");
            $('#recordDetail').show();
            $('#DivSensorDt').show();
            

           


        },
        failure: function (response) {
            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 2000
            }).catch(swal.noop);

            //alert(response.responseText);
        },
        error: function (response) {

            swal({
                type: 'error',
                title: 'error',
                text: 'error',
                timer: 2000
            }).catch(swal.noop);
        }
    });

   
}
var activityTable2 = null;
function get_sensorData(mData) {




    let murl2 = "/api/customer/Sensors";
    var groupColumn = 4;


     activityTable2 = $("#mySensor").DataTable({
        //ajax: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Portuguese-Brasil.json",

        /*  "processing": "<img src='~/assets/images/AjaxLoader.gif'> Loading...",*/
        destroy: true,
        "processing": true,
        language: {
            processing: "<img src='/assets/images/AjaxLoader.gif' style='max-width: 100px;'> Loading..."
        },
        "serverSide": true,
        /*   "filter": true,*/
        responsive: true,
        paging: false,
        /* scrollX: true,*/// destroy responsive???
        scrollY: "600px",     
       /* ordering:false,*/
        "ajax": {

            /* "url": "/api/customer/Patients",*/
            "url": murl2,
            "type": "POST",
            "data": mData,
            //contentType: false,
            //"datatype": "json"



        },
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3, 4],
                "visible": false,
                "searchable": false
               
            }


        ],

        //,
        order: [[4, 'asc']],
        //rowGroup: {
        //    dataSrc: [4]
        //},
        /*  ordering: false,*/
        rowId: "Id",
        select: true,
        "columns": [
            { "data": "Id", "name": "Id", "autoWidth": true, orderable: false },
            { "data": "buildingId", "name": "buildingId", "autoWidth": true, orderable: false },
            { "data": "CustomerId", "name": "CustomerId", "autoWidth": true, orderable: false},
            { "data": "Sensor", "name": "Sensor", "autoWidth": true, orderable: false},
            { "data": "SesnsorType", "name": "SesnsorType", "autoWidth": true, orderable: false },
            /* { "data": "BuildingName", "name": "BuildingName", "autoWidth": true },*/


            { "data": "Serial", "name": "Serial", "autoWidth": true, orderable: false },
            { "data": "AliasName", "name": "AliasName", "autoWidth": true, orderable: false},
            { "data": "LowLimit", "LowLimit": "img", "autoWidth": true,orderable: false },
            { "data": "HighLimit", "HighLimit": "img", "autoWidth": true,orderable:false },
            {
                "render": function (columns, row) {

                    //console.log(columns);
                    //console.log(row);
                    //<button class="btn btn-sm me-5 pe-3 btn-primary btn-curve" tabindex="0" aria-controls="customerDatatable" type="button"><span><i class="icon-plus me-1 pe-1"></i>New</span></button>
                    return "<button href='#' class='btn btn-sm  DeletST' title='Delete' ><i class='fa fa-remove fa-2x text-danger'></i></button>" +


                        "<button  class='btn btn-sm  EditST' title='Edit' ><i class='fa fa-edit fa-2x'></i></button>" +
                        "<button  class='btn btn-sm  AddRecord' title='Add New Record' ><i class='fa fa-plus-square-o  fa-2x text-success'></i></button>";
                },
                orderable: false
            },
        ]
        ,
        dom: 'Blfrtip',
        drawCallback: function (settings) {
            var api = this.api();
            /*var rows = api.rows({ page: 'current' }).nodes();*/
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api
                .column(groupColumn, { page: 'current' })
                .data()
                .each(function (group, i) {
                    if (last !== group) {

                      
                       /* console.log(rows.data()[i].Sensor);*/
                        $(rows)
                            .eq(i)
                            .before("<tr class='group'><td class='group' colspan='5'><span style='min-width:80px;display:inline-block'>" + group + "</span><button data_sensor=" + rows.data()[i].Sensor + "  class='btn btn-sm ms-5  SensorModalT' title='New Sensor' onclick='OpenSensorModal(" + rows.data()[i].Sensor + ")' ><i class='fa fa-plus fa-2x text-primary'></i></button>" + "  </td></tr>");

                        last = group;
                    }
                });
        }
        ,
        buttons: [

            //{
            //    extend: 'new',
            //    className: 'btn btn-sm btn-info btn-curve',
            //    attr: {
            //        title: 'Copy',
            //        id: 'copyButton'
            //    }


            //},
            {
                text: '<i class="icon-plus me-1 pe-1"></i>New Sensor',


                className: "btn btn-sm me-5 pe-3 btn-primary2 btn-curve",


                action: function (e, dt, node, config) {
                  
                    $("#hfSensorId").val("");
                    //$("#hfSensorType").val(1);




                   


                    OpenSensorModal(1);

                    //var output = document.getElementById('imgP');
                    //$("#fileProgress").hide();

                    //output.src = "/assets/Images/user/usrDef.png";
                    //$("#imgP").show();


                    //$('input:checkbox').removeAttr('checked');
                    //$('input:checkbox').iCheck('update');
                    //$('input[name=sex]:checked').val("1");
                    //$('input:radio[name="sex"]').filter('[value="1"]').iCheck('check');
                    //$('input:radio').iCheck('uncheck');
                    //$('input[name="sex"]').prop('checked', false);
                    //$('form').find("input[type=text],input[type=password], textarea").val("");
                    //$('#gridUser').hide();

                    //$('#ttlPage').text("New User");
                    //$('#recordDetail').show();

                }
            }
        ]
    });

   /* $("#mySensor").DataTable().columns.adjust().draw();*/
    setTimeout(function () {
        $("#mySensor").DataTable().columns.adjust();
    }, 500);

   
}


function DataSensor_delete(mToken, mData, row) {
    let Serial = row.Serial;
    //alert(patName);
    swal({
        title: 'Are you sure?',
        text: "Sensor '" + Serial + "' will be deleted...",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#777',
        confirmButtonText: 'Yes Delete.'
    }).then(function () {

        swal({
            
            title: 'do you continue ?',
            text: "All existing records for this Sensor ('" + Serial + "') will be deleted and cannot be recovered!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f44336',
            cancelButtonColor: '#777',
            confirmButtonText: 'Yes Delete.'
        }).then(function () {

            $.ajax({
                type: "POST",
                async: true,
                url: "/buildings?handler=DeleteSensorData",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        mToken);

                },
                data: mData,
                success: function (response) {

                  


                    swal(
                        'Delete successfully',
                        'The selected Sensor was successfully deleted.',
                        'success'
                    ).catch(swal.noop);

                    let dData = {
                        PatientId: row.buildingId
                    };
                    get_sensorData(dData);
                    //$('#buildingDatatable').DataTable().ajax.reload();
                },
                failure: function (response) {
                    swal({
                        type: 'error',
                        title: 'error',
                        text: 'error',
                        timer: 2000
                    }).catch(swal.noop);

                    //alert(response.responseText);
                },
                error: function (response) {

                    swal({
                        type: 'error',
                        title: 'error',
                        text: 'error',
                        timer: 2000
                    }).catch(swal.noop);
                }
            });


        }, function (dismiss) {
            if (dismiss === 'cancel') {
                swal(
                    'canceled',
                    'The selected Sensor still exists.',
                    'error'
                ).catch(swal.noop);;
            }
        }).catch(swal.noop);




    }, function (dismiss) {
        if (dismiss === 'cancel') {
            swal(
                'canceled',
                'The selected Sensor still exists.',
                'error'
            ).catch(swal.noop);;
        }
    }).catch(swal.noop);




    


}

function Data_delete(mToken, mData, row) {
    let BuildingName = row.BuildingName;
    //alert(patName);

    swal({
        title: 'Are you sure?',
        text: "Building '" + BuildingName + "' will be deleted...",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#777',
        confirmButtonText: 'Yes Delete.'
    }).then(function () {


        swal({
            title: 'do you continue ?',
            text: "All defined sensors and existing records for this Building ('" + BuildingName + "') will be deleted and cannot be recovered!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f44336',
            cancelButtonColor: '#777',
            confirmButtonText: 'Yes Delete.'
        }).then(function () {

            $.ajax({
                type: "POST",
                async: true,
                url: "/buildings?handler=DeleteUserData",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        mToken);

                },
                data: mData,
                success: function (response) {
                    swal(
                        'Delete successfully',
                        'The selected Building was successfully deleted.',
                        'success'
                    ).catch(swal.noop);

                    $('#buildingDatatable').DataTable().ajax.reload();
                },
                failure: function (response) {
                    swal({
                        type: 'error',
                        title: 'error',
                        text: 'error',
                        timer: 2000
                    }).catch(swal.noop);

                    //alert(response.responseText);
                },
                error: function (response) {

                    swal({
                        type: 'error',
                        title: 'error',
                        text: 'error',
                        timer: 2000
                    }).catch(swal.noop);
                }
            });


        }, function (dismiss) {
            if (dismiss === 'cancel') {
                swal(
                    'canceled',
                    'The selected Building still exists.',
                    'error'
                ).catch(swal.noop);;
            }
        }).catch(swal.noop);






    }, function (dismiss) {
        if (dismiss === 'cancel') {
            swal(
                'canceled',
                'The selected Building still exists.',
                'error'
            ).catch(swal.noop);;
        }
    }).catch(swal.noop);





  



}


$('.FuncUploadFiles').change(function (event) {

    var ub = {};

    var p1 = $("#hfId").val();
    var name1 = "";


    var input = document.getElementById('fileUpl');

    //var btnDelFile = document.getElementById(btnDelFileId);
    var files = input.files;
    if (!files[0].type.match(/image.*/)) {
        alert('This file format cannot be uploaded');
        return false;
    }
    if (files[0].size > 5242880) {

        alert("The maximum file size is 2 MB");
        return false;
    }

    var reader = new FileReader();


    var output = document.getElementById('imgP');

    var formData = new FormData();


    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append('mid', "0");
        /*  formData.append('s3', ub.s3);*/
        formData.append('pId', "1");

    }

    $.ajax(
        {
            //url: "/api/Values/upload2",
            url: "/buildings?handler=UploadImage",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },


            data: formData,

            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                $("#" + 'fileProgress').hide();

                output.src = data.url;
                $("#" + 'imgP').show();

            }
            , xhr: function () {
                var fileXhr = $.ajaxSettings.xhr();
                if (fileXhr.upload) {
                    $("#" + 'fileProgress').show();
                    $("#" + 'imgP').hide();
                    //$("#" + btnDelFileId).hide();


                    fileXhr.upload.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            console.log(e.loaded);
                            console.log(e.total);
                            $("#" + 'fileProgress').attr({
                                value: e.loaded,
                                max: e.total
                            });
                        }
                    }, false);
                }
                return fileXhr;
            }
        }
    );

});