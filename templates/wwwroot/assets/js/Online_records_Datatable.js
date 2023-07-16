let AllNewCount = 0;

$(document).ready(function () {

    $("#cmbSensorT").select2({
        dropdownParent: $("#recordModal")
    });
    $("#cmbCustomerName").select2({
        dropdownParent: $("#recordModal")
    });
    
    //let murl = "/api/customer/Buildings";
    let murl = "/api/customer/MyOnlineRecords";
    //var mydata_t = {
    //    CusId: 0,
    //    building:  $('#Filter12').val()
    //};

  
    $("#toggle-sidebar").on("click", function (e) {      
        setTimeout(function () {
            $("#recordsDatatable").DataTable().columns.adjust();
        }, 500);
    });

    $('#recordsDatatable thead tr').clone(true).appendTo('#recordsDatatable thead');
    //$('#recordsDatatable thead tr').appendTo('#recordsDatatable thead');
    $('#recordsDatatable thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        //if (i == 11 || i==13  ) {
        //    $(this).html('<input class="FilterH" id="Filter' + i + '" type="text" placeholder="' + title + '" disabled/>');
        //} else {
        //    $(this).html('<input class="FilterH" id="Filter' + i + '" type="text" placeholder="' + title + '" />');
        //}

        switch (i)
        {
            //case 7:
            //case 8:
            //    $(this).html('<input class="FilterH"  style="width:150px"  id="Filter' + i + '" type="text" />');
            //    break;
            //case 9:
            //    $(this).html('<input class="FilterH" style="width:120px"  id="Filter' + i + '" type="text"  />');
            //    break;
            //case 10:
            //    $(this).html('<input class="FilterH" style="width:80px" id="Filter' + i + '" type="text"  />');
            //    break;
            case 11:     
            case 13:
                $(this).html('<input class="FilterH"  style="width:98%; margin:0;padding:0" id="Filter' + i + '" type="text"  disabled/>');
                break;
           
            //case 12:
            //    $(this).html('<input class="FilterH" style="width:80px"  id="Filter' + i + '" type="text"/>');
            //    break;

            default:
             
                $(this).html('<input class="FilterH"  style="width:98%; margin:0;padding:0"  id="Filter' + i + '" type="text"  />');
                break;

        }



        $('input', this).on('keyup change', function () {
            if (activityTable.column(i).search() !== this.value) {

                //alert(this.value);
                activityTable
                    .column(i)
                    .search(this.value)
                    .draw();
                //mydata_t = {
                //    CusId: 0,
                //    building: $('#Filter12').val()
                //};
                //alert($('#Filter12').val());
                //$('#recordsDatatable').DataTable().ajax.reload();
                //re_t();
            }
        });
    });


    var currentCount = 0;
    

    var prcss = true;
    var prcss2 = "<img  src='/assets/images/AjaxLoader.gif' style='max-width: 100px;'> Loading...";


    var activityTable = null;
    re_t();

    //if (activityTable.data().count()) {
    //    currentCount = activityTable.data().count();
    //}
  /*  currentCount = activityTable.dataTable().rows().count();*/


    setInterval(function () {
        prcss= false;
      //$("#recordsDatatable_processing").css("display", "none");
        $("#recordsDatatable_processing").addClass("forceHide");
     
        //activityTable.draw();
        activityTable.ajax.reload(function () {
          
            $("#recordsDatatable_processing").removeClass("forceHide");

            //let thisCount = activityTable.dataTable().rows().count();
            //if (thisCount > currentCount) {

            //    alert(thisCount - currentCount + " new records add");
            //}

            //currentCount = thisCount;


            //if (activityTable.data().count()) {

            //    let thisCount = activityTable.data().count();

            //    if (thisCount > currentCount) {

            //        alert(thisCount - currentCount +" new records add");
            //    }

            //    currentCount = thisCount;
            //}


            //let thisCount = this.fnSettings().fnRecordsTotal();
            //let thisCount = activityTable.data().count();

            //if (currentCount > 0 && thisCount > currentCount) {
            //    let newCoun = thisCount - currentCount;
            //    AllNewCount += newCoun;

            //    $("#ttlPage").text("Records" + " (New Records: " + AllNewCount + ")");
            //    noty({
            //        /*   theme: 'mint',*/
            //        text: (newCoun) + ((newCoun > 1) ? " new records received" : " new record received"),
            //        /*   type: 'information',*/
            //        type: 'success',
            //        //layout: "bottomRight",
            //        layout: "topCenter",
            //        progressBar: true,
            //        timeout: 3000

            //    });

            //    //alert(thisCount - currentCount +" new records add");
            //}

            //currentCount = thisCount;


        }, false);
        //activityTable.ajax.reload(null, false); // user paging is not reset on reload

        //$("#recordsDatatable_processing").removeClass("forceHide");
        //prcss = true;
        //$("#recordsDatatable_processing").css("display", "block");
        //prcss2 = "<img src='/assets/images/AjaxLoader.gif' style='max-width: 100px;'> Loading...";
        //prcss = true;
        //activityTable.ajax.reload();
    }, 3000);
   
    $(".dt-button").removeClass("dt-button");

   
    function re_t() {
        var mydata_t = {
            CusId: 0,
            building: $('#Filter12').val()
        };

        activityTable = $("#recordsDatatable").DataTable({


            //ajax: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Portuguese-Brasil.json",

            /*  "processing": "<img src='~/assets/images/AjaxLoader.gif'> Loading...",*/         
            autoWidth: true,
             ordering: false,
            "order": [],  /*disable initial or default sort*/
            
            destroy: true,
            orderCellsTop: true,
            "processing": prcss,
            language: {
                processing: prcss2
            },
            "initComplete": function (settings, json) {
               

                //currentCount = this.fnSettings().fnRecordsTotal();

              
            },
            "drawCallback": function (settings, start, end, max, total, pre) {
                //console.log(this.fnSettings().json); /* for json response you can use it also*/
                //console.log(this.fnSettings().fnRecordsTotal());

                //var data2 = this.fnSettings().json;
                //console.log(data2.recordsFiltered);

              /*  console.log(this.fnSettings().fnRecordsFiltered());*/
                //alert(this.fnSettings().fnRecordsTotal()); // total number of rows
              
                    let thisCount = this.fnSettings().fnRecordsTotal();

                    if (currentCount > 0 && thisCount > currentCount) {
                        let newCoun = thisCount - currentCount;
                        AllNewCount += newCoun;

                        $("#ttlPage").text("Records" + " (New Records: " + AllNewCount + ")");
                        noty({
                            /*   theme: 'mint',*/
                            text: (newCoun) + ((newCoun > 1) ? " new records received" : " new record received"),
                            /*   type: 'information',*/
                            type: 'success',
                            //layout: "bottomRight",
                            layout: "topCenter",
                            progressBar: true,
                            timeout: 3000

                        });

                        //alert(thisCount - currentCount +" new records add");
                    }

                    currentCount = thisCount;
               

           
            },
           

            "serverSide": true,
            "searching": true,
            "filter": true,
            "scrollX": true,
            "scrollY": 500,
            "ajax": {

                /* "url": "/api/customer/Patients",*/
                "url": murl,
                "data": mydata_t,
                "type": "POST",
                "datatype": "json"



            },

         

            "columnDefs": [
                {
                    "targets": [0, 1, 2, 3, 4, 5, 6],
                    "visible": false,
                    "searchable": false
                }
                ,
                {
                    "targets": [11],
                    "data": 'teamgo',
                    "render": function (data, type, row, meta) {

                        let bg_lh = "";
                        if (data < row.LowLimit || data > row.HighLimit) {

                            bg_lh = "bg-danger text-white";
                        }

                        return '<label style="display: block;" class=" ps-2 ' + bg_lh + '" title="Lower Limit:' + row.LowLimit + '&#010;Upper Limit:' + row.HighLimit + '" >' + data + '</label>';
                    }
                }

                //,
                //{
                //    "targets": 6,
                //    "data": 'team2',
                //    "render": function (data, type, row, meta) {
                //        /*  return '<img class="img-circle img-responsive img_profile_Right" src="/assets/Images/user/' + data + '" alt="profile image"/>';*/

                //        return "<button href='#' class='btn btn-sm  DeletT' title='Delete' ><i class='fa fa-remove fa-2x text-danger'></i></button>" +


                //            "<button  class='btn btn-sm  EditT' title='Edit' ><i class='fa fa-edit fa-2x'></i></button>"
                //            +

                //            '<a target="_blank"  href="buildings?customer=' + row.Id + '" class="btn btn-sm  BuildingT" title="Building" ><i class="fa fa-building fa-2x text-primary"></i></a>';
                //    }

                //}
            ],
            //,


            rowId: "Id",
            select: true,
            "columns": [
                { "data": "Id", "name": "Id", "autoWidth": true },
                { "data": "buildingId", "name": "buildingId", "autoWidth": true },
                { "data": "s_Id", "name": "s_Id", "autoWidth": true },
                { "data": "CustomerId", "name": "CustomerId", "autoWidth": true },
                { "data": "Sensor", "name": "Sensor", "autoWidth": true },
                { "data": "LowLimit", "name": "LowLimit", "autoWidth": true },
                { "data": "HighLimit", "name": "HighLimit", "autoWidth": true },
                { "data": "UserName", "name": "UserName", "autoWidth": true, "width": "130px"},
                { "data": "BuildingName", "name": "BuildingName", "searchable": true, "width": "130px" },
                { "data": "AliasName", "name": "AliasName", "autoWidth": true, "width":"120px"},
                { "data": "SesnsorType", "name": "SesnsorType", "autoWidth": true, "width": "100px" },
                { "data": "value", "name": "value", "autoWidth": true, "width": "100px"},
                { "data": "date", "name": "date", "autoWidth": true, "width": "100px"},
                { "data": "time", "name": "time", "autoWidth": true, "width": "100px"},
               



                //{
                //    "render": function (data, type, row, meta) {

                //        //console.log(columns);
                //        //console.log(row);
                //        //<button class="btn btn-sm me-5 pe-3 btn-primary btn-curve" tabindex="0" aria-controls="customerDatatable" type="button"><span><i class="icon-plus me-1 pe-1"></i>New</span></button>
                //        return "<button href='#' class='btn btn-sm  DeletT' title='Delete' ><i class='fa fa-remove fa-2x text-danger'></i></button>" +


                //            "<button  class='btn btn-sm  EditT' title='Edit' ><i class='fa fa-edit fa-2x'></i></button>"
                //            +

                //        '<a href="buildings?customer=' + data.Id + '" class="btn btn-sm  BuildingT" title="Building" ><i class="fa fa-building fa-2x text-primary"></i></a>';
                //    }
                //},
            ]
            ,
            dom: 'Blfrtip',
            buttons: [


                //{
                //    text: '<i class="icon-plus me-1 pe-1"></i>New',


                //    className: "btn btn-sm me-5 pe-3 btn-primary btn-curve",


                //    action: function (e, dt, node, config) {
                //        $("#hfId").val("");


                //        //$("#cmbSensorT").val(ss).change();
                //        //$('#cmbSensorT option:first-child').attr("selected", "selected");

                //        //let myDDL = $('#cmbSensorT');
                //        //myDDL[0].selectedIndex = 0;
                //        $("#txtSerial").val("");
                //        $("#txtAliasName").val("");
                //        $("#txtLowLimit").val("");
                //        $("#txtHighLimit").val("");

                //        $("#recordModalTitle").text("New Serial");
                //        let myModal = new bootstrap.Modal($('#recordModal'))
                //        myModal.show();

                //        //$('input:radio').iCheck('uncheck');

                //        //$('form').find("input[type=text],input[type=date],input[type=password], textarea").val("");
                //        //$('#gridUser').hide();

                //        //$('#ttlPage').text("New User");
                //        //$('#recordDetail').show();

                //    }
                //}
            ]
        });
    }

    function getUsName() {
        var data = activityTable.row($(this).parents('tr')).data();
        $(this).text(data.UserName);
    }

    $('#recordsDatatable').on('click', '.EditT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        EditCustomer(data);
       
        
        //alert("The ID is: " + data.Id);
    });

    $('#recordsDatatable').on('click', '.DeletT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        DeleteCustomer(data);
        //alert("The ID is: " + data.Id);
    });
    
});
//setInterval(function () {

//    setTimeout(function () {
//        $("#recordsDatatable").DataTable().columns.adjust();
//    }, 500);
//}, 1000);

$(window).resize(function () {
    //$("#recordsDatatable").DataTable().columns.adjust().draw();
    setTimeout(function () {
        $("#recordsDatatable").DataTable().columns.adjust();
    }, 500);
   
});




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

//document.getElementById("CustomersPage").classList.add("current");
$("#form1").trackChanges();

$("#OnlineReportsPage").addClass("current");


$("#btnSave1").click(function () {

   
    /* if ($('#form1').valid()) {*/
    if ($('#txtUserName').valid() && $('#txtPass').valid()) {


    if ($("#form1").isChanged()) {
       

            $("#btnSave1").prop('disabled', true);

            var output = document.getElementById('imgP');


            var dd = {
                Id: parseInt($("#hfId").val()) || 0,
                Name: $("#txtName").val(),
                Family: $("#txtFamily").val(),
                Phone: $("#txtPhone").val(),
                UserName: $("#txtUserName").val(),
                Address: $("#txtAddress").val(),
                Pass: $("#txtPass").val(),
                //img: $("#txtimg").val(),
                img: output.src.split('/').pop()
            



            };
            Crud_Sec1($('input:hidden[name="__RequestVerificationToken"]').val(), dd);

        }
       
    

    else {
        //$('#mytabs a[href="#tab23"]').tab('show');
        $("#hfId").val("");
      
        $('#ttlPage').text("Customers");
        $('#gridUser').show();
        $('#recordsDatatable').DataTable().ajax.reload();
    }

    }
     else {
        return false;
    }
});






function EditCustomer(row) {

   
    var dd = {
        PatientId: row.Id    
    };
    getData_Edit($('input:hidden[name="__RequestVerificationToken"]').val(),dd);
   
    
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



function Crud_Sec1(mToken, mData) {
    
    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec1",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {



            if (response.res) {
                //alert(response.Id);
             

                $("#hfId").val("");
                //$('#mytabs a[href="#tab23"]').tab('show');

              
                $('#ttlPage').text("Customers");
                $('#gridUser').show();
                $('#recordsDatatable').DataTable().ajax.reload();


                $("#form1").data("changed", false);
                //$("#form1").trackChanges();

                $("#btnSave1").prop('disabled', false);

                //if (mData.Id != 0 && mData.Id == response.Id) {


                //    VDimgUser
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


function getData_Edit(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=MyPatientData",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            let mdata = response.user;
            $("#hfId").val(mdata.Id);
            $("#txtName").val(mdata.Name);
            $("#txtFamily").val(mdata.Family);
            $("#txtPhone").val(mdata.Phone);
            $("#txtUserName").val(mdata.UserName);
            $("#txtPass").val(mdata.Pass);
            $("#txtAddress").val(mdata.Address);
            $("#txtimg").val(mdata.img);

            var output = document.getElementById('imgP');
            $("#fileProgress" ).hide();

            output.src = "/assets/Images/user/"+ mdata.img;
            $("#imgP").show();
         
            $("#cmbRole").val(mdata.Role).change();
            //$('input:radio[name="sex"]').filter('[value="' + mdata.Sex+'"]').iCheck('check');
            //$('input[name=sex]:checked').val(mdata.Sex);
          
            $("#form1").data("changed", false);
            //$("#form1").trackChanges();
            $('#gridUser').hide();
            $('#ttlPage').text("Edit Customers");
           

          
         
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
function Data_delete(mToken, mData, row) {
    let userName = row.UserName;
    //alert(patName);
    swal({
        title: 'Are you sure?',
        text: "Username '" + userName + "' will be deleted...",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#777',
        confirmButtonText: 'Yes Delete.'
    }).then(function () {

        $.ajax({
            type: "POST",
            async: true,
            url: "/index?handler=DeleteUserData",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    mToken);

            },
            data: mData,
            success: function (response) {
                swal(
                    'Delete successfully',
                    'The selected user was successfully deleted.',
                    'success'
                ).catch(swal.noop);

                $('#recordsDatatable').DataTable().ajax.reload();
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
                'The selected user still exists.',
                'error'
            ).catch(swal.noop);;
        }
    }).catch(swal.noop);





}


function ResetCount() {
  
    if (AllNewCount < 1) {
     
        return false;
    }
   

    swal({
        title: 'Are you sure?',
        text: "The number of new records will be reset...",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#777',
        confirmButtonText: 'Yes Reset.'
    }).then(function () {

     
        AllNewCount = 0;
    
        $("#ttlPage").text("Records");
    }, function (dismiss) {
        //if (dismiss === 'cancel') {
        //    swal(
        //        'canceled',
        //        'The number of new records still exists.',
        //        'error'
        //    ).catch(swal.noop);;
        //}
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
            url: "/index?handler=UploadImage",
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