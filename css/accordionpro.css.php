<?php
/**
 * Get accordion IDs
 */

$ids = explode('-', $_GET['ids']);

/**
 * Sanitize accordion IDs
 */

function sanitize($val) {
  return preg_replace('/[^0-9_]/', '', $val);
}

foreach ($ids as $key => $value) {
  $ids[$key] = '#accordionPro' . sanitize($value);
}

/**
 * Output as CSS
 */

header('Content-type: text/css');

/**
 * Accordion CSS
 */

$css = file_get_contents('accordionpro.min.css');
$output = '';

foreach ($ids as $key => $value) {
  $output .= str_replace('.accordionPro', $value, $css) . "\n";
}

/**
 * User created css
 */

$additional = file_get_contents('additional.css');

/**
 * Output
 */

echo $output, $additional;