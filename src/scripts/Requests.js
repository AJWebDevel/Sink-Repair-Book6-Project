import { deleteRequest, getRequests, getPlumbers, saveCompletion, getCompletions, fetchCompletions } from "./dataAccess.js"

//function to convert individual requests into html <li> representations
//1parameter & returns html
export const convertRequestsToListElement = () => {

    const requests = getRequests()
    const completions = getCompletions()

    let completeRequests = requests.filter(requestObj =>
        completions.find(completion => completion.requestId === requestObj.id)
    )

    let incompleteRequests = requests.filter(requestObj =>
        !completions.find(completion => completion.requestId === requestObj.id)
    )

    //function to return incompleteRequests as html list
    let incompletedAsHTML = () => {
        let unDoneRequests = incompleteRequests
        return unDoneRequests.map(request => {
            let plumbers = getPlumbers()
            let incompleteHTML = ``
            return incompleteHTML = `<li id="${request.id}" class="incompleteRequest"> ${request.id} is ${request.description}
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
    //function to return completeRequests as html list
    let completedAsHTML = () => {
        return completeRequests.map(job => {
            let completeHTML = " "
            return completeHTML = `<li id="${job.id}" class="completedRequest"> ${job.description} is complete
    <button class="request__delete"
    id="request--${job.id}"> Delete
    </button>  
</li > `
        })
    }

    let html = ``
    return html = ` <section class="serviceRequests">
    <h2>Service Requests</h2>
    ${incompletedAsHTML()}
</section>

<section class="completedJobs">
    <h2>Completed Jobs</h2>
    ${completedAsHTML()}
</section>`

}





const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const makeCounter = () => {
    var i = 0;
    return function () {
        return i++;
    }
}


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            let projectId = makeCounter
            const projectRequestId = parseInt(requestId)
            const projectPlumberId = parseInt(plumberId)
            const projectDate = Date.now()

            /*
                This object should have 3 properties 1. requestId 2. plumberId 3. date_created
            */
            const completion = {
                id: projectId,
                requestId: parseInt(projectRequestId),
                plumberId: parseInt(projectPlumberId),
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







/*
display only requests that have not been completed
if a request has been finished, do not display it

when a plumber gets assigned a service request, a completed
request is created. Then the request should be removed from
the displayed list of requests and the corresponding completedJob
should be displayed under the completed jobs section in HTML

1.filter through requests (requests.filter(request =>
    (request.id === completion.requestId))) and set to variable
2. display result of filter in completed.
3. display the rest in requests
*/
//if (job's id matches completed.jobid) filter requests

// const requestsAndCompletions = () => {
//     const requests = getRequests()
//     const completions = getCompletions()
//     const fulfilledRequests = requests.filter(request => (request.id === completion.requestId))
// }


























//     const plumbers = getPlumbers()
//     const completions = getCompletions()


//     //find completion, save in var
//     //render completion  based on objects in saved var
//     //render requests if found var is null render normally 
//     if (pen.id)
//         return completions.find(completion.id)







