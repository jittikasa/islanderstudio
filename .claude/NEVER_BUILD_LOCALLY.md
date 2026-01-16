# PROJECT RULES - READ THIS FIRST

## CRITICAL: NO LOCAL BUILDS

**NEVER run local development servers or builds. EVER.**

### Prohibited Commands:
- ❌ `npm run dev`
- ❌ `npm start`
- ❌ `vite`
- ❌ `yarn dev`
- ❌ Any localhost server

### Why:
User wants all testing done on LIVE deployment only.

### Deployment Process:
1. Make code changes
2. Commit to feature branch
3. Push to remote
4. Changes go live via Cloudflare Pages automatic deployment
5. Test on https://islanderstudio.app

### If You Need to Test:
- Push changes to the branch
- Wait for Cloudflare Pages deployment
- User tests on live site
- NO EXCEPTIONS

---

**This is not a suggestion. This is a hard rule.**
**Breaking this rule wastes the user's time.**
