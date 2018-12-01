
type ItCallBacks = {
    test: UnitTestCallback,
    description: string,
    passed: boolean,
    error?: Error
}

type UnitTestCallback = () => void

const itCallbacks: ItCallBacks[] = []

/**
 * Creates a test to execute the testScript
 *
 * @param {string} testDescription
 * @param {UnitTestCallback} testScript
 */
export const it = (testDescription: string , testScript: UnitTestCallback) => {
    
    let contains: boolean = itCallbacks.filter((i,index , items) => {
        if(i.description === testDescription) {
            return items[index]
        }
    }).length === 1
    
    if(contains){
        throw new Error(`Test with description [${testDescription}] already exists`)
    }

    let testError: Error | undefined = undefined

    try {
        testScript()
    } catch(error) {
        testError = error
        console.log(`Failed: ${testDescription} ${error.message}`)
        console.log('==========================================')
    }
   
    itCallbacks.push({
        test: testScript, 
        description: testDescription,
        passed: testError === undefined,
        error: testError
    })
    
}

export const describe = (moduleTestDescription: string , testScript: UnitTestCallback ) => {
    console.log("TEST:")
    console.log(moduleTestDescription)
    testScript()

    let failed = itCallbacks.filter(i => {
        if(!i.passed) return i
    }).length

    let passed = itCallbacks.filter(i => {
        if(i.passed) return i
    }).length

    console.log(`Totals tests ${itCallbacks.length},  passed: ${passed} , failed: ${failed}`)
}