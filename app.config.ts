export default defineAppConfig({
  docus: {
    title: 'shug笔记',
    description: '记录code',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      github: 'vxshug/note',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      }
    },
    github: {
      dir: 'content',
      branch: 'main',
      repo: 'note',
      owner: 'vxshug',
      edit: true
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: ["/browser", "/project-start", "/database", "/cpp", "/qt", "/flutter", "/apple", "/note"],
      fluid: true
    }
  }
})
