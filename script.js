document.addEventListener('DOMContentLoaded', () => {
    const I18N = {
        nl: {
            editorTitle: 'Offerte Editor', downloadPdf: 'Download PDF', typeQuote: 'Type Offerte', 
            selectTemplate: 'Selecteer een basis-template', templateWebsite: 'Nieuwe Website', 
            templateAds: 'Advertentiecampagne (Ads)', templateCustom: 'Lege Offerte (Handmatig)', 
            templateWarning: '* Let op: het wisselen van template vervangt de huidige regels en voorwaarden.', 
            clientDetails: 'Klantgegevens', contactName: 'Naam contactpersoon', contactNamePh: 'Bijv. Jan Jansen', 
            companyName: 'Bedrijfsnaam', companyNamePh: 'Bijv. Bedrijf B.V.', address: 'Adres', addressPh: 'Straatnaam 123', 
            zipCity: 'Postcode & Plaats', zipCityPh: '1234 AB Plaats', quoteDetails: 'Offerte Details', introTextLab: 'Inleidende tekst', 
            documentTitle: 'Document Titel', documentTitlePh: 'Bijv. Offerte, Projectvoorstel', quoteNumber: 'Offertenummer', 
            date: 'Datum', validUntil: 'Geldig tot', validUntilPrev: 'Geldig tot', servicesProducts: 'Diensten / Producten', 
            addLine: '+ Regel toevoegen', discount: 'Korting (%)', conditionsLabel: 'Afspraken & Voorwaarden', 
            ownCondition: 'Eigen afspraak toevoegen...', addBtn: 'Toevoegen', closingTerms: 'Afsluiting & Voorwaarden', 
            closingTextLab: 'Afsluitende tekst', to: 'Aan', number: 'Nummer', additionalAgreements: 'Aanvullende afspraken', 
            declarationOfAgreement: 'Akkoordverklaring', signature: 'Handtekening', colDesc: 'Omschrijving', colQty: 'Aantal', 
            colRate: 'Tarief', colTotal: 'Totaal', colTotal12: 'Totaal (12 mnd)', subtotal: 'Subtotaal', vat: 'BTW (21%)', 
            total: 'Totaal', typeLabel: 'Type', onetime: 'Eenmalig', monthly: 'Maandelijks', hourly: 'Uurbasis', 
            qtyLabel: 'Aantal', rateEuro: 'Tarief (€)', specsOpt: 'Specificaties (optioneel, één per regel)', 
            defaultIntro: 'Hierbij ontvangt u de offerte voor de besproken diensten. Wij kijken ernaar uit om samen met u aan de slag te gaan.', 
            defaultClosing: 'Graag zien we uw akkoord tegemoet.\n\nOp al onze offertes en overeenkomsten zijn onze algemene voorwaarden van toepassing (zie: www.zee-zicht.nl/algemene-voorwaarden/). Door ondertekening van deze offerte gaat u hiermee akkoord.\n\nMocht u vragen hebben naar aanleiding van deze offerte, neem dan gerust contact met ons op.', 
            switchLangConfirm: 'Wisselen van taal herstelt de standaardteksten voor dit template. Doorgaan?', 
            switchTemplateConfirm: 'Weet u zeker dat u een ander template wilt laden? Dit vervangt uw huidige regels.',
            monthlyFootnote: '* Facturatie per jaar vooruit. Bij tussentijdse opzegging wordt het teveel betaalde bedrag gerestitueerd.', 
            catGeneral: 'Algemeen', catWebsite: 'Website', catAds: 'Advertenties', catCustom: 'Eigen Afspraken', quoteDefaultTitle: 'Offerte',
            includeVatLabel: 'Bereken 21% BTW'
        },
        en: {
            editorTitle: 'Quote Editor', downloadPdf: 'Download PDF', typeQuote: 'Quote Type', 
            selectTemplate: 'Select a base template', templateWebsite: 'New Website', 
            templateAds: 'Advertising Campaign (Ads)', templateCustom: 'Blank Quote (Manual)', 
            templateWarning: '* Note: switching templates will replace current lines and conditions.', 
            clientDetails: 'Client Details', contactName: 'Contact Person Name', contactNamePh: 'E.g. John Doe', 
            companyName: 'Company Name', companyNamePh: 'E.g. Company Ltd.', address: 'Address', addressPh: 'Street Name 123', 
            zipCity: 'Zip Code & City', zipCityPh: '1234 AB City', quoteDetails: 'Quote Details', introTextLab: 'Introductory text', 
            documentTitle: 'Document Title', documentTitlePh: 'E.g. Quote, Project Proposal', quoteNumber: 'Quote Number', 
            date: 'Date', validUntil: 'Valid until', validUntilPrev: 'Valid until', servicesProducts: 'Services / Products', 
            addLine: '+ Add Line', discount: 'Discount (%)', conditionsLabel: 'Agreements & Conditions', 
            ownCondition: 'Add own condition...', addBtn: 'Add', closingTerms: 'Closing & Conditions', 
            closingTextLab: 'Closing text', to: 'To', number: 'Number', additionalAgreements: 'Additional agreements', 
            declarationOfAgreement: 'Declaration of Agreement', signature: 'Signature', colDesc: 'Description', colQty: 'Qty', 
            colRate: 'Rate', colTotal: 'Total', colTotal12: 'Total (12 mo)', subtotal: 'Subtotal', vat: 'VAT (21%)', 
            total: 'Total', typeLabel: 'Type', onetime: 'One-time', monthly: 'Monthly', hourly: 'Hourly', 
            qtyLabel: 'Qty', rateEuro: 'Rate (€)', specsOpt: 'Specifications (optional, one per line)', 
            defaultIntro: 'Please find enclosed the quote for the discussed services. We look forward to working with you.', 
            defaultClosing: 'We look forward to receiving your approval.\n\nAll our quotes and agreements are subject to our general terms and conditions (see: www.zee-zicht.nl/algemene-voorwaarden/). By signing this quote, you agree to these terms.\n\nIf you have any questions regarding this quote, please feel free to contact us.', 
            switchLangConfirm: 'Switching language will reset the default template texts. Continue?', 
            switchTemplateConfirm: 'Are you sure you want to load a different template? This will replace your current lines.',
            monthlyFootnote: '* Invoiced annually in advance. In case of early termination, the overpaid amount will be refunded.', 
            catGeneral: 'General', catWebsite: 'Website', catAds: 'Advertising', catCustom: 'Custom Agreements', quoteDefaultTitle: 'Quote',
            includeVatLabel: 'Calculate 21% VAT'
        }
    };

    // STATE
    const state = {
        language: 'nl',
        clientName: '',
        companyName: '',
        address: '',
        zipCity: '',
        quoteTitle: 'Offerte',
        quoteNumber: `OFF-${new Date().getFullYear()}-001`,
        quoteDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +14 days default
        introText: I18N.nl.defaultIntro,
        items: [
            { id: 1, type: 'onetime', desc: 'Website Ontwikkeling', qty: 1, rate: 1250 },
            { id: 2, type: 'monthly', desc: 'Hosting & Onderhoud', qty: 1, rate: 25 }
        ],
        discountPercent: 0,
        includeVat: true,
        selectedConditions: [1, 2, 3, 5], // Default selected IDs
        customConditions: [], // Manual additions
        closingText: I18N.nl.defaultClosing
    };

    const CONDITIONS = [
        // ALGEMEEN
        { id: 4, category: 'Algemeen', text_nl: 'De offerte is 14 dagen geldig na dagtekening.', text_en: 'The quote is valid for 14 days after the date of issue.' },
        { id: 8, category: 'Algemeen', text_nl: 'Bronbestanden en werkbestanden blijven eigendom van Zee-zicht Media.', text_en: 'Source files and working files remain the property of Zee-zicht Media.' },
        { id: 9, category: 'Algemeen', text_nl: 'Oplevertermijnen zijn indicatief en afhankelijk van tijdige feedback/aanlevering.', text_en: 'Delivery times are indicative and depend on timely feedback/delivery.' },
        { id: 11, category: 'Algemeen', text_nl: 'Werkzaamheden buiten scope worden uitgevoerd op basis van nacalculatie.', text_en: 'Work outside the scope is performed on an actual costing basis.' },
        { id: 13, category: 'Algemeen', text_nl: 'Niet aansprakelijk voor schade door foutieve/onvolledige content van klant.', text_en: 'Not liable for damage due to incorrect/incomplete content provided by the client.' },
        { id: 14, category: 'Algemeen', text_nl: 'Niet verantwoordelijk voor storingen bij externe partijen (hosting, plugins, API\'s).', text_en: 'Not responsible for disruptions at external parties (hosting, plugins, APIs).' },
        { id: 15, category: 'Algemeen', text_nl: 'Klant ontvangt na oplevering en betaling alle toegang tot accounts/website.', text_en: 'Client receives full access to accounts/website after delivery and payment.' },
        { id: 2, category: 'Algemeen', text_nl: 'Marketing en SEO is niet inbegrepen bij de offerte, dit kan los worden afgenomen.', text_en: 'Marketing and SEO are not included in the quote, these can be purchased separately.' },
        { id: 5, category: 'Algemeen', text_nl: 'Content (teksten/afbeeldingen) dient door de klant te worden aangeleverd.', text_en: 'Content (texts/images) must be provided by the client.' },

        // WEBSITE
        { id: 1, category: 'Website', text_nl: 'Website is na volledige betaling eigendom van de klant.', text_en: 'Website becomes property of the client after full payment.' },
        { id: 3, category: 'Website', text_nl: 'Inclusief 2 correctierondes op het design/ontwikkeling.', text_en: 'Includes 2 revision rounds on design/development.' },
        { id: 6, category: 'Website', text_nl: 'Hosting en domeinregistratie worden jaarlijks vooraf gefactureerd.', text_en: 'Hosting and domain registration are billed annually in advance.' },
        { id: 7, category: 'Website', text_nl: 'Exclusief kosten voor betaalde plugins, fonts of externe API\'s.', text_en: 'Excluding costs for paid plugins, fonts or external APIs.' },
        { id: 10, category: 'Website', text_nl: 'Tot 14 dagen na oplevering gratis correcties op bugs of fouten (nazorg).', text_en: 'Up to 14 days after delivery free corrections on bugs or errors (aftercare).' },
        { id: 12, category: 'Website', text_nl: 'Hosting & onderhoud omvat technische updates, geen inhoudelijke wijzigingen.', text_en: 'Hosting & maintenance includes technical updates, not content changes.' },

        // ADVERTENTIES
        { id: 16, category: 'Advertenties', text_nl: 'Excl. advertentiebudget (wordt direct door Meta/Google van uw rekening afgeschreven).', text_en: 'Excl. advertising budget (is transferred directly from your account by Meta/Google).' },
        { id: 17, category: 'Advertenties', text_nl: 'Minimale afname van advertentie-beheer is 3 maanden.', text_en: 'Minimum term for advertisement management is 3 months.' },
        { id: 18, category: 'Advertenties', text_nl: 'Resultaten uit campagnes zijn mede afhankelijk van externe factoren en platform-wijzigingen.', text_en: 'Campaign results also depend on external factors and platform changes.' },
        { id: 19, category: 'Advertenties', text_nl: 'Klant dient toegang te verlenen tot het benodigde Advertentie-account en Business Manager.', text_en: 'Client must provide access to the required Ad account and Business Manager.' },
        { id: 20, category: 'Advertenties', text_nl: 'Advertentiecontent dient te voldoen aan het beleid van de betreffende platforms.', text_en: 'Ad content must comply with the policies of the respective platforms.' },
        { id: 21, category: 'Advertenties', text_nl: 'Maandelijkse rapportage over de behaalde resultaten en optimalisaties.', text_en: 'Monthly reporting on achieved results and optimizations.' }
    ];

    const TEMPLATES = {
        website: {
            themeColor: '#0891b2', // Cyan
            oneTimeTitle_nl: 'Eenmalige investering',
            oneTimeTitle_en: 'One-time investment',
            monthlyTitle_nl: 'Jaarlijkse kosten (vooraf gefactureerd)',
            monthlyTitle_en: 'Annual costs (billed in advance)',
            payTerms_nl: 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.',
            payTerms_en: 'Payment terms: 50% upon agreement, 50% upon delivery.',
            items_nl: [
                { id: 1, type: 'onetime', desc: 'Website Ontwikkeling', qty: 1, rate: 1250 },
                { id: 2, type: 'monthly', desc: 'Hosting & Onderhoud', qty: 1, rate: 25 }
            ],
            items_en: [
                { id: 1, type: 'onetime', desc: 'Website Development', qty: 1, rate: 1250 },
                { id: 2, type: 'monthly', desc: 'Hosting & Maintenance', qty: 1, rate: 25 }
            ],
            conditions: [4, 15, 1, 3, 5, 10]
        },
        advertisement: {
            themeColor: '#0891b2', // Back to Cyan
            oneTimeTitle_nl: 'Kosten (eenmalig)',
            oneTimeTitle_en: 'Costs (one-time)',
            monthlyTitle_nl: 'Kosten (maandelijks)',
            monthlyTitle_en: 'Costs (monthly)',
            payTerms_nl: 'Betalingstermijn: 50% vooraf en resterende na afloop van campagne.',
            payTerms_en: 'Payment terms: 50% in advance and remainder after campaign.',
            items_nl: [
                { id: 1, type: 'onetime', desc: 'Campagne Strategie & Set-up', qty: 1, rate: 450 },
                { id: 2, type: 'monthly', desc: 'Maandelijks Beheer & Optimalisatie', qty: 1, rate: 150 },
                { id: 3, type: 'onetime', desc: 'Tracking & Pixel Implementatie', qty: 1, rate: 150 }
            ],
            items_en: [
                { id: 1, type: 'onetime', desc: 'Campaign Strategy & Setup', qty: 1, rate: 450 },
                { id: 2, type: 'monthly', desc: 'Monthly Management & Optimization', qty: 1, rate: 150 },
                { id: 3, type: 'onetime', desc: 'Tracking & Pixel Implementation', qty: 1, rate: 150 }
            ],
            conditions: [4, 15, 16, 17, 18, 19, 20, 21] // IDs checked: 4(14d), 15(Access), 16-21(Ads specific)
        },
        custom: {
            themeColor: '#0891b2', // Back to Cyan
            oneTimeTitle_nl: 'Eenmalige investering',
            oneTimeTitle_en: 'One-time investment',
            monthlyTitle_nl: 'Doorlopende kosten',
            monthlyTitle_en: 'Ongoing costs',
            payTerms_nl: 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.',
            payTerms_en: 'Payment terms: 50% upon agreement, 50% upon delivery.',
            items_nl: [],
            items_en: [],
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
        discountPercent: document.getElementById('discountPercent'),
        includeVat: document.getElementById('includeVat'),
        langSelect: document.getElementById('langSelect')
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
        if(form.includeVat) form.includeVat.checked = state.includeVat;
        if(form.langSelect) form.langSelect.value = state.language;

        applyTranslations(); // Set initial lang texts
        renderItems();
        renderConditions();
        updatePreview();
        setupListeners();
    }

    function applyTranslations() {
        const t = I18N[state.language];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'OPTION') el.textContent = t[key];
                else el.innerHTML = t[key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.setAttribute('placeholder', t[key]);
        });
        renderConditions();
        renderItems();
        updatePreview();
    }

    // EVENT LISTENERS
    function setupListeners() {
        if (form.langSelect) {
            form.langSelect.addEventListener('change', (e) => {
                if (confirm(I18N[state.language].switchLangConfirm)) {
                    state.language = e.target.value;
                    applyTranslations();
                    applyTemplate(form.templateSelect.value, false);
                } else {
                    e.target.value = state.language;
                }
            });
        }

        // Text Inputs
        ['clientName', 'companyName', 'address', 'zipCity', 'quoteTitle', 'quoteNumber', 'quoteDate', 'expiryDate', 'introText', 'closingText', 'discountPercent'].forEach(key => {
            form[key].addEventListener('input', (e) => {
                state[key] = e.target.value;
                updatePreview();
            });
        });

        if (form.includeVat) {
            form.includeVat.addEventListener('change', (e) => {
                state.includeVat = e.target.checked;
                updatePreview();
            });
        }

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
            if (confirm(I18N[state.language].switchTemplateConfirm)) {
                applyTemplate(e.target.value, false);
            } else {
                // Reset select to current if cancelled (optional, but better UX)
            }
        });
    }

    // LOGIC
    function applyTemplate(type, keepCustomText=false) {
        const template = TEMPLATES[type];
        if (!template) return;

        // Apply theme color
        document.documentElement.style.setProperty('--theme-accent', template.themeColor);

        // Clone items to avoid reference issues
        const itemsToClone = state.language === 'en' ? template.items_en : template.items_nl;
        state.items = itemsToClone.map(item => ({
            ...item,
            id: Date.now() + Math.random() // new unique IDs
        }));

        state.selectedConditions = [...template.conditions];
        state.customConditions = []; // Clear custom entries when switching templates

        if (!keepCustomText) {
            state.quoteTitle = I18N[state.language].quoteDefaultTitle;
            state.introText = I18N[state.language].defaultIntro;
            state.closingText = I18N[state.language].defaultClosing;
            form.quoteTitle.value = state.quoteTitle;
            form.introText.value = state.introText;
            form.closingText.value = state.closingText;
        }

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
                text: text // For custom conditions, we keep it same for both languages, since user types it. Or we could store it as text_nl and text_en. We'll store it in text_nl to align with preview.
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
                    <label>${I18N[state.language].typeLabel}</label>
                    <select onchange="window.updateItemCtx(${item.id}, 'type', this.value)">
                        <option value="onetime" ${item.type === 'onetime' ? 'selected' : ''}>${I18N[state.language].onetime}</option>
                        <option value="monthly" ${item.type === 'monthly' ? 'selected' : ''}>${I18N[state.language].monthly}</option>
                        <option value="hourly" ${item.type === 'hourly' ? 'selected' : ''}>${I18N[state.language].hourly}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>${I18N[state.language].colDesc}</label>
                    <input type="text" value="${item.desc}" oninput="window.updateItemCtx(${item.id}, 'desc', this.value)" placeholder="${I18N[state.language].colDesc}">
                </div>
                <div class="form-group">
                    <label>${I18N[state.language].qtyLabel}</label>
                    <input type="number" value="${item.qty}" oninput="window.updateItemCtx(${item.id}, 'qty', this.value)" step="0.5">
                </div>
                <div class="form-group">
                    <label>${I18N[state.language].rateEuro}</label>
                    <input type="number" value="${item.rate}" oninput="window.updateItemCtx(${item.id}, 'rate', this.value)">
                </div>
                <div class="form-group">
                     <button type="button" class="btn btn-danger" onclick="window.removeItemCtx(${item.id})" style="padding: 0.7rem; margin-top: auto;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                     </button>
                </div>
                <div class="form-group" style="grid-column: 1 / -1; margin-top: 0.5rem; margin-bottom: 0 !important;">
                    <label>${I18N[state.language].specsOpt}</label>
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
                const catKey = cat === 'Algemeen' ? 'catGeneral' : (cat === 'Website' ? 'catWebsite' : 'catAds');
                header.textContent = I18N[state.language][catKey] || cat;
                form.conditionsContainer.appendChild(header);

                catConditions.forEach(cond => {
                    const isChecked = state.selectedConditions.includes(cond.id);
                    const label = document.createElement('label');
                    label.className = 'condition-checkbox-label';
                    label.innerHTML = `
                        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="window.toggleConditionCtx(${cond.id})">
                        <span>${state.language === 'en' ? (cond.text_en || cond.text_nl) : cond.text_nl}</span>
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
            header.textContent = I18N[state.language].catCustom;
            form.conditionsContainer.appendChild(header);
        }

        // Custom items
        state.customConditions.forEach(cond => {
            const div = document.createElement('div');
            div.className = 'condition-item';
            div.innerHTML = `
                <label class="condition-checkbox-label" style="flex:1">
                    <input type="checkbox" checked disabled>
                    <span>${cond.text || cond.text_nl}</span>
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
        const t = I18N[state.language];

        let subtotal = 0;
        let rowsHtml = '';

        items.forEach(item => {
            // multipliers: monthly = 12, hourly = 1 (just qty * rate), onetime = 1
            const multiplier = isMonthly ? 12 : 1;
            const lineTotal = item.qty * item.rate * multiplier;
            subtotal += lineTotal;

            // Format rate display
            let rateDisplay = formatCurrency(item.rate);
            if (isMonthly) rateDisplay += (state.language === 'en' ? ' /mo' : ' p/m');
            if (item.type === 'hourly') rateDisplay += (state.language === 'en' ? ' /hr' : ' p/u');

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
        const vat = state.includeVat ? subtotalAfterDiscount * 0.21 : 0;
        const total = subtotalAfterDiscount + vat;

        let discountRowHtml = '';
        if (discountEnabled) {
            discountRowHtml = `
                <tr class="summary-row">
                    <td colspan="3" class="text-right">${t.discount} (${state.discountPercent}%)</td>
                    <td class="text-right">-${formatCurrency(discountAmount)}</td>
                </tr>
            `;
        }

        let vatRowHtml = '';
        if (state.includeVat) {
            vatRowHtml = `
                <tr class="summary-row">
                    <td colspan="3" class="text-right">${t.vat}</td>
                    <td class="text-right">${formatCurrency(vat)}</td>
                </tr>
            `;
        }

        let footerNote = '';
        if (isMonthly) {
            footerNote = `<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">${t.monthlyFootnote}</p>`;
        } else {
            const note = customNote || (state.language === 'en' ? 'Payment terms: 50% upon agreement, 50% upon delivery.' : 'Betalingstermijn: 50% bij akkoord, 50% bij oplevering.');
            footerNote = `<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">* ${note}</p>`;
        }

        return `
            <div class="quote-section">
                <h3 class="section-title">${title}</h3>
                <table class="quote-table">
                    <thead>
                        <tr>
                            <th class="col-desc">${t.colDesc}</th>
                            <th class="col-qty">${t.colQty}</th>
                            <th class="col-rate">${t.colRate}</th>
                            <th class="col-total">${isMonthly ? t.colTotal12 : t.colTotal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                    <tfoot>
                        <tr class="summary-row">
                            <td colspan="3" class="text-right">${t.subtotal}</td>
                            <td class="text-right">${formatCurrency(subtotal)}</td>
                        </tr>
                        ${discountRowHtml}
                        ${vatRowHtml}
                         <tr class="total-row">
                            <td colspan="3" class="text-right">${t.total}</td>
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
            state.clientName ? `${state.language === 'en' ? 'attn.' : 't.a.v.'} ${state.clientName}` : '',
            state.address,
            state.zipCity
        ].filter(Boolean).join('<br>') || `<span class="placeholder" style="color:#ccc">${state.language === 'en' ? 'Client details will appear here...' : 'Klantgegevens verschijnen hier...'}</span>`;

        preview.client.innerHTML = clientHtml;

        // Meta
        preview.title.textContent = state.quoteTitle || I18N[state.language].quoteDefaultTitle;
        preview.number.textContent = state.quoteNumber || '-';
        preview.date.textContent = formatDate(state.quoteDate);
        preview.expiry.textContent = formatDate(state.expiryDate);

        // Split items
        const oneTimeItems = state.items.filter(i => i.type === 'onetime' || i.type === 'hourly');
        const monthlyItems = state.items.filter(i => i.type === 'monthly');

        // Generate Tables
        let html = '';
        const currentTemplate = TEMPLATES[form.templateSelect.value] || TEMPLATES.custom;
        const oneTimeTitle = state.language === 'en' ? currentTemplate.oneTimeTitle_en : currentTemplate.oneTimeTitle_nl;
        const monthlyTitle = state.language === 'en' ? currentTemplate.monthlyTitle_en : currentTemplate.monthlyTitle_nl;
        const payTerms = state.language === 'en' ? currentTemplate.payTerms_en : currentTemplate.payTerms_nl;

        html += generateTableHtml(oneTimeTitle, oneTimeItems, false, payTerms);
        html += generateTableHtml(monthlyTitle, monthlyItems, true);

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
                .map(c => `<li>${state.language === 'en' ? (c.text_en || c.text_nl) : c.text_nl}</li>`)
                .join('');

            const customText = state.customConditions
                .map(c => `<li>${c.text || c.text_nl}</li>`)
                .join('');

            preview.conditionsContainer.innerHTML = `
                <h4>${I18N[state.language].additionalAgreements}</h4>
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
        const docTitle = state.quoteTitle || I18N[state.language].quoteDefaultTitle;
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
