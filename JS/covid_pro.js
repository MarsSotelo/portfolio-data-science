document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. MENÚ HAMBURGUESA Y HEADER
       ========================================= */
    const toggle = document.querySelector(".nav-toggle");
    const headerBox = document.querySelector(".header__box");

    if (toggle && headerBox) {
        toggle.addEventListener("click", () => {
            headerBox.classList.toggle("nav-open");
            toggle.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (headerBox.classList.contains("nav-open") && !headerBox.contains(e.target)) {
                headerBox.classList.remove("nav-open");
                toggle.classList.remove("active");
            }
        });
    }

    /* =========================================
       2. MODALES, ACCESIBILIDAD Y MODO OSCURO
       ========================================= */
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-btn");
    const darkToggle = document.getElementById("darkModeToggle");

    // Abrir modal
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", () => {
            const modalId = card.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; 
                speakModal(modal.querySelector("h2")?.innerText);
            }
        });
    });

    // Cerrar con botón
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    });

    // Cerrar con clic fuera
    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Modo Oscuro
    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Voz
    function speakModal(text) {
        if ('speechSynthesis' in window && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "es-ES";
            speechSynthesis.speak(utterance);
        }
    }

   /* =========================================
   3. ASIDE INTELIGENTE (PERFIL <-> TARJETAS)
   ========================================= */

const asideImg = document.getElementById("aside-image");
const asideTitle = document.getElementById("aside-title");
const asideDesc = document.getElementById("aside-desc");
const cards = document.querySelectorAll(".flip-card"); 

// A) Tu Perfil (Datos por defecto)
const defaultProfile = {
    img: "imagenes/foto_cv.jpeg", // RUTA CORREGIDA (sin ../)
    title: "Mars Sotelo",
    desc: "Físico / Desarrollador Web"
};

// B) Datos de las Tarjetas
const contextMap = {
    modal1: { title: "COVID-19", img: "imagenes/que_es_un_virus.avif" },
    modal2: { title: "¿Qué es un virus?", img: "imagenes/interrogacion_covid.jpg" },
    modal3: { title: "Virus vs Bacterias", img: "imagenes/Difference-between-Virus-and-bacteria.jpg" },
    modal4: { title: "Cómo se transmite...?", img: "imagenes/medidas_covid_tos.webp" },
    modal5: { title: "Prevención", img: "imagenes/preventions_covid.jfif" },
    modal6: { title: "Medidas principales", img: "imagenes/prevenir_coronavirus.jpg" }
};

// C) Lógica de Eventos
cards.forEach(card => {
    // 1. Entrar a la tarjeta -> Muestra info del Virus
    card.addEventListener("mouseenter", () => {
        const modalId = card.getAttribute("data-modal");
        const data = contextMap[modalId];

        if (data) {
            asideImg.src = data.img;
            asideTitle.innerText = data.title;
            
            // Ocultamos descripción y ajustamos estilo para imagen de virus
            if(asideDesc) asideDesc.style.display = "none";
            asideImg.style.borderRadius = "10px";
            asideImg.style.border = "none";
        }
    });

    // 2. Salir de la tarjeta -> Vuelve a Tu Perfil
    card.addEventListener("mouseleave", () => {
        asideImg.src = defaultProfile.img;
        asideTitle.innerText = defaultProfile.title;
        
        // Restauramos descripción y estilo de perfil (redondo)
        if(asideDesc) {
            asideDesc.innerText = defaultProfile.desc;
            asideDesc.style.display = "block";
        }
        asideImg.style.borderRadius = "50%";
        asideImg.style.border = "4px solid #00B5E2";
    });
});

    /* =========================================
       4. OBSERVADOR PARA MÓVIL
       ========================================= */
    const aside = document.getElementById("context-aside");
    const dashboardMain = document.getElementById("dashboard-main");

    if (window.innerWidth < 768 && aside && dashboardMain) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aside.classList.add("show-mobile");
                    } else {
                        aside.classList.remove("show-mobile");
                    }
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(dashboardMain);
    }
});




/* OPCIONAL: Animación al hacer Scroll para la sección de Experiencia */
    const experienceSection = document.querySelector(".experience-section");
    
    if (experienceSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.style.opacity = "1";
                }
            });
        });
        // Pausar la animación inicialmente en el CSS o JS si usas observer
        // Pero con el CSS que te pasé arriba funcionará automático al cargar la página.

    }
