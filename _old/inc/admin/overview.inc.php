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

<?php
    $get = array('order', 'orderby');

    foreach ($get as $key) {
        if (isset($_GET[$key])) {
            $clean[$key] = $this->sanitize($_GET[$key]);
        }
    }
?>

<h2><?php _e('Accordion Pro', 'accordion_pro'); ?> <a href="admin.php?page=accordion_pro_add" class="add-new-h2"><?php _e('Add New Accordion', 'accordion_pro'); ?></a></h2>

<?php $this->display_notices(); ?>

<p><?php _e('Use the table below to manage your accordions.', 'accordion_pro'); ?></p>

<table class="wp-list-table widefat fixed users" cellspacing="0">
	<tr>
		<th scope="col"  class="manage-column sortable desc">
			<a href="admin.php?page=accordion_pro&orderby=name&order=<?php echo $clean['order'] === 'desc' ? 'asc' : 'desc'; ?>">
				<span><?php _e('Name', 'accordion_pro'); ?></span>
				<span class="sorting-indicator"></span>
			</a>
		</th>
		<th scope="col"  class="manage-column sortable desc">
			<a href="admin.php?page=accordion_pro&orderby=date-added&order=<?php echo $clean['order'] === 'desc' ? 'asc' : 'desc'; ?>">
				<span><?php _e('Date Added', 'accordion_pro'); ?></span>
				<span class="sorting-indicator"></span>
			</a>
		</th>
		<th scope="col" class="manage-column sortable desc"><?php _e('Shortcode', 'accordion_pro'); ?></th>
		<th scope="col" class="manage-column sortable desc"><?php _e('PHP Code', 'accordion_pro'); ?></th>
		<th scope="col" class="manage-column column-posts"><?php _e('Edit', 'accordion_pro'); ?></th>
		<th scope="col" class="manage-column column-posts"><?php _e('Delete', 'accordion_pro'); ?></th>
	</tr>
	</thead>

	<tbody>
	<?php

        $posts = get_posts(array(
            'numberposts'     => -1, // Show all of them.
            'offset'          => 0,
            'orderby'         => isset($clean['orderby']) ? $clean['orderby'] : 'post_date',
            'order'           => isset($clean['order']) && $clean['order'] === 'desc' ? 'asc' : 'desc',
            'post_type'       => 'accordion',
            'post_status'     => 'publish'
            )
        );

        foreach($posts as $post) {
            $url = 'admin.php?page=accordion_pro&delete_accordion=true&id=' . $post->ID;
    ?>

        	<tr id="accordion-<?php echo $post->ID; ?>">
    			<td><strong><a href="admin.php?page=accordion_pro&mode=edit&id=<?php echo $post->ID; ?>"><?php echo $post->post_title; ?></a></strong><br>
    				<div class="row-actions">
    						<a href="admin.php?page=accordion_pro&mode=edit&id=<?php echo $post->ID; ?>"><?php _e('Edit', 'accordion_pro'); ?></a>
    				</div>
    			</td>
    			<td><?php echo $post->post_date; ?></td>

    			<td><input type="text" value="[accordion_pro id='<?php echo $post->ID; ?>']" readonly /></td>
    			<td><input type="text" value="&lt;?php echo do_shortcode(&quot;[accordion_pro id='<?php echo $post->ID; ?>']&quot;); ?&gt;" readonly /></td>
    			<td><a href="admin.php?page=accordion_pro&mode=edit&id=<?php echo $post->ID; ?>"><?php _e('Edit', 'accordion_pro'); ?></a></td>
    			<td><a href="<?php echo wp_nonce_url($url, 'delete') ?>" class="ap-del-acc" data-confirm="<?php _e('Are you sure you want to delete: ', 'accordion_pro'); echo $post->post_title; ?>"><?php _e('Delete', 'accordion_pro'); ?></a></td>
    		</tr>

    <?php
        }
    ?>
	</tbody>
</table>