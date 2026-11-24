<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-list-header>Sesión</ion-list-header>
        <ion-item>
          <ion-icon slot="start" :icon="personCircleOutline" aria-hidden="true" />
          <ion-label>{{ usuario?.nombre ?? '—' }}</ion-label>
        </ion-item>

        <!--
          TODO [M7] Sección "Dispositivo" con ion-list-header y un ion-item por dato:
            Plataforma (Capacitor.getPlatform()), Modelo, Sistema (operatingSystem + osVersion)
            y Conexión (ion-badge con `tipo` o "sin conexión" según `conectado`).
        -->

        <ion-list-header>Dispositivo</ion-list-header>

        <ion-item>
          <ion-label>Plataforma</ion-label>
          <ion-note slot="end">{{ plataforma }}</ion-note>
        </ion-item>

        <ion-item>
          <ion-label>Modelo</ion-label>
          <ion-note slot="end">
            {{ dispositivo?.model ?? '—' }}
          </ion-note>
        </ion-item>

        <ion-item>
          <ion-label>Sistema</ion-label>
          <ion-note slot="end">
            {{ dispositivo?.operatingSystem }}
            {{ dispositivo?.osVersion }}
          </ion-note>
        </ion-item>

        <ion-item>
          <ion-label>Conexión</ion-label>
          <ion-badge
            slot="end"
            :color="conectado ? 'success' : 'danger'"
          >
            {{ conectado ? tipo : 'sin conexión' }}
          </ion-badge>
        </ion-item>
      </ion-list>

      <div class="ion-padding">
        <ion-button expand="block" color="danger" fill="outline" @click="salir">
          Cerrar sesión
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonIcon,
  IonLabel, IonNote, IonBadge, IonButton, onIonViewWillEnter, useIonRouter,
} from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';
import { Device, type DeviceInfo } from '@capacitor/device';
import { useAuth } from '@/composables/useAuth';
import { useConexion } from '@/composables/useConexion';

const { usuario, cerrarSesion } = useAuth();
const { conectado, tipo } = useConexion();
const ionRouter = useIonRouter();

// TODO [M7] Obtenga la plataforma y la información del dispositivo (Device.getInfo()) al entrar a la página.
const plataforma = Capacitor.getPlatform();
const dispositivo = ref<DeviceInfo | null>(null);

onIonViewWillEnter(async () => {
  dispositivo.value = await Device.getInfo();
});

async function salir() {
  await cerrarSesion();
  ionRouter.navigate('/login', 'root', 'replace');
}
</script>
