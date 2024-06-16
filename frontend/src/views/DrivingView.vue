<template>
  <section class="bg-gray-1 dark:bg-dark py-20 lg:py-[40px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div
            class="relative mx-auto max-w-[825px] overflow-hidden rounded-3xl bg-blue-600 pt-24 text-center sm:px-12 md:px-[0px]"
          >
            <div class="mb-10 text-center md:mb-16">
              <a
                href="javascript:void(0)"
                class="mx-auto inline-block max-w-[160px]"
              >
                <spa class="text-4xl text-white font-bold font-Robo"
                  >DashRide</spa
                >
              </a>
            </div>
            <div class="pt-5">
              <h1 class="text-3xl font-semibold mb-10">{{ title }}</h1>
              <div>
                <div
                  class="shadow sm:rounded-md max-w-full mx-auto text-left"
                  v-if="!trip.is_complete"
                >
                  <div class="">
                    <div class="bg-black rounded-t-3xl px-36 pt-28 pb-16">
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
                          :position="location.destination.geometry"
                          :icon="destinationIcon"
                        />
                      </GMapMap>
                      <div>
                        <div class="bg-black px-0 py-3 mt-10 text-right">
                          <div class="mt-2 mb-0">
                            <p class="text-xl text-white">
                              Going to <strong>pick up a passenger</strong>
                            </p>
                          </div>
                          <button
                            v-if="trip.is_started"
                            @click="handleCompleteTrip"
                            class="border mt-10 inline-flex justify-between border-transparent text-xl bg-white py-3 px-8 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                          >
                            Complete Trip
                          </button>
                          <button
                            v-else
                            @click="handlePassengerPickedUp"
                            class="border mt-10 inline-flex justify-between border-transparent text-xl bg-white py-3 px-8 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                          >
                            Passenger Picked Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="shadow sm:rounded-md max-w-full mx-auto text-left"
                  v-else
                >
                  <div class="bg-black rounded-t-3xl px-36 pt-28 pb-28">
                    <Tada />
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
import { ref, onMounted, onUnmounted } from "vue";
import http from "@/helpers/http";
import Tada from "@/components/Tada.vue";

const location = useLocationStore();
const trip = useTripStore();
const router = useRouter();

const gMap = ref(null);
const intervalRef = ref(null);

const title = ref("Driving to passenger");

const currentIcon = {
  url: "https://img.icons8.com/?size=100&id=kSFAST6TliFQ&format=png&color=000000",
  scaledSize: {
    width: 32,
    height: 32,
  },
};

const destinationIcon = {
  url: "https://img.icons8.com/?size=100&id=QNXMW3NgF3oq&format=png&color=000000",
  scaledSize: {
    width: 32,
    height: 32,
  },
};

const updateMapBounds = (mapObject) => {
  let originPoint = new google.maps.LatLng(location.current.geometry),
    destinationPoint = new google.maps.LatLng(location.destination.geometry),
    latLngBounds = new google.maps.LatLngBounds();

  latLngBounds.extend(originPoint);
  latLngBounds.extend(destinationPoint);

  mapObject.fitBounds(latLngBounds);
};

const broadcastDriverLocation = () => {
  http()
    .post(`/api/trip/${trip.id}/location`, {
      driver_location: location.current.geometry,
    })
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

const handlePassengerPickedUp = () => {
  http()
    .post(`/api/trip/${trip.id}/start`)
    .then((response) => {
      title.value = "Travelling to destination";
      location.$patch({
        destination: {
          name: response.data.destination_name,
          geometry: response.data.destination,
        },
      });
      trip.$patch(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleCompleteTrip = () => {
  http()
    .post(`/api/trip/${trip.id}/end`)
    .then((response) => {
      title.value = "Trip completed!";

      trip.$patch(response.data);

      setTimeout(() => {
        trip.reset();
        location.reset();

        router.push({
          name: "standby",
        });
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  gMap.value.$mapPromise.then((mapObject) => {
    updateMapBounds(mapObject);

    intervalRef.value = setInterval(async () => {
      // update the driver's current position and update map bounds
      await location.updateCurrentLocation();

      // update the driver's position in the database
      broadcastDriverLocation();

      updateMapBounds(mapObject);
    }, 5000);
  });
});

onUnmounted(() => {
  clearInterval(intervalRef.value);

  intervalRef.value = null;
});
</script>
