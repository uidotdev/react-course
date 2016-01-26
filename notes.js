Video 0:
  Intro to Course
    - Topics Covered
        JavaScript
          map
          reduce
          Pure functions
          bind
          this
        React
          Imperative vs Declarative
          Composition
          Unidirectional Dataflow
          Freedom from DSLs
          Explicit Mutations
          JSX
          Virtual DOM
          createClass
          state
          props
          props.children
          createElement
          Lifecycle Hooks
          Container/Presentational Components
          Statless Functional Components
          Events
          Private Stateless Functional Components
          Inline Styles / Bootstrap / Custom CSS
        React Router
          Declarative Routing
          Route Configurations
          Route Matching
          Transition Animations
          Query Parameters
        Webpack
          CSS Loader
          HTMLWebpackPluginConfig
        Babel
        Axios
    - Philosophy on Education
      - Passive learning is lame
      - Intro to Format
        - https://twitter.com/dan_abramov/status/691448667690106880
        - https://twitter.com/amasad/status/691451497599602688
        - Text Intro
        - Videos build something (Show Project)
          - Each video has a branch
          - Quiz
        - Github Curriculum (Show Project)

Video 1:
  https://slides.com/tylermcginnis/why-react
  http://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming
  Intro to Github Battle App
    - Show highlighted components

Video 2 - Hello World
  Start from scratch
    Webpack/BabelSetup
      mkdir gh-battle
      npm init
        deps: npm install --save react react-dom
        devDeps: npm install --save-dev babel-core babel-loader babel-preset-react html-webpack-plugin webpack webpack-dev-server
      mkdir app && cd app
      touch index.html and fill out
      touch index.js and create a variable or something small
      touch webpack.config.js
        - Purpose of Webpack (Just for JSX now)
        - entry
        - output
        - module/loaders (just babel-loader for now)
          - make .babelrc
        - plugins (HtmlWebpackPlugin and configure to output template)
        - Scripts in package.json for production
          - Test to make sure prod is working and show how /dist was made
        - scripts in package.json for webpack-dev-server
          - Test dev server
    First React Component
      index.js hello world
    Add .gitignore

Video 3 - Establish building blocks/Paradigms of React
  https://addyosmani.com/first/
  * All your intuitions about creating functions should be the same for creating components
    - When to create functions / components
      - https://en.wikipedia.org/wiki/Single_responsibility_principle
  * Talk pure functions
      A pure function doesn’t depend on and doesn’t modify the states of variables out of its scope.
      Concretely, that means a pure function always returns the same result given same parameters. Its execution doesn’t depend on the state of the system.
      Pure functions have two very nice properties. They are easy to think about, and they are easy to re-use.
  * the most important parts of a function are the arguments and the return statement
      same for react in props and render
      ƒ(d)=V
      It’s a function that receives data as its input and returns a view.
    https://jsfiddle.net/tylermcginnis/k5p4v5zv/1/
  Show examaple of nested components
  Show example of passing props to child component

Video 4 - First Routes
  Show examples of this.props.children (https://jsfiddle.net/tylermcginnis/0zkh2wLk/)
  make routes.js inside of app/config
    - Show finished Declarative routes and walk through what's happening
        - Point out props being passed to routes and use of this.props.children
    - npm install react-router
    - Use "future" Main and Home components to create
      <Router>
        <Route path='/' component={Main}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    - Make a /components folder in app
    - Make Main.js inside /components and add all code (not css transition stuff)
    - Make Home.js inside of /components (something simple. Hello World)
    - Update index.js to render routes
    - add hashHistory to routes

Video 5 - Prompt Screens
  Create /containers folder
  https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.lkgqdphew
  Create PromptContainer component in /containers /
    Talk about the purpose of this component
      keep track of username state
      change route on submit
    Walk through building this component INCLUDING render JSX
    Head go routes.js and add
      <Route path='playerOne' header='Player One' component={PromptContainer} />
      <Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
    Edit Home.js (but keep out MainContainer for now and DONT use stateless func component yet)
    Check to make sure everything is working.
    Once complete and working, talk about
      Container vs Presentational Components
      Create Prompt.js in /components  /
      Move render to Prompt.js and make sure its working
      Talk about PropType validation and add PropTypes
      Talk about Statless Functional Components and refactor to it.
    Head back to home and refactor to Stateless Functional Component

Video 6
  Create ConfirmBattleContainer inside /containers and leave blank
  Create ConfirmBattle insdie /components and leave blank
  In ConfirmBattleContainer have it render <ConfirmBattle />
  Add contextTypes to get Routing
  in componentDidMount
    grab the query off of this.props.location.query
    Talk about how we need to fetch these devs info from github on DidMount
    and save it into playersInfo on state
  create a getInitialState with isLoading: true and playerInfo: []
  Pass isLoading and playersInfo to ConfirmBattle
  Head to ConfirmBattle and render
    props.isLoading === true ? <p> Loading </p> : <p> 'Confirm Battle!' </p>
    and check to make sure its working
  Head to routes.js and add
    <Route path='battle' component={ConfirmBattleContainer} />

Video 7
  Make githubHelpers.js inside of /utils
  Make a helpers object and export it
  Make a getPlayersInfo method on ^ object
  npm install and require axios
  Make a complete getUserInfo private function which takes in a username
  Add param to the end and make the id, sec, param varibles up talk and talk about rate limiting
  Complete the getPlayersInfo method
  back in ConfirmBattleContainer require githubHelpers
  invoke getPlayersInfo inside of didMount
  setState with loading false and new info
  Make sure it's working (LOADING should change to CONFIRM BATTLE)
  Now verify props are correct by changing CONFIRM BATTLE TO
    the result of making that puke {JSON.stringify()} function somewhere

Video 8
  In ConfirmBattleContainer build handleInitiateBattle and pass it to ConfirmBattle
  Add propTypes to ConfirmBattle.js
  Replace CONFIRM BATTLE: puke with UI
    *Dont add MainContainer or UserDetailsWrapper initially
      (https://github.com/ReactjsProgram/course1/commit/d7be6b669acff5a2c6e88435f937d22246eb1425)
    *Puke <UserDetails> initially
    check to make sure everything is working
  Refactor UserDetails puke to own component called /UserDetails
    check to make sure it works
  Refactor Bootstrap around UserDetails to be UserDetailsWrapper
  get rid of puke

Video 9
  Add results to routes
    <Route path='results' component={ResultsContainer} />
  Make ResultsContainer in /containers
  Make Results in /components
  Make the render of ResultsContainer render Results
  getInitialState set isLoading and scores and then pass them into Results
  Finish commponentDidMount
  build githubHelpers.battle and finish githubHelpers
  In Results add Component, PropTypes, then Puke them to view.

Video 10
  Build out Results.js WITHOUT MainContainer
  Once finished and working, create MainContainer to wrap return in Results AND Tie
  Update ConfirmBattle with MainContainer
  Update Home with MainContainer

Video 11
  Build Loading.js in /components
  Add <Loading /> to Results.js
  Add <Loading /> to ConfirmBattle.js

Video 12
  npm install --save react-addons-css-transition-group
  Add ReactCSSTransitionGroup to Main.js
  npm install --save-dev css-loader style-loader
  Add style loaders to webpack
  Make app/main.css file with css
  require('../main.css') in Main.js

Video 13:
  Add Tooltip to Score? http://wwayne.com/react-tooltip/
  Challenge: Add errors handling when github handle isnt a profile

Video 14 (maybe, maybe not)
  Shows commons things not in series
    - map
    - filter
    - More lifecycle events