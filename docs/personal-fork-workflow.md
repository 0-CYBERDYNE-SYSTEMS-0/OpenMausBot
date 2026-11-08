# Personal fork workflow

This checkout is intended to carry local OpenMausBot changes on top of the
official project. The installed official app and the working data are not a
development sandbox. The fork is `0-CYBERDYNE-SYSTEMS-0/OpenMausBot`; the
upstream project is `milind-soni/OpenMausBot`. Verify remotes with
`git remote -v` before fetching or pushing. In the initial checkout, `origin`
is upstream and `fork` is the personal fork; this may differ in other clones.
Never push personal changes to upstream without explicit authorization.

## Updating

1. Inspect the current branch and working tree. Preserve unrelated changes and
   record the current commit. Fetch the desired upstream branch or release;
   for this checkout, `git fetch origin main` obtains upstream main as
   `FETCH_HEAD`. Main can contain unreleased changes: use a release tag when
   the desired baseline is an official release.
2. Merge the chosen upstream revision into the personal working branch. Resolve
   conflicts without discarding personal changes or upstream fixes. Review
   migrations, permissions, updater behavior, and packaging changes. Run the
   relevant tests and the isolated verification required by `AGENTS.md`.
3. Push the reviewed branch to `fork`, not upstream. A Git merge updates source
   only; build and validate a desktop package before installing it. Do not use
   an official update to replace a custom build and assume the customizations
   will survive. Document the actual signing and update behavior of each build.

## Installation and rollback

Keep the official app and current data intact while developing and testing in
an isolated home. Before a cutover, stop the app and its owned server cleanly,
then capture a private, access-restricted, consistent backup of the app bundle
and the complete data directory, including databases and auxiliary files.
Record app version, source commit, backup location, and restore procedure;
verify the backup and rehearse restore in isolation. A running SQLite database
cannot safely be backed up by copying just its main file. Protect backup files
as sensitive: they may contain credentials, conversations, and personal data.
Include the desktop application's support data where needed, and inventory
keychain entries, external provider accounts, remote computers and workspaces.
These may not be captured by a file copy or the application's export; verify
their availability separately and do not promise a complete rollback until
the relevant dependencies have been exercised.

Check migration and downgrade compatibility before opening live data with a
newer build. A rollback may require restoring the matching data snapshot; that
would discard changes made since the snapshot, so preserve the newer state too.
Do not delete the official app, old checkout, backups, or unrelated local edits
until the replacement and restore path are verified and cleanup scope is clear.
Do not claim a complete rollback from a source commit or app copy alone.

## Acceptance

Record the upstream revision, fork revision, build identity, test results,
known limitations, data migration status, and rollback rehearsal. Keep secrets,
live data, and private backup contents out of Git and public pull requests.
Treat the autonomy handoff as a behavioral specification: instruction-only
changes do not substitute for its required runtime gates, evidence, tests,
or release checks.
