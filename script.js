document.addEventListener('DOMContentLoaded', () => {
    // STATE
    const state = {
        clientName: '',
        companyName: '',
        address: '',
        zipCity: '',
        quoteNumber: `OFF-${new Date().getFullYear()}-001`,
        quoteDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +14 days default
        items: [
            { id: 1, type: 'onetime', desc: 'Website Ontwikkeling', qty: 1, rate: 1250 },
            { id: 2, type: 'monthly', desc: 'Hosting & Onderhoud', qty: 1, rate: 25 }
        ],
        closingText: 'Graag zien we uw akkoord tegemoet.\n\nOp al onze offertes en overeenkomsten zijn onze algemene voorwaarden van toepassing. Door ondertekening van deze offerte gaat u hiermee akkoord.\n\nMocht u vragen hebben naar aanleiding van deze offerte, neem dan gerust contact met ons op.'
    };

    // DOM ELEMENTS
    const form = {
        clientName: document.getElementById('clientName'),
        companyName: document.getElementById('companyName'),
        address: document.getElementById('address'),
        zipCity: document.getElementById('zipCity'),
        quoteNumber: document.getElementById('quoteNumber'),
        quoteDate: document.getElementById('quoteDate'),
        expiryDate: document.getElementById('expiryDate'),
        closingText: document.getElementById('closingText'),
        itemsContainer: document.getElementById('itemsContainer'),
        addItemBtn: document.getElementById('addItemBtn')
    };

    const preview = {
        client: document.getElementById('previewClient'),
        number: document.getElementById('previewNumber'),
        date: document.getElementById('previewDate'),
        expiry: document.getElementById('previewExpiry'),
        tablesContainer: document.getElementById('previewTablesContainer'),
        closing: document.getElementById('previewClosing')
    };

    // INITIALIZE
    function init() {
        // Set initial form values from state
        form.clientName.value = state.clientName;
        form.companyName.value = state.companyName;
        form.address.value = state.address;
        form.zipCity.value = state.zipCity;
        form.quoteNumber.value = state.quoteNumber;
        form.quoteDate.value = state.quoteDate;
        form.expiryDate.value = state.expiryDate;
        form.closingText.value = state.closingText;

        renderItems();
        updatePreview();
        setupListeners();
    }

    // EVENT LISTENERS
    function setupListeners() {
        // Text Inputs
        ['clientName', 'companyName', 'address', 'zipCity', 'quoteNumber', 'quoteDate', 'expiryDate', 'closingText'].forEach(key => {
            form[key].addEventListener('input', (e) => {
                state[key] = e.target.value;
                updatePreview();
            });
        });

        // Add Item Button
        form.addItemBtn.addEventListener('click', () => {
            addItem();
        });
    }

    // LOGIC
    function addItem() {
        const newItem = {
            id: Date.now(),
            type: 'onetime', // default
            desc: '',
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
            item[key] = (key === 'desc' || key === 'type') ? value : parseFloat(value) || 0;
            updatePreview();
        }
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
                <div class="form-group" style="grid-column: span 4; display:flex; gap:1rem; margin-bottom: 0px; align-items: center;">
                    <select onchange="window.updateItemCtx(${item.id}, 'type', this.value)" style="flex:0 0 120px; font-size:0.85rem; padding: 0.4rem; border-color:var(--primary-cyan); background-color: white;">
                        <option value="onetime" ${item.type === 'onetime' ? 'selected' : ''}>Eenmalig</option>
                        <option value="monthly" ${item.type === 'monthly' ? 'selected' : ''}>Maandelijks</option>
                    </select>
                </div>
                <!-- Row Break for grid -->
                <div class="form-group" style="grid-column: 1 / 2;">
                    <label>Omschrijving</label>
                    <input type="text" value="${item.desc}" oninput="window.updateItemCtx(${item.id}, 'desc', this.value)" placeholder="Dienst of product">
                </div>
                <div class="form-group" style="grid-column: 2 / 3;">
                    <label>Aantal</label>
                    <input type="number" value="${item.qty}" oninput="window.updateItemCtx(${item.id}, 'qty', this.value)" step="0.5">
                </div>
                <div class="form-group" style="grid-column: 3 / 4;">
                    <label>Tarief (€)</label>
                    <input type="number" value="${item.rate}" oninput="window.updateItemCtx(${item.id}, 'rate', this.value)">
                </div>
                <div class="form-group" style="grid-column: 4 / 5; padding-bottom:2px;">
                     <button type="button" class="btn btn-danger" onclick="window.removeItemCtx(${item.id})" style="padding: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                     </button>
                </div>
            `;
            form.itemsContainer.appendChild(div);
        });
    }

    // Global context helpers
    window.updateItemCtx = updateItem;
    window.removeItemCtx = removeItem;

    function generateTableHtml(title, items, isMonthly = false) {
        if (items.length === 0) return '';

        let subtotal = 0;
        let rowsHtml = '';

        items.forEach(item => {
            // For monthly items, we calculate the annual total (12 months)
            const multiplier = isMonthly ? 12 : 1;
            const lineTotal = item.qty * item.rate * multiplier;
            subtotal += lineTotal;

            // Format rate display
            const rateDisplay = isMonthly
                ? `${formatCurrency(item.rate)} p/m`
                : formatCurrency(item.rate);

            rowsHtml += `
                <tr>
                    <td>${item.desc || '-'}</td>
                    <td class="text-center">${item.qty}</td>
                    <td class="text-right">${rateDisplay}</td>
                    <td class="text-right">${formatCurrency(lineTotal)}</td>
                </tr>
            `;
        });

        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        // Add notes based on type
        let footerNote = '';
        if (isMonthly) {
            footerNote = '<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">* Facturatie per jaar vooruit. Bij tussentijdse opzegging wordt het teveel betaalde bedrag gerestitueerd.</p>';
        } else {
            footerNote = '<p style="font-size: 0.8rem; color: var(--slate-text); margin-top: 0.5rem; font-style: italic;">* Betalingstermijn: 50% bij akkoord, 50% bij oplevering.</p>';
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
                            <th class="col-total">Totaal (12 mnd)</th>
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
                        <tr class="summary-row">
                            <td colspan="3" class="text-right">BTW (21%)</td>
                            <td class="text-right">${formatCurrency(vat)}</td>
                        </tr>
                         <tr class="total-row">
                            <td colspan="3" class="text-right">Totaal</td>
                            <td class="text-right" style="color:var(--primary-cyan)">${formatCurrency(total)}</td>
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
        preview.number.textContent = state.quoteNumber || '-';
        preview.date.textContent = formatDate(state.quoteDate);
        preview.expiry.textContent = formatDate(state.expiryDate);

        // Split items
        const oneTimeItems = state.items.filter(i => i.type === 'onetime');
        const monthlyItems = state.items.filter(i => i.type === 'monthly');

        // Generate Tables
        let html = '';
        html += generateTableHtml('Eenmalige investering', oneTimeItems, false);
        html += generateTableHtml('Jaarlijkse kosten (vooraf gefactureerd)', monthlyItems, true);

        preview.tablesContainer.innerHTML = html;

        // Closing
        preview.closing.textContent = state.closingText;
    }

    // PRINT HANDLER
    window.printQuote = function () {
        const originalTitle = document.title;
        const client = state.companyName || state.clientName || 'Klant';
        const number = state.quoteNumber || 'Concept';

        // Sanitize filename (remove special chars)
        const safeClient = client.replace(/[^a-z0-9\s-]/gi, '').trim();
        const safeNumber = number.replace(/[^a-z0-9\s-]/gi, '').trim();

        document.title = `Offerte ${safeClient} - ${safeNumber}`;

        window.print();

        // Restore title after a small delay to ensure print dialog picked it up
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    };

    init();
});
