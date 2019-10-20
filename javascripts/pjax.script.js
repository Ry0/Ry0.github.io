$(function() {

    function imgblur() {
        $(window).scroll(function() {
            var windowH = $(window).height(),
                scrollY = $(window).scrollTop();
            var windowW = $(window).width() * 1.05;
            // ブラウザの横幅が480以上だったら実行する
            if (windowW >= 480) {
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
    }

    function twitter_reload() {
        if (!window.twttr) {
            // console.log("twitterのリロードしてない");
            var twitterjs = document.createElement("script");
            twitterjs.async = true;
            twitterjs.src = '//platform.twitter.com/widgets.js';
            document.getElementsByTagName('body')[0].appendChild(twitterjs);
        } else {
            // console.log("twitterのリロードした");
            twttr.widgets.load();
        }
    }

    function ripple() {
        // console.info("波紋スタート");
        // まずrippleエフェクトのサイズを指定する(ripple要素のwidthから)
        var clickable_width = $('.ripple').width();
        $('.ripple-effect').css('width', clickable_width);
        $('.ripple-effect').css('height', clickable_width);

        var $clickable = $('.ripple');
        $clickable.on('mousedown', function(e) {
            var _self = this;
            var x = e.offsetX;
            var y = e.offsetY;

            var $effect = $(_self).find('.ripple-effect');
            var w = $effect.width();
            var h = $effect.height();

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
        // console.info("おわり");
    }

    function OpenNewTab() {
        $(document).ready(function() {
            $("a[href^='http']:not([href*='" + location.hostname + "'])").attr('target', '_blank');
        });
    }

    function GithubWidget() {
        jQuery(document).ready(function($) {
            $('.github-widget').each(function() {

                var $container = $(this),
                    $widget,
                    repo = $container.data('repo'),
                    vendorName = repo.split('/')[0],
                    repoName = repo.split('/')[1],
                    vendorUrl = "http://github.com/" + vendorName,
                    repoUrl = "http://github.com/" + vendorName + '/' + repoName;

                $widget = $(
                    '<div class="github-box repo">' + '<div class="github-box-title">' + '<h3>' + '<a class="owner" href="' + vendorUrl + '" title="' + vendorUrl + '">' + vendorName + '</a>' + '/' + '<a class="repo" href="' + repoUrl + '" title="' + repoUrl + '">' + repoName + '</a>' + '</h3>' + '<div class="github-stats">' + '<a class="watchers" href="' + repoUrl + '/watchers" title="See watchers">?</a>' + '<a class="forks" href="' + repoUrl + '/network/members" title="See forkers">?</a>' + '</div>' + '</div>' + '<div class="github-box-content">' + '<p class="description"><span></span> &mdash; <a href="' + repoUrl + '#readme">Read More</a></p>' + '<p class="link"></p>' + '</div>' + '<div class="github-box-download">' + '<div class="updated"></div>' + '<a class="download" href="' + repoUrl + '/zipball/master" title="Get an archive of this repository">Download as zip</a>' + '</div>' + '</div>'
                );

                $widget.appendTo($container);

                $.ajax({
                    url: 'https://api.github.com/repos/' + repo,
                    dataType: 'jsonp',
                    success: function(results) {
                        var repo = results.data,
                            date, pushed_at = 'unknown';

                        if (repo.pushed_at) {
                            date = new Date(repo.pushed_at);
                            pushed_at = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                        }

                        $widget.find('.watchers').text(repo.watchers);
                        $widget.find('.forks').text(repo.forks);
                        $widget.find('.description span').text(repo.description);
                        $widget.find('.updated').html('Latest commit to the <strong>' + repo.default_branch + '</strong> branch on ' + pushed_at);

                        // Don't show "null" if the repo has no homepage URL.
                        if (repo.homepage != null) $widget.find('.link').append($('<a />').attr('href', repo.homepage).text(repo.homepage));
                    }
                });

            });

        });

    }

    // pjax遷移用class付与
    function addPjaxClass() {
        selectorArr = [
            '.entry-title a',
            '.entry-image a',
            '.categories a',
            '.tags a',
            '.related-link a',
            '.pn-image-effect a',
            'li.post a',
            '.main-navigation a',
            '#blog-archives a'
        ];
        for (i = 0; i < selectorArr.length; i++) {
            $(selectorArr[i]).each(function() {
                $(this).addClass('pjax');
            });
        }
    }
    addPjaxClass();

    // pjax遷移開始
    var nextUrl = '';
    $(document).on('click', '.pjax', function(e) {
        e.preventDefault();
        // ページのトップに移動させて遷移開始
        $("html,body").animate({
            scrollTop: 0
        }, "500");
        // 遷移先のURLを取得
        nextUrl = $(this).attr('href');

        //まずは切り替える部分を透明に
        $('#content').animate({
            opacity: 0
        }, 500, function() {
            $.pjax({ //エフェクトが終わったらPjaxイベント
                url: nextUrl,
                container: '#content',
                fragment: '#content',
                timeout: 20000,
            });
        });
    });

    // pjax読み込み中
    $(document).on('pjax:send', function(e) {
        $('#main').prepend('\
    <div class="loader">\
      <svg class="circular">\
        <circle class="path" w cx="40" cy="40" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>\
      </svg>\
    <!-- /.loader --></div>\
    <div class="loader-space"></div>');
    });

    //Pjaxイベントが終わったときの動作
    $(document).on('pjax:end', function() {
        addPjaxClass();
        $('.circular').fadeOut(200);
        $('.loader').fadeOut(500);
        $('.loader-space').fadeOut(500);
        $('#content').stop().animate({
            opacity: 1
        }, 300);

        // Google Analytics
        var location = window.location.pathname + window.location.search;
        ga('send', 'pageview', location);

        // 再読み込み
        // 曇りガラス風
        imgblur();
        // 波紋エフェクト
        ripple();
        // Twitterのウィジェット
        twitter_reload();
        // サイドバー
        addSidebarToggler();
        // 新しいタブで開くやつ
        OpenNewTab();
        // Github
        GithubWidget();
    });

    // タイムアウト時
    $(document).on('pjax:timeout', function() {
        location.href = nextUrl;
        $('#content').animate({
            opacity: 1
        }, 300);
    });

});