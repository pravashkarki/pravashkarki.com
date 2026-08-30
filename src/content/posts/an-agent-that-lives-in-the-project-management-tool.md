---
title: An agent that lives in the project management tool
date: 2026-08-30
description: At LastDoor the always-available agent is not in a terminal. It sits inside the team's project management tool, reads the same task list as everyone, and is fenced to the project it works in. How that is built, and what it is not allowed to do.
tags: [ai-agents, operating-model, tooling]
image: /images/og-an-agent-that-lives-in-the-project-management-tool.png
---

At [LastDoor](https://lastdoorsolutions.com), the studio I founded and which its CEO runs day to day, the team's agent lives in the project management system, not in a terminal. It is always available, it reads the same task list as everyone else, and it is bounded on purpose: an always-available agent is only safe because of the fence around it, and most of this essay is about the fence. This is a story about agents and humans working in the same system, not about agents replacing anyone. In [An operating system for a team of one](/posts/an-operating-system-for-a-team-of-one/) I wrote about one person and several agents at a keyboard, on my own time; this is the team's half, and the rules I wrote for it are the same ones I work by.

The team runs on one project management tool. Every client project is a project there; every piece of work is a to-do with a brief. That was true before any agent arrived, and it is the reason the agent could arrive at all: the task system was already the one place where work is defined, assigned, and closed. The agent was wired into that place, not into a new one.

The second precondition was an existing internal wiki. How the team works, how each client's site is set up, what was decided and why. For years it was a discipline we kept for ourselves. It turned out to be the thing that made the agent useful here. Give a bare AI tool access to a project and it has no idea what the project is; give it the wiki and the task list, and it can read a task against the project's documented history and constraints. The documentation stopped being a nice-to-have and became the rule: nothing gets wired to an agent, by webhook or by API, without the written context that tells the agent what it is looking at.

## One place for tasks

There is a human reason the agent lives in the task system and not in a chat window. Working with an agent in a terminal or a chat is fast, and fast is often overwhelming: replies arrive faster than a person can read, understand, and decide. A to-do with a comment on it has a gap built in. The agent writes, the person reads when they are ready, thinks, and answers. That gap is where understanding happens, and the system is designed to keep it.

The rule underneath everything is task-first routing. Any action item that surfaces anywhere, in a chat, in a code review, in an agent session, lands on the board first. Local files can mirror the board for speed, but they are read-only copies; when they disagree, the board wins. An agent that "logged it in its notes" has not logged it.

Tasks open and close with discipline, and the agent is held to it as strictly as a person. A to-do is created with five things set at once: a title, a brief with scope and acceptance criteria, an owner, someone to notify on completion, and a date. A one-line title is not a task. Before anything is marked done, a completion note goes on first: what shipped, the references, the follow-ups. A closed item with no note is treated as a hole in the record.

Briefs never contain a person's name. Ownership and mentions go in comments, so the brief stays reusable if the work changes hands, including when it changes hands to an agent.

## A small monorepo of small tools

Behind the agent is a monorepo of small command-line tools, one per job: the project system, hosting, reporting, billing, communications. Each is its own package with its own commands and, where it needs one, its own small database.

Every tool starts the same way, and the property that matters is this: a tool receives only the secrets it has declared, at runtime, and retains none of them between runs. There are no `.env` files. A secret is changed in one place and takes effect at the next launch.

The parts of the documentation most likely to rot, the tool catalogue and the routing tables, are generated from one small metadata file per tool by a script that a pre-commit hook enforces. There is nothing hand-copied to forget to update.

## Where the AI is, and where it is not

AI is wired in where judgement is needed and nowhere else. The tools themselves are plain code. The agent layer sits on top and meets the team in three ways.

The first is webhooks: it subscribes to task and comment events on each project, deduplicates them, and turns them into notifications where the team talks, and turns actions in the chat back into task updates.

The second is chat commands inside allow-listed spaces. Deny by default: the space, the person, and the command must each be allow-listed for that space. Anything that writes asks for a confirmation with a short expiry, matched to the person who asked. Every attempt is logged whether it succeeded or not.

The third is a daily coordination pass, run as a session rather than a daemon: the agent checks every active project against a fixed coordination checklist, then acts within four fixed outcomes. Handle it inline. Ask one clarifying question and stop. Hand it to a specialised workflow. Or split off an implementation task for the right tool's list. If a request does not classify cleanly, the rule is fail closed: ask, do not guess.

## What it is not allowed to do

The coordination agent may read, summarise, ask, assign, comment, run checks, and set dates. It may not patch code, open pull requests, or touch finance, HR, or deployment, even when a team member asks for exactly that in a thread. Those requests become tasks on the right list for a person or a scoped agent to pick up. Outside its boundary, the agent records the request and declines.

The customer-facing piece on the messaging channel has its own fence, enforced by checks rather than by hoping the model behaves: no code or tutorials, no promised prices, no pretending to be human, no engaging with spam, no leaking its own instructions. It has a kill switch and a daily spend cap; it will only say so much per conversation and per person; it times out rather than rambling; and after repeated failures a circuit breaker pauses it. None of that is a prompt. It is code, and when any of it fires, the person is handed to a human.

## Two identities, kept apart by the vault

The agent and I both post to the project management tool, and we are not the same account. The bot has a service identity for automated, board-driven flows; I have my own for direct work. The separation is not a convention in the code. It lives in the secrets store's permissions: the bot's service account cannot see my credential folder at all. A tool that finds the wrong bootstrap token for its identity refuses to run rather than quietly falling back. A mistake in the application code cannot grant the bot a credential its service account is not permitted to read, because the boundary was never in the code.

## Tools are not projects

One more line that took longest to learn: a tool is reusable code with a defined scope; a project is a client engagement, tracked on the board and in notes. A client's data never goes into a tool's code, a tool's secrets are keyed to the tool and never to a client, and client work goes on the client's project. When a new ask arrives, the first question is whether it is a new tool, a new project, or work inside one that exists. It is almost always the third.

## What this buys

An agent that is always available sounds like a productivity story, and it is. But the reason it can be trusted with availability is the fence: one task system, tools that retain no secrets between runs, identities separated below the application, a coordination loop that asks instead of guessing, and a customer-facing bot that is boxed in by code rather than by prompting. Availability without the fence is just a faster way to make a mess.

The operating model behind both pieces, the [Agent Operating System](/products/#agent-operating-system-2026), is [public](https://github.com/pravashkarki/agent-operating-system). The implementation is the shape of one small studio's work. The rules travel; the code does not need to.
