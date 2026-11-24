import { ref, onMounted, onUnmounted } from 'vue';
import { Network } from '@capacitor/network';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';

/**
 * TODO [M7] Capacidades nativas (6 pts en total: este archivo, PerfilPage.vue y AndroidManifest.xml).
 *
 * useConexion() devuelve { conectado, tipo }:
 *   - Valor inicial con Network.getStatus()                       (@capacitor/network)
 *   - Se actualiza solo con Network.addListener('networkStatusChange', ...)
 *   - El oyente se libera (handle.remove()) cuando se destruye la página que lo usa (onUnmounted).
 *   Las páginas Equipos y Formulario ya muestran el aviso "Sin conexión" y deshabilitan Guardar con `conectado`.
 */
export function useConexion() {
  const conectado = ref(true);
  const tipo = ref('unknown');
  let handle: PluginListenerHandle | undefined;
  let destruido = false;

  onMounted(async () => {
    const estado = await Network.getStatus();

    conectado.value = estado.connected;
    tipo.value = estado.connectionType;

    handle = await Network.addListener(
      'networkStatusChange',
      estado => {
        conectado.value = estado.connected;
        tipo.value = estado.connectionType;
      }
    );

    if (destruido) {
      await handle.remove();
    }
  });

  onUnmounted(async () => {
    destruido = true;
    await handle?.remove();
  });

  return { conectado, tipo };
}

/**
 * TODO [M7] vibrar(): vibración breve de confirmación con Haptics.impact({ style: ImpactStyle.Light })
 *   (@capacitor/haptics). En el navegador NO debe hacer nada: use Capacitor.isNativePlatform().
 *   Se llama después de guardar y de eliminar con éxito.
 */
export async function vibrar() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.impact({
      style: ImpactStyle.Light,
    });
  }
}
