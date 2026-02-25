document.addEventListener('DOMContentLoaded', () => {
    // STATE
    const state = {
        clientName: '',
        companyName: '',
        address: '',
        zipCity: '',
        quoteTitle: 'Offerte',
        quoteNumber: `OFF-${new Date().getFullYear()}-001`,
        quoteDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +14 days default
        introText: 'Hierbij ontvangt u de offerte voor de besproken diensten. Wij kijken ernaar uit om samen met u aan de slag te gaan.',
        items: [
            { id: 1, type: 'onetime', desc: 'Website Ontwikkeling', qty: 1, rate: 1250 },
            { id: 2, type: 'monthly', desc: 'Hosting & Onderhoud', qty: 1, rate: 25 }
        ],
        discountPercent: 0,
        selectedConditions: [1, 2, 3, 5], // Default selected IDs
        customConditions: [], // Manual additions
        closingText: 'Graag zien we uw akkoord tegemoet.\n\nOp al onze offertes en overeenkomsten zijn onze algemene voorwaarden van toepassing (zie: www.zee-zicht.nl/algemene-voorwaarden/). Door ondertekening van deze offerte gaat u hiermee akkoord.\n\nMocht u vragen hebben naar aanleiding van deze offerte, neem dan gerust contact met ons op.'
    };

    const CONDITIONS = [
        // ALGEMEEN
        { id: 4, category: 'Algemeen', text: 'De offerte is 14 dagen geldig na dagtekening.' },
        { id: 8, category: 'Algemeen', text: 'Bronbestanden en werkbestanden blijven eigendom van Zee-zicht Media.' },
        { id: 9, category: 'Algemeen', text: 'Oplevertermijnen zijn indicatief en afhankelijk van tijdige feedback/aanlevering.' },
        { id: 11, category: 'Algemeen', text: 'Werkzaamheden buiten scope worden uitgevoerd op basis van nacalculatie.' },
        { id: 13, category: 'Algemeen', text: 'Niet aansprakelijk voor schade door foutieve/onvolledige content van klant.' },
        { id: 14, category: 'Algemeen', text: 'Niet verantwoordelijk voor storingen bij externe partijen (hosting, plugins, API\'s).' },
        { id: 15, category: 'Algemeen', text: 'Klant ontvangt na oplevering en betaling alle toegang tot accounts/website.' },
        { id: 2, category: 'Algemeen', text: 'Marketing en SEO is niet inbegrepen bij de offerte, dit kan los worden afgenomen.' },
        { id: 5, category: 'Algemeen', text: 'Content (teksten/afbeeldingen) dient door de klant te worden aangeleverd.' },

        // WEBSITE
        { id: 1, category: 'Website', text: 'Website is na volledige betaling eigendom van de klant.' },
        { id: 3, category: 'Website', text: 'Inclusief 2 correctierondes op het design/ontwikkeling.' },
        { id: 6, category: 'Website', text: 'Hosting en domeinregistratie worden jaarlijks vooraf gefactureerd.' },
        { id: 7, category: 'Website', text: 'Exclusief kosten voor betaalde plugins, fonts of externe API\'s.' },
        { id: 10, category: 'Website', text: 'Tot 14 dagen na oplevering gratis correcties op bugs of fouten (nazorg).' },
        { id: 12, category: 'Website', text: 'Hosting & onderhoud omvat technische updates, geen inhoudelijke wijzigingen.' },

        // ADVERTENTIES
        { id: 16, category: 'Advertenties', text: 'Excl. advertentiebudget (wordt direct door Meta/Google van uw rekening afgeschreven).' },
        { id: 17, category: 'Advertenties', text: 'Minimale afname van advertentie-beheer is 3 maanden.' },
        { id: 18, category: 'Advertenties', text: 'Resultaten uit campagnes zijn mede afhankelijk van externe factoren en platform-wijzigingen.' },
        { id: 19, category: 'Advertenties', text: 'Klant dient toegang te verlenen tot het benodigde Advertentie-account en Business Manager.' },
        { id: 20, category: 'Advertenties', text: 'Advertentiecontent dient te voldoen aan het beleid van de betreffende platforms.' },
        { id: 21, category: 'Advertenties', text: 'Maandelijkse rapportage over de behaalde resultaten en optimalisaties.' }
    ];

    const TEMPLATES = {
        website: {
            themeColor: '#0891b2', // Cyan
            oneTimeTitle: 'Eenmalige investering',
            monthlyTitle: 'Jaarlijkse kosten (vooraf gefactureerd)',
            payTerms: 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.',
            items: [
                { id: 1, type: 'onetime', desc: 'Website Ontwikkeling', qty: 1, rate: 1250 },
                { id: 2, type: 'monthly', desc: 'Hosting & Onderhoud', qty: 1, rate: 25 }
            ],
            conditions: [4, 15, 1, 3, 5, 10]
        },
        advertisement: {
            themeColor: '#0891b2', // Back to Cyan
            oneTimeTitle: 'Kosten (eenmalig)',
            monthlyTitle: 'Kosten (maandelijks)',
            payTerms: 'Betalingstermijn: 50% vooraf en resterende na afloop van campagne.',
            items: [
                { id: 1, type: 'onetime', desc: 'Campagne Strategie & Set-up', qty: 1, rate: 450 },
                { id: 2, type: 'monthly', desc: 'Maandelijks Beheer & Optimalisatie', qty: 1, rate: 150 },
                { id: 3, type: 'onetime', desc: 'Tracking & Pixel Implementatie', qty: 1, rate: 150 }
            ],
            conditions: [4, 15, 16, 17, 18, 19, 20, 21] // IDs checked: 4(14d), 15(Access), 16-21(Ads specific)
        },
        custom: {
            themeColor: '#0891b2', // Back to Cyan
            oneTimeTitle: 'Eenmalige investering',
            monthlyTitle: 'Doorlopende kosten',
            payTerms: 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.',
            items: [],
            conditions: []
        }
    };

    // DOM ELEMENTS
    const form = {
        templateSelect: document.getElementById('templateSelect'),
        clientName: document.getElementById('clientName'),
        companyName: document.getElementById('companyName'),
        address: document.getElementById('address'),
        zipCity: document.getElementById('zipCity'),
        quoteTitle: document.getElementById('quoteTitle'),
        quoteNumber: document.getElementById('quoteNumber'),
        quoteDate: document.getElementById('quoteDate'),
        expiryDate: document.getElementById('expiryDate'),
        introText: document.getElementById('introText'),
        closingText: document.getElementById('closingText'),
        itemsContainer: document.getElementById('itemsContainer'),
        addItemBtn: document.getElementById('addItemBtn'),
        conditionsContainer: document.getElementById('conditionsContainer'),
        customConditionInput: document.getElementById('customConditionInput'),
        addCustomConditionBtn: document.getElementById('addCustomConditionBtn'),
        discountPercent: document.getElementById('discountPercent')
    };

    const preview = {
        client: document.getElementById('previewClient'),
        title: document.getElementById('previewTitle'),
        number: document.getElementById('previewNumber'),
        date: document.getElementById('previewDate'),
        expiry: document.getElementById('previewExpiry'),
        introText: document.getElementById('previewIntro'),
        tablesContainer: document.getElementById('previewTablesContainer'),
        conditionsContainer: document.getElementById('previewConditionsContainer'),
        closing: document.getElementById('previewClosing')
    };

    // INITIALIZE
    function init() {
        // Set initial form values from state
        form.clientName.value = state.clientName;
        form.companyName.value = state.companyName;
        form.address.value = state.address;
        form.zipCity.value = state.zipCity;
        form.quoteTitle.value = state.quoteTitle;
        form.quoteNumber.value = state.quoteNumber;
        form.quoteDate.value = state.quoteDate;
        form.expiryDate.value = state.expiryDate;
        form.introText.value = state.introText;
        form.closingText.value = state.closingText;
        form.templateSelect.value = 'website'; // Default starting template
        form.discountPercent.value = state.discountPercent;

        renderItems();
        renderConditions();
        updatePreview();
        setupListeners();
    }

    // EVENT LISTENERS
    function setupListeners() {
        // Text Inputs
        ['clientName', 'companyName', 'address', 'zipCity', 'quoteTitle', 'quoteNumber', 'quoteDate', 'expiryDate', 'introText', 'closingText', 'discountPercent'].forEach(key => {
            form[key].addEventListener('input', (e) => {
                state[key] = e.target.value;
                updatePreview();
            });
        });

        // Add Item Button
        form.addItemBtn.addEventListener('click', () => {
            addItem();
        });

        // Add Custom Condition
        form.addCustomConditionBtn.addEventListener('click', () => {
            addCustomCondition();
        });

        form.customConditionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addCustomCondition();
        });

        // Template Selection
        form.templateSelect.addEventListener('change', (e) => {
            if (confirm('Weet u zeker dat u een ander template wilt laden? Dit vervangt uw huidige regels.')) {
                applyTemplate(e.target.value);
            } else {
                // Reset select to current if cancelled (optional, but better UX)
            }
        });
    }

    // LOGIC
    function applyTemplate(type) {
        const template = TEMPLATES[type];
        if (!template) return;

        // Apply theme color
        document.documentElement.style.setProperty('--theme-accent', template.themeColor);

        // Clone items to avoid reference issues
        state.items = template.items.map(item => ({
            ...item,
            id: Date.now() + Math.random() // new unique IDs
        }));

        state.selectedConditions = [...template.conditions];
        state.customConditions = []; // Clear custom entries when switching templates

        renderItems();
        renderConditions();
        updatePreview();
    }

    function addItem() {
        const newItem = {
            id: Date.now(),
            type: 'onetime', // default
            desc: '',
            details: '',
            qty: 1,
            rate: 0
        };
        state.items.push(newItem);
        renderItems();
        updatePreview();
    }

    function removeItem(id) {
        state.items = state.items.filter(item => item.id !== id);
        renderItems();
        updatePreview();
    }

    function updateItem(id, key, value) {
        const item = state.items.find(i => i.id === id);
        if (item) {
            item[key] = (key === 'desc' || key === 'type' || key === 'details') ? value : parseFloat(value) || 0;
            updatePreview();
        }
    }

    function addCustomCondition() {
        const text = form.customConditionInput.value.trim();
        if (text) {
            const newCond = {
                id: `custom-${Date.now()}`,
                text: text
            };
            state.customConditions.push(newCond);
            form.customConditionInput.value = '';
            renderConditions();
            updatePreview();
        }
    }

    function removeCustomCondition(id) {
        state.customConditions = state.customConditions.filter(c => c.id !== id);
        renderConditions();
        updatePreview();
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    // RENDERERS
    function renderItems() {
        form.itemsContainer.innerHTML = '';
        state.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'line-item-row';
            div.innerHTML = `
                <div class="form-group">
                    <label>Type</label>
                    <select onchange="window.updateItemCtx(${item.id}, 'type', this.value)">
                        <option value="onetime" ${item.type === 'onetime' ? 'selected' : ''}>Eenmalig</option>
                        <option value="monthly" ${item.type === 'monthly' ? 'selected' : ''}>Maandelijks</option>
                        <option value="hourly" ${item.type === 'hourly' ? 'selected' : ''}>Uurbasis</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Omschrijving</label>
                    <input type="text" value="${item.desc}" oninput="window.updateItemCtx(${item.id}, 'desc', this.value)" placeholder="Dienst of product">
                </div>
                <div class="form-group">
                    <label>Aantal</label>
                    <input type="number" value="${item.qty}" oninput="window.updateItemCtx(${item.id}, 'qty', this.value)" step="0.5">
                </div>
                <div class="form-group">
                    <label>Tarief (€)</label>
                    <input type="number" value="${item.rate}" oninput="window.updateItemCtx(${item.id}, 'rate', this.value)">
                </div>
                <div class="form-group">
                     <button type="button" class="btn btn-danger" onclick="window.removeItemCtx(${item.id})" style="padding: 0.7rem; margin-top: auto;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                     </button>
                </div>
                <div class="form-group" style="grid-column: 1 / -1; margin-top: 0.5rem; margin-bottom: 0 !important;">
                    <label>Specificaties (optioneel, één per regel)</label>
                    <textarea rows="2" placeholder="- Specificatie 1\n- Specificatie 2" oninput="window.updateItemCtx(${item.id}, 'details', this.value)" style="font-size: 0.85rem;">${item.details || ''}</textarea>
                </div>
            `;
            form.itemsContainer.appendChild(div);
        });
    }

    function renderConditions() {
        form.conditionsContainer.innerHTML = '';

        // Group Predefined by category
        const categories = ['Algemeen', 'Website', 'Advertenties'];
        categories.forEach(cat => {
            const catConditions = CONDITIONS.filter(c => c.category === cat);
            if (catConditions.length > 0) {
                const header = document.createElement('h4');
                header.style.fontSize = '0.75rem';
                header.style.marginTop = '1rem';
                header.style.marginBottom = '0.5rem';
                header.style.color = 'var(--deep-teal)';
                header.style.textTransform = 'uppercase';
                header.textContent = cat;
                form.conditionsContainer.appendChild(header);

                catConditions.forEach(cond => {
                    const isChecked = state.selectedConditions.includes(cond.id);
                    const label = document.createElement('label');
                    label.className = 'condition-checkbox-label';
                    label.innerHTML = `
                        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="window.toggleConditionCtx(${cond.id})">
                        <span>${cond.text}</span>
                    `;
                    form.conditionsContainer.appendChild(label);
                });
            }
        });

        // Custom section header if any
        if (state.customConditions.length > 0) {
            const header = document.createElement('h4');
            header.style.fontSize = '0.75rem';
            header.style.marginTop = '1rem';
            header.style.marginBottom = '0.5rem';
            header.style.color = 'var(--deep-teal)';
            header.style.textTransform = 'uppercase';
            header.textContent = 'Eigen Afspraken';
            form.conditionsContainer.appendChild(header);
        }

        // Custom items
        state.customConditions.forEach(cond => {
            const div = document.createElement('div');
            div.className = 'condition-item';
            div.innerHTML = `
                <label class="condition-checkbox-label" style="flex:1">
                    <input type="checkbox" checked disabled>
                    <span>${cond.text}</span>
                </label>
                <button type="button" class="remove-condition-btn" onclick="window.removeCustomConditionCtx('${cond.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            form.conditionsContainer.appendChild(div);
        });
    }

    function toggleCondition(id) {
        if (state.selectedConditions.includes(id)) {
            state.selectedConditions = state.selectedConditions.filter(cid => cid !== id);
        } else {
            state.selectedConditions.push(id);
        }
        updatePreview();
    }

    // Global context helpers
    window.updateItemCtx = updateItem;
    window.removeItemCtx = removeItem;
    window.toggleConditionCtx = toggleCondition;
    window.removeCustomConditionCtx = removeCustomCondition;

    function generateTableHtml(title, items, isMonthly = false, customNote = null) {
        if (items.length === 0) return '';

        let subtotal = 0;
        let rowsHtml = '';

        items.forEach(item => {
            // multipliers: monthly = 12, hourly = 1 (just qty * rate), onetime = 1
            const multiplier = isMonthly ? 12 : 1;
            const lineTotal = item.qty * item.rate * multiplier;
            subtotal += lineTotal;

            // Format rate display
            let rateDisplay = formatCurrency(item.rate);
            if (isMonthly) rateDisplay += ' p/m';
            if (item.type === 'hourly') rateDisplay += ' p/u';

            let detailsHtml = '';
            if (item.details && item.details.trim() !== '') {
                const bulletLines = item.details.split('\n').filter(line => line.trim() !== '');
                if (bulletLines.length > 0) {
                    const bullets = bulletLines.map(line => `<li>${line.startsWith('-') ? line.substring(1).trim() : line}</li>`).join('');
                    detailsHtml = `<ul style="margin-top: 0.4rem; margin-bottom: 0; padding-left: 1.2rem; font-size: 0.85rem; color: var(--slate-text);">${bullets}</ul>`;
                }
            }

            rowsHtml += `
                <tr>
                    <td>
                        <div style="font-weight: 500;">${item.desc || '-'}</div>
                        ${detailsHtml}
                    </td>
                    <td class="text-center">${item.qty}</td>
                    <td class="text-right">${rateDisplay}</td>
                    <td class="text-right">${formatCurrency(lineTotal)}</td>
                </tr>
            `;
        });

        const discountEnabled = state.discountPercent > 0;
        const discountAmount = subtotal * (state.discountPercent / 100);
        const subtotalAfterDiscount = subtotal - discountAmount;
        const vat = subtotalAfterDiscount * 0.21;
        const total = subtotalAfterDiscount + vat;

        let discountRowHtml = '';
        if (discountEnabled) {
            discountRowHtml = `
                <tr class="summary-row">
                    <td colspan="3" class="text-right">Korting (${state.discountPercent}%)</td>
                    <td class="text-right">-${formatCurrency(discountAmount)}</td>
                </tr>
            `;
        }

        let footerNote = '';
        if (isMonthly) {
            footerNote = '<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">* Facturatie per jaar vooruit. Bij tussentijdse opzegging wordt het teveel betaalde bedrag gerestitueerd.</p>';
        } else {
            const note = customNote || 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.';
            footerNote = `<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">* ${note}</p>`;
        }

        return `
            <div class="quote-section">
                <h3 class="section-title">${title}</h3>
                <table class="quote-table">
                    <thead>
                        <tr>
                            <th class="col-desc">Omschrijving</th>
                            <th class="col-qty">Aantal</th>
                            <th class="col-rate">Tarief</th>
                            <th class="col-total">${isMonthly ? 'Totaal (12 mnd)' : 'Totaal'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                    <tfoot>
                        <tr class="summary-row">
                            <td colspan="3" class="text-right">Subtotaal</td>
                            <td class="text-right">${formatCurrency(subtotal)}</td>
                        </tr>
                        ${discountRowHtml}
                        <tr class="summary-row">
                            <td colspan="3" class="text-right">BTW (21%)</td>
                            <td class="text-right">${formatCurrency(vat)}</td>
                        </tr>
                         <tr class="total-row">
                            <td colspan="3" class="text-right">Totaal</td>
                            <td class="text-right" style="color:var(--theme-accent)">${formatCurrency(total)}</td>
                        </tr>
                    </tfoot>
                </table>
                ${footerNote}
            </div>
        `;
    }

    function updatePreview() {
        // Client Info
        const clientHtml = [
            state.companyName ? `<strong>${state.companyName}</strong>` : '',
            state.clientName ? `t.a.v. ${state.clientName}` : '',
            state.address,
            state.zipCity
        ].filter(Boolean).join('<br>') || '<span class="placeholder" style="color:#ccc">Klantgegevens verschijnen hier...</span>';

        preview.client.innerHTML = clientHtml;

        // Meta
        preview.title.textContent = state.quoteTitle || 'Offerte';
        preview.number.textContent = state.quoteNumber || '-';
        preview.date.textContent = formatDate(state.quoteDate);
        preview.expiry.textContent = formatDate(state.expiryDate);

        // Split items
        const oneTimeItems = state.items.filter(i => i.type === 'onetime' || i.type === 'hourly');
        const monthlyItems = state.items.filter(i => i.type === 'monthly');

        // Generate Tables
        let html = '';
        const currentTemplate = TEMPLATES[form.templateSelect.value] || TEMPLATES.custom;

        html += generateTableHtml(currentTemplate.oneTimeTitle, oneTimeItems, false, currentTemplate.payTerms);
        html += generateTableHtml(currentTemplate.monthlyTitle, monthlyItems, true);

        preview.tablesContainer.innerHTML = html;

        // Intro Text
        const safeIntro = (state.introText || '')
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");
        preview.introText.innerHTML = safeIntro;

        // Conditions
        if (state.selectedConditions.length > 0 || state.customConditions.length > 0) {
            const predefinedText = CONDITIONS
                .filter(c => state.selectedConditions.includes(c.id))
                .map(c => `<li>${c.text}</li>`)
                .join('');

            const customText = state.customConditions
                .map(c => `<li>${c.text}</li>`)
                .join('');

            preview.conditionsContainer.innerHTML = `
                <h4>Aanvullende afspraken</h4>
                <ul>${predefinedText}${customText}</ul>
            `;
        } else {
            preview.conditionsContainer.innerHTML = '';
        }

        // Closing
        // 1. Escape HTML
        const safeText = state.closingText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // 2. Linkify URLs (simple regex that avoids trailing parenthesis)
        const linkedText = safeText.replace(
            /((https?:\/\/|www\.)[^\s)]+)/g,
            (url) => {
                const href = url.startsWith('http') ? url : `https://${url}`;
                return `<a href="${href}" target="_blank" style="text-decoration:underline; color:inherit;">${url}</a>`;
            }
        );

        preview.closing.innerHTML = linkedText;
    }

    // PRINT HANDLER
    window.printQuote = function () {
        const originalTitle = document.title;
        const client = state.companyName || state.clientName || 'Klant';
        const docTitle = state.quoteTitle || 'Offerte';
        const number = state.quoteNumber || 'Concept';

        // Sanitize filename (remove special chars)
        const safeClient = client.replace(/[^a-z0-9\s-]/gi, '').trim();
        const safeDocTitle = docTitle.replace(/[^a-z0-9\s-]/gi, '').trim();
        const safeNumber = number.replace(/[^a-z0-9\s-]/gi, '').trim();

        document.title = `${safeDocTitle} ${safeClient} - ${safeNumber}`;

        window.print();

        // Restore title after a small delay to ensure print dialog picked it up
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    };

    init();
});
