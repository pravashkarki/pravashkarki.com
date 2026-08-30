---
title: The void has a process
date: 2026-04-26
description: "We cleaned a compromised WordPress site and it was reinfected within a day. Two failures: trusting a tool with a question it was never built to answer, and treating incident response as finished once our own site was clean."
tags: [security, wordpress, incident-response]
image: /images/og-the-void-has-a-process.png
---

We cleaned a compromised WordPress site this week. Then it got reinfected within 24 hours.

The original breach was from 2020. A vulnerable plugin gave attackers remote code execution. They planted a cryptominer and left. Or so we thought.

## The first failure

What they actually left behind were 18 PHP files scattered across WordPress core directories. Each one sat inside a random numbered folder, something like `wp-includes/fonts/449548/index.php`, looking like something WordPress had put there. Each one fetched code from external servers and executed it silently: a persistent remote access layer that survived for ten months without anyone noticing.

We ran the standard cleanup. Verified core checksums. Everything came back clean.

The problem is that the checksum command only validates the files WordPress ships. It has no concept of files that should not exist. The 18 backdoors sat untouched. Within hours the attacker used them to re-compromise the site. The root `index.php` was rewritten to fetch and execute attacker-controlled code on every page load. Every visitor was now running whatever the attacker decided to serve.

That was the first failure: trusting a tool to answer a question it was never designed to answer.

## The second failure

The second failure was subtler. For years we treated incident response as a technical problem. Find the bad files, remove them, harden the configuration, move on. The site is clean, the client is happy, the invoice is sent.

But the attacker's infrastructure was still live. Code-hosting repositories serving payloads. Domains serving malicious code behind a CDN. All of it still running, still compromising other sites that had not found their backdoors yet.

Fixing your own site and walking away is like removing a tick and leaving the nest. You solved your problem. You did nothing about the problem.

## Following the trail

So we traced back. Commit emails on the repositories. Domain registration records. Encoder metadata in the PHP with an email address in it. Webshell author names embedded in the code. None of it guarantees an arrest; the actors are almost certainly overseas and unreachable. That is not the point.

We reported the repositories to the code host. Reported the command-and-control domains to the CDN. Requested access logs from the hosting provider. Filed a report with the national cyber security centre of the country the site is in. It took about thirty minutes in total.

The fix protected one site. The reports might protect the next one.

## Feeding the ecosystem

Most people in this industry skip the reporting. We know, because we used to be among them. The site is clean, the client does not care about attribution, and nobody is paying you to file abuse reports. It feels like shouting into a void.

But the void has a process. Code hosts take down malware repositories. CDNs terminate accounts. National CERT teams coordinate takedowns across borders. The ecosystem works, but only if someone feeds it.

The attacker left a trail. The least we can do is make sure someone follows it.
