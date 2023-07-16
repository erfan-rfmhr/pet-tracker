$(document).ready(function () {
     let test_s = getParameterByName('test');
    let murl = test_s == "1" ? "/api/customer" : "/api/customer/Patients";
    var activityTable =  $("#customerDatatable").DataTable({
        ajax: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Portuguese-Brasil.json",

        /*  "processing": "<img src='~/assets/images/AjaxLoader.gif'> Loading...",*/
        "processing": true,
        language: {
            processing: "<img src='/assets/images/AjaxLoader.gif' style='max-width: 100px;'> Loading..."
        },
        "serverSide": true,
        "filter": true,
        "scrollY": 500,
        "ajax": {

            /* "url": "/api/customer/Patients",*/
            "url": murl,
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],
            "visible": false,
            "searchable": false
        }],
        rowId: "Id",
        select: true,
        "columns": [
            { "data": "Id", "name": "Id", "autoWidth": true },
            { "data": "Name", "name": "Name", "autoWidth": true },
            { "data": "Family", "name": "Family", "autoWidth": true },
            { "data": "NationalCode", "name": "NationalCode", "autoWidth": true },
            { "data": "Age", "name": "Age", "autoWidth": true },
            { "data": "DateOfExam", "name": "DateOfExam", "autoWidth": true },
            {
                "render": function (data, row) {

                    
                    return "<button  class='btn btn-sm btn-secondary pe-3  btn-curve EditT'  ><i class='fa fa-edit me-1  pe-1'></i>Edit</button>" +

                        "<button href='#' class='btn btn-sm  btn-danger btn-curve pe-3  ms-2 DeletT' ><i class='fa fa-remove me-1 pe-1'></i>Delete</button>";
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

                    if ($("#hfIns").val() == "6") {
                        $("#hfId").val("");
                        //$('input:checkbox').removeAttr('checked');
                        //$('input:checkbox').iCheck('update');
                        //$('input[name=sex]:checked').val("1");
                        //$('input:radio[name="sex"]').filter('[value="1"]').iCheck('check');
                        $('input:radio').iCheck('uncheck');
                        //$('input[name="sex"]').prop('checked', false);
                        $('form').find("input[type=text], textarea").val("");
                        $('#gridPatient').hide();

                        $('#ttlPage').text("New Patient");
                        $('#recordDetail').show();
                    }

                    else {
                        swal({
                            type: 'warning',
                            title: 'Warning',
                            text: "You do not have access to this operation",
                            timer: 4000
                        }).catch(swal.noop);
                    }

                   

                }
            }
        ]
    });

    
    $(".dt-button").removeClass("dt-button");
    $('#recordDetail').hide();


    $('#customerDatatable').on('click', '.EditT', function () {
        var data = activityTable.row($(this).parents('tr')).data();
        EditCustomer(data);
       
        
        //alert("The ID is: " + data.Id);
    });

    $('#customerDatatable').on('click', '.DeletT', function () {

        if ($("#hfRmv").val() == "6") {
            var data = activityTable.row($(this).parents('tr')).data();
            DeleteCustomer(data);
        }

        else {
            swal({
                type: 'warning',
                title: 'Warning',
                text: "You do not have access to this operation",
                timer: 4000
            }).catch(swal.noop);
        }

     
        //alert("The ID is: " + data.Id);
    });
    
});



setInterval(function () {

    setTimeout(function () {
        $("#customerDatatable").DataTable().columns.adjust();
    }, 500);
}, 1000);


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

//document.getElementById("patientPage").classList.add("current");
$("#form1").trackChanges();
$("#form2").trackChanges();
$("#form3").trackChanges();
$("#form4").trackChanges();
$("#form5").trackChanges();
$("#form6").trackChanges();
$("#form7").trackChanges();
$("#form8").trackChanges();
$("#patientPage").addClass("current");

$("#btnSave1").click(function () {

    if ($("#form1").isChanged()) {


        $("#btnSave1").prop('disabled', true);


        var dd = {
            Id: parseInt($("#hfId").val()) || 0,
            Name: $("#txtName").val(),
            Family: $("#txtFamily").val(),
            NationalCode: $("#txtNationalCode").val(),
            DateOfBirth: $("#txtDateOfBirth").val(),
            Sex: $('input[name=sex]:checked').val(),
            Age: $("#txtAge").val(),
            Weight: $("#txtWeight").val(),
            BMI: $("#txtBMI").val(),
            Height: $("#txtHeight").val(),
            Rale: $("#cmbRale").val(),



        };
        console.log(dd);
        Crud_Sec1($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab24"]').tab('show');

    }

    //swal({
    //    type: 'success',
    //    title: 'congratulations',
    //    text: 'your changes have been saved successfully.',
    //    timer: 2000
    //}).catch(swal.noop);






    //$("#form1").data("changed", false);
    ////$("#form1").trackChanges();

    //$("#btnSave1").prop('disabled', false);
    /*alert($('input[name=sex]:checked', '#form1').val());*/
    //alert($('input[name=sex]:checked').val());
});


$("#btnNext1").click(function () {

    $('#mytabs a[href="#tab24"]').tab('show');
});

$("#btnNext2").click(function () {

    $('#mytabs a[href="#tab25"]').tab('show');
});

$("#btnNext3").click(function () {

    $('#mytabs a[href="#tab26"]').tab('show');
});

$("#btnNext4").click(function () {

    $('#mytabs a[href="#tab27"]').tab('show');
});

$("#btnNext5").click(function () {

    $('#mytabs a[href="#tab28"]').tab('show');
});

$("#btnNext6").click(function () {

    $('#mytabs a[href="#tab29"]').tab('show');
});

$("#btnNext7").click(function () {

    $('#mytabs a[href="#tab30"]').tab('show');
});

$("#btnNext8").click(function () {

    $("#hfId").val("");
    $('#recordDetail').hide();
    $('#ttlPage').text("Patients");
    $('#gridPatient').show();
    $('#customerDatatable').DataTable().ajax.reload();
});




$("#btnCancel2").click(function () {

    $('#mytabs a[href="#tab23"]').tab('show');
});

$("#btnCancel3").click(function () {

    $('#mytabs a[href="#tab24"]').tab('show');
});

$("#btnCancel4").click(function () {

    $('#mytabs a[href="#tab25"]').tab('show');
});

$("#btnCancel5").click(function () {

    $('#mytabs a[href="#tab26"]').tab('show');
});

$("#btnCancel6").click(function () {

    $('#mytabs a[href="#tab27"]').tab('show');
});

$("#btnCancel7").click(function () {

    $('#mytabs a[href="#tab28"]').tab('show');
});

$("#btnCancel8").click(function () {

    $('#mytabs a[href="#tab29"]').tab('show');
});



$("#btnSave4").click(function () {

    //$('#mytabs a[href="#tab25"]').tab('show');


    if ($("#form4").isChanged()) {


        $("#btnSave4").prop('disabled', true);


        var dd = {
            Id: parseInt($("#hfId").val()) || 0,

            //Icterus: $("#txt" + "Icterus").val(),
            //Edema: $("#txt" + "Edema").val(),
            //RaceWheeze: $("#txt" + "RaceWheeze").val(),
            //GCS: $("#txt" + "GCS").val(),
            //AbdominalSound: $("#txt" + "AbdominalSound").val(),
            //AbdominalFluid: $("#txt" + "AbdominalFluid").val(),
            //ExtremitiesEdema: $("#txt" + "ExtremitiesEdema").val(),
            //Hepatomegaly: $("#txt" + "Hepatomegaly").val(),
            //Splenomegaly: $("#txt" + "Splenomegaly").val(),

            Icterus: $('input[name=Icterus]:checked').val(),
            Edema: $('input[name=Edema]:checked').val(),
            RaceWheeze: $('input[name=RaceWheeze]:checked').val(),
            GCS: $('input[name=GCS]:checked').val(),
            AbdominalSound: $('input[name=AbdominalSound]:checked').val(),
            AbdominalFluid: $('input[name=AbdominalFluid]:checked').val(),
            ExtremitiesEdema: $('input[name=ExtremitiesEdema]:checked').val(),
            Hepatomegaly2: $('input[name=Hepatomegaly2]:checked').val(),
            Splenomegaly2: $('input[name=Splenomegaly2]:checked').val(),
          


        };
        Crud_Sec4($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab27"]').tab('show');

    }

});
$("#btnSave5").click(function () {

    //$('#mytabs a[href="#tab25"]').tab('show');


    if ($("#form5").isChanged()) {


        $("#btnSave5").prop('disabled', true);



        var dd = {
            Id: parseInt($("#hfId").val()) || 0,

          
            DM: $('input[name=DM]:checked').val(),
            ThyroidalDiseases: $('input[name=ThyroidalDiseases]:checked').val(),
            HTN: $('input[name=HTN]:checked').val(),
            Hepatitis: $('input[name=Hepatitis]:checked').val(),
            RespiratoryDisorders: $('input[name=RespiratoryDisorders]:checked').val(),
            ConjenitalDisorders: $('input[name=ConjenitalDisorders]:checked').val(),
            Smoking: $('input[name=Smoking]:checked').val(),
        

        };
        Crud_Sec5($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab28"]').tab('show');

    }

});

$("#btnSave6").click(function () {



    if ($("#form6").isChanged()) {


        $("#btnSave6").prop('disabled', true);


        var dd = {
            Id: parseInt($("#hfId").val()) || 0,

          

            DM2: $('input[name=DM2]:checked').val(),
            LiverCancer: $('input[name=LiverCancer]:checked').val(),
            HTN2: $('input[name=HTN2]:checked').val(),
            LiverDiseases: $('input[name=LiverDiseases]:checked').val(),
            ConjenitalDisorders2: $('input[name=ConjenitalDisorders2]:checked').val(),
          
        

        };
        Crud_Sec6($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab29"]').tab('show');

    }

});


$("#btnSave7").click(function () {



    if ($("#form7").isChanged()) {


        $("#btnSave7").prop('disabled', true);

        var dd = {
            Id: parseInt($("#hfId").val()) || 0,


            AntihypertensiveDrugs: $('input[name=AntihypertensiveDrugs]:checked').val(),
            Diuretics: $('input[name=Diuretics]:checked').val(),
            DiabetesMedication: $('input[name=DiabetesMedication]:checked').val(),
            EnergizingDrugs: $('input[name=EnergizingDrugs]:checked').val(),
            AntihepatitisDrugs: $('input[name=AntihepatitisDrugs]:checked').val(),
            HerbalMedicine: $('input[name=HerbalMedicine]:checked').val(),
            AnalgesicDrugs: $('input[name=AnalgesicDrugs]:checked').val(),
            AntipsychoticDrugs: $('input[name=AntipsychoticDrugs]:checked').val(),
            CardiacDrugs: $('input[name=CardiacDrugs]:checked').val()
          


        };
        Crud_Sec7($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab30"]').tab('show');
        //$('#mytabs a[href="#tab23"]').tab('show');
        //$("#hfId").val("");
        //$('#recordDetail').hide();
        //$('#ttlPage').text("Patients");
        //$('#gridPatient').show();
        //$('#customerDatatable').DataTable().ajax.reload();
    }

});

$("#btnSave8").click(function () {



    if ($("#form8").isChanged()) {


        $("#btnSave8").prop('disabled', true);

        var dd = {
            Id: parseInt($("#hfId").val()) || 0,


            FibroScan: $('input[name=FibroScan]:checked').val(),
            FattyLiver: $('input[name=FattyLiver]:checked').val(),
            LiverMass: $('input[name=LiverMass]:checked').val(),
            PortalHypertension: $('input[name=PortalHypertension]:checked').val(),
            Splenomegaly: $('input[name=Splenomegaly]:checked').val(),
            Hepatomegaly: $('input[name=Hepatomegaly]:checked').val(),
          



        };
        Crud_Sec8($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        //$('#mytabs a[href="#tab23"]').tab('show');
        $("#hfId").val("");
        $('#recordDetail').hide();
        $('#ttlPage').text("Patients");
        $('#gridPatient').show();
        $('#customerDatatable').DataTable().ajax.reload();
    }

});
//$("#btnSave7").click(function () {


//    $('#recordDetail').hide();
//    $('#ttlPage').text("Patients");
//    $('#gridPatient').show();
//    $('#customerDatatable').DataTable().ajax.reload();
//});



$("#btnSave3").click(function () {

    //$('#mytabs a[href="#tab25"]').tab('show');


    if ($("#form3").isChanged()) {


        $("#btnSave3").prop('disabled', true);


        var dd = {
            Id: parseInt($("#hfId").val()) || 0,
           
          
            AbdominalPain: $('input[name=AbdominalPain]:checked').val(),
            NauseaVomiitng: $('input[name=NauseaVomiitng]:checked').val(),
            Abdominal: $('input[name=Abdominal]:checked').val(),
            WeightLoss: $('input[name=WeightLoss]:checked').val(),
            Jundice: $('input[name=Jundice]:checked').val(),
            SkinLesions: $('input[name=SkinLesions]:checked').val(),
            Fever: $('input[name=Fever]:checked').val(),
            AbdominalProtrusion: $('input[name=AbdominalProtrusion]:checked').val(),
            LossofConsciousness: $('input[name=LossofConsciousness]:checked').val(),
          
        };
        console.log(dd);
        Crud_Sec3($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab26"]').tab('show');

    }

});

$("#btnSave2").click(function () {

    //$('#mytabs a[href="#tab25"]').tab('show');


    if ($("#form2").isChanged()) {


        $("#btnSave2").prop('disabled', true);


        var dd = {
            Id: parseInt($("#hfId").val()) || 0,
            DateOfExam: $("#txtDateOfExam").val(),
            Hemoglobin: $("#txtHemoglobin").val(),
            PTT: $("#txtPTT").val(),
            Hematocrit: $("#txtHematocrit").val(),
            PLR: $("#txtPLR").val(),
            INR: $("#txtINR").val(),
            WBC: $("#txtWBC").val(),
            BUN: $("#txtBUN").val(),
            FBS: $("#txt" +"FBS").val(),
            Cr: $("#txt" + "Cr").val(),
            Ca: $("#txt" + "Ca").val(),
            SerumTransferin: $("#txt" + "SerumTransferin").val(),
            GGT: $("#txt" + "GGT").val(),
            BilirubinTotal: $("#txt" + "BilirubinTotal").val(),
            ALT: $("#txt" + "ALT").val(),
            BilirubinDirect: $("#txt" + "BilirubinDirect").val(),
            AST: $("#txt" + "AST").val(),
            Albumin: $("#txt" + "Albumin").val(),
            ALP: $("#txt" + "ALP").val(),
            Cholesterol: $("#txt" + "Cholesterol").val(),
            Triglyceride: $("#txt" + "Triglyceride").val(),
            CRP: $("#txt" + "CRP").val(),
        





        };
        console.log(dd);
        Crud_Sec2($('input:hidden[name="__RequestVerificationToken"]').val(), dd);


    }

    else {
        $('#mytabs a[href="#tab25"]').tab('show');

    }

});

//$("#btnNewPatient").click(function () {

//    $('#gridPatient').hide();
//    $('#recordDetail').show();
//});
$("#btnCancel1").click(function () {


    $("#hfId").val("");
    $('#recordDetail').hide();
    $('#ttlPage').text("Patients");
    $('#gridPatient').show();
});


function DeleteCustomer(row) {


    var dd = {
        PatientId: row.Id
    };
    Data_delete($('input:hidden[name="__RequestVerificationToken"]').val(), dd,row);
}

function EditCustomer(row) {

   
    var dd = {
        PatientId: row.Id    
    };
    getData_Edit($('input:hidden[name="__RequestVerificationToken"]').val(),dd);
   
    //$("#hfId").val(row.Id);
    //$("#txtName").val(row.Name);
    //$("#txtFamily").val(row.Family);
    //$("#txtNationalCode").val(row.NationalCode);
    //$("#txtAge").val(row.Age);

    //$('#mytabs a[href="#tab23"]').tab('show');

    //$("#form1").data("changed", false);
    ////$("#form1").trackChanges();
    //$('#gridPatient').hide();
    //$('#ttlPage').text("Edit Patients");
    //$('#recordDetail').show();
}
function show_Picker() {
    document.getElementById('txtDateOfBirth').showPicker();
}

function show_Picker2() {
    document.getElementById('txtDateOfExam').showPicker();
}

//https://stackoverflow.com/questions/26441735/radio-box-get-the-checked-value-icheck

//$('input').on('ifChecked', function (event) {

//});




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

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab24"]').tab('show');

            $("#form1").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave1").prop('disabled', false);
            $('#customerDatatable').DataTable().ajax.reload();
            //alert(response.cat_name);
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

function Crud_Sec2(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec2",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab25"]').tab('show');

            $("#form2").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave2").prop('disabled', false);
            //alert(response.cat_name);
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
function Crud_Sec3(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec3",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab26"]').tab('show');

            $("#form3").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave3").prop('disabled', false);
            //alert(response.cat_name);
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
function Crud_Sec4(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec4",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab27"]').tab('show');

            $("#form4").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave4").prop('disabled', false);
            //alert(response.cat_name);
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
function Crud_Sec5(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec5",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab28"]').tab('show');

            $("#form5").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave5").prop('disabled', false);
            //alert(response.cat_name);
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
function Crud_Sec6(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec6",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab29"]').tab('show');

            $("#form6").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave6").prop('disabled', false);
            //alert(response.cat_name);
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
function Crud_Sec7(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec7",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

          

            $("#hfId").val(response.Id);
            $('#mytabs a[href="#tab30"]').tab('show');

            $("#form7").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave7").prop('disabled', false);


            //alert(response.cat_name);
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

function Crud_Sec8(mToken, mData) {

    $.ajax({
        type: "POST",
        async: true,
        url: "/index?handler=Crud_Sec8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                mToken);

        },
        data: mData,
        success: function (response) {

            $("#hfId").val("");
            //$('#mytabs a[href="#tab23"]').tab('show');

            $('#recordDetail').hide();
            $('#ttlPage').text("Patients");
            $('#gridPatient').show();
            $('#customerDatatable').DataTable().ajax.reload();


            $("#form8").data("changed", false);
            //$("#form1").trackChanges();

            $("#btnSave8").prop('disabled', false);




            //alert(response.cat_name);
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

            $('input:radio').iCheck('uncheck');       
            //$('form').find("input[type=text], textarea").val("");


            let mdata = response.patient;
            $("#hfId").val(mdata.Id);
            $("#txtName").val(mdata.Name);
            $("#txtFamily").val(mdata.Family);
            $("#txtNationalCode").val(mdata.NationalCode);
            $("#txtDateOfBirth").val(mdata.DateOfBirth);
            $("#txtAge").val(mdata.Age);
            $('input:radio[name="sex"]').filter('[value="' + mdata.Sex+'"]').iCheck('check');
            //$('input[name=sex]:checked').val(mdata.Sex);
            $("#txtWeight").val(mdata.Weight);
            $("#txtHeight").val(mdata.Height);
            $("#txtBMI").val(mdata.BMI);
            $("#cmbRale").val(mdata.Rale).change();
            $('#mytabs a[href="#tab23"]').tab('show');

            $("#form1").data("changed", false);
            //$("#form1").trackChanges();
            $('#gridPatient').hide();
            $('#ttlPage').text("Edit Patients");
            $('#recordDetail').show();

            $("#txt" + "DateOfExam").val(mdata.DateOfExam);
            $("#txt" + "Hemoglobin").val(mdata.Hemoglobin);    
            $("#txt" + "PTT").val(mdata.PTT);
            $("#txt" + "Hematocrit").val(mdata.Hematocrit);
            $("#txt" + "PLR").val(mdata.PLR);
            $("#txt" + "INR").val(mdata.INR);
            $("#txt" + "WBC").val(mdata.WBC);
            $("#txt" + "BUN").val(mdata.BUN);
            $("#txt" + "FBS").val(mdata.FBS);
            $("#txt" + "Cr").val(mdata.Cr);
            $("#txt" + "Ca").val(mdata.Ca);
            $("#txt" + "SerumTransferin").val(mdata.SerumTransferin);
            $("#txt" + "GGT").val(mdata.GGT);
            $("#txt" + "BilirubinTotal").val(mdata.BilirubinTotal);
            $("#txt" + "ALT").val(mdata.ALT);
            $("#txt" + "BilirubinDirect").val(mdata.BilirubinDirect);
            $("#txt" + "AST").val(mdata.AST);
            $("#txt" + "Albumin").val(mdata.Albumin);
            $("#txt" + "ALP").val(mdata.ALP);
            $("#txt" + "Cholesterol").val(mdata.Cholesterol);
            $("#txt" + "Triglyceride").val(mdata.Triglyceride);
            $("#txt" + "CRP").val(mdata.CRP);

            //$("#txt" + "AbdominalPain").val(mdata.AbdominalPain);
            //$("#txt" + "Abdominal").val(mdata.Abdominal);
            //$("#txt" + "NauseaVomiitng").val(mdata.NauseaVomiitng);
            //$("#txt" + "WeightLoss").val(mdata.WeightLoss);
            //$("#txt" + "Jundice").val(mdata.Jundice);
            //$("#txt" + "SkinLesions").val(mdata.SkinLesions);
            //$("#txt" + "Fever").val(mdata.Fever);
            //$("#txt" + "AbdominalProtrusion").val(mdata.AbdominalProtrusion);
            //$("#txt" + "LossofConsciousness").val(mdata.LossofConsciousness);

            $('input:radio[name="AbdominalPain"]').filter('[value="' + mdata.AbdominalPain + '"]').iCheck('check');
            $('input:radio[name="Abdominal"]').filter('[value="' + mdata.Abdominal + '"]').iCheck('check');
            $('input:radio[name="NauseaVomiitng"]').filter('[value="' + mdata.NauseaVomiitng + '"]').iCheck('check');
            $('input:radio[name="WeightLoss"]').filter('[value="' + mdata.WeightLoss + '"]').iCheck('check');
            $('input:radio[name="Jundice"]').filter('[value="' + mdata.Jundice + '"]').iCheck('check');
            $('input:radio[name="SkinLesions"]').filter('[value="' + mdata.SkinLesions + '"]').iCheck('check');
            $('input:radio[name="Fever"]').filter('[value="' + mdata.Fever + '"]').iCheck('check');
            $('input:radio[name="AbdominalProtrusion"]').filter('[value="' + mdata.AbdominalProtrusion + '"]').iCheck('check');
            $('input:radio[name="LossofConsciousness"]').filter('[value="' + mdata.LossofConsciousness + '"]').iCheck('check');

            //$("#txt" + "Icterus").val(mdata.Icterus);
            //$("#txt" + "Edema").val(mdata.Edema);
            //$("#txt" + "RaceWheeze").val(mdata.RaceWheeze);
            //$("#txt" + "GCS").val(mdata.GCS);
            //$("#txt" + "AbdominalSound").val(mdata.AbdominalSound);
            //$("#txt" + "AbdominalFluid").val(mdata.AbdominalFluid);
            //$("#txt" + "ExtremitiesEdema").val(mdata.ExtremitiesEdema);
            //$("#txt" + "Hepatomegaly").val(mdata.Hepatomegaly);
            //$("#txt" + "Splenomegaly").val(mdata.Splenomegaly);

            $('input:radio[name="Icterus"]').filter('[value="' + mdata.Icterus + '"]').iCheck('check');
            $('input:radio[name="Edema"]').filter('[value="' + mdata.Edema + '"]').iCheck('check');
            $('input:radio[name="RaceWheeze"]').filter('[value="' + mdata.RaceWheeze + '"]').iCheck('check');
            $('input:radio[name="GCS"]').filter('[value="' + mdata.GCS + '"]').iCheck('check');
            $('input:radio[name="AbdominalSound"]').filter('[value="' + mdata.AbdominalSound + '"]').iCheck('check');
            $('input:radio[name="AbdominalFluid"]').filter('[value="' + mdata.AbdominalFluid + '"]').iCheck('check');
            $('input:radio[name="ExtremitiesEdema"]').filter('[value="' + mdata.ExtremitiesEdema + '"]').iCheck('check');
            $('input:radio[name="Hepatomegaly2"]').filter('[value="' + mdata.Hepatomegaly2 + '"]').iCheck('check');
            $('input:radio[name="Splenomegaly2"]').filter('[value="' + mdata.Splenomegaly2 + '"]').iCheck('check');


            //$("#txt" + "DM").val(mdata.DM);
            //$("#txt" + "ThyroidalDiseases").val(mdata.ThyroidalDiseases);
            //$("#txt" + "HTN").val(mdata.HTN);
            //$("#txt" + "Hepatitis").val(mdata.Hepatitis);
            //$("#txt" + "RespiratoryDisorders").val(mdata.RespiratoryDisorders);
            //$("#txt" + "ConjenitalDisorders").val(mdata.ConjenitalDisorders);
            //$("#txt" + "Smoking").val(mdata.Smoking);

            $('input:radio[name="DM"]').filter('[value="' + mdata.DM + '"]').iCheck('check');
            $('input:radio[name="ThyroidalDiseases"]').filter('[value="' + mdata.ThyroidalDiseases + '"]').iCheck('check');
            $('input:radio[name="HTN"]').filter('[value="' + mdata.HTN + '"]').iCheck('check');
            $('input:radio[name="Hepatitis"]').filter('[value="' + mdata.Hepatitis + '"]').iCheck('check');
            $('input:radio[name="RespiratoryDisorders"]').filter('[value="' + mdata.RespiratoryDisorders + '"]').iCheck('check');
            $('input:radio[name="ConjenitalDisorders"]').filter('[value="' + mdata.ConjenitalDisorders + '"]').iCheck('check');
            $('input:radio[name="Smoking"]').filter('[value="' + mdata.Smoking + '"]').iCheck('check');


            //$("#txt" + "DM2").val(mdata.DM2);
            //$("#txt" + "LiverCancer").val(mdata.LiverCancer);
            //$("#txt" + "HTN2").val(mdata.HTN2);
            //$("#txt" + "LiverDiseases").val(mdata.LiverDiseases);
            //$("#txt" + "ConjenitalDisorders2").val(mdata.ConjenitalDisorders2);

            $('input:radio[name="DM2"]').filter('[value="' + mdata.DM2 + '"]').iCheck('check');
            $('input:radio[name="LiverCancer"]').filter('[value="' + mdata.LiverCancer + '"]').iCheck('check');
            $('input:radio[name="HTN2"]').filter('[value="' + mdata.HTN2 + '"]').iCheck('check');
            $('input:radio[name="LiverDiseases"]').filter('[value="' + mdata.LiverDiseases + '"]').iCheck('check');
            $('input:radio[name="ConjenitalDisorders2"]').filter('[value="' + mdata.ConjenitalDisorders2 + '"]').iCheck('check');


            $('input:radio[name="AntihypertensiveDrugs"]').filter('[value="' + mdata.AntihypertensiveDrugs + '"]').iCheck('check');
            $('input:radio[name="Diuretics"]').filter('[value="' + mdata.Diuretics + '"]').iCheck('check');
            $('input:radio[name="DiabetesMedication"]').filter('[value="' + mdata.DiabetesMedication + '"]').iCheck('check');
            $('input:radio[name="EnergizingDrugs"]').filter('[value="' + mdata.EnergizingDrugs + '"]').iCheck('check');
            $('input:radio[name="AntihepatitisDrugs"]').filter('[value="' + mdata.AntihepatitisDrugs + '"]').iCheck('check');
            $('input:radio[name="HerbalMedicine"]').filter('[value="' + mdata.HerbalMedicine + '"]').iCheck('check');
            $('input:radio[name="AnalgesicDrugs"]').filter('[value="' + mdata.AnalgesicDrugs + '"]').iCheck('check');
            $('input:radio[name="AntipsychoticDrugs"]').filter('[value="' + mdata.AntipsychoticDrugs + '"]').iCheck('check');
            $('input:radio[name="CardiacDrugs"]').filter('[value="' + mdata.CardiacDrugs + '"]').iCheck('check');

            $('input:radio[name="FibroScan"]').filter('[value="' + mdata.FibroScan + '"]').iCheck('check');
            $('input:radio[name="FattyLiver"]').filter('[value="' + mdata.FattyLiver + '"]').iCheck('check');
            $('input:radio[name="LiverMass"]').filter('[value="' + mdata.LiverMass + '"]').iCheck('check');
            $('input:radio[name="PortalHypertension"]').filter('[value="' + mdata.PortalHypertension + '"]').iCheck('check');
            $('input:radio[name="Splenomegaly"]').filter('[value="' + mdata.Splenomegaly + '"]').iCheck('check');
            $('input:radio[name="Hepatomegaly"]').filter('[value="' + mdata.Hepatomegaly + '"]').iCheck('check');




            //$("#hfId").val("");
            ////$('#mytabs a[href="#tab23"]').tab('show');

            //$('#recordDetail').hide();
            //$('#ttlPage').text("Patients");
            //$('#gridPatient').show();
            //$('#customerDatatable').DataTable().ajax.reload();


            //$("#form7").data("changed", false);
            ////$("#form1").trackChanges();

            //$("#btnSave7").prop('disabled', false);




            //alert(response.cat_name);
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
    let patName = row.Name + " " + row.Family;
    //alert(patName);
    swal({
        title: 'Are you sure?',
        text: "Patient '" + patName+ "' will be deleted...",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#777',
        confirmButtonText: 'Yes Delete.'
    }).then(function () {

        $.ajax({
            type: "POST",
            async: true,
            url: "/index?handler=DeletePatientData",
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

                $('#customerDatatable').DataTable().ajax.reload();
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
                'The selected Patient still exists.',
                'error'
            ).catch(swal.noop);;
        }
    }).catch(swal.noop);




    
}

function Calcage() { // birthday is a date
    var birthday = $("#txtDateOfBirth").val();

    //var Bdate = document.getElementById('txtDateOfBirth').value;
    var Bday = +new Date(birthday);
    var Q4A = ~~((Date.now() - Bday) / (31557600000));
    Q4A = Q4A < 0 || Q4A > 150 ? 0 : Q4A;
    $("#txtAge").val(Q4A);
}