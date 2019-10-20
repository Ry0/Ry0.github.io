$(window).scroll(function() {
  var windowH = $(window).height(),
    scrollY = $(window).scrollTop();
  var windowW = $(window).width()*1.05;
  // ブラウザの横幅が480以上だったら実行する
  if (windowW >= 480){
    $(".entry-image-blur").each(function() {
      var imgPosition = $(this).offset().top;
      var threshold = imgPosition + 50;

      if (threshold < scrollY && scrollY < threshold + 300) {
        // すりガラスのエフェクトかける(CSSクラス追加)
        $(this).addClass("img-blur");
        // ヘッダー画像の吹き出しのアイコン変える
        // 前景画像の透過度を0に
        $(".comment-icon").css("opacity", "0");
      } else if (0 <= scrollY && scrollY <= threshold) {
        // ifのブロックと逆のことをする
        $(this).removeClass("img-blur");
        $(".comment-icon").css("opacity", "1");
      }
    });
  }
});