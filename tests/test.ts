import {describe , it } from '../tester.framework'
import * as assert from 'assert'
import { ProjectObject } from '../src/main'

describe("Project Object" , () => {

    const project = new ProjectObject()

    it('message should output' , () => {
        assert.strictEqual(project.message , 'Hi there' , `should equal Hello world but equals ${project.message}`)
    })

})