import { expect, test } from 'bun:test'
import { toLocaleUpperCase } from '../src'

test('a -> A', () => {
  expect(toLocaleUpperCase('a')).toBe('A')
})
