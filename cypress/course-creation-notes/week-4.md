- `npx storybook init` - select `y`, when prompted to install the 'eslintPlugin'
- npm install -D @storybook/addon-postcss
- .storybook/main add code
- .storybook/preview add code
- `npm run storybook`

## Creating our first story

- Check out the boiler-plate stories `src/stories`
- Delete the `src/stories` folder

`A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.`

## Task

Defining a flexible button component - Allow an icon to be passed into the button - Allow the button to be different colors

- src/styles/globals.css

## Task 2

Create a flexible alert component (https://v1.tailwindcss.com/components/alerts)

## Integration with our CI Pipeline

- yarn add --dev @storybook/test-runner

## Building story

- https://dev.to/kouts/deploy-storybook-to-github-pages-3bij#:~:text=First%2C%20we%20have%20to%20create,docs%20folder%20in%20our%20repository.
