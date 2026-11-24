import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue';
import { useAuth } from '@/composables/useAuth';

// YA IMPLEMENTADO — rutas. Equipos y Perfil son pestañas con pilas independientes.
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/tabs/equipos' },
  { path: '/login', component: () => import('@/views/LoginPage.vue'), meta: { soloInvitados: true } },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiereSesion: true },
    children: [
      { path: '', redirect: '/tabs/equipos' },
      { path: 'equipos', component: () => import('@/views/EquiposPage.vue') },
      { path: 'equipos/nuevo', component: () => import('@/views/EquipoFormPage.vue') },
      { path: 'equipos/:id/editar', component: () => import('@/views/EquipoFormPage.vue'), props: true },
      { path: 'perfil', component: () => import('@/views/PerfilPage.vue') },
    ],
  },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

/**
 * TODO [M3] Guarda de navegación (4 pts).
 *  1. Antes de cada navegación, asegúrese de haber cargado la sesión guardada: await cargarToken().
 *  2. Si alguna ruta del destino tiene meta.requiereSesion y no hay sesión → redirigir a /login.
 *  3. Si el destino tiene meta.soloInvitados y ya hay sesión → redirigir a /tabs/equipos.
 *  Use to.matched para revisar también la ruta padre (/tabs/).
 */
router.beforeEach(async (to) => {
  const { cargarToken, estaAutenticado } = useAuth();

  await cargarToken();

  if (
    to.matched.some(ruta => ruta.meta.requiereSesion) &&
    !estaAutenticado.value
  ) {
    return '/login';
  }

  if (to.meta.soloInvitados && estaAutenticado.value) {
    return '/tabs/equipos';
  }

  return true;
});

export default router;
