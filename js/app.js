// ===== PATIENT TAB SWITCH =====
function switchPatientTab(tab) {
    const btns = document.querySelectorAll('.tab-switch button');
    btns.forEach(b => b.classList.remove('active'));

    if (tab === 'registered') {
        btns[0].classList.add('active');
        document.getElementById('tab-registered').classList.remove('hidden');
        document.getElementById('tab-register').classList.add('hidden');
    } else {
        btns[1].classList.add('active');
        document.getElementById('tab-registered').classList.add('hidden');
        document.getElementById('tab-register').classList.remove('hidden');
    }

    // Limpiar mensajes
    const searchErr = document.getElementById('search-error');
    const regErr = document.getElementById('reg-error');
    const regSuccess = document.getElementById('reg-success');
    if (searchErr) searchErr.classList.add('hidden');
    if (regErr) regErr.classList.add('hidden');
    if (regSuccess) regSuccess.classList.add('hidden');
}

// ===== PATIENT SEARCH =====
function searchPatient() {
    const name = document.getElementById('search-name').value.trim();
    const dpi = document.getElementById('search-dpi').value.trim();
    const errorEl = document.getElementById('search-error');

    if (!name || !dpi) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = '⚠️ Por favor complete ambos campos.';
        return;
    }

    if (dpi.length !== 13 || isNaN(dpi)) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = '⚠️ El DPI debe tener 13 dígitos numéricos.';
        return;
    }

    // Simular paciente encontrado — guardar en sessionStorage y redirigir
    errorEl.classList.add('hidden');
    sessionStorage.setItem('patientName', name);
    window.location.href = 'pages/paciente-cita.html';
}

// ===== PATIENT REGISTER =====
function registerPatient() {
    const name = document.getElementById('reg-name').value.trim();
    const dpi = document.getElementById('reg-dpi').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const errorEl = document.getElementById('reg-error');
    const successEl = document.getElementById('reg-success');

    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

    if (!name || !dpi || !phone) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = '⚠️ Por favor complete todos los campos.';
        return;
    }

    if (dpi.length !== 13 || isNaN(dpi)) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = '⚠️ El DPI debe tener 13 dígitos numéricos.';
        return;
    }

    successEl.classList.remove('hidden');

    setTimeout(() => {
        sessionStorage.setItem('patientName', name);
        window.location.href = 'pages/paciente-cita.html';
    }, 1500);
}

// ===== BOOKING FLOW =====
let bookingData = { specialty: '', doctor: '', date: '', time: '' };

function updateSteps(step) {
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById('step-' + i);
        if (!dot) return;
        dot.classList.remove('active', 'completed');
        if (i < step) dot.classList.add('completed');
        if (i === step) dot.classList.add('active');

        if (i < 4) {
            const line = document.getElementById('line-' + i);
            if (line) line.classList.toggle('completed', i < step);
        }
    }
}

function goToStep(step) {
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById('booking-step-' + i);
        if (el) el.classList.add('hidden');
    }
    const target = document.getElementById('booking-step-' + step);
    if (target) target.classList.remove('hidden');
    updateSteps(Math.min(step, 4));
    window.scrollTo(0, 0);

    // Actualizar resumen en paso 4
    if (step === 4) {
        const patientName = sessionStorage.getItem('patientName') || 'Paciente';
        setText('sum-patient', patientName);
        setText('sum-specialty', bookingData.specialty || '—');
        setText('sum-doctor', bookingData.doctor || '—');
        setText('sum-date', bookingData.date || '—');
        setText('sum-time', bookingData.time || '—');
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function selectSpecialty(el, name) {
    document.querySelectorAll('.specialty-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    bookingData.specialty = name;
}

function selectDoctor(el, name) {
    document.querySelectorAll('.doctor-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    bookingData.doctor = name;
}

function selectDate(el, date) {
    document.querySelectorAll('.date-item').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    bookingData.date = date;
}

function selectTime(el, time) {
    if (el.classList.contains('unavailable')) return;
    document.querySelectorAll('.time-slot').forEach(c => {
        if (!c.classList.contains('unavailable')) c.classList.remove('selected');
    });
    el.classList.add('selected');
    bookingData.time = time;
}

function confirmAppointment() {
    goToStep(5);
}

// ===== SECRETARY DASHBOARD NAV =====
const secSections = ['sec-today', 'sec-register', 'sec-manage', 'sec-search', 'sec-doctors', 'sec-specialties'];

function switchSecSection(sectionId) {
    secSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('#sidebar-sec .sidebar-nav a').forEach(a => a.classList.remove('active'));
    const links = document.querySelectorAll('#sidebar-sec .sidebar-nav a');
    const index = secSections.indexOf(sectionId);
    if (links[index]) links[index].classList.add('active');

    // Cerrar sidebar mobile
    const sidebar = document.getElementById('sidebar-sec');
    const overlay = document.getElementById('overlay-sec');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

// ===== DOCTOR DASHBOARD NAV =====
const docSections = ['doc-today', 'doc-weekly', 'doc-history', 'doc-profile'];

function switchDocSection(sectionId) {
    docSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('#sidebar-doc .sidebar-nav a').forEach(a => a.classList.remove('active'));
    const links = document.querySelectorAll('#sidebar-doc .sidebar-nav a');
    const index = docSections.indexOf(sectionId);
    if (links[index]) links[index].classList.add('active');

    const sidebar = document.getElementById('sidebar-doc');
    const overlay = document.getElementById('overlay-doc');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

// ===== MOBILE SIDEBAR TOGGLE =====
function toggleSidebar(role) {
    const sidebar = document.getElementById('sidebar-' + role);
    const overlay = document.getElementById('overlay-' + role);
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// ===== INIT: set patient name on booking page =====
document.addEventListener('DOMContentLoaded', () => {
    const welcomeEl = document.getElementById('patient-welcome');
    if (welcomeEl) {
        const name = sessionStorage.getItem('patientName') || 'Paciente';
        welcomeEl.textContent = 'Bienvenido/a, ' + name;
    }
});
