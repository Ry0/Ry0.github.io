$(function() {
    // まずrippleエフェクトのサイズを指定する(ripple要素のwidthから)
    var clickable_width = $('.ripple').width();
    $('.ripple-effect').css('width', clickable_width);
    $('.ripple-effect').css('height', clickable_width);

    var $clickable = $('.ripple');
    $clickable.on('mousedown', function(e) {
        var _self   = this;
        var x       = e.offsetX;
        var y       = e.offsetY;

        var $effect = $(_self).find('.ripple-effect');
        var w       = $effect.width();
        var h       = $effect.height();

        $effect.css({
            left: x - w / 2,
            top: y - h / 2
        });

        if (!$effect.hasClass('is-show')) {
            $effect.addClass('is-show');
            setTimeout(function() {
                $effect.removeClass('is-show');
            }, 750);
        }
        return false;
    });
});