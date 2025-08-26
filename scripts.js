document.addEventListener('DOMContentLoaded', () => {
    
    document.body.style.visibility = 'visible';

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        // Set initial state to prevent hiding
        gsap.set(mobileMenu, { height: 0, opacity: 0, visibility: 'hidden' });
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            gsap.to(mobileMenu, {
                height: isHidden ? 'auto' : 0,
                opacity: isHidden ? 1 : 0,
                visibility: isHidden ? 'visible' : 'hidden',
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
        fetch('db.json')
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
                        <a href="contact.html" class="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold glow">S'inscrire</a>
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

    // Form Submission (Contact Page)
    const contactForm = document.querySelector('#contact-form button');
    if (contactForm) {
        contactForm.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.querySelector('#contact-form input[placeholder="Nom complet"]')?.value.trim();
            const email = document.querySelector('#contact-form input[placeholder="Adresse e-mail"]')?.value.trim();
            const phone = document.querySelector('#contact-form input[placeholder="Numéro de téléphone"]')?.value.trim();
            const subject = document.querySelector('#contact-form input[placeholder="Sujet"]')?.value.trim();
            const message = document.querySelector('#contact-form textarea')?.value.trim();

            if (!name || !email || !phone || !subject || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Veuillez entrer une adresse e-mail valide.');
                return;
            }

            if (!/^\+?\d{9,}$/.test(phone)) {
                alert('Veuillez entrer un numéro de téléphone valide.');
                return;
            }

            alert('Message envoyé avec succès ! Nous vous contacterons sous 24 heures.');
            document.querySelector('#contact-form input[placeholder="Nom complet"]').value = '';
            document.querySelector('#contact-form input[placeholder="Adresse e-mail"]').value = '';
            document.querySelector('#contact-form input[placeholder="Numéro de téléphone"]').value = '';
            document.querySelector('#contact-form input[placeholder="Sujet"]').value = '';
            document.querySelector('#contact-form textarea').value = '';
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


   

    AOS.init();
});