<?php
/**
 * PP Gallery Block template.
 *
 * @param array $block The block settings and attributes.
 */

// Load values and assign defaults.
$item  = get_field( 'item' );


// Create class attribute allowing for custom "className" and "align" values.
$class_name = 'pp-gallery';

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

if($item):

?>

<ul class="<?php echo esc_attr( $class_name ); ?>" >
		<?php foreach ($item as $item ):
			$id = $item->ID;
			$title = get_the_title( $item->ID );
			$link = get_the_permalink( $item->ID );
			if (get_field( 'thumb', $item->ID ) != '') {
				$thumb = get_field( 'thumb', $item->ID );
			} else {
				$thumb = get_the_post_thumbnail_url(  $item->ID, 'thumbnail');
			}
			?>
	<li class="pp-gallery__image">
		<figure class="pp-gallery__image">
			<a class='post_thumbnail' post_id='<?=$id ?>' href='<?=$link ?>'>
				<img src='<?=$thumb?>' width='400'>
			</a>
		
	</li>
		<?php endforeach; 
		endif; ?>
</ul>
<div id="lightbox" style="display:none;">
    <div class="lightbox-content">
        <span class="close">&times;</span>
        <a href="#" class="prev">&#10094;</a>
        <a href="#" class="next">&#10095;</a>
		<div class="lightbox-inner-content">

			<h2 id="lightbox-title"></h2>
 	 	    <!--<p id="lightbox-date"></p>-->
   	      	<img id="lightbox-image" src="" alt="Post Image">
  	      	<div id="lightbox-description"></div>
		</div>
    </div>
</div>
