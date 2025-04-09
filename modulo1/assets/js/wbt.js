const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("finalizado") || document.getElementById("btnInit");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});

// Función para mostrar elementos con animación
function mostrarElemento(elemento, delay = 0) {
    setTimeout(() => {
        elemento.classList.add('visible');
    }, delay);
}

// Función para ocultar elementos con animación
function ocultarElemento(elemento, delay = 0) {
    setTimeout(() => {
        elemento.classList.remove('visible');
    }, delay);
}

// Función para animar elementos del menú lateral
function animarMenuLateral() {
    const menuItems = document.querySelectorAll('.side-menu li');
    menuItems.forEach((item, index) => {
        mostrarElemento(item, index * 100);
    });
}

// Función para animar contenido
function animarContenido() {
    const elementos = document.querySelectorAll('.MAnimacion, .img-animada, .texto-animado');
    elementos.forEach((elemento, index) => {
        mostrarElemento(elemento, index * 200);
    });
}

// Función para observar elementos y animarlos cuando son visibles
function observarElementos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.MAnimacion, .img-animada, .texto-animado').forEach(elemento => {
        observer.observe(elemento);
    });
}

// Función para manejar el clic en los elementos li
function setupLiInteractions() {
    document.querySelectorAll('.li').forEach(li => {
        li.addEventListener('click', function() {
            // Obtener la flecha y el contenido del li actual
            const flecha = this.querySelector('.flecha');
            const content = this.querySelector('.li-content');
            
            // Remover clase abajo de todas las flechas
            document.querySelectorAll('.flecha').forEach(f => {
                if (f !== flecha) {
                    f.classList.remove('abajo');
                }
            });
            
            // Ocultar todos los contenidos excepto el actual
            document.querySelectorAll('.li-content').forEach(c => {
                if (c !== content) {
                    c.style.display = 'none';
                }
            });
            
            // Toggle clase abajo en la flecha actual
            flecha.classList.toggle('abajo');
            
            // Mostrar/ocultar contenido
            if (flecha.classList.contains('abajo')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
}

// Inicializar animaciones cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    observarElementos();
    setupLiInteractions();
    
    // Animar menú lateral cuando se abre
    document.getElementById('menuBtn').addEventListener('click', () => {
        const sideMenu = document.querySelector('.side-menu');
        sideMenu.classList.add('active');
        animarMenuLateral();
    });
    
    // Ocultar animaciones del menú cuando se cierra
    document.getElementById('closeBtn').addEventListener('click', () => {
        const menuItems = document.querySelectorAll('.side-menu li');
        menuItems.forEach(item => {
            item.classList.remove('visible');
        });
    });
});
