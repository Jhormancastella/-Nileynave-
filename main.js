// Funcionalidades comunes para todas las páginas
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const navbar = document.getElementById('navbar');

  // ===== MENÚ HAMBURGUESA =====
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('active') && 
          !menu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Solo aplicar scroll suave para anclas internas
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== EFECTO NAVBAR AL SCROLL =====
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // ===== AJUSTAR PADDING DEL BODY =====
  function adjustBodyPadding() {
    if (navbar) {
      document.body.style.paddingTop = navbar.offsetHeight + 'px';
    }
  }

  // Ajustar al cargar y al redimensionar
  window.addEventListener('load', adjustBodyPadding);
  window.addEventListener('resize', adjustBodyPadding);

  // ===== CERRAR MENÚ AL REDIMENSIONAR =====
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu && hamburger) {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== ACTIVAR ENLACE ACTIVO =====
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    document.querySelectorAll('.menu a').forEach(link => {
      link.classList.remove('active');
      
      const linkPath = link.getAttribute('href');
      
      // Para enlaces de ancla
      if (currentHash && linkPath === currentHash) {
        link.classList.add('active');
      }
      // Para enlaces de página
      else if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
        link.classList.add('active');
      }
    });
  }

  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);

  // ===== MEJORA DE ACCESIBILIDAD =====
  // Manejar navegación por teclado en el menú
  if (menu) {
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  // ===== CARGAR RECURSOS =====
  console.log('Nileynave - Tu barco de libertad digital está listo para navegar! 🚢');
});

// Función utilitaria para mostrar mensajes
function showMessage(mensaje, tipo = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${tipo}`;
  messageDiv.textContent = mensaje;
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${tipo === 'error' ? '#f56565' : tipo === 'success' ? '#48bb78' : '#4299e1'};
    color: white;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// Estilos para las animaciones de mensajes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
