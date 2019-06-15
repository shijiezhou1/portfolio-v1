var sinon = require('sinon');
var {describe} = require('mocha');
var Store = require('./Store'); // Store is a object

describe('something', function () {

    beforeEach(function () {
        sinon.createSandbox();
    });

    afterEach(function () {
        sinon.restore();
    });


    it('get full name', function () {
        var spy_getName = sinon.spy(Store, 'getName');
        Store.getName('Jay', 'Zhou');
        sinon.assert.calledOnce(spy_getName);
        sinon.assert.calledWith(spy_getName, 'Jay', 'Zhou')

    });

    it('get firstname use stub', function () {
        var stub_getName = sinon.stub(Store, 'getName');

        var testData = {first: 'Jay', last: 'Zhou'};

        Store.getName(testData.first, testData.last);

        sinon.assert.calledWith(stub_getName, testData.first, testData.last);

    });

    it('get lastname mock', function () {
        var overrideObj = {
            methods: function (first, middle, last) {
                return `${first} ${middle} ${last}`
            },
            random: function () {
                return 'random test';
            }
        };
        var mock_getName = sinon.mock(overrideObj);
        // overrideObj.methods();
        mock_getName.expects("methods").once();
        mock_getName.expects("random").once();

        overrideObj.methods();
        overrideObj.random();

        mock_getName.verify();
        // sinon.assert.calledOnce(mock_getName);

    });
});
