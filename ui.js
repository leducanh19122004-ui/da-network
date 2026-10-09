/* ═══════════════════════════════════════════════════════════════
   DA CRYPTO — UI layer (DA Network design system)
   Motion, accessibility and the few UI strings introduced by the
   redesign. Business logic, content and i18n data stay in app.js.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── UI strings (wording shared with danetwork.asia) ──────────────
  var UI = {
    en: {
      skip: 'Skip to content', newTab: '(opens in a new tab)',
      'eco.tag': 'Part of the DA Network ecosystem', 'eco.link': 'Visit DA Network', 'eco.current': 'You are here',
      'eco.learn': 'Learn', 'eco.trade': 'Trade', 'eco.save': 'Save', 'eco.earn': 'Earn',
      'footer.eco': 'Ecosystem', 'footer.lang': 'Languages',
      openMenu: 'Open menu', closeMenu: 'Close menu',
      'ec.u1': 'link', 'ec.u3': 'capital',
      'ec.s1': 'Share your link — earn from every trade your referrals make.',
      'ec.s2': "Of referred users' trading fees. Some exchanges pay for life.",
      'ec.s3': 'No capital. No trading experience. Passive income.',
      'steps.swipe': 'Swipe or drag ← →',
      'calc.volNote': 'Typical user: $200K–$700K / month'
    },
    vi: {
      skip: 'Chuyển đến nội dung', newTab: '(mở trong tab mới)',
      'eco.tag': 'Thuộc hệ sinh thái DA Network', 'eco.link': 'Truy cập DA Network', 'eco.current': 'Bạn đang ở đây',
      'eco.learn': 'Học', 'eco.trade': 'Giao dịch', 'eco.save': 'Tiết kiệm', 'eco.earn': 'Thu nhập',
      'footer.eco': 'Hệ sinh thái', 'footer.lang': 'Ngôn ngữ',
      openMenu: 'Mở menu', closeMenu: 'Đóng menu',
      'ec.u1': 'link', 'ec.u3': 'vốn',
      'ec.s1': 'Chia sẻ link — nhận hoa hồng từ mọi giao dịch của người bạn giới thiệu.',
      'ec.s2': 'Phí giao dịch của người được giới thiệu. Một số sàn trả trọn đời.',
      'ec.s3': 'Không cần vốn. Không cần kinh nghiệm. Thu nhập thụ động.',
      'steps.swipe': 'Vuốt hoặc kéo ← →',
      'calc.volNote': 'Người dùng phổ thông trung bình: $200K–$700K / tháng'
    },
    th: {
      skip: 'ข้ามไปยังเนื้อหา', newTab: '(เปิดในแท็บใหม่)',
      'eco.tag': 'ส่วนหนึ่งของระบบนิเวศ DA Network', 'eco.link': 'ไปที่ DA Network', 'eco.current': 'คุณอยู่ที่นี่',
      'eco.learn': 'เรียนรู้', 'eco.trade': 'เทรด', 'eco.save': 'ประหยัด', 'eco.earn': 'รายได้',
      'footer.eco': 'ระบบนิเวศ', 'footer.lang': 'ภาษา',
      openMenu: 'เปิดเมนู', closeMenu: 'ปิดเมนู',
      'ec.u1': 'ลิงก์', 'ec.u3': 'เงินทุน',
      'ec.s1': 'แชร์ลิงก์ของคุณ รับค่าคอมมิชชันจากทุกการเทรดของผู้ที่คุณแนะนำ',
      'ec.s2': 'ของค่าธรรมเนียมการเทรดจากผู้ที่คุณแนะนำ บางแพลตฟอร์มจ่ายตลอดชีพ',
      'ec.s3': 'ไม่ต้องใช้ทุน ไม่ต้องมีประสบการณ์เทรด รายได้แบบพาสซีฟ',
      'steps.swipe': 'ปัดหรือลาก ← →',
      'calc.volNote': 'ผู้ใช้ทั่วไปโดยเฉลี่ย: $200K–$700K / เดือน'
    },
    ko: {
      skip: '본문으로 건너뛰기', newTab: '(새 탭에서 열림)',
      'eco.tag': 'DA Network 에코시스템의 일부', 'eco.link': 'DA Network 방문하기', 'eco.current': '현재 위치',
      'eco.learn': '학습', 'eco.trade': '거래', 'eco.save': '절감', 'eco.earn': '수익',
      'footer.eco': '에코시스템', 'footer.lang': '언어',
      openMenu: '메뉴 열기', closeMenu: '메뉴 닫기',
      'ec.u1': '링크', 'ec.u3': '자본',
      'ec.s1': '링크를 공유하고, 추천한 사용자의 모든 거래에서 커미션을 받으세요.',
      'ec.s2': '추천 사용자 거래 수수료 기준. 일부 거래소는 평생 지급합니다.',
      'ec.s3': '자본도, 트레이딩 경험도 필요 없는 패시브 인컴.',
      'steps.swipe': '스와이프 또는 드래그 ← →',
      'calc.volNote': '일반 사용자 평균: 월 $200K–$700K'
    },
    id: {
      skip: 'Langsung ke konten', newTab: '(terbuka di tab baru)',
      'eco.tag': 'Bagian dari ekosistem DA Network', 'eco.link': 'Kunjungi DA Network', 'eco.current': 'Anda di sini',
      'eco.learn': 'Belajar', 'eco.trade': 'Trading', 'eco.save': 'Hemat', 'eco.earn': 'Hasilkan',
      'footer.eco': 'Ekosistem', 'footer.lang': 'Bahasa',
      openMenu: 'Buka menu', closeMenu: 'Tutup menu',
      'ec.u1': 'link', 'ec.u3': 'modal',
      'ec.s1': 'Bagikan link Anda — dapatkan komisi dari setiap trade referral Anda.',
      'ec.s2': 'Dari biaya trading pengguna referral. Beberapa bursa membayar seumur hidup.',
      'ec.s3': 'Tanpa modal. Tanpa pengalaman trading. Penghasilan pasif.',
      'steps.swipe': 'Geser atau seret ← →',
      'calc.volNote': 'Rata-rata pengguna biasa: $200K–$700K / bulan'
    }
  };

  function currentLang() {
    var l = document.body.getAttribute('data-lang') || document.documentElement.lang || 'en';
    return UI[l] ? l : 'en';
  }

  function applyUiStrings() {
    var lang = currentLang();
    var s = UI[lang];
    document.querySelectorAll('[data-ui]').forEach(function (el) {
      var v = s[el.getAttribute('data-ui')];
      if (v !== undefined) el.textContent = v;
    });
    syncMenuLabel();
    document.querySelectorAll('.lang-opt-footer, .lang-opt').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-code') === lang;
      if (btn.classList.contains('lang-opt-footer')) {
        if (on) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
      } else {
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      }
    });
  }

  // ─── Mobile menu: label, Escape, close when leaving mobile width ───
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  function syncMenuLabel() {
    if (!toggle) return;
    var s = UI[currentLang()];
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-label', open ? s.closeMenu : s.openMenu);
  }
  if (toggle) toggle.addEventListener('click', function () { setTimeout(syncMenuLabel, 0); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open') && window.setMobileNav) {
      window.setMobileNav(false);
      syncMenuLabel();
      toggle && toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && mobileNav && mobileNav.classList.contains('open') && window.setMobileNav) {
      window.setMobileNav(false);
      syncMenuLabel();
    }
  }, { passive: true });

  // ─── Language dropdown: keep aria-expanded in sync ─────────────────
  var dd = document.getElementById('langDropdown');
  var ddBtn = document.querySelector('.lang-select-btn');
  if (dd && ddBtn && 'MutationObserver' in window) {
    new MutationObserver(function () {
      ddBtn.setAttribute('aria-expanded', dd.classList.contains('open') ? 'true' : 'false');
    }).observe(dd, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dd.classList.contains('open')) {
        dd.classList.remove('open');
        ddBtn.focus();
      }
    });
  }

  // Re-apply UI strings whenever app.js switches language (body[data-lang]).
  if ('MutationObserver' in window) {
    new MutationObserver(applyUiStrings).observe(document.body, { attributes: true, attributeFilter: ['data-lang'] });
  }

  // ─── Keyboard activation for non-button controls with role="button" ─
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target;
    if (!el || !el.matches || !el.matches('[role="button"][tabindex]:not(button):not(.proof-item)')) return;
    e.preventDefault();
    el.click();
  });

  // ─── Range sliders: filled track (--pct) ───────────────────────────
  function paintSlider(input) {
    var min = parseFloat(input.min) || 0;
    var max = parseFloat(input.max) || 100;
    var pct = ((parseFloat(input.value) - min) / (max - min)) * 100;
    input.style.setProperty('--pct', pct + '%');
  }
  document.querySelectorAll('input[type="range"].slider').forEach(function (input) {
    paintSlider(input);
    input.addEventListener('input', function () { paintSlider(input); });
  });

  // ─── Horizontal rails (partner stories, proof gallery) ─────────────
  document.querySelectorAll('.rail-controls').forEach(function (ctrl) {
    var rail = document.getElementById(ctrl.getAttribute('data-rail'));
    if (!rail) return;
    var btns = ctrl.querySelectorAll('.rail-btn');
    function step() {
      var item = rail.firstElementChild;
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    }
    function sync() {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      btns[0].disabled = rail.scrollLeft <= 2;
      btns[1].disabled = rail.scrollLeft >= max;
      ctrl.hidden = max <= 0;
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        rail.scrollBy({ left: step() * parseInt(b.getAttribute('data-dir'), 10), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    if ('MutationObserver' in window) new MutationObserver(sync).observe(rail, { childList: true });
    sync();
  });

  // ─── Scroll reveals (same contract as danetwork.asia InView) ───────
  // Elements are only hidden once JS runs and only if off-screen at load,
  // so content is always visible without JavaScript or with reduced motion.
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.setAttribute('data-inview', 'true'); });
      return;
    }
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-inview', 'true');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) { el.setAttribute('data-inview', 'true'); return; }
      el.setAttribute('data-inview', 'false');
      io.observe(el);
    });
  }

  function onReady() {
    applyUiStrings();
    initReveal();
    // Hero entrance runs once fonts/translations are in place.
    requestAnimationFrame(function () { document.documentElement.classList.add('ui-ready'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();
