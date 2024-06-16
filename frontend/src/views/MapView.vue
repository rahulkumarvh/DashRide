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
            <div class="pt-10">
              <h1 class="text-3xl font-semibold mb-10">Here's your Trip</h1>
              <div>
                <div class="shadow sm:rounded-md max-w-full mx-auto text-left">
                  <div class="bg-black rounded-t-3xl px-36 pt-28 pb-10">
                    <div>
                      <GMapMap
                        v-if="location.destination.name !== ''"
                        :zoom="11"
                        :center="location.destination.geometry"
                        ref="gMap"
                        style="width: 100%; height: 256px"
                      >
                      </GMapMap>
                      <div class="mt-10 text-white">
                        <p class="text-3xl font-Robo">
                          Going to
                          <strong>{{ location.destination.name }}</strong>
                        </p>
                      </div>
                    </div>
                    <div
                      class="bg-black text-white rounded-md px-0 py-3 text-right"
                    >
                      <button
                        @click="handleConfirmTrip"
                        class="border mt-10 inline-flex justify-between border-transparent text-xl bg-white py-3 px-8 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                      >
                        <span class="flex items-center font-Robo">
                          Let's Go
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-5 ml-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
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
import { useLocationStore } from "@/stores/location";
import { useTripStore } from "@/stores/trip";
import http from "@/helpers/http";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const location = useLocationStore();
const trip = useTripStore();
const router = useRouter();

const gMap = ref(null);

const handleConfirmTrip = () => {
  http()
    .post("/api/trip", {
      origin: location.current.geometry,
      destination: location.destination.geometry,
      destination_name: location.destination.name,
    })
    .then((response) => {
      trip.$patch(response.data);
      router.push({
        name: "trip",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(async () => {
  // does the user have a location set?
  if (location.destination.name === "") {
    router.push({
      name: "location",
    });
  }

  // lets get the users current location
  await location.updateCurrentLocation();

  // draw a path on the map
  gMap.value.$mapPromise.then((mapObject) => {
    let currentPoint = new google.maps.LatLng(location.current.geometry),
      destinationPoint = new google.maps.LatLng(location.destination.geometry),
      directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapObject,
      });

    directionsService.route(
      {
        origin: currentPoint,
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
});
</script>
