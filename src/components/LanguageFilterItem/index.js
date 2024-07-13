// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {repoItem, getClickedItemResults, isActive} = props
  const {id, language} = repoItem

  const onLanguageClicked = () => {
    getClickedItemResults(id)
  }
  const className = isActive ? 'active-button' : null
  return (
    <li className="list-item">
      <button
        type="button"
        className={`language-button ${className}`}
        onClick={onLanguageClicked}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
