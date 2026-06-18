/* ═══════════════════════════════════════════════════════════════
   BCOIN AFFILIATE — App Logic
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── THEME TOGGLE ───────────────────────────────────────────────
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', d);
  const sunSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  if (t) {
    t.innerHTML = d === 'dark' ? sunSVG : moonSVG;
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.innerHTML = d === 'dark' ? sunSVG : moonSVG;
    });
  }
})();

// ─── MOBILE NAV ─────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
function closeMobileNav() {
  if (mobileNav) mobileNav.classList.remove('open');
}
window.closeMobileNav = closeMobileNav;

// ─── LUCIDE ICONS ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// ─── UTILITIES ──────────────────────────────────────────────────
function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}


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
          <p>3 sàn tốt nhất để bắt đầu với DA Network — đã được kiểm chứng bởi <strong>237+ partner</strong>. Chi tiết bên dưới ↓</p>
        </div>
      </div>
      <div class="exchange-cards-wrap">
        <div class="exchange-cards-header">
          <h4>🚀 TOP 3 SÀN ĐƯỢC KHUYẾN NGHỊ CHO PARTNER DA NETWORK</h4>
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
            <p class="exchange-tagline">Đối Tác Chiến Lược Của DA Network</p>
            <ul class="exchange-stats">
              <li>Hoa hồng cao nhất Đông Nam Á: 43%</li>
              <li>Tập trung vào thị trường SEA</li>
              <li>Hỗ trợ trực tiếp từ DA Network team</li>
            </ul>
            <p class="exchange-why">Ourbit là lựa chọn chiến lược của DA Network. Mức hoa hồng 43% là cao nhất Đông Nam Á — giúp partner kiếm nhiều hơn từ cùng số lượng referral. Team Ourbit hỗ trợ direct, cộng thêm support từ DA Network, bạn không bao giờ cảm thấy cô đơn.</p>
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
      title: 'Tạo Tài Khoản Dưới Ref DA Network',
      subtitle: 'Đăng ký dưới ref của DA Network — liên hệ admin để được hỗ trợ hoa hồng & lộ trình phát triển',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Cách Bắt Đầu Với DA Network</h4>
          <ul class="step-list">
            <li>Tạo tài khoản sàn giao dịch <strong>dưới link ref của DA Network</strong></li>
            <li>Nhắn tin cho admin DA Network sau khi đăng ký xong</li>
            <li>Admin sẽ xác nhận tài khoản và <strong>cấp hoa hồng theo lộ trình</strong></li>
            <li>Nhận hỗ trợ cá nhân hoá: chiến lược, tài liệu, và theo dõi hiệu suất</li>
            <li>Phát triển theo từng cấp độ — mở khóa hoa hồng cao hơn khi đạt mốc</li>
          </ul>
          <div class="step-tip"><strong>🎯 Tại sao nên đăng ký qua DA Network?</strong> Bạn được hưởng mức hoa hồng <strong>cao hơn mặc định</strong> của sàn, có admin hỗ trợ trực tiếp và lộ trình nâng cấp rõ ràng theo doanh số.</div>
        </div>
        <div class="step-example">
          <div class="step-example-title">📊 Lộ Trình Partner DA Network</div>
          <div class="partner-roadmap">
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bingx</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">25%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">30%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">39%</span><span class="tier-req">50M vol</span></div></div></div>
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bitunix</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">33%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">37%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">45%</span><span class="tier-req">50M vol</span></div></div></div>
          </div>
          <div class="step-tip" style="margin-top:14px"><strong>📩 Liên hệ admin:</strong> Sau khi tạo tài khoản, nhắn UID hoặc email đăng ký cho admin DA Network để được kích hoạt hoa hồng và theo dõi lộ trình.</div>
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
  en: [
    {
      title: 'Understanding Crypto Affiliate',
      subtitle: 'The essential knowledge foundation before you begin',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>What Is Crypto Affiliate?</h4>
          <p>Crypto affiliate marketing means you refer others to exchanges, apps, or crypto services through <strong>your unique referral link</strong>.</p>
          <p>When your referral makes a trade, you automatically earn a share of their <strong>trading fee</strong> — no extra action required.</p>
          <ul class="step-list">
            <li>No capital or trading experience needed</li>
            <li>Passive income — earn 24/7 even while you sleep</li>
            <li>Commissions from 20% to 50% of trading fees</li>
            <li>Some exchanges pay lifetime commissions</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Real Example</div>
          <p>You refer <strong>your friend Alex</strong> to sign up for Binance via your link.</p>
          <p style="margin-top:12px">Alex trades <strong>$10,000 BTC</strong> at 0.1% fee = <strong>$10 fee</strong></p>
          <p style="margin-top:8px">You receive <strong>40% commission</strong> = <strong>$4 per trade</strong></p>
          <p style="margin-top:8px">If Alex trades 10×/month → you earn <strong>$40/month</strong> from just 1 person!</p>
          <div class="step-tip" style="margin-top:12px"><strong>💡 Tip:</strong> 100 people × $40/month = <strong>$4,000/month passive income</strong></div>
        </div>
      </div>`,
    },
    {
      title: 'Choose Your Affiliate Exchange',
      subtitle: 'Not all exchanges are equal — pick the right one to maximize earnings',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Criteria for Choosing an Exchange</h4>
          <p>A good exchange needs <strong>credibility, high commission rates</strong>, and a <strong>transparent tracking system</strong>. Key criteria:</p>
          <ul class="step-list">
            <li>Commission rate: at least 20%, ideally 40–50%</li>
            <li>Cookie duration: the longer the better (30+ days)</li>
            <li>Credibility: high trading volume, licensed</li>
            <li>Clear dashboard: track clicks, sign-ups, earnings</li>
            <li>On-time payouts: weekly or monthly</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Top 3 Recommended Exchanges</div>
          <p>The 3 best exchanges to start with DA Network — validated by <strong>237+ partners</strong>. Details below ↓</p>
        </div>
      </div>
      <div class="exchange-cards-wrap">
        <div class="exchange-cards-header">
          <h4>🚀 TOP 3 RECOMMENDED EXCHANGES FOR DA NETWORK PARTNERS</h4>
          <p>The 3 best exchanges to start with — validated by 237+ partners</p>
        </div>
        <div class="exchange-cards">
          <div class="exchange-card rank-1">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥇 #1</span>
            </div>
            <h5 class="exchange-name">BINANCE</h5>
            <p class="exchange-tagline">The World's Largest Exchange</p>
            <ul class="exchange-stats">
              <li>100M+ users globally</li>
              <li>Highest liquidity, lowest trading fees</li>
              <li>Multi-language support, A+ reputation</li>
            </ul>
            <p class="exchange-why">Binance is the ideal gateway to get started. With 100M+ users, referral opportunities are virtually unlimited. While the 31.5% commission isn't the highest, the massive trading volume guarantees steady commission flow.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Commission</span>
              <span class="exchange-commission-value">31.5%</span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> Beginners + high-volume referrals</div>
          </div>
          <div class="exchange-card rank-2">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥈 #2</span>
              <span class="exchange-badge">🔗 Close Partnership</span>
            </div>
            <h5 class="exchange-name">OURBIT</h5>
            <p class="exchange-tagline">DA Network's Strategic Partner</p>
            <ul class="exchange-stats">
              <li>Highest commission in SEA: 43%</li>
              <li>Focused on the Southeast Asia market</li>
              <li>Direct support from the DA Network team</li>
            </ul>
            <p class="exchange-why">Ourbit is DA Network's strategic choice. The 43% commission is the highest in Southeast Asia — helping partners earn more from the same number of referrals. The Ourbit team supports you directly, plus extra backup from DA Network — you're never alone.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Commission</span>
              <span class="exchange-commission-value">43% <span class="star">⭐</span></span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> Maximum earnings + dedicated support</div>
          </div>
          <div class="exchange-card rank-3">
            <div class="exchange-card-top">
              <span class="exchange-rank">🥉 #3</span>
              <span class="exchange-badge">🛡️ Partner-Friendly</span>
            </div>
            <h5 class="exchange-name">BINGX</h5>
            <p class="exchange-tagline">Best Partner Support Program</p>
            <ul class="exchange-stats">
              <li>Dedicated partner support team</li>
              <li>Constant user promotions and campaigns</li>
              <li>Fast payouts, 24/7 support</li>
            </ul>
            <p class="exchange-why">Bingx stands out thanks to its dedicated partner support team plus non-stop promotions for users. That means your users trade more — and your commissions grow with them. The 24/7 support is a major bonus.</p>
            <div class="exchange-commission">
              <span class="exchange-commission-label">Commission</span>
              <span class="exchange-commission-value">28%</span>
            </div>
            <div class="exchange-bestfor"><strong>Best for:</strong> User retention + consistent activity</div>
          </div>
        </div>
        <div class="exchange-strategy-tip">
          <h5>💡 TIP: Sign up for all 3 exchanges to maximize income</h5>
          <ul>
            <li>Use <strong>Binance</strong> as your "base" — huge volume, massive user base</li>
            <li>Use <strong>Ourbit</strong> as your "high-margin" — 43% commission, highest in SEA</li>
            <li>Use <strong>Bingx</strong> as your "engagement" — best partner support program</li>
          </ul>
          <p><strong>The approach:</strong> Split your users into 3 groups and recommend the exchange that fits their needs. In total, you'll collect commissions from all 3 exchanges without dramatically increasing your effort.</p>
        </div>
      </div>`,
    },
    {
      title: 'Register Under DA Network',
      subtitle: 'Sign up under DA Network\'s ref — contact admin for commission support & growth roadmap',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>How to Start With DA Network</h4>
          <ul class="step-list">
            <li>Create your exchange account <strong>under DA Network's referral link</strong></li>
            <li>Message the DA Network admin after completing sign-up</li>
            <li>Admin confirms your account and <strong>unlocks your commission roadmap</strong></li>
            <li>Receive personalized support: strategy, materials, and performance tracking</li>
            <li>Level up progressively — unlock higher commissions as you hit milestones</li>
          </ul>
          <div class="step-tip"><strong>🎯 Why register through DA Network?</strong> You get <strong>above-default commission rates</strong>, direct admin support, and a clear upgrade roadmap tied to your volume.</div>
        </div>
        <div class="step-example">
          <div class="step-example-title">📊 DA Network Partner Roadmap</div>
          <div class="partner-roadmap">
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bingx</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">25%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">30%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">39%</span><span class="tier-req">50M vol</span></div></div></div>
            <div class="roadmap-exchange"><div class="roadmap-exchange-name">Bitunix</div><div class="roadmap-tiers"><div class="roadmap-tier tier-base"><span class="tier-label">Base</span><span class="tier-val">33%</span><span class="tier-req">0 – 10M vol</span></div><div class="roadmap-tier tier-mid"><span class="tier-label">Middle</span><span class="tier-val">37%</span><span class="tier-req">10M vol</span></div><div class="roadmap-tier tier-max"><span class="tier-label">Max</span><span class="tier-val">45%</span><span class="tier-req">50M vol</span></div></div></div>
          </div>
          <div class="step-tip" style="margin-top:14px"><strong>📩 Contact admin:</strong> After creating your account, send your UID or registration email to the DA Network admin to activate your commissions and track your roadmap.</div>
        </div>
      </div>`,
    },
    {
      title: 'Create Engaging Content',
      subtitle: 'Content is king — create it right so people actually click your links',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Effective Content Formats</h4>
          <p>Viewers need <strong>a reason to click</strong> your link — don't just spam bare links. Provide real value:</p>
          <ul class="step-list">
            <li>Tutorial videos: "How to buy Bitcoin for the first time"</li>
            <li>Review articles: "Binance Review 2026 — Pros and Cons"</li>
            <li>X/Twitter threads: "5 things to know before investing in crypto"</li>
            <li>Short Reels/TikToks: Explain simple concepts</li>
            <li>Telegram/Discord groups: Provide free signals and analysis</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Real Content Examples</div>
          <p><strong>High-performing article titles:</strong></p>
          <div class="example-box">"Best place to buy Bitcoin safely in 2026? [5 exchange review]"<br><br>"How to register on Binance 2026 — Get $100 bonus"<br><br>"Binance vs OKX: Which exchange is better?"</div>
          <div class="step-tip" style="margin-top:12px"><strong>💡 SEO tip:</strong> Place your referral link in the <strong>first 3 lines</strong> and at the <strong>end of the post</strong>. Don't make readers hunt for it.</div>
        </div>
      </div>`,
    },
    {
      title: 'Build Your Channel & Audience',
      subtitle: 'No audience = no income. This is the most important part!',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Choose the Right Channel for You</h4>
          <p>Each platform has unique strengths. Pick <strong>1–2 channels</strong> that match your skills and interests, then go deep:</p>
          <ul class="step-list">
            <li><strong>YouTube:</strong> Long-form content, great SEO, most passive income</li>
            <li><strong>TikTok/Reels:</strong> Fast viral potential, easy reach to new audiences</li>
            <li><strong>Telegram Channel:</strong> Trading signals, market updates</li>
            <li><strong>Facebook Group:</strong> Tight community, high engagement</li>
            <li><strong>Blog/Website:</strong> Long-term SEO, high credibility</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Your First 30 Days Roadmap</div>
          <p><strong>Week 1–2:</strong> Choose platform, create account, publish 10 pieces of content</p>
          <p style="margin-top:8px"><strong>Week 3:</strong> Optimize content based on feedback, engage with followers</p>
          <p style="margin-top:8px"><strong>Week 4:</strong> Analyze data, double down on what's working</p>
          <div class="step-tip" style="margin-top:12px"><strong>🎯 Realistic goal:</strong> Month 1: 100 followers → Month 3: 500+ regular viewers → Meaningful income</div>
        </div>
      </div>`,
    },
    {
      title: 'Track Your Performance',
      subtitle: 'Measure to improve — not tracking = not growing',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Key Metrics to Monitor</h4>
          <p>Every affiliate exchange has its own <strong>tracking dashboard</strong>. Check it daily to optimize your strategy:</p>
          <ul class="step-list">
            <li><strong>Clicks:</strong> Number of clicks on your referral link</li>
            <li><strong>Registrations:</strong> Successful sign-ups</li>
            <li><strong>Active Traders:</strong> People who actually trade</li>
            <li><strong>Trading Volume:</strong> Total volume generated</li>
            <li><strong>Commission Earned:</strong> Total commissions received</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Real Conversion Rate Example</div>
          <p>Sample dashboard for a beginner's first month:</p>
          <div class="example-box">Clicks: <span class="highlight">1,200</span><br>Registrations: <span class="highlight">48</span> (4% conversion)<br>Active traders: <span class="highlight">12</span> (25% of registrations)<br>Total volume: <span class="highlight">$45,000</span><br>Commission: <span class="highlight">~$18</span></div>
          <div class="step-tip" style="margin-top:12px"><strong>💡 Benchmark:</strong> A good CTR is 3–5%. If lower → improve link placement and call-to-action.</div>
        </div>
      </div>`,
    },
    {
      title: 'Optimize & Scale Up',
      subtitle: 'From $50/month to $500/month and beyond',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Strategy to Double Your Income</h4>
          <p>Once you have your first earnings, here's how to <strong>grow systematically</strong>:</p>
          <ul class="step-list">
            <li>Focus on the top 20% of content driving 80% of traffic</li>
            <li>Repurpose content: 1 video → article + thread + reel</li>
            <li>Build an email list for remarketing</li>
            <li>Collaborate with other creators in the crypto community</li>
            <li>Run paid ads once ROI is proven</li>
          </ul>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Real Scale-Up Example</div>
          <p><strong>Month 1:</strong> 10 people, $40 commission</p>
          <p style="margin-top:8px"><strong>Month 3:</strong> 80 people, $320 commission (SEO traffic growth)</p>
          <p style="margin-top:8px"><strong>Month 6:</strong> 250 people, $1,000+ commission (viral content)</p>
          <p style="margin-top:8px"><strong>Month 12:</strong> 1,000+ people, $4,000+ commission/month</p>
          <div class="step-tip" style="margin-top:12px"><strong>🚀 Key insight:</strong> Staying consistent through the first 6 months is the biggest challenge. Most people quit before seeing results!</div>
        </div>
      </div>`,
    },
    {
      title: 'Compliance & Risks to Know',
      subtitle: 'Do it right from the start to avoid problems later',
      content: `<div class="step-body">
        <div class="step-main">
          <h4>Essential Things You Must Know</h4>
          <ul class="step-list">
            <li><strong>Always disclose</strong> that your link is an affiliate link</li>
            <li>No fraudulent promotion (fake volume, fake reviews)</li>
            <li>Read the <strong>Terms of Service</strong> for each affiliate program carefully</li>
            <li>Never click your own referral links</li>
            <li>Declare affiliate income per your local tax regulations</li>
          </ul>
          <div class="step-tip" style="margin-top:12px"><strong>⚠️ Warning:</strong> Violating ToS can lead to <strong>account suspension and loss of all unpaid commissions</strong>!</div>
        </div>
        <div class="step-example">
          <div class="step-example-title">📌 Sample Disclosure Statement</div>
          <p>Add to the end of every post/video:</p>
          <div class="example-box">"This post contains affiliate links. If you sign up through my link, I earn a commission at no extra cost to you. Thank you for your support!"</div>
          <p style="margin-top:12px"><strong>Risks to remember:</strong></p>
          <p>• Bear market → fewer trades → lower income</p>
          <p>• Exchanges may change or cancel affiliate programs</p>
          <p>• Increasing competition in the crypto space</p>
        </div>
      </div>`,
    },
  ],
};

let currentStep = 1;


function renderStep(n) {
  var lang = (document.body.getAttribute('data-lang') || 'vi');
  var steps = stepsData[lang] || stepsData['en'] || stepsData['vi'];
  const s = steps[n - 1];
  const el = document.getElementById('stepContent');
  if (!el || !s) return;
  el.innerHTML = `<div class="step-panel">
    <div class="step-panel-header">
      <div class="step-number-big">${n}</div>
      <div>
        <div class="step-panel-title">${s.title}</div>
        <div class="step-panel-subtitle">${s.subtitle}</div>
      </div>
    </div>
    ${s.content}
  </div>`;
  // Update tabs
  document.querySelectorAll('.step-tab').forEach((t, i) => {
    t.classList.remove('active', 'done');
    if (i + 1 === n) t.classList.add('active');
    else if (i + 1 < n) t.classList.add('done');
  });
  // Update progress
  const prog = document.getElementById('stepProgress');
  var stepLabel = {vi:'Bước',en:'Step',th:'ขั้นตอน',ko:'단계',id:'Langkah'}[lang]||'Step';
  if (prog) prog.textContent = stepLabel + ' ' + n + ' / ' + steps.length;
  var btnComplete = {vi:'Hoàn Thành',en:'Complete',th:'เสร็จสิ้น',ko:'완료',id:'Selesai'}[lang]||'Complete';
  var btnNext     = {vi:'Bước Tiếp', en:'Next',     th:'ถัดไป',   ko:'다음', id:'Berikutnya'}[lang]||'Next';
  // Update buttons
  const prev = document.getElementById('prevStep');
  const next = document.getElementById('nextStep');
  if (prev) prev.disabled = n === 1;
  if (next) {
    if (n === steps.length) {
      next.innerHTML = btnComplete + ' <i data-lucide="check" width="16" height="16"></i>';
    } else {
      next.innerHTML = btnNext + ' <i data-lucide="arrow-right" width="16" height="16"></i>';
    }
  }
  currentStep = n;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.querySelectorAll('.step-tab').forEach((btn) => {
  btn.addEventListener('click', () => renderStep(parseInt(btn.dataset.step)));
});
document.getElementById('prevStep')?.addEventListener('click', () => {
  if (currentStep > 1) renderStep(currentStep - 1);
});
document.getElementById('nextStep')?.addEventListener('click', () => {
  var lang = (document.body.getAttribute('data-lang') || 'vi');
  var totalSteps = (stepsData[lang] || stepsData['en'] || stepsData['vi']).length;
  if (currentStep < totalSteps) renderStep(currentStep + 1);
  else document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
});

renderStep(1);

// ─── COMPARISON TABLE ────────────────────────────────────────────
const exchangesData = {
  vi: [
    {
      name: 'Binance',
      type: 'Spot · Futures · Margin',
      rate: '31.5%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🌍 Lớn nhất thế giới',
      pros: ['Thanh khoản sâu nhất thị trường', 'Phí thấp, giảm thêm khi dùng BNB', 'Hơn 500 cặp giao dịch', 'Proof of Reserves minh bạch'],
      cons: ['Hoa hồng affiliate thấp (31.5%)', 'Vấn đề pháp lý tại Mỹ 2023', 'KYC phức tạp, support chậm'],
    },
    {
      name: 'Exness',
      type: 'Forex · CFD · Crypto',
      rate: '70%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '💰 HH cao nhất',
      pros: ['Hoa hồng lên đến 70% — cao nhất nhóm', 'Rút tiền tức thì 24/7', 'Leverage cao (dưới $5,000)', 'Phí rút = 0, quản lý = 0'],
      cons: ['Không nhận người dùng Mỹ/EU', 'Spread một số cặp rất rộng', 'Sản phẩm hạn chế (~200 mã)'],
    },
    {
      name: 'Vantage',
      type: 'Forex · CFD · Crypto',
      rate: '70%',
      rateNote: 'hoa hồng',
      featured: true,
      badge: '⭐ Được đề xuất',
      pros: ['Hoa hồng 70%, bảo hiểm Lloyd\'s đến $1M', 'Được quản lý bởi ASIC, FCA, CIMA', 'Spread từ 0.0 pip, spread thực tế', 'MT4/MT5/TradingView/App riêng'],
      cons: ['Cơ cấu pháp lý nhiều entity gây nhầm lẫn', 'Support có thể chậm giờ cao điểm', 'Tài liệu giáo dục chưa sâu'],
    },
    {
      name: 'OKX',
      type: 'Spot · Futures · Web3',
      rate: '35%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🌏 ĐNA Support',
      pros: ['Ví Web3 tích hợp, hỗ trợ 100+ blockchain', 'Liquidity sâu, phí thấp với OKB', 'Copy trading & bots đa dạng', 'Proof-of-reserves zk-STARK minh bạch'],
      cons: ['Không dành cho người mới — giao diện phức tạp', 'Không hỗ trợ người dùng Mỹ', 'Phí nạp fiat qua bên thứ ba'],
    },
    {
      name: 'Bybit',
      type: 'Spot · Futures · Options',
      rate: '35%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '📈 Futures mạnh',
      pros: ['Thanh khoản derivatives hàng đầu', 'AI Aurora, copy trading, trading bots', 'Proof of Reserves minh bạch sau 2025', 'App mobile đầy đủ tính năng'],
      cons: ['Không có bảo hiểm tiền gửi', 'Bị hack $1.5B tháng 2/2025 (đã xử lý)', 'KYC lâu, không hỗ trợ Mỹ/Anh'],
    },
    {
      name: 'MEXC',
      type: 'Spot · Futures · Altcoin',
      rate: '35%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🪙 Altcoin số 1',
      pros: ['3,000+ altcoin — nhiều nhất thị trường', 'Phí maker 0% spot & futures', 'Leverage tối đa 500x', 'KYC không bắt buộc cho giao dịch'],
      cons: ['Pháp lý mờ hơn các sàn lớn', 'Không có ở Mỹ và một số nước', 'Thanh khoản mỏng trên altcoin nhỏ'],
    },
    {
      name: 'Bingx',
      type: 'Spot · Futures · Copy',
      rate: '28%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🇻🇳 Tốt nhất cho VN',
      pros: ['Copy trading AI hàng đầu thị trường', 'Giao diện thân thiện người mới', 'Chế độ demo trading miễn phí', 'Phí futures cạnh tranh'],
      cons: ['Không có leverage trên spot', 'Không có token sàn giảm phí', 'Không khả dụng tại Mỹ'],
    },
    {
      name: 'Bitget',
      type: 'Spot · Futures · Copy',
      rate: '35%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🛡️ Proof of Reserves',
      pros: ['Copy trading chuyên sâu, top 2 liquidity BTC', 'Proof of Reserves 188%, quỹ bảo vệ $780M', 'Phí futures 0.02%/0.06% — rất cạnh tranh', 'App mobile được đánh giá 4.6/5'],
      cons: ['Không thân thiện với người mới', 'Fiat access phụ thuộc vùng', 'Trustpilot mixed (~3.0/5)'],
    },
    {
      name: 'Gate.io',
      type: 'Spot · Margin · NFT',
      rate: '42%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🏛️ Lâu đời 2013',
      pros: ['3,800+ coin — đa dạng nhất', 'Proof-of-reserves Merkle Tree minh bạch', 'Hệ sinh thái Web3, NFT, GameFi', 'Reserves $10.8B với buffer 128%'],
      cons: ['Phí rút một số coin cao', 'KYC bắt buộc để rút tiền', 'Không khả dụng tại Mỹ'],
    },
    {
      name: 'KuCoin',
      type: 'Spot · Futures · Bot',
      rate: '42%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '🤖 Trading Bots',
      pros: ['1,000+ altcoin, phí thấp', 'Trading bots đa dạng, tokenized stocks', 'P2P hỗ trợ 70+ fiat on-ramp', 'SOC 2 Type II, PoR xác nhận'],
      cons: ['Bị phạt $300M+ tại Mỹ, không nhận US user', 'Bị hack $275M năm 2020', 'Support kém trong sự cố lớn'],
    },
    {
      name: 'XM',
      type: 'Forex · CFD · Indices',
      rate: '70%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '📚 Giáo dục tốt',
      pros: ['Deposit tối thiểu chỉ $5', 'Webinar hàng ngày, đào tạo đa ngôn ngữ', 'Có giấy phép CySEC, ASIC', 'Bảo vệ số dư âm cho tất cả khách hàng'],
      cons: ['Dealing desk — xung đột lợi ích', 'Spread Standard rộng (EUR/USD ~2 pips)', 'Phí inactive sau 90 ngày', 'Không có ECN/STP, không có TradingView'],
    },
    {
      name: 'Bitunix',
      type: 'Spot · Futures · Copy',
      rate: '33%',
      rateNote: 'hoa hồng',
      featured: false,
      badge: '💸 Hoa Hồng Cao',
      pros: ['Không cần KYC (rút đến $1M/ngày)', 'Leverage 125x, phí futures 0.02%/0.06%', 'Trustpilot 4.5/5 từ nghìn đánh giá', 'Khả dụng toàn cầu kể cả nhiều nước hạn chế'],
      cons: ['Ít coin hơn Binance/MEXC', 'Chỉ cặp USDT, không có fiat rút', 'Không khả dụng tại Mỹ'],
    },
  ],
  en: [
    {
      name: 'Binance',
      type: 'Spot · Futures · Margin',
      rate: '31.5%',
      rateNote: 'commission',
      featured: false,
      badge: '🌍 World\'s Largest',
      pros: ['Deepest liquidity in the market', 'Low fees, extra discount with BNB', '500+ trading pairs', 'Transparent Proof of Reserves'],
      cons: ['Lower affiliate rate (31.5%)', 'US regulatory issues in 2023', 'Complex KYC, slow support'],
    },
    {
      name: 'Exness',
      type: 'Forex · CFD · Crypto',
      rate: '70%',
      rateNote: 'commission',
      featured: false,
      badge: '💰 Highest Commission',
      pros: ['Up to 70% commission — highest in group', 'Instant withdrawals 24/7', 'Unlimited leverage (under $5,000)', 'Zero withdrawal & management fees'],
      cons: ['Restricted in US/EU', 'Very wide spreads on some pairs', 'Limited product range (~200 symbols)'],
    },
    {
      name: 'Vantage',
      type: 'Forex · CFD · Crypto',
      rate: '70%',
      rateNote: 'commission',
      featured: true,
      badge: '⭐ Recommended',
      pros: ['70% commission, Lloyd\'s insurance up to $1M', 'Regulated by ASIC, FCA, CIMA', 'Spreads from 0.0 pip, live spread feed', 'MT4/MT5/TradingView/proprietary app'],
      cons: ['Multi-entity structure can confuse beginners', 'Support may slow during peak hours', 'Educational content could be deeper'],
    },
    {
      name: 'OKX',
      type: 'Spot · Futures · Web3',
      rate: '35%',
      rateNote: 'commission',
      featured: false,
      badge: '🌏 SEA Support',
      pros: ['Integrated Web3 wallet, 100+ blockchains', 'Deep liquidity, fee discounts with OKB', 'Diverse copy trading & bots', 'zk-STARK Proof of Reserves'],
      cons: ['Complex UI — not for beginners', 'Not available for US users', 'Fiat deposits via third-party only'],
    },
    {
      name: 'Bybit',
      type: 'Spot · Futures · Options',
      rate: '35%',
      rateNote: 'commission',
      featured: false,
      badge: '📈 Derivatives King',
      pros: ['Top-tier derivatives liquidity', 'AI Aurora, copy trading, bots', 'Transparent PoR since 2025', 'Full-featured mobile app'],
      cons: ['No deposit insurance', '$1.5B hack Feb 2025 (resolved)', 'Slow KYC, no US/UK support'],
    },
    {
      name: 'MEXC',
      type: 'Spot · Futures · Altcoin',
      rate: '35%',
      rateNote: 'commission',
      featured: false,
      badge: '🪙 #1 Altcoin',
      pros: ['3,000+ altcoins — most in the market', '0% maker fees on spot & futures', 'Up to 500x leverage', 'No mandatory KYC for trading'],
      cons: ['Less regulatory clarity than top-tier', 'Not available in US and some countries', 'Thin liquidity on small-cap pairs'],
    },
    {
      name: 'Bingx',
      type: 'Spot · Futures · Copy',
      rate: '28%',
      rateNote: 'commission',
      featured: false,
      badge: '🇻🇳 Best for VN',
      pros: ['Industry-leading AI copy trading', 'Beginner-friendly interface', 'Free demo trading mode', 'Competitive futures fees'],
      cons: ['No leverage on spot pairs', 'No native exchange token for fee reduction', 'Not available in US'],
    },
    {
      name: 'Bitget',
      type: 'Spot · Futures · Copy',
      rate: '35%',
      rateNote: 'commission',
      featured: false,
      badge: '🛡️ Proof of Reserves',
      pros: ['Top copy trading, #2 BTC liquidity', 'PoR 188%, protection fund $780M', '0.02%/0.06% futures fees', 'Mobile app rated 4.6/5'],
      cons: ['Not beginner-friendly', 'Fiat access varies by region', 'Mixed Trustpilot reviews (~3.0/5)'],
    },
    {
      name: 'Gate.io',
      type: 'Spot · Margin · NFT',
      rate: '42%',
      rateNote: 'commission',
      featured: false,
      badge: '🏛️ Est. 2013',
      pros: ['3,800+ coins — most diverse', 'Merkle Tree PoR, $10.8B reserves (128%)', 'Web3, NFT, GameFi ecosystem', 'Regular fee-free stablecoin promotions'],
      cons: ['Higher withdrawal fees on some coins', 'KYC required to withdraw', 'Not available in US'],
    },
    {
      name: 'KuCoin',
      type: 'Spot · Futures · Bot',
      rate: '42%',
      rateNote: 'commission',
      featured: false,
      badge: '🤖 Trading Bots',
      pros: ['1,000+ altcoins, low fees', 'Diverse bots, tokenized stocks', 'P2P with 70+ fiat on-ramps', 'SOC 2 Type II, verified PoR'],
      cons: ['$300M+ US penalty, no US users', 'Hacked for $275M in 2020', 'Poor support during major incidents'],
    },
    {
      name: 'XM',
      type: 'Forex · CFD · Indices',
      rate: '70%',
      rateNote: 'commission',
      featured: false,
      badge: '📚 Best Education',
      pros: ['Only $5 minimum deposit', 'Daily webinars, multilingual education', 'CySEC & ASIC regulated', 'Negative balance protection globally'],
      cons: ['Dealing desk — conflict of interest', 'Wide Standard spreads (~2 pips EUR/USD)', 'Inactivity fees after just 90 days', 'No ECN/STP, no TradingView'],
    },
    {
      name: 'Bitunix',
      type: 'Spot · Futures · Copy',
      rate: '33%',
      rateNote: 'commission',
      featured: false,
      badge: '💸 High Commission',
      pros: ['No mandatory KYC (up to $1M/day withdrawal)', '125x leverage, 0.02%/0.06% futures fees', 'Trustpilot 4.5/5 from thousands of reviews', 'Available globally including restricted regions'],
      cons: ['Fewer coins than Binance/MEXC', 'USDT-only pairs, no fiat withdrawal', 'Not available in US'],
    },
  ],
};

const grid = document.getElementById('comparisonGrid');
function renderComparison() {
  if (!grid) return;
  var lang = (document.body.getAttribute('data-lang') || 'vi');
  var isEN = lang !== 'vi';

  // ── 3 cluster cards shown on index page ──────────────────────
  // Full gold tone — all highlight values unified
  var gold1 = '#ffd966';  // light gold
  var gold2 = '#f7931a';  // amber gold
  var gold3 = '#e8650a';  // deep gold

  var clusters = [
    {
      icon: '\uD83D\uDCB9',
      label: isEN ? 'Highest Commission' : 'Hoa H\u1ed3ng Cao Nh\u1ea5t',
      tag: 'Forex',
      tagColor: gold1,
      exchanges: ['Exness', 'Vantage', 'XM'],
      rate: '70%',
      rateNote: isEN ? 'Revenue Share' : 'Doanh Thu',
      highlight: gold1,
      topBar: 'linear-gradient(90deg,' + gold1 + ',' + gold2 + ')',
      desc: isEN
        ? 'Best for KOLs targeting forex traders. Lifetime revenue share up to 70%.'
        : 'L\u00fd t\u01b0\u1edfng cho KOL th\u1ecb tr\u01b0\u1eddng Forex. Hoa h\u1ed3ng doanh thu tr\u1ecdn \u0111\u1eddi l\u00ean t\u1edbi 70%.'
    },
    {
      icon: '\u20BF',
      label: isEN ? 'Most Popular Crypto' : 'Crypto Ph\u1ed5 Bi\u1ebfn Nh\u1ea5t',
      tag: 'Crypto',
      tagColor: gold2,
      exchanges: ['Binance', 'Bybit', 'OKX'],
      rate: '31\u201335%',
      rateNote: isEN ? 'Commission' : 'Hoa H\u1ed3ng',
      highlight: gold2,
      topBar: 'linear-gradient(90deg,' + gold2 + ',' + gold3 + ')',
      desc: isEN
        ? 'Top 3 global exchanges by volume. Massive user base for easy conversions.'
        : 'Top 3 s\u00e0n crypto theo kh\u1ed1i l\u01b0\u1ee3ng giao d\u1ecbch. L\u01b0\u1ee3ng user kh\u1ed5ng l\u1ed3 d\u1ec5 chuy\u1ec3n \u0111\u1ed5i.'
    },
    {
      icon: '\uD83D\uDE80',
      label: isEN ? 'High-Potential Picks' : 'Ti\u1ec1m N\u0103ng T\u0103ng Tr\u01b0\u1edfng',
      tag: 'Crypto',
      tagColor: gold3,
      exchanges: ['Gate.io', 'Bitunix', 'KuCoin'],
      rate: '33\u201342%',
      rateNote: isEN ? 'Commission' : 'Hoa H\u1ed3ng',
      highlight: gold3,
      topBar: 'linear-gradient(90deg,' + gold3 + ',' + gold1 + ')',
      desc: isEN
        ? 'Higher commission rates with strong altcoin selection. Great for niche communities.'
        : 'T\u1ef7 l\u1ec7 hoa h\u1ed3ng cao h\u01a1n, danh m\u1ee5c altcoin \u0111a d\u1ea1ng. Ph\u00f9 h\u1ee3p c\u1ed9ng \u0111\u1ed3ng ni\u1ec1m tin cao.'
    }
  ];

  grid.innerHTML = clusters.map(function(c) {
    return '<div class="compare-card featured" style="border-color:rgba(247,147,26,.35);background:linear-gradient(160deg,rgba(20,12,0,.85),rgba(10,8,0,.75));position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(247,147,26,.08);">'
      + '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:' + c.topBar + ';"></div>'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      + '<span style="font-size:28px;">' + c.icon + '</span>'
      + '<div>'
      + '<div style="font-size:15px;font-weight:800;color:#fff;">' + c.label + '</div>'
      + '<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(247,147,26,.15);color:' + c.tagColor + ';border:1px solid rgba(247,147,26,.3);margin-top:3px;">' + c.tag + '</span>'
      + '</div></div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">'
      + c.exchanges.map(function(ex) {
          return '<span style="padding:4px 12px;border-radius:16px;font-size:12px;font-weight:600;background:rgba(247,147,26,.08);color:#d4a843;border:1px solid rgba(247,147,26,.2);">' + ex + '</span>';
        }).join('')
      + '</div>'
      + '<div style="margin-bottom:12px;">'
      + '<span style="font-size:32px;font-weight:900;color:' + c.highlight + ';text-shadow:0 0 20px ' + c.highlight + '55;">' + c.rate + '</span>'
      + '<span style="font-size:12px;color:var(--color-text-muted);margin-left:8px;">' + c.rateNote + '</span>'
      + '</div>'
      + '<p style="font-size:13px;color:rgba(200,180,140,.75);line-height:1.6;margin:0;">' + c.desc + '</p>'
      + '</div>';
  }).join('');
}
renderComparison();

// ─── CALCULATOR ──────────────────────────────────────────────────
let earningsChart = null;
function calcEarnings() {
  const refs = parseInt(document.getElementById('refCount')?.value || 10);
  const vol = parseInt(document.getElementById('tradeVol')?.value || 5000);
  const comm = parseInt(document.getElementById('commRate')?.value || 30) / 100;
  const fee = parseFloat(document.getElementById('tradeFee')?.value || 0.1) / 100;

  document.getElementById('refCountVal').textContent = refs;
  document.getElementById('tradeVolVal').textContent = '$' + vol.toLocaleString('en-US');
  document.getElementById('commRateVal').textContent = Math.round(comm * 100);
  document.getElementById('tradeFeeVal').textContent = (fee * 100).toFixed(2);

  const totalFees = refs * vol * fee;
  const monthly = totalFees * comm;
  const yearly = monthly * 12;
  const perPerson = vol * fee * comm;

  document.getElementById('monthlyEarn').textContent = '$' + monthly.toFixed(2);
  document.getElementById('yearlyEarn').textContent = '$' + yearly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalFees').textContent = '$' + totalFees.toFixed(2);
  document.getElementById('perPerson').textContent = '$' + perPerson.toFixed(2);

  // Projection chart (12 months, linear growth estimate)
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const growthData = months.map((_, i) => {
    const growth = 1 + i * 0.15; // 15% monthly growth estimate
    return parseFloat((monthly * growth).toFixed(2));
  });

  const canvas = document.getElementById('earningsChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (earningsChart) earningsChart.destroy();
    earningsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Thu nhập (USD)',
          data: growthData,
          borderColor: '#f7931a',
          backgroundColor: 'rgba(247,147,26,0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#f7931a',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => ' $' + ctx.parsed.y.toFixed(2) }
          }
        },
        scales: {
          x: {
            ticks: { color: '#7a7875', font: { size: 10 } },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#7a7875', font: { size: 10 }, callback: v => '$' + v },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        },
        animation: { duration: 400 }
      }
    });
  }
}

['refCount', 'tradeVol', 'commRate', 'tradeFee'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', calcEarnings);
});
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
  en: [
    {
      q: 'How much money do I need to start crypto affiliate marketing?',
      a: '<strong>No money needed!</strong> All crypto affiliate programs are free to join. The only optional cost is if you want to run paid ads to grow traffic faster.'
    },
    {
      q: 'How much can I earn from crypto affiliate marketing?',
      a: 'Earnings depend on the size and quality of your audience. Beginners can earn <strong>$50–$200/month</strong> after 2–3 months. Creators with large audiences can earn <strong>$5,000–$50,000+/month</strong>. There is no upper limit.'
    },
    {
      q: 'Do I need to know how to trade crypto?',
      a: '<strong>Not required</strong>, but very helpful. Basic crypto knowledge helps you produce more credible content. However, many successful affiliates focus solely on sign-up and exchange guides — no trading skills needed.'
    },
    {
      q: 'Are commissions paid for life?',
      a: 'It depends on the program. <strong>Binance, Bybit, and OKX</strong> all offer lifetime commissions — meaning you earn as long as the referred user keeps trading, with no expiry.'
    },
    {
      q: 'How do I improve my conversion rate?',
      a: 'The most effective methods: (1) <strong>Place links correctly</strong> — first 3 lines and end of post; (2) <strong>Create urgency</strong> — time-limited sign-up bonuses; (3) <strong>Social proof</strong> — share your real earnings; (4) <strong>Detailed tutorials</strong> — step-by-step guides that keep users from dropping off.'
    },
    {
      q: 'Is crypto affiliate marketing legal?',
      a: '<strong>Legal</strong> as affiliate marketing. However, you need to <strong>declare your income</strong> and pay taxes accordingly. Consult a tax professional if your earnings exceed certain thresholds.'
    },
    {
      q: 'Which platform is best for crypto affiliate marketing?',
      a: 'In practice: <strong>YouTube</strong> has the highest long-term ROI (videos rank in SEO forever). <strong>Telegram</strong> is great for trading communities. <strong>TikTok</strong> is the fastest-growing channel right now. <strong>Facebook Groups</strong> have high engagement. Start with the platform where you already have an audience.'
    },
    {
      q: 'How do I track my affiliate earnings?',
      a: 'Every exchange has its own <strong>dashboard</strong> to track clicks, sign-ups, and commissions. You can also use <strong>UTM parameters</strong> in Google Analytics to analyze traffic sources in more detail and identify which content performs best.'
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
  var lang = (document.body.getAttribute('data-lang') || 'vi');
  var faqs = faqsData[lang] || faqsData['en'] || faqsData['vi'];
  faqList.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${f.a}</div>
      </div>
    </div>
  `).join('');
}
renderFaqs();

function toggleFaq(i) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, idx) => {
    if (idx === i) item.classList.toggle('open');
    else item.classList.remove('open');
  });
}
window.toggleFaq = toggleFaq;

// ─── SMOOTH SCROLL FOR NAV ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── HEADER SCROLL EFFECT ───────────────────────────────────────
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (header) header.style.borderBottomColor = window.scrollY > 10 ? 'var(--color-divider)' : 'transparent';
}, { passive: true });

// ─── COMMISSION COUNTER (DISABLED — replaced with honest monthly snapshot) ───
// The animated live counter was removed in favor of a verified, static
// month-end number rendered directly in markup (#commissionCounter).
// IIFE kept as no-op for backwards compat with other call sites.
(function () {
  if (true) return; // intentionally disabled — see Network Snapshot
  const MAX_VALUE = 85873;            // Daily max USDT
  const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 1 day
  const TICK_INTERVAL_MS = 60 * 1000; // 1 minute
  // Spread MAX_VALUE evenly across 1440 minutes with slight randomness
  const AVG_PER_MIN = MAX_VALUE / 1440; // ~59.6 USDT/min
  const MIN_INCREMENT = Math.floor(AVG_PER_MIN * 0.7);  // ~42
  const MAX_INCREMENT = Math.ceil(AVG_PER_MIN * 1.3);   // ~78

  const el = document.getElementById('commissionCounter');
  const rateEl = document.getElementById('commissionRate');
  if (!el) return;

  // Seeded pseudo-random for deterministic values
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Cycle starts at midnight UTC each day
  function getCycleStart() {
    const now = Date.now();
    return now - (now % RESET_INTERVAL_MS);
  }

  const BASE_START = 32748;           // Starting value each day

  function computeCurrentValue() {
    const cycleStart = getCycleStart();
    const elapsed = Date.now() - cycleStart;
    const ticksPassed = Math.floor(elapsed / TICK_INTERVAL_MS);

    let total = BASE_START;
    for (let i = 0; i < ticksPassed; i++) {
      const r = seededRandom(cycleStart / 1e9 + i + 1);
      total += Math.floor(MIN_INCREMENT + r * (MAX_INCREMENT - MIN_INCREMENT));
      if (total >= MAX_VALUE) { total = MAX_VALUE; break; }
    }
    return total;
  }

  // Compute hourly rate for current cycle
  function computeAvgHourlyRate() {
    const avgPerMin = (MIN_INCREMENT + MAX_INCREMENT) / 2;
    return Math.round(avgPerMin * 60);
  }

  function formatUSD(n) {
    return '$' + n.toLocaleString('en-US');
  }

  function updateRateDisplay() {
    if (!rateEl) return;
    const arrowSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
    rateEl.innerHTML = arrowSvg + ' ~3,578 USDT/gi\u1EDD';
  }

  // Flash animation trigger
  function triggerFlash() {
    el.classList.remove('flash');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('flash');
  }

  // Smooth counting animation
  let displayValue = computeCurrentValue();
  window.__commissionTarget = displayValue; // expose for scroll-count animation
  el.textContent = formatUSD(displayValue);
  updateRateDisplay();

  function animateToTarget(target) {
    if (target <= displayValue) {
      displayValue = target;
      el.textContent = formatUSD(displayValue);
      return;
    }
    triggerFlash();
    const diff = target - displayValue;
    const steps = 30;
    const stepSize = Math.max(1, Math.floor(diff / steps));
    let current = displayValue;

    const interval = setInterval(() => {
      current += stepSize;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = formatUSD(current);
    }, 50);

    displayValue = target;
  }

  // Update every minute
  setInterval(() => {
    const newValue = computeCurrentValue();
    animateToTarget(newValue);
    updateRateDisplay();
  }, TICK_INTERVAL_MS);

  // Quick visual tick every 2–4 seconds for liveliness
  function scheduleBump() {
    const delay = 2000 + Math.random() * 2000;
    setTimeout(() => {
      const smallBump = Math.floor(Math.random() * 8) + 2;
      displayValue += smallBump;
      el.textContent = formatUSD(displayValue);
      triggerFlash();
      scheduleBump();
    }, delay);
  }
  scheduleBump();

  // Update rate display every 5 minutes
  setInterval(updateRateDisplay, 5 * 60 * 1000);
})();


console.log('✅ DA CRYPTO loaded.');

/* ══════════════════════════════════════════
   STAT MODALS
══════════════════════════════════════════ */
const MODAL_DATA = {
  partner: {
    tag: '✓ ĐÃ XÁC MINH',
    tagClass: 'modal-tag-green',
    bigNum: '237',
    bigNumClass: 'stat-value-gold',
    title: 'Partner đang hoạt động cùng DA Network',
    subtitle: 'Số liệu chốt cuối tháng — cập nhật ngày 1 hàng tháng',
    rows: [
      { label: '👥 Tổng partner trong mạng lưới', val: '237', cls: 'gold' },
      { label: '📈 Partner hoạt động ≥ 3 tháng', val: '~62%', cls: 'green', note: 'Tracking liên tục' },
      { label: '🌍 Thị trường chính', val: 'Việt Nam, Indonesia, Philippines' },
      { label: '⏱️ Thời gian trung bình đến income đầu tiên', val: '4–8 tuần', note: 'Tùy kênh content' },
      { label: '✅ Tiêu chí xét duyệt', val: 'Review từng hồ sơ' },
    ],
    note: '<strong>Làm thế nào để trở thành partner?</strong> Đăng ký tài khoản sàn qua link ref của DA Network, sau đó liên hệ admin để được xét duyệt. Chúng tôi review từng partner — không tuyển ồ ạt. Phản hồi thông thường trong 24–48 giờ.'
  },
  commission: {
    tag: '✓ ĐÃ CHỐT SỔ',
    tagClass: 'modal-tag-green',
    bigNum: null, // rendered from #commissionCounter
    bigNumClass: 'commission-value',
    title: 'Hoa hồng DA Network đã thanh toán cho partner',
    subtitle: 'Tổng commission chuyển thành công trong tháng trước — đã xác minh qua hồ sơ rút tiền',
    rows: [
      { label: '📆 Chu kỳ chốt sổ', val: 'Hàng tháng · Ngày 1', note: 'Dữ liệu đã finalize' },
      { label: '💸 Tổng đã chuyển tháng trước', val: '$28,540', cls: 'gold-hero' },
      { label: '📤 Phương thức thanh toán', val: 'USDT (TRC20 / ERC20)' },
      { label: '⏰ Chu kỳ thanh toán partner', val: 'Hàng tuần hoặc hàng tháng' },
      { label: '🔍 Nguồn dữ liệu', val: 'Hồ sơ rút tiền + dashboard sàn' },
      { label: '⚖️ Tỷ lệ hoa hồng theo sàn', val: '28% – 43%', note: 'Binance / Bingx / Ourbit' },
    ],
    note: '<strong>Con số này có ý nghĩa gì?</strong> Đây là tổng commission DA Network đã <em>thanh toán thành công</em> cho partner trong tháng đã chốt sổ — không tính phần pending hoặc bị hủy. Partner có thể đối chiếu với hồ sơ rút tiền của mình — liên hệ admin nếu thấy không khớp.'
  }
};

/* ── Counter animation helper ── */
function animateCount(el, targetStr, duration = 900) {
  // Parse target — handles formats like "237", "$75,412", "~320", "+12", "~50,400"
  const prefix = targetStr.match(/^[^\d]*/)?.[0] || '';
  const suffix = targetStr.match(/[^\d,\.]+$/)?.[0] || '';
  const raw = targetStr.replace(/[^\d]/g, '');
  const target = parseInt(raw, 10);
  if (isNaN(target) || target === 0) return; // skip non-numeric

  const startTime = performance.now();
  const formatNum = n => n.toLocaleString('en-US');

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = Math.floor(eased * target);
    el.textContent = prefix + formatNum(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + formatNum(target) + suffix;
  }
  requestAnimationFrame(tick);
}

function openStatModal(type) {
  const data = MODAL_DATA[type];
  if (!data) return;

  const bigNumRaw = data.bigNum || document.getElementById('commissionCounter')?.textContent || '$43,872';

  // Rows: mark numeric values with data attribute for animation
  const rowsHTML = data.rows.map((r, i) => `
    <div class="modal-row" style="opacity:0;transform:translateY(8px);transition:opacity 0.3s ${0.12 + i * 0.07}s ease,transform 0.3s ${0.12 + i * 0.07}s ease">
      <span class="modal-row-label">${r.label}</span>
      <span class="modal-row-val-wrap">
        <span class="modal-row-val ${r.cls || ''}" data-count-val="${r.val}">${r.val}</span>
        ${r.note ? `<span class="modal-row-note">${r.note}</span>` : ''}
      </span>
    </div>
  `).join('');

  document.getElementById('statModalContent').innerHTML = `
    <span class="modal-tag ${data.tagClass}">${data.tag}</span>
    <div class="modal-big-num ${data.bigNumClass}" id="modalBigNum" style="opacity:0;transform:scale(0.8);transition:opacity 0.35s 0.05s ease,transform 0.35s 0.05s cubic-bezier(0.34,1.56,0.64,1)"></div>
    <p class="modal-subtitle" style="opacity:0;transition:opacity 0.3s 0.18s ease">${data.title}</p>
    <p style="font-size:0.75rem;color:rgba(255,255,255,0.35);margin-top:-20px;margin-bottom:16px;opacity:0;transition:opacity 0.3s 0.22s ease">${data.subtitle}</p>
    <div class="modal-divider"></div>
    <div class="modal-rows">${rowsHTML}</div>
    <div class="modal-divider"></div>
    <div class="modal-note" style="opacity:0;transition:opacity 0.3s 0.7s ease">${data.note}</div>
  `;

  const overlay = document.getElementById('statModalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Trigger CSS transitions
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const content = document.getElementById('statModalContent');

      // Animate big number
      const bigEl = document.getElementById('modalBigNum');
      bigEl.style.opacity = '1';
      bigEl.style.transform = 'scale(1)';
      bigEl.textContent = bigNumRaw; // set placeholder first
      animateCount(bigEl, bigNumRaw, 1000);

      // Fade in subtitle + note
      content.querySelectorAll('p, .modal-note').forEach(el => { el.style.opacity = '1'; });

      // Stagger rows in + count animate numeric values
      content.querySelectorAll('.modal-row').forEach((row, i) => {
        setTimeout(() => {
          row.style.opacity = '1';
          row.style.transform = 'translateY(0)';
          const valEl = row.querySelector('[data-count-val]');
          if (valEl) animateCount(valEl, valEl.dataset.countVal, 700);
        }, i * 60);
      });
    });
  });
}

function closeStatModal() {
  document.getElementById('statModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeStatModal();
});

/* ══════════════════════════════════════════
   EXPLAINER CARD MODALS
══════════════════════════════════════════ */
const EXPLAINER_DATA = {
  affiliate: {
    icon: '🔗',
    title: 'Affiliate Crypto Là Gì?',
    sub: 'Giải thích chi tiết — dành cho người mới bắt đầu',
    sections: [
      {
        heading: 'Cơ chế hoạt động',
        type: 'steps',
        items: [
          { num: '1', text: 'Bạn đăng ký chương trình affiliate tại sàn (Binance, Bybit, OKX...) và nhận một <strong>link giới thiệu riêng</strong>.' },
          { num: '2', text: 'Chia sẻ link đó lên mạng xã hội, nhóm Telegram, YouTube, TikTok hoặc blog cá nhân.' },
          { num: '3', text: 'Mỗi người bấm vào link và đăng ký tài khoản sẽ được <strong>gắn vào hệ thống của bạn</strong>.' },
          { num: '4', text: 'Khi họ giao dịch, bạn tự động nhận % hoa hồng — suốt thời gian họ còn giao dịch.' },
        ]
      },
      {
        heading: 'Ví dụ thực tế',
        type: 'highlight',
        text: 'Bạn giới thiệu cho <strong>1 người bạn</strong> đăng ký Binance. Người đó giao dịch <strong>$50,000/tháng</strong> với phí 0.1% = $50 phí. Binance trả bạn <strong>40% = $20/tháng</strong> — chỉ từ 1 người, suốt đời họ còn dùng.'
      }
    ]
  },
  income: {
    icon: '💸',
    title: 'Bạn Có Thể Kiếm Bao Nhiêu?',
    sub: 'Ước tính thực tế dựa trên số người giới thiệu',
    sections: [
      {
        heading: 'Bảng thu nhập ước tính / tháng',
        type: 'table',
        rows: [
          { label: '5 người giới thiệu · $5,000 GD/người', val: '~$150' },
          { label: '20 người giới thiệu · $5,000 GD/người', val: '~$600' },
          { label: '50 người giới thiệu · $10,000 GD/người', val: '~$3,000' },
          { label: '100 người giới thiệu · $20,000 GD/người', val: '~$12,000' },
          { label: 'Top partner DA CRYPTO (237 người)', val: '~$2,840' },
        ]
      },
      {
        heading: 'Công thức tính',
        type: 'highlight',
        text: '<strong>Thu nhập = Số người × Khối lượng GD × Phí sàn × Tỷ lệ hoa hồng</strong><br><br>Ví dụ: 20 người × $10,000 × 0.1% × 30% = <strong>$600/tháng</strong>. Số này tích lũy theo thời gian khi mạng lưới lớn dần.'
      }
    ]
  },
  advantages: {
    icon: '⚡',
    title: 'Tại Sao Affiliate Crypto Là Lựa Chọn Tốt?',
    sub: '6 ưu điểm nổi bật so với các hình thức kiếm tiền online khác',
    sections: [
      {
        heading: 'Ưu điểm vượt trội',
        type: 'pills',
        items: [
          { icon: '🚫', text: 'Không cần vốn đầu tư' },
          { icon: '📈', text: 'Thu nhập thụ động 24/7' },
          { icon: '🔄', text: 'Hoa hồng tự động' },
          { icon: '🌐', text: 'Làm việc từ bất cứ đâu' },
          { icon: '🔒', text: 'Không rủi ro mất vốn' },
          { icon: '⚡', text: 'Bắt đầu ngay hôm nay' },
          { icon: '📊', text: 'Dashboard theo dõi realtime' },
          { icon: '💳', text: 'Thanh toán USDT hàng tuần' },
        ]
      },
      {
        heading: 'So sánh với các hình thức khác',
        type: 'highlight',
        text: '• <strong>Trading thông thường</strong>: Cần vốn, cần kinh nghiệm, có thể thua lỗ.<br>• <strong>Affiliate crypto</strong>: Không cần vốn, thu nhập từ hoạt động của người khác, <strong>rủi ro bằng 0</strong>.<br>• Thị trường crypto giao dịch 24/7, hoa hồng phát sinh liên tục kể cả khi bạn ngủ.'
      }
    ]
  }
};

function openExplainerModal(type) {
  const data = EXPLAINER_DATA[type];
  if (!data) return;

  let sectionsHTML = data.sections.map((s, si) => {
    let inner = '';
    if (s.type === 'steps') {
      inner = `<div class="explainer-steps">${s.items.map((item, i) =>
        `<div class="explainer-step" data-delay="${si * 100 + i * 80}">
          <span class="explainer-step-num">${item.num}</span>
          <span>${item.text}</span>
        </div>`
      ).join('')}</div>`;
    } else if (s.type === 'highlight') {
      inner = `<div class="explainer-highlight-box">${s.text}</div>`;
    } else if (s.type === 'table') {
      inner = s.rows.map(r =>
        `<div class="income-example-row"><span class="label">${r.label}</span><span class="val">${r.val}</span></div>`
      ).join('');
    } else if (s.type === 'pills') {
      inner = `<div class="advantage-pills">${s.items.map((p, i) =>
        `<div class="advantage-pill" data-delay="${i * 55}">${p.icon} ${p.text}</div>`
      ).join('')}</div>`;
    }
    return `<div class="explainer-section"><h4>${s.heading}</h4>${inner}</div>`;
  }).join('<div class="modal-divider"></div>');

  document.getElementById('explainerModalContent').innerHTML = `
    <span class="explainer-modal-icon">${data.icon}</span>
    <h2>${data.title}</h2>
    <p class="em-sub">${data.sub}</p>
    <div class="modal-divider"></div>
    ${sectionsHTML}
  `;

  const overlay = document.getElementById('explainerModalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Animate staggered elements
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('#explainerModalContent .explainer-step, #explainerModalContent .advantage-pill').forEach(el => {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay);
    });
  }));
}

function closeExplainerModal() {
  document.getElementById('explainerModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeStatModal();
    closeExplainerModal();
  }
});

/* ══════════════════════════════════════════
   SCROLL STAGGER — Explainer Cards
══════════════════════════════════════════ */
(function () {
  const STAGGER_DELAY = 140; // ms between each card

  function initCardStagger() {
    const cards = document.querySelectorAll('.explainer-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.cardIndex || 0);
          setTimeout(() => card.classList.add('card-visible'), index * STAGGER_DELAY);
          observer.unobserve(card); // fire once
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card, i) => {
      card.dataset.cardIndex = i;
      observer.observe(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardStagger);
  } else {
    initCardStagger();
  }
})();

/* ══════════════════════════════════════════
   3D TILT — Explainer Cards
══════════════════════════════════════════ */
(function () {
  const MAX_TILT   = 12;   // max degrees
  const SCALE      = 1.03;
  const SPEED      = 0.12; // lerp factor (lower = smoother)

  function initTilt() {
    document.querySelectorAll('.explainer-card').forEach(card => {
      let targetRX = 0, targetRY = 0;
      let currentRX = 0, currentRY = 0;
      let rafId = null;
      let isHovered = false;

      function lerp(a, b, t) { return a + (b - a) * t; }

      function tick() {
        currentRX = lerp(currentRX, targetRX, SPEED + 0.08);
        currentRY = lerp(currentRY, targetRY, SPEED + 0.08);

        const shadowX = -currentRY * 1.2;
        const shadowY =  currentRX * 1.2;
        const shadowBlur = 20 + Math.abs(currentRX) + Math.abs(currentRY);
        const shadowOpacity = 0.18 + (Math.abs(currentRX) + Math.abs(currentRY)) * 0.008;

        card.style.transform =
          `rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale(${SCALE})`;
        card.style.boxShadow =
          `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}),
           0 0 30px rgba(247,147,26,${(Math.abs(currentRX) + Math.abs(currentRY)) * 0.005})`;

        const stillMoving =
          Math.abs(currentRX - targetRX) > 0.05 ||
          Math.abs(currentRY - targetRY) > 0.05;

        if (isHovered || stillMoving) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = null;
          if (!isHovered) {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.classList.remove('tilt-active');
          }
        }
      }

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.classList.add('tilt-active');
        if (!rafId) rafId = requestAnimationFrame(tick);
      });

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
        const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

        targetRY =  dx * MAX_TILT;
        targetRX = -dy * MAX_TILT;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetRX = 0;
        targetRY = 0;
        if (!rafId) rafId = requestAnimationFrame(tick);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }
})();

/* ══════════════════════════════════════════
   SCROLL-INTO-VIEW COUNT-UP — Stats Box
   Số 237 và hoa hồng đếm từ 0 khi scroll đến
   + Âm thanh tick coin tăng dần + tiếng ding kết thúc
══════════════════════════════════════════ */
(function () {
  const DURATION = 1800; // ms tổng thời gian đếm số 237

  /* ── Easing ── */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /* ── Web Audio context (lazy init sau user gesture hoặc scroll) ── */
  let audioCtx = null;
  function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  /* ── Một tiếng tick coin ──
     freq    : tần số (Hz) — cao hơn = pitch cao hơn
     vol     : âm lượng 0–1
     when    : thời điểm phát (audioCtx.currentTime + offset)
  ── */
  function playTick(freq, vol, when) {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, when);
    // Pitch drop ngắn — giống tiếng chạm kim loại nhỏ
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, when + 0.04);

    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(vol, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.08);

    osc.start(when);
    osc.stop(when + 0.1);
  }

  /* ── Tiếng ding kết thúc — hai overtone cộng hưởng ── */
  function playDing() {
    const ctx = getCtx();
    const now = ctx.currentTime;

    [[880, 0.18], [1320, 0.10], [1760, 0.06]].forEach(([freq, vol]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc.start(now);
      osc.stop(now + 1.3);
    });
  }

  /* ── Lên lịch chuỗi tick trong suốt DURATION ms ──
     Khoảng 30 tick, khoảng cách giảm dần (dồn dập ở đầu theo easeOutExpo)
     Pitch tăng dần từ 400 Hz → 900 Hz
  ── */
  function scheduleTicks(duration) {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const TICK_COUNT = 28;

    for (let i = 0; i < TICK_COUNT; i++) {
      // Phân bố tick dày ở đầu (easeIn) để khớp với tốc độ đếm nhanh → chậm
      const progress = i / (TICK_COUNT - 1); // 0 → 1
      // Inverse easeOutExpo: tick nhiều ở đầu (lúc số thay đổi nhanh)
      const tRaw = 1 - easeOutExpo(1 - progress); // 0→1, tăng nhanh rồi chậm
      const when = now + (tRaw * duration) / 1000;

      // Pitch leo từ 420 → 860 Hz
      const freq = 420 + progress * 440;
      // Volume nhẹ, tăng chút ở cuối để "build up"
      const vol = 0.04 + progress * 0.07;

      playTick(freq, vol, when);
    }

    // Ding sau khi đếm xong (~50ms sau tick cuối)
    setTimeout(playDing, duration + 60);
  }

  /* ── countUp với âm thanh ── */
  function countUpWithSound(el, from, to, format, duration, withSound) {
    if (withSound) scheduleTicks(duration);

    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * easeOutExpo(t);
      el.textContent = format(Math.round(value));
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = format(to);
    }
    requestAnimationFrame(step);
  }

  function countUp(el, from, to, format, duration) {
    countUpWithSound(el, from, to, format, duration, false);
  }

  function formatUSDLocal(n) {
    return '$' + n.toLocaleString('en-US');
  }

  /* ── Observer ── */
  function initScrollCount() {
    const statsBox = document.querySelector('.hero-stats-vertical');
    if (!statsBox) return;

    const el237  = document.getElementById('goldStat237');
    const elComm = document.getElementById('commissionCounter');
    if (!el237 || !elComm) return;

    let fired = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          observer.unobserve(statsBox);

          // Số 237 — có âm thanh tick
          countUpWithSound(el237, 0, 237, n => String(n), DURATION, true);

          // Số hoa hồng — không có âm thanh riêng (tránh chồng chéo)
          const commTarget = window.__commissionTarget ||
            parseInt((elComm.textContent || '').replace(/[^0-9]/g, ''), 10) || 0;
          countUp(elComm, 0, commTarget, formatUSDLocal, DURATION + 200);
        }
      });
    }, { threshold: 0.35 });

    observer.observe(statsBox);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollCount);
  } else {
    initScrollCount();
  }
})();

/* ══════════════════════════════════════════
   PARTNER WINS — DATA-DRIVEN RENDER
   Tất cả partner stories được định nghĩa trong PARTNERS_DATA bên dưới.
   Để chỉnh nội dung partner: chỉ cần sửa array này.
   Mỗi partner có quote VI + EN để dịch song ngữ.
══════════════════════════════════════════ */
const PARTNERS_DATA = [
  {
    initials: 'HP',
    name: 'Hung Pham',
    city: 'Ha Noi',
    channel: 'Unicorn trading Crypto',
    exchange: 'Ourbit',
    commission: 5543,
    accent: { from: '#0ea5b7', to: '#22d3ee' }, // teal (Ourbit)
    quote: {
      vi: '“Mình bắt đầu từ cộng đồng nhỏ, chia sẻ tutorial và tín hiệu cơ bản. Sau vài tháng, hoa hồng bắt đầu ổn định hơn nhờ traffic thật.”',
      en: '“I started from a small community, sharing tutorials and basic signals. After a few months, commission became more stable thanks to real traffic.”'
    }
  },
  {
    initials: 'AR',
    name: 'Aiman Rahman',
    city: 'Kuala Lumpur',
    channel: 'Bitcoin Malaya',
    exchange: 'BingX',
    commission: 4210,
    accent: { from: '#7c5cff', to: '#a78bfa' }, // purple (BingX)
    quote: {
      vi: '“Mình tập trung xây cộng đồng Telegram bằng nội dung thị trường mỗi ngày. DA Network giúp mình tracking referral và tối ưu commission dễ hơn.”',
      en: '“I focus on building a Telegram community with daily market content. DA Network makes it easier to track referrals and optimize commission.”'
    }
  },
  {
    initials: 'KW',
    name: 'Kelvin Wong',
    city: 'Hong Kong',
    channel: 'Anbu Crypto Alpha',
    exchange: 'Binance',
    commission: 3870,
    accent: { from: '#f7931a', to: '#ffcc44' }, // gold (Binance)
    quote: {
      vi: '“Mình đã có audience về crypto từ trước. Khi chuyển traffic sang các campaign phù hợp, tỷ lệ chuyển đổi tốt hơn mong đợi.”',
      en: '“I already had a crypto audience. When I redirected traffic to suitable campaigns, conversion rate exceeded expectations.”'
    }
  },
  {
    initials: 'TN',
    name: 'Tung Nguyen',
    city: 'Đà Nẵng',
    channel: 'Wealth club crypto',
    exchange: 'OKX',
    commission: 3150,
    accent: { from: '#3b82f6', to: '#60a5fa' }, // blue (OKX)
    quote: {
      vi: '“Mình không chạy ads lớn, chủ yếu làm content đều và hướng dẫn người mới. Kết quả đến từ việc giữ niềm tin với cộng đồng.”',
      en: '“I don’t run big ads — mostly consistent content and onboarding for newcomers. Results come from keeping trust with the community.”'
    }
  },
  {
    initials: 'NC',
    name: 'Narin Chaiyo',
    city: 'Bangkok',
    channel: 'Shadow trading public',
    exchange: 'Bybit',
    commission: 2980,
    accent: { from: '#fbbf24', to: '#fde047' }, // yellow (Bybit)
    quote: {
      vi: '“Mình bắt đầu bằng nhóm nhỏ về copy trading. Sau khi có quy trình onboarding rõ ràng, thu nhập referral tăng ổn định hơn.”',
      en: '“I started with a small copy-trading group. Once we had a clear onboarding process, referral income grew more steadily.”'
    }
  }
];

(function initPartnerWins() {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function formatUSDT(n) {
    return Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' USDT';
  }
  function currentLang() {
    try {
      var l = document.body.getAttribute('data-lang') || document.documentElement.lang || 'vi';
      return ['vi','en','th','ko','id'].indexOf(l) >= 0 ? l : 'vi';
    } catch (e) {
      return 'vi';
    }
  }
  function t(lang, viStr, enStr) {
    return lang === 'vi' ? viStr : enStr;
  }

  function render() {
    const grid = document.getElementById('partnerWinsGrid');
    if (!grid) return;
    const lang = currentLang();
    const L = {
      verifiedBadge: t(lang, 'Đã xác minh bởi DA Network', 'Verified by DA Network'),
      verifyTip: t(lang, 'Partner đã đồng ý chia sẻ câu chuyện', 'Partner consented to share this story'),
      lblChannel: t(lang, 'Kênh', 'Channel'),
      lblExchange: t(lang, 'Sàn chính', 'Main exchange'),
      lblCommission: t(lang, 'Hoa hồng đã nhận', 'Commission earned')
    };

    grid.innerHTML = PARTNERS_DATA.map(function (p) {
      const grad = 'linear-gradient(135deg,' + p.accent.from + ',' + p.accent.to + ')';
      const quote = (p.quote && p.quote[lang]) ? p.quote[lang] : (p.quote && p.quote.vi) || '';
      return ''
        + '<article class="win-card">'
        +   '<header class="win-card-head">'
        +     '<span class="win-avatar" style="background:' + grad + '" aria-hidden="true">' + escapeHtml(p.initials) + '</span>'
        +     '<div class="win-identity">'
        +       '<strong>' + escapeHtml(p.name) + '</strong>'
        +       '<small>' + escapeHtml(p.city) + ' · ' + escapeHtml(p.channel) + '</small>'
        +     '</div>'
        +     '<span class="win-verify" title="' + escapeHtml(L.verifyTip) + '" aria-label="' + escapeHtml(L.verifiedBadge) + '">✓</span>'
        +   '</header>'
        +   '<blockquote class="win-quote">' + escapeHtml(quote) + '</blockquote>'
        +   '<dl class="win-meta">'
        +     '<div><dt>' + escapeHtml(L.lblChannel) + '</dt><dd>' + escapeHtml(p.channel) + '</dd></div>'
        +     '<div><dt>' + escapeHtml(L.lblExchange) + '</dt><dd>' + escapeHtml(p.exchange) + '</dd></div>'
        +     '<div><dt>' + escapeHtml(L.lblCommission) + '</dt><dd class="win-commission">' + escapeHtml(formatUSDT(p.commission)) + '</dd></div>'
        +   '</dl>'
        +   '<div class="win-verified-tag">'
        +     '<svg class="win-verified-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 0L9.8 1.5 12 1.2 13 3.3 15 4.5 14.5 6.8 16 8.5 14.8 10.5 15.3 12.8 13.2 13.5 12.5 15.6 10.2 15.3 8 16 5.8 15.3 3.5 15.6 2.8 13.5 0.7 12.8 1.2 10.5 0 8.5 1.5 6.8 1 4.5 3 3.3 4 1.2 6.2 1.5 8 0z" fill="#4ade80"/><path d="M5 8L7 10L11 6" stroke="#0d0c0a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        +     '<span>' + escapeHtml(L.verifiedBadge) + '</span>'
        +   '</div>'
        + '</article>';
    }).join('');
  }

  function init() {
    render();
    // Re-render when language switches
    document.querySelectorAll('[data-lang], .lang-switch, .lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setTimeout(render, 50); });
    });
    window.addEventListener('storage', function (e) {
      if (e.key === 'lang') render();
    });
    // Expose for manual re-render after i18n switches
    window.renderPartnerWins = render;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ══════════════════════════════════════════
   PROOF GALLERY LIGHTBOX
   Click-to-zoom + keyboard nav (← → Esc)
══════════════════════════════════════════ */
(function initProofLightbox() {
  function init() {
    const items = Array.from(document.querySelectorAll('.proof-item'));
    const lb = document.getElementById('proofLightbox');
    if (!items.length || !lb) return;
    const img = lb.querySelector('.proof-lightbox-img');
    const closeBtn = lb.querySelector('.proof-lightbox-close');
    const prevBtn = lb.querySelector('.proof-lightbox-prev');
    const nextBtn = lb.querySelector('.proof-lightbox-next');
    const idxEl = document.getElementById('proofLbIdx');
    const totalEl = document.getElementById('proofLbTotal');
    if (totalEl) totalEl.textContent = items.length;
    let current = 0;

    function show(i) {
      current = (i + items.length) % items.length;
      const src = items[current].getAttribute('data-img');
      const altEl = items[current].querySelector('img');
      img.src = src;
      img.alt = altEl ? altEl.alt : '';
      if (idxEl) idxEl.textContent = current + 1;
    }
    function open(i) {
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      img.src = '';
    }

    items.forEach((el, i) => {
      el.addEventListener('click', () => open(i));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i);
        }
      });
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ══════════════════════════════════════════
   GOLD PARTICLE SYSTEM — Stats Box
   Hạt vàng li ti bay lơ lửng xung quanh
══════════════════════════════════════════ */
(function () {
  function initParticles() {
    const canvas = document.getElementById('statsParticleCanvas');
    const wrap   = canvas?.parentElement;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const PARTICLE_COUNT = 22;

    // Gold color palette
    const COLORS = [
      'rgba(255,215,0,',
      'rgba(255,190,0,',
      'rgba(255,235,100,',
      'rgba(200,150,0,',
      'rgba(255,255,180,',
    ];

    function resize() {
      const rect = wrap.getBoundingClientRect();
      W = rect.width  + 120;
      H = rect.height + 120;
      canvas.width  = W;
      canvas.height = H;
    }

    function randomParticle(i) {
      // Spawn along the border region (60px band around the box)
      const side = Math.floor(Math.random() * 4);
      let x, y;
      const inner = 60; // inset from canvas edge where box starts
      const pad   = 16; // how far outside the box particles can spawn

      if (side === 0) { // top
        x = inner - pad + Math.random() * (W - 2 * (inner - pad));
        y = Math.random() * (inner + pad);
      } else if (side === 1) { // bottom
        x = inner - pad + Math.random() * (W - 2 * (inner - pad));
        y = H - inner - pad + Math.random() * (inner + pad);
      } else if (side === 2) { // left
        x = Math.random() * (inner + pad);
        y = inner - pad + Math.random() * (H - 2 * (inner - pad));
      } else { // right
        x = W - inner - pad + Math.random() * (inner + pad);
        y = inner - pad + Math.random() * (H - 2 * (inner - pad));
      }

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // slight upward drift
        r:  Math.random() * 1.8 + 0.6,            // radius 0.6–2.4px
        alpha: Math.random() * 0.7 + 0.2,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.008 + 0.003,
        color,
        life: Math.random() * 200 + 100,           // frames before respawn
        age:  Math.floor(Math.random() * 200),
        twinkle: Math.random() > 0.6,              // some particles twinkle
      };
    }

    function initParticleList() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(randomParticle(i));
      }
    }

    function drawGlowDot(p) {
      // Outer soft halo
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0,   p.color + (p.alpha * 0.9) + ')');
      grad.addColorStop(0.4, p.color + (p.alpha * 0.4) + ')');
      grad.addColorStop(1,   p.color + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core bright dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p, idx) => {
        p.x   += p.vx;
        p.y   += p.vy;
        p.age += 1;

        // Twinkle
        if (p.twinkle) {
          p.alpha += p.alphaDir * p.alphaSpeed;
          if (p.alpha > 0.95 || p.alpha < 0.1) p.alphaDir *= -1;
        }

        // Respawn when aged out or drifted far from border
        const outOfBounds = p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20;
        if (p.age > p.life || outOfBounds) {
          particles[idx] = randomParticle(idx);
        } else {
          drawGlowDot(p);
        }
      });

      requestAnimationFrame(tick);
    }

    resize();
    initParticleList();
    tick();

    // Resize observer to keep canvas in sync
    if (window.ResizeObserver) {
      new ResizeObserver(() => { resize(); }).observe(wrap);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})();



/* ══════════════════════════════════════════
   GOLD PARTICLE SYSTEM — Guide Section
══════════════════════════════════════════ */
(function () {
  function init() {
    const canvas  = document.getElementById('guideParticleCanvas');
    const section = canvas?.parentElement;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 18;
    const COLORS = ['rgba(255,215,0,','rgba(255,190,0,','rgba(255,235,120,','rgba(200,150,0,','rgba(255,255,180,'];

    function resize() {
      W = section.offsetWidth;
      H = section.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    }

    function mk() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.25 + 0.04),
        r: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.4 + 0.08,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.005 + 0.002,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 350 + 150,
        age: Math.floor(Math.random() * 350),
        twinkle: Math.random() > 0.4,
      };
    }

    function draw(p) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0,   p.color + p.alpha + ')');
      g.addColorStop(0.5, p.color + (p.alpha * 0.25) + ')');
      g.addColorStop(1,   p.color + '0)');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(p.alpha * 1.4, 1) + ')'; ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.age++;
        if (p.twinkle) {
          p.alpha += p.alphaDir * p.alphaSpeed;
          if (p.alpha > 0.5 || p.alpha < 0.05) p.alphaDir *= -1;
        }
        if (p.age > p.life || p.y < -10 || p.x < -10 || p.x > W + 10) {
          particles[i] = mk(); particles[i].y = H + 5;
        } else { draw(p); }
      });
      requestAnimationFrame(tick);
    }

    resize();
    particles = Array.from({ length: COUNT }, mk);
    tick();
    window.addEventListener('resize', resize, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

/* ══════════════════════════════════════════
   GOLD PARTICLE SYSTEM — Calculator & FAQ
══════════════════════════════════════════ */
(function () {
  const COLORS = ['rgba(255,215,0,','rgba(255,190,0,','rgba(255,235,120,','rgba(200,150,0,','rgba(255,255,180,'];

  function createSectionParticles(canvasId, count) {
    const canvas  = document.getElementById(canvasId);
    const section = canvas?.parentElement;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = section.offsetWidth;
      H = section.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    }

    function mk() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.25 + 0.04),
        r: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.4 + 0.08,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.005 + 0.002,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 350 + 150,
        age: Math.floor(Math.random() * 350),
        twinkle: Math.random() > 0.4,
      };
    }

    function draw(p) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0,   p.color + p.alpha + ')');
      g.addColorStop(0.5, p.color + (p.alpha * 0.25) + ')');
      g.addColorStop(1,   p.color + '0)');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(p.alpha * 1.4, 1) + ')'; ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.age++;
        if (p.twinkle) {
          p.alpha += p.alphaDir * p.alphaSpeed;
          if (p.alpha > 0.5 || p.alpha < 0.05) p.alphaDir *= -1;
        }
        if (p.age > p.life || p.y < -10 || p.x < -10 || p.x > W + 10) {
          particles[i] = mk(); particles[i].y = H + 5;
        } else { draw(p); }
      });
      requestAnimationFrame(tick);
    }

    resize();
    particles = Array.from({ length: count }, mk);
    tick();
    window.addEventListener('resize', resize, { passive: true });
  }

  function init() {
    createSectionParticles('calcParticleCanvas', 18);
    createSectionParticles('faqParticleCanvas',  16);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

/* ══════════════════════════════════════════
   GUIDE CORNER PARTICLES — góc trên trái/phải
══════════════════════════════════════════ */
(function () {
  const COLORS = ['rgba(255,215,0,','rgba(255,190,0,','rgba(255,235,120,','rgba(200,150,0,'];

  function initCorner(canvasId, fromRight) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 220, H = 220;
    canvas.width = W; canvas.height = H;
    const COUNT = 12;

    function mk() {
      // Spawn near the corner
      const cx = fromRight ? W : 0;
      const cy = 0;
      return {
        x: cx + (fromRight ? -1 : 1) * Math.random() * W,
        y: cy + Math.random() * H,
        vx: (fromRight ? -1 : 1) * (Math.random() * 0.3 + 0.05),
        vy: -(Math.random() * 0.4 + 0.1),
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.65 + 0.15,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.008 + 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 200 + 80,
        age: Math.floor(Math.random() * 200),
        twinkle: true,
      };
    }

    let particles = Array.from({ length: COUNT }, mk);

    function draw(p) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, p.color + p.alpha + ')');
      g.addColorStop(0.5, p.color + (p.alpha * 0.3) + ')');
      g.addColorStop(1, p.color + '0)');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(p.alpha * 1.5, 1) + ')'; ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.age++;
        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.05) p.alphaDir *= -1;
        if (p.age > p.life || p.y < -10) {
          particles[i] = mk();
        } else { draw(p); }
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  function init() {
    initCorner('guideCornerLeft', false);
    initCorner('guideCornerRight', true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

/* ══════════════════════════════════════════
   EXPLAINER MODAL MINI PARTICLES
   Khởi động khi modal mở, dừng khi đóng
══════════════════════════════════════════ */
(function () {
  const COLORS = ['rgba(255,215,0,','rgba(255,190,0,','rgba(255,235,150,','rgba(200,140,0,'];
  let rafId = null;
  let particles = [];

  function mk(W, H) {
    return {
      x: Math.random() * W,
      y: H + 5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.15),
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.007 + 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.random() * 180 + 80,
      age: 0,
      twinkle: Math.random() > 0.3,
    };
  }

  function startModalParticles() {
    const canvas = document.getElementById('explainerModalParticleCanvas');
    const modal  = document.getElementById('explainerModal');
    if (!canvas || !modal) return;

    const ctx = canvas.getContext('2d');
    const COUNT = 20;

    function resize() {
      canvas.width  = modal.offsetWidth;
      canvas.height = modal.offsetHeight;
    }
    resize();

    const W = canvas.width, H = canvas.height;
    particles = Array.from({ length: COUNT }, () => {
      const p = mk(W, H);
      p.y = Math.random() * H; // scatter initially
      p.age = Math.floor(Math.random() * p.life);
      return p;
    });

    function draw(p) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, p.color + p.alpha + ')');
      g.addColorStop(0.6, p.color + (p.alpha * 0.2) + ')');
      g.addColorStop(1, p.color + '0)');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(p.alpha * 1.4, 1) + ')'; ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.age++;
        if (p.twinkle) {
          p.alpha += p.alphaDir * p.alphaSpeed;
          if (p.alpha > 0.65 || p.alpha < 0.05) p.alphaDir *= -1;
        }
        if (p.age > p.life || p.y < -10) {
          particles[i] = mk(canvas.width, canvas.height);
        } else { draw(p); }
      });
      rafId = requestAnimationFrame(tick);
    }

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function stopModalParticles() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    const canvas = document.getElementById('explainerModalParticleCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Hook vào openExplainerModal / closeExplainerModal
  const _origOpen  = window.openExplainerModal;
  const _origClose = window.closeExplainerModal;

  window.openExplainerModal = function(type) {
    if (_origOpen) _origOpen(type);
    requestAnimationFrame(() => requestAnimationFrame(startModalParticles));
  };

  window.closeExplainerModal = function() {
    stopModalParticles();
    if (_origClose) _origClose();
  };
})();

/* ══════════════════════════════════════════════════════════
   DA NETWORK — Particle Canvas
══════════════════════════════════════════════════════════ */
(function() {
  const COLORS = [
    'rgba(247,147,26,',
    'rgba(255,200,60,',
    'rgba(255,215,100,',
    'rgba(251,191,36,',
    'rgba(255,230,130,',
  ];

  function mkP(W, H) {
    return {
      x: Math.random() * W,
      y: H + 5,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.45 + 0.12),
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.006 + 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.random() * 200 + 100,
      age: 0,
      twinkle: Math.random() > 0.3,
    };
  }

  const canvas = document.getElementById('daNetworkParticleCanvas');
  if (!canvas) return;

  const section = document.getElementById('da-network');
  const ctx = canvas.getContext('2d');
  const COUNT = 18;
  let particles = [];
  let raf = null;
  let running = false;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function init() {
    resize();
    const W = canvas.width, H = canvas.height;
    particles = Array.from({ length: COUNT }, () => {
      const p = mkP(W, H);
      p.y = Math.random() * H;
      p.age = Math.floor(Math.random() * p.life);
      return p;
    });
  }

  function drawP(p) {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
    g.addColorStop(0,   p.color + p.alpha + ')');
    g.addColorStop(0.6, p.color + (p.alpha * 0.2) + ')');
    g.addColorStop(1,   p.color + '0)');
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + Math.min(p.alpha * 1.4, 1) + ')'; ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const W = canvas.width, H = canvas.height;
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.age++;
      if (p.twinkle) {
        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha > 0.65 || p.alpha < 0.05) p.alphaDir *= -1;
      }
      if (p.age > p.life || p.y < -10) {
        particles[i] = mkP(W, H);
      } else { drawP(p); }
    });
    raf = requestAnimationFrame(tick);
  }

  // Intersection Observer — start when visible, pause when off-screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !running) {
        running = true;
        init();
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(section);
  window.addEventListener('resize', () => { if (running) { resize(); } });
})();

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
  const sectionIds = ['guide', 'calculator', 'faq', 'da-network'];
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
   ĐẶC QUYỀN — Modal logic
══════════════════════════════════════════════════════════ */
window.openDqModal = function(key) {
  var modal = document.getElementById('dqModal-' + key);
  if (!modal) return;
  document.body.style.overflow = 'hidden';
  modal.classList.add('is-open');
  // Re-trigger animation on box
  var box = modal.querySelector('.dq-modal-box');
  if (box) {
    box.style.animation = 'none';
    box.offsetHeight; // reflow
    box.style.animation = '';
  }
};

window.closeDqModal = function(e, target) {
  var id = typeof target === 'string' ? target : (target && target.id);
  if (e && e.target !== (typeof target === 'string' ? document.getElementById(target) : target)) {
    if (typeof target !== 'string') return; // clicked inside box
  }
  var modal = document.getElementById ? (typeof target === 'string' ? document.getElementById(target) : target) : null;
  if (!modal && typeof target === 'string') modal = document.getElementById(target);
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
};

// Dashboard CTA tracking — safe wrapper, no-op if no analytics installed
window.trackDashboardCta = function() {
  var evt = 'dashboard_cta_click';
  var params = { source_site: 'danetwork', target_url: 'https://da-signal-tracking.vercel.app/', section: 'signal_teaser' };
  if (typeof gtag === 'function') gtag('event', evt, params);
  if (typeof fbq === 'function') fbq('trackCustom', evt, params);
  if (typeof plausible === 'function') plausible(evt, { props: params });
};

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dq-modal.is-open').forEach(function(m) {
      m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }
});

/* ══════════════════════════════════════════════════════════
   ĐẶC QUYỀN — Particle Canvas
══════════════════════════════════════════════════════════ */
(function() {
  var canvas = document.getElementById('dqParticleCanvas');
  if (!canvas) return;
  var section = document.getElementById('dac-quyen');
  var ctx = canvas.getContext('2d');
  var COUNT = 16;
  var particles = [];
  var raf = null, running = false;

  var COLORS = ['rgba(247,147,26,','rgba(255,215,102,','rgba(255,200,60,','rgba(200,150,20,','rgba(255,240,140,'];

  function mkP(W, H) {
    return {
      x: Math.random() * W, y: H + 6,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.4 + 0.1),
      r: Math.random() * 1.4 + 0.5,
      alpha: Math.random() * 0.45 + 0.1,
      aDir: Math.random() > 0.5 ? 1 : -1,
      aSpd: Math.random() * 0.005 + 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.random() * 220 + 100, age: 0
    };
  }

  function resize() { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; }

  function init() {
    resize();
    var W = canvas.width, H = canvas.height;
    particles = Array.from({length: COUNT}, function() {
      var p = mkP(W, H); p.y = Math.random() * H; p.age = Math.floor(Math.random() * p.life); return p;
    });
  }

  function drawP(p) {
    var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
    g.addColorStop(0, p.color + p.alpha + ')');
    g.addColorStop(1, p.color + '0)');
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color + Math.min(p.alpha*1.5,1) + ')'; ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var W = canvas.width, H = canvas.height;
    particles.forEach(function(p, i) {
      p.x += p.vx; p.y += p.vy; p.age++;
      p.alpha += p.aDir * p.aSpd;
      if (p.alpha > 0.6 || p.alpha < 0.05) p.aDir *= -1;
      if (p.age > p.life || p.y < -10) particles[i] = mkP(W, H);
      else drawP(p);
    });
    raf = requestAnimationFrame(tick);
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !running) { running = true; init(); raf = requestAnimationFrame(tick); }
      else if (!e.isIntersecting && running) { running = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }
    });
  }, { threshold: 0.05 });

  obs.observe(section);
  window.addEventListener('resize', function() { if (running) resize(); });
})();

/* ══════════════════════════════════════════════════════════
   i18n — LANGUAGE TOGGLE ENGINE
══════════════════════════════════════════════════════════ */
(function() {
  var translations = {
    vi: {
      // Nav
      'nav.cta':       'Bắt Đầu Ngay',
      'nav.guide':     'Hướng Dẫn',
      'nav.calc':      'Tính Thu Nhập',
      'nav.faq':       'FAQ',
      'nav.network':   'DA Network',
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
      'snap.foot':       'Số “Đã chuyển” là tổng commission DA Network đã thanh toán cho partner trong tháng trước, xác minh qua hồ sơ rút tiền.',
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
      'ec.title3': 'Tại Sao Chọn DA Network?',
      // Calculator
      'calc.tag':   'Công Cụ Tính Toán',
      'calc.title': 'Tính Thu Nhập Affiliate',
      'calc.sub':   'Ước tính thu nhập hàng tháng dựa trên số lượng người giới thiệu và khối lượng giao dịch.',
      // FAQ
      'faq.tag':   'Câu Hỏi Thường Gặp',
      'faq.title': 'FAQ',
      // DA Network
      'dan.tag':     'Mạng Lưới Affiliate',
      'dan.title':   'Giới Thiệu DA Network',
      'dan.sub':     'Hệ thống affiliate crypto chuyên nghiệp — kết nối hàng trăm partner trên khắp Đông Nam Á với các sàn giao dịch hàng đầu thế giới.',
      'dan.lb.title':'Partner Đang Làm Tốt', // legacy fallback
      'dan.fb.title':'Hoa Hồng Thực Tế Của Partner',
      // Đặc Quyền
      'dq.tag':   '🔒 Dành riêng cho Partner DA Network',
      'dq.title': 'Đặc Quyền Tại DA Network',
      'dq.sub':   'Chỉ <strong style="color:#ffd966">237 partner</strong> đang hoạt động mới có quyền truy cập. Những điều bên ngoài không thể mua được.',
      'dq.card1.title': 'Bot Trade AI — Hàn Quốc',
      'dq.card2.title': 'Kênh Update Plan Market',
      'dq.card3.title': 'Facts & Quotes Độc Quyền',
      'dq.cta.strong': 'Tất cả đặc quyền trên chỉ có khi bạn là partner DA Network.',
      'dq.cta.btn':    '⚡ Tham Gia Để Mở Khóa',
      // Liên Hệ
      'lh.tag':   'Hỗ Trợ',
      'lh.title': 'Liên Hệ DA NETWORK',
      'lh.sub':   'Có thắc mắc hoặc muốn tham gia network? Đội ngũ sẵn sàng hỗ trợ 24/7.',
      // Footer
      'footer.desc':  'Hướng dẫn toàn diện về affiliate crypto cho người Việt.',
      'footer.col1':  'Hướng Dẫn',
      'footer.col2':  'Công Cụ',
      'footer.col3':  'Về DA NETWORK',
      'footer.copy':  '© 2026 DA NETWORK. Tất cả quyền được bảo lưu.',

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
      // DA Network intro cards
      'dan.c1.title': 'Phủ Sóng Rộng',
      'dan.c1.body': 'Hoạt động tại Việt Nam, Indonesia, Philippines và đang mở rộng ra toàn Đông Nam Á với hơn 237 partner đang hoạt động.',
      'dan.c2.title': 'Hoa Hồng Cao Nhất',
      'dan.c2.body': 'Tỷ lệ hoa hồng lên đến <strong class="gold-text">70%</strong> — cao hơn đăng ký trực tiếp, được DA Network đàm phán độc quyền với từng sàn.',
      'dan.c3.title': 'Hỗ Trợ Toàn Diện',
      'dan.c3.body': 'Đội ngũ admin hỗ trợ 24/7, cung cấp tài liệu, công cụ và lộ trình phát triển cá nhân hóa cho từng partner.',
      'dan.c4.title': 'Tăng Trưởng Bền Vững',
      'dan.c4.body': 'Nhận chia sẻ hoa hồng từ trader giới thiệu trực tiếp và sub-affiliate cấp 1 — tối đa 2 tầng.',
      // Partner Wins (replaces fake leaderboard)
      'wins.badge': '🎯 CÂU CHUYỆN THẬT',
      'wins.title': 'Partner Thật, Kết Quả Thật',
      'wins.sub': 'Không phải bảng xếp hạng thu nhập. Đây là một vài câu chuyện thực tế từ các partner đang xây traffic và nhận hoa hồng qua DA Network.',
      'wins.note': 'Tất cả câu chuyện được chia sẻ với sự đồng ý của partner. Kết quả có thể khác nhau tùy vào kênh, traffic và mức độ triển khai.',
      'wins.note.link': 'Xem cách DA Network xác minh partner →',
      // Verification block
      'verify.badge': '🔍 MINH BẠCH',
      'verify.title': 'Cách DA Network Xác Minh Số Liệu',
      'verify.sub': 'Trong một ngành mà fake screenshot và fake leaderboard là chuyện thường — đây là cách chúng tôi đảm bảo mọi con số bạn thấy là thật.',
      'verify.s1.title': 'Dữ liệu từ dashboard sàn',
      'verify.s1.body': 'Mỗi partner đăng ký dưới link ref của DA Network. Admin thấy hoa hồng pending/paid trực tiếp từ dashboard <strong>Binance, Ourbit, Bingx</strong> — không bị điều chỉnh bởi bên thứ ba.',
      'verify.s2.title': 'Hồ sơ rút tiền',
      'verify.s2.body': 'Con số “đã chuyển” hiển thị trên trang chỉ tính commission <strong>đã thanh toán thành công</strong> đến ví/tài khoản partner — không tính phần pending hoặc bị hủy. Partner có thể đối chiếu với lịch sử rút tiền của mình.',
      'verify.s3.title': 'Partner consent',
      'verify.s3.body': 'Mọi câu chuyện, quote, hay số liệu cá nhân hiển thị công khai đều <strong>có sự đồng ý</strong> của partner. Bạn có thể yêu cầu gỡ thông tin của mình bất cứ lúc nào — chúng tôi xử lý trong 48h.',
      'verify.cta.text': 'Nghĩ rằng số liệu không khớp với rút tiền của bạn? Muốn xem chi tiết về case study của một partner cụ thể?',
      'verify.cta.btn': '📩 Liên hệ admin',
      // Legacy leaderboard keys (kept for safety)
      'dan.lb.badge': '🎯 CÂU CHUYỆN THẬT',
      'dan.lb.sub': 'Network cập nhật tháng · Dữ liệu từ DA Network',
      'dan.lb.h.channel': 'Kênh',
      'dan.lb.h.earn': 'Hoa Hồng/Tháng',
      'dan.lb.h.rate': 'Tỷ Lệ',
      'dan.lb.note': '* Partner consent và minh bạch dữ liệu là cam kết của DA Network.',
      // Feedback
      'dan.fb.badge': '📸 BẰNG CHỨNG THỰC TẾ',
      'dan.fb.sub': 'Ảnh chụp màn hình xác nhận hoa hồng — cập nhật liên tục từ partner trong mạng lưới.',
      'dan.fb.ph1': 'Hình ảnh đang được cập nhật',
      'dan.fb.ph2': 'Partner gửi ảnh feedback về admin để được hiển thị tại đây',
      'dan.cta.text': 'Sẵn sàng tham gia DA Network và bắt đầu kiếm hoa hồng?',
      'dan.cta.btn': 'Bắt Đầu Ngay',
      // Đặc Quyền cards
      'dq.badge.limited': '✓ Tuyển chọn kỹ',
      'dq.card1.body': 'Đừng thuyết phục cộng đồng của bạn. Gửi họ cái link này.',
      'dq.card2.body': 'Cập nhật <strong>kế hoạch thị trường mỗi ngày</strong> từ các trader chuyên nghiệp. Biết trước thị trường sẽ đi đâu khi người khác còn đang dò xét.',
      'dq.card3.body': 'Kênh riêng chia sẻ <strong>sự thật tài chính</strong> và <strong>triết lý sống</strong> mà tệp wealthy không bao giờ nói công khai.',
      'dq.card.details': 'Xem chi tiết',
      'dq.cta.sub': 'Tham gia — phản hồi trong 24–48h.',
      'dash.point1': 'Có cơ hội sử dụng <strong>Bot giao dịch độc quyền</strong> của DA NETWORK',
      'dash.point2': 'Có trang web tracking signal <strong>minh bạch về hiệu suất</strong> của Bot',
      'dash.btn': 'Mở dashboard →',
      'dash.disclaimer': 'Hiệu suất quá khứ không đảm bảo kết quả trong tương lai. Nội dung này không phải lời khuyên đầu tư.',
      // Popup Bot
      'popup.bot.badge': '🔥 ĐỘC QUYỀN · CHỈ CHO PARTNER',
      'popup.bot.title': 'Bot Trade AI — Team Hàn Quốc',
      'popup.bot.lead': 'Trong khi 95% trader thua lỗ vì giao dịch bằng cảm xúc — bạn có máy móc làm việc 24/7 không ngủ, không sợ, không FOMO.',
      'popup.bot.f1.title': 'Phát triển bởi Team Trading Hàn Quốc',
      'popup.bot.f1.body': 'Nhóm trader chuyên nghiệp với hơn 5 năm kinh nghiệm thị trường Asia',
      'popup.bot.f2.title': 'Xem hiệu suất trực tiếp',
      'popup.bot.f2.body': 'Dữ liệu giao dịch cập nhật theo thời gian thực — xem tại dashboard tracking.',
      'popup.bot.f3.title': 'Tự động 100% — không cần theo dõi',
      'popup.bot.f3.body': 'Chạy 24/7, tự vào lệnh, tự chốt lời, tự cắt lỗ. Bạn chỉ việc để vốn.',
      'popup.bot.f4.title': 'Voucher thuê riêng cho Partner DA Network',
      'popup.bot.f4.body': 'Ngoài thị trường giá thuê gốc lên đến $200/tháng — bạn được sử dụng miễn phí qua voucher độc quyền.',
      'popup.bot.alert': '✓ <strong>Voucher dành cho partner chất lượng.</strong> Chúng tôi review từng partner để đảm bảo nguồn lực đến đúng người cam kết build lâu dài — không tuyển ồ ạt.',
      'popup.bot.cta': '🔓 Tham Gia Để Nhận Voucher',
      'popup.bot.note': 'Đăng ký miễn phí · Nhận ngay sau khi xác nhận',
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
      'popup.mkt.note': 'Miễn phí · Chỉ cần là partner DA Network',
      // Popup Facts
      'popup.facts.badge': '💎 ĐỘC QUYỀN · KHÔNG BÁN RA NGOÀI',
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
      'popup.facts.alert': '✨ Kênh này không có bản trả phí. <strong>Chỉ partner DA Network</strong> mới được vào — và hoàn toàn miễn phí.',
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
      'footer.copy2': '© 2026 DA NETWORK.',
    },
    en: {
      // Nav
      'nav.cta':       'Get Started',
      'nav.guide':     'Guide',
      'nav.calc':      'Calculator',
      'nav.faq':       'FAQ',
      'nav.network':   'DA Network',
      'nav.privilege': '⭐ Privileges',
      // Hero
      'hero.badge':  'Full A–Z Guide • 100% Free',
      'hero.title1': 'Earn Money With',
      'hero.title2': 'Crypto Affiliate',
      'hero.title3': 'From Scratch',
      'hero.sub':    'A comprehensive, beginner-friendly guide. From the basics to real trading strategies — with step-by-step examples.',
      'hero.cta1':   'Read the Guide',
      'hero.cta2':   'Calculate Income',
      // Network Snapshot (replaces fake live stats)
      'snap.tag':        '📊 NETWORK SNAPSHOT',
      'snap.meta':       'Updated on the 1st of each month · Closed-book data',
      'snap.partners':   'Active partners',
      'snap.paid':       'Paid to partners last month',
      'snap.exchanges':  'Core partner exchanges',
      'snap.foot':       '“Paid” shows total commission DA Network has actually transferred to partners last month, verified via withdrawal records.',
      'snap.foot.link':  'See how we verify →',
      // Legacy keys kept for backwards compat in modal/aria-labels
      'stats.active':     '✓ VERIFIED',
      'stats.partners':   'PARTNERS',
      'stats.partnerSub': 'Updated on the 1st of each month',
      'stats.hint':       'Tap for details →',
      'stats.live':       '✓ CLOSED BOOK',
      'stats.commLabel':  'COMMISSION PAID LAST MONTH',
      // Guide
      'guide.tag':        'Complete Guide',
      'guide.title':      'What Is Crypto Affiliate?',
      'guide.sub':        'Learn everything from A to Z — from the basics to generating real income.',
      'guide.stepsTitle': '8 Action Steps to Start Earning',
      // Explainer cards
      'ec.title1': 'What Is Crypto Affiliate Marketing?',
      'ec.title2': 'Income From Crypto Affiliate',
      'ec.title3': 'Why Choose DA Network?',
      // Calculator
      'calc.tag':   'Calculation Tool',
      'calc.title': 'Affiliate Income Calculator',
      'calc.sub':   'Estimate your monthly earnings based on your referral count and trading volume.',
      // FAQ
      'faq.tag':   'Frequently Asked Questions',
      'faq.title': 'FAQ',
      // DA Network
      'dan.tag':     'Affiliate Network',
      'dan.title':   'About DA Network',
      'dan.sub':     'A professional crypto affiliate system — connecting hundreds of partners across Southeast Asia with top global exchanges.',
      'dan.lb.title':'Partners Doing Well', // legacy fallback
      'dan.fb.title':'Real Partner Commissions',
      // Đặc Quyền
      'dq.tag':   '🔒 Exclusive to DA Network Partners',
      'dq.title': 'DA Network Member Privileges',
      'dq.sub':   'Only <strong style="color:#ffd966">237 active partners</strong> have access. These are things money can\'t buy outside.',
      'dq.card1.title': 'AI Trading Bot — Korean Team',
      'dq.card2.title': 'Daily Market Plan Channel',
      'dq.card3.title': 'Exclusive Finance Facts & Quotes',
      'dq.cta.strong': 'All privileges above are reserved for DA Network partners only.',
      'dq.cta.btn':    '⚡ Join to Unlock',
      // Liên Hệ
      'lh.tag':   'Support',
      'lh.title': 'Contact DA NETWORK',
      'lh.sub':   'Have questions or want to join the network? Our team is available 24/7.',
      // Footer
      'footer.desc':  'A comprehensive crypto affiliate guide for Vietnamese speakers.',
      'footer.col1':  'Guide',
      'footer.col2':  'Tools',
      'footer.col3':  'About DA NETWORK',
      'footer.copy':  '© 2026 DA NETWORK. All rights reserved.',

      // Explainer cards
      'ec.h1': 'What Is Affiliate?',
      'ec.p1': 'You refer others to sign up for a crypto exchange through <strong>your unique link</strong>. When they trade, you earn a commission from their trading fees.',
      'ec.hint1': 'Tap to learn more →',
      'ec.h2': 'How Much Can You Earn?',
      'ec.p2': 'Commissions typically range from <strong>20%–50% of trading fees</strong> from referred users. Some exchanges pay lifetime commissions.',
      'ec.hint2': 'Tap to see real examples →',
      'ec.h3': 'Key Advantages',
      'ec.p3': 'No capital required, no trading experience needed. Passive income — earn even while you sleep.',
      'ec.hint3': 'Tap to see all advantages →',
      // Guide nav & comparison
      'guide.prev': 'Previous',
      'guide.next': 'Next',
      'guide.compareTitle': 'Top Crypto Affiliate Exchanges Compared',
      'guide.viewAllDeals': 'View All 12 Exchanges',
      // Calculator
      'calc.inputTitle': 'Enter Parameters',
      'calc.lbl1': 'Referrals per month',
      'calc.unit.people': 'people',
      'calc.lbl2': 'Avg. trading volume per person (USD/month)',
      'calc.lbl3': 'Commission rate (%)',
      'calc.lbl4': 'Exchange trading fee (%)',
      'calc.resultTitle': 'Estimated Results',
      'calc.res1': 'This month\'s income',
      'calc.res2': 'Annual income',
      'calc.res3': 'Total exchange fees',
      'calc.res4': 'Commission per person',
      'calc.note': '* Estimated projection. Actual income depends on user activity and exchange terms.',
      // DA Network intro cards
      'dan.c1.title': 'Wide Coverage',
      'dan.c1.body': 'Operating in Vietnam, Indonesia, Philippines — and expanding across Southeast Asia with 237+ active partners.',
      'dan.c2.title': 'Highest Commissions',
      'dan.c2.body': 'Commission rates up to <strong class="gold-text">70%</strong> — higher than direct sign-ups, negotiated exclusively by DA Network with each exchange.',
      'dan.c3.title': 'Full Support',
      'dan.c3.body': '24/7 admin support with resources, tools, and personalized growth roadmaps for every partner.',
      'dan.c4.title': 'Sustainable Growth',
      'dan.c4.body': 'Earn commission from direct referrals and tier-1 sub-affiliates — up to 2 levels.',
      // Partner Wins (replaces fake leaderboard)
      'wins.badge': '🎯 REAL STORIES',
      'wins.title': 'Real Partners, Real Results',
      'wins.sub': 'Not an income leaderboard. Just a few real stories from partners building traffic and earning commission through DA Network.',
      'wins.note': 'All stories are shared with partner consent. Results may vary depending on channel, traffic, and execution.',
      'wins.note.link': 'See how DA Network verifies partners →',
      // Verification block
      'verify.badge': '🔍 TRANSPARENCY',
      'verify.title': 'How DA Network Verifies Numbers',
      'verify.sub': 'In an industry where fake screenshots and fake leaderboards are routine — here\'s how we make sure every number you see is real.',
      'verify.s1.title': 'Exchange dashboard data',
      'verify.s1.body': 'Every partner registers under DA Network\'s ref link. Admin sees pending/paid commissions directly from <strong>Binance, Ourbit, Bingx</strong> dashboards — untouched by third parties.',
      'verify.s2.title': 'Withdrawal records',
      'verify.s2.body': 'The “paid” number on this site counts only commissions <strong>successfully transferred</strong> to partner wallets/accounts — excluding pending or canceled. Partners can cross-check against their own withdrawal history.',
      'verify.s3.title': 'Partner consent',
      'verify.s3.body': 'Every story, quote, and personal stat shown publicly is <strong>shared with consent</strong>. You can request to remove your info at any time — we process within 48h.',
      'verify.cta.text': 'Think the numbers don\'t match your withdrawals? Want details on a specific partner case study?',
      'verify.cta.btn': '📩 Contact admin',
      // Legacy leaderboard keys (kept for safety)
      'dan.lb.badge': '🎯 REAL STORIES',
      'dan.lb.sub': 'Monthly snapshot · Data from DA Network',
      'dan.lb.h.channel': 'Channel',
      'dan.lb.h.earn': 'Commission/Month',
      'dan.lb.h.rate': 'Rate',
      'dan.lb.note': '* Partner consent and data transparency are DA Network\'s commitment.',
      // Feedback
      'dan.fb.badge': '📸 REAL PROOF',
      'dan.fb.sub': 'Commission confirmation screenshots — continuously updated from partners in the network.',
      'dan.fb.ph1': 'Images coming soon',
      'dan.fb.ph2': 'Partners submit feedback screenshots to admin for display here',
      'dan.cta.text': 'Ready to join DA Network and start earning commissions?',
      'dan.cta.btn': 'Get Started Now',
      // Đặc Quyền cards
      'dq.badge.limited': '✓ Hand-picked partners',
      'dq.card1.body': "Don't convince your community. Send them this link.",
      'dq.card2.body': 'Daily <strong>market plan updates</strong> from professional traders. Know where the market is heading before everyone else.',
      'dq.card3.body': 'A private channel sharing <strong>financial truths</strong> and <strong>life philosophy</strong> that the wealthy never say publicly.',
      'dq.card.details': 'View details',
      'dq.cta.sub': 'Join — we respond within 24–48h.',
      'dash.point1': 'Opportunity to use DA NETWORK\'s <strong>exclusive trading bot</strong>',
      'dash.point2': 'Signal tracking website with <strong>transparent bot performance</strong>',
      'dash.btn': 'Open dashboard →',
      'dash.disclaimer': 'Past performance does not guarantee future results. This is not investment advice.',
      // Popup Bot
      'popup.bot.badge': '🔥 EXCLUSIVE · PARTNERS ONLY',
      'popup.bot.title': 'AI Trading Bot — Korean Team',
      'popup.bot.lead': 'While 95% of traders lose money trading on emotion — you have a machine working 24/7, no sleep, no fear, no FOMO.',
      'popup.bot.f1.title': 'Developed by Korean Trading Team',
      'popup.bot.f1.body': 'Professional traders with 5+ years of experience in Asian markets',
      'popup.bot.f2.title': 'Live Performance Data',
      'popup.bot.f2.body': 'Real-time trading data updated continuously — view on the tracking dashboard.',
      'popup.bot.f3.title': '100% Automated — No Monitoring Needed',
      'popup.bot.f3.body': 'Runs 24/7, auto-enters trades, auto-takes profit, auto-cuts loss. Just deposit capital.',
      'popup.bot.f4.title': 'Exclusive Voucher for DA Network Partners',
      'popup.bot.f4.body': 'Market rental price is up to $200/month — you get it free through the exclusive partner voucher.',
      'popup.bot.alert': '⚠️ <strong>Only 12 vouchers left</strong> this month. Slots close when full.',
      'popup.bot.cta': '🔓 Join to Claim Your Voucher',
      'popup.bot.note': 'Free sign-up · Receive immediately upon confirmation',
      // Popup Market
      'popup.mkt.badge': '🟢 UPDATED DAILY · EXCLUSIVE',
      'popup.mkt.title': 'Daily Market Plan Channel',
      'popup.mkt.lead': 'While millions scroll Twitter through information overload — you receive a clean, clear plan every morning at 7am.',
      'popup.mkt.f1.title': 'Market plan every day at 7:00 AM',
      'popup.mkt.f1.body': 'Trend analysis, support/resistance zones, priority pairs for the day',
      'popup.mkt.f2.title': 'Macro + On-chain Analysis',
      'popup.mkt.f2.body': 'On-chain data, aggregated sentiment, global macro financial impact',
      'popup.mkt.f3.title': 'Specific Trade Setups',
      'popup.mkt.f3.body': 'Clear Entry, SL, TP — just read and decide. No self-analysis needed',
      'popup.mkt.f4.title': 'Real-time Market Alerts',
      'popup.mkt.f4.body': 'Instant alerts on major moves — act before 90% of the market',
      'popup.mkt.alert': '📊 Those who get information first <strong>earn more</strong>. This channel is partner-only — not available outside.',
      'popup.mkt.cta': '🔓 Join to Access the Channel',
      'popup.mkt.note': 'Free · DA Network partners only',
      // Popup Facts
      'popup.facts.badge': '💎 EXCLUSIVE · NOT FOR SALE',
      'popup.facts.title': 'Exclusive Facts &amp; Quotes Channel',
      'popup.facts.lead': 'What the truly wealthy understand about money — but never say out loud. Now it\'s yours.',
      'popup.facts.f1.title': 'Financial truths schools never teach',
      'popup.facts.f1.body': 'How the wealthy truly think about money, risk, investing, and financial freedom',
      'popup.facts.f2.title': 'Quotes from CEOs, investors, billionaires',
      'popup.facts.f2.body': 'Life philosophies distilled from those who have achieved true financial freedom',
      'popup.facts.f3.title': 'Elite lifestyle — the mindset of the wealthy',
      'popup.facts.f3.body': 'How they see time, relationships, health, and opportunity — different from 99% of people',
      'popup.facts.f4.title': 'Regular updates — no spam',
      'popup.facts.f4.body': 'Every post is a concentrated insight — 2 minutes of reading changes your thinking for the whole day',
      'popup.facts.alert': '✨ This channel has no paid version. <strong>Only DA Network partners</strong> get in — completely free.',
      'popup.facts.cta': '🔓 Join to Access the Channel',
      'popup.facts.note': 'Completely free · Just be a partner',
      // Contact
      'lh.bd.title': 'Business Development',
      'lh.bd.handle': '@jacksondz',
      'lh.card1.title': 'Telegram Admin',
      'lh.card1.handle': '@dacrypto_admin',
      'lh.card2.title': 'Community Group',
      'lh.card2.handle': 'DA NETWORK Telegram Group',
      'lh.card3.title': 'Support Email',
      'lh.card3.handle': 'support@dacrypto.net',
      'lh.note': 'Typically responds within <strong>1–2 hours</strong> during business hours.',
      // Footer links
      'footer.link.start': 'Get Started',
      'footer.link.calc': 'Calculator',
      'footer.link.contact': 'Contact',
      'footer.link.calc2': 'Calculator',
      'footer.disclaimer': '<strong>Disclaimer:</strong> Content is for informational and educational purposes only. Not financial advice. Crypto investments carry high risk.',
      'footer.copy2': '© 2026 DA NETWORK.',
    },
    th: {
      'nav.cta':'เริ่มต้นเลย','nav.guide':'คู่มือ','nav.calc':'คำนวณรายได้','nav.faq':'คำถาม','nav.network':'DA Network','nav.privilege':'⭐ สิทธิพิเศษ',
      'hero.badge':'คู่มือ A–Z ครบถ้วน • ฟรี 100%','hero.title1':'หาเงินกับ','hero.title2':'Crypto Affiliate','hero.title3':'เริ่มจากศูนย์',
      'hero.sub':'คู่มือที่ครอบคลุมและเข้าใจง่ายสำหรับมือใหม่ ตั้งแต่พื้นฐานจนถึงกลยุทธ์จริง — พร้อมตัวอย่างทีละขั้นตอน',
      'hero.cta1':'อ่านคู่มือ','hero.cta2':'คำนวณรายได้',
      'snap.tag':'📊 ข้อมูลเครือข่าย','snap.meta':'อัปเดตทุกวันที่ 1 ของเดือน · ข้อมูลยืนยันแล้ว','snap.partners':'พาร์ทเนอร์ที่ใช้งานอยู่','snap.paid':'จ่ายให้พาร์ทเนอร์เดือนที่แล้ว','snap.exchanges':'ตลาดหลักที่เป็นพาร์ทเนอร์',
      'snap.foot':'ตัวเลข "จ่ายแล้ว" คือคอมมิชชันทั้งหมดที่ DA Network โอนให้พาร์ทเนอร์ในเดือนที่แล้ว ยืนยันผ่านประวัติการถอน','snap.foot.link':'ดูวิธีการตรวจสอบ →',
      'stats.active':'✓ ยืนยันแล้ว','stats.partners':'พาร์ทเนอร์','stats.partnerSub':'อัปเดตทุกวันที่ 1 ของเดือน','stats.hint':'แตะเพื่อดูรายละเอียด →','stats.live':'✓ ยืนยันแล้ว','stats.commLabel':'คอมมิชชันที่จ่ายในเดือนที่แล้ว',
      'guide.tag':'คู่มือครบถ้วน','guide.title':'Crypto Affiliate คืออะไร?','guide.sub':'เรียนรู้ตั้งแต่ A ถึง Z — ตั้งแต่พื้นฐานจนถึงการสร้างรายได้จริง','guide.stepsTitle':'8 ขั้นตอนเริ่มต้นหาเงิน',
      'ec.title1':'Crypto Affiliate Marketing คืออะไร?','ec.title2':'รายได้จาก Crypto Affiliate','ec.title3':'ทำไมถึงเลือก DA Network?',
      'calc.tag':'เครื่องมือคำนวณ','calc.title':'คำนวณรายได้ Affiliate','calc.sub':'ประมาณรายได้ต่อเดือนตามจำนวนผู้แนะนำและปริมาณการเทรด',
      'faq.tag':'คำถามที่พบบ่อย','faq.title':'FAQ',
      'dan.tag':'เครือข่าย Affiliate','dan.title':'เกี่ยวกับ DA Network','dan.sub':'ระบบ crypto affiliate ระดับมืออาชีพ — เชื่อมต่อพาร์ทเนอร์หลายร้อยคนทั่วเอเชียตะวันออกเฉียงใต้กับตลาดแลกเปลี่ยนชั้นนำของโลก',
      'dan.lb.title':'พาร์ทเนอร์ที่ทำได้ดี','dan.fb.title':'ค่าคอมมิชชันจริงของพาร์ทเนอร์',
      'dq.tag':'🔒 เฉพาะพาร์ทเนอร์ DA Network','dq.title':'สิทธิพิเศษของ DA Network','dq.sub':'เฉพาะ <strong style="color:#ffd966">237 พาร์ทเนอร์</strong>ที่ใช้งานอยู่เท่านั้นที่มีสิทธิ์เข้าถึง สิ่งที่ไม่สามารถซื้อได้ข้างนอก',
      'dq.card1.title':'AI Trading Bot — ทีมเกาหลี','dq.card2.title':'ช่องอัปเดตแผนตลาด','dq.card3.title':'ช่อง Facts &amp; Quotes สุดเอ็กซ์คลูซีฟ',
      'dq.cta.strong':'สิทธิพิเศษทั้งหมดข้างต้นสงวนไว้เฉพาะพาร์ทเนอร์ DA Network เท่านั้น','dq.cta.btn':'⚡ เข้าร่วมเพื่อปลดล็อก',
      'lh.tag':'การสนับสนุน','lh.title':'ติดต่อ DA NETWORK','lh.sub':'มีคำถามหรืออยากเข้าร่วมเครือข่าย? ทีมพร้อมให้บริการ 24/7',
      'footer.desc':'คู่มือ crypto affiliate ที่ครอบคลุมสำหรับผู้ใช้ภาษาไทย','footer.col1':'คู่มือ','footer.col2':'เครื่องมือ','footer.col3':'เกี่ยวกับ DA NETWORK','footer.copy':'© 2026 DA NETWORK. สงวนลิขสิทธิ์ทั้งหมด',
      'ec.h1':'Affiliate คืออะไร?','ec.p1':'คุณแนะนำผู้อื่นให้สมัครตลาดแลกเปลี่ยน crypto ผ่าน<strong>ลิงก์พิเศษของคุณ</strong> เมื่อพวกเขาเทรด คุณได้รับค่าคอมมิชชันจากค่าธรรมเนียมการเทรด','ec.hint1':'แตะเพื่อเรียนรู้เพิ่มเติม →',
      'ec.h2':'หาเงินได้เท่าไร?','ec.p2':'ค่าคอมมิชชันโดยทั่วไปอยู่ที่ <strong>20%–50% ของค่าธรรมเนียมการเทรด</strong> บางตลาดจ่ายค่าคอมมิชชันตลอดชีพ','ec.hint2':'แตะเพื่อดูตัวอย่างจริง →',
      'ec.h3':'ข้อได้เปรียบหลัก','ec.p3':'ไม่ต้องใช้ทุน ไม่ต้องมีประสบการณ์การเทรด รายได้ passive — หาเงินแม้ตอนนอนหลับ','ec.hint3':'แตะเพื่อดูข้อได้เปรียบทั้งหมด →',
      'guide.prev':'ก่อนหน้า','guide.next':'ถัดไป','guide.compareTitle':'เปรียบเทียบตลาด Affiliate ชั้นนำ','guide.viewAllDeals':'ดูทั้งหมด 12 ตลาด',
      'calc.inputTitle':'กรอกข้อมูล','calc.lbl1':'จำนวนผู้แนะนำต่อเดือน','calc.unit.people':'คน','calc.lbl2':'ปริมาณการเทรดเฉลี่ยต่อคน (USD/เดือน)','calc.lbl3':'อัตราค่าคอมมิชชัน (%)','calc.lbl4':'ค่าธรรมเนียมการเทรดของตลาด (%)','calc.resultTitle':'ผลลัพธ์โดยประมาณ','calc.res1':'รายได้เดือนนี้','calc.res2':'รายได้ต่อปี','calc.res3':'ค่าธรรมเนียมตลาดทั้งหมด','calc.res4':'ค่าคอมมิชชันต่อคน','calc.note':'* ตัวเลขโดยประมาณ รายได้จริงขึ้นอยู่กับกิจกรรมของผู้ใช้และเงื่อนไขของตลาด',
      'dan.c1.title':'ครอบคลุมกว้างขวาง','dan.c1.body':'ดำเนินการในเวียดนาม อินโดนีเซีย ฟิลิปปินส์ — และกำลังขยายทั่วเอเชียตะวันออกเฉียงใต้ด้วยพาร์ทเนอร์ที่ใช้งานอยู่ 237+ คน',
      'dan.c2.title':'ค่าคอมมิชชันสูงสุด','dan.c2.body':'อัตราค่าคอมมิชชันสูงถึง <strong class="gold-text">70%</strong> — สูงกว่าการสมัครโดยตรง เจรจาโดย DA Network กับแต่ละตลาดโดยเฉพาะ',
      'dan.c3.title':'การสนับสนุนเต็มรูปแบบ','dan.c3.body':'ทีม admin สนับสนุน 24/7 พร้อมทรัพยากร เครื่องมือ และแผนการเติบโตส่วนบุคคลสำหรับทุกพาร์ทเนอร์',
      'dan.c4.title':'การเติบโตที่ยั่งยืน','dan.c4.body':'รับค่าคอมมิชชันจากผู้แนะนำโดยตรงและ sub-affiliate ระดับ 1 — สูงสุด 2 ระดับ',
      'wins.badge':'🎯 เรื่องจริง','wins.title':'พาร์ทเนอร์จริง ผลลัพธ์จริง','wins.sub':'ไม่ใช่ตาราง ranking รายได้ แต่เป็นเรื่องจริงจากพาร์ทเนอร์ที่กำลังสร้าง traffic และรับค่าคอมมิชชันผ่าน DA Network','wins.note':'เรื่องราวทั้งหมดแบ่งปันด้วยความยินยอมของพาร์ทเนอร์ ผลลัพธ์อาจแตกต่างกัน','wins.note.link':'ดูวิธีที่ DA Network ตรวจสอบพาร์ทเนอร์ →',
      'verify.badge':'🔍 ความโปร่งใส','verify.title':'วิธีที่ DA Network ตรวจสอบตัวเลข','verify.sub':'ในอุตสาหกรรมที่ screenshot ปลอมและ leaderboard ปลอมเป็นเรื่องปกติ — นี่คือวิธีที่เราทำให้ทุกตัวเลขเป็นของจริง',
      'verify.s1.title':'ข้อมูลจาก dashboard ของตลาด','verify.s1.body':'พาร์ทเนอร์ทุกคนลงทะเบียนภายใต้ลิงก์ ref ของ DA Network Admin เห็นค่าคอมมิชชัน pending/paid โดยตรงจาก dashboard ของ <strong>Binance, Ourbit, Bingx</strong>',
      'verify.s2.title':'บันทึกการถอน','verify.s2.body':'ตัวเลข "จ่ายแล้ว" นับเฉพาะค่าคอมมิชชันที่<strong>โอนสำเร็จ</strong>ไปยังกระเป๋า/บัญชีของพาร์ทเนอร์ — ไม่รวม pending หรือที่ถูกยกเลิก',
      'verify.s3.title':'ความยินยอมของพาร์ทเนอร์','verify.s3.body':'ทุกเรื่อง quote และสถิติส่วนบุคคลที่แสดงต่อสาธารณะ<strong>ได้รับความยินยอม</strong> คุณสามารถขอลบข้อมูลของคุณได้ทุกเมื่อ — เราดำเนินการภายใน 48 ชั่วโมง',
      'verify.cta.text':'คิดว่าตัวเลขไม่ตรงกับการถอนของคุณ? ต้องการรายละเอียดเกี่ยวกับ case study ของพาร์ทเนอร์คนใดคนหนึ่ง?','verify.cta.btn':'📩 ติดต่อ admin',
      'dan.lb.badge':'🎯 เรื่องจริง','dan.lb.sub':'ข้อมูลรายเดือน · ข้อมูลจาก DA Network','dan.lb.h.channel':'ช่องทาง','dan.lb.h.earn':'ค่าคอมมิชชัน/เดือน','dan.lb.h.rate':'อัตรา','dan.lb.note':'* ความยินยอมของพาร์ทเนอร์และความโปร่งใสของข้อมูลคือพันธสัญญาของ DA Network',
      'dan.fb.badge':'📸 หลักฐานจริง','dan.fb.sub':'ภาพหน้าจอยืนยันค่าคอมมิชชัน — อัปเดตต่อเนื่องจากพาร์ทเนอร์ในเครือข่าย','dan.fb.ph1':'กำลังอัปเดตรูปภาพ','dan.fb.ph2':'พาร์ทเนอร์ส่งภาพ feedback ให้ admin เพื่อแสดงที่นี่',
      'dan.cta.text':'พร้อมเข้าร่วม DA Network และเริ่มรับค่าคอมมิชชันแล้วหรือยัง?','dan.cta.btn':'เริ่มต้นเลย',
      'dq.badge.limited':'✓ คัดเลือกอย่างพิถีพิถัน','dq.card1.body':'อย่าโน้มน้าวชุมชนของคุณ ส่งลิงก์นี้ให้พวกเขา','dq.card2.body':'อัปเดต<strong>แผนตลาดทุกวัน</strong>จากเทรดเดอร์มืออาชีพ รู้ทิศทางตลาดก่อนคนอื่น','dq.card3.body':'ช่องส่วนตัวแบ่งปัน<strong>ความจริงทางการเงิน</strong>และ<strong>ปรัชญาชีวิต</strong>ที่คนรวยไม่เคยพูดต่อสาธารณะ','dq.card.details':'ดูรายละเอียด','dq.cta.sub':'เข้าร่วม — ตอบกลับภายใน 24–48 ชั่วโมง','dash.point1':'มีโอกาสใช้ <strong>บอทเทรดสุดเอ็กซ์คลูซีฟ</strong> ของ DA NETWORK','dash.point2':'มีเว็บไซต์ tracking signal <strong>โปร่งใสด้านประสิทธิภาพ</strong>ของบอท','dash.btn':'เปิด dashboard →','dash.disclaimer':'ผลการดำเนินงานในอดีตไม่รับประกันผลลัพธ์ในอนาคต เนื้อหานี้ไม่ใช่คำแนะนำการลงทุน',
      'popup.bot.badge':'🔥 เอ็กซ์คลูซีฟ · เฉพาะพาร์ทเนอร์','popup.bot.title':'AI Trading Bot — ทีมเกาหลี','popup.bot.lead':'ขณะที่ 95% ของเทรดเดอร์ขาดทุนเพราะเทรดตามอารมณ์ — คุณมีเครื่องจักรทำงาน 24/7 ไม่นอน ไม่กลัว ไม่ FOMO',
      'popup.bot.f1.title':'พัฒนาโดยทีมเทรดเกาหลี','popup.bot.f1.body':'เทรดเดอร์มืออาชีพที่มีประสบการณ์ตลาดเอเชียมากกว่า 5 ปี','popup.bot.f2.title':'ข้อมูลสดจาก dashboard','popup.bot.f2.body':'ข้อมูลการเทรดอัปเดตแบบ real-time — ดูได้ที่ tracking dashboard','popup.bot.f3.title':'อัตโนมัติ 100% — ไม่ต้องตรวจสอบ','popup.bot.f3.body':'ทำงาน 24/7 เข้าออเดอร์อัตโนมัติ ทำกำไรอัตโนมัติ ตัดขาดทุนอัตโนมัติ แค่ฝากทุน','popup.bot.f4.title':'บัตรเช่าสุดเอ็กซ์คลูซีฟสำหรับพาร์ทเนอร์ DA Network','popup.bot.f4.body':'ราคาเช่าตลาดสูงถึง $200/เดือน — คุณได้ฟรีผ่านบัตรพาร์ทเนอร์สุดเอ็กซ์คลูซีฟ',
      'popup.bot.alert':'✓ <strong>บัตรสำหรับพาร์ทเนอร์คุณภาพ</strong> เราตรวจสอบพาร์ทเนอร์แต่ละคนเพื่อให้แน่ใจว่าทรัพยากรถึงมือคนที่มุ่งมั่นสร้างระยะยาว','popup.bot.cta':'🔓 เข้าร่วมเพื่อรับบัตร','popup.bot.note':'สมัครฟรี · รับทันทีหลังยืนยัน',
      'popup.mkt.badge':'🟢 อัปเดตทุกวัน · เอ็กซ์คลูซีฟ','popup.mkt.title':'ช่องอัปเดตแผนตลาด','popup.mkt.lead':'ขณะที่ล้านคนเลื่อน Twitter ท่วมข้อมูล — คุณได้รับแผนที่สะอาด ชัดเจน ทุกเช้า 7 โมง',
      'popup.mkt.f1.title':'แผนตลาดทุกวันเวลา 7:00 น.','popup.mkt.f1.body':'วิเคราะห์แนวโน้ม โซนรองรับ/ต้านทาน คู่สกุลเงินสำคัญในวันนั้น','popup.mkt.f2.title':'การวิเคราะห์ Macro + On-chain','popup.mkt.f2.body':'ข้อมูล on-chain ความรู้สึกรวม ผลกระทบ macro ทางการเงินโลก','popup.mkt.f3.title':'การตั้งค่าเทรดเฉพาะ','popup.mkt.f3.body':'Entry, SL, TP ชัดเจน — แค่อ่านแล้วตัดสินใจ ไม่ต้องวิเคราะห์เอง','popup.mkt.f4.title':'การแจ้งเตือนตลาดแบบ real-time','popup.mkt.f4.body':'แจ้งเตือนทันทีเมื่อมีการเคลื่อนไหวครั้งใหญ่ — ลงมือก่อน 90% ของตลาด',
      'popup.mkt.alert':'📊 คนที่ได้ข้อมูลก่อน<strong>หาเงินได้มากกว่า</strong> ช่องนี้เฉพาะพาร์ทเนอร์ — ไม่มีขายภายนอก','popup.mkt.cta':'🔓 เข้าร่วมเพื่อเข้าถึงช่อง','popup.mkt.note':'ฟรี · เฉพาะพาร์ทเนอร์ DA Network',
      'popup.facts.badge':'💎 เอ็กซ์คลูซีฟ · ไม่ขาย','popup.facts.title':'ช่อง Facts &amp; Quotes สุดเอ็กซ์คลูซีฟ','popup.facts.lead':'สิ่งที่คนรวยจริงๆ เข้าใจเกี่ยวกับเงิน — แต่ไม่เคยพูดออกมา ตอนนี้มันเป็นของคุณแล้ว',
      'popup.facts.f1.title':'ความจริงทางการเงินที่โรงเรียนไม่สอน','popup.facts.f1.body':'คนรวยคิดเกี่ยวกับเงิน ความเสี่ยง การลงทุน และอิสรภาพทางการเงินอย่างไร','popup.facts.f2.title':'คำพูดจาก CEO, นักลงทุน, มหาเศรษฐี','popup.facts.f2.body':'ปรัชญาชีวิตที่กลั่นออกมาจากผู้ที่บรรลุอิสรภาพทางการเงินที่แท้จริง','popup.facts.f3.title':'ไลฟ์สไตล์ elite — ความคิดของคนรวย','popup.facts.f3.body':'พวกเขามองเวลา ความสัมพันธ์ สุขภาพ และโอกาสอย่างไร — ต่างจาก 99% ของผู้คน','popup.facts.f4.title':'อัปเดตสม่ำเสมอ — ไม่สแปม','popup.facts.f4.body':'ทุกโพสต์คือความเข้าใจที่กลั่น — อ่าน 2 นาทีเปลี่ยนความคิดตลอดวัน',
      'popup.facts.alert':'✨ ช่องนี้ไม่มีเวอร์ชันชำระเงิน <strong>เฉพาะพาร์ทเนอร์ DA Network</strong>เท่านั้นที่เข้าได้ — ฟรีโดยสมบูรณ์','popup.facts.cta':'🔓 เข้าร่วมเพื่อเข้าถึงช่อง','popup.facts.note':'ฟรีโดยสมบูรณ์ · แค่เป็นพาร์ทเนอร์',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'กลุ่มชุมชน','lh.card2.handle':'Telegram Group DA NETWORK','lh.card3.title':'อีเมลสนับสนุน','lh.card3.handle':'support@dacrypto.net','lh.note':'โดยทั่วไปตอบกลับภายใน <strong>1–2 ชั่วโมง</strong> ในเวลาทำการ',
      'footer.link.start':'เริ่มต้น','footer.link.calc':'คำนวณ','footer.link.contact':'ติดต่อ','footer.link.calc2':'คำนวณ',
      'footer.disclaimer':'<strong>ข้อจำกัดความรับผิดชอบ:</strong> เนื้อหานี้มีไว้เพื่อให้ข้อมูลและการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงิน การลงทุน crypto มีความเสี่ยงสูง','footer.copy2':'© 2026 DA NETWORK.',
    },
    ko: {
      'nav.cta':'지금 시작하기','nav.guide':'가이드','nav.calc':'수익 계산','nav.faq':'FAQ','nav.network':'DA Network','nav.privilege':'⭐ 특별 혜택',
      'hero.badge':'A–Z 완전 가이드 • 100% 무료','hero.title1':'수익 창출','hero.title2':'Crypto Affiliate','hero.title3':'처음부터 시작',
      'hero.sub':'초보자를 위한 종합적이고 이해하기 쉬운 가이드. 기초부터 실전 전략까지 — 단계별 예시와 함께.',
      'hero.cta1':'가이드 읽기','hero.cta2':'수익 계산',
      'snap.tag':'📊 네트워크 현황','snap.meta':'매월 1일 업데이트 · 확정 데이터','snap.partners':'활동 중인 파트너','snap.paid':'지난달 파트너에게 지급','snap.exchanges':'핵심 파트너 거래소',
      'snap.foot':'지급 수치는 DA Network가 지난달 파트너에게 실제 이체한 총 커미션으로, 출금 기록으로 검증됩니다.','snap.foot.link':'검증 방법 보기 →',
      'stats.active':'✓ 검증됨','stats.partners':'파트너','stats.partnerSub':'매월 1일 업데이트','stats.hint':'자세히 보기 →','stats.live':'✓ 확정됨','stats.commLabel':'지난달 지급된 커미션',
      'guide.tag':'완전 가이드','guide.title':'Crypto Affiliate란?','guide.sub':'A부터 Z까지 — 기초부터 실제 수익 창출까지 모두 배우기','guide.stepsTitle':'수익 창출을 위한 8단계 실전',
      'ec.title1':'Crypto Affiliate 마케팅이란?','ec.title2':'Crypto Affiliate 수익','ec.title3':'왜 DA Network를 선택해야 하나?',
      'calc.tag':'계산 도구','calc.title':'Affiliate 수익 계산기','calc.sub':'추천 수와 거래량을 기반으로 월 수익을 추산합니다.',
      'faq.tag':'자주 묻는 질문','faq.title':'FAQ',
      'dan.tag':'Affiliate 네트워크','dan.title':'DA Network 소개','dan.sub':'전문 암호화폐 affiliate 시스템 — 동남아시아 전역의 수백 명의 파트너와 세계 최고의 거래소를 연결합니다.',
      'dan.lb.title':'잘하고 있는 파트너','dan.fb.title':'실제 파트너 커미션',
      'dq.tag':'🔒 DA Network 파트너 전용','dq.title':'DA Network 멤버 특별 혜택','dq.sub':'<strong style="color:#ffd966">237명의 활동 파트너</strong>만 접근 가능합니다. 외부에서는 돈으로도 살 수 없는 것들입니다.',
      'dq.card1.title':'AI 트레이딩 봇 — 한국팀','dq.card2.title':'일일 마켓 플랜 채널','dq.card3.title':'독점 Finance Facts &amp; Quotes 채널',
      'dq.cta.strong':'위의 모든 혜택은 DA Network 파트너에게만 제공됩니다.','dq.cta.btn':'⚡ 가입하여 잠금 해제',
      'lh.tag':'지원','lh.title':'DA NETWORK 문의','lh.sub':'질문이 있거나 네트워크에 참여하고 싶으신가요? 팀이 24/7 대기 중입니다.',
      'footer.desc':'한국어 사용자를 위한 종합 암호화폐 affiliate 가이드.','footer.col1':'가이드','footer.col2':'도구','footer.col3':'DA NETWORK 소개','footer.copy':'© 2026 DA NETWORK. 모든 권리 보유.',
      'ec.h1':'Affiliate란?','ec.p1':'<strong>고유 링크</strong>를 통해 다른 사람들을 암호화폐 거래소에 추천합니다. 그들이 거래할 때 거래 수수료에서 커미션을 받습니다.','ec.hint1':'자세히 알아보기 →',
      'ec.h2':'얼마나 벌 수 있나요?','ec.p2':'커미션은 일반적으로 추천인의 <strong>거래 수수료의 20%–50%</strong>입니다. 일부 거래소는 평생 커미션을 지급합니다.','ec.hint2':'실제 예시 보기 →',
      'ec.h3':'주요 장점','ec.p3':'자본 불필요, 거래 경험 불필요. 패시브 인컴 — 잠자는 동안에도 수익.','ec.hint3':'모든 장점 보기 →',
      'guide.prev':'이전','guide.next':'다음','guide.compareTitle':'주요 Crypto Affiliate 거래소 비교','guide.viewAllDeals':'12개 거래소 모두 보기',
      'calc.inputTitle':'파라미터 입력','calc.lbl1':'월 추천 수','calc.unit.people':'명','calc.lbl2':'인당 평균 거래량 (USD/월)','calc.lbl3':'커미션 비율 (%)','calc.lbl4':'거래소 거래 수수료 (%)','calc.resultTitle':'예상 결과','calc.res1':'이번 달 수익','calc.res2':'연간 수익','calc.res3':'거래소 총 수수료','calc.res4':'인당 커미션','calc.note':'* 예상 수치. 실제 수익은 사용자 활동과 거래소 조건에 따라 다릅니다.',
      'dan.c1.title':'광범위한 커버리지','dan.c1.body':'베트남, 인도네시아, 필리핀에서 운영 중 — 237명 이상의 활동 파트너와 함께 동남아시아 전역으로 확장 중',
      'dan.c2.title':'최고 커미션','dan.c2.body':'최대 <strong class="gold-text">70%</strong> 커미션 비율 — 직접 가입보다 높고, DA Network가 각 거래소와 독점 협상',
      'dan.c3.title':'전면 지원','dan.c3.body':'24/7 관리자 지원, 리소스, 도구 및 모든 파트너를 위한 개인화된 성장 로드맵',
      'dan.c4.title':'지속 가능한 성장','dan.c4.body':'직접 추천인과 1단계 서브 어필리에이트로부터 커미션 공유 — 최대 2단계.',
      'wins.badge':'🎯 실제 이야기','wins.title':'실제 파트너, 실제 결과','wins.sub':'수익 순위표가 아닙니다. DA Network를 통해 트래픽을 구축하고 커미션을 받는 파트너들의 실제 이야기들입니다.','wins.note':'모든 이야기는 파트너의 동의를 받아 공유되었습니다. 결과는 채널, 트래픽 및 실행에 따라 다를 수 있습니다.','wins.note.link':'DA Network의 파트너 검증 방법 보기 →',
      'verify.badge':'🔍 투명성','verify.title':'DA Network의 수치 검증 방법','verify.sub':'가짜 스크린샷과 가짜 리더보드가 일상인 업계에서 — 여기서는 모든 수치가 실제임을 보장하는 방법입니다.',
      'verify.s1.title':'거래소 대시보드 데이터','verify.s1.body':'모든 파트너는 DA Network의 ref 링크 아래 등록됩니다. 관리자는 <strong>Binance, Ourbit, Bingx</strong> 대시보드에서 직접 pending/paid 커미션을 확인합니다.',
      'verify.s2.title':'출금 기록','verify.s2.body':'이 사이트의 "지급됨" 수치는 파트너 지갑/계정으로 <strong>성공적으로 이체된</strong> 커미션만 계산합니다.',
      'verify.s3.title':'파트너 동의','verify.s3.body':'공개적으로 표시된 모든 이야기, 인용문, 개인 통계는 <strong>동의를 받아</strong> 공유됩니다. 언제든지 정보 삭제를 요청할 수 있습니다 — 48시간 내 처리.',
      'verify.cta.text':'수치가 출금 내역과 맞지 않는다고 생각하시나요? 특정 파트너 케이스 스터디에 대한 자세한 내용이 필요하신가요?','verify.cta.btn':'📩 관리자에게 문의',
      'dan.lb.badge':'🎯 실제 이야기','dan.lb.sub':'월간 스냅샷 · DA Network 데이터','dan.lb.h.channel':'채널','dan.lb.h.earn':'커미션/월','dan.lb.h.rate':'비율','dan.lb.note':'* 파트너 동의와 데이터 투명성은 DA Network의 약속입니다.',
      'dan.fb.badge':'📸 실제 증거','dan.fb.sub':'커미션 확인 스크린샷 — 네트워크 파트너로부터 지속적으로 업데이트됨','dan.fb.ph1':'이미지 준비 중','dan.fb.ph2':'파트너가 피드백 스크린샷을 관리자에게 제출하여 여기에 표시됩니다',
      'dan.cta.text':'DA Network에 가입하고 커미션을 받을 준비가 되셨나요?','dan.cta.btn':'지금 시작하기',
      'dq.badge.limited':'✓ 엄선된 파트너','dq.card1.body':'커뮤니티를 설득하지 마세요. 이 링크를 보내세요.','dq.card2.body':'전문 트레이더들의 <strong>일일 마켓 플랜 업데이트</strong>. 다른 사람들보다 먼저 시장 방향을 파악하세요.','dq.card3.body':'부자들이 절대 공개적으로 말하지 않는 <strong>금융 진실</strong>과 <strong>삶의 철학</strong>을 공유하는 비공개 채널.','dq.card.details':'자세히 보기','dq.cta.sub':'가입 — 24–48시간 내 답변.','dash.point1':'DA NETWORK의 <strong>독점 트레이딩 봇</strong> 사용 기회','dash.point2':'봇의 <strong>투명한 성과</strong>를 보여주는 signal tracking 웹사이트','dash.btn':'대시보드 열기 →','dash.disclaimer':'과거 성과는 미래 결과를 보장하지 않습니다. 이 콘텐츠는 투자 조언이 아닙니다.',
      'popup.bot.badge':'🔥 독점 · 파트너 전용','popup.bot.title':'AI 트레이딩 봇 — 한국팀','popup.bot.lead':'95%의 트레이더가 감정 트레이딩으로 손실을 보는 동안 — 당신은 24/7 작동하는 기계를 갖게 됩니다. 잠도 안 자고, 두려움도 없고, FOMO도 없습니다.',
      'popup.bot.f1.title':'한국 트레이딩팀 개발','popup.bot.f1.body':'아시아 시장에서 5년 이상의 경험을 가진 전문 트레이더팀','popup.bot.f2.title':'라이브 대시보드 데이터','popup.bot.f2.body':'실시간 거래 데이터 — tracking dashboard에서 확인하세요.','popup.bot.f3.title':'100% 자동화 — 모니터링 불필요','popup.bot.f3.body':'24/7 운영, 자동 진입, 자동 익절, 자동 손절. 자본만 예치하면 됩니다.','popup.bot.f4.title':'DA Network 파트너 전용 바우처','popup.bot.f4.body':'시장 대여 가격은 월 최대 $200 — 독점 파트너 바우처를 통해 무료로 이용 가능.',
      'popup.bot.alert':'✓ <strong>우수 파트너를 위한 바우처.</strong> 장기적으로 성장하겠다고 약속하는 파트너에게 리소스가 전달될 수 있도록 각 파트너를 검토합니다.','popup.bot.cta':'🔓 가입하여 바우처 받기','popup.bot.note':'무료 가입 · 확인 즉시 수령',
      'popup.mkt.badge':'🟢 매일 업데이트 · 독점','popup.mkt.title':'일일 마켓 플랜 채널','popup.mkt.lead':'수백만 명이 정보 과부하 속에서 Twitter를 스크롤하는 동안 — 당신은 매일 아침 7시에 깔끔하고 명확한 플랜을 받습니다.',
      'popup.mkt.f1.title':'매일 오전 7:00 마켓 플랜','popup.mkt.f1.body':'트렌드 분석, 지지/저항 구간, 당일 우선 거래 쌍','popup.mkt.f2.title':'매크로 + 온체인 분석','popup.mkt.f2.body':'온체인 데이터, 집계된 심리, 글로벌 거시 금융 영향','popup.mkt.f3.title':'구체적인 트레이딩 셋업','popup.mkt.f3.body':'명확한 진입, SL, TP — 읽고 결정만 하면 됩니다. 자체 분석 불필요','popup.mkt.f4.title':'실시간 시장 알림','popup.mkt.f4.body':'큰 움직임 발생 시 즉시 알림 — 시장의 90%보다 먼저 행동',
      'popup.mkt.alert':'📊 정보를 먼저 얻는 사람이 <strong>더 많이 법니다</strong>. 이 채널은 파트너 전용입니다.','popup.mkt.cta':'🔓 가입하여 채널 접근','popup.mkt.note':'무료 · DA Network 파트너 전용',
      'popup.facts.badge':'💎 독점 · 판매 없음','popup.facts.title':'독점 Facts &amp; Quotes 채널','popup.facts.lead':'진짜 부자들이 돈에 대해 이해하는 것 — 하지만 절대 공개적으로 말하지 않는 것. 이제 그것이 당신의 것입니다.',
      'popup.facts.f1.title':'학교에서 가르치지 않는 금융 진실','popup.facts.f1.body':'부자들이 돈, 위험, 투자, 재정적 자유에 대해 어떻게 생각하는지','popup.facts.f2.title':'CEO, 투자자, 억만장자들의 명언','popup.facts.f2.body':'진정한 재정적 자유를 달성한 사람들로부터 증류된 삶의 철학','popup.facts.f3.title':'엘리트 라이프스타일 — 부자들의 마인드셋','popup.facts.f3.body':'그들이 시간, 관계, 건강, 기회를 어떻게 보는지 — 99%와 다른 점','popup.facts.f4.title':'정기 업데이트 — 스팸 없음','popup.facts.f4.body':'모든 포스트는 집중된 인사이트 — 2분 읽기로 하루의 사고방식이 바뀜',
      'popup.facts.alert':'✨ 이 채널에는 유료 버전이 없습니다. <strong>DA Network 파트너</strong>만 입장 가능 — 완전 무료.','popup.facts.cta':'🔓 가입하여 채널 접근','popup.facts.note':'완전 무료 · 파트너이기만 하면 됩니다',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'커뮤니티 그룹','lh.card2.handle':'DA NETWORK Telegram Group','lh.card3.title':'지원 이메일','lh.card3.handle':'support@dacrypto.net','lh.note':'일반적으로 업무 시간 내 <strong>1–2시간</strong> 내 답변.',
      'footer.link.start':'시작하기','footer.link.calc':'계산기','footer.link.contact':'문의','footer.link.calc2':'계산기',
      'footer.disclaimer':'<strong>면책조항:</strong> 콘텐츠는 정보 및 교육 목적으로만 제공됩니다. 재무 조언이 아닙니다. 암호화폐 투자에는 높은 위험이 따릅니다.','footer.copy2':'© 2026 DA NETWORK.',
    },
    id: {
      'nav.cta':'Mulai Sekarang','nav.guide':'Panduan','nav.calc':'Kalkulator','nav.faq':'FAQ','nav.network':'DA Network','nav.privilege':'⭐ Keistimewaan',
      'hero.badge':'Panduan A–Z Lengkap • 100% Gratis','hero.title1':'Hasilkan Uang Dengan','hero.title2':'Crypto Affiliate','hero.title3':'Dari Nol',
      'hero.sub':'Panduan komprehensif dan mudah dipahami untuk pemula. Dari dasar hingga strategi nyata — dengan contoh langkah demi langkah.',
      'hero.cta1':'Baca Panduan','hero.cta2':'Hitung Penghasilan',
      'snap.tag':'📊 SNAPSHOT JARINGAN','snap.meta':'Diperbarui setiap tanggal 1 · Data yang sudah dikonfirmasi','snap.partners':'Mitra aktif','snap.paid':'Dibayarkan ke mitra bulan lalu','snap.exchanges':'Bursa mitra utama',
      'snap.foot':'Angka "Dibayar" menunjukkan total komisi yang benar-benar ditransfer DA Network ke mitra bulan lalu, diverifikasi melalui catatan penarikan.','snap.foot.link':'Lihat cara kami memverifikasi →',
      'stats.active':'✓ TERVERIFIKASI','stats.partners':'MITRA','stats.partnerSub':'Diperbarui setiap tanggal 1','stats.hint':'Ketuk untuk detail →','stats.live':'✓ DIKONFIRMASI','stats.commLabel':'KOMISI YANG DIBAYARKAN BULAN LALU',
      'guide.tag':'Panduan Lengkap','guide.title':'Apa itu Crypto Affiliate?','guide.sub':'Pelajari dari A sampai Z — dari dasar hingga menghasilkan pendapatan nyata.','guide.stepsTitle':'8 Langkah Praktis untuk Mulai Menghasilkan',
      'ec.title1':'Apa itu Crypto Affiliate Marketing?','ec.title2':'Pendapatan dari Crypto Affiliate','ec.title3':'Mengapa Memilih DA Network?',
      'calc.tag':'Alat Perhitungan','calc.title':'Kalkulator Pendapatan Affiliate','calc.sub':'Perkirakan penghasilan bulanan berdasarkan jumlah referral dan volume perdagangan.',
      'faq.tag':'Pertanyaan yang Sering Diajukan','faq.title':'FAQ',
      'dan.tag':'Jaringan Affiliate','dan.title':'Tentang DA Network','dan.sub':'Sistem crypto affiliate profesional — menghubungkan ratusan mitra di seluruh Asia Tenggara dengan bursa global terkemuka.',
      'dan.lb.title':'Mitra yang Berprestasi','dan.fb.title':'Komisi Mitra Nyata',
      'dq.tag':'🔒 Eksklusif untuk Mitra DA Network','dq.title':'Keistimewaan Anggota DA Network','dq.sub':'Hanya <strong style="color:#ffd966">237 mitra aktif</strong> yang memiliki akses. Hal-hal yang tidak bisa dibeli di luar.',
      'dq.card1.title':'AI Trading Bot — Tim Korea','dq.card2.title':'Saluran Update Rencana Pasar Harian','dq.card3.title':'Saluran Eksklusif Finance Facts &amp; Quotes',
      'dq.cta.strong':'Semua keistimewaan di atas hanya untuk mitra DA Network.','dq.cta.btn':'⚡ Bergabung untuk Membuka',
      'lh.tag':'Dukungan','lh.title':'Hubungi DA NETWORK','lh.sub':'Ada pertanyaan atau ingin bergabung dengan jaringan? Tim kami tersedia 24/7.',
      'footer.desc':'Panduan crypto affiliate komprehensif untuk pengguna Bahasa Indonesia.','footer.col1':'Panduan','footer.col2':'Alat','footer.col3':'Tentang DA NETWORK','footer.copy':'© 2026 DA NETWORK. Semua hak dilindungi.',
      'ec.h1':'Apa itu Affiliate?','ec.p1':'Anda mereferensikan orang lain untuk mendaftar ke bursa crypto melalui <strong>link unik Anda</strong>. Ketika mereka berdagang, Anda mendapatkan komisi dari biaya perdagangan mereka.','ec.hint1':'Ketuk untuk pelajari lebih lanjut →',
      'ec.h2':'Berapa Banyak yang Bisa Anda Hasilkan?','ec.p2':'Komisi biasanya berkisar dari <strong>20%–50% dari biaya perdagangan</strong>. Beberapa bursa membayar komisi seumur hidup.','ec.hint2':'Ketuk untuk melihat contoh nyata →',
      'ec.h3':'Keunggulan Utama','ec.p3':'Tidak perlu modal, tidak perlu pengalaman trading. Pendapatan pasif — hasilkan bahkan saat tidur.','ec.hint3':'Ketuk untuk melihat semua keunggulan →',
      'guide.prev':'Sebelumnya','guide.next':'Berikutnya','guide.compareTitle':'Perbandingan Bursa Crypto Affiliate Terbaik','guide.viewAllDeals':'Lihat Semua 12 Bursa',
      'calc.inputTitle':'Masukkan Parameter','calc.lbl1':'Referral per bulan','calc.unit.people':'orang','calc.lbl2':'Volume trading rata-rata per orang (USD/bulan)','calc.lbl3':'Tingkat komisi (%)','calc.lbl4':'Biaya trading bursa (%)','calc.resultTitle':'Perkiraan Hasil','calc.res1':'Pendapatan bulan ini','calc.res2':'Pendapatan tahunan','calc.res3':'Total biaya bursa','calc.res4':'Komisi per orang','calc.note':'* Perkiraan proyeksi. Pendapatan aktual tergantung pada aktivitas pengguna dan ketentuan bursa.',
      'dan.c1.title':'Jangkauan Luas','dan.c1.body':'Beroperasi di Vietnam, Indonesia, Filipina — dan berkembang di seluruh Asia Tenggara dengan 237+ mitra aktif.',
      'dan.c2.title':'Komisi Tertinggi','dan.c2.body':'Tingkat komisi hingga <strong class="gold-text">70%</strong> — lebih tinggi dari pendaftaran langsung, dinegosiasikan secara eksklusif oleh DA Network dengan setiap bursa.',
      'dan.c3.title':'Dukungan Penuh','dan.c3.body':'Dukungan admin 24/7 dengan sumber daya, alat, dan peta jalan pertumbuhan personal untuk setiap mitra.',
      'dan.c4.title':'Pertumbuhan Berkelanjutan','dan.c4.body':'Terima bagi komisi dari referral langsung dan sub-affiliate tingkat 1 — maksimal 2 tingkat.',
      'wins.badge':'🎯 KISAH NYATA','wins.title':'Mitra Nyata, Hasil Nyata','wins.sub':'Bukan papan peringkat pendapatan. Hanya beberapa kisah nyata dari mitra yang membangun traffic dan menghasilkan komisi melalui DA Network.','wins.note':'Semua kisah dibagikan dengan persetujuan mitra. Hasil bisa berbeda tergantung saluran, traffic, dan pelaksanaan.','wins.note.link':'Lihat cara DA Network memverifikasi mitra →',
      'verify.badge':'🔍 TRANSPARANSI','verify.title':'Cara DA Network Memverifikasi Angka','verify.sub':'Di industri di mana screenshot palsu dan leaderboard palsu sudah biasa — inilah cara kami memastikan setiap angka yang Anda lihat adalah nyata.',
      'verify.s1.title':'Data dari dashboard bursa','verify.s1.body':'Setiap mitra mendaftar di bawah link ref DA Network. Admin melihat komisi pending/paid langsung dari dashboard <strong>Binance, Ourbit, Bingx</strong>.',
      'verify.s2.title':'Catatan penarikan','verify.s2.body':'Angka "dibayar" di situs ini hanya menghitung komisi yang <strong>berhasil ditransfer</strong> ke dompet/akun mitra.',
      'verify.s3.title':'Persetujuan mitra','verify.s3.body':'Setiap kisah, kutipan, dan statistik pribadi yang ditampilkan secara publik <strong>dibagikan dengan persetujuan</strong>. Anda dapat meminta penghapusan informasi kapan saja — diproses dalam 48 jam.',
      'verify.cta.text':'Merasa angkanya tidak cocok dengan penarikan Anda? Ingin detail tentang studi kasus mitra tertentu?','verify.cta.btn':'📩 Hubungi admin',
      'dan.lb.badge':'🎯 KISAH NYATA','dan.lb.sub':'Snapshot bulanan · Data dari DA Network','dan.lb.h.channel':'Saluran','dan.lb.h.earn':'Komisi/Bulan','dan.lb.h.rate':'Tingkat','dan.lb.note':'* Persetujuan mitra dan transparansi data adalah komitmen DA Network.',
      'dan.fb.badge':'📸 BUKTI NYATA','dan.fb.sub':'Screenshot konfirmasi komisi — diperbarui terus dari mitra dalam jaringan.','dan.fb.ph1':'Gambar segera hadir','dan.fb.ph2':'Mitra mengirimkan screenshot feedback ke admin untuk ditampilkan di sini',
      'dan.cta.text':'Siap bergabung dengan DA Network dan mulai menghasilkan komisi?','dan.cta.btn':'Mulai Sekarang',
      'dq.badge.limited':'✓ Mitra terpilih','dq.card1.body':'Jangan meyakinkan komunitas Anda. Kirim mereka link ini.','dq.card2.body':'Update <strong>rencana pasar harian</strong> dari trader profesional. Ketahui arah pasar sebelum orang lain.','dq.card3.body':'Saluran pribadi berbagi <strong>kebenaran finansial</strong> dan <strong>filosofi hidup</strong> yang orang kaya tidak pernah katakan secara publik.','dq.card.details':'Lihat detail','dq.cta.sub':'Bergabung — kami merespons dalam 24–48 jam.','dash.point1':'Kesempatan menggunakan <strong>bot trading eksklusif</strong> DA NETWORK','dash.point2':'Website tracking signal dengan <strong>kinerja bot yang transparan</strong>','dash.btn':'Buka dashboard →','dash.disclaimer':'Kinerja masa lalu tidak menjamin hasil di masa depan. Konten ini bukan saran investasi.',
      'popup.bot.badge':'🔥 EKSKLUSIF · KHUSUS MITRA','popup.bot.title':'AI Trading Bot — Tim Korea','popup.bot.lead':'Sementara 95% trader merugi karena trading dengan emosi — Anda memiliki mesin yang bekerja 24/7, tidak tidur, tidak takut, tidak FOMO.',
      'popup.bot.f1.title':'Dikembangkan oleh Tim Trading Korea','popup.bot.f1.body':'Trader profesional dengan pengalaman 5+ tahun di pasar Asia','popup.bot.f2.title':'Data Live dari Dashboard','popup.bot.f2.body':'Data trading diperbarui real-time — lihat di tracking dashboard.','popup.bot.f3.title':'100% Otomatis — Tidak Perlu Pemantauan','popup.bot.f3.body':'Berjalan 24/7, otomatis masuk perdagangan, otomatis ambil keuntungan, otomatis potong kerugian. Cukup setor modal.','popup.bot.f4.title':'Voucher Eksklusif untuk Mitra DA Network','popup.bot.f4.body':'Harga sewa pasar hingga $200/bulan — dapatkan gratis melalui voucher mitra eksklusif.',
      'popup.bot.alert':'✓ <strong>Voucher untuk mitra berkualitas.</strong> Kami meninjau setiap mitra untuk memastikan sumber daya sampai ke orang yang berkomitmen membangun jangka panjang.','popup.bot.cta':'🔓 Bergabung untuk Klaim Voucher','popup.bot.note':'Daftar gratis · Terima langsung setelah konfirmasi',
      'popup.mkt.badge':'🟢 DIPERBARUI HARIAN · EKSKLUSIF','popup.mkt.title':'Saluran Update Rencana Pasar Harian','popup.mkt.lead':'Sementara jutaan orang scroll Twitter dilanda info berlebih — Anda menerima rencana yang bersih dan jelas setiap pagi pukul 7.',
      'popup.mkt.f1.title':'Rencana pasar setiap hari pukul 7:00','popup.mkt.f1.body':'Analisis tren, zona support/resistance, pair prioritas hari itu','popup.mkt.f2.title':'Analisis Macro + On-chain','popup.mkt.f2.body':'Data on-chain, sentimen agregat, dampak makro keuangan global','popup.mkt.f3.title':'Setup Perdagangan Spesifik','popup.mkt.f3.body':'Entry, SL, TP yang jelas — cukup baca dan putuskan. Tidak perlu analisis sendiri','popup.mkt.f4.title':'Peringatan Pasar Real-time','popup.mkt.f4.body':'Peringatan instan untuk pergerakan besar — bertindak sebelum 90% pasar',
      'popup.mkt.alert':'📊 Mereka yang mendapat informasi lebih awal <strong>menghasilkan lebih banyak</strong>. Saluran ini hanya untuk mitra.','popup.mkt.cta':'🔓 Bergabung untuk Akses Saluran','popup.mkt.note':'Gratis · Hanya mitra DA Network',
      'popup.facts.badge':'💎 EKSKLUSIF · TIDAK DIJUAL','popup.facts.title':'Saluran Eksklusif Facts &amp; Quotes','popup.facts.lead':'Apa yang benar-benar dipahami orang kaya tentang uang — tetapi tidak pernah diucapkan. Sekarang ini milik Anda.',
      'popup.facts.f1.title':'Kebenaran finansial yang tidak diajarkan sekolah','popup.facts.f1.body':'Bagaimana orang kaya benar-benar berpikir tentang uang, risiko, investasi, dan kebebasan finansial','popup.facts.f2.title':'Kutipan dari CEO, investor, miliarder','popup.facts.f2.body':'Filosofi hidup yang disarikan dari mereka yang telah mencapai kebebasan finansial sejati','popup.facts.f3.title':'Gaya hidup elite — mindset orang kaya','popup.facts.f3.body':'Bagaimana mereka melihat waktu, hubungan, kesehatan, dan peluang — berbeda dari 99% orang','popup.facts.f4.title':'Update rutin — tidak spam','popup.facts.f4.body':'Setiap postingan adalah wawasan terkonsentrasi — 2 menit membaca mengubah cara berpikir sepanjang hari',
      'popup.facts.alert':'✨ Saluran ini tidak memiliki versi berbayar. <strong>Hanya mitra DA Network</strong> yang masuk — sepenuhnya gratis.','popup.facts.cta':'🔓 Bergabung untuk Akses Saluran','popup.facts.note':'Sepenuhnya gratis · Cukup menjadi mitra',
      'lh.bd.title':'Business Development','lh.bd.handle':'@jacksondz','lh.card1.title':'Telegram Admin','lh.card1.handle':'@dacrypto_admin','lh.card2.title':'Grup Komunitas','lh.card2.handle':'DA NETWORK Telegram Group','lh.card3.title':'Email Dukungan','lh.card3.handle':'support@dacrypto.net','lh.note':'Biasanya merespons dalam <strong>1–2 jam</strong> selama jam kerja.',
      'footer.link.start':'Mulai','footer.link.calc':'Kalkulator','footer.link.contact':'Hubungi','footer.link.calc2':'Kalkulator',
      'footer.disclaimer':'<strong>Penafian:</strong> Konten hanya untuk tujuan informasi dan pendidikan. Bukan saran keuangan. Investasi crypto memiliki risiko tinggi.','footer.copy2':'© 2026 DA NETWORK.',
    },
  };

  var currentLang = 'vi';

  function applyLang(lang) {
    var t = translations[lang];
    if (!t) return;

    // Fade out
    document.body.classList.add('lang-switching');

    setTimeout(function() {
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
          el.innerHTML = t[key];
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
      renderComparison();
      renderFaqs();
    }, 180);
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
    if (window.renderPartnerWins) setTimeout(window.renderPartnerWins, 220);
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
    document.body.setAttribute('data-lang', currentLang);
    var lbl = document.getElementById('langCurrentLabel');
    if (lbl) lbl.textContent = 'VI';
  });

})();
