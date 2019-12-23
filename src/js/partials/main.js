$(document).ready(function () {
    $("input[name='phone']").mask(" +7 (999) 999-99-99");


    $('.photos-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.js-form-show').click(function () {
        $('.take-part').slideToggle({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });
    });
    $('.slider-facts').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: true,
    });

    $('#imgUpload').on('submit',function (e) {
        e.preventDefault();
        var formData = new FormData($('#imgUpload')[0]);
        $.ajax({
            url: '/save_photo/',
            type: "POST",
            data: formData,
            cache:false,
            processData: false,
            contentType: false,
            success: function(response) {
                afterSubmit();
                $('#imgUpload').trigger("reset");
                $('#select-photo').removeClass('select-photo--selected').find('span').html('Выбрать файл:');
            },
            error: function(response) {
                console.log(response);
            }
        });
    });

    $('.take-part input').on('change keyup paste focusout', function () {
       if (checkFormElements('.take-part')){
           $('.btn-send-form').removeAttr('disabled');
       } else {
           $('.btn-send-form').attr('disabled', 'disabled');
       }
    });


    $('.photos-slider-slide-bottom__rating').click(function () {
        if (!$(this).hasClass('.photos-slider-slide-bottom__rating--liked')){
            var id = $(this).closest('.photos-slider-slide').find('.photos-slider-slide__pic').data('id');
            $.ajax({
                type: "POST",
                url: "/add_like/",
                data: {"id": id},
                success: function(data) {
                    var parse = JSON.parse(data);
                    var result = parse.result;
                    var error = parse.error;
                    var count = parse.count;
                    if (result == 0){
                        $('.photos-slider').find('.photos-slider-slide__pic[data-id='+id+']').each(function () {
                            $(this).siblings('.photos-slider-slide-bottom').find('.photos-slider-slide-bottom__rating').addClass('photos-slider-slide-bottom__rating--liked').html(count);
                        });
                    } else {
                        console.log(error);
                    }
                }
            });
        }
    });


});
function setUpFileName(name){
    if (name){
        $('#select-photo').addClass('select-photo--selected').find('span').html(name.replace(/.+[\\\/]/, ""));
    } else {
        $('#select-photo').removeClass('select-photo--selected').find('span').html('Выбрать файл:');
    }
}

function afterSubmit() {
    $.fancybox.open({
        src: '#afterSubmitFancy',
        type: 'inline'
    });
}



function checkFormElem(elem) {
    var el = $(elem),
        error = checkForm(el),
        ok = true;

    if (error === 'empty') {
        var req_attr = el.attr('required');

        if (typeof req_attr === typeof undefined || req_attr === 'false') {
            error = '';
        }
    }

    switch (error) {
        case 'empty':
            ok = false;
            break;
        default:
            break;
    }

    return ok;
}

function checkForm(elem) {
    var name = $(elem).attr('name'),
        value = $(elem).val(),
        result = false;
    result = false;
    re = '';
    if (value !== '') {
        switch (name) {
            case 'email':
                re = /\S+@\S+\.\S+/;
                result = re.test(value);
                result = result ? result : 'format';
                break;
            case 'phone':
                re = /^[0-9-+]{6,18}$/;
                result = re.test(value);
                result = result ? result : 'format';
                break;
            default:
                re = /\S{1,}$/;
                result = re.test(value);
        }
    }
    else {
        return 'empty';
    }

    return result;
}

function checkFormElements(form) {
    var ok = true;

    $(form).find('input[required]').each(function () {
        if (!checkFormElem(this)) {
            ok = false;
        }
    });

    return ok;
}