/* ═══════════════════════════════════════════════════════════════
   DA Affiliate — site configuration (single source of truth)

   Mirrors DA-ECOSYSTEM-V3.1-SHARED-SPEC.md §1, §2, §3 (ecosystem
   architecture, exchange registry, money terms) and
   DA-ECOSYSTEM-V3-SHARED-SPEC.md §1, §2, §3, §6, §7, §10
   — update there first, then this file.
   Future: a build step copies shared/ecosystem.json from the hub repo.

   Rules
   - Every number, URL, rate, contact and claim shown on the site comes
     from here. Renderers in app.js / deals.html read only this object.
   - Missing data is `null` → the UI shows a neutral state, never 0.
   - A metric is public only when
       value !== null && publish === true &&
       (verificationStatus === 'RECONCILED' || 'VERIFIED')
   - Legacy V2 figures are kept for the record with publish:false.
     They are NOT confirmed and must not be shown.
   - No Math.random / drifting / fake-live values anywhere.

   Loaded as a classic script before app.js (no build step on this site).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ─── §1 Brand names ──────────────────────────────────────────────
  var brand = {
    network:        { name: 'DA Network',         role: 'The parent organization connecting trading education, trader benefits, affiliate opportunities and public transparency.' },
    scalping:       { name: 'DA Scalping',        role: "DA's trading-signal and daily market-plan service, run on Telegram." },
    cashback:       { name: 'DA Cashback',        role: "DA Network's independent fee-rebate platform." },
    networkTraders: { name: 'DA Network for traders', role: 'Trader benefits on DA Network: daily market plans and trading signals, trader community, learning resources, direct team support and Volume Rewards.' },
    affiliate:      { name: 'DA Affiliate',       role: 'Fixed-commission arrangements for experienced, higher-volume traders, and partner development for people building trading communities.' },
    signalTracking: { name: 'DA Signal Tracking', role: "The public record of DA's published signals and the methodology used to measure them." }
  };

  // ─── §2 URLs ─────────────────────────────────────────────────────
  // Links to this site use `migrated ? planned : current`.
  // Migration plan: docs/DOMAIN-MIGRATION.md (no redirect is active).
  var site = {
    current: 'https://crypto.danetwork.asia',
    planned: 'https://affiliate.danetwork.asia',
    migrated: false
  };
  var urls = {
    network: 'https://danetwork.asia/en',   // locale paths: /en /vi /ko /th /id
    // V3.1: trader benefits (plans, signals, community, learning, support,
    // Volume Rewards) live on the hub Traders page, not on DA Cashback.
    networkTraders: 'https://danetwork.asia/en/traders',
    cashback: 'https://www.dacashback.asia/',
    signalTracking: 'https://signal.danetwork.asia/',
    telegramContact: 'https://t.me/jacksondz',
    site: site.migrated ? site.planned : site.current
  };

  // ─── Exchange registry — mirrors V3.1 spec §2 (update there first) ──
  // Two independent fields:
  //   partnershipStatus:  'active' | 'new_deal_pending' | 'paused'
  //   referralLinkStatus: 'available' | 'awaiting_update' | 'awaiting_link' | 'none'
  //   referralUrl:        string | null
  // A Register CTA renders ONLY when referralLinkStatus === 'available' AND
  // referralUrl starts with https:// (see canRegister()).
  // Bitunix / Ourbit links are byte-identical to the live site — do not edit.
  // BingX: partnership unchanged; its old link was withdrawn. When the owner
  // sends the new URL, set referralUrl and referralLinkStatus:'available' —
  // that is the only change needed.
  // OKX / PrimeXBT / Vantage: new deals being set up. No links, no rates and
  // no Volume Rewards are published for them. Vantage having a deal does not
  // activate Forex anywhere on this site.
  // market: 'crypto' | 'forex' | null (null → "To be confirmed"; never guessed).
  //
  // commissionTerms: one object per confirmed arrangement. Nothing has been
  // confirmed yet, so every field is null and verificationStatus is
  // NOT_AVAILABLE → the UI says "Terms confirmed per exchange".
  //
  // legacyAdvertised: the % shown on the V2 site (deals.html / app.js).
  // OWNER_REPORTED, publish:false. The V2 copy mixed exchanges, products and
  // bases (e.g. BingX 28% on deals vs 25/30/39% tiers in the step guide;
  // the 70% figures are forex revenue-share with no DA referral link).
  // Never show these as DA terms.
  function terms(exchangeId) {
    return [{
      exchangeId: exchangeId,
      product: null,            // e.g. 'USDT-M futures'
      calculationBasis: null,   // e.g. 'share of trading fees paid by referred account'
      tier: null,
      eligibility: null,
      effectiveFrom: null,      // ISO date
      effectiveTo: null,
      ratePct: null,
      verificationStatus: 'NOT_AVAILABLE',
      source: null,
      publish: false
    }];
  }
  function legacy(pct) {
    return { pct: pct, verificationStatus: 'OWNER_REPORTED', source: 'V2 site copy (deals.html)', publish: false };
  }
  function ex(id, name, market, partnershipStatus, referralLinkStatus, referralUrl, legacyPct) {
    return { id: id, name: name, market: market,
             partnershipStatus: partnershipStatus, referralLinkStatus: referralLinkStatus, referralUrl: referralUrl,
             commissionTerms: terms(id), legacyAdvertised: legacyPct === null ? null : legacy(legacyPct) };
  }
  var exchanges = [
    ex('bingx',    'BingX',    'crypto', 'active',           'awaiting_update', null, 28),
    ex('bitunix',  'Bitunix',  'crypto', 'active',           'available',       'https://www.bitunix.com/register?vipCode=Gw77', 33),
    ex('ourbit',   'Ourbit',   'crypto', 'active',           'available',       'https://www.ourbit.com/register?inviteCode=SY7QT9', 43),
    ex('binance',  'Binance',  'crypto', 'paused',           'none',            null, 31.5),
    ex('okx',      'OKX',      'crypto', 'new_deal_pending', 'awaiting_link',   null, 35),
    ex('bybit',    'Bybit',    'crypto', 'paused',           'none',            null, 35),
    ex('mexc',     'MEXC',     'crypto', 'paused',           'none',            null, 35),
    ex('bitget',   'Bitget',   'crypto', 'paused',           'none',            null, 35),
    ex('gate',     'Gate.io',  'crypto', 'paused',           'none',            null, 42),
    ex('kucoin',   'KuCoin',   'crypto', 'paused',           'none',            null, 42),
    ex('primexbt', 'PrimeXBT', null,     'new_deal_pending', 'awaiting_link',   null, null), // market: owner to confirm
    ex('exness',   'Exness',   'forex',  'paused',           'none',            null, 70),
    ex('vantage',  'Vantage',  'forex',  'new_deal_pending', 'awaiting_link',   null, 70),
    ex('xm',       'XM',       'forex',  'paused',           'none',            null, 70)
  ];
  // Public labels (EN) — V3.1 spec §2. Never "Coming soon"; never a '#' href.
  var partnershipStatusLabels = {
    active: 'Partner',
    new_deal_pending: 'New partner · setup in progress',
    paused: 'Partnership paused'
  };
  var referralLinkStatusLabels = {
    available: 'Register',                        // rendered as a button
    awaiting_update: 'Registration link updating',
    awaiting_link: 'Registration link coming',
    none: null                                    // no CTA, no text
  };
  var marketLabels = { crypto: 'Crypto', forex: 'Forex' };
  var marketUnknownLabel = 'To be confirmed';

  // ─── §3 Partner metrics ──────────────────────────────────────────
  // Shape: { id, label, value, unit, verificationStatus, reportingPeriod,
  //          source, lastUpdated, publish }
  // All publish:false today → every tile shows "Awaiting verified data".
  var partnerMetrics = [
    { id: 'totalPartners', label: 'Total partners', value: 237, unit: 'partners',
      verificationStatus: 'OWNER_REPORTED', reportingPeriod: null, source: 'V2 site copy', lastUpdated: null, publish: false,
      note: 'V2 labelled 237 both "Active partners" and "Total partners in the network". No date or definition.' },
    { id: 'activePartners', label: 'Active partners', value: null, unit: 'partners',
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false,
      note: 'Needs a definition of "active" (e.g. ≥1 referred trade in the period).' },
    { id: 'partnersEarningCommission', label: 'Partners earning commission', value: null, unit: 'partners',
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false },
    // Money terms (V3.1 spec §3): received / paid / retained are separate
    // metrics, never summed into "revenue". paymentState: 'accrued' |
    // 'approved' | 'paid' — states are never mixed in one figure.
    { id: 'commissionReceived', label: 'Partner commission received from exchanges', value: null, unit: 'USD',
      moneyTerm: 'Partner Commission', paymentState: null,
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false,
      note: 'What DA earns from exchange partner programmes.' },
    { id: 'commissionPaid', label: 'Affiliate commission paid to DA Affiliate partners', value: 28540, unit: 'USD',
      moneyTerm: 'Affiliate Commission Paid', paymentState: null,
      verificationStatus: 'OWNER_REPORTED', reportingPeriod: null, source: 'V2 site copy ("paid to partners last month")', lastUpdated: null, publish: false,
      note: 'Month never stated; the V2 page never updated. Publish only with an as-of month and reconciliation evidence.' },
    { id: 'retainedCommission', label: 'Retained commission (after distributions)', value: null, unit: 'USD',
      moneyTerm: 'Retained Commission', paymentState: null,
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false,
      note: 'What DA keeps after all distributions (affiliate commission paid, Volume Rewards, cashback), per the approved reconciliation method — owner to define. Same period as the other money terms.' },
    { id: 'markets', label: 'Geographic markets', value: 'Vietnam, Indonesia, Philippines', unit: 'markets',
      verificationStatus: 'OWNER_REPORTED', reportingPeriod: null, source: 'V2 site copy', lastUpdated: null, publish: false,
      note: 'Conflicts with the hub "Partner network" list (VN/KR/TH/ID). Owner to choose one list.' },
    { id: 'retentionRate', label: 'Retention rate', value: '~62%', unit: '% of partners active ≥ 3 months',
      verificationStatus: 'OWNER_REPORTED', reportingPeriod: null, source: 'V2 site copy', lastUpdated: null, publish: false },
    { id: 'timeToFirstCommission', label: 'Time to first commission', value: null, unit: 'weeks',
      verificationStatus: 'OWNER_ESTIMATE', reportingPeriod: null, source: null, lastUpdated: null, publish: false,
      neverDisplay: true,
      legacyEstimates: [
        { value: '4–8 weeks', source: 'V2 DA Crypto stat modal', verificationStatus: 'OWNER_ESTIMATE' },
        { value: '~6 weeks', source: 'owner discussion', verificationStatus: 'OWNER_ESTIMATE' },
        { value: '48 weeks', source: 'hub copy, suspected typo', verificationStatus: 'OWNER_ESTIMATE' }
      ],
      note: 'Estimate only. Never shown as a KPI (spec §3).' }
  ];

  // ─── §10 Contact ─────────────────────────────────────────────────
  var contact = {
    telegram: { handle: '@jacksondz', url: urls.telegramContact, role: 'Business development and partner enquiries' },
    supportEmail: null,          // support@dacrypto.net does NOT resolve (NXDOMAIN) — owner to confirm a working mailbox
    supportResponseTime: null,   // V2 said "1–2 hours" and "24/7" — unconfirmed
    supportHours: null
  };

  // ─── §6 Perks — inactive in public copy until eligibility is confirmed ─
  var perks = {
    tradingBot:  { enabled: false, title: null, description: null, note: 'V2 "exclusive trading bot" — existence/eligibility unconfirmed.' },
    planMarket:  { enabled: false, title: null, description: null, note: 'V2 "Plan Market" channel — eligibility unconfirmed.' },
    factsQuotes: { enabled: false, title: null, description: null, note: 'V2 "Facts & Quotes" channel — eligibility unconfirmed.' }
  };

  // ─── Partner stories & proof — shown only with written consent ───
  // Story shape: { name, channel, exchange, quote, period, amount, consent:true, consentRef }
  var partnerStories = [];
  // The V2 proof screenshots stay in /proof but are not rendered until the
  // owner confirms written consent, the account owner and the period.
  function proof(file, exchange, period, legacyCaption) {
    return { file: file, exchange: exchange, period: period, legacyCaption: legacyCaption,
             source: 'V2 proof gallery', consent: false, publish: false };
  }
  var proofImages = [
    proof('proof/proof-1.jpg', 'Ourbit',  '2025-12', '$3,358.35 · 100 users'),
    proof('proof/proof-2.jpg', 'Ourbit',  '2026-02', '$5,397.16 · 32 new users'),
    proof('proof/proof-3.jpg', 'BingX',   '2025-11', '$2,018.88 · direct commission'),
    proof('proof/proof-4.jpg', 'BingX',   '2026-01', '$566.62 · vol $5.3M · 23 traders'),
    proof('proof/proof-5.jpg', 'BingX',   '2026-02', '$936.83 · vol $8.8M · 32 traders'),
    proof('proof/proof-6.jpg', 'Binance', '2025-12', '$1,063.04 · USDT & inverse'),
    proof('proof/proof-7.jpg', 'Binance', '2025-09/10', '$704.06 · USDT & inverse')
  ];

  // ─── Calculator — illustrative inputs only ───────────────────────
  // These are slider starting points, NOT DA terms and NOT typical-user
  // figures. Commission % per exchange comes from commissionTerms[].ratePct
  // when publishable; otherwise the user's own input is used.
  var calculator = {
    defaults: { referredTraders: 10, monthlyVolumeUsd: 300000, feePct: 0.10, commissionPct: 30 },
    ranges: {
      referredTraders: { min: 1, max: 200, step: 1 },
      monthlyVolumeUsd: { min: 100000, max: 5000000, step: 10000 },
      feePct: { min: 0.02, max: 0.20, step: 0.01 },
      commissionPct: { min: 5, max: 50, step: 1 }
    },
    months: 12
  };

  // ─── §7 Disclaimers (exact EN text) ──────────────────────────────
  var disclaimers = {
    MARKET: 'For information only, not financial advice. Trading crypto and stocks carries a risk of loss. Do your own research before making any decision.',
    AFFILIATE: 'Affiliate earnings depend on your effort, audience size and market conditions. Any examples illustrate how commissions work and are not a promise of results.',
    SIGNAL: 'Past performance does not guarantee future results. Performance figures, if shown, come from our public tracking at https://signal.danetwork.asia/. Every trading decision is your own.',
    RATES: "Rates and reward tiers may change according to each exchange's policy and partner program.",
    CALCULATOR: 'Illustrative estimate — not guaranteed earnings.'
  };

  // ─── Helpers (pure, no side effects) ─────────────────────────────
  function isPublishable(m) {
    return !!m && m.value !== null && m.value !== undefined && m.publish === true && !m.neverDisplay &&
      (m.verificationStatus === 'RECONCILED' || m.verificationStatus === 'VERIFIED');
  }
  function publishedRate(exchange) {
    var t = (exchange.commissionTerms || []).filter(function (x) {
      return x.ratePct !== null && x.publish === true &&
        (x.verificationStatus === 'RECONCILED' || x.verificationStatus === 'VERIFIED');
    })[0];
    return t || null;
  }
  function canRegister(e) {
    return !!e && e.referralLinkStatus === 'available' &&
      typeof e.referralUrl === 'string' && e.referralUrl.indexOf('https://') === 0;
  }
  function marketLabel(e) {
    return (e && e.market && marketLabels[e.market]) || marketUnknownLabel;
  }
  function partnershipLabel(e) { return (e && partnershipStatusLabels[e.partnershipStatus]) || ''; }
  // Text shown in place of a CTA; null when there is a Register button or
  // nothing to say ('none', or 'available' with a malformed URL).
  function linkStateLabel(e) {
    if (!e || e.referralLinkStatus === 'available') return null;
    return referralLinkStatusLabels[e.referralLinkStatus] || null;
  }
  function names(filterFn) {
    return exchanges.filter(filterFn).map(function (e) { return e.name; });
  }
  // Derived counts — never hardcoded anywhere.
  function counts() {
    var c = { total: exchanges.length, active: 0, newDealPending: 0, paused: 0,
              registerOpen: 0, linkUpdating: 0, linkComing: 0 };
    exchanges.forEach(function (e) {
      if (e.partnershipStatus === 'active') c.active++;
      else if (e.partnershipStatus === 'new_deal_pending') c.newDealPending++;
      else if (e.partnershipStatus === 'paused') c.paused++;
      if (canRegister(e)) c.registerOpen++;
      else if (e.referralLinkStatus === 'awaiting_update') c.linkUpdating++;
      else if (e.referralLinkStatus === 'awaiting_link') c.linkComing++;
    });
    return c;
  }

  var config = {
    brand: brand, site: site, urls: urls,
    exchanges: exchanges, partnershipStatusLabels: partnershipStatusLabels,
    referralLinkStatusLabels: referralLinkStatusLabels, marketLabels: marketLabels, marketUnknownLabel: marketUnknownLabel,
    partnerMetrics: partnerMetrics, contact: contact, perks: perks,
    partnerStories: partnerStories, proofImages: proofImages,
    calculator: calculator, disclaimers: disclaimers,
    isPublishable: isPublishable, publishedRate: publishedRate, counts: counts,
    canRegister: canRegister, marketLabel: marketLabel, partnershipLabel: partnershipLabel,
    linkStateLabel: linkStateLabel, names: names
  };

  window.DA_CONFIG = config;
})();
