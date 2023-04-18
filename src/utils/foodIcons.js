export const food = [
  'fa-bowl-food',
  'fa-egg',
  'fa-carrot',
  'fa-burger',
  'fa-bacon',
  'fa-mug-hot',
  'fa-lemon',
  'fa-fish',
  'fa-stroopwafel',
  'fa-shrimp',
  'fa-pizza-slice',
  'fa-pepper-hot',
  'fa-drumstick-bite',
  'fa-hotdog',
  'fa-ice-cream',
  'fa-cheese',
  'fa-cookie',
  'fa-cake-candles',
  'fa-bowl-rice',
  'fa-apple-whole',
  'fa-cookie-bite'
]

export const randomFoodIcon = () => food[Math.floor(Math.random() * food.length)]
