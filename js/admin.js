jQuery(function($) {
  var slides = $('.ap-slides'),
      version = (typeof tinyMCE !== 'undefined' ? +tinyMCE.majorVersion : 3),
      command = (version <= 3 ? 'Control' : 'Editor'),

  // mce[Add/Remove]Control = v3
  // mce[Add/Remove]Editor = v4

  accordionPro = {
    initEditor : function(res, len) {
      // copy settings from apeditor1 to subsequently (ajax created) slides
      var args = jQuery.extend(true, {}, tinyMCEPreInit.mceInit.apeditor1);
      args.elements = 'apeditor' + (len + 1);
      args.selector = '#' + args.elements;
      args.height = '172';

      // insert html
      $('#ap-add').before(res);

      // init tinymce
      tinyMCE.init(args);

      // configure and init quicktags
      quicktags({ id: args.elements });
      QTags._buttonsInit();

      // add editor
      tinyMCE.execCommand('mceAdd' + command, false, args.elements);

      // slide down new panel
      $('#ap-add').prev().slideDown();
    },

    addSlide : function() {
      var _this = this,
          spinner = $('.ap-slides .ap-wait'),
          clicked = false;

      spinner.ajaxStart(function() {
        spinner.css('display', 'inline-block');
      });

      spinner.ajaxStop(function() {
        spinner.css('display', 'none');
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
              // init editor
              _this.initEditor(res, len);

              // init colour picker
              _this.initColourPicker();

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
            num = +$this.next().val();

        if (confirm($this.attr('data-confirm'))) {
          // remove editor instance
          tinyMCE.execCommand('mceRemove' + command, false, 'apeditor' + num);

          // slide panel up and remove
          $this.parent().parent().slideUp(function() { $(this).remove(); });
        }
      });
    },

    toggleSlide : function(e) {
      slides.on('click', '.ap-toggle', function() {
        $(this).parent().toggleClass('inactive');
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

        // backwards compatibility
        if (version >= 4) $parent = $parent.parent();

        switchEditors.switchto(this);
        $parent.removeClass().addClass('ap-inner ' + classname + '-active');
      });
    },

    addMedia : function() {
      slides.on('click', '.ajax .add-media', function(e) {
        var editor = this.id.split('-')[0];
        wpActiveEditor = editor;

        // backwards compatibility
        if (version <= 3) {
          tb_show('', 'media-upload.php?post_id=0&amp;TB_iframe=1&amp;width=640&amp;height=576');
        }

        e.preventDefault();
      });
    },

    initColourPicker : function() {
      $picker = $('.color-picker');
      $picker
        .iris({
          palettes: true,
          change : function(e, ui) {
            $(this).css({
              background : ui.color.toString()
            });
          }
        })
        .on('click', function(e) {
          $(this).iris('show');
        })
        .next()
        .on('mouseleave', function(e) {
          // console.log($(this).prev());
          // $(this).prev().iris('hide');
        })
        .parent()
        .on('click', '.iris-palette:eq(0)', function(e) {
          // clear colour value
          $(e.delegateTarget).children().first().val('').css('background', 'none');
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
      $('.ap-options .postbox')
        .not(':eq(0)').find('label span')
        .on({
          mouseenter : function() {
            $(this).parent().next().show();
          },
          mouseleave : function() {
            $(this).parent().next().hide();
          }
        });
    },

    subscribeToNewsletter : function() {
      var $form = $('#ap-newsletter');

      function showMessage(msg) {
        $form
          .next()
          .empty()
          .html(msg)
          .fadeIn();
      }

      if ($form.length) {
        $form.on('submit', function(e) {
          $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function(data) {
              if (data.Status === 200) {
                $form
                  .add($form.prev())
                  .fadeOut(function() {
                    showMessage('<b style="color:green">Success! </b>' + data.Message);
                  });
                $.post(ajaxurl, { action: 'set_newsletter_subscribed' });
              } else {
                showMessage('<b style="color:red">Error: </b>' + data.Message);
              }
          });
          e.preventDefault();
        });
      }
    },

    init : function() {
      this.addSlide();
      this.removeSlide();
      this.toggleSlide();
      this.toggleCaption();
      this.switchOrientation();
      this.switchEditor();
      this.addMedia();
      this.initColourPicker();
      this.removeAccordion();
      this.showTooltip();
      this.subscribeToNewsletter();
    }
  };

  accordionPro.init();

});