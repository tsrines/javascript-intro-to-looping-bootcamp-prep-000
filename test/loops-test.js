/*global describe, it*/

const chai = require('chai')
const fs = require('fs')
const jsdom = require('mocha-jsdom')
const path = require('path')
const spies = require('chai-spies')

chai.use(spies)

const expect = chai.expect

function makeArray() {
  const array = []
  const t = 10

  for (let i = 0; i < t; i++) {
    array.push("I am a strange loop.")
  }

  return [array, t]
}

describe('loops', () => {
  jsdom({
    src: fs.readFileSync(path.resolve(__dirname, '..', 'loops.js'), 'utf-8')
  })

  describe('forLoop(array)', () => {
    it('adds `"I am ${i} strange loop${i === 0 ? \'\' : \'s\'}."` to an array 25 times', () => {
      const [array, t] = makeArray()
      const strangeArray = forLoop(array)
      const testArray = strangeArray.slice(array.length)

      let first = "I am 1 strange loop."
      let rest = "I am 24 strange loops."

      expect(strangeArray[11]).to.equal(first)
      expect(strangeArray[34]).to.equal(rest)
      expect(strangeArray.length).to.equal(t + 25)
    })
  })

  describe('whileLoop(n)', () => {
    it('counts down from n to 0', () => {
      const spy = chai.spy.on(console, 'log')
      const n = Math.floor(Math.random() * 100)

      expect(whileLoop(n)).to.equal('done')
      expect(spy).to.have.been.called.exactly(n)

      console.log.reset()
    })
  })

   describe('iLoveTheBeatles', function() {
    it("returns an array of 'I love the Beatles!' 8 times when passed the parameter 7 ", function() {
      expect(iLoveTheBeatles(7)).toEqual(["I love the Beatles!", "I love the Beatles!", "I love the Beatles!", "I love the Beatles!", "I love the Beatles!", "I love the Beatles!", "I love the Beatles!", "I love the Beatles!"]);
    });

    it("returns an array of 'I love the Beatles!' once when passed the parameter 17", function() {
      expect(iLoveTheBeatles(15)).toEqual(["I love the Beatles!"]);
    });
  });

});