// Write your code here
// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem

  return (
    <li className="list-item-container">
      <img src={avatarUrl} alt={name} className="image-size" />
      <h1 className="item-name">{name}</h1>
      <div className="data-container">
        <div className="name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="text">{starsCount} Stars</p>
        </div>
        <div className="name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="text">{forksCount} forks</p>
        </div>
        <div className="name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
