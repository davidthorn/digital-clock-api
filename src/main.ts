interface ProjectTest {
    helloWorld(): void
}

interface Window {
    project: ProjectTest
}

class ProjectObject implements ProjectTest {

    constructor() {  }

    helloWorld(): void {
        const element = document.createElement('h1')
        let text = document.createTextNode('Hello, World!')
        element.appendChild(text)
        document.body.appendChild(element)
    }

}

Window.prototype.project = ((): ProjectTest =>  {
    return new ProjectObject()
})()

window.onload = () => {
    window.project.helloWorld()
}