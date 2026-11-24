# IF0009 · Examen II · Préstamos Móvil

App móvil **Ionic 9 + Capacitor 8 + Vue 3** que consume la API de *Préstamo de Equipos* del Examen I.

```
backend/   API Laravel 13 ya terminada (la solución del Examen I). No se modifica.
app/       App móvil. Aquí están los TODO M1–M8.
```

## Puesta en marcha (≈ 15 min)

Requisitos: PHP 8.4+, Composer, Node.js 22+, Android Studio con un emulador (API 24+), `npm i -g @ionic/cli`.

```bash
# 1. API  →  http://localhost:8000/api
cd backend
composer run setup
php artisan serve

# 2. App en el navegador  →  http://localhost:8100   (otra terminal)
cd app
npm install
cp .env.example .env
ionic serve                 # o: npm run dev

# 3. App en el emulador de Android
#    en app/.env:  VITE_API_URL=http://10.0.2.2:8000/api
ionic build
npx cap sync android
npx cap run android         # o: npx cap open android  y Run en Android Studio

# Si la API no levanta: API simulada (mismo contrato)  →  http://localhost:3001/api
npm run mock                # en .env: VITE_API_URL=http://localhost:3001/api  (emulador: http://10.0.2.2:3001/api)
```

Credenciales: `docente@ucr.ac.cr` · `Examen2026!`

> Cada vez que cambie algo en `src/` y quiera verlo en el emulador: `ionic build` → `npx cap sync` → `npx cap run android`.

## Qué hay que hacer

| TODO | Archivo | Pts |
|---|---|---|
| M1 | `src/services/api.ts` | 8 |
| M2 | `src/composables/useAuth.ts` | 10 |
| M3 | `src/router/index.ts` | 4 |
| M4 | `src/views/EquiposPage.vue` (listado) | 10 |
| M5 | `src/views/EquipoFormPage.vue` | 10 |
| M6 | `src/views/EquiposPage.vue` (eliminación) | 8 |
| M7 | `src/composables/useConexion.ts`, `src/views/PerfilPage.vue`, `android/app/src/main/AndroidManifest.xml` | 6 |
| M8 | `capacitor.config.ts` y lo que corresponda en `android/` + evidencia | 4 |

Cada comentario `TODO` describe exactamente lo que se espera. Los archivos marcados **YA IMPLEMENTADO** no se evalúan.

## Evidencia (M8)

Guarde en `app/docs/evidencia-android.png` una captura de **su** app corriendo en el emulador,
en la pestaña **Perfil** (debe verse *Plataforma: android*), y complete:

- Carné: C5H636
- appId:cr.ac.ucr.if0009.c5h636
- Versión de Node / Ionic CLI / Capacitor (`node -v`, `ionic -v`, `npx cap -V`):  node -v24.20.0, ionic-v 7.2.1,  npx.cmd cap -V 8.6.2
- ¿Se generó el APK de depuración? (sí/no): No

Se realizó la compilación web y la sincronización
con Android. Sin embargo, no fue posible ejecutar la aplicación
en el emulador debido a una incompatibilidad entre Java y Gradle.

Se adjunta la captura de la compilación exitosa como evidencia
alternativa.

![Evidencia de compilación](app/docs/evidencia-build.png)

## Reglas

- IA permitida en la Parte A. **Usted responde por cada línea de su repositorio**, la haya escrito usted o una herramienta: la Parte B pregunta por *su* código.
- Se califica el último *commit* enviado antes de las **11:00**.
- No modifique `backend/` ni los archivos marcados YA IMPLEMENTADO.
