# NWBL Eyes Agent

The NWBL Eyes Agent is a GitHub Actions + Playwright visual QA agent.

## What it does

When triggered, it opens the deployed website, captures screenshots, checks for obvious visual/code leaks, and uploads the screenshots as a GitHub Actions artifact.

## Screenshot output

The workflow uploads an artifact named:

```text
nwbl-eyes-agent-screenshots
```

The artifact contains:

```text
screenshots/desktop-home-full.png
screenshots/mobile-home-full.png
screenshots/mobile-hero-viewport.png
screenshots/desktop-hero-viewport.png
```

## Automatic triggers

The workflow supports:

```text
repository_dispatch: vercel.deployment.success
deployment_status: success
```

If Vercel sends deployment events to GitHub, the agent can run after a successful deployment.

## Manual trigger

Go to:

```text
GitHub → Actions → NWBL Eyes Agent → Run workflow
```

Enter the URL to screenshot, for example:

```text
https://nwbl-eco-2.vercel.app
```

## QA checks included

The agent checks for:

- raw code/data leaks on the public page
- broken images
- failed network requests
- browser console errors

## Notes

This agent does not change website code. It only inspects the live deployed site and produces screenshots for visual review.
