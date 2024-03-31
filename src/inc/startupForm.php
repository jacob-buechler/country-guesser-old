
    <div class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl mb-4 font-bold text-gray-800 dark:text-white">Länder erkennen</h1>
          </div>
          <form action="guess.php" method="GET">
                <div class="grid gap-y-4">
                    <!-- Form Group -->
                    <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700">
                        <div class="w-full flex justify-between items-center gap-x-5">
                            <div class="grow">
                                <span class="block text-xs text-gray-500 dark:text-gray-400">
                                    Twitch Name
                                </span>
                                <input class="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white" type="text" name="channel" value="">
                            </div>
                        </div>
                    </div>
                    <!-- End Form Group -->
                    <!-- Input Number -->
                    <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
                        <div class="w-full flex justify-between items-center gap-x-5">
                            <div class="grow">
                                <span class="block text-xs text-gray-500 dark:text-gray-400">
                                    Anzeige dauer in Sekunden
                                </span>
                                <input name="show-for" class="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white" type="text" value="10" data-hs-input-number-input>
                            </div>
                            <div class="flex justify-end items-center gap-x-1.5">
                                <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                                </button>
                                <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Input Number -->
                    <!-- Input Number -->
                    <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
                        <div class="w-full flex justify-between items-center gap-x-5">
                            <div class="grow">
                                <span class="block text-xs text-gray-500 dark:text-gray-400">
                                    Eingabe dauer in Sekunden
                                </span>
                                <input name="guess-for" class="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white" type="text" value="15" data-hs-input-number-input>
                            </div>
                            <div class="flex justify-end items-center gap-x-1.5">
                                <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                                </button>
                                <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Input Number -->

                    <button onclick="localStorage.clear()" type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Jetzt Spielen</button>
                </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
</div>