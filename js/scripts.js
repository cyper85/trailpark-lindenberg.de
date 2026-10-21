/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Lightbox for photo galleries
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const modal = new bootstrap.Modal(lightbox);
        const image = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('#lightbox-caption');
        let links = [];
        let current = 0;

        const show = index => {
            current = (index + links.length) % links.length;
            const link = links[current];
            const thumb = link.querySelector('img');
            image.src = link.href;
            image.alt = thumb.alt;
            caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
        };

        document.querySelectorAll('.gallery').forEach(gallery => {
            const galleryLinks = [].slice.call(gallery.querySelectorAll('.gallery-link'));
            galleryLinks.forEach((link, index) => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    links = galleryLinks;
                    show(index);
                    modal.show();
                });
            });
        });

        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
        lightbox.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft') show(current - 1);
            if (event.key === 'ArrowRight') show(current + 1);
        });
    }

});
