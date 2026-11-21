# Seed Legacy toolkit update (NOT yet deployed)

Target app: seed-legacy-6jwb0t

Deployment is blocked: AppDeploy free-tier daily credit limit. New deployments resume at
2026-10-30 00:00 UTC (= 01:00 Nigeria time, 30 Oct 2026), or sooner if you upgrade.

Files
- Toolkit.tsx  -> new file src/Toolkit.tsx
- toolkit.css  -> new file src/toolkit.css
- app-edits.json -> exact text replacements for src/App.tsx and src/index.css
  (wires in <Toolkit/>, removes the old toolkit block, "Explore the demo" link,
  the "demonstration toolkit" phrase on the Impact page, and every demo-* CSS rule)

To finish: message Claude after 01:00 and ask it to deploy these to seed-legacy-6jwb0t.

Tested locally in Chromium (desktop 1280px, mobile 375px): 66 checks passed, 0 failed.
Not yet tested: the full live site (other pages) after deployment.
