document.addEventListener('DOMContentLoaded', () => {

  // --- BASE DE DATOS DE 50 IDIOMAS ---
  const listaIdiomasGlobal = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'Inglés' },
    { code: 'fr', name: 'Francés' },
    { code: 'de', name: 'Alemán' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Portugués' },
    { code: 'zh', name: 'Chino' },
    { code: 'ja', name: 'Japonés' },
    { code: 'ko', name: 'Coreano' },
    { code: 'ru', name: 'Ruso' },
    { code: 'ar', name: 'Árabe' },
    { code: 'hi', name: 'Hindi' },
    { code: 'nl', name: 'Holandés' },
    { code: 'pl', name: 'Polaco' },
    { code: 'sv', name: 'Sueco' },
    { code: 'tr', name: 'Turco' },
    { code: 'vi', name: 'Vietnamita' },
    { code: 'uk', name: 'Ucraniano' },
    { code: 'el', name: 'Griego' },
    { code: 'cs', name: 'Checo' }, // --- FIN DE LOS 20 IDIOMAS (PLAN BÁSICO - $9.99/mes) ---
    { code: 'ro', name: 'Rumano' },
    { code: 'hu', name: 'Húngaro' },
    { code: 'th', name: 'Tailandés' },
    { code: 'id', name: 'Indonesio' },
    { code: 'ms', name: 'Malayo' },
    { code: 'he', name: 'Hebreo' },
    { code: 'fa', name: 'Persa' },
    { code: 'da', name: 'Danés' },
    { code: 'fi', name: 'Finlandés' },
    { code: 'no', name: 'Noruego' },
    { code: 'sk', name: 'Eslovaco' },
    { code: 'bg', name: 'Búlgaro' },
    { code: 'hr', name: 'Croata' },
    { code: 'sr', name: 'Serbio' },
    { code: 'lt', name: 'Lituano' },
    { code: 'lv', name: 'Letón' },
    { code: 'et', name: 'Estonio' },
    { code: 'hi_in', name: 'Marathi' },
    { code: 'bn', name: 'Bengalí' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'ur', name: 'Urdu' },
    { code: 'sw', name: 'Swahili' },
    { code: 'tl', name: 'Tagalo' },
    { code: 'af', name: 'Afrikáans' },
    { code: 'is', name: 'Islandés' },
    { code: 'ga', name: 'Irlandés' },
    { code: 'cy', name: 'Galés' },
    { code: 'sq', name: 'Albanés' },
    { code: 'hy', name: 'Armenio' } // --- FIN DE LOS 50 IDIOMAS (PLAN PREMIUM - $15.99/mes) ---
  ];

  // 1. HAMBURGUESA / MENÚ MÓVIL
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. MODO OSCURO / CLARO
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      toggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });
  });

  // 3. MODAL Y TABS DE AUTENTICACIÓN
  const authModal = document.getElementById('auth-modal');
  const openAuthBtns = document.querySelectorAll('.open-auth-btn');
  const closeModal = document.getElementById('close-modal');

  openAuthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (authModal) authModal.classList.add('active');
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => authModal.classList.remove('active'));
  }

  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.classList.add('active-form');
      registerForm.classList.remove('active-form');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      registerForm.classList.add('active-form');
      loginForm.classList.remove('active-form');
    });
  }

  // --- REGISTRO Y LOGIN DE USUARIO ---
  const registerInputEmail = document.getElementById('register-email');
  const registerInputPass = document.getElementById('register-pass');
  const registerInputName = document.getElementById('register-name');
  
  const loginInputEmail = document.getElementById('login-email');
  const loginInputPass = document.getElementById('login-pass');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = registerInputEmail.value.trim();
      const pass = registerInputPass.value.trim();
      const name = registerInputName.value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Error: Por favor, introduce un correo electrónico válido.');
        return;
      }
      if (pass.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      const nuevoUsuario = {
        name: name,
        email: email,
        pass: pass,
        plan: 'basico', // Por defecto inicia en el Plan Básico ($9.99/mes - 20 Idiomas)
        verificado: true
      };

      localStorage.setItem('voceira_user', JSON.stringify(nuevoUsuario));
      alert('¡Cuenta creada con éxito!');
      window.location.href = 'app.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginInputEmail.value.trim();
      const pass = loginInputPass.value.trim();
      const usuarioGuardado = JSON.parse(localStorage.getItem('voceira_user'));

      if (!usuarioGuardado) {
        alert('No existe ninguna cuenta registrada. Por favor, crea una cuenta primero.');
        return;
      }

      if (usuarioGuardado.email !== email || usuarioGuardado.pass !== pass) {
        alert('Credenciales incorrectas. Verifica tu correo o contraseña.');
        return;
      }

      window.location.href = 'app.html';
    });
  }

  // 4. LÓGICA DEL DASHBOARD (app.html)
  if (document.body.classList.contains('app-body')) {
    const usuarioActivo = JSON.parse(localStorage.getItem('voceira_user'));
    
    // Si no hay usuario activo, redirigir al index
    if (!usuarioActivo) {
      window.location.href = 'index.html';
      return;
    }

    const userNameEl = document.getElementById('user-name');
    const userPlanEl = document.getElementById('user-plan-text');
    const avatarEl = document.getElementById('user-avatar');

    if (userNameEl) userNameEl.textContent = usuarioActivo.name || 'Usuario';
    
    // Mostrar plan activo (Básico o Premium)
    if (userPlanEl) {
      if (usuarioActivo.plan === 'premium') {
        userPlanEl.textContent = 'Plan Premium ($15.99/mes - 50 Idiomas)';
      } else {
        userPlanEl.textContent = 'Plan Básico ($9.99/mes - 20 Idiomas)';
      }
    }

    if (avatarEl && usuarioActivo.name) {
      avatarEl.textContent = usuarioActivo.name.substring(0, 2).toUpperCase();
    }

    actualizarSelectoresIdiomas(usuarioActivo.plan);

    const btnUpgradeBasico = document.getElementById('btn-upgrade-basico');
    const btnUpgradePremium = document.getElementById('btn-upgrade-premium');

    if (btnUpgradeBasico) {
      btnUpgradeBasico.addEventListener('click', () => {
        usuarioActivo.plan = 'basico';
        localStorage.setItem('voceira_user', JSON.stringify(usuarioActivo));
        alert('¡Suscripción al Plan Básico ($9.99/mes - 20 Idiomas) activada!');
        location.reload();
      });
    }

    if (btnUpgradePremium) {
      btnUpgradePremium.addEventListener('click', () => {
        usuarioActivo.plan = 'premium';
        localStorage.setItem('voceira_user', JSON.stringify(usuarioActivo));
        alert('¡Suscripción al Plan Premium ($15.99/mes - 50 Idiomas) activada con éxito!');
        location.reload();
      });
    }

    const btnLogout = document.getElementById('btn-logout');
    if(btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        localStorage.removeItem('voceira_user');
        window.location.href = 'index.html';
      });
    }
  }

  // --- FILTRO DE IDIOMAS SEGÚN PLAN (ÚNICAMENTE 2 PLANES) ---
  function actualizarSelectoresIdiomas(plan) {
    const langFrom = document.getElementById('lang-from');
    const langTo = document.getElementById('lang-to');
    if (!langFrom || !langTo) return;
    
    // Si el plan es 'premium' habilita 50 idiomas; si es 'basico' habilita 20.
    const limite = plan === 'premium' ? 50 : 20;

    const idiomasDisponibles = listaIdiomasGlobal.slice(0, limite);
    langFrom.innerHTML = '';
    langTo.innerHTML = '';

    idiomasDisponibles.forEach(lang => {
      const opt1 = document.createElement('option');
      opt1.value = lang.code;
      opt1.textContent = lang.name;
      langFrom.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = lang.code;
      opt2.textContent = lang.name;
      langTo.appendChild(opt2);
    });

    if (langTo.options.length > 1) {
      langTo.selectedIndex = 1; 
    }
  }

  // Navegación Sidebar de la App
  const sidebarBtns = document.querySelectorAll('.sidebar-btn');
  const panels = document.querySelectorAll('.app-panel');
  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('data-panel');
      sidebarBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active-panel'));
      btn.classList.add('active');
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) targetPanel.classList.add('active-panel');
    });
  });

  // ==========================================
  // --- TRADUCCIÓN REAL CON API ---
  // ==========================================
  const translateInput = document.getElementById('translate-input');
  const translateOutput = document.getElementById('translate-output');
  const btnTranslate = document.getElementById('btn-translate');
  const charCount = document.getElementById('char-count');
  const statusTag = document.getElementById('status-tag');
  
  if (translateInput) {
    translateInput.addEventListener('input', () => {
      charCount.textContent = `${translateInput.value.length} caracteres`;
    });
  }

  if (btnTranslate) {
    btnTranslate.addEventListener('click', async () => {
      const textToTranslate = translateInput.value.trim();
      
      if (!textToTranslate) {
        alert("Por favor, ingresa un texto para traducir.");
        return;
      }

      const langFromVal = document.getElementById('lang-from').value;
      const langToVal = document.getElementById('lang-to').value;

      if (langFromVal === langToVal) {
        alert("El idioma de origen y destino deben ser diferentes.");
        return;
      }

      // Estado de carga
      translateOutput.value = "Traduciendo con IA Neuronal...";
      if(statusTag) statusTag.textContent = "Procesando...";
      btnTranslate.disabled = true;
      btnTranslate.style.opacity = "0.7";

      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${langFromVal}|${langToVal}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.responseData && data.responseData.translatedText) {
          translateOutput.value = data.responseData.translatedText;
          if(statusTag) {
            statusTag.textContent = "¡Completado!";
            statusTag.style.color = "var(--primary)";
          }
        } else {
          throw new Error("Respuesta inválida de la API");
        }
      } catch (error) {
        console.error("Error en la traducción:", error);
        translateOutput.value = "Hubo un error al traducir. Por favor, intenta de nuevo.";
        if(statusTag) {
          statusTag.textContent = "Error de red";
          statusTag.style.color = "red";
        }
      } finally {
        btnTranslate.disabled = false;
        btnTranslate.style.opacity = "1";
      }
    });
  }

  // INTERCAMBIO DE IDIOMAS
  const btnSwap = document.getElementById('btn-swap');
  const selectLangFrom = document.getElementById('lang-from');
  const selectLangTo = document.getElementById('lang-to');
  
  if (btnSwap) {
    btnSwap.addEventListener('click', () => {
      const temp = selectLangFrom.value;
      selectLangFrom.value = selectLangTo.value;
      selectLangTo.value = temp;
    });
  }

  // BOTÓN DE REINICIO EN AJUSTES
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if(confirm('¿Estás seguro de que deseas borrar todos los datos locales? Esto cerrará tu sesión.')) {
        localStorage.clear();
        alert('Caché y datos borrados exitosamente.');
        window.location.href = 'index.html';
      }
    });
  }
  
});