/* ═══════════════════════════════════════════════════════════════
   DA Affiliate — App logic
   ═══════════════════════════════════════════════════════════════ */

'use strict';


// ─── MOBILE NAV ─────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
function setMobileNav(open) {
  if (!mobileNav) return;
  mobileNav.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => setMobileNav(!mobileNav.classList.contains('open')));
}
function closeMobileNav() {
  setMobileNav(false);
}
window.setMobileNav = setMobileNav;
window.closeMobileNav = closeMobileNav;

// ─── UTILITIES ──────────────────────────────────────────────────
// DA Network design language: no emoji used as UI decoration. Content strings
// keep their original text; pictographs are dropped at render time only.
// (©, ®, ™ and arrows are kept.)
var EMOJI_RE = /(?:(?![©®™↔-↙↩↪])\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}])[️‍]*\s?/gu;
function stripEmoji(s) {
  return typeof s === 'string' ? s.replace(EMOJI_RE, '') : s;
}
window.stripEmoji = stripEmoji;

var ICON_ARROW_RIGHT = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var ICON_CHECK = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';


// ─── CONFIG + LANGUAGE HELPERS ──────────────────────────────────
// Every number, URL, status and contact comes from data/config.js
// (window.DA_CONFIG). Nothing below hardcodes them.
var CFG = window.DA_CONFIG || {};

// Locales whose structured content (step guide, FAQ) has been rewritten for
// V3. Other locales keep their V2 data in place below but fall back to the
// English V3 content until re-translated ("mixed V2/V3 — not releasable").
var V3_LOCALES = ['en'];
function pageLang() { return (document.body && document.body.getAttribute('data-lang')) || 'en'; }
function contentLang(data) {
  var l = pageLang();
  return (V3_LOCALES.indexOf(l) >= 0 && data[l]) ? l : 'en';
}
// Translation lookup (current language → English fallback), defined by the
// i18n engine at the end of this file. Returns '' until it is ready.
function tr(key) { return window.daT ? window.daT(key) : ''; }

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function pad2(n) { return String(n).padStart(2, '0'); }
function availableExchanges() {
  return (CFG.exchanges || []).filter(function (e) { return e.status === 'available'; });
}
function joinNames(names) {
  if (names.length <= 1) return names.join('');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}
function cfgVars() {
  var c = CFG.counts ? CFG.counts() : { total: 0, available: 0, paused: 0 };
  var urls = CFG.urls || {};
  var tg = (CFG.contact && CFG.contact.telegram) || {};
  return {
    total: c.total, available: c.available, paused: c.paused,
    availableNames: joinNames(availableExchanges().map(function (e) { return e.name; })),
    telegramHandle: tg.handle || '',
    cashbackUrl: urls.cashback || '',
    signalUrl: urls.signalTracking || '',
    networkUrl: urls.network || ''
  };
}
// Replace {token} placeholders with config-derived values (+ optional extras).
function fillTokens(str, extra) {
  if (typeof str !== 'string') return str;
  var vars = cfgVars();
  return str.replace(/\{(\w+)\}/g, function (m, k) {
    if (extra && extra[k] !== undefined) return extra[k];
    return vars[k] !== undefined ? vars[k] : m;
  });
}
window.fillTokens = fillTokens;

// Static markup bindings: data-link → href, data-cfg → text, data-disclaimer → text.
function applyConfigBindings(root) {
  root = root || document;
  var urls = CFG.urls || {};
  root.querySelectorAll('[data-link]').forEach(function (el) {
    var u = urls[el.getAttribute('data-link')];
    if (u) el.setAttribute('href', u);
  });
  var v = cfgVars();
  var map = {
    'count.available': v.available, 'count.paused': v.paused, 'count.total': v.total,
    'telegram.handle': v.telegramHandle
  };
  root.querySelectorAll('[data-cfg]').forEach(function (el) {
    var val = map[el.getAttribute('data-cfg')];
    if (val !== undefined && val !== null) el.textContent = val;
  });
  var d = CFG.disclaimers || {};
  root.querySelectorAll('[data-disclaimer]').forEach(function (el) {
    var txt = d[el.getAttribute('data-disclaimer')];
    if (txt) el.textContent = txt; else el.hidden = true;
  });
}
applyConfigBindings();


// ─── AFFILIATE GUIDE STEPS ───────────────────────────────────────
const stepsData = {
  vi: [
    {
      title: 'Hiểu Về Affiliate Crypto',
      subtitle: 'Nền tảng kiến thức cơ bản trước khi bắt đầu',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Affiliate Crypto Là Gì?</h4>
          <p>Affiliate (tiếp thị liên kết) trong crypto là hình thức bạn giới thiệu người khác đến các sàn giao dịch, ứng dụng hoặc dịch vụ crypto thông qua <strong>link referral riêng của bạn</strong>.</p>
          <p>Khi người được giới thiệu thực hiện giao dịch, bạn nhận được một phần <strong>phí giao dịch</strong> từ sàn — hoàn toàn tự động, không cần bạn làm gì thêm.</p>
          <ul class="step-list">
            <li>Không cần vốn đầu tư hay kinh nghiệm giao dịch</li>
            <li>Thu nhập thụ động — kiếm 24/7 kể cả khi ngủ</li>
            <li>Hoa hồng từ 20% đến 50% phí giao dịch</li>
            <li>Một số sàn trả hoa hồng suốt đời (lifetime commission)</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Ví Dụ Thực Tế</div>
          <p>Bạn giới thiệu <strong>anh Hùng</strong> đăng ký Binance qua link của bạn.</p>
          <p style="margin-top:12px">Anh Hùng giao dịch <strong>$10,000 BTC</strong> với phí 0.1% = <strong>$10 phí</strong></p>
          <p style="margin-top:8px">Bạn nhận <strong>40% hoa hồng</strong> = <strong>$4 mỗi giao dịch</strong></p>
          <p style="margin-top:8px">Nếu anh Hùng giao dịch 10 lần/tháng → bạn kiếm <strong>$40/tháng</strong> chỉ từ 1 người!</p>
          <div class="step-tip" style="margin-top:12px"><strong>💡 Mẹo:</strong> 100 người × $40/tháng = <strong>$4,000/tháng thu nhập thụ động</strong></div>
        </div>
      </div>`,
    },
    {
      title: 'Chọn Sàn Giao Dịch Affiliate',
      subtitle: 'Không phải sàn nào cũng như nhau — chọn đúng để tối đa hóa thu nhập',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Tiêu Chí Chọn Sàn Affiliate</h4>
          <p>Sàn tốt cần có <strong>uy tín, tỷ lệ hoa hồng cao</strong> và <strong>hệ thống tracking minh bạch</strong>. Đây là các tiêu chí quan trọng nhất:</p>
          <ul class="step-list">
            <li>Tỷ lệ hoa hồng: tối thiểu 20%, tốt nhất 40–50%</li>
            <li>Thời hạn cookie: càng lâu càng tốt (30+ ngày)</li>
            <li>Độ uy tín: khối lượng giao dịch lớn, có giấy phép</li>
            <li>Dashboard rõ ràng: theo dõi click, đăng ký, thu nhập</li>
            <li>Thanh toán đúng hạn: hàng tuần hoặc hàng tháng</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Top 3 Sàn Được Khuyến Nghị</div>
          <p>3 sàn tốt nhất để bắt đầu với DA Affiliate — đã được kiểm chứng bởi <strong>237+ partner</strong>. Chi tiết bên dưới ↓</p>
        </div>
      </div>
      <div class="exchange-cards-wrap">
        <div class="exchange-cards-header">
          <h4>🚀 TOP 3 SÀN ĐƯỢC KHUYẾN NGHỊ CHO PARTNER DA Affiliate</h4>
          <p>3 sàn tốt nhất để bắt đầu — đã được kiểm chứng bởi 237+ partner</p>
        </div>
        <div class="exchange-cards">
          <div class="exchange-card rank-1">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥇 #1</span>
            </div>
            <h5 class="exchange-name">BINANCE</h5>
            <p class="exchange-tagline">Sàn Lớn Nhất Thế Giới</p>
            <ul class="exchange-stats">
              <li>100+ triệu người dùng toàn cầu</li>
              <li>Liquidity cao nhất, phí giao dịch thấp</li>
              <li>Support đa ngôn ngữ, uy tín A+</li>
            </ul>
            <p class="exchange-why">Binance là cầu nối lý tưởng để bắt đầu. Với 100+ triệu user, cơ hội giới thiệu rộng mở. Mặc dù hoa hồng 31.5% không phải cao nhất, volume giao dịch lớn đảm bảo commission ổn định.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Hoa hồng</span>
              <span class="exchange-commission-value">31.5%</span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> Người mới + referral số lượng lớn</div>
          </div>
          <div class="exchange-card rank-2">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥈 #2</span>
              <span class="exchange-badge">🔗 Close Partnership</span>
            </div>
            <h5 class="exchange-name">OURBIT</h5>
            <p class="exchange-tagline">Đối Tác Chiến Lược Của DA Affiliate</p>
            <ul class="exchange-stats">
              <li>Hoa hồng cao nhất Đông Nam Á: 43%</li>
              <li>Tập trung vào thị trường SEA</li>
              <li>Hỗ trợ trực tiếp từ DA Affiliate team</li>
            </ul>
            <p class="exchange-why">Ourbit là lựa chọn chiến lược của DA Affiliate. Mức hoa hồng 43% là cao nhất Đông Nam Á — giúp partner kiếm nhiều hơn từ cùng số lượng referral. Team Ourbit hỗ trợ direct, cộng thêm support từ DA Affiliate, bạn không bao giờ cảm thấy cô đơn.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Hoa hồng</span>
              <span class="exchange-commission-value">43% <span class="star">⭐</span></span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> Tối đa thu nhập + hỗ trợ chuyên sâu</div>
          </div>
          <div class="exchange-card rank-3">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥉 #3</span>
              <span class="exchange-badge">🛡️ Partner-Friendly</span>
            </div>
            <h5 class="exchange-name">BINGX</h5>
            <p class="exchange-tagline">Chương Trình Hỗ Trợ Partner Tốt Nhất</p>
            <ul class="exchange-stats">
              <li>Đội ngũ support partner riêng biệt</li>
              <li>Nhiều chương trình khuyến mãi cho user</li>
              <li>Payout nhanh, hỗ trợ 24/7</li>
            </ul>
            <p class="exchange-why">Bingx nổi bật nhờ đội ngũ support partner chuyên biệt + chương trình khuyến mãi liên tục cho user. Điều này có nghĩa user của bạn sẽ giao dịch nhiều hơn, commission của bạn sẽ tăng theo. Hỗ trợ 24/7 cũng là điểm cộng lớn.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Hoa hồng</span>
              <span class="exchange-commission-value">28%</span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> Giữ chân user + hoạt động ổn định</div>
          </div>
        </div>
        <div class="exchange-strategy-tip">
          <h5>💡 LỜI KHUYÊN: Đăng ký cả 3 sàn để tối đa hóa thu nhập</h5>
          <ul>
            <li>Chọn <strong>Binance</strong> làm "base" — volume lớn, người dùng đông</li>
            <li>Chọn <strong>Ourbit</strong> làm "high-margin" — 43% commission cao nhất SEA</li>
            <li>Chọn <strong>Bingx</strong> làm "engagement" — chương trình hỗ trợ tốt</li>
          </ul>
          <p><strong>Cách tiếp cận:</strong> Chia user thành 3 nhóm, giới thiệu theo sàn phù hợp với nhu cầu của họ. Tổng cộng, bạn sẽ nhận hoa hồng từ cả 3 sàn mà không cần tăng effort nhiều.</p>
        </div>
      </div>`,
    },
    {
      title: 'Tạo Tài Khoản Dưới Ref DA Affiliate',
      subtitle: 'Đăng ký dưới ref của DA Affiliate — liên hệ admin để được hỗ trợ hoa hồng & lộ trình phát triển',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Cách Bắt Đầu Với DA Affiliate</h4>
          <ul class="step-list">
            <li>Tạo tài khoản sàn giao dịch <strong>dưới link ref của DA Affiliate</strong></li>
            <li>Nhắn tin cho admin DA Affiliate sau khi đăng ký xong</li>
            <li>Admin sẽ xác nhận tài khoản và <strong>cấp hoa hồng theo lộ trình</strong></li>
            <li>Nhận hỗ trợ cá nhân hoá: chiến lược, tài liệu, và theo dõi hiệu suất</li>
            <li>Phát triển theo từng cấp độ — mở khóa hoa hồng cao hơn khi đạt mốc</li>
          </ul>
          <div class="step-tip"><strong>🎯 Tại sao nên đăng ký qua DA Affiliate?</strong> Bạn được hưởng mức hoa hồng <strong>cao hơn mặc định</strong> của sàn, có admin hỗ trợ trực tiếp và lộ trình nâng cấp rõ ràng theo doanh số.</div>
        </div>
        <div class="step-example">
          <div class="step-example-title">📊 Lộ Trình Partner DA Affiliate</div>
          <div class="partner-roadmap">
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bingx</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">25%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">30%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">39%</span><span class="tier-req">50M vol</span></div></div></div>
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bitunix</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">33%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">37%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">45%</span><span class="tier-req">50M vol</span></div></div></div>
          </div>
          <div class="step-tip" style="margin-top:14px"><strong>📩 Liên hệ admin:</strong> Sau khi tạo tài khoản, nhắn UID hoặc email đăng ký cho admin DA Affiliate để được kích hoạt hoa hồng và theo dõi lộ trình.</div>
        </div>
      </div>`,
    },
    {
      title: 'Tạo Nội Dung Thu Hút',
      subtitle: 'Content là vua — tạo nội dung đúng cách để người ta click link của bạn',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Các Dạng Nội Dung Hiệu Quả</h4>
          <p>Người xem cần <strong>lý do để click</strong> vào link của bạn — đừng spam link trần. Hãy cung cấp giá trị thực:</p>
          <ul class="step-list">
            <li>Video hướng dẫn: "Cách mua Bitcoin lần đầu tiên"</li>
            <li>Bài viết review: "Đánh giá Binance 2026 — Ưu và nhược điểm"</li>
            <li>Thread X/Twitter: "5 điều cần biết trước khi đầu tư crypto"</li>
            <li>Reels/TikTok ngắn: Giải thích khái niệm đơn giản</li>
            <li>Group Telegram/Zalo: Cung cấp tín hiệu và phân tích miễn phí</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Mẫu Nội Dung Thực Tế</div>
          <p><strong>Tiêu đề bài viết hoạt động tốt:</strong></p>
          <div class="example-box">"Mua Bitcoin ở đâu uy tín nhất 2026? [Đánh giá 5 sàn]"<br><br>"Hướng dẫn đăng ký Binance 2026 — Nhận $100 bonus"<br><br>"Binance vs OKX: Sàn nào tốt hơn cho người Việt?"</div>
          <div class="step-tip" style="margin-top:12px"><strong>💡 Mẹo SEO:</strong> Đặt link referral trong <strong>3 dòng đầu</strong> và <strong>cuối bài</strong>. Đừng để người đọc phải tìm kiếm.</div>
        </div>
      </div>`,
    },
    {
      title: 'Xây Dựng Kênh & Audience',
      subtitle: 'Không có audience = không có thu nhập. Đây là phần quan trọng nhất!',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Chọn Kênh Phù Hợp Với Bạn</h4>
          <p>Mỗi nền tảng có đặc thù riêng. Hãy chọn <strong>1–2 kênh</strong> phù hợp với sở thích và kỹ năng của bạn rồi tập trung vào đó:</p>
          <ul class="step-list">
            <li><strong>YouTube:</strong> Video dài, SEO tốt, thu nhập passive nhất</li>
            <li><strong>TikTok/Reels:</strong> Viral nhanh, tiếp cận người mới dễ</li>
            <li><strong>Telegram Channel:</strong> Tín hiệu trading, cập nhật thị trường</li>
            <li><strong>Facebook Group:</strong> Cộng đồng gắn kết, tương tác cao</li>
            <li><strong>Blog/Website:</strong> SEO dài hạn, uy tín cao</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Lộ Trình 30 Ngày Đầu</div>
          <p><strong>Tuần 1–2:</strong> Chọn kênh, tạo tài khoản, đăng 10 nội dung đầu tiên</p>
          <p style="margin-top:8px"><strong>Tuần 3:</strong> Tối ưu nội dung dựa trên phản hồi, tương tác với follower</p>
          <p style="margin-top:8px"><strong>Tuần 4:</strong> Phân tích số liệu, nhân đôi những gì hoạt động tốt</p>
          <div class="step-tip" style="margin-top:12px"><strong>🎯 Mục tiêu thực tế:</strong> Tháng đầu 100 followers → Tháng 3 có 500+ người xem thường xuyên → Thu nhập đáng kể</div>
        </div>
      </div>`,
    },
    {
      title: 'Theo Dõi Hiệu Suất',
      subtitle: 'Đo lường để cải thiện — không track = không tăng trưởng',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Các Chỉ Số Cần Theo Dõi</h4>
          <p>Mỗi sàn affiliate đều có <strong>dashboard tracking</strong> riêng. Hãy theo dõi hàng ngày để tối ưu chiến lược:</p>
          <ul class="step-list">
            <li><strong>Clicks:</strong> Số lượt click vào link referral</li>
            <li><strong>Registrations:</strong> Số người đăng ký thành công</li>
            <li><strong>Active Traders:</strong> Số người thực sự giao dịch</li>
            <li><strong>Trading Volume:</strong> Tổng khối lượng giao dịch</li>
            <li><strong>Commission Earned:</strong> Tổng hoa hồng kiếm được</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Tỷ Lệ Chuyển Đổi Thực Tế</div>
          <p>Ví dụ dashboard tháng 1 của người mới:</p>
          <div class="example-box">Clicks: <span class="highlight">1,200</span><br>Registrations: <span class="highlight">48</span> (4% conversion)<br>Active traders: <span class="highlight">12</span> (25% của registrations)<br>Total volume: <span class="highlight">$45,000</span><br>Commission: <span class="highlight">~$18</span></div>
          <div class="step-tip" style="margin-top:12px"><strong>💡 Benchmark:</strong> CTR tốt là 3–5%. Nếu thấp hơn → cải thiện vị trí đặt link và call-to-action.</div>
        </div>
      </div>`,
    },
    {
      title: 'Tối Ưu & Scale Up',
      subtitle: 'Từ $50/tháng lên $500/tháng và hơn thế nữa',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Chiến Lược Nhân Đôi Thu Nhập</h4>
          <p>Sau khi có thu nhập đầu tiên, đây là cách <strong>tăng trưởng có hệ thống</strong>:</p>
          <ul class="step-list">
            <li>Tập trung vào top 20% nội dung mang 80% traffic</li>
            <li>Tái sử dụng nội dung: 1 video → bài viết + thread + reel</li>
            <li>Xây dựng email list để remarketing</li>
            <li>Hợp tác với creator khác trong cộng đồng crypto</li>
            <li>Chạy quảng cáo có trả phí khi ROI đã được chứng minh</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Ví Dụ Scale-Up Thực Tế</div>
          <p><strong>Tháng 1:</strong> 10 người, $40 hoa hồng</p>
          <p style="margin-top:8px"><strong>Tháng 3:</strong> 80 người, $320 hoa hồng (tăng traffic từ SEO)</p>
          <p style="margin-top:8px"><strong>Tháng 6:</strong> 250 người, $1,000+ hoa hồng (viral content)</p>
          <p style="margin-top:8px"><strong>Tháng 12:</strong> 1,000+ người, $4,000+ hoa hồng/tháng</p>
          <div class="step-tip" style="margin-top:12px"><strong>🚀 Chìa khóa:</strong> Kiên trì 6 tháng đầu là thử thách lớn nhất. Hầu hết bỏ cuộc trước khi thấy kết quả!</div>
        </div>
      </div>`,
    },
    {
      title: 'Tuân Thủ & Rủi Ro Cần Biết',
      subtitle: 'Làm đúng từ đầu để không gặp rắc rối sau này',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Những Điều Bắt Buộc Phải Biết</h4>
          <ul class="step-list">
            <li><strong>Luôn công khai</strong> rằng link của bạn là link affiliate</li>
            <li>Không quảng cáo gian lận (fake volume, fake reviews)</li>
            <li>Đọc kỹ <strong>Terms of Service</strong> của từng chương trình affiliate</li>
            <li>Không tự click vào link của chính mình</li>
            <li>Khai báo thu nhập affiliate theo quy định thuế của Việt Nam</li>
          </ul>
          <div class="step-tip" style="margin-top:12px"><strong>⚠️ Cảnh báo:</strong> Vi phạm ToS có thể dẫn đến <strong>khóa tài khoản và mất toàn bộ hoa hồng</strong> chưa nhận!</div>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Tuyên Bố Mẫu Cho Nội Dung</div>
          <p>Thêm vào cuối mỗi bài viết/video:</p>
          <div class="example-box">"Bài viết này chứa link affiliate. Nếu bạn đăng ký qua link của tôi, tôi sẽ nhận được hoa hồng mà không ảnh hưởng đến chi phí của bạn. Cảm ơn vì sự ủng hộ!"</div>
          <p style="margin-top:12px"><strong>Rủi ro cần nhớ:</strong></p>
          <p>• Thị trường bearish → ít người giao dịch → thu nhập giảm</p>
          <p>• Sàn có thể thay đổi hoặc hủy chương trình affiliate</p>
          <p>• Cạnh tranh ngày càng cao trong không gian crypto</p>
        </div>
      </div>`,
    },
  ],
  // V3 English guide. Tokens in {braces} are filled from data/config.js by fillTokens().
  en: [
    {
      title: 'Choose your path',
      subtitle: 'Trader or partner: the two offers are different',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Two ways to work with DA Affiliate</h4>
          <p><strong>Traders.</strong> Experienced, higher-volume traders who prefer a simple, direct arrangement: a fixed commission on their own eligible trading fees, credited through the exchange where supported, plus a signal-only channel.</p>
          <p><strong>Partners.</strong> People building trading communities who refer other traders and want DA's partner team, support resources and commission reconciliation behind them.</p>
        </div>
        <div class="step-example">
          <div class="step-example-title">Want a plan and a community?</div>
          <p>If you want a daily plan, a member community, learning and support, the DA Cashback membership is the better fit. <a class="text-link" href="{cashbackUrl}" target="_blank" rel="noopener noreferrer">See DA Cashback</a></p>
        </div>
      </div>`,
    },
    {
      title: 'Register on an available exchange',
      subtitle: 'Only exchanges marked “Available” accept new registrations',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Use a DA Affiliate link</h4>
          <p>Register through a DA Affiliate link on one of the exchanges available now: <strong>{availableNames}</strong>. The links are in the exchange list on this page.</p>
          <p>“Partnership paused” means we are not registering new members on that exchange right now.</p>
        </div>
        <div class="step-example">
          <div class="step-example-title">Already have an account?</div>
          <p>Whether an existing account can be linked depends on the exchange. Ask DA before you open a new account, and follow the exchange's own rules.</p>
        </div>
      </div>`,
    },
    {
      title: 'Confirm your terms with DA',
      subtitle: 'Terms are set per exchange, product and tier',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>What gets confirmed</h4>
          <p>Message {telegramHandle} on Telegram with the exchange you registered on. DA confirms the terms that apply to your account:</p>
          <ul class="step-list">
            <li>the product the commission applies to</li>
            <li>how the commission is calculated</li>
            <li>your tier and any eligibility conditions</li>
            <li>when the terms start, and whether they end</li>
          </ul>
          <p>Not all exchanges support identical terms. Rates and reward tiers may change according to each exchange's policy and partner program.</p>
        </div>
        <div class="step-example">
          <div class="step-example-title">Why no rates on this page?</div>
          <p>We publish a rate only after it is confirmed for a specific exchange, product and period. Until then you will see “Terms confirmed per exchange”.</p>
        </div>
      </div>`,
    },
    {
      title: 'Trade, or share your link',
      subtitle: 'What happens once you are set up',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>After setup</h4>
          <p><strong>Traders.</strong> Trade as you normally do. Where the exchange supports it, your commission is credited through its affiliate system.</p>
          <p><strong>Partners.</strong> Share your DA Affiliate link in your own channel or community. Tell your audience it is an affiliate link, and never promise them profits.</p>
        </div>
        <div class="step-example">
          <div class="step-example-title">How the formula works</div>
          <p>A referred trader with $100,000 of monthly volume at a 0.05% fee pays $50 in fees. At a 30% commission rate, the commission on those fees would be $15.</p>
          <p>These figures only illustrate the formula. They are not DA rates and not a forecast.</p>
        </div>
      </div>`,
    },
    {
      title: 'Track and reconcile',
      subtitle: "Check the exchange dashboard and DA's reconciliation",
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Where to check</h4>
          <p>Each exchange's affiliate dashboard shows referred accounts and commission. For each period, DA reconciles commission received from exchanges against commission paid.</p>
          <p>If something does not match, contact DA with the exchange, the period and your UID.</p>
        </div>
        <div class="step-example">
          <div class="step-example-title">Keep in mind</div>
          <p>Affiliate earnings depend on your effort, audience size and market conditions. Any examples illustrate how commissions work and are not a promise of results.</p>
        </div>
      </div>`,
    },
  ],
};

let currentStep = 1;


function renderStep(n) {
  var lang = contentLang(stepsData);
  var steps = stepsData[lang];
  ensureStepTabs(steps.length);
  const s = steps[n - 1];
  const el = document.getElementById('stepContent');
  if (!el || !s) return;
  var pad = function (k) { return String(k).padStart(2, '0'); };
  var html = stripEmoji(`<div class="step-panel">
    <div class="step-panel-header">
      <div class="step-number-big" aria-hidden="true">${pad(n)}</div>
      <div>
        <h4 class="step-panel-title">${fillTokens(s.title)}</h4>
        <p class="step-panel-subtitle">${fillTokens(s.subtitle)}</p>
      </div>
    </div>
    ${fillTokens(s.content)}
  </div>`);
  // Animate only real step changes (not first paint or a language re-render)
  var dir = n > currentStep ? 1 : -1;
  var animate = el.childElementCount > 0 && n !== currentStep;
  swapStepContent(el, html, dir, animate, function () { collapseStepDetails(el, lang); });
  // One continuous progress track + "01 / 08" counter, in sync with the tabs
  var fill = document.getElementById('stepTrackFill');
  if (fill) fill.style.transform = 'scaleX(' + (n / steps.length) + ')';
  var countNow = document.getElementById('stepCountNow');
  var countTotal = document.getElementById('stepCountTotal');
  if (countNow) countNow.textContent = pad(n);
  if (countTotal) countTotal.textContent = pad(steps.length);
  // Update tabs (number + step title, active / completed state)
  document.querySelectorAll('.step-tab').forEach((t, i) => {
    var st = steps[i];
    t.classList.remove('active', 'done');
    if (i + 1 === n) t.classList.add('active');
    else if (i + 1 < n) t.classList.add('done');
    t.setAttribute('aria-selected', i + 1 === n ? 'true' : 'false');
    t.setAttribute('aria-controls', 'stepContent');
    t.tabIndex = i + 1 === n ? 0 : -1;
    if (st) {
      t.innerHTML = '<span class="step-tab-num">' + pad(i + 1) + '</span>'
        + '<span class="step-tab-title">' + stripEmoji(fillTokens(st.title)) + '</span>';
    }
  });
  // Update progress
  const prog = document.getElementById('stepProgress');
  var stepLabel = tr('steps.word') || 'Step';
  if (prog) prog.textContent = stepLabel + ' ' + n + ' / ' + steps.length;
  var btnComplete = tr('steps.complete') || 'Done';
  var btnNext     = tr('guide.next') || 'Next';
  // Update buttons
  const prev = document.getElementById('prevStep');
  const next = document.getElementById('nextStep');
  if (prev) prev.disabled = n === 1;
  if (next) {
    if (n === steps.length) {
      next.innerHTML = '<span>' + btnComplete + '</span>' + ICON_CHECK;
    } else {
      next.innerHTML = '<span>' + btnNext + '</span>' + ICON_ARROW_RIGHT;
    }
  }
  currentStep = n;
}

// Step transition: old panel fades/slides out, the frame eases to the new
// height (no layout jump for the nav below), new panel slides in from the
// direction of travel. Instant under prefers-reduced-motion.
var STEP_OUT_MS = 170, STEP_HEIGHT_MS = 420;
function swapStepContent(el, html, dir, animate, after) {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  clearTimeout(el._stepOut); clearTimeout(el._stepDone);
  if (!animate || reduce) {
    el.innerHTML = html;
    el.style.height = '';
    el.classList.remove('is-animating');
    after();
    return;
  }
  var h0 = el.offsetHeight;
  el.style.height = h0 + 'px';
  el.classList.add('is-animating');
  el.style.setProperty('--dir', dir);
  var old = el.querySelector('.step-panel');
  if (old) old.classList.add('is-leaving');
  el._stepOut = setTimeout(function () {
    el.innerHTML = html;
    after();
    var panel = el.querySelector('.step-panel');
    panel.classList.add('is-entering');
    el.style.height = 'auto';
    var h1 = el.offsetHeight;
    el.style.height = h0 + 'px';
    void el.offsetHeight; // commit start height
    el.style.height = h1 + 'px';
    requestAnimationFrame(function () { panel.classList.remove('is-entering'); });
    el._stepDone = setTimeout(function () {
      el.style.height = '';
      el.classList.remove('is-animating');
    }, STEP_HEIGHT_MS + 40);
  }, STEP_OUT_MS);
}

// After a step change, bring the top of the new step back into view — just
// below the sticky header + sticky step rail — if the reader had scrolled past it.
function scrollStepsIntoView() {
  var content = document.getElementById('stepContent');
  if (!content) return;
  var headerH = (document.querySelector('.site-header') || {}).offsetHeight || 0;
  var railH = (document.getElementById('stepRail') || {}).offsetHeight || 0;
  var top = content.getBoundingClientRect().top;
  var offset = headerH + railH + 16;
  if (top < offset) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: window.scrollY + top - offset, behavior: reduce ? 'auto' : 'smooth' });
  }
}

function stepCount() {
  return stepsData[contentLang(stepsData)].length;
}

// Tabs are built from the step data, so the guide can have any number of steps.
function ensureStepTabs(n) {
  var wrap = document.getElementById('stepTabs');
  if (!wrap || wrap.children.length === n) return;
  var html = '';
  for (var i = 1; i <= n; i++) html += '<button class="step-tab" type="button" data-step="' + i + '" role="tab">' + i + '</button>';
  wrap.innerHTML = html;
}
function goToStep(n) {
  if (n < 1 || n > stepCount() || n === currentStep) return;
  renderStep(n);
  scrollStepsIntoView();
}

// Swipe / drag sideways on the step content: left → next, right → previous.
// Vertical scrolling stays native (touch-action: pan-y); the panel follows
// the pointer, resists past the first/last step, and springs back if the
// gesture is too short.
(function initStepSwipe() {
  var area = document.getElementById('stepContent');
  if (!area || !window.PointerEvent) return;
  var THRESHOLD = 60, sx = 0, sy = 0, st = 0, dx = 0, pid = null, axis = null, dragged = false;

  function panel() { return area.querySelector('.step-panel'); }
  function reset(p) {
    if (!p) return;
    p.style.transition = 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1), opacity 320ms';
    p.style.transform = '';
    p.style.opacity = '';
    setTimeout(function () { p.style.transition = ''; }, 340);
  }

  area.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('a, button, summary, input, select, textarea, label')) return;
    if (area.classList.contains('is-animating')) return;
    sx = e.clientX; sy = e.clientY; st = performance.now(); dx = 0; pid = e.pointerId; axis = null; dragged = false;
  });

  area.addEventListener('pointermove', function (e) {
    if (pid === null || e.pointerId !== pid) return;
    var mx = e.clientX - sx, my = e.clientY - sy;
    if (axis === null) {
      if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
      axis = Math.abs(mx) > Math.abs(my) * 1.2 ? 'x' : 'y';
      if (axis === 'y') { pid = null; return; }
      dragged = true;
      try { area.setPointerCapture(pid); } catch (err) {}
      area.classList.add('is-dragging');
      if (window.getSelection) window.getSelection().removeAllRanges();
    }
    var atEdge = (mx > 0 && currentStep === 1) || (mx < 0 && currentStep === stepCount());
    dx = atEdge ? mx * 0.25 : mx;
    var p = panel();
    if (p) {
      p.style.transition = 'none';
      p.style.transform = 'translateX(' + (dx * 0.6) + 'px)';
      p.style.opacity = String(1 - Math.min(Math.abs(dx) / 700, 0.35));
    }
  });

  function end(e) {
    if (pid === null || (e && e.pointerId !== pid)) return;
    pid = null;
    if (axis !== 'x') return;
    area.classList.remove('is-dragging');
    var fast = Math.abs(dx) > 30 && (performance.now() - st) < 250; // quick flick
    var target = currentStep + (dx < 0 ? 1 : -1);
    if ((Math.abs(dx) > THRESHOLD || fast) && target >= 1 && target <= stepCount()) {
      goToStep(target); // the dragged panel fades out from where it was released
    } else {
      reset(panel());
    }
  }
  area.addEventListener('pointerup', end);
  area.addEventListener('pointercancel', function (e) { end(e); reset(panel()); });

  // A drag is not a click (e.g. on an exchange card).
  area.addEventListener('click', function (e) {
    if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
  }, true);
})();

// ←/→ anywhere while the guide is on screen (tabs keep their own handling).
document.addEventListener('keydown', function (e) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  var t = e.target;
  if (t && (t.closest('input, textarea, select, [contenteditable="true"], .step-tab') )) return;
  if (document.querySelector('.stat-modal-overlay.open, .dq-modal.is-open, .proof-lightbox.is-open, .mobile-nav.open')) return;
  var box = document.querySelector('.steps-container');
  if (!box) return;
  var r = box.getBoundingClientRect();
  if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.4) return;
  e.preventDefault();
  goToStep(currentStep + (e.key === 'ArrowRight' ? 1 : -1));
});

// Progressive disclosure (DA Network pattern): the core of each step stays
// visible; long secondary paragraphs fold into a native <details> "Details".
function makeDisclosure(nodes, label) {
  if (!nodes.length) return;
  var d = document.createElement('details');
  d.className = 'disclosure';
  d.innerHTML = '<summary><svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span>' + label + '</span></summary><div class="disclosure-body"></div>';
  nodes[0].parentNode.insertBefore(d, nodes[0]);
  var body = d.querySelector('.disclosure-body');
  nodes.forEach(function (n) { body.appendChild(n); });
}
function collapseStepDetails(root, lang) {
  var label = tr('steps.details') || 'Details';
  // Exchange cards (step 2): keep name, tagline, rate; fold the long "why".
  root.querySelectorAll('.exchange-card').forEach(function (card) {
    makeDisclosure(Array.prototype.slice.call(card.querySelectorAll('.exchange-stats, .exchange-why')), label);
  });
  // Strategy tip: keep its heading, fold the list + explanation.
  root.querySelectorAll('.exchange-strategy-tip').forEach(function (tip) {
    makeDisclosure(Array.prototype.slice.call(tip.querySelectorAll(':scope > ul, :scope > p')), label);
  });
  // Main column: after the first heading block, fold any further sections.
  var main = root.querySelector('.step-main');
  if (main) {
    var h = main.querySelectorAll(':scope > h4');
    if (h.length > 1) {
      var rest = [], node = h[1];
      while (node) { rest.push(node); node = node.nextElementSibling; }
      makeDisclosure(rest, label);
    }
  }
}

// Tab clicks + tablist keyboard pattern (←/→), delegated because tabs are rebuilt.
(function () {
  var wrap = document.getElementById('stepTabs');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var b = e.target.closest('.step-tab');
    if (b) goToStep(parseInt(b.dataset.step, 10));
  });
  wrap.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if (!e.target.closest('.step-tab')) return;
    e.preventDefault();
    var tabs = wrap.querySelectorAll('.step-tab');
    var next = currentStep + (e.key === 'ArrowRight' ? 1 : -1);
    if (next < 1) next = tabs.length;
    if (next > tabs.length) next = 1;
    renderStep(next);
    wrap.querySelectorAll('.step-tab')[next - 1].focus();
  });
})();
document.getElementById('prevStep')?.addEventListener('click', () => {
  goToStep(currentStep - 1);
});
document.getElementById('nextStep')?.addEventListener('click', () => {
  if (currentStep < stepCount()) goToStep(currentStep + 1);
  else document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
});

renderStep(1);

// ─── EXCHANGES OPEN FOR ONBOARDING (from data/config.js) ─────────
// Only `available` exchanges are listed here, each with its byte-identical
// referral link. A rate appears only when its commission terms are
// publishable (RECONCILED/VERIFIED + publish); otherwise "Terms confirmed
// per exchange".
function renderExchanges() {
  var grid = document.getElementById('comparisonGrid');
  if (!grid) return;
  var labels = CFG.exchangeStatusLabels || {};
  var markets = CFG.marketLabels || {};
  grid.innerHTML = availableExchanges().map(function (ex, i) {
    var rate = CFG.publishedRate ? CFG.publishedRate(ex) : null;
    var terms = rate
      ? '<p class="compare-rate"><span class="compare-rate-num">' + escapeHtml(rate.ratePct) + '%</span>'
        + '<span class="compare-rate-note">' + escapeHtml(tr('exch.rate')) + '</span></p>'
      : '<p class="compare-desc">' + escapeHtml(tr('exch.terms')) + '</p>';
    return '<article class="compare-card">'
      + '<div class="compare-card-top">'
      +   '<span class="label">' + pad2(i + 1) + '</span>'
      +   '<span class="compare-tag">' + escapeHtml(markets[ex.market] || ex.market) + '</span>'
      + '</div>'
      + '<h4 class="compare-label">' + escapeHtml(ex.name) + '</h4>'
      + '<p class="status-pill status-' + escapeHtml(ex.status) + '">' + escapeHtml(labels[ex.status] || ex.status) + '</p>'
      + terms
      + (ex.referralUrl
        ? '<a class="btn btn-gold compare-cta" href="' + escapeHtml(ex.referralUrl) + '" target="_blank" rel="noopener noreferrer sponsored">'
          + escapeHtml(fillTokens(tr('exch.join'), { name: ex.name })) + '</a>'
        : '')
      + '</article>';
  }).join('');
}
renderExchanges();

// ─── CALCULATOR ──────────────────────────────────────────────────
// Illustrative only. Inputs are the visitor's own assumptions; a commission
// rate is pre-filled only from publishable per-exchange terms in config.
// No growth curve: the chart shows the cumulative total with inputs constant.
var earningsChart = null;
var CALC_IDS = ['refCount', 'tradeVol', 'commRate', 'tradeFee'];

function setupCalculator() {
  var c = CFG.calculator || {};
  var d = c.defaults || {};
  var r = c.ranges || {};
  function apply(id, range, val) {
    var el = document.getElementById(id);
    if (!el) return;
    if (range) { el.min = range.min; el.max = range.max; el.step = range.step; }
    if (val !== undefined && val !== null) el.value = val;
  }
  apply('refCount', r.referredTraders, d.referredTraders);
  apply('tradeVol', r.monthlyVolumeUsd, d.monthlyVolumeUsd);
  apply('commRate', r.commissionPct, d.commissionPct);
  apply('tradeFee', r.feePct, d.feePct);

  var sel = document.getElementById('calcExchange');
  if (sel) {
    availableExchanges().forEach(function (ex) {
      var o = document.createElement('option');
      o.value = ex.id;
      o.textContent = ex.name;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { calcRateNote(true); });
  }
  CALC_IDS.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcEarnings);
  });
}

function selectedCalcExchange() {
  var sel = document.getElementById('calcExchange');
  var id = sel ? sel.value : '';
  return (CFG.exchanges || []).filter(function (e) { return e.id === id; })[0] || null;
}

// Updates the note under the exchange picker; when `applyRate` is true and the
// exchange has publishable terms, moves the commission slider to that rate.
function calcRateNote(applyRate) {
  var note = document.getElementById('calcRateNote');
  var ex = selectedCalcExchange();
  var rate = ex && CFG.publishedRate ? CFG.publishedRate(ex) : null;
  var text;
  if (!ex) text = tr('calc.v3.rateNoteCustom');
  else if (rate) text = fillTokens(tr('calc.v3.rateNoteSet'), { name: ex.name });
  else text = fillTokens(tr('calc.v3.rateNoteNone'), { name: ex.name });
  if (note) note.textContent = text;
  if (applyRate && rate) {
    var slider = document.getElementById('commRate');
    if (slider) {
      slider.value = rate.ratePct;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}

function fmtUSD(n, dp) {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

function calcEarnings() {
  var months = (CFG.calculator && CFG.calculator.months) || 12;
  var refs = parseInt(document.getElementById('refCount')?.value || 0, 10);
  var vol = parseInt(document.getElementById('tradeVol')?.value || 0, 10);
  var comm = parseFloat(document.getElementById('commRate')?.value || 0) / 100;
  var fee = parseFloat(document.getElementById('tradeFee')?.value || 0) / 100;

  document.getElementById('refCountVal').textContent = refs;
  document.getElementById('tradeVolVal').textContent = fmtUSD(vol, 0);
  document.getElementById('commRateVal').textContent = Math.round(comm * 100);
  document.getElementById('tradeFeeVal').textContent = (fee * 100).toFixed(2);

  var totalFees = refs * vol * fee;
  var monthly = totalFees * comm;
  var perPerson = vol * fee * comm;

  document.getElementById('monthlyEarn').textContent = fmtUSD(monthly, 2);
  document.getElementById('yearlyEarn').textContent = fmtUSD(monthly * months, 0);
  document.getElementById('totalFees').textContent = fmtUSD(totalFees, 2);
  document.getElementById('perPerson').textContent = fmtUSD(perPerson, 2);

  var mWord = tr('calc.v3.month') || 'M';
  var labels = [], data = [];
  for (var i = 0; i < months; i++) {
    labels.push(mWord + (i + 1));
    data.push(parseFloat((monthly * (i + 1)).toFixed(2)));
  }

  var canvas = document.getElementById('earningsChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (earningsChart) earningsChart.destroy();
  earningsChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: tr('calc.v3.chartLabel') || 'Cumulative estimate (USD)',
        data: data,
        // DA Network tokens: --color-gold, --color-faint, --color-line
        borderColor: '#d7ad52',
        backgroundColor: 'rgba(215,173,82,0.06)',
        fill: true,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: '#d7ad52',
        borderWidth: 1.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#171717',
          borderColor: 'rgba(255,255,255,0.16)',
          borderWidth: 1,
          titleColor: '#989898',
          bodyColor: '#f5f5f3',
          cornerRadius: 4,
          displayColors: false,
          callbacks: { label: function (ctx) { return ' ' + fmtUSD(ctx.parsed.y, 2); } }
        }
      },
      scales: {
        x: {
          ticks: { color: '#707070', font: { size: 10, family: 'Geist Mono, ui-monospace, monospace' } },
          grid: { display: false },
          border: { color: 'rgba(255,255,255,0.08)' }
        },
        y: {
          ticks: { color: '#707070', font: { size: 10, family: 'Geist Mono, ui-monospace, monospace' }, callback: function (v) { return '$' + Number(v).toLocaleString('en-US'); } },
          grid: { color: 'rgba(255,255,255,0.06)' },
          border: { display: false }
        }
      },
      animation: { duration: 400 }
    }
  });
}

setupCalculator();
calcRateNote(false);
calcEarnings();


// ─── FAQ ─────────────────────────────────────────────────────────
const faqsData = {
  vi: [
    {
      q: 'Cần bao nhiêu tiền để bắt đầu affiliate crypto?',
      a: '<strong>Không cần tiền ban đầu!</strong> Tất cả chương trình affiliate crypto đều miễn phí để tham gia. Chi phí duy nhất (tùy chọn) là nếu bạn muốn chạy quảng cáo để tăng lưu lượng truy cập nhanh hơn.'
    },
    {
      q: 'Tôi có thể kiếm bao nhiêu tiền từ affiliate crypto?',
      a: 'Thu nhập phụ thuộc vào số lượng và chất lượng audience của bạn. Người mới có thể kiếm <strong>$50–$200/tháng</strong> sau 2–3 tháng. Creator có audience lớn có thể kiếm <strong>$5,000–$50,000+/tháng</strong>. Không có giới hạn trên.'
    },
    {
      q: 'Có cần biết giao dịch crypto không?',
      a: '<strong>Không bắt buộc</strong>, nhưng rất có lợi. Hiểu biết cơ bản về crypto giúp bạn tạo nội dung uy tín hơn. Tuy nhiên, nhiều affiliate thành công chỉ tập trung vào hướng dẫn đăng ký và sử dụng sàn — không cần giỏi trading.'
    },
    {
      q: 'Hoa hồng có được trả suốt đời không?',
      a: 'Tùy theo chương trình. <strong>Binance, Bybit, OKX</strong> đều trả hoa hồng suốt đời (lifetime commission) — nghĩa là bạn nhận hoa hồng từ người dùng đó miễn là họ còn giao dịch, không có thời hạn.'
    },
    {
      q: 'Làm thế nào để tăng conversion rate (tỷ lệ chuyển đổi)?',
      a: 'Các cách hiệu quả nhất: (1) <strong>Đặt link đúng vị trí</strong> — 3 dòng đầu và cuối bài; (2) <strong>Tạo urgency</strong> — bonus đăng ký có thời hạn; (3) <strong>Social proof</strong> — chia sẻ thu nhập thực của bạn; (4) <strong>Tutorial chi tiết</strong> — hướng dẫn từng bước giúp người dùng không bỏ cuộc giữa chừng.'
    },
    {
      q: 'Affiliate crypto có hợp pháp ở Việt Nam không?',
      a: '<strong>Hợp pháp</strong> về mặt tiếp thị liên kết. Tuy nhiên, bạn cần <strong>khai báo thu nhập</strong> và nộp thuế theo quy định. Nên tham khảo chuyên gia thuế nếu thu nhập vượt quá ngưỡng nhất định.'
    },
    {
      q: 'Kênh nào tốt nhất cho affiliate crypto tại Việt Nam?',
      a: 'Theo thực tế: <strong>YouTube</strong> có ROI cao nhất dài hạn (video xếp hạng SEO mãi mãi). <strong>Telegram</strong> tốt cho cộng đồng trading. <strong>TikTok</strong> phát triển nhanh nhất hiện tại. <strong>Facebook Groups</strong> có tương tác cao. Hãy bắt đầu với kênh bạn đã có sẵn audience.'
    },
    {
      q: 'Làm sao để theo dõi thu nhập affiliate?',
      a: 'Mỗi sàn đều có <strong>dashboard riêng</strong> để theo dõi click, đăng ký và hoa hồng. Ngoài ra, bạn có thể dùng <strong>UTM parameters</strong> trong Google Analytics để phân tích nguồn traffic chi tiết hơn và biết nội dung nào đang hoạt động tốt nhất.'
    },
  ],
  // V3 English FAQ. Tokens in {braces} are filled from data/config.js by fillTokens().
  en: [
    {
      q: 'What is DA Affiliate?',
      a: 'DA Affiliate is the affiliate programme of DA Network. It offers a fixed commission arrangement for experienced, higher-volume traders, and partner development for people building trading communities.'
    },
    {
      q: 'How is the trader offering different from DA Cashback?',
      a: 'DA Cashback is a membership: fee rewards at volume milestones plus a daily plan, member community, learning and support. The DA Affiliate trader offering is a direct arrangement: a fixed commission on your own eligible trading fees, where the exchange programme supports it, and a signal-only channel. It does not include the DA Cashback membership benefits. <a class="text-link" href="{cashbackUrl}" target="_blank" rel="noopener noreferrer">See DA Cashback</a>'
    },
    {
      q: 'Which exchanges can I join through DA Affiliate?',
      a: '{availableNames} are available now. The other exchanges on our list show “Partnership paused”, which means we are not registering new members on them right now. <a class="text-link" href="deals.html">See all {total} exchanges</a>'
    },
    {
      q: 'What commission rate will I get?',
      a: "Terms are confirmed per exchange. They depend on the product, how the commission is calculated, your tier and your eligibility. We publish a rate only once it is confirmed. Rates and reward tiers may change according to each exchange's policy and partner program."
    },
    {
      q: 'For how long is commission paid?',
      a: "It depends on each exchange's programme. DA tells you what applies when your terms are confirmed."
    },
    {
      q: 'Can I build a team of partners under me?',
      a: 'DA Affiliate pays on one direct level: commission comes from the trading fees of traders you refer directly. If you want to build a team of partners, talk to DA directly.'
    },
    {
      q: 'How much can a partner make?',
      a: 'There is no typical figure we can promise. Affiliate earnings depend on your effort, audience size and market conditions. The calculator shows how the formula behaves with your own assumptions.'
    },
    {
      q: 'Are there rules I need to check where I live?',
      a: "Rules on affiliate marketing, promoting crypto products and declaring income differ by country. Check the rules that apply to you, and each exchange's eligibility terms, before you start. This site does not give legal or tax advice."
    },
    {
      q: 'How do I join?',
      a: 'Message {telegramHandle} on Telegram. Say whether you are joining as a trader or a partner, and which exchange you use or plan to use.'
    },
  ],
  th: [
    { q: 'ต้องใช้เงินเท่าไรในการเริ่มต้น crypto affiliate?', a: '<strong>ไม่ต้องใช้เงินเลย!</strong> โปรแกรม crypto affiliate ทุกโปรแกรมเข้าร่วมได้ฟรี ค่าใช้จ่ายเดียว (ไม่บังคับ) คือหากต้องการลงโฆษณาเพื่อเพิ่ม traffic เร็วขึ้น' },
    { q: 'หาเงินได้เท่าไรจาก crypto affiliate?', a: 'รายได้ขึ้นอยู่กับขนาดและคุณภาพของผู้ชม มือใหม่สามารถหาได้ <strong>$50–$200/เดือน</strong> หลัง 2–3 เดือน ผู้สร้างที่มีผู้ชมมากสามารถหาได้ <strong>$5,000–$50,000+/เดือน</strong> ไม่มีขีดจำกัด' },
    { q: 'ต้องรู้เรื่องการเทรด crypto ไหม?', a: '<strong>ไม่บังคับ</strong> แต่เป็นประโยชน์มาก ความรู้พื้นฐานช่วยสร้างเนื้อหาที่น่าเชื่อถือ อย่างไรก็ตาม affiliate ที่ประสบความสำเร็จหลายคนมุ่งเน้นเฉพาะคู่มือการสมัครและการใช้งาน — ไม่ต้องเก่งเรื่องการเทรด' },
    { q: 'ค่าคอมมิชชันจ่ายตลอดชีพไหม?', a: 'ขึ้นอยู่กับโปรแกรม <strong>Binance, Bybit และ OKX</strong> ทุกแห่งมีค่าคอมมิชชันตลอดชีพ — รับค่าคอมมิชชันตราบใดที่ผู้ใช้ยังคงเทรด ไม่มีวันหมดอายุ' },
    { q: 'จะเพิ่ม conversion rate ได้อย่างไร?', a: 'วิธีที่มีประสิทธิภาพสูงสุด: (1) <strong>วางลิงก์ถูกตำแหน่ง</strong> — 3 บรรทัดแรกและท้ายโพสต์; (2) <strong>สร้างความเร่งด่วน</strong> — โบนัสสมัครมีเวลาจำกัด; (3) <strong>Social proof</strong> — แบ่งปันรายได้จริง; (4) <strong>บทแนะนำละเอียด</strong> — ช่วยให้ผู้ใช้ไม่ล้มเลิกกลางคัน' },
    { q: 'affiliate crypto ถูกกฎหมายไหม?', a: '<strong>ถูกกฎหมาย</strong>ในฐานะ affiliate marketing อย่างไรก็ตาม ต้อง<strong>แจ้งรายได้</strong>และเสียภาษีตามกฎหมาย ควรปรึกษาผู้เชี่ยวชาญด้านภาษีหากรายได้เกินขีดจำกัดที่กำหนด' },
    { q: 'แพลตฟอร์มไหนดีที่สุดสำหรับ crypto affiliate?', a: '<strong>YouTube</strong> มี ROI ระยะยาวสูงสุด (วิดีโอติด SEO ตลอดไป) <strong>Telegram</strong> ดีสำหรับชุมชนการเทรด <strong>TikTok</strong> เป็นช่องที่เติบโตเร็วที่สุด <strong>Facebook Groups</strong> มีการมีส่วนร่วมสูง เริ่มด้วยแพลตฟอร์มที่มีผู้ชมอยู่แล้ว' },
    { q: 'จะติดตามรายได้ affiliate ได้อย่างไร?', a: 'ทุกตลาดมี <strong>dashboard</strong> ติดตาม click, การสมัคร และค่าคอมมิชชัน คุณยังสามารถใช้ <strong>UTM parameters</strong> ใน Google Analytics เพื่อวิเคราะห์แหล่ง traffic และระบุเนื้อหาที่ทำงานได้ดีที่สุด' },
  ],
  ko: [
    { q: 'Crypto affiliate 마케팅을 시작하는 데 얼마가 필요한가요?', a: '<strong>돈이 필요 없습니다!</strong> 모든 crypto affiliate 프로그램은 무료로 참여할 수 있습니다. 선택적 비용은 유료 광고를 운영하여 더 빠르게 트래픽을 늘리려는 경우에만 발생합니다.' },
    { q: 'Crypto affiliate 마케팅으로 얼마를 벌 수 있나요?', a: '수익은 청중의 규모와 질에 따라 다릅니다. 초보자는 2–3개월 후 <strong>$50–$200/월</strong>을 벌 수 있습니다. 큰 청중을 가진 크리에이터는 <strong>$5,000–$50,000+/월</strong>을 벌 수 있습니다. 상한선이 없습니다.' },
    { q: 'Crypto 거래를 알아야 하나요?', a: '<strong>필수는 아니지만</strong> 매우 도움이 됩니다. 기본 지식은 더 신뢰할 수 있는 콘텐츠 제작에 도움이 됩니다. 많은 성공한 affiliate들은 가입 및 거래소 사용 가이드에만 집중합니다 — 거래 능력 불필요.' },
    { q: '커미션은 평생 지급되나요?', a: '프로그램에 따라 다릅니다. <strong>Binance, Bybit, OKX</strong> 모두 평생 커미션을 제공합니다 — 추천된 사용자가 거래하는 한 커미션을 받으며, 만료 없음.' },
    { q: '전환율을 어떻게 높일 수 있나요?', a: '가장 효과적인 방법: (1) <strong>링크를 올바른 위치에 배치</strong> — 첫 3줄과 게시물 끝; (2) <strong>긴박감 조성</strong> — 기간 한정 가입 보너스; (3) <strong>소셜 증거</strong> — 실제 수익 공유; (4) <strong>상세한 튜토리얼</strong> — 단계별 가이드로 이탈 방지.' },
    { q: 'Crypto affiliate 마케팅은 합법적인가요?', a: 'Affiliate 마케팅으로서 <strong>합법적</strong>입니다. 하지만 소득을 <strong>신고</strong>하고 세금을 납부해야 합니다. 수입이 일정 기준을 초과하는 경우 세무 전문가에게 상담하세요.' },
    { q: 'Crypto affiliate 마케팅에 가장 좋은 플랫폼은 무엇인가요?', a: '<strong>YouTube</strong>가 장기적으로 가장 높은 ROI를 가집니다. <strong>Telegram</strong>은 트레이딩 커뮤니티에 훌륭합니다. <strong>TikTok</strong>이 현재 가장 빠르게 성장하는 채널입니다. <strong>Facebook 그룹</strong>은 높은 참여율을 가집니다. 이미 청중이 있는 플랫폼부터 시작하세요.' },
    { q: 'Affiliate 수익을 어떻게 추적하나요?', a: '모든 거래소에는 클릭, 가입 및 커미션을 추적하는 자체 <strong>대시보드</strong>가 있습니다. Google Analytics에서 <strong>UTM 파라미터</strong>를 사용하여 트래픽 소스를 분석하고 가장 잘 작동하는 콘텐츠를 파악할 수 있습니다.' },
  ],
  id: [
    { q: 'Berapa banyak uang yang dibutuhkan untuk memulai crypto affiliate?', a: '<strong>Tidak perlu uang!</strong> Semua program crypto affiliate gratis untuk diikuti. Satu-satunya biaya opsional adalah jika Anda ingin menjalankan iklan berbayar untuk menumbuhkan traffic lebih cepat.' },
    { q: 'Berapa banyak yang bisa saya hasilkan dari crypto affiliate?', a: 'Penghasilan tergantung pada ukuran dan kualitas audiens Anda. Pemula bisa menghasilkan <strong>$50–$200/bulan</strong> setelah 2–3 bulan. Kreator dengan audiens besar bisa menghasilkan <strong>$5.000–$50.000+/bulan</strong>. Tidak ada batas atas.' },
    { q: 'Apakah perlu tahu cara trading crypto?', a: '<strong>Tidak wajib</strong>, tapi sangat membantu. Pengetahuan dasar crypto membantu membuat konten yang lebih kredibel. Banyak affiliate sukses hanya berfokus pada panduan pendaftaran dan penggunaan bursa — tidak perlu keahlian trading.' },
    { q: 'Apakah komisi dibayarkan seumur hidup?', a: 'Tergantung programnya. <strong>Binance, Bybit, dan OKX</strong> semuanya menawarkan komisi seumur hidup — Anda mendapatkan komisi selama pengguna yang direferensikan terus berdagang, tanpa kedaluwarsa.' },
    { q: 'Bagaimana cara meningkatkan tingkat konversi?', a: 'Metode paling efektif: (1) <strong>Tempatkan link dengan benar</strong> — 3 baris pertama dan akhir postingan; (2) <strong>Ciptakan urgensi</strong> — bonus pendaftaran terbatas waktu; (3) <strong>Social proof</strong> — bagikan penghasilan nyata; (4) <strong>Tutorial terperinci</strong> — panduan langkah demi langkah agar pengguna tidak berhenti di tengah jalan.' },
    { q: 'Apakah crypto affiliate marketing legal?', a: '<strong>Legal</strong> sebagai affiliate marketing. Namun, Anda perlu <strong>melaporkan penghasilan</strong> dan membayar pajak sesuai ketentuan. Konsultasikan dengan ahli pajak jika penghasilan melebihi ambang tertentu.' },
    { q: 'Platform mana yang terbaik untuk crypto affiliate?', a: '<strong>YouTube</strong> memiliki ROI jangka panjang tertinggi. <strong>Telegram</strong> bagus untuk komunitas trading. <strong>TikTok</strong> adalah saluran yang tumbuh paling cepat saat ini. <strong>Facebook Groups</strong> memiliki keterlibatan tinggi. Mulai dengan platform yang sudah memiliki audiens Anda.' },
    { q: 'Bagaimana cara melacak pendapatan affiliate?', a: 'Setiap bursa memiliki <strong>dashboard</strong> sendiri untuk melacak klik, pendaftaran, dan komisi. Anda juga bisa menggunakan <strong>UTM parameter</strong> di Google Analytics untuk menganalisis sumber traffic dan mengidentifikasi konten berkinerja terbaik.' },
  ],
};

const faqList = document.getElementById('faqList');
function renderFaqs() {
  if (!faqList) return;
  var faqs = faqsData[contentLang(faqsData)];
  faqList.innerHTML = stripEmoji(faqs.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <h3 class="faq-heading">
        <button class="faq-question" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}" onclick="toggleFaq(${i})">
          <span class="faq-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <span class="faq-q-text">${fillTokens(f.q)}</span>
          <svg class="faq-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </h3>
      <div class="faq-answer" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
        <div class="faq-answer-inner"><div class="faq-answer-body">${fillTokens(f.a)}</div></div>
      </div>
    </div>
  `).join(''));
}
renderFaqs();

function toggleFaq(i) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, idx) => {
    if (idx === i) item.classList.toggle('open');
    else item.classList.remove('open');
    const q = item.querySelector('.faq-question');
    if (q) q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
  });
}
window.toggleFaq = toggleFaq;

// ─── SMOOTH SCROLL FOR NAV ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') { // logo: back to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── HEADER SCROLL EFFECT ───────────────────────────────────────
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });


/* ══════════════════════════════════════════
   PARTNER STATISTICS — from DA_CONFIG.partnerMetrics
   A value is shown only when CFG.isPublishable(metric) is true
   (value set, publish:true, RECONCILED or VERIFIED). Otherwise the tile
   reads "Awaiting verified data" — never 0, never "Verified".
══════════════════════════════════════════ */
function formatMetric(m) {
  if (typeof m.value === 'number') {
    return m.unit === 'USD' ? fmtUSD(m.value, 0) : m.value.toLocaleString('en-US');
  }
  return String(m.value);
}
function renderMetrics() {
  var grid = document.getElementById('metricGrid');
  if (!grid) return;
  var isPub = CFG.isPublishable || function () { return false; };
  grid.innerHTML = (CFG.partnerMetrics || []).map(function (m) {
    var pub = isPub(m);
    var meta = '';
    if (pub) {
      var bits = [];
      if (m.reportingPeriod) bits.push(escapeHtml(tr('stats.period')) + ': ' + escapeHtml(m.reportingPeriod));
      if (m.source) bits.push(escapeHtml(tr('stats.source')) + ': ' + escapeHtml(m.source));
      if (m.lastUpdated) bits.push(escapeHtml(tr('stats.updated')) + ': ' + escapeHtml(m.lastUpdated));
      meta = '<dd class="metric-meta">' + bits.join(' · ') + '</dd>';
    }
    return '<div class="metric-tile' + (pub ? '' : ' is-pending') + '">'
      + '<dt class="metric-label">' + escapeHtml(m.label) + '</dt>'
      + '<dd class="metric-value">' + (pub ? escapeHtml(formatMetric(m)) : '<span class="metric-pending">' + escapeHtml(tr('stats.awaiting')) + '</span>') + '</dd>'
      + meta
      + '</div>';
  }).join('');
}
renderMetrics();

/* ══════════════════════════════════════════
   OPTIONAL PERKS — rendered only when enabled:true in config
   (trading bot, Plan Market, Facts & Quotes are all disabled today)
══════════════════════════════════════════ */
function renderPerks() {
  var grid = document.getElementById('perksGrid');
  if (!grid) return;
  var perks = CFG.perks || {};
  var on = Object.keys(perks).filter(function (k) { return perks[k] && perks[k].enabled && perks[k].title; });
  grid.hidden = on.length === 0;
  grid.innerHTML = on.map(function (k, i) {
    var p = perks[k];
    return '<article class="dq-card"><div class="dq-card-top"><span class="label">' + pad2(i + 1) + '</span></div>'
      + '<div class="dq-card-content"><h3>' + escapeHtml(p.title) + '</h3>'
      + (p.description ? '<p>' + escapeHtml(p.description) + '</p>' : '') + '</div></article>';
  }).join('');
}
renderPerks();

/* ══════════════════════════════════════════
   PARTNER STORIES — only stories with written consent (config.partnerStories)
══════════════════════════════════════════ */
function renderStories() {
  var wrap = document.getElementById('partnerStories');
  var grid = document.getElementById('partnerWinsGrid');
  if (!wrap || !grid) return;
  var stories = (CFG.partnerStories || []).filter(function (s) { return s && s.consent === true; });
  wrap.hidden = stories.length === 0;
  grid.innerHTML = stories.map(function (s) {
    var initials = String(s.name || '').split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
    return '<article class="win-card">'
      + '<header class="win-card-head">'
      +   '<span class="win-avatar" aria-hidden="true">' + escapeHtml(initials) + '</span>'
      +   '<div class="win-identity"><strong>' + escapeHtml(s.name) + '</strong>'
      +   (s.channel ? '<small>' + escapeHtml(s.channel) + '</small>' : '') + '</div>'
      + '</header>'
      + (s.quote ? '<blockquote class="win-quote">' + escapeHtml(s.quote) + '</blockquote>' : '')
      + '<dl class="win-meta">'
      +   (s.exchange ? '<div><dt class="sr-only">Exchange</dt><dd class="win-exchange">' + escapeHtml(s.exchange) + '</dd></div>' : '')
      +   (s.period ? '<div><dt class="sr-only">Period</dt><dd class="win-commission">' + escapeHtml(s.period) + '</dd></div>' : '')
      + '</dl>'
      + '</article>';
  }).join('');
}
renderStories();

/* ══════════════════════════════════════════
   PROOF GALLERY — only images with consent:true and publish:true
   (config.proofImages). Click-to-zoom + keyboard nav (← → Esc).
══════════════════════════════════════════ */
(function initProofGallery() {
  var section = document.getElementById('proofSection');
  var gallery = document.getElementById('danFeedbackGrid');
  var lb = document.getElementById('proofLightbox');
  if (!section || !gallery || !lb) return;
  var images = (CFG.proofImages || []).filter(function (p) { return p && p.consent === true && p.publish === true; });
  section.hidden = images.length === 0;
  if (!images.length) return;

  gallery.innerHTML = images.map(function (p, i) {
    var caption = [p.exchange, p.period].filter(Boolean).join(' · ');
    return '<figure class="proof-item seq" style="--i:' + i + '" data-img="' + escapeHtml(p.file) + '" tabindex="0" role="button" aria-label="' + escapeHtml(caption) + '">'
      + '<div class="proof-thumb"><img src="' + escapeHtml(p.file) + '" alt="' + escapeHtml(caption) + '" loading="lazy"><span class="proof-zoom" aria-hidden="true">⤢</span></div>'
      + '<figcaption class="proof-caption"><span class="proof-exchange">' + escapeHtml(p.exchange || '') + '</span>'
      + '<span class="proof-period">' + escapeHtml(p.period || '') + '</span></figcaption>'
      + '</figure>';
  }).join('');

  var items = Array.from(gallery.querySelectorAll('.proof-item'));
  var img = lb.querySelector('.proof-lightbox-img');
  var idxEl = document.getElementById('proofLbIdx');
  var totalEl = document.getElementById('proofLbTotal');
  if (totalEl) totalEl.textContent = items.length;
  var current = 0;
  function show(i) {
    current = (i + items.length) % items.length;
    img.src = items[current].getAttribute('data-img');
    var a = items[current].querySelector('img');
    img.alt = a ? a.alt : '';
    if (idxEl) idxEl.textContent = current + 1;
  }
  function open(i) { show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; img.src = ''; }
  items.forEach(function (el, i) {
    el.addEventListener('click', function () { open(i); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  lb.querySelector('.proof-lightbox-close').addEventListener('click', close);
  lb.querySelector('.proof-lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.proof-lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();

/* ══════════════════════════════════════════
   CONTACT — email card and response time only when set in config
   (supportEmail and supportResponseTime are null today → hidden)
══════════════════════════════════════════ */
function renderContact() {
  var c = CFG.contact || {};
  var cards = document.getElementById('contactCards');
  var existing = document.getElementById('contactEmailCard');
  if (cards && c.supportEmail && !existing) {
    var a = document.createElement('a');
    a.id = 'contactEmailCard';
    a.className = 'lh-card lh-card-email';
    a.href = 'mailto:' + c.supportEmail;
    a.innerHTML = '<span class="lh-card-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="1.5"/><path d="M2 7l10 7 10-7"/></svg></span>'
      + '<span class="lh-card-body"><strong></strong><span class="lh-card-handle"></span></span>';
    a.querySelector('.lh-card-handle').textContent = c.supportEmail;
    cards.appendChild(a);
  }
  var card = document.getElementById('contactEmailCard');
  if (card) card.querySelector('strong').textContent = tr('contact.email.title');
  var note = document.getElementById('contactNote');
  if (note) {
    var bits = [];
    if (c.supportResponseTime) bits.push(fillTokens(tr('contact.response'), { time: c.supportResponseTime }));
    if (c.supportHours) bits.push(fillTokens(tr('contact.hours'), { hours: c.supportHours }));
    note.textContent = bits.join(' ');
    note.hidden = bits.length === 0;
  }
}
renderContact();


/* ══════════════════════════════════════════════════════════
   NAV — Dropdown & Active Section Tracking
══════════════════════════════════════════════════════════ */
(function() {
  // ── Close all dropdowns ──
  window.closeAllDropdowns = function() {
    document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('is-open'));
  };

  // ── Click outside to close ──
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-has-dropdown')) {
      closeAllDropdowns();
    }
  });

  // ── Hover: open/close dropdowns ──
  document.querySelectorAll('.nav-has-dropdown').forEach(function(item) {
    // Pure CSS :hover handles the show state — JS only needed for touch
    item.addEventListener('click', function(e) {
      const link = e.target.closest('.nav-link-dd');
      if (!link) return;
      const isOpen = item.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) item.classList.add('is-open');
    });
  });

  // ── Active section tracking via IntersectionObserver ──
  const sectionIds = ['traders', 'partners', 'how-it-works', 'calculator', 'benefits', 'stats', 'faq', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link[data-section], .nav-link-dd[data-section]');

  function setActive(sectionId) {
    navLinks.forEach(link => {
      const sec = link.getAttribute('data-section');
      if (sec === sectionId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sectionEls.forEach(el => obs.observe(el));
})();

/* ══════════════════════════════════════════════════════════
   i18n — LANGUAGE TOGGLE ENGINE
══════════════════════════════════════════════════════════ */
(function() {
  var translations = {
    vi: {
      'proof.period.dec25':'Tháng 12/2025 · 100 users','proof.period.feb26':'Tháng 02/2026 · 32 users mới','proof.period.nov25':'Tháng 11/2025 · Direct commission',
      'proof.period.jan26b':'01/2026 · Vol $5.3M · 23 traders','proof.period.feb26b':'02/2026 · Vol $8.8M · 32 traders','proof.period.dec25b':'12/2025 · USDT &amp; Inverse · Settled','proof.period.sep25':'09-10/2025 · USDT &amp; Inverse',
      'proof.note':'Tất cả screenshot trực tiếp từ dashboard sàn (Ourbit, Bingx, Binance) · Click vào ảnh để xem chi tiết · Một số thông tin nhạy cảm có thể bị che để bảo vệ partner.',
      // Nav
      'nav.cta':       'Bắt Đầu Ngay',
      'nav.guide':     'Hướng Dẫn',
      'nav.calc':      'Tính Thu Nhập',
      'nav.faq':       'FAQ',
      'nav.network':   'DA Affiliate',
      'nav.privilege': '⭐ Đặc Quyền',
      // Hero
      'hero.badge':  'Hướng Dẫn Từ A-Z • Miễn Phí 100%',
      'hero.title1': 'Kiếm Tiền Với',
      'hero.title2': 'Crypto Affiliate',
      'hero.title3': 'Từ Con Số 0',
      'hero.sub':    'Hướng dẫn toàn diện, dễ hiểu cho người mới bắt đầu. Từ khái niệm cơ bản đến chiến lược thực chiến — kèm ví dụ thực tế từng bước.',
      'hero.cta1':   'Đọc Hướng Dẫn',
      'hero.cta2':   'Tính Thu Nhập',
      // Stats
      // Network Snapshot (replaces fake live stats)
      'snap.tag':        '📊 CHỈ SỐ MẠNG LƯỚI',
      'snap.meta':       'Cập nhật ngày 1 hàng tháng · Dữ liệu đã chốt sổ',
      'snap.partners':   'Partners đang hoạt động',
      'snap.paid':       'Đã chuyển cho partner tháng trước',
      'snap.exchanges':  'Sàn đối tác chính',
      'snap.foot':       'Số “Đã chuyển” là tổng commission DA Affiliate đã thanh toán cho partner trong tháng trước, xác minh qua hồ sơ rút tiền.',
      'snap.foot.link':  'Xem cách chúng tôi xác minh →',
      // Legacy keys kept for backwards compat in modal/aria-labels
      'stats.active':     '✓ ĐÃ XÁC MINH',
      'stats.partners':   'PARTNERS',
      'stats.partnerSub': 'Cập nhật ngày 1 hàng tháng',
      'stats.hint':       'Nhấn để xem chi tiết →',
      'stats.live':       '✓ ĐÃ CHỐT SỔ',
      'stats.commLabel':  'HOA HỒNG ĐÃ CHUYỂN THÁNG TRƯỚC',
      // Guide
      'guide.tag':        'Hướng Dẫn Toàn Diện',
      'guide.title':      'Affiliate Crypto Là Gì?',
      'guide.sub':        'Tìm hiểu từ A đến Z — từ khái niệm cơ bản đến cách tạo ra thu nhập thực sự.',
      'guide.stepsTitle': '8 Bước Thực Chiến Bắt Đầu Kiếm Tiền',
      // Explainer cards
      'ec.title1': 'Affiliate Marketing Crypto Là Gì?',
      'ec.title2': 'Thu Nhập Từ Affiliate Crypto',
      'ec.title3': 'Tại Sao Chọn DA Affiliate?',
      // Calculator
      'calc.tag':   'Công Cụ Tính Toán',
      'calc.title': 'Tính Thu Nhập Affiliate',
      'calc.sub':   'Ước tính thu nhập hàng tháng dựa trên số lượng người giới thiệu và khối lượng giao dịch.',
      // FAQ
      'faq.tag':   'Câu Hỏi Thường Gặp',
      'faq.title': 'FAQ',
      // DA Affiliate
      'dan.tag':     'Mạng Lưới Affiliate',
      'dan.title':   'Giới Thiệu DA Affiliate',
      'dan.sub':     'Hệ thống affiliate crypto chuyên nghiệp — kết nối hàng trăm partner trên khắp Đông Nam Á với các sàn giao dịch hàng đầu thế giới.',
      'dan.lb.title':'Partner Đang Làm Tốt', // legacy fallback
      'dan.fb.title':'Hoa Hồng Thực Tế Của Partner',
      // Đặc Quyền
      'dq.tag':   '🔒 Dành riêng cho Partner DA Affiliate',
      'dq.title': 'Đặc Quyền Tại DA Affiliate',
      'dq.sub':   'Chỉ <strong style="color:var(--color-gold)">237 partner</strong> đang hoạt động mới có quyền truy cập. Những điều bên ngoài không thể mua được.',
      'dq.card1.title': 'Bot Trade AI — Hàn Quốc',
      'dq.card2.title': 'Kênh Update Plan Market',
      'dq.card3.title': 'Facts & Quotes Độc Quyền',
      'dq.cta.strong': 'Tất cả đặc quyền trên chỉ có khi bạn là partner DA Affiliate.',
      'dq.cta.btn':    '⚡ Tham Gia Để Mở Khóa',
      // Liên Hệ
      'lh.tag':   'Hỗ Trợ',
      'lh.title': 'Liên Hệ DA Affiliate',
      'lh.sub':   'Có thắc mắc hoặc muốn tham gia network? Đội ngũ sẵn sàng hỗ trợ 24/7.',
      // Footer
      'footer.desc':  'Hướng dẫn toàn diện về affiliate crypto cho người Việt.',
      'footer.col1':  'Hướng Dẫn',
      'footer.col2':  'Công Cụ',
      'footer.col3':  'Về DA Affiliate',
      'footer.copy':  '© 2026 DA Affiliate. Tất cả quyền được bảo lưu.',

      // Explainer cards
      'ec.h1': 'Affiliate Là Gì?',
      'ec.p1': 'Bạn giới thiệu người khác đăng ký sàn giao dịch crypto qua <strong>link riêng của bạn</strong>. Khi họ giao dịch, bạn nhận hoa hồng từ phí giao dịch của họ.',
      'ec.hint1': 'Nhấn để hiểu rõ hơn →',
      'ec.h2': 'Kiếm Được Bao Nhiêu?',
      'ec.p2': 'Hoa hồng thường từ <strong>20%–50% phí giao dịch</strong> của người được giới thiệu. Một số sàn trả hoa hồng suốt đời.',
      'ec.hint2': 'Nhấn để xem ví dụ thực tế →',
      'ec.h3': 'Ưu Điểm Nổi Bật',
      'ec.p3': 'Không cần vốn đầu tư, không cần kinh nghiệm giao dịch. Thu nhập thụ động — kiếm ngay cả khi bạn ngủ.',
      'ec.hint3': 'Nhấn để xem đầy đủ ưu điểm →',
      // Guide nav & comparison
      'guide.prev': 'Bước Trước',
      'guide.next': 'Bước Tiếp',
      'guide.compareTitle': 'So Sánh Các Sàn Affiliate Hàng Đầu',
      'guide.viewAllDeals': 'Xem tất cả 12 sàn',
      // Calculator
      'calc.inputTitle': 'Nhập Thông Số',
      'calc.lbl1': 'Số người được giới thiệu mỗi tháng',
      'calc.unit.people': 'người',
      'calc.lbl2': 'Khối lượng giao dịch TB mỗi người (USD/tháng)',
      'calc.lbl3': 'Tỷ lệ hoa hồng (%)',
      'calc.lbl4': 'Phí giao dịch của sàn (%)',
      'calc.resultTitle': 'Kết Quả Ước Tính',
      'calc.res1': 'Thu nhập tháng này',
      'calc.res2': 'Thu nhập hàng năm',
      'calc.res3': 'Tổng phí sàn thu',
      'calc.res4': 'Hoa hồng / người',
      'calc.note': '* Ước tính giả định. Thu nhập thực tế phụ thuộc vào hoạt động của người dùng và điều khoản sàn.',
      // DA Affiliate intro cards
      'dan.c1.title': 'Phủ Sóng Rộng',
      'dan.c1.body': 'Hoạt động tại Việt Nam, Indonesia, Philippines và đang mở rộng ra toàn Đông Nam Á với hơn 237 partner đang hoạt động.',
      'dan.c2.title': 'Hoa Hồng Cao Nhất',
      'dan.c2.body': 'Tỷ lệ hoa hồng lên đến <strong class="gold-text">70%</strong> — cao hơn đăng ký trực tiếp, được DA Affiliate đàm phán độc quyền với từng sàn.',
      'dan.c3.title': 'Hỗ Trợ Toàn Diện',
      'dan.c3.body': 'Đội ngũ admin hỗ trợ 24/7, cung cấp tài liệu, công cụ và lộ trình phát triển cá nhân hóa cho từng partner.',
      'dan.c4.title': 'Tăng Trưởng Bền Vững',
      'dan.c4.body': 'Nhận chia sẻ hoa hồng từ trader giới thiệu trực tiếp và sub-affiliate cấp 1 — tối đa 2 tầng.',
      // Partner Wins (replaces fake leaderboard)
      'wins.badge': '🎯 CÂU CHUYỆN THẬT',
      'wins.title': 'Partner Thật, Kết Quả Thật',
      'wins.sub': 'Không phải bảng xếp hạng thu nhập. Đây là một vài câu chuyện thực tế từ các partner đang xây traffic và nhận hoa hồng qua DA Affiliate.',
      'wins.note': 'Tất cả câu chuyện được chia sẻ với sự đồng ý của partner. Kết quả có thể khác nhau tùy vào kênh, traffic và mức độ triển khai.',
      'wins.note.link': 'Xem cách DA Affiliate xác minh partner →',
      // Verification block
      'verify.badge': '🔍 MINH BẠCH',
      'verify.title': 'Cách DA Affiliate Xác Minh Số Liệu',
      'verify.sub': 'Trong một ngành mà fake screenshot và fake leaderboard là chuyện thường — đây là cách chúng tôi đảm bảo mọi con số bạn thấy là thật.',
      'verify.s1.title': 'Dữ liệu từ dashboard sàn',
      'verify.s1.body': 'Mỗi partner đăng ký dưới link ref của DA Affiliate. Admin thấy hoa hồng pending/paid trực tiếp từ dashboard <strong>Binance, Ourbit, Bingx</strong> — không bị điều chỉnh bởi bên thứ ba.',
      'verify.s2.title': 'Hồ sơ rút tiền',
      'verify.s2.body': 'Con số “đã chuyển” hiển thị trên trang chỉ tính commission <strong>đã thanh toán thành công</strong> đến ví/tài khoản partner — không tính phần pending hoặc bị hủy. Partner có thể đối chiếu với lịch sử rút tiền của mình.',
      'verify.s3.title': 'Partner consent',
      'verify.s3.body': 'Mọi câu chuyện, quote, hay số liệu cá nhân hiển thị công khai đều <strong>có sự đồng ý</strong> của partner. Bạn có thể yêu cầu gỡ thông tin của mình bất cứ lúc nào — chúng tôi xử lý trong 48h.',
      'verify.cta.text': 'Nghĩ rằng số liệu không khớp với rút tiền của bạn? Muốn xem chi tiết về case study của một partner cụ thể?',
      'verify.cta.btn': '📩 Liên hệ admin',
      // Legacy leaderboard keys (kept for safety)
      'dan.lb.badge': '🎯 CÂU CHUYỆN THẬT',
      'dan.lb.sub': 'Network cập nhật tháng · Dữ liệu từ DA Affiliate',
      'dan.lb.h.channel': 'Kênh',
      'dan.lb.h.earn': 'Hoa Hồng/Tháng',
      'dan.lb.h.rate': 'Tỷ Lệ',
      'dan.lb.note': '* Partner consent và minh bạch dữ liệu là cam kết của DA Affiliate.',
      // Feedback
      'dan.fb.badge': '📸 BẰNG CHỨNG THỰC TẾ',
      'dan.fb.sub': 'Ảnh chụp màn hình xác nhận hoa hồng — cập nhật liên tục từ partner trong mạng lưới.',
      'dan.fb.ph1': 'Hình ảnh đang được cập nhật',
      'dan.fb.ph2': 'Partner gửi ảnh feedback về admin để được hiển thị tại đây',
      'dan.cta.text': 'Sẵn sàng tham gia DA Affiliate và bắt đầu kiếm hoa hồng?',
      'dan.cta.btn': 'Bắt Đầu Ngay',
      // Đặc Quyền cards
      'dq.badge.limited': '✓ Tuyển chọn kỹ',
      'dq.card1.body': 'Đừng thuyết phục cộng đồng của bạn. Gửi họ cái link này.',
      'dq.card2.body': 'Cập nhật <strong>kế hoạch thị trường mỗi ngày</strong> từ các trader chuyên nghiệp. Biết trước thị trường sẽ đi đâu khi người khác còn đang dò xét.',
      'dq.card3.body': 'Kênh riêng chia sẻ <strong>sự thật tài chính</strong> và <strong>triết lý sống</strong> mà tệp wealthy không bao giờ nói công khai.',
      'dq.card.details': 'Xem chi tiết',
      'dq.cta.sub': 'Tham gia — phản hồi trong 24–48h.',
      'dash.point1': 'Có cơ hội sử dụng <strong>Bot giao dịch độc quyền</strong> của DA Affiliate',
      'dash.point2': 'Có trang web tracking signal <strong>minh bạch về hiệu suất</strong> của Bot',
      'dash.btn': 'Mở dashboard →',
      'dash.disclaimer': 'Hiệu suất quá khứ không đảm bảo kết quả trong tương lai. Nội dung này không phải lời khuyên đầu tư.',
      // Popup Bot
      // Popup Market
      'popup.mkt.badge': '🟢 CẬP NHẬT HẰNG NGÀY · ĐỘC QUYỀN',
      'popup.mkt.title': 'Kênh Update Plan Market',
      'popup.mkt.lead': 'Trong khi hàng triệu người mở Twitter để bị bão thông tin — bạn nhận được kế hoạch gọn gàng, rõ ràng mỗi sáng lúc 7h.',
      'popup.mkt.f1.title': 'Plan market mỗi ngày lúc 7:00 sáng',
      'popup.mkt.f1.body': 'Phân tích xu hướng, vùng hỗ trợ/kháng cự, các pair ưu tiên trong ngày',
      'popup.mkt.f2.title': 'Phân tích macro + on-chain',
      'popup.mkt.f2.body': 'Dữ liệu on-chain, sentiment tổng hợp, tác động macro tài chính toàn cầu',
      'popup.mkt.f3.title': 'Setup giao dịch cụ thể',
      'popup.mkt.f3.body': 'Entry, SL, TP rõ ràng — chỉ việc đọc và quyết định. Không cần tự phân tích',
      'popup.mkt.f4.title': 'Cảnh báo thị trường real-time',
      'popup.mkt.f4.body': 'Thông báo ngay khi có biến động lớn — biết trước, đưa ra quyết định sớm hơn 90% còn lại',
      'popup.mkt.alert': '📊 Người nắm thông tin sớm hơn <strong>kiếm nhiều hơn</strong>. Kênh này chỉ mở cho partner — không bán ra bên ngoài.',
      'popup.mkt.cta': '🔓 Tham Gia Để Vào Kênh',
      'popup.mkt.note': 'Miễn phí · Chỉ cần là partner DA Affiliate',
      // Popup Facts
      'dq.badge.exclusive':'💎 Độc quyền', 'popup.facts.badge': '💎 ĐỘC QUYỀN · KHÔNG BÁN RA NGOÀI',
      'popup.facts.title': 'Kênh Facts &amp; Quotes Độc Quyền',
      'popup.facts.lead': 'Những gì người giàu thực sự hiểu về tiền — nhưng không bao giờ nói ra ngoài. Bây giờ nó là của bạn.',
      'popup.facts.f1.title': 'Sự thật tài chính mà trường học không dạy',
      'popup.facts.f1.body': 'Cách người giàu thực sự nghĩ về tiền, rủi ro, đầu tư và tự do tài chính',
      'popup.facts.f2.title': 'Quotes của các CEO, investor, billionaire',
      'popup.facts.f2.body': 'Triết lý sống đúc chiết từ những người đã đạt được tự do tài chính thực sự',
      'popup.facts.f3.title': 'Lifestyle elite — tư duy của tệp giàu',
      'popup.facts.f3.body': 'Cách họ nhìn thời gian, quan hệ, sức khỏe, và cơ hội khác 99% dân số như thế nào',
      'popup.facts.f4.title': 'Cập nhật đều đặn — không spam',
      'popup.facts.f4.body': 'Mỗi bài là một hạt nhân, chưng cất kĩ — đọc 2 phút thay đổi cách nghĩ cả ngày',
      'popup.facts.alert': '✨ Kênh này không có bản trả phí. <strong>Chỉ partner DA Affiliate</strong> mới được vào — và hoàn toàn miễn phí.',
      'popup.facts.cta': '🔓 Tham Gia Để Vào Kênh',
      'popup.facts.note': 'Miễn phí hoàn toàn · Chỉ cần là partner',
      // Liên Hệ
      'lh.bd.title': 'Business Development',
      'lh.bd.handle': '@jacksondz',
      'lh.card1.title': 'Telegram Admin',
      'lh.card1.handle': '@dacrypto_admin',
      'lh.card2.title': 'Nhóm Cộng Đồng',
      'lh.card2.handle': 'Telegram Group DA NETWORK',
      'lh.card3.title': 'Email Hỗ Trợ',
      'lh.card3.handle': 'support@dacrypto.net',
      'lh.note': 'Thường phản hồi trong vòng <strong>1–2 giờ</strong> trong giờ hành chính.',
      // Footer links
      'footer.link.start': 'Bắt Đầu',
      'footer.link.calc': 'Tính Thu Nhập',
      'footer.link.contact': 'Liên Hệ',
      'footer.link.calc2': 'Tính Thu Nhập',
      'footer.disclaimer': '<strong>Tuyên bố miễn trách nhiệm:</strong> Nội dung trên chỉ mang tính chất thông tin và giáo dục. Không phải lời khuyên tài chính. Đầu tư crypto có rủi ro cao.',
      'footer.copy2': '© 2026 DA Affiliate.',
    },
    en: {
      // V3 English master copy. Tokens in {braces} are filled from data/config.js.
      // Nav
      'nav.traders':  'For traders',
      'nav.partners': 'For partners',
      'nav.how':      'How it works',
      'nav.calc':     'Calculator',
      'nav.exchanges':'Exchanges',
      'nav.faq':      'FAQ',
      'nav.access':   'Access by group',
      'nav.stats':    'Partner statistics',
      'nav.contact':  'Contact',
      'nav.join':     'Join DA Affiliate',
      // Hero
      'hero.eyebrow':    'The affiliate programme of DA Network',
      'hero.h1':         'DA Affiliate',
      'hero.h2':         'for experienced traders and community builders.',
      'hero.lead':       'Two groups, two offers. Experienced, higher-volume traders can take a simple, direct arrangement: a fixed commission on their own eligible trading fees. People building trading communities get a partner team, support resources and commission reconciliation behind them.',
      'hero.join':       'Join DA Affiliate',
      'hero.toTraders':  'For traders',
      'hero.toPartners': 'For partners',
      // At a glance
      'glance.tag':     'At a glance',
      'glance.meta':    'Terms confirmed per exchange',
      'glance.traders': 'Exchanges open for onboarding',
      'glance.levels':  'Commission level — direct referrals only',
      'glance.contact': 'Business development on Telegram',
      // For traders
      'traders.tag':   'For traders',
      'traders.title': 'A direct fee arrangement for experienced traders',
      'traders.sub':   'For experienced, higher-volume traders who prefer a simple, direct arrangement to a membership. You register under a DA Affiliate link as an affiliate account and trade as usual.',
      'traders.c1.title': 'Register under a DA Affiliate link',
      'traders.c1.body':  'Open your account through a DA Affiliate link on one of the exchanges available now, set up as an affiliate account.',
      'traders.c2.title': 'Fixed commission on your own fees',
      'traders.c2.body':  'You receive a fixed commission on your own eligible trading fees, under exchange-specific terms. Terms are confirmed per exchange; not every exchange supports identical terms.',
      'traders.c3.title': 'Credited by the exchange',
      'traders.c3.body':  "Where the exchange supports it, the commission is credited through the exchange's own affiliate system.",
      'traders.c4.title': 'Signal-only channel',
      'traders.c4.body':  'You get access to a signal-only channel. Every trading decision stays your own.',
      'traders.cashback.text': 'This is not the DA Cashback membership. The daily plan, member community, learning and support are part of DA Cashback.',
      'traders.cashback.link': 'See DA Cashback',
      // Exchanges
      'exch.title':      'Exchanges open for onboarding',
      'exch.count':      '{available} available now · {paused} partnership paused',
      'exch.all':        'View all {total} exchanges',
      'exch.pausedNote': '“Partnership paused” means we are not registering new members on that exchange right now.',
      'exch.terms':      'Terms confirmed per exchange',
      'exch.rate':       'Confirmed rate',
      'exch.join':       'Register on {name}',
      // For partners
      'partners.tag':   'For partners',
      'partners.title': 'Build your channel with DA behind you',
      'partners.sub':   "DA Affiliate is DA Network's partner-development arm for people building trading communities.",
      'partners.lead':  'Earn recurring commission from every trade your referrals make, even when you’re offline.',
      'partners.c1.title': 'Direct referral business',
      'partners.c1.body':  'Refer traders to the exchanges available now through your DA Affiliate link. Commission comes from the trading fees of traders you refer directly.',
      'partners.c2.title': 'Exchange partnership arrangements',
      'partners.c2.body':  "DA manages the relationship with each exchange's partner programme and confirms which terms apply to you.",
      'partners.c3.title': 'Channel and community guidance',
      'partners.c3.body':  'Advice on building your channel or community. You can run your own channel, as long as your referrals go through your DA Affiliate link.',
      'partners.c4.title': 'Support, reconciliation and resources',
      'partners.c4.body':  "Your referrals can reach DA's customer-support team and Telegram channels. DA reconciles commission against exchange records and shares partner resources.",
      'partners.level.title': 'One direct level.',
      'partners.level.body':  'Commission comes from the trading fees of traders you refer directly. If you want to build a team of partners, talk to DA directly.',
      'partners.cta': 'Talk to DA about partnering',
      // How it works
      'how.tag':   'How it works',
      'how.title': 'How affiliate commission works',
      'how.sub':   'Exchanges share part of the trading fees they collect with the affiliate account that referred the trader. Each exchange sets its own terms.',
      'how.c1.num':   'Link',
      'how.c1.title': 'Your referral link',
      'how.c1.body':  'A trader registers on an exchange through your link and is tied to your affiliate account.',
      'how.c2.num':   'Fees',
      'how.c2.title': 'A share of trading fees',
      'how.c2.body':  "When that trader pays trading fees, the exchange pays a share to the affiliate account. The share depends on the exchange, the product and the programme's terms.",
      'how.c3.unit':  'level',
      'how.c3.title': 'Direct referrals only',
      'how.c3.body':  'Commission comes only from traders you refer directly. Terms can change when an exchange updates its programme.',
      'guide.v3.stepsTitle': 'Getting started, step by step',
      'guide.prev': 'Previous',
      'guide.next': 'Next',
      // Calculator
      'calc.v3.tag':    'Calculator',
      'calc.v3.title':  'Commission calculator',
      'calc.v3.sub':    'See how the commission formula behaves with your own assumptions. Nothing here is a DA rate, a forecast or a record of past earnings.',
      'calc.v3.inputTitle': 'Your assumptions',
      'calc.v3.exchange':   'Exchange',
      'calc.v3.exchangeCustom': 'Any exchange — my own assumptions',
      'calc.v3.rateNoteCustom': 'Commission rates are confirmed per exchange. The calculator uses the rate you enter.',
      'calc.v3.rateNoteNone':   'No commission rate is published for {name} yet. The calculator uses the rate you enter.',
      'calc.v3.rateNoteSet':    'Rate set from the confirmed {name} terms.',
      'calc.v3.lblRefs':    'Active referred traders',
      'calc.v3.unitTraders':'traders',
      'calc.v3.lblVol':     'Monthly trading volume per trader (USD)',
      'calc.v3.lblComm':    'Commission rate — your assumption (%)',
      'calc.v3.lblFee':     'Exchange trading fee — your assumption (%)',
      'calc.v3.resultTitle':'Results',
      'calc.v3.res1': 'Estimated monthly commission',
      'calc.v3.res2': 'Estimated 12-month total',
      'calc.v3.res3': 'Trading fees generated per month',
      'calc.v3.res4': 'Commission per referred trader per month',
      'calc.v3.chart':   'Cumulative estimate over 12 months, with every input held constant (no growth assumed).',
      'calc.v3.chartLabel': 'Cumulative estimate (USD)',
      'calc.v3.month':   'M',
      'calc.v3.formula': 'Commission = referred traders × monthly volume per trader × fee rate × commission rate.',
      // Access by group
      'benefits.tag':   'Access by group',
      'benefits.title': 'Who gets what',
      'benefits.sub':   'Each group gets a different set of services. Anything not listed here is not part of the current offer.',
      'benefits.trader.title': 'DA Affiliate traders',
      'benefits.trader.i1': 'Fixed commission arrangement on your own eligible fees, where the exchange programme supports it',
      'benefits.trader.i2': "Crediting through the exchange's affiliate system, where supported",
      'benefits.trader.i3': 'Signal-only channel',
      'benefits.trader.signal': 'Published signals are recorded at DA Signal Tracking',
      'benefits.cb.title': 'DA Cashback members',
      'benefits.cb.i1': 'Fee rewards at volume milestones',
      'benefits.cb.i2': 'Daily plan',
      'benefits.cb.i3': 'Member community',
      'benefits.cb.i4': 'Learning',
      'benefits.cb.i5': 'Support',
      'benefits.cb.link': 'Go to DA Cashback',
      'benefits.partner.title': 'DA Affiliate partners',
      'benefits.partner.i1': 'Partnership guidance',
      'benefits.partner.i2': 'Exchange-relationship support',
      'benefits.partner.i3': 'Channel and community development guidance',
      'benefits.partner.i4': "DA's customer-support and operational resources, including its Telegram channels",
      'benefits.partner.i5': 'Commission reconciliation',
      'benefits.partner.i6': 'Partner resources',
      // Partner statistics
      'stats.tag':   'Partner statistics',
      'stats.title': 'Partner network figures',
      'stats.sub':   'Each figure is published only after it has been reconciled against exchange records, together with its period, source and date. Until then it reads “Awaiting verified data”.',
      'stats.awaiting': 'Awaiting verified data',
      'stats.period':   'Period',
      'stats.source':   'Source',
      'stats.updated':  'Updated',
      'stories.tag':   'Partner stories',
      'stories.title': 'Partner stories',
      'stories.sub':   'Shared with written consent. Results vary with channel, audience and effort.',
      'rec.tag':   'Reconciliation',
      'rec.title': 'How DA reconciles commissions',
      'rec.sub':   "Before a commission figure is published, it is checked against the exchanges' own records.",
      'rec.s1.title': 'Exchange records',
      'rec.s1.body':  "Commission data starts from each exchange's affiliate dashboard for accounts registered under DA Affiliate links.",
      'rec.s2.title': 'Received versus paid',
      'rec.s2.body':  'For each period, DA matches commission received from exchanges against commission paid to partners. Pending or cancelled amounts are left out.',
      'rec.s3.title': 'Consent before publication',
      'rec.s3.body':  "Partner stories, quotes and screenshots appear only with the partner's written consent.",
      'rec.cta.text': 'Questions about a figure, or about your own commission?',
      'rec.cta.btn':  'Contact DA',
      'proof.v3.tag':   'Commission records',
      'proof.v3.title': 'Affiliate dashboard records',
      'proof.v3.sub':   'Screenshots from exchange affiliate dashboards, shown with consent. Each caption names the exchange and the period.',
      // FAQ
      'faq.v3.tag':   'FAQ',
      'faq.v3.title': 'Questions and answers',
      // Contact
      'contact.tag':   'Contact',
      'contact.title': 'Talk to DA Affiliate',
      'contact.sub':   'Questions about the trader offering, your terms or partnering? Message the business development team on Telegram.',
      'contact.tg.title':    'Business development',
      'contact.email.title': 'Support email',
      'contact.response':    'Typical response time: {time}.',
      'contact.hours':       'Support hours: {hours}.',
      // Footer
      'footer.v3.desc': 'The affiliate programme of DA Network.',
      'footer.v3.copy': '© 2026 DA Affiliate · part of DA Network.',
      // JS-rendered labels
      'steps.word':     'Step',
      'steps.complete': 'Done',
      'steps.details':  'Details',
    },
    th: {
      'nav.cta':'เริ่มต้นเลย','nav.guide':'คู่มือ','nav.calc':'คำนวณรายได้','nav.faq':'คำถาม','nav.network':'DA Affiliate','nav.privilege':'⭐ สิทธิพิเศษ',
      'hero.badge':'คู่มือ A–Z ครบถ้วน • ฟรี 100%','hero.title1':'หาเงินกับ','hero.title2':'Crypto Affiliate','hero.title3':'เริ่มจากศูนย์',
      'hero.sub':'คู่มือที่ครอบคลุมและเข้าใจง่ายสำหรับมือใหม่ ตั้งแต่พื้นฐานจนถึงกลยุทธ์จริง — พร้อมตัวอย่างทีละขั้นตอน',
      'hero.cta1':'อ่านคู่มือ','hero.cta2':'คำนวณรายได้',
      'snap.tag':'📊 ข้อมูลเครือข่าย','snap.meta':'อัปเดตทุกวันที่ 1 ของเดือน · ข้อมูลยืนยันแล้ว','snap.partners':'พาร์ทเนอร์ที่ใช้งานอยู่','snap.paid':'จ่ายให้พาร์ทเนอร์เดือนที่แล้ว','snap.exchanges':'ตลาดหลักที่เป็นพาร์ทเนอร์',
      'snap.foot':'ตัวเลข "จ่ายแล้ว" คือคอมมิชชันทั้งหมดที่ DA Affiliate โอนให้พาร์ทเนอร์ในเดือนที่แล้ว ยืนยันผ่านประวัติการถอน','snap.foot.link':'ดูวิธีการตรวจสอบ →',
      'stats.active':'✓ ยืนยันแล้ว','stats.partners':'พาร์ทเนอร์','stats.partnerSub':'อัปเดตทุกวันที่ 1 ของเดือน','stats.hint':'แตะเพื่อดูรายละเอียด →','stats.live':'✓ ยืนยันแล้ว','stats.commLabel':'คอมมิชชันที่จ่ายในเดือนที่แล้ว',
      'guide.tag':'คู่มือครบถ้วน','guide.title':'Crypto Affiliate คืออะไร?','guide.sub':'เรียนรู้ตั้งแต่ A ถึง Z — ตั้งแต่พื้นฐานจนถึงการสร้างรายได้จริง','guide.stepsTitle':'8 ขั้นตอนเริ่มต้นหาเงิน',
      'ec.title1':'Crypto Affiliate Marketing คืออะไร?','ec.title2':'รายได้จาก Crypto Affiliate','ec.title3':'ทำไมถึงเลือก DA Affiliate?',
      'calc.tag':'เครื่องมือคำนวณ','calc.title':'คำนวณรายได้ Affiliate','calc.sub':'ประมาณรายได้ต่อเดือนตามจำนวนผู้แนะนำและปริมาณการเทรด',
      'faq.tag':'คำถามที่พบบ่อย','faq.title':'FAQ',
      'dan.tag':'เครือข่าย Affiliate','dan.title':'เกี่ยวกับ DA Affiliate','dan.sub':'ระบบ crypto affiliate ระดับมืออาชีพ — เชื่อมต่อพาร์ทเนอร์หลายร้อยคนทั่วเอเชียตะวันออกเฉียงใต้กับตลาดแลกเปลี่ยนชั้นนำของโลก',
      'dan.lb.title':'พาร์ทเนอร์ที่ทำได้ดี','dan.fb.title':'ค่าคอมมิชชันจริงของพาร์ทเนอร์',
      'dq.tag':'🔒 เฉพาะพาร์ทเนอร์ DA Affiliate','dq.title':'สิทธิพิเศษของ DA Affiliate','dq.sub':'เฉพาะ <strong style="color:var(--color-gold)">237 พาร์ทเนอร์</strong>ที่ใช้งานอยู่เท่านั้นที่มีสิทธิ์เข้าถึง สิ่งที่ไม่สามารถซื้อได้ข้างนอก',
      'dq.card1.title':'AI Trading Bot — ทีมเกาหลี','dq.card2.title':'ช่องอัปเดตแผนตลาด','dq.card3.title':'ช่อง Facts &amp; Quotes สุดเอ็กซ์คลูซีฟ',
      'dq.cta.strong':'สิทธิพิเศษทั้งหมดข้างต้นสงวนไว้เฉพาะพาร์ทเนอร์ DA Affiliate เท่านั้น','dq.cta.btn':'⚡ เข้าร่วมเพื่อปลดล็อก',
      'lh.tag':'การสนับสนุน','lh.title':'ติดต่อ DA Affiliate','lh.sub':'มีคำถามหรืออยากเข้าร่วมเครือข่าย? ทีมพร้อมให้บริการ 24/7',
      'footer.desc':'คู่มือ crypto affiliate ที่ครอบคลุมสำหรับผู้ใช้ภาษาไทย','footer.col1':'คู่มือ','footer.col2':'เครื่องมือ','footer.col3':'เกี่ยวกับ DA Affiliate','footer.copy':'© 2026 DA Affiliate. สงวนลิขสิทธิ์ทั้งหมด',
      'ec.h1':'Affiliate คืออะไร?','ec.p1':'คุณแนะนำผู้อื่นให้สมัครตลาดแลกเปลี่ยน crypto ผ่าน<strong>ลิงก์พิเศษของคุณ</strong> เมื่อพวกเขาเทรด คุณได้รับค่าคอมมิชชันจากค่าธรรมเนียมการเทรด','ec.hint1':'แตะเพื่อเรียนรู้เพิ่มเติม →',
      'ec.h2':'หาเงินได้เท่าไร?','ec.p2':'ค่าคอมมิชชันโดยทั่วไปอยู่ที่ <strong>20%–50% ของค่าธรรมเนียมการเทรด</strong> บางตลาดจ่ายค่าคอมมิชชันตลอดชีพ','ec.hint2':'แตะเพื่อดูตัวอย่างจริง →',
      'ec.h3':'ข้อได้เปรียบหลัก','ec.p3':'ไม่ต้องใช้ทุน ไม่ต้องมีประสบการณ์การเทรด รายได้ passive — หาเงินแม้ตอนนอนหลับ','ec.hint3':'แตะเพื่อดูข้อได้เปรียบทั้งหมด →',
      'guide.prev':'ก่อนหน้า','guide.next':'ถัดไป','guide.compareTitle':'เปรียบเทียบตลาด Affiliate ชั้นนำ','guide.viewAllDeals':'ดูทั้งหมด 12 ตลาด',
      'calc.inputTitle':'กรอกข้อมูล','calc.lbl1':'จำนวนผู้แนะนำต่อเดือน','calc.unit.people':'คน','calc.lbl2':'ปริมาณการเทรดเฉลี่ยต่อคน (USD/เดือน)','calc.lbl3':'อัตราค่าคอมมิชชัน (%)','calc.lbl4':'ค่าธรรมเนียมการเทรดของตลาด (%)','calc.resultTitle':'ผลลัพธ์โดยประมาณ','calc.res1':'รายได้เดือนนี้','calc.res2':'รายได้ต่อปี','calc.res3':'ค่าธรรมเนียมตลาดทั้งหมด','calc.res4':'ค่าคอมมิชชันต่อคน','calc.note':'* ตัวเลขโดยประมาณ รายได้จริงขึ้นอยู่กับกิจกรรมของผู้ใช้และเงื่อนไขของตลาด',
      'dan.c1.title':'ครอบคลุมกว้างขวาง','dan.c1.body':'ดำเนินการในเวียดนาม อินโดนีเซีย ฟิลิปปินส์ — และกำลังขยายทั่วเอเชียตะวันออกเฉียงใต้ด้วยพาร์ทเนอร์ที่ใช้งานอยู่ 237+ คน',
      'dan.c2.title':'ค่าคอมมิชชันสูงสุด','dan.c2.body':'อัตราค่าคอมมิชชันสูงถึง <strong class="gold-text">70%</strong> — สูงกว่าการสมัครโดยตรง เจรจาโดย DA Affiliate กับแต่ละตลาดโดยเฉพาะ',
      'dan.c3.title':'การสนับสนุนเต็มรูปแบบ','dan.c3.body':'ทีม admin สนับสนุน 24/7 พร้อมทรัพยากร เครื่องมือ และแผนการเติบโตส่วนบุคคลสำหรับทุกพาร์ทเนอร์',
      'dan.c4.title':'การเติบโตที่ยั่งยืน','dan.c4.body':'รับค่าคอมมิชชันจากผู้แนะนำโดยตรงและ sub-affiliate ระดับ 1 — สูงสุด 2 ระดับ',
      'wins.badge':'🎯 เรื่องจริง','wins.title':'พาร์ทเนอร์จริง ผลลัพธ์จริง','wins.sub':'ไม่ใช่ตาราง ranking รายได้ แต่เป็นเรื่องจริงจากพาร์ทเนอร์ที่กำลังสร้าง traffic และรับค่าคอมมิชชันผ่าน DA Affiliate','wins.note':'เรื่องราวทั้งหมดแบ่งปันด้วยความยินยอมของพาร์ทเนอร์ ผลลัพธ์อาจแตกต่างกัน','wins.note.link':'ดูวิธีที่ DA Affiliate ตรวจสอบพาร์ทเนอร์ →',
      'verify.badge':'🔍 ความโปร่งใส','verify.title':'วิธีที่ DA Affiliate ตรวจสอบตัวเลข','verify.sub':'ในอุตสาหกรรมที่ screenshot ปลอมและ leaderboard ปลอมเป็นเรื่องปกติ — นี่คือวิธีที่เราทำให้ทุกตัวเลขเป็นของจริง',
      'verify.s1.title':'ข้อมูลจาก dashboard ของตลาด','verify.s1.body':'พาร์ทเนอร์ทุกคนลงทะเบียนภายใต้ลิงก์ ref ของ DA Affiliate Admin เห็นค่าคอมมิชชัน pending/paid โดยตรงจาก dashboard ของ <strong>Binance, Ourbit, Bingx</strong>',
      'verify.s2.title':'บันทึกการถอน','verify.s2.body':'ตัวเลข "จ่ายแล้ว" นับเฉพาะค่าคอมมิชชันที่<strong>โอนสำเร็จ</strong>ไปยังกระเป๋า/บัญชีของพาร์ทเนอร์ — ไม่รวม pending หรือที่ถูกยกเลิก',
      'verify.s3.title':'ความยินยอมของพาร์ทเนอร์','verify.s3.body':'ทุกเรื่อง quote และสถิติส่วนบุคคลที่แสดงต่อสาธารณะ<strong>ได้รับความยินยอม</strong> คุณสามารถขอลบข้อมูลของคุณได้ทุกเมื่อ — เราดำเนินการภายใน 48 ชั่วโมง',
      'verify.cta.text':'คิดว่าตัวเลขไม่ตรงกับการถอนของคุณ? ต้องการรายละเอียดเกี่ยวกับ case study ของพาร์ทเนอร์คนใดคนหนึ่ง?','verify.cta.btn':'📩 ติดต่อ admin',
      'dan.lb.badge':'🎯 เรื่องจริง','dan.lb.sub':'ข้อมูลรายเดือน · ข้อมูลจาก DA Affiliate','dan.lb.h.channel':'ช่องทาง','dan.lb.h.earn':'ค่าคอมมิชชัน/เดือน','dan.lb.h.rate':'อัตรา','dan.lb.note':'* ความยินยอมของพาร์ทเนอร์และความโปร่งใสของข้อมูลคือพันธสัญญาของ DA Affiliate',
      'dan.fb.badge':'📸 หลักฐานจริง','dan.fb.sub':'ภาพหน้าจอยืนยันค่าคอมมิชชัน — อัปเดตต่อเนื่องจากพาร์ทเนอร์ในเครือข่าย','dan.fb.ph1':'กำลังอัปเดตรูปภาพ','dan.fb.ph2':'พาร์ทเนอร์ส่งภาพ feedback ให้ admin เพื่อแสดงที่นี่',
      'dan.cta.text':'พร้อมเข้าร่วม DA Affiliate และเริ่มรับค่าคอมมิชชันแล้วหรือยัง?','dan.cta.btn':'เริ่มต้นเลย',
      'dq.badge.limited':'✓ คัดเลือกอย่างพิถีพิถัน','dq.card1.body':'อย่าโน้มน้าวชุมชนของคุณ ส่งลิงก์นี้ให้พวกเขา','dq.card2.body':'อัปเดต<strong>แผนตลาดทุกวัน</strong>จากเทรดเดอร์มืออาชีพ รู้ทิศทางตลาดก่อนคนอื่น','dq.card3.body':'ช่องส่วนตัวแบ่งปัน<strong>ความจริงทางการเงิน</strong>และ<strong>ปรัชญาชีวิต</strong>ที่คนรวยไม่เคยพูดต่อสาธารณะ','dq.card.details':'ดูรายละเอียด','dq.cta.sub':'เข้าร่วม — ตอบกลับภายใน 24–48 ชั่วโมง','dash.point1':'มีโอกาสใช้ <strong>บอทเทรดสุดเอ็กซ์คลูซีฟ</strong> ของ DA Affiliate','dash.point2':'มีเว็บไซต์ tracking signal <strong>โปร่งใสด้านประสิทธิภาพ</strong>ของบอท','dash.btn':'เปิด dashboard →','dash.disclaimer':'ผลการดำเนินงานในอดีตไม่รับประกันผลลัพธ์ในอนาคต เนื้อหานี้ไม่ใช่คำแนะนำการลงทุน',
      'popup.mkt.badge':'🟢 อัปเดตทุกวัน · เอ็กซ์คลูซีฟ','popup.mkt.title':'ช่องอัปเดตแผนตลาด','popup.mkt.lead':'ขณะที่ล้านคนเลื่อน Twitter ท่วมข้อมูล — คุณได้รับแผนที่สะอาด ชัดเจน ทุกเช้า 7 โมง',
      'popup.mkt.f1.title':'แผนตลาดทุกวันเวลา 7:00 น.','popup.mkt.f1.body':'วิเคราะห์แนวโน้ม โซนรองรับ/ต้านทาน คู่สกุลเงินสำคัญในวันนั้น','popup.mkt.f2.title':'การวิเคราะห์ Macro + On-chain','popup.mkt.f2.body':'ข้อมูล on-chain ความรู้สึกรวม ผลกระทบ macro ทางการเงินโลก','popup.mkt.f3.title':'การตั้งค่าเทรดเฉพาะ','popup.mkt.f3.body':'Entry, SL, TP ชัดเจน — แค่อ่านแล้วตัดสินใจ ไม่ต้องวิเคราะห์เอง','popup.mkt.f4.title':'การแจ้งเตือนตลาดแบบ real-time','popup.mkt.f4.body':'แจ้งเตือนทันทีเมื่อมีการเคลื่อนไหวครั้งใหญ่ — ลงมือก่อน 90% ของตลาด',
      'popup.mkt.alert':'📊 คนที่ได้ข้อมูลก่อน<strong>หาเงินได้มากกว่า</strong> ช่องนี้เฉพาะพาร์ทเนอร์ — ไม่มีขายภายนอก','popup.mkt.cta':'🔓 เข้าร่วมเพื่อเข้าถึงช่อง','popup.mkt.note':'ฟรี · เฉพาะพาร์ทเนอร์ DA Affiliate',
      'dq.badge.exclusive':'💎 เอ็กซ์คลูซีฟ', 'popup.facts.badge':'💎 เอ็กซ์คลูซีฟ · ไม่ขาย','popup.facts.title':'ช่อง Facts &amp; Quotes สุดเอ็กซ์คลูซีฟ','popup.facts.lead':'สิ่งที่คนรวยจริงๆ เข้าใจเกี่ยวกับเงิน — แต่ไม่เคยพูดออกมา ตอนนี้มันเป็นของคุณแล้ว',
      'popup.facts.f1.title':'ความจริงทางการเงินที่โรงเรียนไม่สอน','popup.facts.f1.body':'คนรวยคิดเกี่ยวกับเงิน ความเสี่ยง การลงทุน และอิสรภาพทางการเงินอย่างไร','popup.facts.f2.title':'คำพูดจาก CEO, นักลงทุน, มหาเศรษฐี','popup.facts.f2.body':'ปรัชญาชีวิตที่กลั่นออกมาจากผู้ที่บรรลุอิสรภาพทางการเงินที่แท้จริง','popup.facts.f3.title':'ไลฟ์สไตล์ elite — ความคิดของคนรวย','popup.facts.f3.body':'พวกเขามองเวลา ความสัมพันธ์ สุขภาพ และโอกาสอย่างไร — ต่างจาก 99% ของผู้คน','popup.facts.f4.title':'อัปเดตสม่ำเสมอ — ไม่สแปม','popup.facts.f4.body':'ทุกโพสต์คือความเข้าใจที่กลั่น — อ่าน 2 นาทีเปลี่ยนความคิดตลอดวัน',
      'popup.facts.alert':'✨ ช่องนี้ไม่มีเวอร์ชันชำระเงิน <strong>เฉพาะพาร์ทเนอร์ DA Affiliate</strong>เท่านั้นที่เข้าได้ — ฟรีโดยสมบูรณ์','popup.facts.cta':'🔓 เข้าร่วมเพื่อเข้าถึงช่อง','popup.facts.note':'ฟรีโดยสมบูรณ์ · แค่เป็นพาร์ทเนอร์',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'กลุ่มชุมชน','lh.card2.handle':'Telegram Group DA NETWORK','lh.card3.title':'อีเมลสนับสนุน','lh.card3.handle':'support@dacrypto.net','lh.note':'โดยทั่วไปตอบกลับภายใน <strong>1–2 ชั่วโมง</strong> ในเวลาทำการ',
      'footer.link.start':'เริ่มต้น','footer.link.calc':'คำนวณ','footer.link.contact':'ติดต่อ','footer.link.calc2':'คำนวณ',
      'footer.disclaimer':'<strong>ข้อจำกัดความรับผิดชอบ:</strong> เนื้อหานี้มีไว้เพื่อให้ข้อมูลและการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงิน การลงทุน crypto มีความเสี่ยงสูง','footer.copy2':'© 2026 DA Affiliate.',
    },
    ko: {
      'nav.cta':'지금 시작하기','nav.guide':'가이드','nav.calc':'수익 계산','nav.faq':'FAQ','nav.network':'DA Affiliate','nav.privilege':'⭐ 특별 혜택',
      'hero.badge':'A–Z 완전 가이드 • 100% 무료','hero.title1':'수익 창출','hero.title2':'Crypto Affiliate','hero.title3':'처음부터 시작',
      'hero.sub':'초보자를 위한 종합적이고 이해하기 쉬운 가이드. 기초부터 실전 전략까지 — 단계별 예시와 함께.',
      'hero.cta1':'가이드 읽기','hero.cta2':'수익 계산',
      'snap.tag':'📊 네트워크 현황','snap.meta':'매월 1일 업데이트 · 확정 데이터','snap.partners':'활동 중인 파트너','snap.paid':'지난달 파트너에게 지급','snap.exchanges':'핵심 파트너 거래소',
      'snap.foot':'지급 수치는 DA Affiliate가 지난달 파트너에게 실제 이체한 총 커미션으로, 출금 기록으로 검증됩니다.','snap.foot.link':'검증 방법 보기 →',
      'stats.active':'✓ 검증됨','stats.partners':'파트너','stats.partnerSub':'매월 1일 업데이트','stats.hint':'자세히 보기 →','stats.live':'✓ 확정됨','stats.commLabel':'지난달 지급된 커미션',
      'guide.tag':'완전 가이드','guide.title':'Crypto Affiliate란?','guide.sub':'A부터 Z까지 — 기초부터 실제 수익 창출까지 모두 배우기','guide.stepsTitle':'수익 창출을 위한 8단계 실전',
      'ec.title1':'Crypto Affiliate 마케팅이란?','ec.title2':'Crypto Affiliate 수익','ec.title3':'왜 DA Affiliate를 선택해야 하나?',
      'calc.tag':'계산 도구','calc.title':'Affiliate 수익 계산기','calc.sub':'추천 수와 거래량을 기반으로 월 수익을 추산합니다.',
      'faq.tag':'자주 묻는 질문','faq.title':'FAQ',
      'dan.tag':'Affiliate 네트워크','dan.title':'DA Affiliate 소개','dan.sub':'전문 암호화폐 affiliate 시스템 — 동남아시아 전역의 수백 명의 파트너와 세계 최고의 거래소를 연결합니다.',
      'dan.lb.title':'잘하고 있는 파트너','dan.fb.title':'실제 파트너 커미션',
      'dq.tag':'🔒 DA Affiliate 파트너 전용','dq.title':'DA Affiliate 멤버 특별 혜택','dq.sub':'<strong style="color:var(--color-gold)">237명의 활동 파트너</strong>만 접근 가능합니다. 외부에서는 돈으로도 살 수 없는 것들입니다.',
      'dq.card1.title':'AI 트레이딩 봇 — 한국팀','dq.card2.title':'일일 마켓 플랜 채널','dq.card3.title':'독점 Finance Facts &amp; Quotes 채널',
      'dq.cta.strong':'위의 모든 혜택은 DA Affiliate 파트너에게만 제공됩니다.','dq.cta.btn':'⚡ 가입하여 잠금 해제',
      'lh.tag':'지원','lh.title':'DA Affiliate 문의','lh.sub':'질문이 있거나 네트워크에 참여하고 싶으신가요? 팀이 24/7 대기 중입니다.',
      'footer.desc':'한국어 사용자를 위한 종합 암호화폐 affiliate 가이드.','footer.col1':'가이드','footer.col2':'도구','footer.col3':'DA Affiliate 소개','footer.copy':'© 2026 DA Affiliate. 모든 권리 보유.',
      'ec.h1':'Affiliate란?','ec.p1':'<strong>고유 링크</strong>를 통해 다른 사람들을 암호화폐 거래소에 추천합니다. 그들이 거래할 때 거래 수수료에서 커미션을 받습니다.','ec.hint1':'자세히 알아보기 →',
      'ec.h2':'얼마나 벌 수 있나요?','ec.p2':'커미션은 일반적으로 추천인의 <strong>거래 수수료의 20%–50%</strong>입니다. 일부 거래소는 평생 커미션을 지급합니다.','ec.hint2':'실제 예시 보기 →',
      'ec.h3':'주요 장점','ec.p3':'자본 불필요, 거래 경험 불필요. 패시브 인컴 — 잠자는 동안에도 수익.','ec.hint3':'모든 장점 보기 →',
      'guide.prev':'이전','guide.next':'다음','guide.compareTitle':'주요 Crypto Affiliate 거래소 비교','guide.viewAllDeals':'12개 거래소 모두 보기',
      'calc.inputTitle':'파라미터 입력','calc.lbl1':'월 추천 수','calc.unit.people':'명','calc.lbl2':'인당 평균 거래량 (USD/월)','calc.lbl3':'커미션 비율 (%)','calc.lbl4':'거래소 거래 수수료 (%)','calc.resultTitle':'예상 결과','calc.res1':'이번 달 수익','calc.res2':'연간 수익','calc.res3':'거래소 총 수수료','calc.res4':'인당 커미션','calc.note':'* 예상 수치. 실제 수익은 사용자 활동과 거래소 조건에 따라 다릅니다.',
      'dan.c1.title':'광범위한 커버리지','dan.c1.body':'베트남, 인도네시아, 필리핀에서 운영 중 — 237명 이상의 활동 파트너와 함께 동남아시아 전역으로 확장 중',
      'dan.c2.title':'최고 커미션','dan.c2.body':'최대 <strong class="gold-text">70%</strong> 커미션 비율 — 직접 가입보다 높고, DA Affiliate가 각 거래소와 독점 협상',
      'dan.c3.title':'전면 지원','dan.c3.body':'24/7 관리자 지원, 리소스, 도구 및 모든 파트너를 위한 개인화된 성장 로드맵',
      'dan.c4.title':'지속 가능한 성장','dan.c4.body':'직접 추천인과 1단계 서브 어필리에이트로부터 커미션 공유 — 최대 2단계.',
      'wins.badge':'🎯 실제 이야기','wins.title':'실제 파트너, 실제 결과','wins.sub':'수익 순위표가 아닙니다. DA Affiliate를 통해 트래픽을 구축하고 커미션을 받는 파트너들의 실제 이야기들입니다.','wins.note':'모든 이야기는 파트너의 동의를 받아 공유되었습니다. 결과는 채널, 트래픽 및 실행에 따라 다를 수 있습니다.','wins.note.link':'DA Affiliate의 파트너 검증 방법 보기 →',
      'verify.badge':'🔍 투명성','verify.title':'DA Affiliate의 수치 검증 방법','verify.sub':'가짜 스크린샷과 가짜 리더보드가 일상인 업계에서 — 여기서는 모든 수치가 실제임을 보장하는 방법입니다.',
      'verify.s1.title':'거래소 대시보드 데이터','verify.s1.body':'모든 파트너는 DA Affiliate의 ref 링크 아래 등록됩니다. 관리자는 <strong>Binance, Ourbit, Bingx</strong> 대시보드에서 직접 pending/paid 커미션을 확인합니다.',
      'verify.s2.title':'출금 기록','verify.s2.body':'이 사이트의 "지급됨" 수치는 파트너 지갑/계정으로 <strong>성공적으로 이체된</strong> 커미션만 계산합니다.',
      'verify.s3.title':'파트너 동의','verify.s3.body':'공개적으로 표시된 모든 이야기, 인용문, 개인 통계는 <strong>동의를 받아</strong> 공유됩니다. 언제든지 정보 삭제를 요청할 수 있습니다 — 48시간 내 처리.',
      'verify.cta.text':'수치가 출금 내역과 맞지 않는다고 생각하시나요? 특정 파트너 케이스 스터디에 대한 자세한 내용이 필요하신가요?','verify.cta.btn':'📩 관리자에게 문의',
      'dan.lb.badge':'🎯 실제 이야기','dan.lb.sub':'월간 스냅샷 · DA Affiliate 데이터','dan.lb.h.channel':'채널','dan.lb.h.earn':'커미션/월','dan.lb.h.rate':'비율','dan.lb.note':'* 파트너 동의와 데이터 투명성은 DA Affiliate의 약속입니다.',
      'dan.fb.badge':'📸 실제 증거','dan.fb.sub':'커미션 확인 스크린샷 — 네트워크 파트너로부터 지속적으로 업데이트됨','dan.fb.ph1':'이미지 준비 중','dan.fb.ph2':'파트너가 피드백 스크린샷을 관리자에게 제출하여 여기에 표시됩니다',
      'dan.cta.text':'DA Affiliate에 가입하고 커미션을 받을 준비가 되셨나요?','dan.cta.btn':'지금 시작하기',
      'dq.badge.limited':'✓ 엄선된 파트너','dq.card1.body':'커뮤니티를 설득하지 마세요. 이 링크를 보내세요.','dq.card2.body':'전문 트레이더들의 <strong>일일 마켓 플랜 업데이트</strong>. 다른 사람들보다 먼저 시장 방향을 파악하세요.','dq.card3.body':'부자들이 절대 공개적으로 말하지 않는 <strong>금융 진실</strong>과 <strong>삶의 철학</strong>을 공유하는 비공개 채널.','dq.card.details':'자세히 보기','dq.cta.sub':'가입 — 24–48시간 내 답변.','dash.point1':'DA Affiliate의 <strong>독점 트레이딩 봇</strong> 사용 기회','dash.point2':'봇의 <strong>투명한 성과</strong>를 보여주는 signal tracking 웹사이트','dash.btn':'대시보드 열기 →','dash.disclaimer':'과거 성과는 미래 결과를 보장하지 않습니다. 이 콘텐츠는 투자 조언이 아닙니다.',
      'popup.mkt.badge':'🟢 매일 업데이트 · 독점','popup.mkt.title':'일일 마켓 플랜 채널','popup.mkt.lead':'수백만 명이 정보 과부하 속에서 Twitter를 스크롤하는 동안 — 당신은 매일 아침 7시에 깔끔하고 명확한 플랜을 받습니다.',
      'popup.mkt.f1.title':'매일 오전 7:00 마켓 플랜','popup.mkt.f1.body':'트렌드 분석, 지지/저항 구간, 당일 우선 거래 쌍','popup.mkt.f2.title':'매크로 + 온체인 분석','popup.mkt.f2.body':'온체인 데이터, 집계된 심리, 글로벌 거시 금융 영향','popup.mkt.f3.title':'구체적인 트레이딩 셋업','popup.mkt.f3.body':'명확한 진입, SL, TP — 읽고 결정만 하면 됩니다. 자체 분석 불필요','popup.mkt.f4.title':'실시간 시장 알림','popup.mkt.f4.body':'큰 움직임 발생 시 즉시 알림 — 시장의 90%보다 먼저 행동',
      'popup.mkt.alert':'📊 정보를 먼저 얻는 사람이 <strong>더 많이 법니다</strong>. 이 채널은 파트너 전용입니다.','popup.mkt.cta':'🔓 가입하여 채널 접근','popup.mkt.note':'무료 · DA Affiliate 파트너 전용',
      'dq.badge.exclusive':'💎 독점', 'popup.facts.badge':'💎 독점 · 판매 없음','popup.facts.title':'독점 Facts &amp; Quotes 채널','popup.facts.lead':'진짜 부자들이 돈에 대해 이해하는 것 — 하지만 절대 공개적으로 말하지 않는 것. 이제 그것이 당신의 것입니다.',
      'popup.facts.f1.title':'학교에서 가르치지 않는 금융 진실','popup.facts.f1.body':'부자들이 돈, 위험, 투자, 재정적 자유에 대해 어떻게 생각하는지','popup.facts.f2.title':'CEO, 투자자, 억만장자들의 명언','popup.facts.f2.body':'진정한 재정적 자유를 달성한 사람들로부터 증류된 삶의 철학','popup.facts.f3.title':'엘리트 라이프스타일 — 부자들의 마인드셋','popup.facts.f3.body':'그들이 시간, 관계, 건강, 기회를 어떻게 보는지 — 99%와 다른 점','popup.facts.f4.title':'정기 업데이트 — 스팸 없음','popup.facts.f4.body':'모든 포스트는 집중된 인사이트 — 2분 읽기로 하루의 사고방식이 바뀜',
      'popup.facts.alert':'✨ 이 채널에는 유료 버전이 없습니다. <strong>DA Affiliate 파트너</strong>만 입장 가능 — 완전 무료.','popup.facts.cta':'🔓 가입하여 채널 접근','popup.facts.note':'완전 무료 · 파트너이기만 하면 됩니다',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'커뮤니티 그룹','lh.card2.handle':'DA NETWORK Telegram Group','lh.card3.title':'지원 이메일','lh.card3.handle':'support@dacrypto.net','lh.note':'일반적으로 업무 시간 내 <strong>1–2시간</strong> 내 답변.',
      'footer.link.start':'시작하기','footer.link.calc':'계산기','footer.link.contact':'문의','footer.link.calc2':'계산기',
      'footer.disclaimer':'<strong>면책조항:</strong> 콘텐츠는 정보 및 교육 목적으로만 제공됩니다. 재무 조언이 아닙니다. 암호화폐 투자에는 높은 위험이 따릅니다.','footer.copy2':'© 2026 DA Affiliate.',
    },
    id: {
      'nav.cta':'Mulai Sekarang','nav.guide':'Panduan','nav.calc':'Kalkulator','nav.faq':'FAQ','nav.network':'DA Affiliate','nav.privilege':'⭐ Keistimewaan',
      'hero.badge':'Panduan A–Z Lengkap • 100% Gratis','hero.title1':'Hasilkan Uang Dengan','hero.title2':'Crypto Affiliate','hero.title3':'Dari Nol',
      'hero.sub':'Panduan komprehensif dan mudah dipahami untuk pemula. Dari dasar hingga strategi nyata — dengan contoh langkah demi langkah.',
      'hero.cta1':'Baca Panduan','hero.cta2':'Hitung Penghasilan',
      'snap.tag':'📊 SNAPSHOT JARINGAN','snap.meta':'Diperbarui setiap tanggal 1 · Data yang sudah dikonfirmasi','snap.partners':'Mitra aktif','snap.paid':'Dibayarkan ke mitra bulan lalu','snap.exchanges':'Bursa mitra utama',
      'snap.foot':'Angka "Dibayar" menunjukkan total komisi yang benar-benar ditransfer DA Affiliate ke mitra bulan lalu, diverifikasi melalui catatan penarikan.','snap.foot.link':'Lihat cara kami memverifikasi →',
      'stats.active':'✓ TERVERIFIKASI','stats.partners':'MITRA','stats.partnerSub':'Diperbarui setiap tanggal 1','stats.hint':'Ketuk untuk detail →','stats.live':'✓ DIKONFIRMASI','stats.commLabel':'KOMISI YANG DIBAYARKAN BULAN LALU',
      'guide.tag':'Panduan Lengkap','guide.title':'Apa itu Crypto Affiliate?','guide.sub':'Pelajari dari A sampai Z — dari dasar hingga menghasilkan pendapatan nyata.','guide.stepsTitle':'8 Langkah Praktis untuk Mulai Menghasilkan',
      'ec.title1':'Apa itu Crypto Affiliate Marketing?','ec.title2':'Pendapatan dari Crypto Affiliate','ec.title3':'Mengapa Memilih DA Affiliate?',
      'calc.tag':'Alat Perhitungan','calc.title':'Kalkulator Pendapatan Affiliate','calc.sub':'Perkirakan penghasilan bulanan berdasarkan jumlah referral dan volume perdagangan.',
      'faq.tag':'Pertanyaan yang Sering Diajukan','faq.title':'FAQ',
      'dan.tag':'Jaringan Affiliate','dan.title':'Tentang DA Affiliate','dan.sub':'Sistem crypto affiliate profesional — menghubungkan ratusan mitra di seluruh Asia Tenggara dengan bursa global terkemuka.',
      'dan.lb.title':'Mitra yang Berprestasi','dan.fb.title':'Komisi Mitra Nyata',
      'dq.tag':'🔒 Eksklusif untuk Mitra DA Affiliate','dq.title':'Keistimewaan Anggota DA Affiliate','dq.sub':'Hanya <strong style="color:var(--color-gold)">237 mitra aktif</strong> yang memiliki akses. Hal-hal yang tidak bisa dibeli di luar.',
      'dq.card1.title':'AI Trading Bot — Tim Korea','dq.card2.title':'Saluran Update Rencana Pasar Harian','dq.card3.title':'Saluran Eksklusif Finance Facts &amp; Quotes',
      'dq.cta.strong':'Semua keistimewaan di atas hanya untuk mitra DA Affiliate.','dq.cta.btn':'⚡ Bergabung untuk Membuka',
      'lh.tag':'Dukungan','lh.title':'Hubungi DA Affiliate','lh.sub':'Ada pertanyaan atau ingin bergabung dengan jaringan? Tim kami tersedia 24/7.',
      'footer.desc':'Panduan crypto affiliate komprehensif untuk pengguna Bahasa Indonesia.','footer.col1':'Panduan','footer.col2':'Alat','footer.col3':'Tentang DA Affiliate','footer.copy':'© 2026 DA Affiliate. Semua hak dilindungi.',
      'ec.h1':'Apa itu Affiliate?','ec.p1':'Anda mereferensikan orang lain untuk mendaftar ke bursa crypto melalui <strong>link unik Anda</strong>. Ketika mereka berdagang, Anda mendapatkan komisi dari biaya perdagangan mereka.','ec.hint1':'Ketuk untuk pelajari lebih lanjut →',
      'ec.h2':'Berapa Banyak yang Bisa Anda Hasilkan?','ec.p2':'Komisi biasanya berkisar dari <strong>20%–50% dari biaya perdagangan</strong>. Beberapa bursa membayar komisi seumur hidup.','ec.hint2':'Ketuk untuk melihat contoh nyata →',
      'ec.h3':'Keunggulan Utama','ec.p3':'Tidak perlu modal, tidak perlu pengalaman trading. Pendapatan pasif — hasilkan bahkan saat tidur.','ec.hint3':'Ketuk untuk melihat semua keunggulan →',
      'guide.prev':'Sebelumnya','guide.next':'Berikutnya','guide.compareTitle':'Perbandingan Bursa Crypto Affiliate Terbaik','guide.viewAllDeals':'Lihat Semua 12 Bursa',
      'calc.inputTitle':'Masukkan Parameter','calc.lbl1':'Referral per bulan','calc.unit.people':'orang','calc.lbl2':'Volume trading rata-rata per orang (USD/bulan)','calc.lbl3':'Tingkat komisi (%)','calc.lbl4':'Biaya trading bursa (%)','calc.resultTitle':'Perkiraan Hasil','calc.res1':'Pendapatan bulan ini','calc.res2':'Pendapatan tahunan','calc.res3':'Total biaya bursa','calc.res4':'Komisi per orang','calc.note':'* Perkiraan proyeksi. Pendapatan aktual tergantung pada aktivitas pengguna dan ketentuan bursa.',
      'dan.c1.title':'Jangkauan Luas','dan.c1.body':'Beroperasi di Vietnam, Indonesia, Filipina — dan berkembang di seluruh Asia Tenggara dengan 237+ mitra aktif.',
      'dan.c2.title':'Komisi Tertinggi','dan.c2.body':'Tingkat komisi hingga <strong class="gold-text">70%</strong> — lebih tinggi dari pendaftaran langsung, dinegosiasikan secara eksklusif oleh DA Affiliate dengan setiap bursa.',
      'dan.c3.title':'Dukungan Penuh','dan.c3.body':'Dukungan admin 24/7 dengan sumber daya, alat, dan peta jalan pertumbuhan personal untuk setiap mitra.',
      'dan.c4.title':'Pertumbuhan Berkelanjutan','dan.c4.body':'Terima bagi komisi dari referral langsung dan sub-affiliate tingkat 1 — maksimal 2 tingkat.',
      'wins.badge':'🎯 KISAH NYATA','wins.title':'Mitra Nyata, Hasil Nyata','wins.sub':'Bukan papan peringkat pendapatan. Hanya beberapa kisah nyata dari mitra yang membangun traffic dan menghasilkan komisi melalui DA Affiliate.','wins.note':'Semua kisah dibagikan dengan persetujuan mitra. Hasil bisa berbeda tergantung saluran, traffic, dan pelaksanaan.','wins.note.link':'Lihat cara DA Affiliate memverifikasi mitra →',
      'verify.badge':'🔍 TRANSPARANSI','verify.title':'Cara DA Affiliate Memverifikasi Angka','verify.sub':'Di industri di mana screenshot palsu dan leaderboard palsu sudah biasa — inilah cara kami memastikan setiap angka yang Anda lihat adalah nyata.',
      'verify.s1.title':'Data dari dashboard bursa','verify.s1.body':'Setiap mitra mendaftar di bawah link ref DA Affiliate. Admin melihat komisi pending/paid langsung dari dashboard <strong>Binance, Ourbit, Bingx</strong>.',
      'verify.s2.title':'Catatan penarikan','verify.s2.body':'Angka "dibayar" di situs ini hanya menghitung komisi yang <strong>berhasil ditransfer</strong> ke dompet/akun mitra.',
      'verify.s3.title':'Persetujuan mitra','verify.s3.body':'Setiap kisah, kutipan, dan statistik pribadi yang ditampilkan secara publik <strong>dibagikan dengan persetujuan</strong>. Anda dapat meminta penghapusan informasi kapan saja — diproses dalam 48 jam.',
      'verify.cta.text':'Merasa angkanya tidak cocok dengan penarikan Anda? Ingin detail tentang studi kasus mitra tertentu?','verify.cta.btn':'📩 Hubungi admin',
      'dan.lb.badge':'🎯 KISAH NYATA','dan.lb.sub':'Snapshot bulanan · Data dari DA Affiliate','dan.lb.h.channel':'Saluran','dan.lb.h.earn':'Komisi/Bulan','dan.lb.h.rate':'Tingkat','dan.lb.note':'* Persetujuan mitra dan transparansi data adalah komitmen DA Affiliate.',
      'dan.fb.badge':'📸 BUKTI NYATA','dan.fb.sub':'Screenshot konfirmasi komisi — diperbarui terus dari mitra dalam jaringan.','dan.fb.ph1':'Gambar segera hadir','dan.fb.ph2':'Mitra mengirimkan screenshot feedback ke admin untuk ditampilkan di sini',
      'dan.cta.text':'Siap bergabung dengan DA Affiliate dan mulai menghasilkan komisi?','dan.cta.btn':'Mulai Sekarang',
      'dq.badge.limited':'✓ Mitra terpilih','dq.card1.body':'Jangan meyakinkan komunitas Anda. Kirim mereka link ini.','dq.card2.body':'Update <strong>rencana pasar harian</strong> dari trader profesional. Ketahui arah pasar sebelum orang lain.','dq.card3.body':'Saluran pribadi berbagi <strong>kebenaran finansial</strong> dan <strong>filosofi hidup</strong> yang orang kaya tidak pernah katakan secara publik.','dq.card.details':'Lihat detail','dq.cta.sub':'Bergabung — kami merespons dalam 24–48 jam.','dash.point1':'Kesempatan menggunakan <strong>bot trading eksklusif</strong> DA Affiliate','dash.point2':'Website tracking signal dengan <strong>kinerja bot yang transparan</strong>','dash.btn':'Buka dashboard →','dash.disclaimer':'Kinerja masa lalu tidak menjamin hasil di masa depan. Konten ini bukan saran investasi.',
      'popup.mkt.badge':'🟢 DIPERBARUI HARIAN · EKSKLUSIF','popup.mkt.title':'Saluran Update Rencana Pasar Harian','popup.mkt.lead':'Sementara jutaan orang scroll Twitter dilanda info berlebih — Anda menerima rencana yang bersih dan jelas setiap pagi pukul 7.',
      'popup.mkt.f1.title':'Rencana pasar setiap hari pukul 7:00','popup.mkt.f1.body':'Analisis tren, zona support/resistance, pair prioritas hari itu','popup.mkt.f2.title':'Analisis Macro + On-chain','popup.mkt.f2.body':'Data on-chain, sentimen agregat, dampak makro keuangan global','popup.mkt.f3.title':'Setup Perdagangan Spesifik','popup.mkt.f3.body':'Entry, SL, TP yang jelas — cukup baca dan putuskan. Tidak perlu analisis sendiri','popup.mkt.f4.title':'Peringatan Pasar Real-time','popup.mkt.f4.body':'Peringatan instan untuk pergerakan besar — bertindak sebelum 90% pasar',
      'popup.mkt.alert':'📊 Mereka yang mendapat informasi lebih awal <strong>menghasilkan lebih banyak</strong>. Saluran ini hanya untuk mitra.','popup.mkt.cta':'🔓 Bergabung untuk Akses Saluran','popup.mkt.note':'Gratis · Hanya mitra DA Affiliate',
      'dq.badge.exclusive':'💎 Eksklusif', 'popup.facts.badge':'💎 EKSKLUSIF · TIDAK DIJUAL','popup.facts.title':'Saluran Eksklusif Facts &amp; Quotes','popup.facts.lead':'Apa yang benar-benar dipahami orang kaya tentang uang — tetapi tidak pernah diucapkan. Sekarang ini milik Anda.',
      'popup.facts.f1.title':'Kebenaran finansial yang tidak diajarkan sekolah','popup.facts.f1.body':'Bagaimana orang kaya benar-benar berpikir tentang uang, risiko, investasi, dan kebebasan finansial','popup.facts.f2.title':'Kutipan dari CEO, investor, miliarder','popup.facts.f2.body':'Filosofi hidup yang disarikan dari mereka yang telah mencapai kebebasan finansial sejati','popup.facts.f3.title':'Gaya hidup elite — mindset orang kaya','popup.facts.f3.body':'Bagaimana mereka melihat waktu, hubungan, kesehatan, dan peluang — berbeda dari 99% orang','popup.facts.f4.title':'Update rutin — tidak spam','popup.facts.f4.body':'Setiap postingan adalah wawasan terkonsentrasi — 2 menit membaca mengubah cara berpikir sepanjang hari',
      'popup.facts.alert':'✨ Saluran ini tidak memiliki versi berbayar. <strong>Hanya mitra DA Affiliate</strong> yang masuk — sepenuhnya gratis.','popup.facts.cta':'🔓 Bergabung untuk Akses Saluran','popup.facts.note':'Sepenuhnya gratis · Cukup menjadi mitra',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'Grup Komunitas','lh.card2.handle':'DA NETWORK Telegram Group','lh.card3.title':'Email Dukungan','lh.card3.handle':'support@dacrypto.net','lh.note':'Biasanya merespons dalam <strong>1–2 jam</strong> selama jam kerja.',
      'footer.link.start':'Mulai','footer.link.calc':'Kalkulator','footer.link.contact':'Hubungi','footer.link.calc2':'Kalkulator',
      'footer.disclaimer':'<strong>Penafian:</strong> Konten hanya untuk tujuan informasi dan pendidikan. Bukan saran keuangan. Investasi crypto memiliki risiko tinggi.','footer.copy2':'© 2026 DA Affiliate.',
    },
  };

  // Lookup used by the renderers above: current language → English → ''.
  window.daT = function(key) {
    var t = translations[currentLang] || {};
    var v = t[key] !== undefined ? t[key] : translations.en[key];
    return v === undefined ? '' : fillTokens(v);
  };

  // English is the default; a visitor's choice is remembered across pages.
  var LANG_KEY = 'dacrypto-lang';
  var currentLang = 'en';
  try { var savedLang = localStorage.getItem(LANG_KEY); if (savedLang) currentLang = savedLang; } catch (e) {}

  function applyLang(lang, instant) {
    var t = translations[lang];
    if (!t) return;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}

    // Fade out (skipped on first paint)
    if (!instant) document.body.classList.add('lang-switching');

    var apply = function() {
      // Missing keys fall back to English (V3 keys exist only in `en` so far).
      var en = translations.en;
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        var v = t[key] !== undefined ? t[key] : en[key];
        if (v !== undefined) {
          el.innerHTML = stripEmoji(fillTokens(v));
        }
      });

      // Update html lang attr
      var langAttrMap = {vi:'vi',en:'en',th:'th',ko:'ko',id:'id'};
      document.documentElement.setAttribute('lang', langAttrMap[lang] || 'en');
      // Update data-lang on body for CSS
      document.body.setAttribute('data-lang', lang);
      // Update dropdown label
      var lbl = document.getElementById('langCurrentLabel');
      var labelMap = {vi:'VI',en:'EN',th:'TH',ko:'KO',id:'ID'};
      if (lbl) lbl.textContent = labelMap[lang] || lang.toUpperCase();
      // Sync active class in dropdown
      document.querySelectorAll('.lang-opt').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-lang-code') === lang);
      });

      // Fade in
      document.body.classList.remove('lang-switching');
      // Re-render JS-driven sections
      renderStep(currentStep);
      renderExchanges();
      renderFaqs();
      renderMetrics();
      renderStories();
      renderContact();
      calcRateNote(false);
      calcEarnings();
    };
    if (instant) apply(); else setTimeout(apply, 180);
  }

  var langCycle = ['vi','en','th','ko','id'];
  window.toggleLanguage = function() {
    var idx = langCycle.indexOf(currentLang);
    currentLang = langCycle[(idx + 1) % langCycle.length];
    applyLang(currentLang);
  };

  window.selectLang = function(lang) {
    if (translations[lang]) {
      currentLang = lang;
      applyLang(currentLang);
    }
    // Close dropdown
    var dd = document.getElementById('langDropdown');
    if (dd) dd.classList.remove('open');
  };

  window.toggleLangDropdown = function() {
    var dd = document.getElementById('langDropdown');
    if (dd) dd.classList.toggle('open');
  };

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    var sel = document.getElementById('langSelect');
    if (sel && !sel.contains(e.target)) {
      var dd = document.getElementById('langDropdown');
      if (dd) dd.classList.remove('open');
    }
  });

  // Init on load
  document.addEventListener('DOMContentLoaded', function() {
    if (!translations[currentLang]) currentLang = 'en';
    applyLang(currentLang, true);
    document.documentElement.classList.remove('i18n-pending');
  });

})();
