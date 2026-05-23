document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Scroll Effects ---
  const navbar = document.querySelector('.navbar');
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');

  // Change nav styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Link Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // --- Interactive Walkthrough Tour ---
  const tourStepBtns = document.querySelectorAll('.tour-step-btn');
  const tourStepContents = document.querySelectorAll('.tour-step-content');

  tourStepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.getAttribute('data-step');

      // Update active button state
      tourStepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active content panel
      tourStepContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `step-content-${targetStep}`) {
          content.classList.add('active');
        }
      });
    });
  });

  // --- Mockup 1: Database Setup Interactivity ---
  const dbChoicePreview = document.querySelector('.db-choice-preview');
  if (dbChoicePreview) {
    const tabs = dbChoicePreview.querySelectorAll('.preview-tab');
    const formContainer = dbChoicePreview.querySelector('.preview-form');

    const postgresFieldsHTML = `
      <div class="preview-field animate-slide">
        <span>مضيف الخادم (Host)</span>
        <div class="preview-input">localhost</div>
      </div>
      <div class="preview-field animate-slide">
        <span>اسم قاعدة البيانات</span>
        <div class="preview-input">basira_erp</div>
      </div>
      <div class="preview-field-ssl animate-slide">
        <span>تفعيل الاتصال الآمن (SSL)</span>
        <span class="toggle-indicator active"></span>
      </div>
    `;

    const sqliteFieldsHTML = `
      <div class="preview-field animate-slide">
        <span>مسار ملف قاعدة البيانات (المحلي)</span>
        <div class="preview-input">./basira.db</div>
      </div>
      <div class="preview-field-ssl animate-slide">
        <span>تحديد مسار بجانب الملف التنفيذي (.exe)</span>
        <span class="toggle-indicator active"></span>
      </div>
    `;

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Toggle fields based on selected tab
        if (index === 0) {
          // PostgreSQL
          formContainer.innerHTML = postgresFieldsHTML;
        } else {
          // SQLite
          formContainer.innerHTML = sqliteFieldsHTML;
        }

        // Re-attach toggle indicator event listeners for the newly injected HTML
        attachToggleListeners();
      });
    });

    function attachToggleListeners() {
      const toggles = formContainer.querySelectorAll('.toggle-indicator');
      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
        });
      });
    }

    attachToggleListeners();
  }

  // --- Mockup 5: Restore Backup Interactivity ---
  const restoreBtn = document.querySelector('.preview-btn-danger');
  if (restoreBtn) {
    restoreBtn.addEventListener('click', () => {
      const originalText = restoreBtn.innerHTML;
      restoreBtn.disabled = true;
      restoreBtn.style.opacity = '0.7';
      restoreBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري استعادة البيانات والتحقق من التوقيع...';

      setTimeout(() => {
        alert('تم بنجاح فك تشفير النسخة الاحتياطية ومطابقة HMAC والرجوع إلى نقطة الاستعادة بنجاح كامل! تم تحديث شجرة الحسابات والقيود.');
        restoreBtn.disabled = false;
        restoreBtn.style.opacity = '1';
        restoreBtn.innerHTML = originalText;
      }, 2000);
    });
  }

  // --- Contact Form Submission Simulation ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Submit Button Loading State
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري الإرسال...';

      // Hide previous feedback
      formFeedback.style.display = 'none';
      formFeedback.className = 'form-feedback';

      // Simulate API request delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Display Success Message
        formFeedback.classList.add('success');
        formFeedback.innerHTML = `شكراً لتواصلك معنا يا بشمهندس/أستاذ <strong>${name}</strong>! تم إرسال رسالتك بنجاح للمهندس عمر بدر. سنقوم بالتواصل معك على بريدك الإلكتروني <strong>${email}</strong> في أقرب وقت.`;
        
        // Reset form
        contactForm.reset();
      }, 1500);
    });
  }
});
