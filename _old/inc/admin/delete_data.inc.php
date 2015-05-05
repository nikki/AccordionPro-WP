<?php
/**
 * Check referrer
 */

if (!is_admin() || !check_admin_referer('delete_data', 'accordion_pro')) die();

/**
 * Remove all options
 */

$options = array(
  'loadCSS',
  'loadjQuery',
  'loadJS',
  'loadJSEasing',
  'version',
  'additional_css'
);

foreach($options as $key) {
  delete_option('accordion_pro_' . $key);
}

/**
 * Remove all posts
 */

$posts = get_posts(array(
  'numberposts'     => -1, // Show all of them.
  'offset'          => 0,
  'orderby'         => 'post_date',
  'order'           => 'asc',
  'post_type'       => 'accordion',
  'post_status'     => 'publish'
));

foreach($posts as $post) {
  wp_delete_post($post->ID);
}
?>

<h2><?php _e('Settings', 'accordion_pro'); ?></h2>
<?php
  $this->notices[] = __('Data Deleted', 'accordion_pro');
  $this->display_notices();
?>
<a href='<?php echo admin_url('?page=accordion_pro'); ?>'><?php _e('Back to Manage Accordions panel', 'accordion_pro'); ?></a>