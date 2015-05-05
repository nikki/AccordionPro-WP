<div class="postbox ap-slide ajax">
	<div class="ap-toggle handlediv" title="Click to toggle"></div>
	<h3>
		<span>Slide <?php echo $key + 1; ?></span>
	</h3>
	<div class="ap-inner tmce-active">
		<div class="ap-slide-title">
			<label for="ap-slide-<?php echo $key + 1; ?>">Slide Title: </label>
			<input name='content_title[]' id="ap-slide-<?php echo $key + 1; ?>" type="text" value="" />
		</div>
		<div class="ap-slide-caption">
			<label for="ap-slide-caption-<?php echo $key + 1; ?>">Caption: </label>
			<input name="content_caption[]" id="ap-slide-caption-<?php echo $key + 1; ?>" class="ap-slide-caption-input disabled" type="text" value="" />
			<label for="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-enabled">Enabled? </label>
			<input name="content_caption_enabled[<?php echo $key; ?>]" id="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-checkbox" type="checkbox" />
		</div>
		<div id="wp-apeditor<?php echo $key + 1; ?>-editor-tools" class="wp-editor-tools">
			<a id="apeditor<?php echo $key + 1; ?>-html" class="wp-switch-editor switch-html">HTML</a>
			<a id="apeditor<?php echo $key + 1; ?>-tmce" class="wp-switch-editor switch-tmce">Visual</a>
			<div id="wp-apeditor<?php echo $key + 1; ?>-media-buttons" class="wp-media-buttons">
				<a href="#" class="add-media" id="apeditor<?php echo $key + 1; ?>-add_media" title="Add Media"><img src="<?php echo WP_PLUGIN_URL; ?>/accordionpro_wp/css/media-button.png" width="15" height="15"> Add Media</a>
			</div>
		</div>
		<div id="wp-apeditor<?php echo $key + 1; ?>-editor-container" class="wp-editor-container">
			<textarea name="content[]" id="apeditor<?php echo $key + 1; ?>" class="wp-editor-area" rows="6" cols="40"></textarea>
		</div>
		<input class="ap-remove button-secondary" type="button" value="<?php echo __('Remove Slide '.($key + 1), 'accordion_pro'); ?>" data-confirm="<?php echo __('Are you sure you want to remove this slide?', 'accordion_pro'); ?> " />

		<input type="hidden" id="ap-slide-<?php echo $key + 1; ?>" class="ap-slide-num" value="<?php echo $key + 1; ?>" />
	</div>
</div>