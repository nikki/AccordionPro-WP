<?php
/*
Plugin Name:    Accordion Pro WP
Plugin URI:     http://stitchui.com/accordion-pro-wp/
Description:    Create jQuery powered responsive accordions to embed into your WordPress posts &amp; pages.
Version:        3.0.0
Author:         Stitch UI
Author URI:     http://stitchui.com
Text Domain:    accordion_pro
Copyright:      (c) 2011-2015 Stitch UI
*/

/**
 * Prevents loading file directly
 */

if (!class_exists('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}

/**
 * Define plugin version
 */

define('ACCORDION_PRO_VERSION', '3.0.0');

/**
 * Require class
 */

require('inc/accordionpro_wp.class.php');

/**
 * Instantiate plugin
 */

global $accordion_pro;
$accordion_pro = new accordion_pro();

/**
 * Activation hook
 */

register_activation_hook(__FILE__, 'init_options');
function init_options() {
  global $accordion_pro;
  $v = $accordion_pro->load_options();

  // upgrade previous version
  if ($v['version'] != '3.0.0') {
    $accordion_pro->upgrade();
  }

  // init options
  $accordion_pro->init_options();
}