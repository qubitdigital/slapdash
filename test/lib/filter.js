var filter = require('../../lib/filter')

var array = [ 'hello', 'there', 'tests' ]

describe('filter', function () {
  describe('callback behaviour', function () {
    var callback, context

    beforeEach(function () {
      callback = sinon.spy()
      context = { success: true }
      filter(array, callback, context)
    })

    it('should call `callback` once for each element of `array`', function () {
      expect(callback.callCount).to.equal(array.length)
      callback.getCalls().forEach(function (call, index) {
        sinon.assert.calledWithExactly(call, array[index], index, array)
      })
    })

    it('should call `callback`, bound to `context`', function () {
      sinon.assert.alwaysCalledOn(callback, context)
    })
  })

  describe('filtering', function () {
    it('should filter out on false', function () {
      var result = filter(array, function () { return false })
      expect(result).to.eql([])
    })
    it('should not filter out on true', function () {
      var result = filter(array, function () { return true })
      expect(result).to.eql(array)
    })
    it('should clone the array', function () {
      var result = filter(array, function () { return true })
      expect(result).not.to.equal(array)
    })

    it('should filter items matching the predicate', function () {
      var result = filter(array, function (value) {
        return value === 'hello'
      })
      expect(result).to.eql(['hello'])
    })
  })
})
