<?php
/**
 * Prevents loading file directly
 */

if (!class_exists('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}
?>

<h2 class="ap-title">
	<?php
		if ($clean['mode'] === 'add') {
			_e('Create New Accordion', 'accordion_pro');
		} else if ($clean['mode'] === 'edit') {
			_e('Edit Accordion', 'accordion_pro');
		}
	?>
</h2>

<?php $this->display_notices(); ?>

<form method="post" action="?page=accordion_pro&mode=edit<?php if(isset($_GET['id'])) { echo '&id='.$this->sanitize($_GET['id']); } ?>">
	<div class="ap-left">
		<div class="ap-slides metabox-holder">
			<?php

			$settings = array(
				'textarea_name' => 'content[]',
				'editor_height' => 172
			);

			if (!empty($accordion['acc_content']['content']) && is_array($accordion['acc_content']['content'])) {
				foreach($accordion['acc_content']['content'] as $key => $content) {
					?>
						<div class="postbox ap-slide">
							<div class="ap-toggle handlediv" title="Click to toggle"></div>
							<h3>
								<span>Slide <?php echo $key + 1; ?></span>
							</h3>
							<div class="ap-inner">
								<div class="ap-slide-title">

                  <div class="title-wrapper">
                    <label for="ap-slide-title-<?php echo $key + 1; ?>">Slide Title: </label>
                    <input name="content_title[]" id="ap-slide-title-<?php echo $key + 1; ?>" type="text" value="<?php echo stripslashes($accordion['acc_content']['content_title'][$key]); ?>" />
                  </div>

                  <div class="color-wrapper">
                    <button class="button">
                      <span class="dashicons dashicons-admin-appearance" style="background-color: <?php echo stripslashes($accordion['acc_content']['content_color'][$key]); ?>"></span>
                    </button>
                    <input name="content_color[]" type="text" class="color-picker" value="<?php echo stripslashes($accordion['acc_content']['content_color'][$key]); ?>" style="background-color: <?php echo stripslashes($accordion['acc_content']['content_color'][$key]); ?>" />
                  </div>

                  <div class="icon-wrapper">
                    <button class="button">
                      <span class="dashicons dashicons-format-image"></span>
                    </button>
                    <input name="content_icon[]" type="hidden" value="<?php echo stripslashes($accordion['acc_content']['content_icon'][$key]); ?>" />
                    <div class="icon-preview <?php if (strrpos($accordion['acc_content']['content_icon'][$key], '.')) echo "active"; ?>" style="background-image: url('<?php echo stripslashes($accordion['acc_content']['content_icon'][$key]); ?>')"></div>
                  </div>

                </div>
								<div class="ap-slide-caption">
									<label for="ap-slide-caption-<?php echo $key + 1; ?>">Caption: </label>
									<input name="content_caption[]" id="ap-slide-caption-<?php echo $key + 1; ?>" class="ap-slide-caption-input <?php if (!$accordion['acc_content']['content_caption_enabled'][$key]) { echo 'disabled'; } ?>" type="text" value="<?php echo stripslashes($accordion['acc_content']['content_caption'][$key]); ?>" />
									<label for="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-enabled">Enabled?
									</label>
									<input name="content_caption_enabled[<?php echo $key ?>]" id="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-checkbox" type="checkbox" <?php if (isset($accordion['acc_content']['content_caption_enabled'][$key])) checked(true); ?> />
								</div>
								<?php
									// textarea id must be alphanumeric
									wp_editor(stripslashes($content), 'apeditor'.($key + 1), $settings);
									if ($key) echo '<input class="ap-remove button-secondary" type="button" value="'.__('Remove Slide '.($key + 1), 'accordion_pro').'" data-confirm="'.__('Are you sure you want to remove this slide?', 'accordion_pro').'" />';
								?>
								<input type="hidden" id="ap-slide-<?php echo $key + 1; ?>" class="ap-slide-num" value="<?php echo $key + 1; ?>" />
							</div>
						</div>
					<?php
				}
			} else {
					?>
					<div class="postbox ap-slide">
						<div class="ap-toggle handlediv" title="Click to toggle"></div>
						<h3>
							<span>Slide 1</span>
						</h3>
						<div class="ap-inner">
							<div class="ap-slide-title">

                <div class="title-wrapper">
                  <label for="ap-slide-title-1">Slide Title: </label>
                  <input name='content_title[]' id="ap-slide-title-1" type="text" value="" />
                </div>

                <div class="color-wrapper">
                  <button class="button">
                    <span class="dashicons dashicons-admin-appearance" style=""></span>
                  </button>
                  <input name="content_color[]" type="text" class="color-picker" value="" style="" />
                </div>

                <div class="icon-wrapper">
                  <button class="button">
                    <span class="dashicons dashicons-format-image"></span>
                  </button>
                  <input name="content_icon[]" type="hidden" value="" />
                  <div class="icon-preview"></div>
                </div>

							</div>
							<div class="ap-slide-caption">
								<label for="ap-slide-caption-1">Caption: </label>
								<input name="content_caption[]" id="ap-slide-caption-1" class="ap-slide-caption-input disabled" type="text" value="" />
								<label for="ap-slide-caption-enabled-1" class="ap-slide-caption-enabled">Enabled? </label>
								<input name="content_caption_enabled[]" id="ap-slide-caption-enabled-1" class="ap-slide-caption-checkbox" type="checkbox" />
							</div>
							<?php
								// textarea id must be alphanumeric
								wp_editor('', 'apeditor1', $settings);
							?>
							<input type="hidden" id="ap-slide-1" class="ap-slide-num" value="1" />
						</div>
					</div>
				<?php
			}
				?>

			<input id="ap-add" type="button" class="button-secondary" value="<?php _e('Add Another Slide', 'accordion_pro'); ?>" />
			<div class="ap-wait"></div>
			<input type="submit" name="save_accordion" class="button-primary ap-save" value="<?php _e('Save Accordion', 'accordion_pro'); ?>" />
		</div><!-- /ap-slides -->
	</div><!-- /ap-left -->
	<div class="ap-right">
		<div class="ap-options metabox-holder">
			<div class="postbox">
				<h3><span><?php _e('Accordion', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<p class="accordionName">
					    <label for="accordionName"><?php _e('Name', 'accordion_pro'); ?></label>
						<input id="accordionName" name="accordionName" value="<?php echo $accordion['post_title']; ?>" required placeholder="<?php _e('Accordion Name', 'accordion_pro'); ?>" />
					</p>
	        <input type="submit" name="save_accordion" class="button-primary" value="<?php _e('Save Accordion', 'accordion_pro'); ?>" />
				</div>
			</div>

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
        )
      ),

      'Aesthetics' => array(
        'theme' => array(
          'desc' => 'Select a theme - <b>basic</b>, <b>bordered</b>, <b>stitch</b> or <b>transparent</b>',
          'value' => array('basic', 'bordered', 'stitch', 'transparent')
        ),

        'colour.scheme' => array(
          'desc' => 'Colour scheme, <b>charcoal</b> set by default',
          'value' => array('charcoal', 'white', 'silver', 'grey', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', 'dark-blue')
        ),

        'colour.style' => array(
          'desc' => 'Choose from <b>flat</b> or <b>gradient</b>',
          'value' => array('flat', 'gradient')
        ),

        'rounded' => array(
          'desc' => 'Display square or rounded corners where supported',
          'value' => false
        ),
        'rtl' => array(
          'desc' => 'Set right to left layout',
          'value' => false
        )
      ),

      'Horizontal Accordion Options' => array(
        'responsive' => array(
          'desc' => 'Accordion will adapt itself to the page layout, based on width of parent element',
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

      'Tab Options' => array(
        'tab.size' => array(
          'desc' => 'Set tab size',
          'value' => 48
        ),
        'tab.fontSize' => array(
          'desc' => 'Set tab font size',
          'value' => 16
        ),
        'tab.font' => array(
          'desc' => 'Set tab font family',
          'value' => 'Arial'
        ),
        'tab.icon' => array(
          'desc' => 'Set tab icon, choose from <b>number</b>, <b>chevron</b>, <b>disc</b>, <b>square</b>, <b>custom</b> and <b>none</b>',
          'value' => array('number', 'chevron', 'disc', 'square', 'custom', 'none')
        ),
        'tab.customIcons' => array(
          'desc' => 'Set a custom image for each icon',
          'value' => NULL
        ),
        'tab.customColours' => array(
          'desc' => 'Set a custom colour for each tab',
          'value' => NULL
        ),
        'tab.selected' => array(
          'desc' => 'Display slide number (n) on page load',
          'value' => 1
        )
      ),

      'Panel Options' => array(
        'panel.scrollable' => array(
          'desc' => 'Trigger scrollbar on vertical overflow',
          'value' => false
        ),
        'panel.scaleImages' => array(
          'desc' => 'Scale images to fit slide width and height',
          'value' => true
        ),
        'panel.padding' => array(
          'desc' => 'Adds internal padding (px [integer]) to slide panels',
          'value' => 0
        )
      ),

      'Events' => array(
        'activateOn' => array(
          'desc' => 'Activate accordion either on <b>click</b> or <b>mouseover</b>',
          'value' => array('click', 'mouseover')
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

    // get existing
    if (isset($accordion['jQuerySettings'])) {
    	$args = $accordion['jQuerySettings'];
      foreach ($args as $key => $value) {
        if (gettype($this->jQueryOptions[$key]) === 'boolean') {
          $args[$key] = ($value === 'true') ? true : false;
        }
        if (gettype($this->jQueryOptions[$key]) === 'integer') {
          $args[$key] = (int)$value;
        }
      }

    } else {
      // defaults
      $args = $this->jQueryOptions;
    }

    foreach ($defaults as $section => $def) {
        $title = str_replace(' ', '-', $section);
        echo "<div id='$title' class='postbox'>";
        echo "<h3>$section</h3>";
        foreach ($def as $key => $value) {
          if (is_null($value['value'])) { // null types don't need a panel entry
            echo "<input type='hidden' id='$key' name='$key' value='$args[$key]' />";
            continue;
          }

          $exploded = explode('.', $key); // array deferencing in php 5.4+ only :/
          $split = (is_array($exploded) && count($exploded) > 1) ? $exploded[1] : $key;
          echo "<div class='inside'>";
          echo "<label class='control-label span2' for='$key'><span>?</span>" . $split . "</label>";

          foreach ($value as $k => $v) {
            if ($k == 'value') {
              $t = gettype($v);

              switch ($t) {
                case 'boolean':
                  echo "<select id='$key' name='$key'>";
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
                  echo "<input type='number' min='0' step='1' id='$key' name='$key' value='$args[$key]' />";
                  break;
                case 'string':
                  echo "<input type='text' id='$key' name='$key' value='$args[$key]' />";
                  break;
                case 'array':
                  echo "<select id='$key' name='$key'>";
                  foreach ($v as $a => $b) {
                    // if $_GET opt val...
                    $selected = $b === $args[$key] ? 'selected=selected' : '';
                    echo "<option name='$b' value='$b' autocomplete='off' $selected>$b</option>";
                  }
                  echo "</select>";
                default:
                  break;
              }
      				echo "</div>";
            } else {
            	echo "<p class='tooltip'>$v</p>";
            }
          }
        }
        echo "</div>";
    }
?>

		</div><!-- /ap-options -->
	</div>
<?php wp_nonce_field('add_edit', 'accordion_pro'); ?>
</form>
