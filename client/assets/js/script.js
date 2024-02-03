function toggleZoom() {
    const body = document.body;
    const zoomButton = document.getElementById('zoomButton');

    // Toggle the zoom class on the body
    body.classList.toggle("zoom-75");

    // Update the button text based on the zoom state
    if (body.classList.contains("zoom-75")) {
        zoomButton.innerText = "Reset";
    } else {
        zoomButton.innerText = "Zoom 75%";
    }
}
document.addEventListener('DOMContentLoaded', function () {

  
    // Check if it's the first visit by checking for a cookie or using local storage
    // For simplicity, let's use local storage in this example
    if (!localStorage.getItem('visited')) {
        // Set a flag to indicate that the user has visited the site
        localStorage.setItem('visited', 'true');

        // Redirect to the home section if it's the first visit
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            window.location.hash = '#home';
        }
    }

    // Check if the current path is the root and the contact section is active, then redirect to home
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        document.querySelector('nav ul li a.active').classList.remove('active');
        document.querySelector('nav ul li a[href="#home"]').classList.add('active');
        document.querySelector('main > section.active').classList.remove('active');
        document.querySelector('main > section#home').classList.add('active');
    }

    let navLinks = document.querySelectorAll('a.inner-link');

    navLinks.forEach((item) => {
        item.addEventListener('click', function () {
            console.log(item);
            document.querySelector('nav ul li a.active').classList.remove('active');
            document.querySelector(`nav ul li a[href='${item.getAttribute('href')}']`).classList.add('active');
            document.querySelector('main > section.active').classList.remove('active');
            document.querySelector(`main > section${item.getAttribute('href')}`).classList.add('active');
        });
    });

document.querySelector('#sidebar .toggle-sidebar').addEventListener('click', function () {
    document.querySelector('#sidebar').classList.toggle('open')
})



var options = {
    strings: ['Full-Stack web developer', 'Devops-Engineer', 'Frontend-Backend Engineer'],
    loop: true,
    typeSpeed: 70,
    backSpeed: 10
};

new Typed('.field h2', options);



for (let i = 1; i <= 15; i++) {
    let meteor = document.createElement('span');
    meteor.classList = 'meteor'
    document.querySelector('#home .meteor-shower').append(meteor);
}



const shuffleInstance = new Shuffle(document.querySelector('#my_work .work-items'), {
    itemSelector: '.item'
});

const filterButtons = document.querySelectorAll('#my_work .filters button')

filterButtons.forEach((item) => {
    item.addEventListener('click', workFilter)
})


function workFilter() {
    const clickedButton = event.currentTarget;
    const clickedButtonGroup = clickedButton.getAttribute('data-group');
    const activeButton = document.querySelector('#my_work .filters button.active');

    activeButton.classList.remove('active');
    clickedButton.classList.add("active");

    shuffleInstance.filter(clickedButtonGroup)
}

var workModal = new bootstrap.Modal(document.getElementById('workModal'))
const workElements = document.querySelectorAll("#my_work .work-items .wrap");

workElements.forEach((item) => {
    item.addEventListener('click', function () {
        document.querySelector('#workModal .modal-body img').setAttribute('src', item.getAttribute('data-image'))
        document.querySelector('#workModal .modal-body .title').innerText = item.getAttribute('data-title')
        document.querySelector('#workModal .modal-body .description').innerText = item.getAttribute('data-description')
        document.querySelector('#workModal .modal-body .client .value').innerText = item.getAttribute('data-client')
        document.querySelector('#workModal .modal-body .completed .value').innerText = item.getAttribute('data-completed')
        document.querySelector('#workModal .modal-body .skills .value').innerText = item.getAttribute('data-skills')
        document.querySelector('#workModal .modal-body .project-link a').setAttribute('href', item.getAttribute('data-project-link'))

        workModal.show();
    })
})

var workModalElement = document.getElementById('workModal')
workModalElement.addEventListener('show.bs.modal', function (event) {
    document.getElementById('my_work').classList.add('blur');
    document.getElementById('sidebar').classList.add('blur');
})

workModalElement.addEventListener('hide.bs.modal', function (event) {
    document.getElementById('my_work').classList.remove('blur');
    document.getElementById('sidebar').classList.remove('blur');
})





let testimonialImages = document.querySelectorAll('#testimonial .images img');

testimonialImages.forEach((item, index) => {
    let position = index + 1;

    item.addEventListener('click', function () {
        document.querySelector('#testimonial .images img.active').classList.remove('active')
        document.querySelector(`#testimonial .images img:nth-child(${position})`).classList.add('active')

        document.querySelector('#testimonial .comments .item.active').classList.remove('active')
        document.querySelector(`#testimonial .comments .item:nth-child(${position})`).classList.add('active')
    })
})





let contactFromItems = document.querySelectorAll('#contact_me .form input, #contact_me .form textarea');

contactFromItems.forEach((item) => {
    item.addEventListener('focus', function () {
        item.parentElement.classList.add('focus')
    })

    item.addEventListener('blur', function () {
        if (!item.value) {
            item.parentElement.classList.remove('focus')
        }
    })
})


document.getElementById('successPopup').style.display = 'none';

function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}
// function showPopup() {
//     hideLoader(); // Hide the loader when showing the popup

//     const overlay = document.createElement('div');
//     overlay.classList.add('overlay');
//     document.body.appendChild(overlay);

//     const popup = document.getElementById('successPopup');
//     popup.style.display = 'block';

//     // Add an event listener to close the popup when overlay is clicked
//     overlay.addEventListener('click', closePopup);

//     // Add an event listener to close the popup when close button is clicked
//     const closeButton = document.querySelector('.close-btn');
//     closeButton.addEventListener('click', closePopup);

//     // Add a class to the body to disable content
//     document.body.classList.add('popup-open');
// }
function showPopup() {
    hideLoader(); // Hide the loader when showing the popup

    // Clear the form
    document.getElementById('contactForm').reset();

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const popup = document.getElementById('successPopup');
    popup.style.display = 'block';

    // Add an event listener to close the popup when overlay is clicked
    overlay.addEventListener('click', closePopup);

    // Add an event listener to close the popup when close button is clicked
    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', closePopup);

    // Add a class to the body to disable content
    document.body.classList.add('popup-open');
}
function closePopup() {
    const overlay = document.querySelector('.overlay');
    const popup = document.getElementById('successPopup');

    // Remove the overlay and hide the popup
    overlay.parentNode.removeChild(overlay);
    popup.style.display = 'none';

    // Remove the class from the body to enable content
    document.body.classList.remove('popup-open');
}

// function showPopup() {
//     hideLoader(); // Hide the loader when showing the popup

//     const overlay = document.createElement('div');
//     overlay.classList.add('overlay');
//     document.body.appendChild(overlay);

//     const popup = document.getElementById('successPopup');
//     popup.style.display = 'block';

//     // Add a class to the body to disable content
//     document.body.classList.add('popup-open');

//     // Add an event listener to close the popup when overlay is clicked
//     overlay.addEventListener('click', closePopup);
// }

// Your existing form submission code
// document.getElementById('contactForm').addEventListener('submit', function (event) {
//     event.preventDefault();
//     showLoader(); // Show loader before making the fetch request

//     const formData = new FormData(this);

//     const jsonData = {};
//     formData.forEach((value, key) => {
//         jsonData[key] = value;
//     });

//     fetch('/send-email', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jsonData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // Handle success or display a confirmation message to the user

//         // Show success popup
//         showPopup();
//     })
//     .catch(error => {
//         console.error(error);
//         // Handle errors or display an error message to the user
//     });
// });

    // Your existing form submission code
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Check if the form is empty
    const formData = new FormData(this);
    let formIsEmpty = true;

    formData.forEach((value) => {
        if (value.trim() !== '') {
            formIsEmpty = false;
            return;
        }
    });

    if (formIsEmpty) {
        // Show popup for empty form
        alert('Please fill in the form before submitting.');
        return;
    }

    showLoader(); // Show loader before making the fetch request

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle success or display a confirmation message to the user

        // Show success popup
        showPopup();
    })
    .catch(error => {
        console.error(error);
        // Handle errors or display an error message to the user
    });
});


// // Your existing closePopup function
// function closePopup() {
//     const overlay = document.querySelector('.overlay');
//     const popup = document.getElementById('successPopup');

//     // Remove the overlay and hide the popup
//     overlay.parentNode.removeChild(overlay);
//     popup.style.display = 'none';

//     // Remove the class from the body to enable content
//     document.body.classList.remove('popup-open');
// }

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for dark mode toggle button
document.querySelector('.toggle-mode').addEventListener('click', toggleDarkMode);
});


