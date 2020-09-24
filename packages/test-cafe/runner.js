const createTestCafe = require('testcafe');

const testCafe = await createTestCafe('localhost', 1337, 1338);

try {
    const runner = testCafe.createRunner();

    await runner
        .src('./tests/')
        .browsers('safari')
        .run();
}
finally {
    await testCafe.close();
}
