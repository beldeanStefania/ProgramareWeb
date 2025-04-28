$(function(){
    // ——— CACHE DOM ———
    const $viewport     = $('.viewport');
    const $slidesUL     = $('.slides');
    const $upArrow      = $('.arrow-up');
    const $downArrow    = $('.arrow-down');
    const $visibleIn    = $('#visibleCount');
    const $intervalIn   = $('#intervalSec');
    const $playPauseBtn = $('#playPause');
    const $repeatChk    = $('#repeat');
    const $lightbox     = $('#lightbox');
    const $lbContent    = $lightbox.find('.lightbox__content');
    const $lbCaption    = $lightbox.find('.lightbox__caption');
    const $lbClose      = $lightbox.find('.lightbox__close');
    const $lbBackdrop   = $lightbox.find('.lightbox__backdrop');
  
    // ——— STĂRI ———
    let visible  = parseInt($visibleIn.val(), 10) || 1;
    let interval = parseInt($intervalIn.val(), 10) || 3;
    let timer    = null;
    let playing  = false;
  
    // ——— FUNCTII SLIDER ———
    function updateViewportHeight(){
      const $slides = $slidesUL.children();
      if (!$slides.length) return;
      const h = $slides.eq(0).outerHeight(true);
      $viewport.height(visible * h);
    }
  
    function slideUp(){
      const $slides = $slidesUL.children();
      const h = $slides.eq(0).outerHeight(true);
      $slidesUL.animate({ marginTop: -h }, 400, function(){
        $slidesUL.children().first().appendTo($slidesUL);
        $slidesUL.css('marginTop', 0);
      });
    }
  
    function slideDown(){
      const $slides = $slidesUL.children();
      const h = $slides.eq(0).outerHeight(true);
      $slidesUL
        .children().last().prependTo($slidesUL)
        .parent().css('marginTop', -h)
        .animate({ marginTop: 0 }, 400);
    }
  
    function startAuto(){
      stopAuto();
      timer = setInterval(function(){
        slideUp();
        if (! $repeatChk.prop('checked') &&
            $slidesUL.children().first().index() === 0) {
          stopAuto();
        }
      }, interval * 1000);
      playing = true;
      $playPauseBtn.text('Pauză');
    }
  
    function stopAuto(){
      clearInterval(timer);
      timer = null;
      playing = false;
      $playPauseBtn.text('Play');
    }
  
    // ——— LIGHTBOX HELPERS ———
    function openLightbox($media, captionHtml){
      $lbContent.empty().append($media);
      $lbCaption.empty().append(captionHtml||'');
      $lightbox.fadeIn(200);
    }
    function closeLightbox(){
      $lightbox.fadeOut(200, function(){
        $lbContent.empty();
        $lbCaption.empty();
      });
    }
  
    // ——— EVENIMENTE SLIDER ———
    $visibleIn.on('change', function(){
      visible = parseInt(this.value, 10) || 1;
      updateViewportHeight();
    });
    $intervalIn.on('change', function(){
      interval = parseInt(this.value, 10) || 3;
      if (playing) startAuto();
    });
    $upArrow.on('click',    () => { slideUp();   stopAuto(); });
    $downArrow.on('click',  () => { slideDown(); stopAuto(); });
    $playPauseBtn.on('click', () => playing ? stopAuto() : startAuto());
  
    // ——— CLICK PE MEDIA PENTRU LIGHTBOX ———
    $slidesUL.on('click', 'li img, li video', function(e){
      e.stopPropagation();
      const $li     = $(this).closest('li');
      const src     = $(this).attr('src');
      const isVideo = $(this).is('video');
      const caption = $li.find('.hidden-content').html() || '';
      let $media;
      if (isVideo) {
        $media = $('<video controls autoplay>').attr('src', src);
      } else {
        $media = $('<img>').attr('src', src);
      }
      openLightbox($media, caption);
    });
  
    // ——— EVENIMENTE LIGHTBOX ———
    $lbClose.on('click',   closeLightbox);
    $lbBackdrop.on('click', closeLightbox);
  
    // ——— INITIALIZARE ———
    updateViewportHeight();
  });
  