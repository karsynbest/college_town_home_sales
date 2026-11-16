# Agent log

Add a dated entry each time you work with your AI coding agent, with the newest entry at the bottom. Each entry records what you asked the agent, what it produced, and what you checked or changed. Paste your key prompts in exactly as you typed them. Include at least one time the agent got something wrong, and how you caught it.

Copy this outline for each entry:

```markdown
## YYYY-MM-DD: What you worked on

- **Asked:** "Paste your prompt here."
- **Agent produced:** What it made or changed.
- **Checked or changed:** How you checked it, and what you fixed.
```

## 2026-11-15: College Town Home Sales dashboard

- **Asked (original prompt):**

  > Read AGENTS.md and docs/data_description_sheet.md first. 
  >
  > I want to turn the placeholder page into a dashboard called “College Town Home Sales.” Use data/college_town_home_sales.csv to show the median sale price and number of sales for each city. Include the state names too so cities don’t get mixed up. 
  >
  > Leave out sales under $10,000 and add a note on the page explaining that. Round prices to whole dollars. 
  >
  > Keep the design clean and easy to read, and make sure it works on phones too. Use HTML, CSS, and JavaScript. 
  >
  > Don’t change the original dataset files. Add what we did to AGENT_LOG.md, check that the numbers and page work, and explain the changes so I can review them. Don’t publish the website or make the repository public yet.

- **Asked (plan approval):** "yes, go ahead with the plan. let me review the page when you’re done."
- **Agent produced:** Replaced the placeholder with a responsive city table and dataset overview. Added styles.css and dashboard.js. The page reads the CSV directly, groups by city and state, shows full state names, and computes medians and counts using only sale prices of $10,000 or more. Included methodology, source citation, loading and error messages. No framework, build step, or third-party dependency was added.
- **Checked or changed:** Independent Python csv/statistics calculations matched JavaScript for all 18 cities: 35,402 included sales across 11 states, with 40 sales excluded. Verified the exact $10,000 boundary, odd/even medians, distinct states for identically named cities, and quoted CSV fields. Playwright with Chromium verified all rendered city figures and full state names, whole-dollar formatting (including Pittsboro's $876,985.50 median displayed as $876,986), totals, and the failed-data message. Checked desktop (1280px), phone (390px), and small phone (320px) layouts for horizontal overflow; inspected the phone screenshot. No JavaScript page errors occurred. Original dataset files and publication workflow remain unchanged. Nothing was published and repository visibility was not changed. User review is pending; no user-reported mistake or correction has occurred in this dashboard task.

## 2026-11-15: Fresh pastel dashboard palette

- **Asked:**

  > Pull the latest main and read AGENTS.md first.
  >
  > Can you update the dashboard’s colors using this palette? Use Sparkling Frost (#DDECF1) for the background, Perfect Pear (#F3EEB6) for the summary and notes sections, and Peppermint (#AED9C5) for the table header. Use the other greens for subtle accents and alternating table rows.
  >
  > Keep the text dark forest green so it’s easy to read. I want it to feel fresh and cute without being too busy.
  >
  > Keep the data, calculations, wording, and layout the same. Update AGENT_LOG.md and show me desktop and phone previews before committing anything.

- **Agent produced:** Pulled latest main and read AGENTS.md. Updated only styles.css colors: the three requested exact palette values, forest-green text, muted green borders and accents, and pale green alternating rows. Saved desktop and phone screenshots for review.
- **Checked or changed:** Chromium checks confirmed the exact requested background colors and identical rendered text and element positions/sizes before and after at 1280px, 390px, and 320px. No horizontal overflow or JavaScript page errors. Inspected desktop and phone screenshots. Data files, dashboard.js, index.html, calculations, and wording remain unchanged. Changes are uncommitted for user review; nothing was pushed or published.
