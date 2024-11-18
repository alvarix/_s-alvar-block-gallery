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
        $dont_use_alt_thumb = get_field('dont_use_alt_thumb', $post->ID);
        $thumb_alt = get_field('thumb', $post->ID);
        $id = $post->ID;
        $title = get_the_title($post->ID);
        $link = get_the_permalink($post->ID);

        if( $dont_use_alt_thumb !=true && $thumb_alt !='' ){
            $thumb = $thumb_alt;
        } else {
            $thumb = get_the_post_thumbnail_url($post->ID, 'thumbnail');
        }
    ?>
    <li class="pp-gallery__image">
        <figure class="pp-gallery__image">
            <a class="post_thumbnail" title="<?= esc_attr($title); ?>" post_id="<?= esc_attr($id); ?>" href="<?= esc_url($link); ?>">
                <img src="<?= esc_url($thumb); ?>" width="400" alt="<?= esc_attr($title); ?>">
            </a>
        </figure>
    </li>
    <?php endforeach; ?>
</ul>

<?php endif; wp_reset_postdata(); // Reset post data after the custom query. ?>

<div id="lightbox" style="display:none;">
    <div id="spinner2" class='spinner'>
        <svg width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_qM83{animation:spinner_8HQG 1.05s infinite}.spinner_oXPr{animation-delay:.1s}.spinner_ZTLf{animation-delay:.2s}@keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)}100%{transform:translate(0)}}</style><circle class="spinner_qM83" cx="4" cy="12" r="3"/><circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3"/><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3"/></svg>
    </div>
    <div id="spinner" class='spinner'>
        <svg width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_qM83{animation:spinner_8HQG 1.05s infinite}.spinner_oXPr{animation-delay:.1s}.spinner_ZTLf{animation-delay:.2s}@keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)}100%{transform:translate(0)}}</style><circle class="spinner_qM83" cx="4" cy="12" r="3"/><circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3"/><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3"/></svg>
    </div>
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
