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
                <spa class="text-4xl text-white font-bold font-Robo"
                  >DashRide</spa
                >
              </a>
            </div>
            <div class="pt-2">
              <h1 class="text-3xl font-semibold mb-24">
                Enter Driver and Car Details
              </h1>
              <form action="#" @submit.prevent="handleSaveDriver">
                <div
                  class="shadow sm:rounded-md max-w-full mx-auto text-left font-Robo"
                >
                  <div class="bg-black rounded-t-3xl px-36 pt-28 pb-28">
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="driverDetails.name"
                        placeholder="Full Name"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <div class="mt-2">
                      <input
                        type="number"
                        name="year"
                        id="year"
                        v-model="driverDetails.year"
                        placeholder="Car Year"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="make"
                        id="make"
                        v-model="driverDetails.make"
                        placeholder="Make"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="model"
                        id="model"
                        v-model="driverDetails.model"
                        placeholder="Model"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="color"
                        id="color"
                        v-model="driverDetails.color"
                        placeholder="Color"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="license_plate"
                        v-model="driverDetails.license_plate"
                        id="license_plate"
                        placeholder="License Plate #"
                        class="mt-1 block w-full px-3 py-2 mb-5 bg-black border-white text-white text-xl shadow-sm focus:border-gray-200 border-b-2 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      @click.prevent="handleSaveDriver"
                      class="border mt-10 inline-flex justify-between border-transparent text-xl bg-white py-4 px-10 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center">
                        Continue
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="size-7 ml-2"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive } from "vue";
import http from "@/helpers/http";
import router from "../router";

const driverDetails = reactive({
  name: "",
  year: null,
  make: "",
  model: "",
  color: "",
  license_plate: "",
});
const handleSaveDriver = () => {
  http()
    .post("/api/driver", driverDetails)
    .then((response) => {
      router.push({
        name: "standby",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
