# Autonomy fork status

This branch is a work in progress, not a release or an installed replacement.
The local developer handoff is
`~/.openmausbot/handoffs/autonomy-verification-2026-11-08/DEVELOPER-HANDOFF.md`.
It is a local data artifact and may not exist on another machine.

The branch contains fork packaging safeguards, resume and profile prompt
corrections, and explicit notification of truncated assignment results.
It does not contain the mission completion gate, authenticated review,
durable mission state, safe recovery coordinator, mission accounting, durable
research appendix, or legacy-agent lifecycle required by the handoff. The
acceptance tests A01–A35 and release rehearsal have not been completed. Do not
represent prompt instructions as enforcement or install this branch as a
replacement on the basis of its targeted tests.

The fork packaging configuration targets a separate app identity and workspace
and omits the official update feed and protocol registration. The normal macOS
universal helper build failed in the initial environment because the installed
Command Line Tools lacked x86_64 Swift compatibility libraries. An unsigned
arm64-only inspection bundle was produced with a manually staged helper; that
bundle predates the final metadata safeguard and is not a release artifact.
The final packaged app, migration, permissions, and rollback remain unverified.
