# NativefiedInstallers

Just a quick personal wrapper project for installing my favourite electron apps locally and applying the userstyles accordingly.

It contains a minalistic set of prompts which allows easy relocation of generated packages, and including them in the binary paths (which makes them integrate quick nicely with the OS)

# About
This project using following librararies
* Node.js
* [Nativefier](https://github.com/jiahaog/nativefier)
* [Electron - Through nativefier](https://electronjs.org/)
* [FS-Extra](https://www.npmjs.com/package/fs-extra)

And following user styles:

* [Dark-WhatsApp by Vednoc](https://userstyles.org/styles/142096)

* [Dark Facebook Messenger](https://userstyles.org/styles/173705)

* [linkedin.com dark](https://userstyles.org/styles/158968/linkedin-com-dark)

Actual generated applications are just wrappers for their respective web portals.

# Usage

Installing whatsapp
```bash
npm run whatsapp
```

Installing Facebook Messenger
```bash
npm run messenger
```

Installing Linkedin-chat
```bash
npm run linkedin
```

You can also trigger all the installers in chain by executing

```bash
npm run all
```

# Licensing..?

None of the software here belongs to me, this is just a collection of scripts which streamline the set-up.

All of the rights belong to the respective owners.

