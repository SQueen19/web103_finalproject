# TaskFlow

CodePath WEB103 Final Project

Designed and developed by: Sydelle Nyegamo and Ulykbek Khairulla

🔗 Link to deployed app: Not provided yet

## About

### Description and Purpose

TaskFlow is a full-stack web app that helps users stay organized by creating and managing projects and tasks. Each project includes customizable settings, while tasks can be sorted, filtered, and updated in real time.

Built with Express.js and PostgreSQL, TaskFlow’s backend supports full CRUD operations, automatic task generation for new projects, and robust data validation. The goal of the project is to make task management more efficient, clear, and collaborative.

##Important Note:
When downloading, importing reposiotry, make sure to opend the folder named TaskFlow and cd to the client folder to run. If needed write 'npm install' before runing.


### Inspiration

TaskFlow was inspired by tools like Trello and Notion, but reimagined as a custom-built full-stack app. The goal was to create a clean, minimal project manager that demonstrates database relationships, RESTful API design, and backend automation — while remaining practical for real-world use.

## Tech Stack

Frontend: Picoss.css, React, Context to an API, fetch request

Backend: Node.js and Express.js, PostgreSQL ,pg, dotenv 

## Features

### Full CRUD

Users can create, view, edit, and delete both projects and tasks.
Each action updates the database in real time through RESTful API endpoints.

[[gif goes here]](https://imgur.com/a/O7FOhQC)

### Relational Database Design

This structure models real collaborative workflows with role-based membership and per-project configurations.

https://imgur.com/a/O7FOhQC

### Data Generation - to be reviewed ✅

When a new project is created, TaskFlow automatically adds a few starter tasks such as:

“Welcome to TaskFlow”

“Invite teammates” - optional

“Set your first milestone”

This feature demonstrates backend event-based automation.

https://imgur.com/a/3tIdNfD

### Data validation and Error handling ✅

Before updates are saved, data is validated — for example:

Tasks cannot be created with a due date in the past.

Projects must have a title.
If invalid data is sent, the backend responds with clear error messages using custom Express middleware.

[[gif goes here]](https://imgur.com/a/O7FOhQC)

### Add Task

The frontend includes modals for adding or editing tasks, which appear as overlays on the same page.
This allows users to perform quick edits without losing context — a user-friendly single-page interaction.

[[gif goes here]](https://imgur.com/a/O7FOhQC)

### filtering and sorting ✅

Users can filter and sort tasks by:

Due date

Priority 

Status (Complete / Incomplete)
These operations occur client-side for responsiveness, with options to extend filtering to the backend via query parameters.

[[gif goes here]](https://imgur.com/a/O7FOhQC)

### [Name of Feature 3]

[short description goes here]

[gif goes he

### [ADDITIONAL FEATURES GO HERE - ADD ALL FEATURES HERE IN THE FORMAT ABOVE; you will check these off and add gifs as you complete them]

## Installation Instructions

[instructions go here]
