# MediCitas — Sistema de Gestion de Citas Medicas

Prototipo funcional de un sistema de gestion de citas para una clinicla privada. Desarrollado como parte del Cursos de Analisis de Sitemas I, aplicando el metodo de desarrollo de Prototipado.

## Descripcion

## Roles del Sistema
Rol: Paciente
Acceso:
Sin login (nombre + DPI)
Descripcion: Registrarse y agendar citas Medicas sin necesidad de crear una cuenta.

Rol: Serectaria
Acceso: Login (Usuarrio + contrasenia)
Descripcion: Administrar citas, pacientes, medicos y especialidades.

Rol: Medico
Acceso: Login (Usuarrio + contrasenia)
Descripcion: Consultar Agenda, gestioar citas propias y registrar algunas observaciones.

<!--Este es el cambio del segundo Commit-->
## Estructura del Proyecto

medicitas/
├── index.html                      # Pagina principal (Landing Page)
├── README.md                       # Documentacion del proyecto
├── css/
│   └── styles.css                  # Estilos globales del sistema
├── js/
│   └── app.js                      # Logica JavaScript compartida
└── pages/
    ├── paciente.html               # Identificacion del paciente
    ├── paciente-cita.html          # Flujo de agendar cita (4 pasos)
    ├── login-secretaria.html       # Login de la secretaria
    ├── login-medico.html           # Login del medico
    ├── dashboard-secretaria.html   # Dashboard completo de la secretaria
    └── dashboard-medico.html       # Dashboard completo del medico

## Pantallas del Prototipo
### Pagina Principal
- Seleccion de rol (Paciente, Secretaria, Medico)

### Modulo Paciente

1. **Identificacion** — Buscar por nombre + DPI o registrarse

2. **Agendar cita** — Flujo de 4 pasos:

- Seleccionar especialidad

- Seleccionar medico

- Seleccionar fecha y hora

- Confirmar cita

3. **Confirmacion** — Mensaje de exito
<!--Este es el cambio del tercer Commit encuanto a la Documentacion-->
### Dashboard Secretaria
- Citas del dia (con estadisticas)
- Registrar paciente
- Gestionar citas (con filtros)
- Buscar paciente (con historial)
- Gestionar medicos y horarios
- Gestionar especialidades (escalabilidad)

### Dashboard Medico
- Mis citas del dia (marcar estado, agregar notas)
- Agenda semanal (vista calendario)
- Historial de citas (con filtros)
- Mi perfil y horarios (solicitar bloqueos)

## 🛠️ Tecnologias

- **HTML5** — Estructura semantica
- **CSS3** — Estilos responsivos, variables CSS, animaciones
- **JavaScript** — Interactividad y navegacion
- **Google Fonts** — DM Sans + Playfair Display

## 🚀 Despliegue