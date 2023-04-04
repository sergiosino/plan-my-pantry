import Tutorial from '../../components/Tutorial'

const HELPS = [
  {
    id: 1,
    text: '\u2023 To ADD a new recipe press the bottom right button:',
    image: require('../../../assets/button-add.png'),
    style: { height: 60, width: 60 }
  },
  {
    id: 2,
    text: '\u2023 To EDIT a recipe, press on it:',
    image: require('../../../assets/recipe-edit.png'),
    style: { height: 100, width: 300 }
  },
  {
    id: 3,
    text: '\u2023 To DELETE a recipe, press and drag to the right:',
    image: require('../../../assets/recipe-delete.png'),
    style: { height: 100, width: 300 }
  }
]

export default function RecipesHelpView () {
  return <Tutorial instructions={HELPS} />
}
