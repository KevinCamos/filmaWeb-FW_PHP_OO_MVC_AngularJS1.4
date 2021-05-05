function listDropProvinces() {
    //////
    friendlyURL('?page=search&op=listProvinces').then(function(url) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON'
        }).done(function(data) {
            for (row in data) {
                $('#drop-province').append('<option value = "' + data[row].province + '">' + data[row].province + '</option>');
            }// end_for
        }).fail(function() {
        });// end_fail
    });
}// end_listDropBrands
//////

function listDropCon(data = undefined) {
    //////
    friendlyURL('?page=search&op=listCon').then(function(url) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON',
            data: data
        }).done(function(data) {
            $('#drop-con').empty();
            $('#drop-con').append('<option value = "0">Select the Concessionaire</option>');
            for (row in data) {
                $('#drop-con').append('<option value = "' + data[row].idCon + '">' + data[row].nameCon + '</option>');
            }// end_for
        }).fail(function() {
                console.log('F');
        });
    });
}// end_listDropCon
//////

function launchDropCon() {
    //////
    listDropCon();
    //////
    $('#drop-province').on('change', function(){
        let prov = $(this).val();
        if (prov == 0) {
            listDropCon();
        }else {
            listDropCon({province: prov});
        }// end_else
    });
}// end_launchDropCon
//////

function autoComplete() {
    //////
    $("#autocom").on('click keyup', function() {
        let sData = {complete: $(this).val()};
        if ($('#drop-con').val() != 0) {
            sData.dropCon = $('#drop-con').val();
        }// end_id
        if (($('#drop-province').val() != 0) && ($('#drop-con').val() == 0)) {
            sData.province = $('#drop-province').val();
        }// end_if
        //////
        friendlyURL('?page=search&op=autoComplete').then(function(url) {
            $.ajax({
                url: url,
                type: 'POST',
                data: sData,
                dataType: 'JSON'
            }).done(function(data) {
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(1000);
                for (row in data) {
                    $('<div></div>').appendTo('#searchAuto').html(data[row].brand).attr({'class': 'searchElement', 'id': data[row].brand});
                }// end_for
                //////
                $(document).on('click', '.searchElement', function() {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#searchAuto').fadeOut(500);
                });// end_click
                $(document).on('click scroll', function(event) {
                    if (event.target.id !== 'autocom') {
                        $('#searchAuto').fadeOut(500);
                    }// end_if
                });// end_click_scroll
                //////
            }).fail(function() {
                $('#searchAuto').fadeOut(500);
            });// end_fail
        });
    });
}// end_autoComplete
//////

function btnSearch() {
    //////
    $('#search-btn').on('click', function() {
        let objVar = {};
        let idCons = [];
        //////
        if (($('#drop-con').val() == 0) && (($('#drop-province').val() == 0))) {
            objVar = {'brand': [$('#autocom').val()]};
        }else if ($('#drop-province').val() != 0 && ($('#drop-con').val() == 0)) {
            friendlyURL('?page=search&op=listCon').then(function(url) {
                $.ajax({
                    url: url,
                    type: 'POST',
                    async: false,
                    dataType: 'JSON',
                    data: {province: $('#drop-province').val()}
                }).done(function(data) {
                    for (row in data) {
                        idCons.push(data[row].idCon);
                    }// ebd_for
                }).fail(function() {
                    console.log('F');
                });// end_ajax
                //////
                objVar = {'idCon': idCons, 'brand': [$('#autocom').val()]};
            });
        }else {
            objVar = {'idCon': [$('#drop-con').val()], 'brand': [$('#autocom').val()]};
        }// end_else
        //////
        localStorage.setItem('filters', JSON.stringify(objVar));
        //////
        friendlyURL('?page=shop&op=list').then(function(url) {
            window.location.href = url;
        });
    });// end_search-btn
}// end_btnSearch
//////

$(document).ready(function() {
    listDropProvinces();
    launchDropCon();
    autoComplete();
    btnSearch();
});// end_document.ready