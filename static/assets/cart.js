const FilledBtnCart = ({
    sum
}) => `
<img src="static/assets/cart-icon-28356(w).png">
<div style="display:inline-flex;overflow: visible;position: relative;/*margin-left: auto;*/">
	<span class="product_price intt" style="color: #fff;font-size: 20px;">${sum}</span>
	<span class="product_price intt" style="color: #fff;font-size: 20px;margin-left: 5px;"></span>
	<span class="product_price intt" style="color: #fff;font-size: 20px;margin-left: 5px;">&ndash;</span>
	<span class="product_price intt" style="color: #fff;font-size: 20px;margin-left: 5px;"></span>
	<span class="product_price intt" style="color: #fff;font-size: 20px;margin-left: 5px;">ORDER NOW</span>
</div>
`;
class Cart {
    constructor() {
        if (localStorage.getItem('cart') === null) {
            this.items = {};
        } else {
            this.items = $.parseJSON(localStorage.getItem('cart'));
        }
    }
    setPIDs() {
        $('.product').each(function(e) {
            $(this).attr('pid', e);

        });
        return true;

    }
    pushToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        obj = this.items;
        let sum = 0;
        let flag = false;
        for (let key in obj) {
            sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
        }
        sum = sum.toFixed(2);
        if (sum > 0) {
            $(".btn-cart[doit='oc']").show();
            $(".btn-cart[doit='oc']").html(
                [{
                    sum: sum
                }, ].map(FilledBtnCart).join('')
            );
            $(".btn-cart[doit='oc']").addClass('filled');
        } else {
            $(".btn-cart[doit='oc']").hide();
            $(".modal").removeClass('is-active');
        }
        return true;

    }
    getItem(pid) {
        if (localStorage.getItem('cart') === null) {
            return null;
        } else {
            return $.parseJSON(localStorage.getItem('cart'))[pid];
        }
    }
    addItem(pid, name, price, pic, count = 1) {
        console.log(this.getItem(pid));
        if (!this.getItem(pid)) {
            this.items[pid] = {
                'name': name,
                'count': count,
                'price': price,
                'pic': pic,
                'count': count
            }
        } else {
            console.log(this);
            console.log(pid);
            this.items[pid]['count'] = this.items[pid]['count'] + count;
        }
        this.pushToLocalStorage();
        return true;
    }
}

const Item = ({
    pid,
    name,
    price,
    pic,
    count
}) => `
<div class="cart-item" pid="${pid}">
  					<div class="cart-item_wrap_img">
  						<img src="${pic}">
  					</div>
  					<span class="cart-item_name">${name}</span>
  					<div style="display:inline-flex;overflow: visible;position: relative;margin-left: auto; margin-right: 22px;"><span class="product_price inc">${price}</span><span class="product_pricer"> </span></div>
  					<div class="counter">
  						<i class="fas fa-minus counter-minus counter-delete"></i>
  						<span class="counter_count">${count}</span>
  						<i class="fas fa-plus counter-plus"></i>
  					</div>
  				</div>
`;

const ItemM = ({
    pid,
    name,
    price,
    pic,
    count
}) => `
<div class="cart-item" pid="${pid}">
  					<div class="cart-item_wrap_img">
  						<img src="${pic}">
  					</div>
  					<span class="cart-item_name">${name}</span>
  					<div style="display:inline-flex;overflow: visible;position: relative;margin-left: auto; margin-right: 22px;"><span class="product_price inc">${price}</span><span class="product_pricer"> </span></div>
  					<div class="counter">
  						<i class="fas fa-minus counter-minus"></i>
  						<span class="counter_count">${count}</span>
  						<i class="fas fa-plus counter-plus"></i>
  					</div>
  				</div>
`;

$(document).ready(function() {
    $(".btn-cart[doit='oc']").hide();
    var CCart = new Cart();
    CCart.setPIDs();
    obj = CCart.items;
    CCart.pushToLocalStorage();
    sum = 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key]['count'] == 1) {
                $('.cart-items').append([{
                    pid: key,
                    name: obj[key]['name'],
                    price: obj[key]['price'],
                    pic: obj[key]['pic'],
                    count: obj[key]['count']
                }, ].map(Item).join(''));
            } else {
                $('.cart-items').append([{
                    pid: key,
                    name: obj[key]['name'],
                    price: obj[key]['price'],
                    pic: obj[key]['pic'],
                    count: obj[key]['count']
                }, ].map(ItemM).join(''));
            }
        }
        sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
    }
    $(".cart-sum").find(".product_price").text(sum.toFixed(2));
    $('.product').click(function() {
        CCart.addItem($(this).attr('pid'), $(this).find('.product_name').text(), $(this).find('.product_price').text(), $(this).find('.product_img').attr('src'));
        if ($(".cart-item[pid='" + $(this).attr('pid') + "']").length == 0) {
            console.log('new cart pos');
            $('.cart-items').append([{
                pid: $(this).attr('pid'),
                name: $(this).find('.product_name').text(),
                price: $(this).find('.product_price').text(),
                pic: $(this).find('.product_img').attr('src'),
                count: 1
            }, ].map(Item).join(''));
        } else {
            $(".cart-item[pid='" + $(this).attr('pid') + "']").find('.counter_count').text(CCart.getItem(
                $(this).attr('pid'))['count']);
            $(".cart-item[pid='" + $(this).attr('pid') + "']").find('.counter-minus').removeClass('counter-delete');
        }
        obj = CCart.items;
        sum = 0;
        for (let key in obj) {
            sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
        }
        $(".cart-sum").find(".product_price").text(sum.toFixed(2));
    });
    $(document).on('click', ".counter-plus", function() {
        $(this).closest('.cart-item').find(".counter-minus").removeClass('counter-delete');
        CCart.addItem(
            $(this).closest('.cart-item').attr('pid'),
            $(this).closest('.сart-item_name').text(),
            $(this).closest('.product_price').text(),
            $(this).closest('img').attr('src'),
        );
        $(".cart-item[pid='" + $(this).closest('.cart-item').attr('pid') + "']").find('.counter_count').text(CCart.getItem($(this).closest('.cart-item').attr('pid'))['count']);
        obj = CCart.items;
        sum = 0;
        for (let key in obj) {
            sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
        }
        $(".cart-sum").find(".product_price").text(sum.toFixed(2));
    });
    $('.delete_cart').click(function() {
        CCart.items = {};
        CCart.pushToLocalStorage();
        $('.cart-item').hide(500, function() {
            $(this).remove();
        });
        obj = CCart.items;
        sum = 0;
        for (let key in obj) {
            sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
        }
        $(".cart-sum").find(".product_price").text(sum.toFixed(2));
    });
    $(document).on('click', ".counter-minus", function() {
        if (!$(this).hasClass('counter-delete')) {
            if (CCart.getItem($(this).closest('.cart-item').attr('pid'))['count'] == 2) {
                $(this).addClass('counter-delete');
            }
            CCart.addItem(
                $(this).closest('.cart-item').attr('pid'),
                $(this).closest('.сart-item_name').text(),
                $(this).closest('.product_price').text(),
                $(this).closest('img').attr('src'), -1
            );
            $(".cart-item[pid='" + $(this).closest('.cart-item').attr('pid') + "']").find('.counter_count').text(CCart.getItem(
                $(this).closest('.cart-item').attr('pid'))['count']);
            obj = CCart.items;
            sum = 0;
            for (let key in obj) {
                sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
            }
            $(".cart-sum").find(".product_price").text(sum.toFixed(2));
        } else {
            $(this).closest('.cart-item').hide("slide", {
                direction: "up"
            }, 500, function() {
                $(this).remove();
            });
            delete CCart.items[$(this).closest('.cart-item').attr('pid')];
            CCart.pushToLocalStorage();
            obj = CCart.items;
            sum = 0;
            for (let key in obj) {
                sum += parseFloat(obj[key]['price']) * parseInt(obj[key]['count']);
            }
            $(".cart-sum").find(".product_price").text(sum.toFixed(2));
        }
    });
});