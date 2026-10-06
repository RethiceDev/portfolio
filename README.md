# Portfolio Bosco Rethice — Next.js + Admin

## Déploiement Vercel
1. Pousse ce dossier sur GitHub, puis "Import Project" sur vercel.com.
2. Onglet **Storage** → **Create → Blob** → connecte-le au projet (ajoute BLOB_READ_WRITE_TOKEN automatiquement).
3. **Settings → Environment Variables** : ADMIN_PASSWORD et AUTH_SECRET (voir .env.example). Redéploie.
4. Mets ta photo dans `public/photo.jpg`.
5. Admin : `https://ton-site.vercel.app/admin`

## En local
`npm install` puis crée `.env.local` (avec aussi BLOB_READ_WRITE_TOKEN copié depuis Vercel) puis `npm run dev`.

Textes du CV / liens : `lib/data.js` (remplace le lien Facebook par ton URL exacte).
