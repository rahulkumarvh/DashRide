<template>
  <section class="bg-gray-1 dark:bg-dark py-20 lg:py-[120px]">
    <div class="container mx-auto pt-24">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div
            class="relative mx-auto max-w-[525px] text-white overflow-hidden rounded-lg bg-black py-16 px-10 text-center sm:px-12 md:px-[60px] dark:bg-dark-2"
          >
            <div class="mb-10 text-center md:mb-16">
              <a
                href="javascript:void(0)"
                class="mx-auto inline-block max-w-[160px]"
              >
                <span class="text-4xl font-bold tracking-wider font-Robo"
                  >DashRide</span
                >
              </a>
            </div>
            <div class="pt-16">
              <form
                v-if="!waitingOnVerification"
                action="#"
                @submit.prevent="handleLogin"
              >
                <h1 class="text-3xl text-white font-medium mb-4 font-Robo">
                  Enter your Phone Number
                </h1>
                <div class="overflow-hidden max-w-sm mx-auto py-8 text-left">
                  <div class="bg-black px-4 py-5 sm:p-6">
                    <div>
                      <input
                        type="text"
                        v-maska
                        data-maska="# (###) ###-####"
                        v-model="credentials.phone"
                        name="phone"
                        id="phone"
                        placeholder="1 (234) 567-8910"
                        class="w-full px-5 py-3 text-white text-base bg-transparent border rounded-md outline-none border-stroke text-body-color border-dark-3 focus:border-primary focus-visible:shadow-none"
                      />
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      @submit.prevent="handleLogin"
                      class="border mt-10 inline-flex justify-between border-transparent text-md bg-white py-3 px-8 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center text-lg font-Robo">
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
              <form v-else action="#" @submit.prevent="handleVerification">
                <h1 class="text-3xl text-white font-medium mb-4 font-Robo">
                  Enter The Verification Code
                </h1>
                <div
                  class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
                >
                  <div class="px-4 py-5 mt-5 sm:p-6">
                    <div>
                      <input
                        type="text"
                        v-maska
                        data-maska="######"
                        v-model="credentials.login_code"
                        name="login_code"
                        id="login_code"
                        placeholder="123456"
                        class="w-full px-5 py-3 text-white text-base bg-transparent border rounded-md outline-none border-stroke text-body-color border-dark-3 focus:border-primary focus-visible:shadow-none"
                      />
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      @submit.prevent="handleVerification"
                      class="border mt-10 inline-flex justify-between border-transparent text-md bg-white py-3 px-8 font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none"
                    >
                      <span class="flex items-center font-Robo text-lg">
                        Verify
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
import { vMaska } from "maska/vue";
import { reactive, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = reactive({
  phone: null,
  login_code: null,
});

const waitingOnVerification = ref(false);

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push({
      name: "landing",
    });
  }
});

const getFormattedCredentials = () => {
  return {
    phone: credentials.phone
      .replaceAll(" ", "")
      .replace("(", "")
      .replace(")", "")
      .replace("-", ""),
    login_code: credentials.login_code,
  };
};

const handleLogin = () => {
  axios
    .post("http://localhost:8000/api/login", getFormattedCredentials())
    .then((response) => {
      console.log(response.data);
      waitingOnVerification.value = true;
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};

const handleVerification = () => {
  axios
    .post("http://localhost:8000/api/login/verify", getFormattedCredentials())
    .then((response) => {
      console.log(response.data); // auth token
      localStorage.setItem("token", response.data);
      router.push({
        name: "landing",
      });
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};
</script>
