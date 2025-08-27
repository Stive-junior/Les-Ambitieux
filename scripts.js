document.addEventListener('DOMContentLoaded', () => {
    
    document.body.style.visibility = 'visible';

 const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

if (mobileMenuBtn && mobileMenu && menuIcon) {
    gsap.set(mobileMenu, { height: 0, opacity: 0, visibility: 'hidden' });
    let isOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        mobileMenu.classList.toggle('hidden');
        menuIcon.style.transform = 'perspective(1000px) rotateY(180deg)';


        // Appliquer la nouvelle icône SVG avec effet d'opacité rapide
        gsap.to(menuIcon, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                menuIcon.innerHTML = isOpen
                    ? `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20 24H4c-2.2 0-4-1.8-4-4V4c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4zM4 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z"/>
  <path d="M23 9H1c-.6 0-1-.4-1-1s.4-1 1-1h22c.6 0 1 .4 1 1s-.4 1-1 1z"/>
  <path d="M12 18c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3 3c-.2.2-.4.3-.7.3z"/>
  <path d="M12 18c-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3 3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"/>
</svg>
`
                    : `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M20 24H4c-2.2 0-4-1.8-4-4V4c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4zM4 2C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z"/>
  <path d="M8 24c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1s1 .4 1 1v22c0 .6-.4 1-1 1z"/>
  <path d="M14 13c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3 3c-.2.2-.4.3-.7.3z"/>
  <path d="M17 16c-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3 3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"/>
</svg>
`;
                gsap.fromTo(menuIcon, 
                    { rotationY: isOpen ? -90 : 90, scale: 0.8, opacity: 0 ,   },
                    { 
                        rotationY: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'back.out(1.4)',
                        transformOrigin: 'center center'
                    }
                );
            }
        });

        // Animation du menu mobile
        gsap.to(mobileMenu, {
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
        });
    });
}


    // Matrix Background Animation
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4f46e5';
            ctx.font = `${fontSize}px 'Exo 2', sans-serif`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);

        window.addEventListener('resize', () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            drops.length = Math.floor(canvas.width / fontSize);
            drops.fill(1);
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate nav links
    gsap.fromTo('.nav-link', 
        { y: -20, opacity: 0, visibility: 'hidden' },
        {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto'
        }
    );

    // Animate section titles
    gsap.utils.toArray('h2').forEach((title) => {
        gsap.fromTo(title, 
            { y: 50, opacity: 0, visibility: 'hidden' },
            {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                overwrite: 'auto'
            }
        );
    });

    // Animate cards
    gsap.utils.toArray('.holographic-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 100, opacity: 0, visibility: 'hidden' },
            {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                overwrite: 'auto'
            }
        );
    });

    // Animate FAQ items (if present)
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        gsap.utils.toArray('.faq-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { x: -50, opacity: 0, visibility: 'hidden' },
                {
                    x: 0,
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    overwrite: 'auto'
                }
            );
        });
    }

    // Animate counter (if present)
    const inquiryCounter = document.getElementById('inquiry-counter');
    if (inquiryCounter) {
        gsap.fromTo(inquiryCounter, 
            { scale: 0.5, opacity: 0, visibility: 'hidden' },
            {
                scale: 1,
                opacity: 1,
                visibility: 'visible',
                duration: 1,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: inquiryCounter,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                overwrite: 'auto'
            }
        );
    }

   


    // Particle Network Animation
    const particleContainer = document.querySelector('.particle-network');
    if (particleContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particleContainer.appendChild(particle);
        }
    }

    const coursesContainer = document.getElementById('courses-container');
    if (coursesContainer) {
        fetch('https://github.com/Stive-junior/Les-Ambitieux/blob/5843f3ec62b3bbda4b3b4aabf1711d4c6974424d/db.json')
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau lors du chargement de db.json');
                return response.json();
            })
            .then(data => {
                coursesContainer.innerHTML = ''; 
                data.courses.forEach((course, index) => {
                    const courseCard = document.createElement('div');
                    courseCard.className = 'holographic-card bg-slate-800/50 backdrop-blur-md rounded-xl p-8 card-hover glow';
                    courseCard.setAttribute('data-aos', 'fade-up');
                    courseCard.setAttribute('data-aos-delay', `${index * 100}`);
                    courseCard.innerHTML = `
                        <h3 class="text-2xl font-semibold mb-4">${course.title}</h3>
                        <p class="text-gray-300 mb-4">${course.description}</p>
                        <p class="text-xl font-bold text-gradient mb-4">${course.level}</p>
                        <a href="contact.html" class="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold glow"><i class="fas fa-credit-card"></i> S'inscrire</a>
                    `;
                    coursesContainer.appendChild(courseCard);
                });
                // Reinitialize AOS after dynamic content load
                AOS.init({ once: true, duration: 1000 });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des cours:', error);
                coursesContainer.innerHTML = '<p class="text-red-400 text-center">Erreur lors du chargement des cours. Veuillez réessayer plus tard.</p>';
            });
    }

    fetch('https://raw.githubusercontent.com/Stive-junior/Les-Ambitieux/79c7df567b87bc7c1edfba4bfde776667cb87e2e/db.json')
        .then(response => response.json())
        .then(data => {

            const testimonialsSection = document.getElementById('testimonials');
            if (testimonialsSection && data.testimonials) {
                const testimonialContainer = testimonialsSection.querySelector('.grid');
                testimonialContainer.innerHTML = data.testimonials.map((t, i) => `
                    <div class="holographic-card bg-slate-800/50 backdrop-blur-md rounded-xl p-8 card-hover glow relative" data-aos="fade-up" data-aos-delay="${100 + i * 100}">
                        <svg class="absolute top-4 right-4 w-12 h-12 text-indigo-400 opacity-50 svg-path" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="${i % 3 === 0 ? 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' : i % 3 === 1 ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M17 20h5v-2a2 2 0 00-2-2h-3m-3 4h-5v-2a2 2 0 012-2h3m-7-6h12a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z'}"></path>
                        </svg>
                        <img src="${t.image || 'https://via.placeholder.com/600x400?text=Témoignage'}" alt="Témoignage ${t.name}" class="w-full h-48 object-cover rounded-lg mb-6" onerror="this.src='https://via.placeholder.com/600x400?text=Témoignage'; this.onerror=null;">
                        <p class="text-gray-300 italic">"${t.message}"</p>
                        <p class="text-white font-semibold mt-4">${t.name} – ${t.location}</p>
                    </div>
                `).join('');
            }
        })
        .catch(error => console.error('Error loading db.json:', error));


        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            const map = L.map('map-container').setView([3.8480, 11.5021], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            fetch('https://raw.githubusercontent.com/Stive-junior/Les-Ambitieux/79c7df567b87bc7c1edfba4bfde776667cb87e2e/db.json')
            .then(response => {
                    if (!response.ok) throw new Error('Erreur réseau lors du chargement de db.json');
                    return response.json();
                })
                .then(data => {
                    // Populate map markers
                    data.locations.forEach(location => {
                        L.marker(location.coordinates).addTo(map)
                            .bindPopup(`
                                <b>${location.city}</b><br>
                                ${location.address}<br>
                                Téléphone: +237 123 456 789<br>
                                Horaires: Lun-Ven 8h-18h, Sam 9h-14h
                            `)
                            .bindTooltip(location.city, { permanent: false, direction: 'top' });
                    });

                    // Populate locations section
                    const locationsContainer = document.getElementById('locations-container');
                    locationsContainer.innerHTML = '';
                    data.locations.forEach((location, index) => {
                        const locationCard = document.createElement('div');
                        locationCard.className = 'flip-card h-96 relative';
                        locationCard.setAttribute('data-aos', 'zoom-in');
                        locationCard.setAttribute('data-aos-delay', `${index * 100}`);
                        locationCard.innerHTML = `
                            <div class="flip-card-inner h-full">
                                <div class="flip-card-front bg-slate-800/50 backdrop-blur-md rounded-xl p-6 glow">

                               

                                    <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="${location.city}" class="w-full h-40 object-cover rounded-lg mb-6" onerror="this.src='https://via.placeholder.com/600x400?text=${location.city}'; this.onerror=null;">
                                    <h3 class="text-2xl font-semibold mb-2"><i class="fas fa-map-marker-alt"></i> ${location.city}</h3>
                                    <p class="text-gray-300">Un espace moderne conçu pour un apprentissage optimal.</p>
                                    

                                <i class="fas fa-chalkboard-teacher absolute bottom-5 text-[3rem] right-6  text-white-200 opacity-50  bottom-4 " ></i>
                                       
                                </div>
                                <div class="flip-card-back bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 flex flex-col justify-center">
                                    <h3 class="text-2xl font-semibold mb-4">Détails</h3>
                                    <p class="text-gray-200">
                                        <strong>Adresse:</strong> ${location.address}<br>
                                        <strong>Téléphone:</strong> +237 123 456 789<br>
                                        <strong>Horaires:</strong> Lun-Ven 8h-18h, Sam 9h-14h<br>
                                        <strong>Équipements:</strong> Salles climatisées, Wi-Fi, tableaux interactifs
                                    </p>
                                    <div>
                                    <a href="contact.html" class="mt-4 inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-lg hover:bg-gray-100 transition-colors">
                                        Contacter
                                        <i class="fas fa-arrow-right ml-2"></i>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        `;
                        locationsContainer.appendChild(locationCard);
                    });

                    // Home Tutoring Card
                    const homeTutoringCard = document.createElement('div');
                    homeTutoringCard.className = 'flip-card h-96 relative';
                    homeTutoringCard.setAttribute('data-aos', 'zoom-in');
                    homeTutoringCard.setAttribute('data-aos-delay', '200');
                    homeTutoringCard.innerHTML = `
                        <div class="flip-card-inner h-full">
                            <div class="flip-card-front bg-slate-800/50 backdrop-blur-md rounded-xl p-6 glow">
                               
                            <svg class="absolute top-4 right-6 w-12 h-12 text-white-200 opacity-50  " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M12 4h9"></path>
                                        <path d="M4 9h16"></path>
                                        <path d="M4 15h16"></path>
                                    </svg>

                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cours à domicile" class="w-full h-40 object-cover rounded-lg mb-6" onerror="this.src='https://via.placeholder.com/600x400?text=Cours+à+Domicile'; this.onerror=null;">
                                <h3 class="text-2xl font-semibold mb-2"><i class="fas fa-home"></i> Cours à domicile</h3>
                                <p class="text-gray-300">Apprentissage personnalisé dans votre espace.</p>
                                 

                                <svg class="absolute bottom-4 right-4 w-12 h-12 text-white-200 opacity-50  " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                            </div>
                            <div class="flip-card-back bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 flex flex-col justify-center">
                                <h3 class="text-2xl font-semibold mb-4">Détails</h3>
                                <p class="text-gray-200">
                                    <strong>Disponibilité:</strong> Toute la semaine, horaires flexibles<br>
                                    <strong>Niveaux:</strong> Primaire, secondaire, examens<br>
                                    <strong>Avantages:</strong> Matériel fourni, aucun déplacement
                                </p>
                                <div>
                                <a href="contact.html" class="mt-4 inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-lg hover:bg-gray-100 transition-colors">
                                    Contacter
                                    <i class="fas fa-arrow-right ml-2"></i>
                                </a>
                                </div>
                            </div>
                        </div>
                    `;
                    locationsContainer.appendChild(homeTutoringCard);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des lieux:', error);
                    document.getElementById('locations-container').innerHTML = '<p class="text-red-400 text-center">Erreur lors du chargement des lieux. Veuillez réessayer plus tard.</p>';
                    mapContainer.innerHTML = '<p class="text-red-400 text-center">Erreur lors du chargement de la carte. Veuillez réessayer plus tard.</p>';
                });
        }





            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('fullname').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    const subject = document.getElementById('subject').value;
                    const location = document.getElementById('location').value;
                    const message = document.getElementById('message').value.trim();
                    const privacy = document.getElementById('privacy').checked;

                    // Validation
                    if (!name || !email || !phone || !subject || !location || !message) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Champs manquants',
                            text: 'Veuillez remplir tous les champs obligatoires.',
                            confirmButtonColor: '#4f46e5'
                        });
                        return;
                    }

                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email invalide',
                            text: 'Veuillez entrer une adresse e-mail valide.',
                            confirmButtonColor: '#4f46e5'
                        });
                        return;
                    }

                    if (!/^\+?\d{9,}$/.test(phone.replace(/\s/g, ''))) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Téléphone invalide',
                            text: 'Veuillez entrer un numéro de téléphone valide.',
                            confirmButtonColor: '#4f46e5'
                        });
                        return;
                    }

                    if (!privacy) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Confidentialité',
                            text: 'Veuillez accepter notre politique de confidentialité.',
                            confirmButtonColor: '#4f46e5'
                        });
                        return;
                    }

                    // Confirmation dialog
                    Swal.fire({
                        title: 'Confirmer l\'envoi',
                        html: `Êtes-vous sûr de vouloir envoyer ce message?<br><br>
                               <strong>Nom:</strong> ${name}<br>
                               <strong>Email:</strong> ${email}<br>
                               <strong>Téléphone:</strong> ${phone}`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#4f46e5',
                        cancelButtonColor: '#6b7280',
                        confirmButtonText: 'Oui, envoyer',
                        cancelButtonText: 'Annuler'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Simulate form submission
                            setTimeout(() => {
                                Swal.fire({
                                    title: 'Message envoyé!',
                                    html: `
                                        <svg class="confirmation-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                                            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                        </svg>
                                        <h3 class="text-xl font-semibold mt-4">Votre message a été envoyé avec succès!</h3>
                                        <p class="text-gray-300 mt-2">Nous vous contacterons sous 24 heures.</p>
                                    `,
                                    showConfirmButton: false,
                                    timer: 3000
                                });

                                // Reset form
                                contactForm.reset();
                            }, 1000);
                        }
                    });
                });
            }

            const counter = document.getElementById('inquiry-counter');
            if (counter) {
                let count = 4500;
                const target = 5000;
                const increment = Math.ceil((target - count) / 50);
                const interval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(interval);
                    }
                    counter.textContent = count.toLocaleString();
                }, 50);
            }

            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    once: true,
                    easing: 'ease-out-cubic'
                });
            }
       


    const whatsappButton = document.querySelectorAll('a[href*="wa.me"]');
    if (whatsappButton) {
        whatsappButton.forEach(() => {
        gsap.fromTo(whatsappButton, 
            { scale: 0, opacity: 0, visibility: 'hidden' },
            {
                scale: 1,
                opacity: 1,
                visibility: 'visible',
                duration: 1,
                delay: 1,
                ease: 'elastic.out(1, 0.5)',
                overwrite: 'auto'
            }
        );
    });
}


document.querySelectorAll('.holographic-card').forEach(card => {
            const content = card.querySelector('.content');
            const svg = card.querySelector('svg');

            card.addEventListener('mouseenter', () => {
                gsap.to(content, {
                    opacity: 0.5,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                gsap.to(svg, {
                    opacity: 0.7,
                    scale: 1.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(content, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                gsap.to(svg, {
                    opacity: 0.1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
   


         

      
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#4f46e5"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#4f46e5",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

      

        
    AOS.init();
});