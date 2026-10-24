# Founder visibility checklist

Cursor built the SEO pages, docs quick start, sitemap, and GitHub discoverability.  
Website + docs **shipped with platform v1.7.73** (SEO landings live).  
**You** still own Search Console, LinkedIn, and YouTube below.

## 1. Deploy — done

Live (confirm after CloudFront/docs CI):

- https://www.autoconnecto.in/esp32-mqtt
- https://www.autoconnecto.in/use-cases
- https://www.autoconnecto.in/sitemap.xml
- https://docs.autoconnecto.in/guide/esp32-quickstart.html

## 2. Google Search Console (you)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add / verify (if not already):
   - `https://www.autoconnecto.in/`
   - `https://docs.autoconnecto.in/`
3. For the marketing property: **Sitemaps** → submit `https://www.autoconnecto.in/sitemap.xml`.
4. **URL inspection** → request indexing for:
   - `/esp32-mqtt`
   - `/shared-attributes`
   - `/ota-firmware`
   - `/for-system-integrators`
   - `/use-cases`
   - Docs: `…/guide/esp32-quickstart.html`
   - GitHub README: `https://github.com/autoconnecto/autoconnecto-sdk` (optional; Google crawls GitHub on its own)
5. Marketing property: verified. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set on the website GitHub Actions variables. `docs.autoconnecto.in` is a separate property. Search Console issued the same HTML tag; it is in the docs VitePress `head`. Click **Verify** on the docs property, then request indexing for `/guide/esp32-quickstart.html`.

## 3. LinkedIn (you — post as yourself)

Post one of these per week. Attach a real board or app screenshot. No competitor names.

**Post A — ESP32**

> We built Autoconnecto so an ESP32 can reach a live dashboard in India without you running the broker stack.
>
> Flash the Arduino SDK → device token in secrets.h → MQTT telemetry on the dashboard.
>
> Start: https://www.autoconnecto.in/esp32-mqtt  
> Docs: https://docs.autoconnecto.in/guide/esp32-quickstart.html

Live 24 Oct 2026:
- Profile: https://www.linkedin.com/feed/update/urn:li:activity:7519607054324432896/
- Showcase: https://www.linkedin.com/feed/update/urn:li:share:7519607555581509632?actorCompanyId=145223603

**Post B — Power cycle**

> After a power cut, operators should not re-click every switch.
>
> Shared attributes restore desired state; the device confirms with client attributes. The dashboard stays aligned with the hardware.
>
> https://www.autoconnecto.in/shared-attributes

Live 24 Oct 2026, with the real attributes image. LinkedIn shortens the link in the post to `lnkd.in/gtEu2ZjW`.
- Profile: https://www.linkedin.com/feed/update/urn:li:activity:7519623374717812736/
- Showcase: https://www.linkedin.com/feed/update/urn:li:share:7519623601655037952?actorCompanyId=145223603

**Post C — Integrators**

> For system integrators and EPCs: multi-site assets, device profiles, dashboards, alarms, INR plans, white-label on Growth and Enterprise.
>
> https://www.autoconnecto.in/for-system-integrators

Live 24 Oct 2026:
- Profile: https://www.linkedin.com/feed/update/urn:li:activity:7519670283738341376/
- Showcase: https://www.linkedin.com/feed/update/urn:li:share:7519670711741857792/?actorCompanyId=145223603

Organization `sameAs` includes the Autoconnecto IoT Platform showcase: `https://www.linkedin.com/showcase/145223603/`. That is the page the daily posts use. Live on www as of the website deploy on 24 Oct 2026.

## 4. YouTube proof loop (you)

One 2–3 minute clip. Script:

1. Show ESP32 + serial “connected”.
2. App Devices: online + a telemetry key changing.
3. Flip a Switch widget → board LED / relay reacts.
4. Unplug power → plug back → switch state restores without re-clicking.
5. End card: autoconnecto.in/esp32-mqtt and app signup.

Upload as **Unlisted** or **Public**. Then ask Cursor to wire the Presentations tab / lesson entry if you want it inside the product (YouTube replace stays your step per change management).

## 5. Directories (you — once each)

| Place | Action |
| --- | --- |
| Arduino Library Manager | Already via `library.properties` on the SDK repo; after next SDK tag, confirm search finds **AutoconnectoSDK**. |
| PlatformIO Registry | Already listed as autoconnecto/AutoconnectoSDK (automatic copy of 1.7.73). The next SDK tag (1.7.74) adds library.json. Install line: `lib_deps = autoconnecto/AutoconnectoSDK`. |
| Crunchbase / similar | Company profile: Autoconnecto, Jaipur, IoT platform, link www + app. |
| India tech / IoT listings | One listing each; same one-line: hosted IoT for plants and OEMs, ESP32 SDK, India. |
| Telegram | Point community pin to `/esp32-quickstart` docs after publish. |

## 6. What Cursor already did

- Marketing SEO landings + hub, footer/header links, sitemap, llms.txt / ai.txt
- Docs: ESP32 quick start in the customer guide menu
- Softened comparative wording on What is Autoconnecto
- GitHub SDK description, homepage, and topics (when API succeeds)
- Stronger `library.properties` sentence for Library Manager search
