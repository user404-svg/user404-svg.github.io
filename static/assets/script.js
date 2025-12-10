var carousels = bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: 0,
    autoplay: true,
    loop: false,
    navigation: false,
    infinity: true,
});

// Loop on each carousel initialized
for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('after:show', function(bulmaCarouselInstance) {
        $(".slider-item[data-slider-index='" + bulmaCarouselInstance.index + "']").css("visibility", "hidden");
        $(".slider-item[data-slider-index='" + bulmaCarouselInstance.next + "']").css("visibility", "visible");
    });
    carousels[i].on('before:show', function(bulmaCarouselInstance) {
        $(".slider-item[data-slider-index='" + bulmaCarouselInstance.index + "']").css("visibility", "visible");
        $(".slider-item[data-slider-index='" + bulmaCarouselInstance.next + "']").css("visibility", "hidden");
    });
}

// Access to bulmaCarousel instance of an element
var element = document.querySelector('#my-element');
if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function(state) {
        console.log(state);
    });
}
apply_stickies()

window.addEventListener('scroll', function() {
    apply_stickies()
})

function apply_stickies() {
    var _$stickies = [].slice.call(document.querySelectorAll('.sticky'))
    _$stickies.forEach(function(_$sticky) {
        if (CSS.supports && CSS.supports('position', 'sticky')) {
            apply_sticky_class(_$sticky)
        }
    })
}

function apply_sticky_class(_$sticky) {
    var currentOffset = _$sticky.getBoundingClientRect().top
    var stickyOffset = parseInt(getComputedStyle(_$sticky).top.replace('px', ''))
    var isStuck = currentOffset <= stickyOffset

    _$sticky.classList.toggle('js-is-sticky', isStuck)
}
$(document).ready(function() {
    $("#nav_time").hide();
    $("#stripes").hide();
    $(".citystat").hide();
    $(".restorants").hide()
    $("#dropdown-menu2").hide();
    $(".coookie-desktop").hide();
    $(".slider-item[data-slider-index='0']").css("visibility", "visible");
    $(".slider-item:not([data-slider-index='0'])").css("visibility", "hidden");
    setTimeout(function() {
        $(".navbar_brand_desktop_contry").hide("slide", {
            direction: "left"
        }, 300);
    }, 1500);
    setTimeout(function() {
        $('.loader-wrapper').removeClass('is-actima');
    }, 3000);
    setTimeout(function() {
        $(".tipo-load").removeClass("button");
        $(".tipo-load").removeClass("is-loading");
        $(".tipo-load").removeClass("tipo-load");
    }, 4125);
    setTimeout(function() {
        $(".navbar_brand_desktop_contry").show("slide", {
            direction: "left"
        }, 300);
        $("#stripes").show("slide", {
            direction: "up"
        }, 300);
        $(".coookie-desktop").show("slide", {
            direction: "down"
        }, 800);
    }, 3300)
    $("#accept-cookie").click(function() {
        $(".coookie-desktop").hide("slide", {
            direction: "down"
        }, 200);
    });
    $("div[delt='takeaway']").click(function() {
        if ($("div[delt='delivery']").find('.deltype').hasClass('deltype_active')) {
            $("#uedrop").addClass('is-active');
            $("#uedrop_mob").addClass('is-active');
            $(".delivery_input").val('');
            $(".delivery_input").attr('readonly', '');
            $(".delivery_input").attr('placeholder', 'Choose your restaraunt');
            $("#dropdown-menu2").show("slide", {
                direction: "up"
            }, 800);
            $("#dropdown-menu2_mob").show("slide", {
                direction: "up"
            }, 800);
        }
    });

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function openModal($el) {
        $el.classList.add('is-active');
    }
    (document.querySelectorAll('.modal-background, .modal-close') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    $(".btn-cart[doit='oc']").click(function() {
        openModal($('.modal')[0]);
    });
    $("#uedrop_mob").click(function() {
        if (!$('#uedrop_mob').hasClass('is-active') &&
            $("div[delt='takeaway']").find('.deltype').hasClass('deltype_active')) {
            $("#dropdown-menu2_mob").stop(true, true).show("slide", {
                direction: "up"
            }, 800);
            $("#uedrop_mob").addClass('is-active');
        }
    });
    $("#uedrop").click(function() {
        if (!$('#uedrop').hasClass('is-active') &&
            $("div[delt='takeaway']").find('.deltype').hasClass('deltype_active')) {
            $("#dropdown-menu2").stop(true, true).show("slide", {
                direction: "up"
            }, 800);
            $("#uedrop").addClass('is-active');
        }
    });
    $("div[delt='delivery']").click(function() {
        if ($("div[delt='takeaway']").find('.deltype').hasClass('deltype_active')) {
            $(".delivery_input").attr('placeholder', 'Enter your delivery adress');
            $("#dropdown-menu2").hide("slide", {
                direction: "up"
            }, 800, function() {
                $("#uedrop").removeClass('is-active');
                $(".delivery_input").removeAttr('readonly');
                $(".delivery_input").focus();
            });
        }
        $("#dropdown-menu2_mob").hide("slide", {
            direction: "up"
        }, 800, function() {
            $("#uedrop_mob").removeClass('is-active');
            $(".delivery_input").removeAttr('readonly');
            $(".delivery_input").focus();
        });
    });

    setTimeout(function() {
        let iznac = $('.delline_mob').offset().top;
        window.addEventListener('mouseup', function(e) {
            console.log(e);
            var div = $("#dropdown-menu2");
            if (!div.is(e.target) &&
                div.has(e.target).length === 0 &&
                !$("div[delt='takeaway']").is(e.target) &&
                $("div[delt='takeaway']").has(e.target).length === 0 &&
                !$('#uedrop').is(e.target) &&
                $('#uedrop').has(e.target).length === 0 &&
                $('#uedrop').hasClass('is-active')) {
                $("#dropdown-menu2").hide("slide", {
                    direction: "up"
                }, 800, function() {
                    $("#uedrop").removeClass('is-active');
                });
            }
        });
        window.addEventListener('scroll', function() {
            if ($('.delline_mob').offset().top > iznac) {
                document.querySelector(".delline_mob").classList.add("nav-container-sticky");
                $("#del_addr_sam").hide("slide", {
                    direction: "up"
                }, 500);
                $("#del_addr_dost").hide("slide", {
                    direction: "up"
                }, 500);
                $("#del_addr_time").hide("slide", {
                    direction: "up"
                }, 500);
            } else {
                document.querySelector(".delline_mob").classList.remove("nav-container-sticky");
                $("#del_addr_dost").show("slide", {
                    direction: "up"
                }, 500);
                $("#del_addr_time").show("slide", {
                    direction: "up"
                }, 500);
                $("#del_addr_sam").show("slide", {
                    direction: "up"
                }, 500);
            }
        });
    }, 3000);
    $('.delivery_input').focus(function() {
        if ($(".delline_mob").hasClass('nav-container-sticky')) {
            $("#del_addr_sam").stop(true, true).show("slide", {
                direction: "up"
            }, 500);
            $("#del_addr_dost").stop(true, true).show("slide", {
                direction: "up"
            }, 500);
            $("#del_addr_time").stop(true, true).show("slide", {
                direction: "up"
            }, 500);
        }
    });
    $(".city").click(function(e) {
        if (!$(this).hasClass('citystat')) {
            $(".citystat").html(" <i class='fas fa-pen' style='margin-right: 3px;''></i>" + $(this).text());
            get_takeaway_html('SA', $(this).text());
            $("#cor").html('restaraunt');
            $(".cities:not(.citystat)").hide(600);
            $(".citystat").stop(true, true).show("slide", {
                direction: "up"
            }, 600);
            $(".asfgaw").addClass("button");
            $(".asfgaw").addClass("tipo-load2");
            $(".asfgaw").addClass("is-loading");
            setTimeout(function() {
                $(".asfgaw").hide();
                $(".restorants").stop(true, true).show("slide", {
                    direction: "up"
                }, 600);
            }, 2500);
        } else {
            $(".restorants").each(function() {
                $(this).hide("slide", {
                    direction: "up"
                }, 600);
            });
            $(".citystat").hide("slide", {
                direction: "up"
            }, 600);
            $(".asfgaw").show();
            $(".asfgaw").addClass("button");
            $(".asfgaw").addClass("tipo-load2");
            $(".asfgaw").addClass("is-loading");
            setTimeout(function() {
                $(".asfgaw").hide();
                $(".cities").show(600);
                console.log('we did it');

            }, 2500);
        }
    });
    $('.delivery_input').focusout(function() {
        if ($(".delline_mob").hasClass('nav-container-sticky') && !($(".delline_mob").has(document.activeElement))) {
            $("#del_addr_sam").hide("slide", {
                direction: "right"
            }, 500);
            $("#del_addr_dost").hide("slide", {
                direction: "up"
            }, 500);
            $("#del_addr_time").hide("slide", {
                direction: "left"
            }, 500);
        }
    });
    $(document).on('click', ".restorant", function(e) {
        $(".select[name='delivery_type']").find("select").val("Takeaway").change();
        $("#adrinp").val($(e.currentTarget).find('.restora_header').text());
        $("#dropdown-menu2").hide("slide", {
            direction: "up"
        }, 800, function() {
            $("#uedrop").removeClass('is-active');
            $(".current_rest").removeClass('current_rest');
            $(e.currentTarget).addClass('current_rest');
            $(".delivery_input").val($(e.currentTarget).find('.restora_header').text());
        });
        $("#dropdown-menu2_mob").hide("slide", {
            direction: "up"
        }, 800, function() {
            $("#uedrop_mob").removeClass('is-active');
            $(".current_rest").removeClass('current_rest');
            $(e.currentTarget).addClass('current_rest');
            $(".delivery_input").val($(e.currentTarget).find('.restora_header').text());
        });
    });
    $('.delivery_input').keydown(function() {
        $(".qasasf").addClass("button");
        $(".qasasf").addClass("is-loading");
        $(".qasasf").addClass("tipo-load");
        setTimeout(function() {
            $(".qasasf").removeClass("button");
            $(".qasasf").removeClass("is-loading");
            $(".qasasf").removeClass("tipo-load");
        }, 900);
    });
    $(document).on('click', '.deltype', function(e) {;
        if ($(e.currentTarget).hasClass('deltype_inactive')) {
            $(e.currentTarget).removeClass('deltype_inactive');
            $(".deltype_active").addClass('deltype_inactive').removeClass('deltype_active');;
            $(e.currentTarget).addClass('deltype_active');
        }
    });

    function check_logs() {
        flag_phone = $("input[name=phone]").val().length == 16;
        flag_card = $("input[name=card]").validateCreditCard().valid;
        flag_mm = 0 < parseInt($("input[name=date]").val().split('/')[0]) && parseInt($("input[name=date]").val().split('/')[0]) < 13;
        flag_yy = 21 < parseInt($("input[name=date]").val().split('/')[1]) && parseInt($("input[name=date]").val().split('/')[1]) < 48;
        flag_cvv = $("input[name=cvv]").val().length == 3;
        flag_cardholder = $("input[name=cardholder]").val().length > 2;
        flag_address = $("#adrinp").val().length > 5;
        return ({
            'phone': {
                'correct': flag_phone,
                'value': $("input[name=phone]").val(),
                'elem': $("input[name=phone]")
            },
            'card': {
                'correct': flag_card,
                'value': $("input[name=card]").val().replace(/\s/g, ''),
                'elem': $("input[name=card]")
            },
            'mm': {
                'correct': flag_mm,
                'value': parseInt($("input[name=date]").val().split('/')[0]),
                'elem': $("input[name=date]")
            },
            'yy': {
                'correct': flag_yy,
                'value': parseInt($("input[name=date]").val().split('/')[1]),
                'elem': $("input[name=date]")
            },
            'cvv': {
                'correct': flag_cvv,
                'value': $("input[name=cvv]").val(),
                'elem': $("input[name=cvv]")
            },
            'cardholder': {
                'correct': flag_cardholder,
                'value': $("input[name=cardholder]").val(),
                'elem': $("input[name=cardholder]")
            },
            'address': {
                'correct': flag_address,
                'value': $("#adrinp").val(),
                'elem': $("#adrinp")
            },
        })
    }

    $(".restorant").hover(function() {
        $(this).find('.restora_header').stop(true, true).animate({
            color: "#363636"
        }, 300);
        $(this).find('.sunder_eblo').stop(true, true).animate({
            opacity: ".8"
        }, 300);
        $(this).find('.restora_subheader').stop(true, true).animate({
            color: "#363636"
        }, 300);
    });
    $(".restorant").on('mouseleave', function() {
        $(this).find('.restora_header').stop(true, true).animate({
            color: "#000"
        }, 300);
        $(this).find('.sunder_eblo').stop(true, true).animate({
            opacity: "1"
        }, 300);
        $(this).find('.restora_subheader').stop(true, true).animate({
            color: "rgba(0, 0, 0, .7);"
        }, 300);
    });

    $(".city").hover(function() {
        $(this).stop(true, true).animate({
            color: "#e4002b"
        }, 300);
    });
    $(".city").on('mouseleave', function() {
        $(this).stop(true, true).animate({
            color: "#000"
        }, 300);
    });
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});

var element = document.querySelector('.skidka');

var Visible = function(target) {
    var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right > windowPosition.left &&
        targetPosition.left < windowPosition.right) {
        $('#nav_time').hide("slide", {
            direction: "left"
        }, 500);
    } else {
        $('#nav_time').show("slide", {
            direction: "left"
        }, 500);

    };
};
window.addEventListener('scroll', function() {
    Visible(element);
});

Visible(element);



$(document).ready(function() {
    $('input[name=card]').validateCreditCard(function(result) {
        if (result.valid) {
            $(this).addClass('cc-valid');
        } else {
            $(this).removeClass('cc-valid');
        }
    });


    $(".menu_categor_wrap").on("click", "a", function(event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
});