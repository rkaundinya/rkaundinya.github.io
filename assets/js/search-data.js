// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/al-folio/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/publications/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/repositories/";
          },
        },{id: "nav-video-games",
          title: "Video Games",
          description: "Some great games I had the pleasure of working on!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/video_games/";
          },
        },{id: "nav-music",
          title: "Music",
          description: "Some of the music I had the pleasure of being a part of creating!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/music/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "You can downlaod a pdf of my CV above.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/cv/";
          },
        },{id: "nav-writings",
          title: "Writings",
          description: "Some articles, blog posts, and essays I&#39;ve worked on.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/writings/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/teaching/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-paper-presentation-at-nice-in-heidelberg-germany-page",
          title: 'Paper presentation at NICE in Heidelberg, Germany! :page:',
          description: "",
          section: "News",},{id: "news-the-pari-center-awarded-me-a-scholarship-to-attend-the-consciousness-2-0-event-in-pari-italy",
          title: 'The Pari Center awarded me a scholarship to attend the Consciousness 2.0 event...',
          description: "",
          section: "News",},{id: "news-i-spent-a-weekend-with-john-vervaeke-at-the-pari-center-in-pari-italy",
          title: 'I spent a weekend with John Vervaeke at the Pari Center in Pari,...',
          description: "",
          section: "News",},{id: "news-attending-multiscale-modeling-summer-school-at-groningen-school",
          title: 'Attending multiscale modeling summer school at Groningen :school:',
          description: "",
          section: "News",},{id: "news-poster-presentation-at-icdl-in-prague-czechia-scroll",
          title: 'Poster presentation at ICDL in Prague, Czechia! :scroll:',
          description: "",
          section: "News",},{id: "video_games-civilization-7",
          title: 'Civilization 7',
          description: "The award-winning strategy game franchise returns with a revolutionary new chapter. Sid Meier&#39;s Civilization® VII empowers you to build the greatest empire the world has ever known!",
          section: "Video_games",handler: () => {
              window.location.href = "/al-folio/video_games/1_game/";
            },},{id: "video_games-marvel-39-s-midnight-suns",
          title: 'Marvel&amp;#39;s Midnight Suns',
          description: "FIGHT AND STRATEGIZE LIKE A SUPER HERO IN THE DARKER CORNERS OF THE MARVEL UNIVERSE. Play as The Hunter, a legendary demon slayer who must lead a team of Super Heroes and supernatural warriors facing apocalyptic threats.",
          section: "Video_games",handler: () => {
              window.location.href = "/al-folio/video_games/2_game/";
            },},{id: "video_games-megalith",
          title: 'Megalith',
          description: "The stage has been set for the greatest battle in history. Use your massive size and powerful abilities to compete against other Titans for supremacy in this original VR hero shooter/MOBA hybrid.",
          section: "Video_games",handler: () => {
              window.location.href = "/al-folio/video_games/3_game/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72.%65.%6B%61%75%6E%64%69%6E%79%61@%72%75%67.%6E%6C", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ram-eshwar-kaundinya-56949b158", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0007-7935-4897", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/ram97tabla", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
