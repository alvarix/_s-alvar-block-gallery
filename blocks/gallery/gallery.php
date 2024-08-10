<?php
/**
 * PP Gallery Block template.
 *
 * @param array $block The block settings and attributes.
 */

// Load values from ACF fields.
$item_posts = get_field('item'); // Posts from the 'item' field

// Query posts from the specified post type.
$args = array(
    'post_type' => get_field('select_post_type'),
    'posts_per_page' => -1, // Retrieve all posts
    'post__not_in' => wp_list_pluck($item_posts, 'ID'), // Exclude posts already in $item_posts
);

$select_query = new WP_Query($args);
$select_posts = $select_query->posts; // Get posts from the WP_Query

// Merge item posts with select posts and remove duplicates based on post ID.
$posts = array_merge((array) $item_posts, (array) $select_posts);

// Create class attribute allowing for custom "className" and "align" values.
$class_name = 'pp-gallery';

if (!empty($block['className'])) {
    $class_name .= ' ' . $block['className'];
}

if ($posts):
?>

<ul class="<?php echo esc_attr($class_name); ?>">
    <?php foreach ($posts as $post):
        $id = $post->ID;
        $title = get_the_title($post->ID);
        $link = get_the_permalink($post->ID);

        $thumb = get_field('thumb', $post->ID);
        if (!$thumb) {
            $thumb = get_the_post_thumbnail_url($post->ID, 'thumbnail');
        }
    ?>
    <li class="pp-gallery__image">
        <figure class="pp-gallery__image">
            <a class="post_thumbnail" post_id="<?= esc_attr($id); ?>" href="<?= esc_url($link); ?>">
                <img src="<?= esc_url($thumb); ?>" width="400" alt="<?= esc_attr($title); ?>">
            </a>
        </figure>
    </li>
    <?php endforeach; ?>
</ul>

<?php endif; wp_reset_postdata(); // Reset post data after the custom query. ?>

<div id="lightbox" style="display:none;">
    <div class="lightbox-content">
        <span class="close" aria-label="Close">&times;</span>
        <a href="#" class="prev" aria-label="Previous">&#10094;</a>
        <a href="#" class="next" aria-label="Next">&#10095;</a>
        <div class="lightbox-inner-content">
            <h2 id="lightbox-title"></h2>
            <img id="lightbox-image" src="" alt="Post Image">
            <div id="lightbox-description"></div>
        </div>
    </div>
</div>
