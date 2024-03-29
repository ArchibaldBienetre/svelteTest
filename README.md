
# What is this?

I'm just trying out this Svelte thing.  

My goal is to write a simple UI like this:   
* [X] dropdown box to select 1 of ~~(say)~~ 3 images
* [X] dropdown box to select 1 of ~~(say) 3~~ 2 animations
* [X] ~~"run"~~ "submit" button to show the selected image, appearing / behaving in the selected animation style 
* [X] ... and, of course, some basic unit tests to cover, at least, display of the selected image 

----

# How do I run this?
## What to install

Install a NodeJS / NPM environment on your system as is recommended for your operating system.

See [this link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## What to run

### Locally (during development) - run from source code

To start the local development server, run this in your shell:
```
npm install
npm run dev
```

### Production environment - build a static website
To build static files that you can put on your website / inside an NGinX container, run this in your shell:
```
npm install
npm run build
```
Find the generated files in the folder `dist` after the build.

Unfortunately, you can't run this website from those files locally 
nowadays due to CORS restrictions without some changes 
(see [this MDN link](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp#loading_a_local_file))

----

###Image sources 
* `src/assets/dogImage1.jpg` (Welsh Corgi, [source](https://commons.wikimedia.org/wiki/File:Welchcorgipembroke.JPG)):
  Pmuths1956, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
* `src/assets/dogImage2.jpg` (Beagle, [source](https://commons.wikimedia.org/wiki/File:Beagle_600.jpg)): Brodo / en:sannse, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
* `src/assets/dogImage3.jpg` (Bernese Mountain Dog, [source](https://commons.wikimedia.org/wiki/File:Wystawa_Rybnik_02.10.2011_berne%C5%84ski_pies_pasterski_3pl.jpg)): Pleple2000, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons 
* `src/assets/lowerSaxony.svg` (Map of German federal state Lower Saxony [source](https://commons.wikimedia.org/wiki/File:Lower_Saxony,_administrative_divisions_-_de_-_colored.svg), modified for this project): TUBS, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons

----


# Svelte + Vite

This template should help get you started developing with Svelte in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
