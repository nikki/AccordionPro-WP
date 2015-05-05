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

<h2><?php _e('Settings', 'accordion_pro'); ?></h2>

<?php $this->display_notices(); ?>

<form method="post" action="?page=accordion_pro_settings">
	<div id="template">
		<h3><label for="additional_css"><?php _e('Additional CSS', 'accordion_pro'); ?></label></h3>
		<textarea name="additional_css" id="additional_css" rows="10"><?php echo $this->get_option('additional_css'); ?></textarea>
		<p></p>
	</div>

	<p class="submit"><input type="submit" name="save_settings" id="save_settings" class="button-primary" value="<?php _e('Save Settings', 'accordion_pro'); ?>"></p>
	<?php wp_nonce_field('save_settings', 'accordion_pro'); ?>
</form>

<form method="post" action="?page=accordion_pro_settings&mode=delete_data">
  <h3><label for="delete_data"><?php _e('Delete Accordion Pro Data', 'accordion_pro'); ?></label></h3>
	<p><?php _e('If you wish to remove all the data associated with this plugin, use the button below.', 'accordion_pro'); ?></p>

  <p class="submit"><input type="submit" name="delete_data" id="delete_data" class="button-primary" value="<?php _e('Delete Data', 'accordion_pro'); ?>"></p>
	<?php wp_nonce_field('delete_data', 'accordion_pro'); ?>
</form>