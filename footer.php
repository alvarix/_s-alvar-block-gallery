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

					<h2><a  
						href="#"
						data-contact="YWx2YXJAYWx2YXJzaXJsaW4uY29t"
						data-subj="UGV0IFBvcnRyYWl0cyE="
						onfocus="this.href = 'mailto:' + atob(this.dataset.contact) + '?subject=' + atob(this.dataset.subj || '')"
						>
						Email Me!</a></h2>

					<div id="mc_embed_signup">
						<form action="https://nyc.us9.list-manage.com/subscribe/post?u=e70c5037279d21943c158f3fa&amp;id=2b53bbbdcd&amp;f_id=00bdc2e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
							<div id="mc_embed_signup_scroll">
								<div class="mc-field-group"><input type="email" placeholder="Newsletter Signup" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""></div>
							</div>
							<div id="mce-responses" class="clear foot">
								<div class="response" id="mce-error-response" style="display: none;"></div>
								<div class="response" id="mce-success-response" style="display: none;"></div>
							</div>
							<div aria-hidden="true" style="position: absolute; left: -5000px;">
								/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
								<input type="text" name="b_e70c5037279d21943c158f3fa_2b53bbbdcd" tabindex="-1" value="">
							</div>
							<div class="optionalParent">
								<div class="clear foot btn">
									<input type="submit" name="subscribe" id="mc-embedded-subscribe"  value="Subscribe">
								</div>
							</div>
						</form>
					</div><!-- mc_embed_signup -->
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
