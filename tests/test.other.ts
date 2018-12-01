import {describe , it } from '../tester.framework'
import * as assert from 'assert'

describe("Testing other works too" , () => {

    it('multiplying 5 by 5' , () => {
        assert.strictEqual(5 * 5 , 25 , 'should equal 25')
    })

    it('multiplying 2 by 2' , () => {
        assert.strictEqual(2 * 2 , 4 , 'should equal 4')
    })

    it('multiplying 3 by 3' , () => {
        assert.strictEqual(3 * 3 , 9 , 'should equal 9')
    })

    it('multiplying 4 by 4' , () => {
        assert.strictEqual(4 * 4 , 16 , 'should equal 16')
    })

    it('multiplying 6 by 6' , () => {
        assert.strictEqual(6 * 6 , 36 , 'should equal 36')
    })

})