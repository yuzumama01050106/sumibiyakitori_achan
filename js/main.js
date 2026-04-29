$(function () {

  // =========================
  // 初期取得
  // =========================
  const targets = $('.fade-up');
  const toTop = $('.to-top');
  const about = $('#about-us');
  const chicken = $('.to-top-btn');
  // =========================
  // スクロール処理
  // =========================
  $(window).on('scroll', function () {
    const scrollY = $(window).scrollTop();

    // フェードアップ
    targets.each(function () {
      const rect = $(this).offset().top;
      const trigger = $(window).height() * 0.8;

      if (scrollY > rect - trigger) {
        $(this).addClass('show');
      }
    });

    // ニワトリ表示
    const aboutTop = about.offset().top;

    if (scrollY > aboutTop - 200) {
      toTop.addClass('show');
    } else {
      toTop.removeClass('show');
    }

    // 首振り
    const angle = Math.sin(scrollY * 0.01) * 15 
                + Math.cos(scrollY * 0.005) * 5;

    chicken.css('transform', `rotate(${angle}deg)`);
  });

  $(window).trigger('scroll');

  // =========================
  // 🐔 トップに戻るボタン
  // =========================
  $('.to-top-btn').on('click', function (e) {
    e.preventDefault();

    chicken.addClass('flap');

    $('html, body').animate({
      scrollTop: 0
    }, 1000);

    toTop.addClass('active');

    setTimeout(() => {
      chicken.removeClass('flap');
      toTop.removeClass('active');
    }, 1500);
  });

  // =========================
  // ロゴクリックでTOPへ
  // =========================
  $('.header-logo-group').on('click', function(e) {
    e.preventDefault();

    $('.main-logo1').addClass('flap');

    $('html, body').animate({
      scrollTop: 0
    }, 800, function() {
      $('header').removeClass('open');
    });

    setTimeout(() => {
      $('.main-logo1').removeClass('flap');
    }, 600);
  });

  // =========================
  // 🍔 ハンバーガーメニュー
  // =========================
  const btn = $('#menubtn');
  const header = $('header');

  btn.on('click', function (e) {
    e.stopPropagation();
    header.toggleClass('open');
  });

  $('.menu-nav').on('click', function (e) {
    e.stopPropagation();
  });

  header.on('click', function () {
    header.removeClass('open');
  });

  // =========================
  // 🍢 メニュークリック
  // =========================
  $('.menu-nav a').on('click', function (e) {
    e.preventDefault();

    const targetId = $(this).attr('href');
    const target = $(targetId);

    if (target.length) {
      const position = target.offset().top;

      const current = $(window).scrollTop();
      const distance = Math.abs(position - current);

      let duration = distance * 0.5;
      duration = Math.max(400, Math.min(duration, 1200));

      $('html, body').animate(
        { scrollTop: position },
        {
          duration: duration,
          easing: 'easeInOutCubic',
          complete: function () {
            header.removeClass('open');
          }
        }
      );
    }
  });

  // =========================
  // 🖥️ 画面リサイズ対応
  // =========================
  $(window).on('resize', function () {
    const width = $(window).width();

    if (width > 768) {
      header.removeClass('open');        // メニュー閉じる
      toTop.removeClass('show active');  // ニワトリもリセット
    }
  });
});