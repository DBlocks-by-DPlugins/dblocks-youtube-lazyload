# DBlocks YouTube LazyLoad Changelog

All notable changes to this plugin.

Entries under `Unreleased` are added automatically by coding-buddy when a task
passes the gate, and promoted to a version number by hand at release time — a
version bump is an approval-tier action, so the header version is usually one
that has already shipped.

## Unreleased

- Patched `js-yaml` and `fast-uri` in the development dependency tree (GHSA-5p4m-2wfm-xmqj, CVE-2026-18446). Build tooling only — no released version was affected.
- Excluded `CLAUDE.md` from the release zip.
