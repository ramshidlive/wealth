#!/usr/bin/env python3
"""Replace inline UI SVGs with assets/icons references in HTML files."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def icon(name, w=20, h=None, extra=""):
    h = h if h is not None else w
    cls = "ds-icon" + (f" {extra}" if extra else "")
    return (
        f'<img class="{cls}" src="assets/icons/ic-{name}.svg" '
        f'width="{w}" height="{h}" alt="" aria-hidden="true">'
    )


# Regex replacements: (pattern, replacement) — order matters
REGEX_REPLACEMENTS = [
    # List item — info (all color variants, single-line)
    (
        r'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color:var\([^"]+\)"><path d="M10\.999 17.*?</svg>',
        icon("info", 20),
    ),
    # List item / KV — chevron filled
    (
        r'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7\.28789 5\.4.*?</svg>',
        icon("chevron-right", 20),
    ),
    # Info banner
    (
        r'<svg class="infoBanner-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">\s*'
        r'<circle[^/]*/>\s*<path[^/]*/>\s*</svg>',
        icon("info", 16, extra="infoBanner-icon"),
    ),
    # Info 14px (KV, DLI title) — multiline
    (
        r'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">\s*'
        r'<circle[^/]*/>\s*<path[^/]*/>\s*</svg>',
        icon("info", 14),
    ),
    # Chevron stroke (KV, DLI trailing)
    (
        r'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">\s*'
        r'<path d="M9 6l6 6-6 6"[^/]*/>\s*</svg>',
        icon("chevron-right", 20),
    ),
    # Collapsible chevron up
    (
        r'<svg width="16" height="16" viewBox="0 0 24 24" fill="none">\s*'
        r'<path d="M6 15l6-6 6 6"[^/]*/>\s*</svg>',
        icon("chevron-right", 16, extra="ds-icon--chevron-up"),
    ),
    # CTA camera / upload
    (
        r'<span class="cta-btn-icon" aria-hidden="true"><svg width="20" height="20"[^>]*>.*?</svg></span>',
        f'<span class="cta-btn-icon" aria-hidden="true">{icon("camera", 20)}</span>',
    ),
    (
        r'<span class="cta-btn-icon" aria-hidden="true"><svg width="20" height="20"[^>]*><path d="M4 17V19.*?</svg></span>',
        f'<span class="cta-btn-icon" aria-hidden="true">{icon("upload", 20)}</span>',
    ),
    # Calendar
    (
        r'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.8"[^>]*>.*?</svg>',
        icon("calendar", 20),
    ),
    # Dropdown chevron
    (
        r'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"[^>]*><path d="M6 9l6 6 6-6"/></svg>',
        icon("chevron-right", 16, extra="ds-icon--chevron-down"),
    ),
    # Dropdown check
    (
        r'<svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor"[^>]*><polyline points="1 5\.5 5 9\.5 13 1\.5"/></svg>',
        icon("check-filled", 14, h=11),
    ),
    # Search
    (
        r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"[^>]*><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16\.65" y2="16\.65"/></svg>',
        icon("search", 18),
    ),
    # Close
    (
        r'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6\.4 19.*?</svg>',
        icon("close", 16),
    ),
    # Order — sun
    (
        r'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">\s*'
        r'<circle cx="12" cy="12" r="4" fill="currentColor"/>\s*'
        r'<path d="M12 2v2.*?</svg>',
        icon("sun", 16),
    ),
    # Order — refresh
    (
        r'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1\.8"[^>]*>\s*'
        r'<path d="M23 4v6h-6"/><path d="M20\.49 15.*?</svg>',
        icon("refresh", 13),
    ),
    # Back — order (stroke)
    (
        r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"[^>]*>\s*'
        r'<path d="M15 6l-6 6 6 6"/>\s*</svg>',
        icon("arrow-left", 18),
    ),
    # Back — DS
    (
        r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">\s*'
        r'<path d="M15 6l-6 6 6 6" stroke="currentColor"[^/]*/>\s*</svg>',
        icon("arrow-left", 18),
    ),
    (
        r'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6"[^/]*/></svg>',
        icon("arrow-left", 16),
    ),
    # Steppers (with or without aria-hidden)
    (
        r'<svg width="14" height="2" viewBox="0 0 14 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"[^>]*><line x1="1" y1="1" x2="13" y2="1"/></svg>',
        icon("minus", 14, h=14),
    ),
    (
        r'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"[^>]*><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>',
        icon("plus", 14),
    ),
    # Stat box — normalize existing img
    (
        r'<img src="assets/icons/ic-chevron-right\.svg" width="20" height="20" alt="">',
        icon("chevron-right", 20),
    ),
]


def should_skip_block(block):
    skip_markers = (
        "status-icons",
        "tabVariant-svg",
        "radioListItem-radio",
        "checkboxListItem-checkbox",
        "detailListItem-leadingIcon",
        'viewBox="0 0 16 10"',  # status bar signal
        'viewBox="0 0 16 11"',  # status wifi (also refresh uses 24 - ok)
        'viewBox="0 0 20 20" fill="none">\s*<circle class="radio',
    )
    return any(m in block for m in skip_markers)


def migrate_file(path):
    text = path.read_text()
    count = 0

    for pattern, replacement in REGEX_REPLACEMENTS:
        def make_replacer(repl):
            def replacer(match):
                nonlocal count
                if should_skip_block(match.group(0)):
                    return match.group(0)
                count += 1
                return repl
            return replacer

        text, n = re.subn(pattern, make_replacer(replacement), text, flags=re.DOTALL)

    path.write_text(text)
    return count


def main():
    total = 0
    for name in ("index.html",):
        p = ROOT / name
        n = migrate_file(p)
        remaining = len(re.findall(r"<svg", p.read_text()))
        assets = p.read_text().count("assets/icons/")
        print(f"{name}: {n} regex swaps, {assets} asset refs, {remaining} svg tags left")
        total += n
    print(f"total swaps: {total}")


if __name__ == "__main__":
    main()
