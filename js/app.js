
//
// Custom Lighbox
//

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


//
// Shrinking sticky header onScroll
//


window.addEventListener("scroll", () => {
    const scalingElement = document.querySelector("header");
    const scrollY = window.scrollY || window.pageYOffset;
  
    // If scrolled more than 100px, add the scaling class
    if (scrollY > 100) {
      scalingElement.classList.add("scroll");
    } else {
      scalingElement.classList.remove("scroll");
    }
  });





//
// Active Hash Link
//
document.addEventListener("DOMContentLoaded", () => {
    // Select all the links that reference sections with '#' in href
    const navLinks = document.querySelectorAll("#primary-menu .menu-item a[href^='#']");
  
    // Log the NodeList to ensure we're selecting the right elements
    console.log(navLinks);
  
    if (navLinks.length === 0) {
      console.error("No internal links found!");
      return;
    }
  
    // Function to remove 'active' class from all links
    const removeActiveClasses = () => {
      navLinks.forEach(link => link.classList.remove("active"));
    };
  
    // Function to add 'active' class to the current link
    const setActiveLink = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better triggering
  
      navLinks.forEach(link => {
        const sectionId = link.getAttribute("href");
        const sectionElement = document.querySelector(sectionId);
  
        if (sectionElement) {
          const sectionOffset = sectionElement.offsetTop;
  
          // Add 'active' class if the scroll position is within the section
          if (
            scrollPosition >= sectionOffset &&
            scrollPosition < sectionOffset + sectionElement.offsetHeight
          ) {
            removeActiveClasses();
            link.classList.add("active");
            console.log(`Active link:`, link.getAttribute("href"));
          }
        }
      });
    };
  
    // Listen for scroll events
    window.addEventListener("scroll", setActiveLink);
  
    // Handle initial load (in case of page refresh with a hash)
    window.addEventListener("load", () => {
      setActiveLink();
    });
  
    // Handle link clicks for smooth scrolling
    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default hash behavior
  
        // Remove 'active' class from all links
        removeActiveClasses();
  
        // Add 'active' class to the clicked link
        link.classList.add("active");
  
        // Smooth scroll to the section
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop, // Adjust for fixed nav bar
            behavior: 'smooth'
          });
          console.log(`Scrolling to:`, targetSection.id);
        }
      });
    });
  });