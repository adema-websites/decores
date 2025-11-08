// ===================================
// MATERIALES DECORES - JAVASCRIPT 2024
// ===================================

// ========== CARRITO DE COMPRAS ==========
let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, price) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`✓ ${productName} agregado al carrito`);
}

// Función para actualizar la visualización del carrito
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Actualizar contador del badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="material-icons">shopping_cart</i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '$0';
        return;
    }
    
    // Mostrar productos en el carrito
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <p class="cart-item-price">$${item.price.toLocaleString('es-AR')}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">
                        <i class="material-icons">remove</i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">
                        <i class="material-icons">add</i>
                    </button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Calcular y mostrar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toLocaleString('es-AR')}`;
}

// Aumentar cantidad
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Disminuir cantidad
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    } else {
        removeFromCart(index);
    }
}

// Eliminar producto del carrito
function removeFromCart(index) {
    const productName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    showNotification(`${productName} eliminado del carrito`);
}

// Mostrar/Ocultar modal del carrito
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    if (event.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Enviar pedido por WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showNotification('⚠️ El carrito está vacío');
        return;
    }
    
    // Construir mensaje para WhatsApp
    let message = '*PEDIDO MATERIALES DECORES*\n\n';
    
    cart.forEach(item => {
        message += `• ${item.name}\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Precio: $${item.price.toLocaleString('es-AR')}\n`;
        message += `  Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*TOTAL: $${total.toLocaleString('es-AR')}*\n\n`;
    message += '¡Espero su confirmación!';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número de WhatsApp (usar el de la web)
    const phoneNumber = '5491153063150';
    
    // Abrir WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
    
    // Opcional: vaciar carrito después de enviar
    // cart = [];
    // updateCart();
    // toggleCart();
}

// Mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== FUNCIONES ORIGINALES ==========

// Función para el menú de navegación (Mobile Toggle)
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('active');
}

// HERO: Cambio automático de imágenes de fondo cada 3 segundos
const heroBackgroundImages = [
    'img/hero-1920x800.jpg',
    'img/hero2-1920x800.jpg',
    'img/hero3-1920x800.jpg'
];

let currentImageIndex = 0;

function changeHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        // Cambia a la siguiente imagen
        currentImageIndex = (currentImageIndex + 1) % heroBackgroundImages.length;
        
        // Aplica fade out
        heroBackground.style.opacity = '0';
        
        // Después de 1 segundo (duración del fade), cambia la imagen y hace fade in
        setTimeout(() => {
            heroBackground.style.backgroundImage = `url('${heroBackgroundImages[currentImageIndex]}')`;
            heroBackground.style.opacity = '1';
        }, 1000);
    }
}

// Inicia el cambio automático de imágenes cada 3 segundos
let heroInterval;

function startHeroRotation() {
    // Cambia la imagen cada 3 segundos
    heroInterval = setInterval(changeHeroBackground, 3000);
}

function stopHeroRotation() {
    if (heroInterval) {
        clearInterval(heroInterval);
    }
}

// Smooth scroll para los enlaces de navegación
function smoothScrollToSection(event) {
    const href = event.currentTarget.getAttribute('href');
    
    if (href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header-modern').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cierra el menú móvil si está abierto
            const nav = document.getElementById('main-nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    }
}

// Evento al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // Agrega smooth scroll a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    // Inicia la rotación de imágenes del hero
    startHeroRotation();
    
    // Animación de aparición al hacer scroll (opcional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa las tarjetas de productos para animarlas al aparecer
    const cards = document.querySelectorAll('.producto-card, .combo-card-modern, .reel-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Pausa la rotación cuando el usuario no está en la página (optimización)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopHeroRotation();
    } else {
        startHeroRotation();
    }
});

// ========== FUNCIONES DE FILTRADO PARA TIENDA ==========

let currentCategory = 'todos';

// Filtrar por categoría
function filterByCategory(category, button) {
    currentCategory = category;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Aplicar filtros
    filterProducts();
}

// Filtrar productos (búsqueda + categoría)
function filterProducts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const productCards = document.querySelectorAll('.producto-card');
    const noResults = document.getElementById('no-results');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const name = card.getAttribute('data-name');
        
        // Verificar si coincide con categoría y búsqueda
        const matchCategory = currentCategory === 'todos' || category === currentCategory;
        const matchSearch = searchTerm === '' || name.includes(searchTerm);
        
        if (matchCategory && matchSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// Resetear filtros
function resetFilters() {
    // Limpiar búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Resetear a "Todos"
    const todosBtn = document.querySelector('.filter-btn[data-category="todos"]');
    if (todosBtn) {
        filterByCategory('todos', todosBtn);
    }
}
// ========== CARRUSEL DE COMBOS ==========

function scrollCarousel(direction) {
    const carousel = document.getElementById('combos-carousel');
    if (!carousel) return;
    
    const scrollAmount = 400;
    const currentScroll = carousel.scrollLeft;
    
    if (direction === 1) {
        carousel.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    } else {
        carousel.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Inicializar funcionalidad de arrastrar el carrusel
function initCarousel() {
    const carousel = document.getElementById('combos-carousel');
    
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        carousel.style.cursor = 'grab';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

// ========== MODAL DE VIDEO DE INSTAGRAM ==========

// Función para abrir el modal con el video de Instagram
function openVideoModal(embedUrl) {
    const modal = document.getElementById('video-modal');
    const videoContainer = document.getElementById('video-container');
    
    if (!modal || !videoContainer) return;
    
    // Crear el iframe de Instagram
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '400px';
    iframe.style.border = 'none';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allowtransparency', 'true');
    
    // Limpiar contenido previo y agregar el nuevo iframe
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    
    // Mostrar el modal
    modal.classList.add('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const videoContainer = document.getElementById('video-container');
    
    if (!modal || !videoContainer) return;
    
    // Ocultar el modal
    modal.classList.remove('active');
    
    // Limpiar el contenido del video
    videoContainer.innerHTML = '';
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Cerrar modal al presionar ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

// ========== FUNCIONES PARA NUEVAS SECCIONES ==========

// Función para consultar entrega
function checkDelivery(event) {
    event.preventDefault();
    const address = document.getElementById('delivery-address').value.trim();

    if (!address) {
        showNotification('⚠️ Por favor ingresa una dirección');
        return;
    }

    const message = `Hola, quiero consultar si llegan a esta dirección: ${address}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5491153063150';

    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');

    // Limpiar el formulario
    document.getElementById('delivery-address').value = '';
}

// Variables globales para la calculadora
let selectedTipo = '';
let currentStep = 1;

// Función para seleccionar tipo de trabajo
function selectTipo(tipo) {
    selectedTipo = tipo;

    // Remover selección previa
    document.querySelectorAll('.tipo-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Agregar selección al botón clickeado
    event.target.closest('.tipo-btn').classList.add('selected');
}

// Función para ir al siguiente paso
function nextStep() {
    if (currentStep === 1 && !selectedTipo) {
        showNotification('⚠️ Selecciona un tipo de trabajo primero');
        return;
    }

    if (currentStep === 2) {
        const largo = parseFloat(document.getElementById('largo').value) || 0;
        const ancho = parseFloat(document.getElementById('ancho').value) || 0;
        const alto = parseFloat(document.getElementById('alto').value) || 0;

        if (largo <= 0 || ancho <= 0 || (selectedTipo !== 'piso' && alto <= 0)) {
            showNotification('⚠️ Completa todas las medidas');
            return;
        }

        // Calcular materiales
        calcularMateriales(largo, ancho, alto);
    }

    if (currentStep < 3) {
        currentStep++;
        updateWizard();
    }
}

// Función para ir al paso anterior
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizard();
    }
}

// Función para actualizar el wizard
function updateWizard() {
    // Actualizar steps visuales
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Actualizar contenido
    document.querySelectorAll('.step-content').forEach((content, index) => {
        if (index + 1 === currentStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // Actualizar botones
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    prevBtn.disabled = currentStep === 1;
    nextBtn.disabled = currentStep === 3;

    if (currentStep === 3) {
        whatsappBtn.disabled = false;
    } else {
        whatsappBtn.disabled = true;
    }

    // Cambiar texto del botón siguiente
    if (currentStep === 2) {
        nextBtn.textContent = 'Calcular';
    } else if (currentStep === 3) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.style.display = 'block';
    }
}

// Función para calcular materiales
function calcularMateriales(largo, ancho, alto) {
    let calculo = '';
    let total = 0;

    switch(selectedTipo) {
        case 'pared':
            // Calcular metros cuadrados de pared
            const areaPared = (largo + ancho) * 2 * alto; // Perímetro x alto
            const ladrillos = Math.ceil(areaPared * 12); // Aprox 12 ladrillos por m²
            const cementoPared = Math.ceil(areaPared * 0.15); // 0.15 bolsas por m²
            const arenaPared = Math.ceil(areaPared * 0.03); // 0.03 m³ por m²

            calculo = `
                <div class="calculo-item">
                    <span>Ladrillos cerámicos (aprox)</span>
                    <span>${ladrillos} unidades</span>
                </div>
                <div class="calculo-item">
                    <span>Cemento Portland x50kg</span>
                    <span>${cementoPared} bolsas</span>
                </div>
                <div class="calculo-item">
                    <span>Arena fina</span>
                    <span>${arenaPared} m³</span>
                </div>
                <div class="calculo-item">
                    <span><strong>Total aproximado</strong></span>
                    <span><strong>Consultar precios</strong></span>
                </div>
            `;
            break;

        case 'techo':
            const areaTecho = largo * ancho;
            const placas = Math.ceil(areaTecho / 1.2); // Placas de 1.2m x 2.4m
            const tirantes = Math.ceil((largo + ancho) * 2 / 0.6); // Cada 60cm
            const cementoTecho = Math.ceil(areaTecho * 0.2);

            calculo = `
                <div class="calculo-item">
                    <span>Placas de yeso (aprox)</span>
                    <span>${placas} placas</span>
                </div>
                <div class="calculo-item">
                    <span>Tirantes de hierro</span>
                    <span>${tirantes} unidades</span>
                </div>
                <div class="calculo-item">
                    <span>Cemento Portland x50kg</span>
                    <span>${cementoTecho} bolsas</span>
                </div>
                <div class="calculo-item">
                    <span><strong>Total aproximado</strong></span>
                    <span><strong>Consultar precios</strong></span>
                </div>
            `;
            break;

        case 'piso':
            const areaPiso = largo * ancho;
            const porcelanato = Math.ceil(areaPiso * 1.1); // 10% extra
            const cementoPiso = Math.ceil(areaPiso * 0.12);
            const arenaPiso = Math.ceil(areaPiso * 0.02);

            calculo = `
                <div class="calculo-item">
                    <span>Porcelanato 60x60</span>
                    <span>${porcelanato} m²</span>
                </div>
                <div class="calculo-item">
                    <span>Cemento Portland x50kg</span>
                    <span>${cementoPiso} bolsas</span>
                </div>
                <div class="calculo-item">
                    <span>Arena fina</span>
                    <span>${arenaPiso} m³</span>
                </div>
                <div class="calculo-item">
                    <span><strong>Total aproximado</strong></span>
                    <span><strong>Consultar precios</strong></span>
                </div>
            `;
            break;

        case 'baño':
            const inodoro = 1;
            const bidet = 1;
            const porcelanatoBano = Math.ceil(largo * ancho * 1.1);
            const ceramica = Math.ceil((largo * ancho * 0.3) * 1.1); // 30% paredes

            calculo = `
                <div class="calculo-item">
                    <span>Inodoro con mochila</span>
                    <span>${inodoro} unidad</span>
                </div>
                <div class="calculo-item">
                    <span>Bidet porcelana</span>
                    <span>${bidet} unidad</span>
                </div>
                <div class="calculo-item">
                    <span>Porcelanato piso</span>
                    <span>${porcelanatoBano} m²</span>
                </div>
                <div class="calculo-item">
                    <span>Cerámica pared</span>
                    <span>${ceramica} m²</span>
                </div>
                <div class="calculo-item">
                    <span><strong>Total aproximado</strong></span>
                    <span><strong>Consultar precios</strong></span>
                </div>
            `;
            break;
    }

    document.getElementById('resultado-calculo').innerHTML = calculo;
}

// Función para enviar cálculo por WhatsApp
function enviarCalculoWhatsApp() {
    const largo = document.getElementById('largo').value;
    const ancho = document.getElementById('ancho').value;
    const alto = document.getElementById('alto').value;

    let message = `*CÁLCULO DE MATERIALES - DECORES*\n\n`;
    message += `Tipo de trabajo: ${selectedTipo.toUpperCase()}\n`;
    message += `Medidas: ${largo}m x ${ancho}m x ${alto}m\n\n`;
    message += `Necesito presupuesto detallado para estos materiales.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5491153063150';

    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
}

// Función para registrar profesional
function registerProfesional(event) {
    event.preventDefault();

    const nombre = document.getElementById('prof-nombre').value.trim();
    const rubro = document.getElementById('prof-rubro').value.trim();
    const zona = document.getElementById('prof-zona').value.trim();
    const whatsapp = document.getElementById('prof-whatsapp').value.trim();

    if (!nombre || !rubro || !zona || !whatsapp) {
        showNotification('⚠️ Completa todos los campos');
        return;
    }

    let message = `*REGISTRO PROFESIONAL - DECORES*\n\n`;
    message += `Nombre: ${nombre}\n`;
    message += `Rubro: ${rubro}\n`;
    message += `Zona: ${zona}\n`;
    message += `WhatsApp: ${whatsapp}\n\n`;
    message += `Quiero registrarme para beneficios exclusivos.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5491153063150';

    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');

    // Limpiar formulario
    document.getElementById('profesional-form').reset();
    showNotification('✓ Registro enviado correctamente');
}

// Función para registrar profesional desde landing (ya no se usa, ahora es directo a WhatsApp)

// Función para enviar presupuesto
function enviarPresupuesto(event) {
    event.preventDefault();

    const tipoObra = document.getElementById('tipo-obra').value;
    const metros = document.getElementById('metros-cuadrados').value;
    const zona = document.getElementById('zona').value.trim();
    const tiempo = document.getElementById('tiempo-obra').value;
    const nombre = document.getElementById('nombre').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const profesional = document.getElementById('profesional').value;
    const comentarios = document.getElementById('comentarios').value.trim();

    if (!tipoObra || !metros || !zona || !nombre || !whatsapp) {
        showNotification('⚠️ Completa los campos obligatorios');
        return;
    }

    let message = `*SOLICITUD DE PRESUPUESTO - DECORES*\n\n`;
    message += `*Proyecto:* ${tipoObra}\n`;
    message += `*Metros cuadrados:* ${metros}\n`;
    message += `*Zona:* ${zona}\n`;
    message += `*Tiempo estimado:* ${tiempo}\n\n`;
    message += `*Cliente:* ${nombre}\n`;
    message += `*WhatsApp:* ${whatsapp}\n`;
    message += `*Tipo:* ${profesional === 'si' ? 'Profesional' : 'Particular'}\n\n`;
    if (comentarios) {
        message += `*Comentarios:* ${comentarios}\n\n`;
    }
    message += `Necesito presupuesto completo para mi obra.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5491153063150';

    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');

    // Limpiar formulario
    document.getElementById('presupuesto-form').reset();
    showNotification('✓ Solicitud enviada correctamente');
}

// Función para toggle FAQ
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');

    // Cerrar otras FAQs abiertas
    document.querySelectorAll('.faq-answer').forEach(ans => {
        if (ans !== answer) {
            ans.classList.remove('active');
            ans.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });

    // Toggle la actual
    answer.classList.toggle('active');

    // Rotar icono
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}
