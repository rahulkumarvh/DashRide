<template>
  <section class="bg-gray-1 dark:bg-dark py-20 lg:py-[40px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div
            class="relative mx-auto max-w-[825px] overflow-hidden rounded-3xl bg-blue-600 pt-28 text-center sm:px-12 md:px-[0px]"
          >
            <div class="mb-10 text-center md:mb-5">
              <a
                href="javascript:void(0)"
                class="mx-auto inline-block max-w-[160px]"
              >
                <spa class="text-4xl text-white font-bold font-Robo"
                  >DashRide</spa
                >
              </a>
            </div>
            <div class="pt-10">
              <h1 class="text-3xl font-semibold mb-10">{{ title }}</h1>
              <div>
                <div class="shadow sm:rounded-md max-w-full mx-auto text-left">
                  <div
                    class="bg-black rounded-t-3xl px-36 pt-28 pb-28 font-Robo font-semibold"
                  >
                    <div>
                      <GMapMap
                        :zoom="14"
                        :center="location.current.geometry"
                        ref="gMap"
                        style="width: 100%; height: 256px"
                      >
                        <GMapMarker
                          :position="location.current.geometry"
                          :icon="currentIcon"
                        />
                        <GMapMarker
                          :position="trip.driver_location"
                          :icon="driverIcon"
                        />
                      </GMapMap>
                    </div>
                    <div
                      class="bg-black pt-16 py-3 text-2xl text-white text-right"
                    >
                      <span>{{ message }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useLocationStore } from "@/stores/location";
import { useTripStore } from "@/stores/trip";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import pin from "@/assets/pin.png";
import rocket from "@/assets/rocket.png";

const location = useLocationStore();
const trip = useTripStore();
const router = useRouter();

const title = ref("Finding a driver...");
const message = ref("Awaiting Driver Details. Please Wait");

const gMap = ref(null);
const gMapObject = ref(null);

const currentIcon = {
  src: { pin },
  url: "https://img.icons8.com/?size=100&id=kSFAST6TliFQ&format=png&color=000000",
  scaledSize: {
    width: 32,
    height: 32,
  },
};

const driverIcon = {
  url: "https://img.icons8.com/?size=100&id=QNXMW3NgF3oq&format=png&color=000000",
  scaledSize: {
    width: 40,
    height: 40,
  },
};

const updateMapBounds = () => {
  let originPoint = new google.maps.LatLng(location.current.geometry),
    driverPoint = new google.maps.LatLng(trip.driver_location),
    latLngBounds = new google.maps.LatLngBounds();

  latLngBounds.extend(originPoint);
  latLngBounds.extend(driverPoint);

  gMapObject.value.fitBounds(latLngBounds);
};

onMounted(() => {
  gMap.value.$mapPromise.then((mapObject) => {
    gMapObject.value = mapObject;
  });

  let echo = new Echo({
    broadcaster: "pusher",
    key: "mykey",
    cluster: "mt1",
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });

  echo
    .channel(`passenger_${trip.user_id}`)
    .listen("TripAccepted", (e) => {
      trip.$patch(e.trip);

      title.value = "A driver is on the way!";
      message.value = `${e.trip.driver.user.name} is coming in a ${e.trip.driver.year} ${e.trip.driver.color} ${e.trip.driver.make} ${e.trip.driver.model} with a license plate #${e.trip.driver.license_plate}`;
    })
    .listen("TripLocationUpdated", (e) => {
      trip.$patch(e.trip);

      setTimeout(updateMapBounds, 1000);
    })
    .listen("TripStarted", (e) => {
      trip.$patch(e.trip);
      location.$patch({
        current: {
          geometry: e.trip.destination,
        },
      });

      title.value = "You're on your way!";
      message.value = `You are headed to ${e.trip.destination_name}`;
    })
    .listen("TripEnded", (e) => {
      trip.$patch(e.trip);

      title.value = "You've arrived!";
      message.value = `Hope you enjoyed your ride with ${e.trip.driver.user.name}`;

      setTimeout(() => {
        trip.reset();
        location.reset();

        router.push({
          name: "landing",
        });
      }, 10000);
    });
});
</script>
