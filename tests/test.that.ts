import { expect } from 'chai'

describe("Testing that works too" , () => {

    it('multiplying 5 by 5' , () => {
        expect(5 * 5).to.equal(25 , 'should equal 25')
    })

    it('multiplying 2 by 2' , () => {
        expect(2 * 2).to.equal( 4 , 'should equal 4')
    })

    it('multiplying 3 by 3' , () => {
        expect(3 * 3).to.equal( 9 , 'should equal 9')
    })

    it('multiplying 4 by 4' , () => {
        expect(4 * 4).to.equal( 16 , 'should equal 16')
    })

    it('multiplying 6 by 6' , () => {
        expect(6 * 6).to.equal( 36 , 'should equal 36')
    })

})