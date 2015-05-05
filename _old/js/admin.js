jQuery(function($) {
  var slides = $('.ap-slides'),

  accordionPro = {
    addSlide : function() {
      var spinner = $('.ap-slides .ap-wait'),
          clicked = false;

      spinner.ajaxStart(function() {
        spinner.css('display', 'inline-block');
      });

      slides.on('click', '#ap-add', function() {
        var len = parseInt($('.ap-slide-num').last().val(), 10);

        if (!clicked) {
          // prevents double req before prev completed
          clicked = true;

          // get slide tmpl via ajax
          $.post(
            ajaxurl, {
              action : 'admin_slide_tmpl',
              data : {
                slideNum : len
              }
            }, function(res) {
              var args, i = 1, j;

              // insert html
              $('#ap-add').before(res);

              // configure tinymce
              for (j in tinyMCEPreInit.mceInit) {
                if (i) args = tinyMCEPreInit.mceInit[j];
                i--;
              }

              args.elements = 'apeditor' + (len + 1);

              // configure quicktags
              quicktags({
                id: 'apeditor' + (len + 1),
                buttons: "",
                disabled_buttons: ""
              });

              // init tinymce & quicktags
              tinyMCE.init(args);
              QTags._buttonsInit();

              // hide ajax spinner
              spinner.hide();

              // slide down new panel
              $('#ap-add').prev().slideDown();

              // reset clicked flag
              clicked = false;
            }
          );
        }
      });
    },

    removeSlide : function() {
      slides.on('click', '.ap-remove', function() {
        var $this = $(this),
            num = $this.next().val();

        if (confirm($this.attr('data-confirm'))) {
          tinyMCE.execCommand('mceRemoveControl', false, 'apeditor' + (num + 1));
          $this.parent().parent().slideUp(function() { $(this).remove(); });
        }
      });
    },

    toggleSlide : function(e) {
      slides.on('click', '.ap-toggle', function() {
        $(this).parent().find('.ap-inner').toggle();
      });
    },

    toggleCaption : function() {
      slides.on('click', '.ap-slide-caption-checkbox', function() {
        var input = $(this).prev().prev();
        input.hasClass('disabled') ? input.removeClass('disabled') : input.addClass('disabled');
      });

      slides.on('focus', '.ap-slide-caption-input', function() {
        var $this = $(this);

        if ($this.hasClass('disabled')) {
          $this.removeClass('disabled');
          $this.next().next().attr('checked', true);
        }
      });

      slides.on('blur', '.ap-slide-caption-input', function() {
        var $this = $(this);

        if (!$this.val()) {
          $this.next().next().removeAttr('checked');
          $this.addClass('disabled');
        }
      });
    },

    switchOrientation : function() {
      var handler = function() {
        var val = $('#orientation').val();

        if (val === 'horizontal') {
          // show horizontal options
          $('#Vertical-Accordion-Options').slideUp(function() {
            $('#Horizontal-Accordion-Options').slideDown();
          });
        } else {
          // show vertical options
          $('#Horizontal-Accordion-Options').slideUp(function() {
            $('#Vertical-Accordion-Options').slideDown();
          });
        }
      };

      // bind handlers to window and select
      $(window).on('load', handler);
      $('#orientation').on('change', handler);
    },

    switchEditor : function() {
      slides.on('click', '.ajax .wp-switch-editor', function() {
        var $this = $(this),
          classname = $this.attr('class').split(' ')[1].split('-')[1],
          $parent = $this.parent().parent();

        switchEditors.switchto(this);
        $parent.removeClass().addClass('ap-inner ' + classname + '-active');
      });
    },

    addMedia : function() {
      slides.on('click', '.ajax .add-media', function(e) {
        var editor = this.id.split('-')[0];

        wpActiveEditor = editor;
        tb_show('', 'media-upload.php?post_id=0&amp;TB_iframe=1&amp;width=640&amp;height=576');

        e.preventDefault();
      });
    },

    removeAccordion : function() {
      $('.ap-del-acc').click(function() {
        if (confirm($(this).attr('data-confirm'))) {
          return true;
        }
        return false;
      });
    },

    showTooltip : function() {
      $('.ap-options label').hover(function() {
        $(this).next().show();
      }, function() {
        $(this).next().hide();
      });
    },

    init : function() {
      this.addSlide();
      this.removeSlide();
      this.toggleSlide();
      this.toggleCaption();
      this.switchOrientation();
      this.switchEditor();
      this.addMedia();
      this.removeAccordion();
      this.showTooltip();
    }
  };

  accordionPro.init();

});