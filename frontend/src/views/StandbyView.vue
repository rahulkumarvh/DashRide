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
              <div v-if="!trip.id" class="mt-36 flex justify-center mb-36">
                <Loader />
              </div>
              <div v-else>
                <div class="shadow sm:rounded-md max-w-full mx-auto text-left">
                  <div class="bg-black rounded-t-3xl px-36 pt-28 pb-28">
                    <div>
                      <GMapMap
                        :zoom="14"
                        :center="trip.destination"
                        ref="gMap"
                        style="width: 100%; height: 256px"
                      ></GMapMap>
                    </div>
                    <div class="mt-2">
                      <p class="text-xl">
                        Going to <strong>{{ trip.destination_name }}</strong>
                      </p>
                    </div>
                    <div
                      class="flex justify-center bg-black px-10 py-2 text-right"
                    >
                      <button
                        @click="handleDeclineTrip"
                        class="border mt-10 mr-24 bg-red-500 inline-flex text-lg justify-between border-transparent text-md py-5 px-12 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                      >
                        <span class="flex items-center">
                          Decline
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-7 ml-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </button>
                      <button
                        @click="handleAcceptTrip"
                        class="border mt-10 bg-green-600 inline-flex justify-between border-transparent text-md py-5 px-12 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                      >
                        <span class="flex items-center">
                          Accept
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-7 ml-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      </button>
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
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import { onMounted } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useTripStore } from "@/stores/trip";
import { useLocationStore } from "@/stores/location";
import http from "@/helpers/http";
import { useRouter } from "vue-router";

const title = ref("Waiting for ride request...");
const gMap = ref(null);
const trip = useTripStore();
const location = useLocationStore();
const router = useRouter();

const handleDeclineTrip = () => {
  trip.reset();
  title.value = "Waiting for ride request...";
};

const handleAcceptTrip = () => {
  http()
    .post(`/api/trip/${trip.id}/accept`, {
      driver_location: location.current.geometry,
    })
    .then((response) => {
      location.$patch({
        destination: {
          name: "Passenger",
          geometry: response.data.origin,
        },
      });

      router.push({
        name: "driving",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(async () => {
  await location.updateCurrentLocation();

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

  echo.channel("drivers").listen("TripCreated", (e) => {
    title.value = "Ride requested:";

    trip.$patch(e.trip);
    console.log("TripCreated", e);

    setTimeout(initMapDirections, 2000);
  });
});

const initMapDirections = () => {
  gMap.value.$mapPromise.then((mapObject) => {
    let originPoint = new google.maps.LatLng(trip.origin),
      destinationPoint = new google.maps.LatLng(trip.destination),
      directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapObject,
      });

    directionsService.route(
      {
        origin: originPoint,
        destination: destinationPoint,
        avoidTolls: false,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res);
        } else {
          console.error(status);
        }
      }
    );
  });
};
</script>
