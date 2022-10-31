import './app.css'
import App from './App.svelte'


const app = new App({
    target: document.getElementById('app'),
    props:  {
        params: new URLSearchParams(window.location.search)
    }
})


export default app
