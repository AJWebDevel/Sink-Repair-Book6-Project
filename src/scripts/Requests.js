import { deleteRequest, getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"

//function to convert individual requests into html <li> representations
//1parameter & returns html
const convertRequestToListElement = (pen) => {
    const plumbers = getPlumbers()
    return pen.map(request => {
        return `<li id="${request.id}" class="request"> ${request.description} 
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
            </select>
            <button class="request__delete"
            id="request--${request.id}"> Delete
            </button>  
        </li > `
    })
}


export const Requests = () => {

    const requests = getRequests()
    let html = `<ul>
    ${convertRequestToListElement(requests).join(" ")
        } 
        </ul >
    `

    return html
}
const convertCompletionsToListElement = (pen) => {
    const completions = getCompletions()
    return completions.map(job => {
        return `<li id="${job.id}" class="partyRequest"> ${job.requestId} was completed by Plumber No. ${job.plumberId}.
            <button class="request__delete"
            id="request--${job.id}"> Delete
            </button>  
        </li > `
    })
}


export const Completions = () => {

    const completions = getCompletions()
    let html = `<ul>
    ${convertCompletionsToListElement(completions).join(" ")
        } 
        </ul >`

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const projectRequestId = parseInt(requestId)
            const projectPlumberId = parseInt(plumberId)
            const projectDate = Date
            /*
                This object should have 3 properties 1. requestId 2. plumberId 3. date_created
            */
            const completion = {
                requestId: projectRequestId,
                plumberId: projectPlumberId,
                dateCreated: projectDate
            }

            saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)