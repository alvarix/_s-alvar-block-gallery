<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="container">
			<div class="flex">
				<div class="foot1">

					<h3><a  
						href="#"
						data-contact="YWx2YXJAYWx2YXJzaXJsaW4uY29t"
						data-subj="UGV0IFBvcnRyYWl0cyE="
						onfocus="this.href = 'mailto:' + atob(this.dataset.contact) + '?subject=' + atob(this.dataset.subj || '')"
						>
						Email Me!</a></h3>

					
				</div><!-- .foot1 -->
				<div class="foot2">
					<h3>Links</h3>
					<ul>
						<li><a target='_blank' href="https://instagram.com/alvar_en">Instagram</a></li>
						<li><a target='_blank' href="https://alvarix.etsy.com">Etsy</a></li>
						<li><a target='_blank' href="https://alvarsirlin.com">Web Development</a></li>
					</ul>
				</div><!-- .foot2 -->
			</div><!-- .flex -->
		
			<div class="copyright">
				<h4>Alvar Sirlin</h4> &copy; <?php echo date("Y"); ?> All Rights Reserved
			</div>
		</div><!-- .container -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
