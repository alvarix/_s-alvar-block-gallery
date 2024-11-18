/**
 * Dynamically generates links to change the number of columns in a .pp-gallery element.
 * Each link, when clicked, adjusts the width of .pp-gallery li elements to match the selected column count.
 */
function setupGalleryColumns() {
  // Select the .pp-gallery element and check if it exists
  const gallery = document.querySelector('.pp-gallery');
  if (!gallery) return;

  // Calculate the initial number of columns based on the width of the first li element
  const firstItem = gallery.querySelector('li');
  if (!firstItem) return;

  const itemWidth = parseFloat(window.getComputedStyle(firstItem).width);
  const galleryWidth = parseFloat(window.getComputedStyle(gallery).width);
  const currentColumnCount = Math.round(galleryWidth / itemWidth);

  // Create a container for the column selection links
  const linkContainer = document.createElement('div');
  linkContainer.classList.add('column-links', 'container');
  linkContainer.style.marginBottom = '10px';
  gallery.before(linkContainer);

  // Generate links to set column counts from 1 up to the currentColumnCount
  for (let i = 1; i <= currentColumnCount; i++) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = `${i} Column${i > 1 ? 's' : ''}`;
    link.style.marginRight = '10px';

    // Set column layout on click
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setGalleryColumns(i);
    });

    // Append link to the container
    linkContainer.appendChild(link);
  }

  /**
   * Adjusts the width of each li element in .pp-gallery based on the selected column count.
   * @param {number} columns - Number of columns to set.
   */
  function setGalleryColumns(columns) {
    const items = gallery.querySelectorAll('li');
    const columnWidth = (100 / columns) + '%';

    // Apply the calculated width to each list item
    items.forEach(item => {
      item.style.width = columnWidth;
    });
  }
}


//
// Custom Lighbox
//

jQuery(document).ready(function($) {

    $(".wp-block-group__inner-container").addClass('container');

    var currentIndex = 0;
    var posts = $('.post_thumbnail');

    function showLightbox(index) {
        var post = $(posts[index]);
        var id_post = post.attr('post_id');


        $('#spinner').show();

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
            },
            complete: function() {
                $('#spinner').hide();
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

  //
  // Shrinking sticky header onScroll
  //

  function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastTime >= wait) {
        fn(...args);
        lastTime = now;
      }
    };
  }

    const scalingElement = document.querySelector("header");

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
    
      // If scrolled more than 100px, add the scaling class
      if (scrollY > 100) {
        scalingElement.classList.add("scroll");
      } else {
        scalingElement.classList.remove("scroll");
      }
    };
    
    // Throttle the scroll event to fire every 100ms
    window.addEventListener("scroll", throttle(handleScroll, 100));
    
    


});



//
// Active Hash Link
//
document.addEventListener("DOMContentLoaded", () => {
// Run the function to set up the column links and functionality
setupGalleryColumns();


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
            top: targetSection.offsetTop - 35, // Adjust for fixed nav bar
            behavior: 'smooth'
          });
          console.log(`Scrolling to:`, targetSection.id);
        }
      });
    });
  });