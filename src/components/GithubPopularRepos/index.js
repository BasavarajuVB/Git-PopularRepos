import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusResult = {
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    popularReposesList: [],
    activeStatus: languageFiltersData[0].id,
    viewStatus: apiStatusResult.onLoading,
  }

  componentDidMount() {
    this.getApiResults()
  }

  getClickedItemResults = id => {
    this.setState({activeStatus: id}, this.getApiResults)
  }

  getApiResults = async () => {
    const {activeStatus} = this.state
    this.setState({viewStatus: apiStatusResult.onLoading})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeStatus}`,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        popularReposesList: updatedData,

        viewStatus: apiStatusResult.onSuccess,
      })
    } else {
      this.setState({
        activeStatus: 'ALL',
        viewStatus: apiStatusResult.onFailure,
      })
    }
  }

  onSuccussView = () => {
    const {popularReposesList} = this.state
    console.log(popularReposesList)
    return (
      <ul className="repo-items-container">
        {popularReposesList.map(eachOne => (
          <RepositoryItem repoItem={eachOne} key={eachOne.id} />
        ))}
      </ul>
    )
  }

  onFailureView = () => (
    <div>
      <p>it's File</p>
    </div>
  )

  onLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getResults = () => {
    const {viewStatus} = this.state
    switch (true) {
      case viewStatus === apiStatusResult.onSuccess:
        return this.onSuccussView()

      case viewStatus === apiStatusResult.onFailure:
        return this.onFailureView()

      case viewStatus === apiStatusResult.onLoading:
        return this.onLoadingView()

      default:
        return null
    }
  }

  render() {
    const {activeStatus} = this.state
    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="language-item-container">
          {languageFiltersData.map(eachRepo => (
            <LanguageFilterItem
              repoItem={eachRepo}
              key={eachRepo.id}
              getClickedItemResults={this.getClickedItemResults}
              isActive={eachRepo.id === activeStatus}
            />
          ))}
        </ul>

        <div className="result-container">{this.getResults()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
