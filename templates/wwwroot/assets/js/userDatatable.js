$(document).ready(function () {


    
    let murl = "/api/customer/Users";
    var activityTable =  $("#userDatatable").DataTable({
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
            "type": "POST",
            "datatype": "json"
          
           

        },
        "columnDefs": [
            {
            "targets": [0,4],
            "visible": false,
            "searchable": false
            }
            ,
            {
                "targets": 6,
                "data": 'teamLogo',
                "render": function (data, type, row, meta) {
                    return '<img class="img-circle img-responsive img_profile_Right" src="/assets/Images/user/' + data + '" alt="profile image"/>';
                }

            }
        ],
            //,

           
        rowId: "Id",
        select: true,
        "columns": [
            { "data": "Id", "name": "Id", "autoWidth": true },
            { "data": "Name", "name": "Name", "autoWidth": true },
            { "data": "Family", "name": "Family", "autoWidth": true },
            { "data": "UserName", "name": "UserName", "autoWidth": true },
           /* { "data": "Pass", "name": "Pass", "autoWidth": true },*/
            { "data": "Role", "name": "Role", "autoWidth": true },
            { "data": "expireDate", "name": "expireDate", "autoWidth": true },
            { "data": "img", "name": "img", "autoWidth": true },
            { "data": "sys", "name": "sys", "autoWidth": true,"visible":false }
            ,
            {
                "render": function (columns, row) {

                    //console.log(columns);
                    //console.log(row);
                    //<button class="btn btn-sm me-5 pe-3 btn-primary btn-curve" tabindex="0" aria-controls="customerDatatable" type="button"><span><i class="icon-plus me-1 pe-1"></i>New</span></button>
                    return "<button href='#' class='btn btn-sm  DeletT' title='Delete' ><i class='fa fa-remove fa-2x text-danger'></i></button>" +


                        "<button  class='btn btn-sm  EditT' title='Edit' ><i class='fa fa-edit fa-2x'></i></button>";
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
                    $("#hfId").val("");

                    var output = document.getElementById('imgP');
                    $("#fileProgress").hide();

                    output.src = "/assets/Images/user/usrDef.png";
                    $("#imgP").show();


                    //$('input:checkbox').removeAttr('checked');
                    //$('input:checkbox').iCheck('update');
                    //$('input[name=sex]:checked').val("1");
                    //$('input:radio[name="sex"]').filter('[value="1"]').iCheck('check');
                    $('input:radio').iCheck('uncheck');
                    //$('input[name="sex"]').prop('checked', false);
                    $('form').find("input[type=text],input[type=date],input[type=password], textarea").val("");
                    $('#gridUser').hide();
                    
                    $('#ttlPage').text("New User");
                    $('#recordDetail').show();

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

    $('#userDatatable').on('click', '.EditT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        EditCustomer(data);
       
        
        //alert("The ID is: " + data.Id);
    });

    $('#userDatatable').on('click', '.DeletT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        DeleteCustomer(data);
        //alert("The ID is: " + data.Id);
    });
    
});
//setInterval(function () {

//    setTimeout(function () {
//        $("#userDatatable").DataTable().columns.adjust();
//    }, 500);
//}, 1000);

$(window).resize(function () {
    setTimeout(function () {
        $("#userDatatable").DataTable().columns.adjust();
    }, 500);

});

$("#toggle-sidebar").on("click", function (e) {

    setTimeout(function () {
        $("#userDatatable").DataTable().columns.adjust();
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

//document.getElementById("usersPage").classList.add("current");
$("#form1").trackChanges();

$("#usersPage").addClass("current");


$("#btnSave1").click(function () {

   
    /* if ($('#form1').valid()) {*/
    if ($('#txtUserName').valid() && $('#txtPass').valid() && $('#txtexpireDate').valid() ) {


    if ($("#form1").isChanged()) {
       

            $("#btnSave1").prop('disabled', true);

            var output = document.getElementById('imgP');


            var dd = {
                Id: parseInt($("#hfId").val()) || 0,
                Name: $("#txtName").val(),
                Family: $("#txtFamily").val(),
                UserName: $("#txtUserName").val(),
                Pass: $("#txtPass").val(),
                expireDate: $("#txtexpireDate").val(),
                //img: $("#txtimg").val(),
                img: output.src.split('/').pop(),
                Role: $("#cmbRole").val()



            };
            Crud_Sec1($('input:hidden[name="__RequestVerificationToken"]').val(), dd);

        }
       
    

    else {
        //$('#mytabs a[href="#tab23"]').tab('show');
        $("#hfId").val("");
        $('#recordDetail').hide();
        $('#ttlPage').text("Users");
        $('#gridUser').show();
        $('#userDatatable').DataTable().ajax.reload();
    }

    }
     else {
        return false;
    }
});




$("#btnCancel1").click(function () {


    $("#hfId").val("");
    $('#recordDetail').hide();
    $('#ttlPage').text("Users");
    $('#gridUser').show();
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

function show_Picker3() {
    document.getElementById('txtexpireDate').showPicker();
}

function Crud_Sec1(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/Users?handler=Crud_Sec1",
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

                $('#recordDetail').hide();
                $('#ttlPage').text("Users");
                $('#gridUser').show();
                $('#userDatatable').DataTable().ajax.reload();


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
        url: "/Users?handler=MyPatientData",
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
            $("#txtUserName").val(mdata.UserName);
            $("#txtPass").val(mdata.Pass);
            $("#txtexpireDate").val(mdata.expireDate);
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
            $('#ttlPage').text("Edit Users");
            $('#recordDetail').show();


          
         
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
            url: "/Users?handler=DeleteUserData",
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

                $('#userDatatable').DataTable().ajax.reload();
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
            url: "/Users?handler=UploadImage",
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