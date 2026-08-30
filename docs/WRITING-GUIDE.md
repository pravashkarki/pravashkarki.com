# Writing guide for pravashkarki.com

This is how essays and pages on the site are written and reviewed. It is for me first, and for any agent that drafts or edits here.

## What an essay is

An essay is my perspective on a way of doing things. It is not a tutorial, a listicle, or a manifesto. It shows how something was done and why, from inside the work, so a reader can take the idea and make their own version. The how-to lives elsewhere (the AOS repo, the products). If a draft starts giving steps, it has drifted.

Every essay has one core story: one sentence the whole piece exists to make true. Write that sentence first. If a paragraph does not serve it, cut the paragraph.

## Voice

- First person, plain, direct. Say what happened and what I think about it.
- Specific over impressive. A number, a file name, a named failure beats an adjective every time.
- Name the problem before the answer. The reader has to feel the gap before the fix means anything.
- Confident, not defensive. State facts once and let the reader draw the line. Never explain what something is not, pre-empt a suspicion, or apologise for existing.
- Honest about failure. The sections that show something going wrong and being put right are the ones readers trust.

## Structure

- Opening: the claim or the incident in the first two sentences. No warm-up.
- Sections with headings that say something ("Where the agent stops", not "Boundaries"). A short marigold rule above each heading is automatic.
- One idea per paragraph. No paragraph over 70 words. Sentences short enough to hear.
- Lists only when the content is a list. A list of principles is fine; a list of steps is a tutorial.
- Closing: one line that stands on its own. No summary, no call to action, no "in conclusion".
- Length: 600 to 1,400 words. Cut before adding.

## Banned

- Em dashes and en dashes. Use a colon, a comma, a full stop, or parentheses.
- Hedges: I think, perhaps, obviously, in my opinion, to be clear, just.
- Rhetorical questions and exclamation marks.
- Defensive framing of any kind: full time, working hours, side work, evenings and weekends, on my own time, unrelated to, not identified, "this is not about".
- Personal health or neurodiversity details.
- Client names, hostnames, internal IDs, secret names, incident forensics. Third-party team tools stay generic ("the project management tool", "the messaging channel") unless naming them is deliberate. LastDoor, Highstep, Mano, Claude Code and Codex may be named.
- Company-type suffixes (Pvt Ltd, Inc.).
- Invented facts, numbers or anecdotes. If it did not happen, it is not in the essay.
- "First essay", "second essay". Essays are dated when they were written and stand alone.

## Pages

- Home: one headline that is a claim, the trust line of credentials with the current role first, Essays, then 2026 products only.
- About: a person, in five or six short paragraphs, plus Press and talks, Elsewhere, and the obfuscated email. Never a CV.
- CV: the record, in CV sections, with links to every company and credential that has a public page.
- Products: everything ever shipped, dated, with the publisher named and archive links where the original is gone.
- Contact is always `kpravash [at] gmail [dot] com`, never a mailto.

## Process

1. Draft in `src/content/posts/<slug>.md` with `draft: true`. Drafts are excluded from the build, the feeds, and the raw-Markdown copy.
2. Run the sweep: no dashes, no banned phrases, no paragraph over 70 words.
3. Pair review with two outside models (DeepSeek and GPT via opencode) using `review/ESSAY-PROMPT.md`; apply what holds.
4. Read it once as a Highstep colleague would. Keep any fact that protects me; cut any sentence that only defends me.
5. Draw the social card (1200 by 630, paper background, mark, dhaka strip) and set `image:` in the frontmatter.
6. Remove `draft: true`, commit with `[build]` in the message, push. Vercel deploys; confirm the page and the `.md` URL are live.

## Reference points

Demand Curve's story-system lessons carry over in three ideas: one core story repeated everywhere; specificity over adjectives; name the problem before the answer. The rest of that material is funnel and ad copy and does not belong here.
