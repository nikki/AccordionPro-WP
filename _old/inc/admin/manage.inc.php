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
			_e('Create Accordion', 'accordion_pro');
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
				'teeny' => true,
				'textarea_rows' => 6
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
									<label for="ap-slide-title-<?php echo $key + 1; ?>">Slide Title: </label>
									<input name="content_title[]" id="ap-slide-title-<?php echo $key + 1; ?>" type="text" value="<?php echo stripslashes($accordion['acc_content']['content_title'][$key]); ?>" />
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
									if ($key) echo '<input class="ap-remove" type="button" value="'.__('Remove Slide '.($key + 1), 'accordion_pro').'" data-confirm="'.__('Are you sure you want to remove this slide?', 'accordion_pro').'" />';
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
								<label for="ap-slide-title-1">Slide Title: </label>
								<input name='content_title[]' id="ap-slide-title-1" type="text" value="" />
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
					<p class="submit">
	           <input type="submit" name="save_accordion" class="button-primary" value="<?php _e('Save Accordion', 'accordion_pro'); ?>" />
	        </p>
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

    // get existing
    if (isset($accordion['jQuerySettings'])) {
    	$args = $accordion['jQuerySettings'];
      foreach ($args as $key => $value) {
        if (gettype($this->jQueryOptions[$key]) === 'boolean') {
          $args[$key] = ($value === 'true') ? true : false;
        }
        if (gettype($this->jQueryOptions[$key]) === 'integer') {
          $args[$key] = (int) $value;
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
            echo "<div class='inside'>";
            echo "<label class='control-label span2' for='$key'>$key</label>";
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
