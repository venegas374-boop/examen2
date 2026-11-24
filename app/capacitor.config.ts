import type { CapacitorConfig } from '@capacitor/cli';

/**
 * TODO [M8] Identidad de SU app (4 pts):
 *   appId   → cr.ac.ucr.if0009.<su carné en minúscula>      ej. cr.ac.ucr.if0009.c12345
 *   appName → "Préstamos <su primer apellido>"
 * Ojo: la plataforma android/ ya existe. Revise qué archivos de android/ también hay que cambiar
 * y luego ejecute  ionic build  →  npx cap sync  →  npx cap run android.
 */
const config: CapacitorConfig = {
  appId: 'cr.ac.ucr.if0009.c5h636',
  appName: 'Préstamos Morales',
  webDir: 'dist',
  android: {
    // Solo para el examen: la API local corre en http://10.0.2.2.
    // La excepción de texto en claro está acotada en res/xml/network_security_config.xml
    allowMixedContent: true,
  },
};

export default config;
