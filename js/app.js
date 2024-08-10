jQuery(document).ready(function($) {
    var currentIndex = 0;
    var posts = $('.post_thumbnail');

    function showLightbox(index) {
        var post = $(posts[index]);
        var id_post = post.attr('post_id');
        $.ajax({
            type: 'POST',
            url: my_ajax_object.ajax_url,
            data: {
                'id': id_post,
                'action': 'get_post_data',
            },
            success: function(response) {
                if (response.success) {
                    $('#lightbox-image').attr('src', response.data.image_url);
                    $('#lightbox-title').text(response.data.title);
                    $('#lightbox-description').html(response.data.description);
                    $('#lightbox-date').text(response.data.date);
                    $('#lightbox').fadeIn();
                } else {
                    alert('No data found for this post.');
                }
            },
            error: function() {
                alert("An error occurred while fetching the post data.");
            }
        });
    }

    function closeLightbox() {
        $('#lightbox').fadeOut();
    }

    function showNextImage() {
        currentIndex = (currentIndex === posts.length - 1) ? 0 : currentIndex + 1;
        showLightbox(currentIndex);
    }

    function showPreviousImage() {
        currentIndex = (currentIndex === 0) ? posts.length - 1 : currentIndex - 1;
        showLightbox(currentIndex);
    }

    $(".post_thumbnail").click(function(event) {
        event.preventDefault();
        currentIndex = $(this).index('.post_thumbnail');
        showLightbox(currentIndex);
    });

    $('.close').click(closeLightbox);
    $('.prev').click(showPreviousImage);
    $('.next').click(showNextImage);
    
    $(document).keyup(function(event) {
        if ($('#lightbox').is(':visible')) {
            switch(event.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowLeft":
                    showPreviousImage();
                    break;
                case "ArrowRight":
                    showNextImage();
                    break;
            }
        }
    });
});