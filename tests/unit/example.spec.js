import pizzas from './data.json'

test('the pizzaa data is correct', () => {
  expect(pizzas).toMatchSnapshot()
  expect(pizzas).toHaveLength(4)
  expect(pizzas.map(pizza => pizza.name)).toEqual([
    'New York Pizza',
    'San Francisco Pizza',
    'Dallas Pizza',
    'Chicago Pizza'
  ])
})

for(let i = 0; i < pizzas.length; i++){
  test()
}
