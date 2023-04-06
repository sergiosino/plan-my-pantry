import Tutorial from '../../components/Tutorial'

import { HOW_TO_ADD_INGREDIENTS_GROCERY_LIST, HOW_TO_CHANGE_LUNCH_DINNER, HOW_TO_SELECT_RECIPE } from '../../constants/texts/texts'

const HELPS = [
  {
    id: 1,
    text: HOW_TO_CHANGE_LUNCH_DINNER,
    image: require('../../../assets/menu-day-change.png'),
    style: { height: 160, width: 300 }
  },
  {
    id: 2,
    text: HOW_TO_SELECT_RECIPE,
    image: require('../../../assets/menu-meal-change.png'),
    style: { height: 200, width: 300 }
  },
  {
    id: 3,
    text: HOW_TO_ADD_INGREDIENTS_GROCERY_LIST,
    image: require('../../../assets/menu-add-ingredients.png'),
    style: { height: 255, width: 300 }
  }
]

export default function DayMenuEditHelpView () {
  return <Tutorial instructions={HELPS} />
}
