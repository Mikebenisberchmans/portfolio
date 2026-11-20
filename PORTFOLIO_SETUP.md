# Mike Benis B portfolio: what changed and how to apply it

This zip is an overlay for your cloned `reactjs18-3d-portfolio` folder. It only contains
files that were added or changed, so your 3D models, textures and hero background stay as they are.

## Apply
1. Extract the zip into the root of your clone and overwrite when asked.
2. Delete `src/components/sections/Feedbacks.tsx` (the old testimonials, now replaced by `Certificates.tsx`).
   You can also delete `src/assets/carrent.png`, `jobit.png` and `tripguide.png`; nothing uses them now.
3. `npm install` (no new packages) then `npm run dev`.

## Things you need to do
- **Contact form:** messages go to mikebenisberchmans@gmail.com through FormSubmit. Send one test message from the
  site, open the "Activate Form" email FormSubmit sends to that Gmail (check spam), and click Activate. After that every
  message arrives in your inbox. The email address is set once in `src/constants/config.ts`.
- **LinkedIn link:** you gave `linkedin.com/in/mike-beni`, but your resume links to `linkedin.com/in/mike-benis`.
  Check which one opens your profile and fix `config.socials.linkedin` in `src/constants/config.ts` if needed.
- **Certificates:** add the four pictures to `public/certificates/` (see the README there).
- **Project images:** the cards use generated cover art in `src/assets/projects/`. Replace any with a real screenshot
  by importing it in `src/assets/index.ts`.

## Where things live
- Text, links, nav labels: `src/constants/config.ts`
- Skills, experience, certificates, papers, projects: `src/constants/index.ts`
- Skill balls: `src/components/sections/Tech.tsx` and `src/components/canvas/Ball.tsx`
- New sections: `Certificates.tsx`, `Research.tsx`
