<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Accordion Pro - a responsive accordion plugin for jQuery</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    html { overflow-y: scroll }
    body { font: 14px/24px 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 30px auto 60px; background: #fff }
    .wrapper { max-width: 900px; margin: 0 auto }
    .wrapper > ul { margin: 0; padding: 0 }
    .wrapper > ul > li { display: inline-block; padding-right: 12px; margin-right: 8px; border-right: 1px solid black; line-height: 12px; }
    .wrapper > ul > li a { text-decoration: none }
    .wrapper > ul > li a:hover { text-decoration: underline }
  </style>
  <link rel="stylesheet" href="css/accordionpro.min.css">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="js/modernizr.2.6.2.min.js"></script>
  <script src="js/jquery.accordionpro.min.js"></script>
</head>
<body>

  <div class="wrapper">

    <ul>
      <li><a href="index.php">index</a></li>
      <li><a href="vertical.php">index vertical</a></li>

      <li><a href="startclosed.php">startclosed</a></li>
      <li><a href="startclosed-vertical.php">startclosed vertical</a></li>

      <li><a href="firstslide.php">firstslide</a></li>
      <li><a href="firstslide-vertical.php">firstslide vertical</a></li>

      <li><a href="rounded.php">rounded</a></li>
      <li><a href="rounded-vertical.php">rounded vertical</a></li>

      <li><a href="rtl.php">rtl</a></li>
      <li><a href="rtl-vertical.php">rtl vertical</a></li>

      <li><a href="rtl-startclosed.php">rtl startclosed</a></li>
      <li><a href="rtl-vertical-startclosed.php">rtl vertical startclosed</a></li>

      <li><a href="autoplay.php">autoplay</a></li>
      <li><a href="autoplay-vertical.php">autoplay-vertical</a></li>

      <li><a href="autoplay-startclosed-firstslide.php">autoplay startclosed firstslide</a></li>
      <li><a href="autoplay-startclosed.php">autoplay startclosed</a></li>
      <li><a href="autoplay-vertical-startclosed.php">autoplay vertical startclosed</a></li>

      <li><a href="slidenumbers.php">disable slidenumbers</a></li>
      <li><a href="slidenumbers-vertical.php">disable slidenumbers vertical</a></li>

      <li><a href="linkable.php">linkable</a></li>
      <li><a href="linkable-vertical.php">linkable vertical</a></li>
      <li><a href="linkable-autoplay.php">linkable autoplay</a></li>
      <li><a href="linkable-vertical-autoplay.php">linkable vertical autoplay</a></li>

      <li><a href="vertical-fittocontent.php">vertical fittocontent</a></li>
      <li><a href="vertical-fittocontent-closed.php">vertical fittocontent closed</a></li>
    </ul>

    <h1>RTL startclosed - horizontal accordion</h1>

    <?php

      // have to wrap bools in string for js
      $jQueryOptions = array(
        'basic' => array(
          'orientation' => 'horizontal',
          'theme'       => 'basic',
          'rtl'         => 'true',
          'startClosed' => 'true'
        ),
        'dark' => array(
          'orientation' => 'horizontal',
          'theme'       => 'dark',
          'rtl'         => 'true',
          'startClosed' => 'true'
        ),
        'light' => array(
          'orientation' => 'horizontal',
          'theme'       => 'light',
          'rtl'         => 'true',
          'startClosed' => 'true'
        ),
        'stitch' => array(
          'orientation' => 'horizontal',
          'theme'       => 'stitch',
          'rtl'         => 'true',
          'startClosed' => 'true'
        ),
        'transparent' => array(
          'orientation' => 'horizontal',
          'theme'       => 'transparent',
          'rtl'         => 'true',
          'startClosed' => 'true'
        )
      );

      foreach ($jQueryOptions as $key => $value) { ?>
        <h2><?php echo $key; ?></h2>
        <div id="<?php echo $key; ?>">
            <ol>
                <li>
                    <h2><span>Slide One</span></h2>
                    <div>
                        <img src="img-demo/1.jpg" alt="image" />
                        <p class="ap-caption">Slide One</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Two</span></h2>
                    <div>
                        <img src="img-demo/2.jpg" alt="image" />
                        <p class="ap-caption">Slide Two</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Three</span></h2>
                    <div>
                        <img src="img-demo/3.jpg" alt="image" />
                        <p class="ap-caption">Slide Three</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Four</span></h2>
                    <div>
                        <img src="img-demo/4.jpg" width="768" alt="image" />
                        <p class="ap-caption">Slide Four</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Five</span></h2>
                    <div>
                        <img src="img-demo/5.jpg" alt="image" />
                        <p class="ap-caption">Slide Five</p>
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