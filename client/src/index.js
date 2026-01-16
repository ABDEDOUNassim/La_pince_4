import { mount } from "svelte";
import App from "./App.svelte";

// Utilise mount() au lieu de new App()
mount(App, {
  target: document.getElementById("app"),
});
