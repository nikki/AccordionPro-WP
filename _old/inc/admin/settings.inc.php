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

<div class="ap-left">
  <div class="ap-settings metabox-holder">
    <form method="post" action="?page=accordion_pro_settings">
      <div id="template" class="postbox">
        <h3><label for="additional_css"><?php _e('Additional CSS', 'accordion_pro'); ?></label></h3>
        <div class="inside">
          <textarea name="additional_css" id="additional_css" rows="10"><?php echo $this->get_option('additional_css'); ?></textarea><br /><br />
          <input type="submit" name="save_settings" id="save_settings" class="button-primary" value="<?php _e('Save Settings', 'accordion_pro'); ?>">
        </div>
      </div>
      <?php wp_nonce_field('save_settings', 'accordion_pro'); ?>
    </form>

    <form method="post" action="?page=accordion_pro_settings">
      <div class="postbox">
        <h3><label for="enable_formatting"><?php _e('Enable Auto Formatting', 'accordion_pro'); ?></label></h3>
        <div class="inside">
          <label>
            <input type="hidden" name="enable_formatting" value="0" />
            <input name="enable_formatting" id="enable_formatting" type="checkbox" <?php echo ($this->get_option('enable_formatting') ? 'checked' : ''); ?>>
            Enable WordPress Auto Formatting within slides.
          </label>
          <p>Converts line-breaks in the visual editor to paragraph tags, and saves the paragraph tags as part of the HTML formatting for each slide. Leave this disabled if you prefer to hand-code your HTML.</p>
          <input type="submit" name="save_settings" id="save_settings" class="button-primary" value="<?php _e('Save Settings', 'accordion_pro'); ?>">
        </div>
      </div>
      <?php wp_nonce_field('save_settings', 'accordion_pro'); ?>
    </form>

    <form method="post" action="?page=accordion_pro_settings&mode=delete_data" class="postbox">
      <h3><label for="delete_data"><?php _e('Delete Data', 'accordion_pro'); ?></label></h3>
      <div class="inside">
        <p><?php _e('If you wish to remove all the data associated with this plugin, click the button below. Data will be deleted permanently, <b>there is no undo.</b>', 'accordion_pro'); ?></p>
        <input type="submit" name="delete_data" id="delete_data" class="button-primary" value="<?php _e('Delete Data', 'accordion_pro'); ?>">
      </div>
      <?php wp_nonce_field('delete_data', 'accordion_pro'); ?>
    </form>
  </div>
</div>

<?php
  if (!$this->get_option('newsletter')) {
?>
<div class="ap-right">
  <div class="ap-newsletter metabox-holder">
    <div class="postbox">
      <h3><span>Keep Accordion Pro Updated</span></h3>
      <div class="inside">
        <p>Sign up to the <a href="http://stitchui.com?APWP=1" target="_blank"><b>Stitch UI</b></a> newsletter, and you'll be the first to know when we release updates for Accordion Pro.</p>
        <form action="http://playzap.createsend.com/t/i/s/gjkkj/" method="post" id="ap-newsletter">
          <input id="fieldEmail" name="cm-gjkkj-gjkkj" type="email" placeholder="Email" required />
          <input id="fieldyhzty" name="cm-f-yhzty" type="hidden" value="APWP" />
          <button type="submit" class="button-primary">Subscribe</button>
        </form>
        <p class="signup-message"></p>
      </div>
    </div>
  </div>
</div>
<?php } ?>