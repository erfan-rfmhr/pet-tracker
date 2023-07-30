function delete_petowner_btn(petowner_id, petowner_username) {
    if (confirm('Are you sure you want to delete "' + petowner_username + '"?')) {
        $.ajax({
            url: '/api/petowner/' + petowner_id + '/delete',
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: function (result) {
                location.reload();
            }
        });
    }
}

function delete_pet_btn(pet_id, pet_name) {
    if (confirm('Are you sure you want to delete "' + pet_name + '"?')) {
        $.ajax({
            url: '/api/pets/' + pet_id + '/delete',
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: function (result) {
                location.reload();
            }
        });
    }
}

// Function to get a cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
