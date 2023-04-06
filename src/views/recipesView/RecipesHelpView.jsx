import Tutorial from '../../components/Tutorial'

import { HOW_TO_ADD_NEW_RECIPE, HOW_TO_EDIT_RECIPE, HOW_TO_DELETE_RECIPE } from '../../constants/texts/texts'

const HELPS = [
  {
    id: 1,
    text: HOW_TO_ADD_NEW_RECIPE,
    image: require('../../../assets/button-add.png'),
    style: { height: 60, width: 60 }
  },
  {
    id: 2,
    text: HOW_TO_EDIT_RECIPE,
    image: require('../../../assets/recipe-edit.png'),
    style: { height: 100, width: 300 }
  },
  {
    id: 3,
    text: HOW_TO_DELETE_RECIPE,
    image: require('../../../assets/recipe-delete.png'),
    style: { height: 100, width: 300 }
  }
]

export default function RecipesHelpView () {
  return <Tutorial instructions={HELPS} />
}
