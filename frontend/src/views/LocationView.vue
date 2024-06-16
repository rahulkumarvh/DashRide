<template>
  <section class="bg-gray-1 dark:bg-dark py-20 lg:py-[40px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div
            class="relative mx-auto max-w-[825px] overflow-hidden rounded-3xl bg-blue-600 pt-36 text-center sm:px-12 md:px-[0px]"
          >
            <div class="mb-10 text-center md:mb-16">
              <a
                href="javascript:void(0)"
                class="mx-auto inline-block max-w-[160px]"
              >
                <span class="flex items-center font-Robo">
                  <spa class="text-4xl text-white font-bold font-Robo"
                    >DashRide</spa
                  >
                </span>
              </a>
            </div>
            <div class="pt-16">
              <h1 class="text-3xl font-semibold mb-24">Where are we going?</h1>
              <form action="#" @submit.prevent="">
                <div
                  class="overflow-hidden shadow sm:rounded-md max-w-full mx-auto text-left"
                >
                  <div class="bg-black rounded-t-3xl px-36 pt-28 pb-28">
                    <div>
                      <GMapAutocomplete
                        placeholder="My destination"
                        @place_changed="handleLocationChanged"
                        class="mt-1 block w-full px-3 py-2 bg-black border-white text-white text-2xl border-b-2 shadow-sm focus:outline-none"
                      >
                      </GMapAutocomplete>
                    </div>
                    <button
                      @click.prevent="handleSelectLocation"
                      type="button"
                      class="border mt-10 inline-flex justify-between border-transparent text-lg bg-white py-4 px-9 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center font-Robo">
                        Find a Ride
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="size-7 ml-3"
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
                  <div class="bg-black px-4 py-3 text-right sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useLocationStore } from "@/stores/location";
import { useRouter } from "vue-router";

const location = useLocationStore();
const router = useRouter();

const handleLocationChanged = (e) => {
  console.log("handleLocationChanged", e);
  location.$patch({
    destination: {
      name: e.name,
      address: e.formatted_address,
      geometry: {
        lat: e.geometry.location.lat(),
        lng: e.geometry.location.lng(),
      },
    },
  });
};

const handleSelectLocation = () => {
  if (location.destination.name !== "") {
    router.push({
      name: "map",
    });
  }
};
</script>
