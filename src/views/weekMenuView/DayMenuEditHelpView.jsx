import Tutorial from '../../components/Tutorial'

const HELPS = [
  {
    id: 1,
    text: '\u2023 To CHANGE between lunch and dinner:',
    image: require('../../../assets/menu-day-change.png'),
    style: { height: 160, width: 300 }
  },
  {
    id: 2,
    text: '\u2023 To SELECT a recipe for the current meal:',
    image: require('../../../assets/menu-meal-change.png'),
    style: { height: 200, width: 300 }
  },
  {
    id: 3,
    text: '\u2023 To ADD the ingredients of the meals to the grocery list:',
    image: require('../../../assets/menu-add-ingredients.png'),
    style: { height: 255, width: 300 }
  }
]

export default function DayMenuEditHelpView () {
  return <Tutorial instructions={HELPS} />
}
