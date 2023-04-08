import Tutorial from '../../components/Tutorial'

import { i18n } from '../../utils'

export default function RecipesHelpView () {
  const HELPS = [
    {
      id: 1,
      text: i18n.t('RECIPES.HOW_TO_ADD_NEW_RECIPE'),
      image: require('../../../assets/button-add.png'),
      style: { height: 60, width: 60 }
    },
    {
      id: 2,
      text: i18n.t('RECIPES.HOW_TO_EDIT_RECIPE'),
      image: require('../../../assets/recipe-edit.png'),
      style: { height: 100, width: 300 }
    },
    {
      id: 3,
      text: i18n.t('RECIPES.HOW_TO_DELETE_RECIPE'),
      image: require('../../../assets/recipe-delete.png'),
      style: { height: 100, width: 300 }
    }
  ]

  return <Tutorial instructions={HELPS} />
}
