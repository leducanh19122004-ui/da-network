# DA Affiliate domain migration plan

**From:** `https://crypto.danetwork.asia` (live today, formerly "DA Crypto")
**To:** `https://affiliate.danetwork.asia` (planned)
**Status:** NOT STARTED. Nothing in this repository activates a redirect. `data/config.js` keeps `site.migrated: false`, and the canonical URL, Open Graph tags, `robots.txt` and `sitemap.xml` all point at the current domain.

Source of truth for the URLs: `DA-ECOSYSTEM-V3-SHARED-SPEC.md` §2 (update it there first).

## Preconditions

- The owner approves the switch date.
- The V3 English copy is approved. Non-English locales are still mixed V2/V3 and should be translated or hidden before launch.
- You have access to the Vercel project that serves `crypto.danetwork.asia` and to the DNS zone for `danetwork.asia`.

## Steps

1. **Add the domain in Vercel.** Project → Settings → Domains → add `affiliate.danetwork.asia`. Create the DNS record Vercel asks for (normally `CNAME affiliate → cname.vercel-dns.com`). Keep `crypto.danetwork.asia` attached to the same project.
2. **Wait for the certificate.** Vercel issues the TLS certificate automatically once DNS resolves. Check that `https://affiliate.danetwork.asia/` serves the site with a valid certificate *before* adding any redirect.
3. **Add the 308 redirect.** Add the snippet below to `vercel.json` (create the file if it does not exist). It applies only to requests whose host is `crypto.danetwork.asia`. It keeps the path, and Vercel carries the query string through by default, so referral and UTM parameters survive. 308 is permanent and keeps the request method.

   ```json
   {
     "redirects": [
       {
         "source": "/:path*",
         "has": [{ "type": "host", "value": "crypto.danetwork.asia" }],
         "destination": "https://affiliate.danetwork.asia/:path*",
         "permanent": true
       }
     ]
   }
   ```

   (`"permanent": true` makes Vercel answer with 308.) Do **not** add this snippet until steps 1–2 are done; it is intentionally not in `vercel.json` today.
4. **Switch the config.** In `data/config.js`, set `site.migrated: true`. `urls.site` then resolves to `site.planned`.
5. **Update the SEO files to the new host:**
   - `<link rel="canonical">`, `og:url`, `og:image` and `twitter:image` in `index.html` and `deals.html`
   - `robots.txt` (the `Sitemap:` line)
   - `sitemap.xml` (`<loc>` values and `<lastmod>`)
6. **Update links on the other three sites** so they point at the new domain directly instead of going through the redirect:
   - DA Network hub (`danetwork.asia`): the "For partners" / Earn / Products links to DA Affiliate
   - DA Cashback (`www.dacashback.asia`): the comparison-block CTA "Trading at higher volume? See DA Affiliate →" and any footer link
   - DA Signal Tracking (`signal.danetwork.asia`): any ecosystem/footer link
   - Social profiles and Telegram pinned messages that mention `crypto.danetwork.asia`
7. **Google Search Console.**
   - Verify the `affiliate.danetwork.asia` property (or rely on the `danetwork.asia` domain property).
   - Submit the new `sitemap.xml`.
   - With the 308 redirect live, run **Settings → Change of address** from `crypto.danetwork.asia` to `affiliate.danetwork.asia`. (Google only offers this tool when both hosts are verified. If it is not offered for a subdomain move, the 308 redirect plus canonical tags do the job on their own.)
8. **Verify after the switch:**
   - `curl -sI "https://crypto.danetwork.asia/deals.html?utm_source=test"` returns `308` with `location: https://affiliate.danetwork.asia/deals.html?utm_source=test`.
   - `https://affiliate.danetwork.asia/robots.txt` and `/sitemap.xml` show the new host.
   - The view-source canonical on both pages shows the new host.
   - The three referral links (BingX, Bitunix, Ourbit) are unchanged, byte for byte.
9. **Keep the old domain redirecting for at least 12 months.** Do not detach `crypto.danetwork.asia` from the Vercel project or delete its DNS record during that time. Old social posts, partner channels and search results keep working through the redirect.

## Rollback

Remove the `redirects` entry from `vercel.json`, set `site.migrated: false`, and restore the canonical, OG, robots and sitemap values to `crypto.danetwork.asia`. Both domains can stay attached while you do this.

## Related (not part of this change)

The spec also plans `da-signal-tracking.vercel.app/* → signal.danetwork.asia/*` (308). That redirect belongs to the Signal Tracking project, not this one.
