/* ═══════════════════════════════════════════════════════════════
   DA Affiliate — site configuration (single source of truth)

   Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §1, §2, §3, §4, §6, §7, §10
   — update the spec first, then this file.
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
    cashback:       { name: 'DA Cashback',        role: 'The trader membership: volume-milestone fee rewards plus a daily plan, member community, learning and support.' },
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
    cashback: 'https://www.dacashback.asia/',
    signalTracking: 'https://signal.danetwork.asia/',
    telegramContact: 'https://t.me/jacksondz',
    site: site.migrated ? site.planned : site.current
  };

  // ─── §4 Exchanges ────────────────────────────────────────────────
  // status: 'available' → "Available" · 'paused' → "Partnership paused".
  // Only `available` exchanges get onboarding links.
  // Referral links are byte-identical to the live V2 site — do not edit.
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
  var exchanges = [
    { id: 'bingx',   name: 'BingX',   market: 'crypto', status: 'available', referralUrl: 'https://bingxdao.com/invite/JXQSZO/',               commissionTerms: terms('bingx'),   legacyAdvertised: legacy(28) },
    { id: 'bitunix', name: 'Bitunix', market: 'crypto', status: 'available', referralUrl: 'https://www.bitunix.com/register?vipCode=Gw77',     commissionTerms: terms('bitunix'), legacyAdvertised: legacy(33) },
    { id: 'ourbit',  name: 'Ourbit',  market: 'crypto', status: 'available', referralUrl: 'https://www.ourbit.com/register?inviteCode=SY7QT9', commissionTerms: terms('ourbit'),  legacyAdvertised: legacy(43) },
    { id: 'binance', name: 'Binance', market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('binance'), legacyAdvertised: legacy(31.5) },
    { id: 'okx',     name: 'OKX',     market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('okx'),     legacyAdvertised: legacy(35) },
    { id: 'bybit',   name: 'Bybit',   market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('bybit'),   legacyAdvertised: legacy(35) },
    { id: 'mexc',    name: 'MEXC',    market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('mexc'),    legacyAdvertised: legacy(35) },
    { id: 'bitget',  name: 'Bitget',  market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('bitget'),  legacyAdvertised: legacy(35) },
    { id: 'gate',    name: 'Gate.io', market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('gate'),    legacyAdvertised: legacy(42) },
    { id: 'kucoin',  name: 'KuCoin',  market: 'crypto', status: 'paused', referralUrl: null, commissionTerms: terms('kucoin'),  legacyAdvertised: legacy(42) },
    { id: 'exness',  name: 'Exness',  market: 'forex',  status: 'paused', referralUrl: null, commissionTerms: terms('exness'),  legacyAdvertised: legacy(70) },
    { id: 'vantage', name: 'Vantage', market: 'forex',  status: 'paused', referralUrl: null, commissionTerms: terms('vantage'), legacyAdvertised: legacy(70) },
    { id: 'xm',      name: 'XM',      market: 'forex',  status: 'paused', referralUrl: null, commissionTerms: terms('xm'),      legacyAdvertised: legacy(70) }
  ];
  var exchangeStatusLabels = { available: 'Available', paused: 'Partnership paused' };
  var marketLabels = { crypto: 'Crypto', forex: 'Forex' };

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
    { id: 'commissionReceived', label: 'Commission received from exchanges', value: null, unit: 'USD',
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false },
    { id: 'commissionPaid', label: 'Commission paid to partners', value: 28540, unit: 'USD',
      verificationStatus: 'OWNER_REPORTED', reportingPeriod: null, source: 'V2 site copy ("paid to partners last month")', lastUpdated: null, publish: false,
      note: 'Month never stated; the V2 page never updated. Publish only with an as-of month and reconciliation evidence.' },
    { id: 'retainedCommission', label: 'Retained commission', value: null, unit: 'USD',
      verificationStatus: 'NOT_AVAILABLE', reportingPeriod: null, source: null, lastUpdated: null, publish: false,
      note: 'Commission received from exchanges minus commission paid to partners, same period.' },
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
  function counts() {
    var c = { total: exchanges.length, available: 0, paused: 0 };
    exchanges.forEach(function (e) { c[e.status] = (c[e.status] || 0) + 1; });
    return c;
  }

  var config = {
    brand: brand, site: site, urls: urls,
    exchanges: exchanges, exchangeStatusLabels: exchangeStatusLabels, marketLabels: marketLabels,
    partnerMetrics: partnerMetrics, contact: contact, perks: perks,
    partnerStories: partnerStories, proofImages: proofImages,
    calculator: calculator, disclaimers: disclaimers,
    isPublishable: isPublishable, publishedRate: publishedRate, counts: counts
  };

  window.DA_CONFIG = config;
})();
