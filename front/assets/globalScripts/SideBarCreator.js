class SideBarCreator {
    #SIDEBAR_SECTION_TITLES = ['scheduler', 'all notes', 'analytics', 'history', 'settings'];

    #SIDEBAR_SECTION_LINKS = {
        'scheduler':'/front/pages/SchedulePage/schedule.html',
        'all notes' : '/front/pages/AllNotes/allNotes.html',
        'analytics' : '/front/pages/AnalyticsPage/analytics.html',
        'history' : '/front/pages/HistoryPage/history.html',
        'settings' : '/front/pages/SettingsPage/settings.html'};

    #SIDEBAR_SECTION_ICONS = {
        'scheduler':`<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7
                                 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48
                                 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32
                                 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5
                                 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8
                                 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16
                                 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2
                                 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16
                                 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16
                                 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64
                                 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8
                                 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8
                                 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0
                                 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16
                                 7.2-16 16z"/>
                     </svg>`,
        'all notes' : `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8
                                     86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3
                                     0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6
                                     15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9
                                     417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5
                                     1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"/>
                       </svg>`,
        'analytics' : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M302 240V16.6c0-9 7-16.6 16-16.6C441.7 0 542 100.3 542
                                 224c0 9-7.6 16-16.6 16H302zM30 272C30 150.7 120.1 50.3
                                 237 34.3c9.2-1.3 17 6.1 17 15.4V288L410.5 444.5c6.7 6.7 6.2
                                 17.7-1.5 23.1C369.8 495.6 321.8 512 270 512C137.5 512 30 404.6
                                 30 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9
                                 142.3c-6 5.6-15.4 5.2-21.2-.7L318 288H556.4z" fill="currentColor"/>
                       </svg>`,
        'history' : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7
                                     24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155
                                     85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192
                                     192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6
                                     7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4
                                     0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75
                                     75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72
                                     72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" fill="currentColor"/>
                    </svg>`,
        'settings' : `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7
                                  16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4
                                  11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7
                                  9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9
                                  16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1
                                  425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1
                                  64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2
                                  15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5
                                  16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4
                                  22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/>
                      </svg>`
    };

    #mainElement;

    constructor(parentElement, mainElement, currentPageTitle) {
        this.#mainElement = mainElement;
        if(this.#mainElement) { this.#mainElement.classList.remove('hiddenSmoothly'); }
        this.#SIDEBAR_SECTION_TITLES.forEach(title => {
            const newSection = document.createElement('a');
            newSection.classList.add('menuIcon');
            if(currentPageTitle === title) { newSection.classList.add('active'); }
            newSection.dataset['icon'] = title;
            newSection.innerHTML = this.#SIDEBAR_SECTION_ICONS[title];

            if(title === 'settings') { newSection.classList.add('settingsIcon'); }
            if(currentPageTitle !== title) {
                newSection.addEventListener('click', () => {
                    this.#hideMainContainer();
                    setTimeout(() => window.location.href = this.#SIDEBAR_SECTION_LINKS[title],400)
                });
            }


            parentElement.appendChild(newSection);
        })
    }
    #hideMainContainer() {
        if(this.#mainElement) {
            this.#mainElement.classList.add('hiddenSmoothly');
        }
    }
}


export default SideBarCreator;