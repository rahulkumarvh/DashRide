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
            <div class="pt-16">
              <h1 class="text-4xl mb-5 font-semibold tracking-wide">
                Welcome to your DashBoard
              </h1>
              <h2 class="text-xl mb-24 mt-10 font-Robo font-normal">
                Please Choose an option to Continue
              </h2>
              <div
                class="shadow-2xl sm:rounded-md max-w-full px-16 mx-auto text-left"
              >
                <div class="bg-black rounded-t-3xl px-96 pt-10 pb-52 sm:p-6">
                  <div
                    class="flex py-16 h-full flex-col justify-center items-center"
                  >
                    <button
                      @click="handleStartDriving"
                      class="border mb-16 inline-flex justify-between border-transparent text-xl bg-white py-7 px-36 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center font-Robo">
                        Start Driving
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

                    <button
                      @click="handleFindARide"
                      class="border mb-8 inline-flex justify-between border-transparent text-xl bg-white py-7 px-36 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center font-Robo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="size-7 mr-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                          />
                        </svg>

                        Find a Ride
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
  </section>
</template>
<script setup>
import { useRouter } from "vue-router";
import http from "@/helpers/http";

const router = useRouter();
const handleStartDriving = () => {
  http()
    .get("/api/driver")
    .then((response) => {
      if (response.data.driver) {
        router.push({
          name: "standby",
        });
      } else {
        router.push({
          name: "driver",
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const handleFindARide = () => {
  router.push({
    name: "location",
  });
};
</script>
