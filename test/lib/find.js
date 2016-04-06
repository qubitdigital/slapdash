var find = require('../../lib/find')

describe('find', function () {
  var array = [1, 10, 100]
  var context = { success: true }
  var callback, result

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value > 9 })
    result = find(array, callback, context)
  })

  it('should call `callback` for each element of `array`, until a match is found', function () {
    sinon.assert.calledTwice(callback)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, array[index], index, array)
    })
  })

  it('should call `callback` bound on `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should return the first value that matches', function () {
    expect(result).to.eql(10)
  })

  describe('when no value matches', function () {
    it('should return undefined', function () {
      expect(find(array, function () { return false })).to.be.an('undefined')
    })
  })
})
