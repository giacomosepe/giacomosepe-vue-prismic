# Multilingual Setup Guide

Your website now supports English (default) and Italian locales! Here's what has been configured and what you need to do in Prismic.

## What Was Done in Code

### 1. Installed Dependencies
- Added `@nuxtjs/i18n` module for internationalization

### 2. Nuxt Configuration (`nuxt.config.ts`)
- Added i18n module with English (en) and Italian (it) locales
- English is the default locale
- Strategy: `prefix_except_default` means:
  - English URLs: `/` and `/present-your-company`
  - Italian URLs: `/it` and `/it/present-your-company`

### 3. Updated Components
- **SiteHeader**: Added language switcher (EN/IT button in top right)
- All pages now fetch content based on the current locale
- All links use `localePath()` to maintain the correct language in URLs

### 4. Prismic Routes
- Updated to handle optional language parameter: `/:lang?/:uid`

## What You Need to Do in Prismic

### Step 1: Enable Italian Locale in Prismic

1. **Go to your Prismic repository** (https://your-repo.prismic.io)

2. **Navigate to Settings → Translations & locales**

3. **Add Italian locale:**
   - Click "Add a new locale"
   - Select: **Italian (it-it)**
   - Click "Add locale"

4. **Important:** Make sure English (en-us) is set as the **Master locale**

### Step 2: Create Italian Content

Once Italian is enabled, you'll see a language dropdown in the document editor:

#### For the Home Page:
1. Open your "home" document
2. In the top right, you'll see a language selector showing "en-us"
3. Click it and select "it-it (Italian)"
4. Click "Create new document" or "Translate"
5. Fill in all the Italian content:
   - Meta title
   - Sidebar image (can reuse the same image)
   - Sidebar title (translate to Italian)
   - Sidebar content (translate to Italian)
   - All Section slices (translate titles, copy, links)
   - All other slices

#### For "Present your company" Page:
1. Open your "present-your-company" page document
2. Switch to Italian locale (it-it)
3. Translate:
   - Title: "Present your company" → "Presenta la tua azienda" (or your preferred translation)
   - All rich text content
   - Form labels are hardcoded in the component (see below)

### Step 3: Translate Form Labels (Optional)

The contact form labels are currently hardcoded in English. To translate them:

1. Create a file: `app/i18n/locales/en.json`
   ```json
   {
     "form": {
       "title": "Get in Touch",
       "email": "Email",
       "name": "Name",
       "story": "Your Story",
       "storyPlaceholder": "Tell us about your company...",
       "submit": "Send Message",
       "submitting": "Sending...",
       "successMessage": "Thank you! Your message has been sent successfully.",
       "errorMessage": "Something went wrong. Please try again."
     }
   }
   ```

2. Create a file: `app/i18n/locales/it.json`
   ```json
   {
     "form": {
       "title": "Contattaci",
       "email": "Email",
       "name": "Nome",
       "story": "La Tua Storia",
       "storyPlaceholder": "Parlaci della tua azienda...",
       "submit": "Invia Messaggio",
       "submitting": "Invio in corso...",
       "successMessage": "Grazie! Il tuo messaggio è stato inviato con successo.",
       "errorMessage": "Qualcosa è andato storto. Riprova per favore."
     }
   }
   ```

3. Update `nuxt.config.ts` to include these files in the i18n config (let me know if you want help with this)

## How It Works

### URL Structure
- **English (default):**
  - Home: `https://yoursite.com/`
  - Contact: `https://yoursite.com/present-your-company`

- **Italian:**
  - Home: `https://yoursite.com/it`
  - Contact: `https://yoursite.com/it/present-your-company`

### Language Switcher
- Small button in the header showing the alternate language (EN or IT)
- Click to switch between languages
- Maintains the same page (home to home, contact to contact)
- Uses cookies to remember language preference

### Content Fetching
- Each page automatically fetches content in the current locale
- If Italian content doesn't exist, Prismic will fall back to English (master locale)

## Testing

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000` (English)
3. Click "IT" button in header
4. You'll be redirected to `http://localhost:3000/it` (Italian)
5. Content should show in Italian (once you've created it in Prismic)

## Troubleshooting

### "Document not found" error in Italian
- Make sure you've created the Italian version of the document in Prismic
- Check that the UID is the same for both languages

### Language switcher not showing
- Make sure both locales are properly configured in Prismic
- Check browser console for errors

### Content still in English when viewing Italian
- Verify you've published the Italian version in Prismic
- Clear your browser cache
- Check that you're fetching with `{ lang: locale.value }`

## Future Enhancements

If you want to add more languages later:
1. Add the locale to `nuxt.config.ts` in the i18n.locales array
2. Enable it in Prismic Settings → Translations & locales
3. Create content for that language in Prismic
4. The language switcher will automatically update

## Notes

- The form submissions will work in any language (Formspree receives the data regardless of language)
- SEO: Each language has its own URL, which is good for search engines
- The `strategy: 'prefix_except_default'` keeps English URLs clean without `/en` prefix
