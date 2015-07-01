<?php
  ini_set('display_errors',1);
  ini_set('display_startup_errors',1);
  error_reporting(-1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Accordion Pro Demo Suite</title>

    <link rel="stylesheet" href="../../build/accordionpro_js/css/accordionpro.min.css">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet">

    <style>
      #demo { margin: 0 auto }
      h1 {
        font-size: 24px;
        border-bottom: 2px solid #333333;
        margin: 30px 0 10px;
        text-shadow: 1px 1px 0 white;
      }
      input[type=text] { height: auto }
      .container > p { font-size: 16px; line-height: 1.5em; margin-bottom: 30px; }
      .container h1 + p { margin-bottom: 15px }
      .row { margin-bottom: 5px }
      .help-inline { margin-left: 30px }
      #linkable li { display: inline-block }
      textarea { width: 60%; height: 200px; margin-bottom: 60px }
    </style>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script src="../../build/accordionpro_js/js/jquery.accordionpro.min.js"></script>
</head>
<body>

<div class="container">

  <div id="demo">
      <ol>
          <li>
              <h2><span>Slide One</span></h2>
              <div>
                  <img src="../../build/accordionpro_js/img-demo/1.jpg" alt="image" />
                  <p class="ap-caption">Slide One</p>
              </div>
          </li>
          <li>
              <h2><span>Slide Two</span></h2>
              <div>
                  <img src="../../build/accordionpro_js/img-demo/2.jpg" alt="image" />
                  <p class="ap-caption">Slide One</p>
              </div>
          </li>
          <li>
              <h2><span>Slide Three</span></h2>
              <div>
                  <img src="../../build/accordionpro_js/img-demo/3.jpg" alt="image" />
                  <p class="ap-caption">Slide One</p>
              </div>
          </li>
          <li>
              <h2><span>Slide Four</span></h2>
              <div>
                  <img src="../../build/accordionpro_js/img-demo/4.jpg" alt="image" />
                  <p class="ap-caption">Slide One</p>
              </div>
          </li>
          <li>
              <h2><span>Slide Five</span></h2>
              <div>
                  <img src="../../build/accordionpro_js/img-demo/5.jpg" alt="image" />
                  <p class="ap-caption">Slide One</p>
              </div>
          </li>
      </ol>
      <noscript>
          <p>Please enable JavaScript to get the full experience.</p>
      </noscript>
  </div>

  <h1>Accordion Pro Demo Suite</h1>
  <p>This demo suite is intended to help users of Accordion Pro design their own accordion implementation.  Use to options below to configure a basic Accordion
    Pro setup visually - any changes made will be reflected in the plugin instance above.</p>
  <p>As an added bonus, users of Accordion Pro JS can use the generated code output to instantiate the plugin on their own websites.</p>

  <form class="form-inline" method="GET" name="demo">
<?php
    $defaults = array(
        'Layout' => array(
            'orientation' => array(
              'desc' => 'Create a <b>horizontal</b> or <b>vertical</b> accordion',
              'value' => array('horizontal', 'vertical')
            ),
            'startClosed' => array(
              'desc' => 'Start accordion in a closed position',
              'value' => false
            ),
            'firstSlide' => array(
              'desc' => 'Display slide number (n) on page load',
              'value' => 1
            )
        ),
        'Aesthetics' => array(
            'theme' => array(
              'desc' => 'Select a theme - <b>basic</b>, <b>dark</b>, <b>light</b>, <b>stitch</b> or <b>transparent</b>',
              'value' => array('basic', 'dark', 'light', 'stitch', 'transparent')
            ),
            'rounded' => array(
              'desc' => 'Display square or rounded corners where supported',
              'value' => false
            ),
            'rtl' => array(
              'desc' => 'Set right to left layout',
              'value' => false
            ),
            'showSlideNumbers' => array(
              'desc' => 'Display numbers on slides',
              'value' => true
            )
        ),
        'Horizontal Accordion Options' => array(
            'responsive' => array(
              'desc' => 'Accordion will adapt itself to the page layout, based on width of parent element',
              'value' => true
            ),
            'scaleImages' => array(
              'desc' => 'Scale images to fit slide width and height',
              'value' => true
            ),
            'horizontalWidth' => array(
              'desc' => 'Base width; fixed (px [integer]) - responsive scaling is relative to this value',
              'value' => 900
            ),
            'horizontalHeight' => array(
              'desc' => 'Base height; fixed (px [integer]) - responsive scaling is relative to this value',
              'value' => 300
            )
        ),
        'Vertical Accordion Options' => array(
            'verticalWidth' => array(
              'desc' => 'Base width; Fixed (px [integer]) or fluid (% [string])',
              'value' => '100%'
            ),
            'verticalHeight' => array(
              'desc' => 'Base height; fixed (px [integer])',
              'value' => 500
            ),
            'verticalSlideHeight' => array(
              'desc' => 'Vertical accordion slide heights can be fixed or fitToContent',
              'value' => array('fixed', 'fitToContent')
            )
        ),
        'Events' => array(
            'activateOn' => array(
              'desc' => 'Activate accordion either on <b>click</b> or <b>mouseover</b>',
              'value' => array('click', 'mouseover')
            ),
            'touchEnabled'          => array(
              'desc' => 'Are touch events enabled?',
              'value' => true
            )
        ),
        'Animations' => array(
            'autoPlay' => array(
              'desc' => 'Automatically cycle through slides',
              'value' => false
            ),
            'cycleSpeed' => array(
              'desc' => 'Set time between slide cycles (ms)',
              'value' => 6000
            ),
            'slideSpeed' => array(
              'desc' => 'Set slide animation speed',
              'value' => 800,
            ),
            'easing' => array(
              'desc' => 'Set animation easing',
              'value' => array('ease-in-out', 'linear', 'ease', 'ease-in', 'ease-out')
            )
        ),
        'Miscellaneous Options' => array(
            'pauseOnHover' => array(
              'desc' => 'Pause animation when hovering mouse over accordion',
              'value' => true,
            ),
            'linkable' => array(
              'desc' => 'Link to slides via hash',
              'value' => false
            )
        )
    );

    // flatten top level of defaults so that structure is same as $_GET array
    $flatten = array();
    foreach ($defaults as $default => $value) {
      foreach ($value as $key => $val) {
        foreach ($val as $k => $v) {
          if ($k === 'value') {
            switch (gettype($v)) {
              case 'array': // push non-dupes to new array
                $flatten[$key] = $v[0];
                break;
              default:
                $flatten[$key] = $v;
                break;
            }
          }
        }
      }
    }

    // get $_GET if exists
    if (isset($_GET['AP'])) {
      // TODO: filter
      $args = $_GET['AP'];

      // all GET items are strings, so cast integers
      foreach ($args as $key => $value) {
        if (gettype($flatten[$key]) === 'boolean') {
          $args[$key] = ($value === 'true') ? true : false;
        }
        if (gettype($flatten[$key]) === 'integer') {
          $args[$key] = (int) $value;
        }
      }

    } else {
      // defaults
      $args = $flatten;
    }

    foreach ($defaults as $section => $def) {
        echo "<fieldset class='control-group'>";
        echo "<legend>$section</legend>";
        foreach ($def as $key => $value) {
            echo "<div class='row'>";
            echo "<label class='control-label span2' for='$key'>$key</label>";
            $value = array_reverse($value);
            foreach ($value as $k => $v) {
              if ($k == 'desc') {
                echo "<span class='help-inline'>$v</span>";
                echo "</div>";
              } else {
                $t = gettype($v);

                switch ($t) {
                  case 'boolean':
                    echo "<select id='$key' name='AP[$key]'>";
                    if ($args[$key]) {
echo <<<EOT
                        <option name="false" value="false">false</option>
                        <option name="true" value="true" selected="selected">true</option>
EOT;
                    } else {
echo <<<EOT
                        <option name="false" value="false" selected="selected">false</option>
                        <option name="true" value="true">true</option>
EOT;
                    }
                    echo "</select>";
                    break;
                  case 'integer':
                  case 'string':
                    echo "<input type='text' id='$key' name='AP[$key]' value='$args[$key]' />";
                    break;
                  case 'array':
                    echo "<select id='$key' name='AP[$key]'>";
                    foreach ($v as $a => $b) {
                      // if $_GET opt val...
                      $selected = $b === $args[$key] ? 'selected=selected' : '';
                      echo "<option name='$b' value='$b' autocomplete='off' $selected>$b</option>";
                    }
                    echo "</select>";
                  default:
                    break;
                }

              }
            }
        }
        echo "</fieldset>";
    }
?>
    <input type="submit" class="btn btn-primary" value="Submit" />
  </form>

  <div id="linkable">
    <ul>
      <li><a href="#demo-slide-1">#demo-slide-1</a></li>
      <li><a href="#demo-slide-2">#demo-slide-2</a></li>
      <li><a href="#demo-slide-3">#demo-slide-3</a></li>
      <li><a href="#demo-slide-4">#demo-slide-4</a></li>
      <li><a href="#demo-slide-5">#demo-slide-5</a></li>
    </ul>
  </div>

<?php

    // create js object from defaults or passed in options
    // strip defaults if necessary
    $output = array();

    foreach ($args as $key => $value) {
      switch (gettype($value)) {
        case 'array': // push non-dupes to new array
          if ($flatten[$key][0] !== $value[0]) {
            $output[$key] = $value[0];
          }
          break;
        case 'boolean': // dedupe, cast bool to str
          if ($flatten[$key] !== $value) {
            $output[$key] = ($value) ? 'true' : 'false';
          }
          break;
        default:
          if ($flatten[$key] !== $value) {
            $output[$key] = $value;
          }
          break;
      }
    }

    // if default settings, cast array to string
    if (empty($output)) $output = null;

    // echo "<pre>";
    // print_r(json_encode($output));
    // echo "</pre>";*/
?>

  <div id="output">
    <h3>Output</h3>
    <textarea></textarea>
  </div>

  <script>
    (function() {
      var output = <?php echo json_encode($output); ?>;

      // cast strings to bool
      for (var i in output) {
        if (output.hasOwnProperty(i)) {
          if (output[i] === 'true') {
            output[i] = true;
          }

          if (output[i] === 'false') {
            output[i] = false;
          }
        }
      }

      // init demo
      $('#demo').accordionPro(output);

      // set textarea output
      var stringify = JSON.stringify(output);
      if (stringify === 'null') stringify = '';
      $('textarea').html("$('#demo').accordionPro(" + stringify + ");");
    })();
  </script>

</div>

</body>
</html>