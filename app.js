// ---------- Token data ----------
const colors = [
  // Text
  { group: 'Text', name: '--text-main',     hex: '#111E2E' },
  { group: 'Text', name: '--text-muted',    hex: '#828A96' },
  { group: 'Text', name: '--text-light',    hex: '#B1B7C0' },
  { group: 'Text', name: '--text-green',    hex: '#04B08D' },
  { group: 'Text', name: '--text-red',      hex: '#FF3273' },
  { group: 'Text', name: '--text-warning',  hex: '#FF3273' },
  // Border
  { group: 'Border', name: '--border-strong',        hex: '#CED1D9' },
  { group: 'Border', name: '--border-medium',        hex: '#E7E8EC' },
  { group: 'Border', name: '--border-light',         hex: '#EBEDF0' },
  { group: 'Border', name: '--border-danger',        hex: '#FF3273' },
  { group: 'Border', name: '--border-danger-light',  hex: '#FFEDF2' },
  { group: 'Border', name: '--border-accent',        hex: '#ED5E26' },
  { group: 'Border', name: '--border-accent-light',  hex: '#FFF3EE' },
  // Surface
  { group: 'Surface', name: '--surface-white',        hex: '#FFFFFF' },
  { group: 'Surface', name: '--surface-bg',           hex: '#F5F6F7' },
  { group: 'Surface', name: '--surface-card',         hex: '#FAFBFC' },
  { group: 'Surface', name: '--surface-pink',         hex: '#FEF6F7' },
  { group: 'Surface', name: '--surface-teal',         hex: '#EBF9F6' },
  { group: 'Surface', name: '--surface-cta-primary',  hex: '#21262C' },
  // Banner
  { group: 'Banner', name: '--banner-warning-bg',      hex: '#FFF8EC' },
  { group: 'Banner', name: '--banner-warning-border',  hex: '#F2D49F' },
  { group: 'Banner', name: '--banner-warning-text',    hex: '#9A6506' },
  { group: 'Banner', name: '--banner-success-bg',      hex: '#EFFBF6' },
  { group: 'Banner', name: '--banner-success-border',  hex: '#BCE8DA' },
  { group: 'Banner', name: '--banner-success-text',    hex: '#0F7E63' },
  { group: 'Banner', name: '--banner-danger-bg',       hex: '#FFF4F6' },
  { group: 'Banner', name: '--banner-danger-border',   hex: '#F6C8D1' },
  { group: 'Banner', name: '--banner-danger-text',     hex: '#FF3273' },
];

const typography = [
  { cls: 't-11', label: 'caption · 11 / 14', sample: 'Caption text' },
  { cls: 't-12', label: 'label · 12 / 16',   sample: 'Label text' },
  { cls: 't-14', label: 'body · 14 / 20',    sample: 'Body text' },
  { cls: 't-16', label: 'lead · 16 / 22',    sample: 'Lead text' },
  { cls: 't-18', label: 'h3 · 18 / 24',      sample: 'Heading three' },
  { cls: 't-24', label: 'h2 · 24 / 30',      sample: 'Heading two' },
  { cls: 't-28', label: 'h1 · 28 / 34',      sample: 'Heading one' },
  { cls: 't-32', label: 'display · 32 / 38', sample: 'Display' },
];

const spacing = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64];

const radii = [
  { name: '4',  var: '--r-4'   },
  { name: '8',  var: '--r-8'   },
  { name: '10', var: '--r-10'  },
  { name: '12', var: '--r-12'  },
  { name: '16', var: '--r-16'  },
  { name: '20', var: '--r-20'  },
  { name: '24', var: '--r-24'  },
  { name: '∞',  var: '--r-1000' },
];

// ---------- Render ----------
const colorsGrid = document.getElementById('colors-grid');
colors.forEach(c => {
  const el = document.createElement('div');
  el.className = 'swatch';
  el.innerHTML = `
    <div class="chip" style="background: ${c.hex};"></div>
    <div class="meta">
      <span class="name">${c.name}</span>
      <span class="hex">${c.hex.toUpperCase()} · ${c.group}</span>
    </div>`;
  colorsGrid.appendChild(el);
});

const typeList = document.getElementById('typography-list');
typography.forEach(t => {
  const el = document.createElement('div');
  el.className = 'type-row';
  el.innerHTML = `
    <span class="type-tag">${t.label}</span>
    <span class="${t.cls}">${t.sample}</span>`;
  typeList.appendChild(el);
});

const spacingList = document.getElementById('spacing-list');
spacing.forEach(s => {
  const el = document.createElement('div');
  el.className = 'space-row';
  el.innerHTML = `
    <span class="space-label">sp-${s}</span>
    <div class="space-bar" style="height: ${s}px;"></div>
    <span class="space-val">${s}px</span>`;
  spacingList.appendChild(el);
});

const radiusGrid = document.getElementById('radius-grid');
radii.forEach(r => {
  const el = document.createElement('div');
  el.className = 'radius-card smooth-corners';
  el.style.borderRadius = `var(${r.var})`;
  el.textContent = r.name;
  radiusGrid.appendChild(el);
});

// ---------- Navigation ----------
const canvas    = document.querySelector('.canvas');
const device    = document.querySelector('.device');
const screenDs  = document.getElementById('screen-ds');
const panelBase       = document.getElementById('panel-base');
const panelComponents = document.getElementById('panel-components');

function showPanel(name) {
  panelBase.classList.toggle('hidden', name !== 'base');
  panelComponents.classList.toggle('hidden', name !== 'components');
}

const dsPillBtn   = document.getElementById('ds-sidebar-link');
const dsPillLabel = dsPillBtn?.querySelector('span:first-child');
const dsPillArrow = dsPillBtn?.querySelector('.arrow');

function updateDsPill(inDsMode) {
  if (!dsPillBtn) return;
  if (inDsMode) {
    if (dsPillLabel) dsPillLabel.textContent = '‹ App UI';
    if (dsPillArrow) dsPillArrow.style.display = 'none';
    dsPillBtn.setAttribute('aria-label', 'Back to app UI');
  } else {
    if (dsPillLabel) dsPillLabel.textContent = 'Design system';
    if (dsPillArrow) dsPillArrow.style.display = '';
    dsPillBtn.setAttribute('aria-label', 'Open design system');
  }
}

function showHome() {
  device.classList.remove('hidden');
  screenDs.classList.add('hidden');
  screenDs.setAttribute('aria-hidden', 'true');
  canvas.classList.remove('ds-mode');
  updateDsPill(false);
}
function showDs() {
  device.classList.add('hidden');
  screenDs.classList.remove('hidden');
  screenDs.setAttribute('aria-hidden', 'false');
  canvas.classList.add('ds-mode');
  showPanel('components');
  screenDs.style.animation = 'none';
  void screenDs.offsetWidth;
  screenDs.style.animation = '';
  updateDsPill(true);
  // Re-draw SVG bump now that the panel is visible and layout is calculable
  requestAnimationFrame(() => tvRefresh?.());
}

dsPillBtn?.addEventListener('click', () => {
  if (canvas.classList.contains('ds-mode')) showHome();
  else showDs();
});
document.getElementById('back-btn').addEventListener('click', showHome);
const openDsBtn = document.getElementById('open-ds-btn');
if (openDsBtn) openDsBtn.addEventListener('click', showDs);

document.getElementById('sidebar-base-link')?.addEventListener('click', e => {
  e.preventDefault();
  showPanel('base');
});
document.getElementById('base-back-btn')?.addEventListener('click', () => {
  showPanel('components');
});

// ---------- Components sidebar ----------
const sidebarLinks = Array.from(document.querySelectorAll('.ds-sidebar-link[href^="#section"]'));

sidebarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function setActiveSidebarLink(id) {
  sidebarLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveSidebarLink(entry.target.id);
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  document.querySelectorAll('.ds-main .section[id]').forEach(section => {
    sectionObserver.observe(section);
  });
}

// ---------- StatBox playground ----------
const statBoxPreview = document.getElementById('statbox-preview');
const statBoxValue = document.getElementById('statbox-value');
const statBoxFrequency = document.getElementById('statbox-frequency');
const statBoxFrequencyToggle = document.getElementById('statbox-frequency-toggle');
const statBoxSizeTabs = Array.from(document.querySelectorAll('[data-statbox-size]'));
const statBoxAlignTabs = Array.from(document.querySelectorAll('[data-statbox-align]'));

function updateStatBoxPreview() {
  if (!statBoxPreview) return;
  const activeSize = statBoxSizeTabs.find(tab => tab.classList.contains('is-active'))?.dataset.statboxSize || 'small';
  const activeAlign = statBoxAlignTabs.find(tab => tab.classList.contains('is-active'))?.dataset.statboxAlign || 'left';
  const showFrequency = Boolean(statBoxFrequencyToggle?.checked);

  statBoxPreview.classList.remove('statBox--small', 'statBox--medium', 'statBox--large', 'statBox--center', 'statBox--right');
  if (activeSize === 'medium') statBoxPreview.classList.add('statBox--medium');
  else if (activeSize === 'large') statBoxPreview.classList.add('statBox--large');
  else statBoxPreview.classList.add('statBox--small');
  if (activeAlign === 'center') statBoxPreview.classList.add('statBox--center');
  if (activeAlign === 'right') statBoxPreview.classList.add('statBox--right');

  if (statBoxValue) {
    if (activeSize === 'large') statBoxValue.textContent = '403K';
    else if (activeSize === 'medium') statBoxValue.textContent = '120%';
    else statBoxValue.textContent = "09 Apr '26";
  }
  if (statBoxFrequency) statBoxFrequency.classList.toggle('hidden', !showFrequency);
}

statBoxSizeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    statBoxSizeTabs.forEach(item => item.classList.toggle('is-active', item === tab));
    updateStatBoxPreview();
  });
});

statBoxAlignTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    statBoxAlignTabs.forEach(item => item.classList.toggle('is-active', item === tab));
    updateStatBoxPreview();
  });
});

bindToggle(statBoxFrequencyToggle, updateStatBoxPreview);
updateStatBoxPreview();

function bindMiniTabs(tabs, onChange) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.toggle('is-active', item === tab));
      onChange();
    });
  });
}

function bindToggle(el, fn) {
  el?.addEventListener('change', fn);
}

// ---------- StatusPill playground ----------
const pillPreview = document.getElementById('pill-preview');
const pillSizeTabs = Array.from(document.querySelectorAll('[data-pill-size]'));
const pillToneTabs = Array.from(document.querySelectorAll('[data-pill-tone]'));
const pillTextByTone = { danger: 'KI Breached', success: 'Matured', neutral: 'Observation' };

function updatePillPreview() {
  if (!pillPreview) return;
  const size = pillSizeTabs.find(tab => tab.classList.contains('is-active'))?.dataset.pillSize || 'md';
  const tone = pillToneTabs.find(tab => tab.classList.contains('is-active'))?.dataset.pillTone || 'danger';
  pillPreview.className = `statusPill statusPill--${tone} statusPill--${size}`;
  pillPreview.textContent = pillTextByTone[tone];
}
bindMiniTabs(pillSizeTabs, updatePillPreview);
bindMiniTabs(pillToneTabs, updatePillPreview);
updatePillPreview();

// ---------- InfoBanner playground ----------
const bannerPreview = document.getElementById('banner-preview');
const bannerText = document.getElementById('banner-preview-text');
const bannerToneTabs = Array.from(document.querySelectorAll('[data-banner-tone]'));
const bannerTextByTone = {
  info: 'AAPL closed below the strike at maturity, so principal is being delivered in shares.',
  warning: 'Barrier has been breached. Final settlement may convert principal into shares.',
  success: 'Coupon and principal payout completed successfully.',
  danger: 'Settlement is delayed due to an issuer-side processing issue.',
};

function updateBannerPreview() {
  if (!bannerPreview) return;
  const tone = bannerToneTabs.find(tab => tab.classList.contains('is-active'))?.dataset.bannerTone || 'info';
  bannerPreview.className = `infoBanner infoBanner--${tone}`;
  if (bannerText) bannerText.textContent = bannerTextByTone[tone];
}
bindMiniTabs(bannerToneTabs, updateBannerPreview);
updateBannerPreview();

// ---------- MetricAmount playground ----------
const amountPreview = document.getElementById('amount-preview');
const amountSizeTabs = Array.from(document.querySelectorAll('[data-amount-size]'));
const amountToneTabs = Array.from(document.querySelectorAll('[data-amount-tone]'));

function updateAmountPreview() {
  if (!amountPreview) return;
  const size = amountSizeTabs.find(tab => tab.classList.contains('is-active'))?.dataset.amountSize || 'display';
  const tone = amountToneTabs.find(tab => tab.classList.contains('is-active'))?.dataset.amountTone || 'default';
  const toneClass = tone === 'default' ? '' : ` metricAmount--${tone}`;
  amountPreview.className = `metricAmount metricAmount--${size}${toneClass}`;
}
bindMiniTabs(amountSizeTabs, updateAmountPreview);
bindMiniTabs(amountToneTabs, updateAmountPreview);
updateAmountPreview();

// ---------- KeyValueRow playground ----------
const kvPreview = document.getElementById('kv-preview');
const kvDensityTabs = Array.from(document.querySelectorAll('[data-kv-density]'));
const kvDividerToggle = document.getElementById('kv-divider-toggle');
const kvKeyInfoToggle = document.getElementById('kv-key-info-toggle');
const kvChevronToggle = document.getElementById('kv-chevron-toggle');
const kvPreviewKeyInfo = document.getElementById('kv-preview-key-info');
const kvPreviewChevron = document.getElementById('kv-preview-chevron');

function updateKeyValuePreview() {
  if (!kvPreview) return;
  const density = kvDensityTabs.find(tab => tab.classList.contains('is-active'))?.dataset.kvDensity || 'regular';
  kvPreview.className = 'keyValueRow';
  if (density === 'dense') kvPreview.classList.add('keyValueRow--dense');
  if (kvDividerToggle?.checked) kvPreview.classList.add('keyValueRow--divider');
  const showKeyInfo = Boolean(kvKeyInfoToggle?.checked);
  const showChevron = Boolean(kvChevronToggle?.checked);
  if (kvPreviewKeyInfo) {
    kvPreviewKeyInfo.classList.toggle('hidden', !showKeyInfo);
    kvPreviewKeyInfo.setAttribute('aria-hidden', String(!showKeyInfo));
  }
  if (kvPreviewChevron) {
    kvPreviewChevron.classList.toggle('hidden', !showChevron);
    kvPreviewChevron.setAttribute('aria-hidden', String(!showChevron));
  }
}
bindMiniTabs(kvDensityTabs, updateKeyValuePreview);
bindToggle(kvDividerToggle, updateKeyValuePreview);
bindToggle(kvKeyInfoToggle, updateKeyValuePreview);
bindToggle(kvChevronToggle, updateKeyValuePreview);
updateKeyValuePreview();

// ---------- CollapsibleSection motion (<details> height + beforetoggle close) ----------
const COLLAPSIBLE_MS = 380;
const COLLAPSIBLE_OPACITY_MS = 280;

function collapsibleBody(details) {
  return details.querySelector('.collapsibleSection-body');
}

function clearCollapsibleBodyStyles(body) {
  if (!body) return;
  body.style.maxHeight = '';
  body.style.overflow = '';
  body.style.opacity = '';
  body.style.transition = '';
}

function animateCollapsibleOpen(details) {
  const body = collapsibleBody(details);
  if (!body || !details.open) return;
  const finish = () => {
    clearCollapsibleBodyStyles(body);
  };
  body.style.overflow = 'hidden';
  const target = Math.max(body.scrollHeight, 1);
  body.style.transition = 'none';
  body.style.maxHeight = '0';
  body.style.opacity = '0';
  void body.offsetHeight;
  body.style.transition = `max-height ${COLLAPSIBLE_MS}ms ease, opacity ${COLLAPSIBLE_OPACITY_MS}ms ease`;
  body.style.maxHeight = `${target}px`;
  body.style.opacity = '1';
  let done = false;
  const complete = () => {
    if (done) return;
    done = true;
    finish();
  };
  const onEnd = (e) => {
    if (e.propertyName !== 'max-height') return;
    body.removeEventListener('transitionend', onEnd);
    clearTimeout(failsafe);
    complete();
  };
  const failsafe = setTimeout(() => {
    body.removeEventListener('transitionend', onEnd);
    complete();
  }, COLLAPSIBLE_MS + 100);
  body.addEventListener('transitionend', onEnd);
}

function animateCollapsibleClose(details, onDone) {
  const body = collapsibleBody(details);
  if (!body) {
    details.removeAttribute('open');
    onDone?.();
    return;
  }
  const h = Math.max(body.scrollHeight, 1);
  body.style.overflow = 'hidden';
  body.style.transition = 'none';
  body.style.maxHeight = `${h}px`;
  body.style.opacity = '1';
  void body.offsetHeight;
  body.style.transition = `max-height ${COLLAPSIBLE_MS}ms ease, opacity ${COLLAPSIBLE_OPACITY_MS}ms ease`;
  body.style.maxHeight = '0';
  body.style.opacity = '0';
  let done = false;
  const complete = () => {
    if (done) return;
    done = true;
    details.removeAttribute('open');
    clearCollapsibleBodyStyles(body);
    onDone?.();
  };
  const onEnd = (e) => {
    if (e.propertyName !== 'max-height') return;
    body.removeEventListener('transitionend', onEnd);
    clearTimeout(failsafe);
    complete();
  };
  const failsafe = setTimeout(() => {
    body.removeEventListener('transitionend', onEnd);
    complete();
  }, COLLAPSIBLE_MS + 100);
  body.addEventListener('transitionend', onEnd);
}

function initCollapsibleSectionMotion() {
  const supportsBeforeToggle = typeof HTMLDetailsElement !== 'undefined'
    && 'onbeforetoggle' in document.createElement('details');
  document.querySelectorAll('details.collapsibleSection').forEach(details => {
    if (details.dataset.collapsibleMotionInit) return;
    details.dataset.collapsibleMotionInit = '1';
    const body = collapsibleBody(details);
    if (!body) return;
    if (supportsBeforeToggle) {
      details.addEventListener('beforetoggle', (e) => {
        if (e.newState === 'closed' && details.open) {
          e.preventDefault();
          animateCollapsibleClose(details);
        }
      });
    }
    details.addEventListener('toggle', () => {
      if (details.open) animateCollapsibleOpen(details);
    });
  });
}

// ---------- CollapsibleSection playground ----------
const csPreview = document.getElementById('cs-preview');
const csExpandedToggle = document.getElementById('cs-expanded-toggle');
function syncCollapsiblePreviewFromDetails() {
  if (!csPreview || !csExpandedToggle) return;
  csExpandedToggle.checked = csPreview.open;
}
function setCollapsiblePreviewExpanded(expanded) {
  if (!csPreview) return;
  if (expanded === csPreview.open) return;
  if (expanded) {
    csPreview.setAttribute('open', '');
    return;
  }
  animateCollapsibleClose(csPreview, syncCollapsiblePreviewFromDetails);
}
if (csExpandedToggle && csPreview) {
  csExpandedToggle.addEventListener('change', () => setCollapsiblePreviewExpanded(csExpandedToggle.checked));
  csPreview.addEventListener('toggle', syncCollapsiblePreviewFromDetails);
  syncCollapsiblePreviewFromDetails();
}
initCollapsibleSectionMotion();

// ---------- CTA Button playground ----------
const btnSizeSelect  = document.getElementById('btn-size-select');
const btnStateSelect = document.getElementById('btn-state-select');
const BTN_VARIANTS = [
  { id: 'btn-primary', variant: 'primary' },
  { id: 'btn-danger',  variant: 'danger'  },
  { id: 'btn-dark',    variant: 'dark'    },
  { id: 'btn-outline', variant: 'outline' },
];

function updateBtnPreview() {
  const size  = btnSizeSelect?.value  || 'lg';
  const state = btnStateSelect?.value || 'default';
  BTN_VARIANTS.forEach(({ id, variant }) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.className = `cta-btn cta-btn--${variant} cta-btn--${size}`;
    btn.disabled = state === 'disabled';
    btn.classList.toggle('is-hover',  state === 'hover');
    btn.classList.toggle('is-active', state === 'active');
  });
}

btnSizeSelect?.addEventListener('change',  updateBtnPreview);
btnStateSelect?.addEventListener('change', updateBtnPreview);
updateBtnPreview();

// ---------- InputField playground ----------
const ifPreview       = document.getElementById('if-preview');
const ifStateSelect   = document.getElementById('if-state-select');
const ifTypeTabs      = Array.from(document.querySelectorAll('[data-if-type]'));
const ifOptionalToggle = document.getElementById('if-optional-toggle');
const ifHelpToggle    = document.getElementById('if-help-toggle');
const ifOptionalEl    = document.getElementById('if-preview-optional');
const ifSpacerEl      = document.getElementById('if-preview-spacer');
const ifHelpEl        = document.getElementById('if-preview-help');
const ifIconEl        = document.getElementById('if-preview-icon');
const ifDecBtn        = document.getElementById('if-preview-dec');
const ifIncBtn        = document.getElementById('if-preview-inc');
const ifInput         = document.getElementById('if-preview-input');
const ifErrorEl       = document.getElementById('if-preview-error');

const IF_STATE_CONFIG = {
  default:      { classes: [],                                                     stringVal: '',               amountVal: '',      placeholder: { string: 'DD / MM / YYYY', amount: '0.00' }, showError: false, iconColor: 'var(--text-light)' },
  focus:        { classes: ['inputField--focus'],                                  stringVal: '',               amountVal: '1,000', placeholder: { string: 'DD / MM / YYYY', amount: '0.00' }, showError: false, iconColor: 'var(--border-accent)' },
  filled:       { classes: ['inputField--filled'],                                 stringVal: '09 / 04 / 2026', amountVal: '1,000', placeholder: { string: '', amount: '' },                   showError: false, iconColor: 'var(--text-light)' },
  error:        { classes: ['inputField--filled', 'inputField--error'],            stringVal: '32 / 13 / 2026', amountVal: '0',     placeholder: { string: '', amount: '' },                   showError: true,  iconColor: 'var(--text-light)' },
  'focus-error':{ classes: ['inputField--focus',  'inputField--focus-error'],      stringVal: '32 / 13 / 2026', amountVal: '0',     placeholder: { string: '', amount: '' },                   showError: true,  iconColor: 'var(--border-danger)' },
  disabled:     { classes: ['inputField--disabled'],                               stringVal: '09 / 04 / 2026', amountVal: '1,000', placeholder: { string: '', amount: '' },                   showError: false, iconColor: 'var(--text-light)' },
};

const IF_ERROR_TEXT = {
  string: 'Please enter a valid date',
  amount: 'Amount must be greater than 0',
};

function updateIfPreview() {
  if (!ifPreview) return;

  const state    = ifStateSelect?.value || 'default';
  const type     = ifTypeTabs.find(t => t.classList.contains('is-active'))?.dataset?.ifType || 'string';
  const cfg      = IF_STATE_CONFIG[state];
  const isAmount = type === 'amount';

  ifPreview.className = 'inputField ds-component-preview--list';
  cfg.classes.forEach(c => ifPreview.classList.add(c));
  if (isAmount) ifPreview.classList.add('inputField--amount');

  ifOptionalEl?.classList.toggle('hidden', !ifOptionalToggle?.checked);
  ifSpacerEl?.classList.toggle('hidden',   !ifHelpToggle?.checked);
  ifHelpEl?.classList.toggle('hidden',     !ifHelpToggle?.checked);

  if (ifIconEl) {
    ifIconEl.classList.toggle('hidden', isAmount);
    ifIconEl.style.color = cfg.iconColor;
  }

  if (ifInput) {
    const nextVal = isAmount ? cfg.amountVal : cfg.stringVal;
    const nextPh  = isAmount ? cfg.placeholder.amount : cfg.placeholder.string;
    if (ifInput.value       !== nextVal) ifInput.value       = nextVal;
    if (ifInput.placeholder !== nextPh)  ifInput.placeholder = nextPh;
    ifInput.disabled = state === 'disabled';
  }

  if (ifErrorEl) {
    ifErrorEl.classList.toggle('hidden', !cfg.showError);
    if (cfg.showError) ifErrorEl.textContent = IF_ERROR_TEXT[type];
  }
}

function ifParseVal() {
  const raw = ifInput?.value.replace(/,/g, '').trim() || '0';
  const n   = Number(raw);
  return Number.isNaN(n) ? 0 : n;
}
function ifFormatVal(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function ifStep(delta) {
  if (!ifInput) return;
  ifInput.value = ifFormatVal(Math.max(0, ifParseVal() + delta));
}

ifDecBtn?.addEventListener('mousedown', e => e.preventDefault());
ifIncBtn?.addEventListener('mousedown', e => e.preventDefault());
ifDecBtn?.addEventListener('click', () => { ifStep(-100); ifInput?.focus(); });
ifIncBtn?.addEventListener('click', () => { ifStep(100);  ifInput?.focus(); });

ifInput?.addEventListener('focus', () => {
  if (!ifPreview) return;
  const state = ifStateSelect?.value || 'default';
  if (state === 'disabled') return;
  const isError = state === 'error' || state === 'focus-error';
  ifPreview.classList.add('inputField--focus');
  if (isError) {
    ifPreview.classList.add('inputField--focus-error');
    ifPreview.classList.remove('inputField--error');
    if (ifIconEl) ifIconEl.style.color = 'var(--border-danger)';
  } else {
    if (ifIconEl) ifIconEl.style.color = 'var(--border-accent)';
  }
});

ifInput?.addEventListener('blur', updateIfPreview);

ifStateSelect?.addEventListener('change', updateIfPreview);
bindMiniTabs(ifTypeTabs, updateIfPreview);
bindToggle(ifOptionalToggle, updateIfPreview);
bindToggle(ifHelpToggle, updateIfPreview);
updateIfPreview();

// ---------- DetailListItem playground ----------
const dliPreview = document.getElementById('dli-preview');
const dliPreviewLeadingSlot = document.getElementById('dli-preview-leading-slot');
const dliPreviewTitleInfo = document.getElementById('dli-preview-title-info');
const dliPreviewSupport = document.getElementById('dli-preview-support');
const dliPreviewMetric = document.getElementById('dli-preview-metric');
const dliPreviewText = document.getElementById('dli-preview-text');
const dliDensityTabs = Array.from(document.querySelectorAll('[data-dli-density]'));
const dliTrailingTabs = Array.from(document.querySelectorAll('[data-dli-trailing]'));
const dliLeadingToggle = document.getElementById('dli-leading-toggle');
const dliTitleInfoToggle = document.getElementById('dli-title-info-toggle');
const dliSupportToggle = document.getElementById('dli-support-toggle');
const dliChevronToggle = document.getElementById('dli-chevron-toggle');
const dliPreviewChevron = document.getElementById('dli-preview-chevron');

function updateDetailListItemPreview() {
  if (!dliPreview) return;
  const density = dliDensityTabs.find(tab => tab.classList.contains('is-active'))?.dataset.dliDensity || 'regular';
  const trailing = dliTrailingTabs.find(tab => tab.classList.contains('is-active'))?.dataset.dliTrailing || 'metric';
  const showLeading = Boolean(dliLeadingToggle?.checked);
  const showTitleInfo = Boolean(dliTitleInfoToggle?.checked);
  const showSupport = Boolean(dliSupportToggle?.checked);
  const showChevron = Boolean(dliChevronToggle?.checked);

  dliPreview.className = 'detailListItem';
  if (density === 'compact') dliPreview.classList.add('detailListItem--compact');

  if (dliPreviewLeadingSlot) dliPreviewLeadingSlot.classList.toggle('hidden', !showLeading);
  if (dliPreviewTitleInfo) {
    dliPreviewTitleInfo.classList.toggle('hidden', !showTitleInfo);
    dliPreviewTitleInfo.setAttribute('aria-hidden', String(!showTitleInfo));
  }
  if (dliPreviewSupport) dliPreviewSupport.classList.toggle('hidden', !showSupport);
  if (dliPreviewMetric) dliPreviewMetric.classList.toggle('hidden', trailing !== 'metric');
  if (dliPreviewText) dliPreviewText.classList.toggle('hidden', trailing !== 'text');
  if (dliPreviewChevron) dliPreviewChevron.classList.toggle('hidden', !showChevron);
}

bindMiniTabs(dliDensityTabs, updateDetailListItemPreview);
bindMiniTabs(dliTrailingTabs, updateDetailListItemPreview);
bindToggle(dliLeadingToggle, updateDetailListItemPreview);
bindToggle(dliTitleInfoToggle, updateDetailListItemPreview);
bindToggle(dliSupportToggle, updateDetailListItemPreview);
bindToggle(dliChevronToggle, updateDetailListItemPreview);
updateDetailListItemPreview();

// ---------- ListItem playground ----------
const liLeadingToggle  = document.getElementById('li-leading-toggle');
const liTrailingToggle = document.getElementById('li-trailing-toggle');
const liDividerToggle  = document.getElementById('li-divider-toggle');
const liItems          = [1, 2, 3].map(n => document.getElementById(`li-item-${n}`));
const liLeadings       = [1, 2, 3].map(n => document.getElementById(`li-leading-${n}`));
const liTrailings      = [1, 2, 3].map(n => document.getElementById(`li-trailing-${n}`));

function updateLiPreview() {
  const showLeading  = Boolean(liLeadingToggle?.checked);
  const showTrailing = Boolean(liTrailingToggle?.checked);
  const showDivider  = Boolean(liDividerToggle?.checked);

  liLeadings.forEach(el => el?.classList.toggle('hidden', !showLeading));
  liTrailings.forEach(el => el?.classList.toggle('hidden', !showTrailing));

  // Divider on all items except the last; last item never gets one
  liItems.forEach((item, i) => {
    if (!item) return;
    item.classList.toggle('listItem--divider', showDivider && i < liItems.length - 1);
  });
}

bindToggle(liLeadingToggle,  updateLiPreview);
bindToggle(liTrailingToggle, updateLiPreview);
bindToggle(liDividerToggle,  updateLiPreview);
updateLiPreview();

// ---------- TabVariant ----------
const TV_HW = 54.671;
const TV_DX = [6.085, 11.207, 11.918, 13.424, 14.135, 19.257, 25.342];

function buildTabPath(center, svgW) {
  const r  = n => Math.round(n * 1000) / 1000;
  // Clamp s to 0 so the path always has the same command structure
  // (M H C L C H C L C H). CSS transition requires identical structures to interpolate.
  const s  = Math.max(0, center - TV_HW);
  const e  = center + TV_HW;
  const tl = s + TV_DX[6];
  const tr = e - TV_DX[6];
  return [
    `M0 34.5`,
    `H${r(s)}`,
    `C${r(s+TV_DX[0])} 34.5 ${r(s+TV_DX[1])} 29.9455 ${r(s+TV_DX[2])} 23.9021`,
    `L${r(s+TV_DX[3])} 11.0979`,
    `C${r(s+TV_DX[4])} 5.05455 ${r(s+TV_DX[5])} 0.5 ${r(tl)} 0.5`,
    `H${r(tr)}`,
    `C${r(e-TV_DX[5])} 0.5 ${r(e-TV_DX[4])} 5.05455 ${r(e-TV_DX[3])} 11.0979`,
    `L${r(e-TV_DX[2])} 23.9021`,
    `C${r(e-TV_DX[1])} 29.9455 ${r(e-TV_DX[0])} 34.5 ${r(e)} 34.5`,
    `H${svgW}`,
  ].join(' ');
}

let tvRefresh = null;

function initTabVariant(nav) {
  if (!nav) return null;
  const tvPath  = nav.querySelector('.tabVariant-path');
  const tvItems = Array.from(nav.querySelectorAll('[data-tv-index]'));
  if (!tvPath || !tvItems.length) return null;

  const SVG_W = 400;
  let activeIdx = 0;

  function getCenterForIndex(idx) {
    const navRect  = nav.getBoundingClientRect();
    if (!navRect.width) return null;
    const itemRect = tvItems[idx].getBoundingClientRect();
    const pixelCenter = (itemRect.left + itemRect.width / 2) - navRect.left;
    return (pixelCenter / navRect.width) * SVG_W;
  }

  function setPathD(pathData, withTransition) {
    if (!withTransition) tvPath.style.setProperty('transition', 'none');
    tvPath.style.setProperty('d', `path("${pathData}")`);
    if (!withTransition) requestAnimationFrame(() => tvPath.style.removeProperty('transition'));
  }

  function moveBump(toIdx, animate) {
    const center = getCenterForIndex(toIdx);
    if (center === null) return;
    const toPath = buildTabPath(center, SVG_W);
    tvItems.forEach((item, i) => item.classList.toggle('tabVariant-item--active', i === toIdx));
    activeIdx = toIdx;
    setPathD(toPath, animate);
  }

  tvItems.forEach((item, i) => item.addEventListener('click', () => moveBump(i, true)));
  moveBump(0, false);
  return () => moveBump(activeIdx, false);
}

// Order screen tab — always visible, draws immediately
initTabVariant(document.getElementById('order-tv'));

// DS playground tab — panel is hidden on load; tvRefresh re-draws when it becomes visible
tvRefresh = initTabVariant(document.getElementById('tv-preview'));

// ---------- Order screen ----------
const orderQtyInput  = document.getElementById('order-qty-input');
const orderDecBtn    = document.getElementById('order-dec');
const orderIncBtn    = document.getElementById('order-inc');
const orderEstTotal  = document.getElementById('order-est-total');
const ORDER_PRICE    = 4523.75;

function orderParseQty() {
  const n = parseInt((orderQtyInput?.value || '0').replace(/,/g, ''), 10);
  return Number.isNaN(n) ? 0 : Math.max(0, n);
}
function orderUpdateTotal() {
  if (!orderEstTotal) return;
  const total = orderParseQty() * ORDER_PRICE;
  orderEstTotal.textContent = Math.round(total).toLocaleString('en-US');
}
function orderStep(delta) {
  if (!orderQtyInput) return;
  const next = Math.max(0, orderParseQty() + delta);
  orderQtyInput.value = next.toLocaleString('en-US');
  orderUpdateTotal();
}

orderDecBtn?.addEventListener('mousedown', e => e.preventDefault());
orderIncBtn?.addEventListener('mousedown', e => e.preventDefault());
orderDecBtn?.addEventListener('click', () => orderStep(-1));
orderIncBtn?.addEventListener('click', () => orderStep(1));
orderQtyInput?.addEventListener('input', orderUpdateTotal);
orderUpdateTotal();

document.querySelector('.order-use-max')?.addEventListener('click', () => {
  if (!orderQtyInput) return;
  const maxQty = Math.floor(1287012 / ORDER_PRICE);
  orderQtyInput.value = maxQty.toLocaleString('en-US');
  orderUpdateTotal();
});

// ---------- RadioListItem playground ----------
const rliDividerToggle = document.getElementById('rli-divider-toggle');
const rliItems         = [1, 2, 3].map(n => document.getElementById(`rli-item-${n}`));

rliItems.forEach(item => {
  item?.addEventListener('click', () => {
    rliItems.forEach(el => el?.classList.remove('radioListItem--selected'));
    item.classList.add('radioListItem--selected');
  });
});

function updateRliPreview() {
  const showDivider = Boolean(rliDividerToggle?.checked);
  rliItems.forEach((item, i) => {
    if (!item) return;
    item.classList.toggle('radioListItem--divider', showDivider && i < rliItems.length - 1);
  });
}

bindToggle(rliDividerToggle, updateRliPreview);
updateRliPreview();

// ---------- CheckboxListItem playground ----------
const cliDividerToggle = document.getElementById('cli-divider-toggle');
const cliItems         = [1, 2, 3].map(n => document.getElementById(`cli-item-${n}`));

cliItems.forEach(item => {
  item?.addEventListener('click', () => {
    item.classList.toggle('checkboxListItem--selected');
  });
});

function updateCliPreview() {
  const showDivider = Boolean(cliDividerToggle?.checked);
  cliItems.forEach((item, i) => {
    if (!item) return;
    item.classList.toggle('checkboxListItem--divider', showDivider && i < cliItems.length - 1);
  });
}

bindToggle(cliDividerToggle, updateCliPreview);
updateCliPreview();

// ---------- DropdownField playground ----------
const dfPreview         = document.getElementById('df-preview');
const dfStateSelect     = document.getElementById('df-state-select');
const dfOptionalToggle  = document.getElementById('df-optional-toggle');
const dfHelpToggle      = document.getElementById('df-help-toggle');
const dfPreviewOptional = document.getElementById('df-preview-optional');
const dfPreviewSpacer   = document.getElementById('df-preview-spacer');
const dfPreviewHelp     = document.getElementById('df-preview-help');
const dfPreviewValue    = document.getElementById('df-preview-value');
const dfPreviewBox      = document.getElementById('df-preview-box');
const dfPreviewError    = document.getElementById('df-preview-error');

const DF_STATE_CONFIG = {
  default:        { classes: [],                                                              valueText: 'Select currency', showError: false },
  focus:          { classes: ['dropdownField--focus'],                                        valueText: 'Select currency', showError: false },
  filled:         { classes: ['dropdownField--filled'],                                       valueText: 'US Dollar (USD)', showError: false },
  error:          { classes: ['dropdownField--filled', 'dropdownField--error'],               valueText: 'US Dollar (USD)', showError: true  },
  'focus-error':  { classes: ['dropdownField--focus',  'dropdownField--focus-error'],         valueText: 'US Dollar (USD)', showError: true  },
  disabled:       { classes: ['dropdownField--disabled'],                                     valueText: 'US Dollar (USD)', showError: false },
};

function updateDfPreview() {
  if (!dfPreview) return;
  const state = dfStateSelect?.value || 'default';
  const cfg = DF_STATE_CONFIG[state];

  dfPreview.className = 'dropdownField ds-component-preview--list';
  cfg.classes.forEach(c => dfPreview.classList.add(c));

  if (dfPreviewOptional) dfPreviewOptional.classList.toggle('hidden', !dfOptionalToggle?.checked);
  if (dfPreviewSpacer)   dfPreviewSpacer.classList.toggle('hidden',   !dfHelpToggle?.checked);
  if (dfPreviewHelp)     dfPreviewHelp.classList.toggle('hidden',     !dfHelpToggle?.checked);
  if (dfPreviewValue)    dfPreviewValue.textContent = cfg.valueText;
  if (dfPreviewBox)      dfPreviewBox.setAttribute('aria-expanded', String(state === 'focus' || state === 'focus-error'));
  if (dfPreviewError)    dfPreviewError.classList.toggle('hidden', !cfg.showError);
}

dfStateSelect?.addEventListener('change', updateDfPreview);
bindToggle(dfOptionalToggle, updateDfPreview);
bindToggle(dfHelpToggle, updateDfPreview);

dfPreviewBox?.addEventListener('click', () => {
  if (!dfPreview || !dfStateSelect) return;
  if (dfPreview.classList.contains('dropdownField--disabled')) return;
  const isOpen = dfPreview.classList.contains('dropdownField--focus');
  if (isOpen) {
    const hasValue = dfPreviewValue?.textContent !== 'Select currency';
    dfStateSelect.value = hasValue ? 'filled' : 'default';
  } else {
    const isError = dfPreview.classList.contains('dropdownField--error');
    dfStateSelect.value = isError ? 'focus-error' : 'focus';
  }
  updateDfPreview();
});

document.querySelectorAll('#df-preview .dropdownField-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('#df-preview .dropdownField-option').forEach(o => {
      o.classList.toggle('dropdownField-option--selected', o === option);
      o.setAttribute('aria-selected', String(o === option));
    });
    if (dfPreviewValue) dfPreviewValue.textContent = option.querySelector('span')?.textContent || '';
    if (dfStateSelect) dfStateSelect.value = 'filled';
    updateDfPreview();
  });
});

updateDfPreview();

// ---------- SearchField playground ----------
const sfPreview      = document.getElementById('sf-preview');
const sfPreviewInput = document.getElementById('sf-preview-input');
const sfPreviewClear = document.getElementById('sf-preview-clear');
const sfStateTabs    = Array.from(document.querySelectorAll('[data-sf-state]'));

const SF_STATE_CONFIG = {
  default: { classes: [],                              value: '' },
  focus:   { classes: ['searchField--focus'],          value: '' },
  filled:  { classes: ['searchField--filled'],         value: 'Tech Giants Yield' },
};

function updateSfPreview() {
  if (!sfPreview) return;
  const state = sfStateTabs.find(t => t.classList.contains('is-active'))?.dataset?.sfState || 'default';
  const cfg = SF_STATE_CONFIG[state];
  sfPreview.className = 'searchField ds-component-preview--list';
  cfg.classes.forEach(c => sfPreview.classList.add(c));
  if (sfPreviewInput && sfPreviewInput.value !== cfg.value) sfPreviewInput.value = cfg.value;
}

bindMiniTabs(sfStateTabs, updateSfPreview);

sfPreviewInput?.addEventListener('focus', () => {
  if (sfPreview) sfPreview.classList.add('searchField--focus');
});

sfPreviewInput?.addEventListener('blur', updateSfPreview);

sfPreviewInput?.addEventListener('input', () => {
  if (!sfPreview || !sfPreviewInput) return;
  sfPreview.classList.toggle('searchField--filled', sfPreviewInput.value.length > 0);
});

sfPreviewClear?.addEventListener('mousedown', e => e.preventDefault());
sfPreviewClear?.addEventListener('click', () => {
  if (sfPreviewInput) sfPreviewInput.value = '';
  if (sfPreview) sfPreview.classList.remove('searchField--filled');
  sfStateTabs.forEach(t => t.classList.toggle('is-active', t.dataset.sfState === 'focus'));
});

updateSfPreview();

// ---------- TextboxField playground ----------
const tfPreview         = document.getElementById('tf-preview');
const tfStateSelect     = document.getElementById('tf-state-select');
const tfOptionalToggle  = document.getElementById('tf-optional-toggle');
const tfHelpToggle      = document.getElementById('tf-help-toggle');
const tfCounterToggle   = document.getElementById('tf-counter-toggle');
const tfPreviewOptional = document.getElementById('tf-preview-optional');
const tfPreviewSpacer   = document.getElementById('tf-preview-spacer');
const tfPreviewHelp     = document.getElementById('tf-preview-help');
const tfPreviewTextarea = document.getElementById('tf-preview-textarea');
const tfPreviewCounter  = document.getElementById('tf-preview-counter');
const tfPreviewFooter   = document.getElementById('tf-preview-footer');
const tfPreviewError    = document.getElementById('tf-preview-error');
const TF_MAX_CHARS      = 300;

const TF_STATE_CONFIG = {
  default:      { classes: [],                                                        value: '',                                                                         showError: false },
  focus:        { classes: ['textboxField--focus'],                                   value: '',                                                                         showError: false },
  filled:       { classes: ['textboxField--filled'],                                  value: 'This structured note references AAPL, GOOGL, and MSFT as underlyings with a 6-month tenor.', showError: false },
  error:        { classes: ['textboxField--filled', 'textboxField--error'],           value: '',                                                                         showError: true  },
  'focus-error':{ classes: ['textboxField--focus',  'textboxField--focus-error'],     value: '',                                                                         showError: true  },
  disabled:     { classes: ['textboxField--disabled'],                                value: 'Additional risk disclosures apply to this product.',                        showError: false },
};

function updateTfCounter() {
  if (!tfPreviewCounter || !tfPreviewTextarea) return;
  tfPreviewCounter.textContent = `${tfPreviewTextarea.value.length}/${TF_MAX_CHARS}`;
}

function updateTfPreview() {
  if (!tfPreview) return;
  const state = tfStateSelect?.value || 'default';
  const cfg = TF_STATE_CONFIG[state];

  tfPreview.className = 'textboxField ds-component-preview--list';
  cfg.classes.forEach(c => tfPreview.classList.add(c));

  if (tfPreviewOptional) tfPreviewOptional.classList.toggle('hidden', !tfOptionalToggle?.checked);
  if (tfPreviewSpacer)   tfPreviewSpacer.classList.toggle('hidden',   !tfHelpToggle?.checked);
  if (tfPreviewHelp)     tfPreviewHelp.classList.toggle('hidden',     !tfHelpToggle?.checked);
  if (tfPreviewFooter)   tfPreviewFooter.classList.toggle('hidden',   !tfCounterToggle?.checked);
  if (tfPreviewTextarea) {
    tfPreviewTextarea.value = cfg.value;
    tfPreviewTextarea.disabled = state === 'disabled';
  }
  if (tfPreviewError) tfPreviewError.classList.toggle('hidden', !cfg.showError);
  updateTfCounter();
}

tfStateSelect?.addEventListener('change', updateTfPreview);
bindToggle(tfOptionalToggle, updateTfPreview);
bindToggle(tfHelpToggle, updateTfPreview);
bindToggle(tfCounterToggle, updateTfPreview);

tfPreviewTextarea?.addEventListener('input', () => {
  if (!tfPreview) return;
  updateTfCounter();
  const isError = tfPreview.classList.contains('textboxField--error') || tfPreview.classList.contains('textboxField--focus-error');
  if (!isError) tfPreview.classList.toggle('textboxField--filled', tfPreviewTextarea.value.length > 0);
});

tfPreviewTextarea?.addEventListener('focus', () => {
  if (!tfPreview) return;
  const state = tfStateSelect?.value || 'default';
  if (state === 'disabled') return;
  tfPreview.classList.add('textboxField--focus');
  if (state === 'error' || state === 'focus-error') tfPreview.classList.add('textboxField--focus-error');
});

tfPreviewTextarea?.addEventListener('blur', updateTfPreview);

updateTfPreview();
