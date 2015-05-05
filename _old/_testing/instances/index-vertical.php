<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Accordion Pro - a responsive accordion plugin for jQuery</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    html { overflow-y: scroll }
    body { font: 14px/24px 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 30px auto 60px; background: #eee }
    .wrapper { width: 100% }
    h1, dd { margin: 0 }
    dt { font-weight: bold }
    figure { display: block; width: 100%; height: 100%; margin: 0 }
    figcaption { padding: 10px 15px; position: absolute; bottom: 20px; right: 30px; z-index: 3; background: black; background: rgba(0,0,0,0.7); color: white;
        -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px }
  </style>
  <link rel="stylesheet" href="../../build/accordionpro_js/css/accordionpro.min.css">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="../../build/accordionpro_js/js/jquery.accordionpro.min.js"></script>
</head>
<body>

  <div class="wrapper">

    <h1>Basic setup - vertical accordion</h1>

    <?php
/*
  orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
  startClosed : false,                    // start in a closed position
  firstSlide : 1,                         // displays slide (n) on page load

  theme : 'basic',                        // basic, dark, light, stitch or transparent
  rounded : false,                        // square or rounded corners
  rtl : false,                            // right to left layout
  showSlideNumbers : true,                // display numbers on slides

  responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
  scaleImagesToFit : true,                // scales images to fit slide width and height
  horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
  horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value
  minResponsiveWidth : 400,               // horizontal accordion will flip to vertical at (and below) this width
  maxResponsiveWidth : 1020,              // accordion will not scale up beyond this width

  verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
  verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
  verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

  activateOn : 'click',                   // click or mouseover
  touchEnabled : true,                    // touch events?
  onSlideOpen : function() {},            // callback on slide open
  onSlideClose : function() {},           // callback on slide animation complete

  autoPlay : false,                       // automatically cycle through slides
  cycleSpeed : 6000,                      // time between slide cycles
  slideSpeed : 800,                       // slide animation speed
  easing : 'ease-in-out',                 // animation easing

  pauseOnHover : true,                    // pause on hover
  linkable : false                        // link slides via hash
*/

      // have to wrap bools in string for js
      $jQueryOptions = array(
        'basic' => array(
          'orientation' => 'vertical',
          'theme'       => 'basic'
        ),
        'dark' => array(
          'orientation' => 'vertical',
          'theme'       => 'dark'
        ),
        'light' => array(
          'orientation' => 'vertical',
          'theme'       => 'light'
        ),
        'stitch' => array(
          'orientation' => 'vertical',
          'theme'       => 'stitch'
        ),
        'transparent' => array(
          'orientation' => 'vertical',
          'theme'       => 'transparent'
        )
      );

      foreach ($jQueryOptions as $key => $value) { ?>
        <h2><?php echo $key; ?></h2>
        <div id="<?php echo $key; ?>">
            <ol>
                <li>
                    <h2><span>Slide One</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/1.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide One</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Two</span></h2>
                    <div>
                        <figure>
                            <p>Some text goes in here.</p>
                            <!-- <iframe width="715" height="320" src="http://www.youtube.com/embed/QH2-TGUlwu4" frameborder="0" allowfullscreen></iframe> -->
                            <figcaption class="ap-caption">Slide Two</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Three</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/3.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide Three</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Four</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/4.jpg" width="768" alt="image" />
                            <figcaption class="ap-caption">Slide Four</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Five</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/5.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide Five</figcaption>
                        </figure>
                    </div>
                </li>
            </ol>
            <noscript>
                <p>Please enable JavaScript to get the full experience.</p>
            </noscript>
            <script>
              (function() {
                $('#<?php echo $key; ?>').accordionPro(<?php echo json_encode($value); ?>);
              })();
            </script>
        </div>
    <?php } ?>
  </div>

</body>
</html>