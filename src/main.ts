export interface Project {
    helloWorld(): void
}

export class ProjectObject implements Project {

    message: string = 'Hello, World!'

    constructor() {  }

    helloWorld(): void {
        const element = document.createElement('h1')
        let text = document.createTextNode(this.message)
        element.appendChild(text)
        document.body.appendChild(element)
    }

}
