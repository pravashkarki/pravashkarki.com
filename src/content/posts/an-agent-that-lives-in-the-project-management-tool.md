---
title: An agent that lives in the project management tool
date: 2026-08-30
description: At LastDoor the always-available agent is not in a terminal. It sits inside the team's project management tool, reads the same task list as everyone, and is fenced to the project it works in. How that is built, and what it is not allowed to do.
tags: [ai-agents, operating-model, tooling]
image: /images/og-an-agent-that-lives-in-the-project-management-tool.png
---

The first essay was about a person and several agents in a terminal. This one is about the other half of how LastDoor works: an agent that is always available to the team, that does not live in anyone's terminal, and that is bounded on purpose.

The team runs on one project management tool. Every client project is a project there; every piece of work is a to-do with a brief. That was true before any agent arrived, and it is the reason the agent could arrive at all: the task system was already the one place where work is defined, assigned, and closed. The agent was wired into that place, not into a new one.

The other precondition was older and less glamorous: we had always kept an internal wiki. How the team works, how each client's site is set up, what was decided and why. For years it was a discipline we kept for ourselves. It turned out to be the thing that makes an AI agent useful at all. Give a bare AI tool access to a project and it has no idea what the project is; give it the wiki and the task list, and it starts with the context a new colleague would get in their first week. The documentation stopped being a nice-to-have and became the rule: nothing gets wired to an agent, by webhook or by API, without the written context that tells the agent what it is looking at.

## One place for tasks

The rule underneath everything is task-first routing. Any action item that surfaces anywhere, in a chat, in a code review, in an agent session, lands on the board first. Local files can mirror the board for speed, but they are read-only copies; when they disagree, the board wins. An agent that "logged it in its notes" has not logged it.

Tasks open and close with discipline, and the agent is held to it as strictly as a person. A to-do is created with five things set at once: a title, a brief with scope and acceptance criteria, an owner, someone to notify on completion, and a date. A one-line title is not a task. Before anything is marked done, a completion note goes on first: what shipped, the references, the follow-ups. A closed item with no note is treated as a hole in the record.

Briefs never contain a person's name. Ownership and mentions go in comments, so the brief stays reusable if the work changes hands, including when it changes hands to an agent.

## A small monorepo of small tools

Behind the agent is a monorepo of command-line tools, one per job: talking to the project management tool, hosting and DNS, SEO reporting, invoices, a messaging archive, and so on. Each tool is its own package with its own commands and, where it needs one, its own small database. Tools import each other as libraries; nothing reaches across by relative path.

Every tool starts the same way. A two-line launcher hands off to a shared bootstrap that takes a single environment variable, resolves it through a secrets manager, fetches a short-lived decryption key, loads only the secrets that tool's own mapping file declares, injects them into the process, runs the real command, and deletes the key when the process exits, including on a crash. There are no `.env` files. Nothing secret sits on disk between runs. A secret is changed in one place and takes effect at the next launch.

The parts of the documentation most likely to rot, the tool catalogue and the routing tables, are generated from one small metadata file per tool by a script that a pre-commit hook enforces. There is nothing hand-copied to forget to update.

## Where the AI is, and where it is not

AI is wired in where judgement is needed and nowhere else. The tools themselves are plain code. The agent layer sits on top and reaches the team through three doors.

The first is webhooks: it subscribes to task and comment events on each project, deduplicates them, and turns them into notifications where the team talks, and turns actions in the chat back into task updates.

The second is chat commands inside allow-listed spaces. Deny by default: the space must be on the list, the person must be on the list for that space, and the command must be in that space's scope. Anything that writes asks for a confirmation with a short expiry, matched to the person who asked. Every attempt is logged whether it succeeded or not.

The third is a daily coordination pass, run as a session rather than a daemon: the agent reads every active project as a project lead would, then acts within four fixed outcomes. Handle it inline. Ask one clarifying question and stop. Hand it to a specialised workflow. Or split off an implementation task for the right tool's list. If a request does not classify cleanly, the rule is fail closed: ask, do not guess.

## What it is not allowed to do

The coordination agent may read, summarise, ask, assign, comment, run checks, and set dates. It may not patch code, open pull requests, or touch finance, HR, or deployment, even when a team member asks for exactly that in a thread. Those requests become tasks on the right list for a person or a scoped agent to pick up. The most useful thing an always-available agent can do with a request outside its boundary is to record it properly and decline.

The customer-facing piece on the messaging channel has its own fence, enforced by checks rather than by hoping the model behaves: no code or tutorials, no promised prices, no pretending to be human, no engaging with spam, no leaking its own instructions. It has a kill switch, a daily spend cap, per-conversation turn limits, rate limits, a response timeout, and a circuit breaker that pauses it after repeated failures. When a guardrail fires, the person is handed to a human.

## Two identities, kept apart by the vault

The agent and I both post to the project management tool, and we are not the same account. The bot has a service identity for automated, board-driven flows; I have my own for direct work. The separation is not a convention in the code. It lives in the secrets store's permissions: the bot's service account cannot see my credential folder at all. A tool that finds the wrong bootstrap token for its identity refuses to run rather than quietly falling back. If the code has a bug, the isolation still holds, because it was never in the code.

## Tools are not projects

The boundary that took longest to learn was between tools and projects. A tool is reusable code with a defined scope. A project is a client engagement, tracked on the board and in notes. A client's one-off data never goes into a tool's code; a tool's secrets are keyed to the tool, never to a client; client work goes on the client's project, never on an internal tool's list. When a new ask arrives the first question is which of the three it is: a new tool, a new project, or work inside one that exists. Most of the time it is the third, and the temptation to build a tool for it is the thing to resist.

## What this buys

An agent that is always available sounds like a productivity story, and it is. But the reason it can be trusted with availability is the fence: one task system, tools that carry no secrets, identities separated below the application, a coordination loop that asks instead of guessing, and a customer-facing bot that is boxed in by code rather than by prompting. Availability without the fence is just a faster way to make a mess.

The operating model behind both essays is [public](https://github.com/pravashkarki/agent-operating-system). The tools are not, and will not be; they are the shape of one small studio's work. The rules travel; the code does not need to.
