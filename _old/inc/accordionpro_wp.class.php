<?php
/**
 * Prevents loading file directly
 */

if (!class_exists('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}

/**
 * AP CLASS
 */

class accordion_pro {

  /**
   * 'GLOBALS'
   */

  public
  $notices,
  $options = array(
    'version'                   => ACCORDION_PRO_VERSION,
    'additional_css'            => '#my_accordion { background: none }'
  ),
  $accContent = array(
    'content_title'             => array(),
    'content_caption'           => array(),
    'content_caption_enabled'   => array(),
    'content'                   => array()
  ),
  $jQueryOptions = array(
    'orientation'               => 'horizontal',
    'startClosed'               => false,
    'firstSlide'                => 1,
    'theme'                     => 'basic',
    'rounded'                   => false,
    'rtl'                       => false,
    'showSlideNumbers'          => true,
    'responsive'                => true,
    'scaleImages'               => true,
    'horizontalWidth'           => 900,
    'horizontalHeight'          => 300,
    'verticalWidth'             => '100%',
    'verticalHeight'            => 500,
    'verticalSlideHeight'       => 'fixed',
    'activateOn'                => 'click',
    'touchEnabled'              => true,
    'onSlideOpen'               => 'function() {}',
    'onSlideClose'              => 'function() {}',
    'autoPlay'                  => false,
    'cycleSpeed'                => 6000,
    'slideSpeed'                => 800,
    'easing'                    => 'ease-in-out',
    'pauseOnHover'              => true,
    'linkable'                  => false
  ),
  $css_ids = array();

  /**
   * INIT PLUGIN
   */

  /**
   * Constructor
   */

  public function __construct() {
    // Add the admin hooks/actions
    if (is_admin()) {
      add_action('admin_init', array($this, 'admin_init'));
      add_action('admin_menu', array($this, 'admin_menu'));
      add_action('wp_ajax_admin_slide_tmpl', array($this, 'admin_slide_tmpl'));
    }

    // Load scripts
    add_action('wp_enqueue_scripts', array($this, 'load_scripts'), 5);

    // Add the shortcode
    add_shortcode('accordion_pro', array($this, 'get_accordion'));

    // Enable ability to execute shortcodes nested in slide content
    add_filter('the_content', 'do_shortcode');

    // Enable ability to execute shortcodes within widgets
    add_filter('widget_text', 'do_shortcode');

    // Load dynamic styles
    add_action('get_footer', array($this, 'dynamic_styles'));

    // Clear dynamic css ids once page has finished loading
    add_action('shutdown', array($this, 'clear_dynamic_css_ids'));

    // Add the custom post type
    register_post_type(
      'accordion', array(
        'label'                 => 'Accordion',
        'description'           => '',
        'public'                => false,
        'show_in_menu'          => false,
        'capability_type'       => 'post',
        'hierarchical'          => false,
        'rewrite'               => false,
        'query_var'             => true,
        'supports'              => array(
          'title',
          'editor',
          'custom-fields',
          'author'
        ),
        'labels'                => array (
          'name'                => 'Accordions',
          'singular_name'       => 'Accordion',
          'menu_name'           => 'Accordions',
          'add_new'             => 'Add Accordion',
          'add_new_item'        => 'Add New Accordion',
          'edit'                => 'Edit',
          'edit_item'           => 'Edit Accordion',
          'new_item'            => 'New Accordion',
          'view'                => 'View Accordion',
          'view_item'           => 'View Accordion',
          'search_items'        => 'Search Accordions',
          'not_found'           => 'No Accordions Found',
          'not_found_in_trash'  => 'No Accordions Found in Trash',
          'parent'              => 'Parent Accordion'
        )
      )
    );
  }

  /**
   * Init options on plugin activation
   */

  public function init_options() {
    foreach ($this->options as $key => $value) {
      update_option('accordion_pro_' . $key, $value);
    }
  }

  /**
   * Upgrade previous version
   */

  public function upgrade() {
    // get existing accordions
    $posts = get_posts(array(
      'numberposts'     => -1, // Show all of them.
      'offset'          => 0,
      'orderby'         => 'post_date',
      'order'           => 'asc',
      'post_type'       => 'accordion',
      'post_status'     => 'publish'
    ));

    // loop through each existing accordion and resave it to rewrite it's cache
    foreach($posts as $post) {
      $this->update_accordionCache($this->get_accordion_settings($post->ID, true));
    }
  }

  /**
   * ADMIN SETUP
   */

  /**
   * Enqueue JS & CSS for admin section
   */

  public function admin_init() {
    // Check if we're on an accordion admin page
    // Strpos can return 0 as first index, so need to check strict equality
    if (isset($_GET) && isset($_GET['page']) && strpos($_GET['page'], 'accordion_pro') === false) return;

    // Disable autosave
    wp_deregister_script('autosave');

    // Register admin JS & CSS
    wp_register_style('accordion_pro_admin', WP_PLUGIN_URL . '/accordionpro_wp/css/admin.css');
    wp_register_script('accordion_pro_admin', WP_PLUGIN_URL . '/accordionpro_wp/js/admin.js', array('jquery'));

    // Enqueue admin JS & CSS
    wp_enqueue_script(array('jquery', 'accordion_pro_admin', 'editor', 'thickbox', 'media-upload'));
    wp_enqueue_style('accordion_pro_admin', 'thickbox');
  }

  /**
   * Add sidebar menu items
   */

  public function admin_menu() {
    // Accordion menu block
    add_menu_page(__('Accordion Pro', 'accordion_pro'), __('Accordion Pro', 'accordion_pro'), 'manage_options', 'accordion_pro', array($this, 'admin_settings'));

    // Manage page sub menu
    add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Manage Accordions', 'accordion_pro'), __('Manage Accordions', 'accordion_pro'), 'manage_options', 'accordion_pro', array($this, 'admin_settings'));

    // Create page sub menu
    add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Create Accordions', 'accordion_pro'), __('Create Accordions', 'accordion_pro'), 'manage_options', 'accordion_pro_add', array($this, 'admin_settings'));

    // Settings page
    add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Settings', 'accordion_pro'), __('Settings', 'accordion_pro'), 'manage_options', 'accordion_pro_settings', array($this, 'admin_settings'));
  }

  /**
   * ADMIN PAGES
   */

  /**
   * Router
   */

  public function admin_settings() {
    $get = array('page', 'mode', 'id');

    foreach ($get as $value) {
      if (isset($_GET[$value])) {
        $clean[$value] = $this->sanitize($_GET[$value]);
      }
    }

    // wrapper div
    echo '<div class="wrap"><div id="icon-themes" class="icon32"><br /></div>';

    // route pages
    if ($clean['page'] === 'accordion_pro' || $clean['page'] === 'accordion_pro_add') {
      if ($clean['page'] === 'accordion_pro_add') $clean['mode'] = 'add';

      if (isset($clean['mode']) && in_array($clean['mode'], array('add', 'edit'))) {
        // add or edit accordion
        if (isset($_POST['save_accordion']) && check_admin_referer('add_edit', 'accordion_pro')) {
          $this->update_accordion();
          $clean['id'] = $this->sanitize($_GET['id']);
        }

        // set post title for new slide...
        $accordion['post_title'] = '';

        // ... overwritten if slide exists
        if (isset($clean['id'])) {
          $accordion = $this->get_accordion_settings($clean['id'], true);
        }

        // inc slide manager page
        include('admin/manage.inc.php');
      } else {
        // If someone is adding/updating an accordion
        if (isset($_GET['delete_accordion']) && check_admin_referer('delete', 'accordion_pro')) {
          $this->delete_accordion($clean['id']);
        }

        // inc overview page
        include('admin/overview.inc.php');
      }
    } else if ($clean['page'] === 'accordion_pro_settings') {
      if ($clean['mode'] === 'delete_data') {
        // delete data
        include('admin/delete_data.inc.php');
      } else {
        // save settings
        if (isset($_POST['save_settings']) && check_admin_referer('save_settings', 'accordion_pro')) {
          $this->update_settings();
        }

        // inc setting page
        include('admin/settings.inc.php');
      }
    }

    echo '</div>';
  }

  /**
   * CREATE & MANAGE PAGES
   */

  /**
   * Returns new slide editor via ajax
   */

  public function admin_slide_tmpl() {
    $key = absint($_POST['data']['slideNum']);

    // inc slide template
    include('admin/template.inc.php');
    die();
  }

  /**
   * Updates post data, rebuilds cache
   */

  public function update_accordion() {
      $clean = array();
      if (isset($_GET['id'])) $clean['id'] = $this->sanitize($_GET['id']);
      if (isset($_POST['accordionName'])) $clean['title'] = $this->sanitize($_POST['accordionName']);

    // Build the post data
    $post = array(
        'post_title'      => $clean['title'],
        'post_content'    => '',
        'post_status'     => 'publish',
        'post_type'       => 'accordion', // Custom post types being used
        'comment_status'  => 'closed',
        'ping_status'     => 'closed'
    );

    // Check if we're updating or adding a new post
    if (isset($clean['id'])) {
      $post['ID'] = $clean['id'];
      unset($post['post_content']); // on slower systems, the accordion page may be blank for a few seconds while the cache updates.
      wp_insert_post($post);
      $this->notices[] = __('Accordion Updated. <a href="?page=accordion_pro">Manage</a>', 'accordion_pro');
    } else {
      $clean['id'] = $_GET['id'] = $post['ID'] = wp_insert_post($post); // So we can show the edit accordion page.
      $this->notices[] = __('Accordion Added. <a href="?page=accordion_pro">Manage</a>', 'accordion_pro');
    }

    // Update jQ opts
    foreach($this->jQueryOptions as $key => $default) {
      if ($key !== 'onSlideOpen' && $key !== 'onSlideClose') {
        $this->update_post_meta($post['ID'], $key, $this->sanitize($_POST[$key]));
      }
    }

    // The content title and content are arrays, so serialize them.
    $this->update_post_meta($post['ID'], 'content_title', base64_encode(serialize($_POST['content_title'])));
    $this->update_post_meta($post['ID'], 'content_caption', base64_encode(serialize($_POST['content_caption'])));
    $this->update_post_meta($post['ID'], 'content_caption_enabled', base64_encode(serialize($_POST['content_caption_enabled'])));
    $this->update_post_meta($post['ID'], 'content', base64_encode(serialize($_POST['content'])));

    // Now make the cache
    $this->update_accordionCache($this->get_accordion_settings($clean['id'], true));
  }

  /**
   * Generates html, saves to post content
   */

  public function update_accordionCache($accordion) {
    global $allowedposttags;

    $options = array();
    $extratags = array();
    $extratags['object'] = array(
      'height' => array(),
      'width' => array()
    );
    $extratags['param'] = array(
      'name' => array(),
      'value' => array()
    );
    $extratags['embed'] = array(
      'src' => array(),
      'type' => array(),
      'allowfullscreen' => array(),
      'allowscriptaccess' => array(),
      'height' => array(),
      'width' => array(),
      'wmode' => array()
    );
    $allowedextratags = array_merge($extratags, $allowedposttags);

    // Generate the 'post_content', which is a cached version of the html
    $accordion['post_content'] = '<div id="accordionPro'.$accordion['ID'].'" style="display:none"><ol>';

    // esc html on title
    // allow tags on caption
    // allow tags + extra tags (object, embed) for content
    if (!empty($accordion['acc_content']['content']) && is_array($accordion['acc_content']['content'])) {
      foreach($accordion['acc_content']['content'] as $key => $content) {

        // tab
        $accordion['post_content'] .= '<li><h2><span>';
        if ($accordion['acc_content']['content_title'][$key]) {
          $accordion['post_content'] .= esc_html($accordion['acc_content']['content_title'][$key]);
        } else {
          $accordion['post_content'] .= '&nbsp;';
        }

        // slide content
        $accordion['post_content'] .= '</span></h2><div>' . wp_kses_post($content, $allowedextratags);

        // caption callback
        $callback =  "$('#accordionPro" . $accordion['ID'] . "').find('.ap-caption').each(function() {";
        $callback .= "if (!$(this).parents('.slide').hasClass('selected')) { $(this).fadeOut();";
        $callback .= "} else { if (!$(this).is(':visible')) $(this).fadeIn(); } });";
        $accordion['jQuerySettings']['onSlideOpen'] = 'function() { ' . $callback . ' }';
        $accordion['jQuerySettings']['onSlideClose'] = 'function() { ' . $callback . ' }';

        // caption
        if (isset($accordion['acc_content']['content_caption_enabled'][$key])) {
          $accordion['post_content'] .= '<div class="ap-caption ap-caption-'.$key.'">'.wp_kses_post($accordion['acc_content']['content_caption'][$key]).'</div>';
        }

        // end post content
        $accordion['post_content'] .= '</div></li>';
      }
    }

    // end container
    $accordion['post_content'] .= '</ol><noscript><p>'.__('Please enable JavaScript to get the full experience.', 'accordion_pro').'</p></noscript></div>';

    // js to instantiate accordion
    $accordion['post_content'] .= '<script type="text/javascript">jQuery(function($) { $(\'#accordionPro'.$accordion['ID'].'\').accordionPro({ ';

    // accordion user opts
    foreach ($this->jQueryOptions as $key => $default) {
      $value = $accordion['jQuerySettings'][$key];
      if ($value !== $default) {
        // bool or number
        if (is_bool($default) || is_numeric($default)) {
          $options[] = $key . ': ' . $this->sanitize($value);
        } else if (strpos($default, 'function') === false) { // string, but not function
          $options[] = $key . ': \'' . addslashes($value) . '\'';
        } else {
          $options[] = $key . ':' . $value;
        }
      }
    }

    // save
    if (!empty($options)) $accordion['post_content'] .= implode(', ', $options);
    $accordion['post_content'] .= ' }); });'; // fixes FOUC
    $accordion['post_content'] .= '</script>';

    // insert post
    wp_insert_post($accordion);
  }

  /**
   * Delete accordion
   */

  public function delete_accordion($id, $notice=true) {
    wp_delete_post($id);
    if ($notice) $this->notices[] = __('Accordion Deleted.', 'accordion_pro');
  }

  /**
   * CLIENT-SIDE RENDERING
   */

  /**
   * Load scripts
   */

  public function load_scripts() {
    // Load jQuery in head
    wp_enqueue_script('jquery');

    // Register Accordion JS
    wp_register_script('accordion_pro', WP_PLUGIN_URL . '/accordionpro_wp/js/jquery.accordionpro.min.js', array('jquery'), '2.0.0', false);
  }

  /**
   * Dynamic styles
   */

  public function dynamic_styles() {
    // flatten array, convert to comma-separated string
    $ids = implode('-', $this->flatten($this->css_ids, array()));

    // load css
    wp_enqueue_style('accordion_pro', WP_PLUGIN_URL . '/accordionpro_wp/css/accordionpro.css.php?ids=' . $ids);
  }

  /**
   * Clear list of css ids once page has finished loading
   */

  public function clear_dynamic_css_ids() {
    $this->css_ids = array();
  }

  /**
   * Recursively search post content for shortcode
   */

  public function search_for_shortcode($content, $ids = array()) {
    // first occurence of shortcode
    $start = strpos($content, '[accordion_pro');
    $end = 0;

    if ($start !== false) {
      // first occurence of end bracket
      $end = strpos($content, ']', $start);

      // save id
      $ids[] = filter_var(substr($content, $start, $end - $start), FILTER_SANITIZE_NUMBER_INT);

      // truncate content
      $content = substr($content, $end);
      return $this->search_for_shortcode($content, $ids);
    }

    return $ids;
  }


  /**
   * Call accordion based on ID
   */

  public function get_accordion($atts) {
    if (isset($atts) && is_array($atts)) {
      // load accordion js only into page with shortcode
      wp_enqueue_script('accordion_pro');

      // cached accordion html
      $accordion = $this->get_accordion_settings($atts['id']);

      // save id for dynamic styles
      array_push($this->css_ids, $atts['id']);

      // return accordion
      return do_shortcode($accordion['post_content']);
    } else {
      return '';
    }
  }

  /**
   * Fetches accordion custom post
   */

  public function get_accordion_settings($id, $getPostMeta=false) {
    $accordion = get_post($id, 'ARRAY_A');

    if ($accordion === null) { // Meaning we can't find the accordion.
      $accordion['post_title'] = '';
    }

    if ($getPostMeta == true) {
      // Set slide contents
      $accordion['acc_content'] = $this->accContent;
      $accordion['acc_content_temp'] = '';

      foreach($this->accContent as $key=>$default) {
        $accordion['acc_content_temp'][$key] = $this->get_post_meta($id, $key);

        $accordion['acc_content'][$key] = $default;
        if ($accordion['acc_content_temp'][$key] != '') {
          $accordion['acc_content'][$key] = $this->get_post_meta($id, $key);
        }
      }
      unset($accordion['acc_content_temp']);

      if (!empty($accordion['acc_content']['content'])) {
        $accordion['acc_content']['content_title'] = unserialize(base64_decode($accordion['acc_content']['content_title']));
        $accordion['acc_content']['content_caption'] = unserialize(base64_decode($accordion['acc_content']['content_caption']));
        $accordion['acc_content']['content_caption_enabled'] = unserialize(base64_decode($accordion['acc_content']['content_caption_enabled']));
        $accordion['acc_content']['content'] = unserialize(base64_decode($accordion['acc_content']['content']));
      }

      // Set the jQuery settings
      $accordion['jQuerySettings'] = $this->jQueryOptions; // this sets the default options.
      $accordion['jQuerySettings_temp'] = ''; // used as a temp holding for checking if an option is empty.
      foreach ($this->jQueryOptions as $key=>$default) {
        $accordion['jQuerySettings_temp'][$key] = $this->get_post_meta($id, $key);

        // If it's blank, we will use the default, otherwise use the value form _temp
        $accordion['jQuerySettings'][$key] = $default;
        if ($accordion['jQuerySettings_temp'][$key] != '') {
          $accordion['jQuerySettings'][$key] = $this->get_post_meta($id, $key);
        }
      }
      unset($accordion['jQuerySettings_temp']); // free up a little memory.
    }

    return $accordion;
  }

  /**
   * SETTINGS PAGE
   */

  /**
   * Load option
   */

  public function get_option($option) {
    if ($option) return get_option('accordion_pro_' . $option);
  }

  /**
   * Load options // !!! THIS UPDATES!
   */

  public function load_options() {
    // Cycle through and update with the users settings.
    foreach ($this->options as $key => $value) {
      $this->options[$key] = get_option('accordion_pro_'.$key, $value);
    }
    return $this->options;
  }

  /**
   * Sets an option
   */

  public function set_option($key, $value) {
    // If the value is currently a boolean, keep it that way.
    // !!! empty string (of css) is a boolean!!
    // if (is_bool($this->options[$key])) $value = $value === '' ? false : true;

    // Update
    $this->options[$key] = $value;
    update_option('accordion_pro_' . $key, $value);
  }

  /**
   * Update settings
   */

  public function update_settings() {
    foreach ($this->options as $key => $value) {
      $data = $_POST[$key]; // !!! TODO

      // only user-changable option now is for custom css, but sanitize fn is too greedy
      // $this->set_option($key, $this->sanitize($_POST[$key]));
      $data = filter_var($_POST[$key], FILTER_SANITIZE_STRING);

      // set custom css option
      $this->set_option($key, $data);

      // write css to file (can't access WPDB from style php)
      if ($key === 'additional_css') {
        file_put_contents(WP_PLUGIN_DIR . '/accordionpro_wp/css/additional.css', $data);
      }
    }

    // Throw notice
    $this->notices[] = __('Settings Updated.', 'accordion_pro');
  }

  /**
   * Affix the plugin name to post metas
   */

  public function update_post_meta($id, $key, $value) {
    return update_post_meta($id, 'accordion_pro_'.$key, $value);
  }

  public function get_post_meta($id, $key) {
    return get_post_meta($id, 'accordion_pro_'.$key, true);
  }

  /**
   * PLUGIN HELPERS
   */

  /**
   * Display notices if set
   */

  public function display_notices() {
    if (is_array($this->notices)) {
      echo '<div id="setting-error-settings_updated" class="updated settings-error">';
      foreach ($this->notices as $notice) {
        echo '<p>'.$notice.'</p>';
      }
      echo '</div>';
    }
  }

  /**
   * UTILITIES
   */

  /**
   * Sanitize a string (alphanumeric plus dashes and underscore)
   */

  public function sanitize($val) {
    return preg_replace('/[^a-zA-Z0-9-_%]/', '', $val);
  }

  /**
   * Flatten an array
   */

  public function flatten($array, $return) {
    for ($x = 0; $x < count($array); $x++) {
      if (is_array($array) && is_array($array[$x])) {
        $return = $this->flatten($array[$x], $return);
      } else {
        if ($array[$x]) {
          $return[] = $array[$x];
        }
      }
    }
    return array_unique($return);
  }
}