
import { ServiceForm } from "./ServiceForm.js"

import { convertRequestsToListElement } from "./Requests.js"

export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
    ${ServiceForm()}
    </section>

    <div>
   ${convertRequestsToListElement()}
   </div>
    `
}

